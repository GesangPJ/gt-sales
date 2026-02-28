
// API buat laporan penjualan

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(){

    try{

        const data_penjualan = await prisma.penjualan.findMany({
            
        })

    }catch(error){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}