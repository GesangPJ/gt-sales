// Cari data produk berdasarkan barcode produk

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest){

    try{
        const barcode_p = req.nextUrl.searchParams.get("barcode")

        if(!barcode_p){
            return NextResponse.json({
                error: "Barcode Kosong!"},{status: 400})
        }

        const produks = await prisma.produk.findFirst({
            where:{
                barcode: barcode_p,
            },
            select:{
                id:true,
                nama_produk:true,
                harga_beli:true,
                harga_jual:true,
                stok:true,
            }
        })

        return NextResponse.json(produks, {status: 200})

    }catch(error : unknown){
        console.error("Data Produk tidak dapat diambil", error)
        return NextResponse.json(
        { error: "Terjadi kesalahan saat mengambil data produk" },
        { status: 500 }
        )

    }
}


