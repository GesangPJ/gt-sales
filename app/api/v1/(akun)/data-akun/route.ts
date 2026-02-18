
// API Data Akun

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){

    try{

        const data_akun = await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                alamat:true,
                notelp:true,
                banned:true,
            }
        })

        if(!data_akun){
            console.log("Data Akun kosong!")
            return NextResponse.json({
                message:"Data akun kosong!"
            }, {status: 404})
        }

        return NextResponse.json({
            message:"Data akun berhasil diambil",
            data: data_akun,
        }, {status:200})

    }catch(error){

        console.error("Error API Akun", error)

        return NextResponse.json({
            message:"Server Error API Akun"
        }, {status:500})
    }
}
