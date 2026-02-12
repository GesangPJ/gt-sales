// API Data Brand

// GET POST PUT

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";


export async function GET(){

    try{

        const data_brand = await prisma.brand.findMany({
            select:{
                id:true,
                nama_brand:true,
            }
        })

        if(!data_brand){
            return NextResponse.json(
              {
                message:"Data brand kosong!"
              },{status:404}
            )
        }

        return NextResponse.json({
            message:"Berhasil ambil data brand",
            data:data_brand
        },{status:200})

    }catch(error){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// POST Brand
export async function POST(req:NextRequest){

    try{
        const body = await req.json()

        const {
            nama
        } = body

        if(!nama){
            return NextResponse.json({
                message:"Nama tidak boleh kosong!"
            }, {status:400})
        }

        const tambah_brand = await prisma.brand.create({
            data:{
                nama_brand:nama,
                isActive:true,
            }
        })

        console.log('Brand ditambahkan', tambah_brand)
        revalidateTag('brand','max')
        return NextResponse.json({
            message:"Berhasil menambahkan brand"
        }, {status:201})

    }catch(error){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}
