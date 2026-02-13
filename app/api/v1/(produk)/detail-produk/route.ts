// API detail produk

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if(!query){
        return NextResponse.json({
            message:"ID Tidak boleh kosong!"
        }, {status:400})
    }

    try{

        const detail_produk = await prisma.produk.findUnique({
            where:{id:query},
            include:{
                kategori:{
                    select:{
                        nama_kategori:true,
                    }
                }
            }
        })

        if(!detail_produk){
            return NextResponse.json({
                message:"Data produk tidak ditemukan!"
            }, {status:404})
        }

        const hasil = {
            ...detail_produk,
            namakategori: detail_produk.kategori?.nama_kategori || "-"
        }

        console.log("Detail produk berhasil diambil", hasil)
        
        return NextResponse.json({
            message:"Detail produk berhasil diambil",
            data: hasil
        }, {status:200})

    }catch(error:any){
        return NextResponse.json({
            message:"Server Error API detail produk"
        }, {status:500})
    }
}


