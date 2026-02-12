
// API DATA KTEGORI
// GET, POST, PUT

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"

// Ambil Kategori
export async function GET(){

    try{

        const ambil_kategori = await prisma.kategori.findMany({
            select:{
                id:true,
                nama_kategori:true,
                jenis:true,
            }
        })

        if(!ambil_kategori){
            return NextResponse.json({
                message:"Data Kategori kosong!"
            }, {status: 404})
        }

        return NextResponse.json({
            message:"Berhasil ambil data kategori",
            data:ambil_kategori
        }, {status:200})

    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// Tambah Kategori

export async function POST(req:NextRequest){

    try{

        const body = await req.json()

        const {
            nama,
            jeniskategori
        } = body

        if(!nama || !jeniskategori){
            return NextResponse.json({
                message:"Data tidak boleh kosong!"
            }, {status:400})
        }

        const tambah_kategori = await prisma.kategori.create({
            data:{
                nama_kategori:nama,
                jenis:jeniskategori,
                isActive:true,
            },
        })

        console.log(`Kategori baru ditambahkan`, tambah_kategori)
        revalidateTag('kategori','max')
        return NextResponse.json({
            message:"Berhasil menambahkan kategori"
        }, {status:201})

    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// Edit Kategori 

export async function PUT(req:NextRequest){

    try{

        const body = await req.json()

        const {
            idkategori,
            nama,
            jeniskategori
        } = body

        if(!idkategori || !nama || !jeniskategori){
        return NextResponse.json({
            message:"Data tidak boleh kosong!"
        }, {status:400})
        }

        const update_kategori = await prisma.kategori.update({
            where:{id:idkategori,},
            data:{
                nama_kategori:nama,
                jenis:jeniskategori,
            }
        })

        console.log("Kategori diupdate", update_kategori)
        revalidateTag('kategori','max')
        return NextResponse.json({
            message:"Berhasil update kategori"
        }, {status:201})


    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}


