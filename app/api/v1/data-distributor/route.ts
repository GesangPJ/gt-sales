// API Distributor

// GET POST PUT

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"

export async function GET(){

    try{

        const data_distributor = await prisma.distributor.findMany({
            select:{
                id:true,
                nama_distributor:true,
                email_distributor:true,
                notelp_distributor:true,
            }
        })

        if(!data_distributor){
            return NextResponse.json({
                message:"Data distributor kosong!"
            },{status:404})
        }

        return NextResponse.json({
            message:"Berhasil ambil data distributor",
            data: data_distributor,
        },{status:200})


    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// POST tambah distributor
export async function POST(req: NextRequest){

    try{
        const body = await req.json()

        const {
            namadist,
            emaildist,
            notelpdist,
            alamatdist,
        } = body

        if(!namadist || !emaildist){

            return NextResponse.json({
                message:"Ada data yang kosong!"
            }, {status: 400})
        }

        const tambah_distributor = await prisma.distributor.create({
            data:{
                nama_distributor:namadist,
                email_distributor:emaildist,
                alamat_distributor:alamatdist,
                notelp_distributor:notelpdist,
            },
        })

        revalidateTag('distributor','max')
        console.log("Berhasil menambahkan distributor", tambah_distributor)

        return NextResponse.json({
            message:"Berhasil menambahkan distributor"
        }, {status:201})

    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

//PUT Edit distributor
export async function PUT(req: NextRequest){

    try{

        const body = await req.json()

        const {
            iddist,
            namadist,
            emaildist,
            notelpdist,
            alamatdist,
        } = body

        if(!iddist || !namadist || !emaildist){
            return NextResponse.json({
                message:"Ada data yang kosong!"
            }, {status:400})
        }

        const update_distributor = await prisma.distributor.update({
            where:{id:iddist,},
            data:{
                nama_distributor:namadist,
                email_distributor:emaildist,
                notelp_distributor:notelpdist,
                alamat_distributor:alamatdist,
            },
        })

        revalidateTag('distributor','max')
        console.log("Berhasil update distributor", update_distributor)

        return NextResponse.json({
            message:"Berhasil update distributor"
        }, {status:201})

    }catch(error:any){
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}