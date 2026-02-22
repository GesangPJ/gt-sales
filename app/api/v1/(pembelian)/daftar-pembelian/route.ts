// API Data pembelian

import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(_req: NextRequest){

    try{
        const data_pembelian = await prisma.pembelian.findMany({
            select:{
                id:true,
                kode_pembelian:true,
                status_pembelian:true,
                jumlahtotal:true,
                biaya_kirim:true,
            },
        })

        if(!data_pembelian){
            throw new Error(`Data pembelian tidak ditemukan`)
        }

        return NextResponse.json({
            success: true, 
            message:"Berhasil ambil daftar pembelian", 
            data:data_pembelian}, 
            {status:200})

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
