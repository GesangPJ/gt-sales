
// API Data Akun

import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"

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

export async function PUT(req: NextRequest){

    try{

        const body = await req.json()

        const {
            idakun,
            name,
            alamat,
            notelp,
        } = body

        if(!idakun || !name){
            return NextResponse.json({
                message: "ID atau nama tidak boleh kosong!"
            }, {status: 400})
        }

        const edit_akun = await prisma.user.update({
            where:{id:idakun},
            data:{
                name,
                alamat,
                notelp
            }
        })

        if(!edit_akun){
            console.error("Akun tidak ditemukan")
            return NextResponse.json({
                message:"Akun tidak ditemukan"
            }, {status: 404})
        }

        console.log("Berhasil menyimpan perubahan akun", edit_akun)
        return NextResponse.json({
            message:"Berhasil menyimpan perubahan akun",
            data: edit_akun,
        }, {status: 200})

        

    }catch(error){
    console.error("Error API Akun", error)
    return NextResponse.json({
        message:"Server Error API Akun"
    }, {status:500})

    }
}
