// API Edit pembelian

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"

export async function PUT(req: NextRequest){
    try{
        const body = await req.json()
        const{
            pembelianId,
            distributorId,
            adminId,
            biayakirim,
            totalharga,
            items,
        } = body
        await prisma.$transaction(async (tx) => {
      // Update master pembelian
      await tx.pembelian.update({
        where: { id: pembelianId },
        data: {
          distributorId: distributorId || null,
          biaya_kirim:biayakirim,
          jumlahtotal:totalharga,
          userId:adminId,
        },
      })
      // Hapus detail lama
      await tx.pembelianDetail.deleteMany({
        where: { pembelianId: pembelianId },
      })
      // Insert ulang detail baru
      for (const item of items) {
        await tx.pembelianDetail.create({
          data: {
            pembelianId: pembelianId,
            produkId: item.produkId,
            harga: item.harga_beli,
            jumlah: item.jumlah,
            total: item.harga_beli * item.jumlah,
          },
        })
      }
    })
    revalidateTag("pembelian","max")
    revalidateTag(`pembelian-${pembelianId}`,"max")
    return NextResponse.json({
      message: "Pembelian berhasil diupdate",
    })
    }catch(error){
        console.error("Error API Edit Pembelian", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}
