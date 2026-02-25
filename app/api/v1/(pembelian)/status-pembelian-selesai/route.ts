
// API set Status pembelian SELESAI


import prisma from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"


export async function PATCH(req: NextRequest){

    const body = await req.json()

    const {pembelianId, idadmin} = body

    if(!pembelianId || !idadmin){
        return NextResponse.json({
            message:"ID tidak boleh kosong!"
        }, {status:400})
    }

    try{
        // Update pembelian, stok produk, buat jurnal, semua pakai prisma transaction
        const result = await prisma.$transaction(
            async (tx) =>{
                // 1. Ambil data pembelian + detail + total
                const pembelian = await tx.pembelian.findUnique({
                where: { id: pembelianId },
                include: {
                    pembeliandetail: {
                    select: {
                        produkId: true,
                        jumlah: true,
                    }
                    }
                }
                })

                if (!pembelian) {
                throw new Error("Pembelian tidak ditemukan")
                }

                // 2. Update stok produk (+= jumlah)
                for (const detail of pembelian.pembeliandetail) {
                    await tx.produk.update({
                    where: { id: detail.produkId },
                    data: {
                        stok: {
                        increment: detail.jumlah
                        }
                    }
                    })
                }

                // 3. Update status pembelian
                const updatedPembelian = await tx.pembelian.update({
                    where: { id: pembelianId },
                    data: {
                    status_pembelian: "SELESAI",
                    userId:idadmin,
                    },
                    include: {
                    pembeliandetail: true,
                    }
                })

                // 4. Buat jurnal pembelian
                await tx.jurnal.createMany({
                    data: [
                        // TRANSFER: Barang masuk, Rekening bank keluar
                        {
                        kode: pembelian.kode_pembelian,
                        akun: "PEMBELIAN",  // Barang bertambah
                        debit: pembelian.jumlahtotal,
                        kredit: new Prisma.Decimal(0),
                        keterangan: `Pembelian barang via transfer bank ${pembelian.kode_pembelian}`,
                        sumber: "TRANSFER",
                        userId: idadmin
                        },
                        {
                        kode: pembelian.kode_pembelian,
                        akun: "BANK",
                        debit: new Prisma.Decimal(0),
                        kredit: pembelian.jumlahtotal,
                        keterangan: `Pembayaran transfer bank ${pembelian.kode_pembelian}`,
                        sumber: "TRANSFER",
                        userId: idadmin
                        }
                    ]
                    })

      return updatedPembelian
    })

    revalidateTag("pembelian","max")

    return NextResponse.json({
      success: true,
      message: "Status pembelian berhasil diupdate & stok + jurnal tercatat",
      data: result
    })

    }catch(error){
        console.error("Error API pembelian selesai", error)
        return NextResponse.json({
            message:"Server Error Status Pembelian Selesai",
        }, {status:500})
    }
}
