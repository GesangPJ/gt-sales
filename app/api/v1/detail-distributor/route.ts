// API Detail distributor

// GET detail

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if(!query){
    return NextResponse.json({
        message:"Query tidak boleh kosong!"
    }, {status:400})
   }

    try{

        const detail_distributor = await prisma.distributor.findUnique({
            where:{id:query},
            select:{
                nama_distributor:true,
                email_distributor:true,
                alamat_distributor:true,
                notelp_distributor:true,
                createdAt:true,
                updatedAt:true,
            }
        })

        if(!detail_distributor){

            return NextResponse.json({
                message:"Data tidak ditemukan"
            }, {status:404})
        }

        return NextResponse.json({
            message:"Berhasil ambil data distributor",
            data:detail_distributor,
        }, {status:200})

        
    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}



