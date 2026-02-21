// API membuat Transaksi Pembelian Produk

import { NextRequest, NextResponse } from "next/server"
import prisma  from "@/lib/prisma"

// Buat Transaksi Pembelian
export async function POST(req: NextRequest){

    try{
        const body = await req.json()

        const {
            userId,
            distributorId,
            biayakirim,
            totalharga,
            produk
        } = body

        if(!produk || produk.length ===0){
            return NextResponse.json({
                error: "Data Produk Kosong!"
            }, {status: 400})
        }

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        // Mengambil nomor urut terakhir dari pembelian bulan dan tahun ini
        const lastPembelian = await prisma.pembelian.findFirst({
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

        if (lastPembelian && lastPembelian.kode_pembelian) {
        // Cek bulan sama
        const lastDate = new Date(lastPembelian.createdAt)
        const lastBulan = monthNames[lastDate.getMonth()]
        const lastTahun = lastDate.getFullYear()
        
            if (bulan === lastBulan && tahun === lastTahun) {
                // Extract angka 5 digit dari kode, contoh : (GT/PURCHASE/2026/JAN/00001)
                const match = lastPembelian.kode_pembelian.match(/\/(\d{5})$/)  // ✅ Regex safe
                
                if (match) {
                const lastNumber = parseInt(match[1], 10)  // 00001 → 1
                    if (!isNaN(lastNumber)) {
                        newNumber = (lastNumber + 1).toString().padStart(5, '0')  // 00002
                    }
                }
            }
        }
        const kode_pembelian = `GT/PURCHASE/${tahun}/${bulan}/${newNumber}`

        const hasil_transaksi = await prisma.$transaction(async (tx) => {

            const transaksi_pembelian = await tx.pembelian.create({
                data:{
                    kode_pembelian: kode_pembelian,
                    userId,
                    status_pembelian: "DIPESAN",
                    biaya_kirim: biayakirim,
                    distributorId,
                    metode_bayar:"TRANSFER",
                    jumlahtotal: parseInt(totalharga),
                    pembeliandetail:{
                        create: produk.map((produk: any)=>({
                            produkId: produk.id,
                            jumlah: produk.jumlah,
                            harga: produk.harga_beli,
                            total: produk.harga_beli * produk.jumlah,
                        })),
                    }
                }
            })

            return transaksi_pembelian
        })

        return NextResponse.json({
            success: true,
            message: "Transaksi Pembelian berhasil dibuat!",
            data: hasil_transaksi,
        }, {status: 201})

    }catch(error){
        console.error("Error membuat transaksi", error)
        return NextResponse.json(
        { error: "Gagal membuat transaksi pembelian" }, 
        { status: 500 }
        )

    }
}

// Ambil data pembelian

export async function GET(_req: NextRequest){

    try{
        const data_pembelian = await prisma.pembelian.findMany({
            select:{
                id:true,
                kode_pembelian:true,
                status_pembelian:true,
                createdAt:true,
                updatedAt: true,
                biaya_kirim:true,
                jumlahtotal:true,
            }
        })

        if(!data_pembelian){
            return NextResponse.json({
                success: false,
                message: "Data Pembelian Kosong!"
            }, {status: 404})
        }

        return NextResponse.json({
            success: true,
            data: data_pembelian,
            message: "Data pembelian berhasil diambil"
        }, {status: 200})

    }catch(error){
        console.error("Error mengambil data pembelian", error)
        return NextResponse.json(
        { error: "Gagal mengambil data pembelian" }, 
        { status: 500 }
        )
    }
}


