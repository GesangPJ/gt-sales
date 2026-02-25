// API cari data produk berdasarkan nama produk

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams.get('q')

    if(!query || query.length < 2) {
        return NextResponse.json([], {status: 400})
    }

    try{
        const produks = await prisma.produk.findMany({
            where: {
                nama_produk: {
                    contains: query,
                }
            },
            select:{
                id:true,
                nama_produk:true,
                harga_beli:true,
                harga_jual:true,
                stok:true,
            },
            take: 10, // Maksimum 10 hasil
        })

        return NextResponse.json(produks, {status:200})


    }catch(error : unknown){
        console.error("Data Produk tidak dapat diambil", error)
        return NextResponse.json(
        { error: "Terjadi kesalahan saat mengambil data produk" },
        { status: 500 }
        )
    }


}


