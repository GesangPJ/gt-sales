// API buat laporan Pembelian

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(){

    try{


    }catch(error){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}
