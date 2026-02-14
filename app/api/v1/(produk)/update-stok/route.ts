// API Update stok produk

import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { success } from "zod"


export async function PUT(req: NextRequest){

    try{
        const body = await req.json()
        const {id, stokproduk} = body

        if(!id || !stokproduk){
            console.log("ID / Stok kosong!")

        return NextResponse.json({
        success: false,
        message:"Data ID / Stok Kosong!"}, {status: 400})
        }

        const cekproduk = await prisma.produk.findUnique({
            where:{id:id},
        })

        if(!cekproduk){
            console.log(`Produk ID : ${id} tidak ditemukan!`)
            return NextResponse.json({
            success:false,
            message:"ID Barang tidak ditemukan!",},
            {status:404})

        }

        const updatestok = await prisma.produk.update({
            where:{id: id,},
            data:{stok:parseInt(stokproduk)}
        })

        revalidateTag('produk','max')
        console.log(`Stok Produk ${id} berhasil diupdate`)
        return NextResponse.json(
            {
                success: true,
                data:updatestok,
                message: "Stok Barang berhasil diupdate!"
            },{status: 201}
        )

    }catch(error){
        console.error("Update error:", error)
        return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 }
        )
    }
}

export async function GET(_req: NextRequest){

    try{
        const ambilstok = await prisma.produk.findMany({
            select:{
                id:true,
                nama_produk:true,
                stok:true,
            }
        })

        if(!ambilstok){
            return NextResponse.json({
                success:false,
                message:"Tabel Produk Kosong!"
            }, {status:404})
        }

        
        return NextResponse.json({
            success:true,
            data:ambilstok,
            message:"Data Produk berhasil diambil!"
        }, {status:200})

    }catch(error){
        console.error("Update error:", error)
        return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 }
        )

    }
}



