// API ambil detail akun

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    try{

        if(!query){
            return NextResponse.json({
                message:"ID Kosong!"
            }, {status:400})
        }

        const detail_akun = await prisma.user.findUnique({
            where:{id:query,},
            select:{
                name:true,
                email:true,
                banned:true,
                banReason:true,
                alamat:true,
                notelp:true,
                createdAt:true,
                updatedAt:true,
            }
        })

        if(!detail_akun){
            return NextResponse.json({
                message:"Akun tidak ditemukan"
            }, {status: 404})
        }

        return NextResponse.json({
            message:"Berhasil ambil detail akun",
            data: detail_akun,
        }, {status:200})

    }catch(error){
        console.error("Error API Detail akun")
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }


}

