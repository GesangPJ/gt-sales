// API Transaksi Penjualan

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"
import { revalidateTag } from "next/cache"

// Buat Transaksi Penjualan
export async function POST(req: NextRequest){

    const body = await req.json()

    const {
        idadmin,
        produk,
        jumlahtotal,
        namapelanggan,
        keterangan,
        nilai_diskon,
        persen_diskon,
        metode,
    } = body

     if(!produk || produk.length ===0){
        return NextResponse.json({
            error: "Data produk tidak boleh kosong!"
        }, {status: 400})
        }

    try{

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        // Mengambil nomor urut terakhir dari pembelian bulan dan tahun ini
        const lastPembelian = await prisma.penjualan.findFirst({
        where: {
            createdAt: {
            gte: new Date(tahun, kalender.getMonth(), 1),
            lte: new Date(tahun, kalender.getMonth() + 1, 0),
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        })

        let newNumber = '00001'

        // Reset nomor seri jika masuk bulan baru

        if (lastPembelian && lastPembelian.kode_penjualan) {
        // Cek bulan sama
        const lastDate = new Date(lastPembelian.createdAt)
        const lastBulan = monthNames[lastDate.getMonth()]
        const lastTahun = lastDate.getFullYear()
        
            if (bulan === lastBulan && tahun === lastTahun) {
                // Extract angka 5 digit dari kode, contoh : (GT/PURCHASE/2026/JAN/00001)
                const match = lastPembelian.kode_penjualan.match(/\/(\d{5})$/)  // ✅ Regex safe
                
                if (match) {
                const lastNumber = parseInt(match[1], 10)  // 00001 → 1
                    if (!isNaN(lastNumber)) {
                        newNumber = (lastNumber + 1).toString().padStart(5, '0')  // 00002
                    }
                }
            }
        }
        const kodepenjualan = `GT/SALES/${tahun}/${bulan}/${newNumber}`

        const hasil_transaksi = await prisma.$transaction(async (tx)=>{

            // 1. Mmebuat transaksi penjualan
            const transaksi_penjualan = await tx.penjualan.create({
                data:{
                    kode_penjualan: kodepenjualan,
                    userId:idadmin,
                    status_penjualan:"SELESAI",
                    metode_bayar:metode,
                    nilai_diskon,
                    persen_diskon,
                    nama_pelanggan:namapelanggan,
                    keterangan,
                    jumlahtotal,
                    penjualandetail:{
                        create: produk.map((produk: any)=>({
                            produkId: produk.id,
                            jumlah: produk.jumlah,
                            harga: produk.harga,
                            total: produk.jumlah * produk.harga,
                        })),
                    }

                }
            })

            // 2. Mengurangi stok produk berdasarkan produk yang dibeli
            for (const item of produk){
                await tx.produk.update({
                    where:{id: item.id},
                    data:{
                        stok:{
                            decrement: parseInt(item.jumlah)
                        }
                    }
                })
            }

            // 3. Membuat Jurnal Penjualan
            await tx.jurnal.createMany({
                data:[
                       // Uang masuk : Debit
                    {
                        kode: transaksi_penjualan.kode_penjualan,
                        akun: "KAS",
                        debit: transaksi_penjualan.jumlahtotal,
                        kredit: new Prisma.Decimal(0),
                        userId: idadmin,
                        sumber: transaksi_penjualan.metode_bayar,
                        keterangan: `Penjualan produk ${transaksi_penjualan.kode_penjualan} dengan pembayaran via ${transaksi_penjualan.metode_bayar}`,
                    },
                        // PENJUALAN : KREDIT (pendapatan)
                    {
                        kode: transaksi_penjualan.kode_penjualan,
                        akun: "PENJUALAN",
                        debit: new Prisma.Decimal(0),
                        kredit: transaksi_penjualan.jumlahtotal,
                        userId: idadmin,
                        sumber: transaksi_penjualan.metode_bayar,
                        keterangan: `Penjualan produk ${transaksi_penjualan.kode_penjualan} dengan pembayaran via ${transaksi_penjualan.metode_bayar}`,
                    }
                ]
            })

            return transaksi_penjualan
        })

        revalidateTag('penjualan','max')

        return NextResponse.json({
            success: true,
            message: "Transaksi Penjualan berhasil dibuat!",
            data: hasil_transaksi,
        }, {status: 201})


    }catch(error){
        console.error("Server Error API Penjualan ", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status: 500})
    }
}

