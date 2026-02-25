// API update status pembelian ke BATAL
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
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

        const batal_pembelian = await prisma.pembelian.update({
            where:{id:pembelianId,},
            data:{
                userId: idadmin,
                status_pembelian:"BATAL",
            }
        })

        if(!batal_pembelian){
            return NextResponse.json({
                message:"Pembelian tidak ditemukan!"
            }, {status:404})
        }

        revalidateTag("pembelian","max")

        return NextResponse.json({
            message:"Pembelian berhasil dibatalkan!"
        }, {status:200})


    }catch(error){
        console.error("Error API pembelian selesai", error)
        return NextResponse.json({
            message:"Server Error Status Pembelian Selesai",
        }, {status:500})
    }
}
