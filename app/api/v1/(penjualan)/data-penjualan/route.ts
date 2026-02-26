
// API Data Penjualan

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"
import { revalidateTag } from "next/cache"

export async function GET(){

    try{
        const data_penjualan = await prisma.penjualan.findMany({
            select:{
                id:true,
                kode_penjualan:true,
                jumlahtotal:true,
                metode_bayar:true,
                persen_diskon:true,
            }
        })

        if(!data_penjualan){
            return NextResponse.json({
                message:"Data Penjualan kosong!"
            }, {status:404})
        }

        return NextResponse.json({
            message:"Data penjualan berhasil diambil!",
            data: data_penjualan,
        }, {status:200})

    }catch(error){
        console.error("Error API GET Data Penjualan", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// Ubah Data penjualan

export async function PUT(req: NextRequest){

    const body = await req.json()

    const {
        idpenjualan,
        jumlah_total,
        metode,
        idadmin,
        produk,
    } = body

     if (!idpenjualan || !produk || produk.length === 0) {
    return NextResponse.json(
      { message: "ID penjualan dan produk tidak boleh kosong!" },
      { status: 400 }
    )
  }

  try {
    const hasil = await prisma.$transaction(async (tx) => {

      // 1. Ambil transaksi lama + detail
      const transaksiLama = await tx.penjualan.findUnique({
        where: { id: idpenjualan },
        include: { penjualandetail: true },
      })

      if (!transaksiLama) {
        throw new Error("Transaksi tidak ditemukan")
      }

      // 2. Kembalikan stok lama
      for (const item of transaksiLama.penjualandetail) {
        await tx.produk.update({
          where: { id: item.produkId },
          data: {
            stok: {
              increment: item.jumlah,
            },
          },
        })
      }

      // 3. Hapus detail lama
      await tx.penjualanDetail.deleteMany({
        where: { penjualanId: idpenjualan },
      })

      // 4. Update data penjualan
      await tx.penjualan.update({
        where: { id: idpenjualan },
        data: {
          metode_bayar: metode,
          jumlahtotal: jumlah_total,
        },
      })

      // 5. Buat detail baru
      await tx.penjualanDetail.createMany({
        data: produk.map((p: any) => ({
          penjualanId: idpenjualan,
          produkId: p.id,
          jumlah: p.jumlah,
          harga: p.harga,
          total: p.jumlah * p.harga,
        })),
      })

      // 6. Kurangi stok baru
      for (const item of produk) {
        await tx.produk.update({
          where: { id: item.id },
          data: {
            stok: {
              decrement: item.jumlah,
            },
          },
        })
      }

      // 7. Update jurnal (hapus lama & buat ulang)
      await tx.jurnal.deleteMany({
        where: { kode: transaksiLama.kode_penjualan },
      })

      await tx.jurnal.createMany({
        data: [
          {
            kode: transaksiLama.kode_penjualan,
            akun: "KAS",
            debit: jumlah_total,
            kredit: new Prisma.Decimal(0),
            userId: idadmin,
            sumber: metode,
            keterangan: `Update Penjualan ${transaksiLama.kode_penjualan}`,
          },
          {
            kode: transaksiLama.kode_penjualan,
            akun: "PENJUALAN",
            debit: new Prisma.Decimal(0),
            kredit: jumlah_total,
            userId: idadmin,
            sumber: metode,
            keterangan: `Update Penjualan ${transaksiLama.kode_penjualan}`,
          },
        ],
      })

      return transaksiLama
    })

    revalidateTag("produk","max")
    revalidateTag("penjualan","max")
    revalidateTag(`penjualan-${idpenjualan}`,"max")

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi berhasil diperbarui!",
        data: hasil,
      },
      { status: 200 }
    )


    }catch(error){
        console.error("Error API PUT Data Penjualan", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// Penjualan BATAL

export async function PATCH(req: NextRequest){

   const id = req.nextUrl.searchParams.get("id")

  if (!id) {
    return NextResponse.json(
      { message: "ID tidak boleh kosong!" },
      { status: 400 }
    )
  }

  try {
    const hasil = await prisma.$transaction(async (tx) => {

      // 1. Ambil transaksi penjualan & detail
      const transaksi = await tx.penjualan.findUnique({
        where: { id },
        include: { penjualandetail: true },
      })

      if (!transaksi) {
        throw new Error("Transaksi tidak ditemukan")
      }

      // Jika sudah Batal maka return
      if (transaksi.status_penjualan === "BATAL") {
        throw new Error("Transaksi sudah dibatalkan")
      }

      // 2. Update status jadi BATAL
      await tx.penjualan.update({
        where: { id },
        data: { status_penjualan: "BATAL" },
      })

      // 3. Kembalikan stok produk
      for (const item of transaksi.penjualandetail) {
        await tx.produk.update({
          where: { id: item.produkId },
          data: {
            stok: {
              increment: item.jumlah,
            },
          },
        })
      }

      // 4. Buat Jurnal Pembalik (Reversal)
      await tx.jurnal.createMany({
        data: [
          // Kebalikan dari jurnal awal
          {
            kode: transaksi.kode_penjualan,
            akun: "KAS",
            debit: new Prisma.Decimal(0),
            kredit: transaksi.jumlahtotal,
            userId: transaksi.userId,
            sumber: "PEMBATALAN",
            keterangan: `Pembatalan Penjualan ${transaksi.kode_penjualan}`,
          },
          {
            kode: transaksi.kode_penjualan,
            akun: "PENJUALAN",
            debit: transaksi.jumlahtotal,
            kredit: new Prisma.Decimal(0),
            userId: transaksi.userId,
            sumber: "PEMBATALAN",
            keterangan: `Pembatalan Penjualan ${transaksi.kode_penjualan}`,
          },
        ],
      })

      return transaksi
    })

    revalidateTag("penjualan", "max")
    revalidateTag(`penjualan-${id}`,"max")
    revalidateTag("produk","max")

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi berhasil dibatalkan!",
        data: hasil,
      },
      { status: 200 }
    )

    }catch(error){
        console.error("Error API PATCH Data Penjualan", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}
