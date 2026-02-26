// API Detail Penjualan

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){

    const id = req.nextUrl.searchParams.get('id')

    if(!id){
        return NextResponse.json({
            message:"ID tidak boleh kosong!"
        }, {status:400})
    }

    try{

        const detail_penjualan = await prisma.penjualan.findUnique({
            where:{id},
            include:{
                penjualandetail:{
                    select:{
                        id:true,
                        produkId:true,
                        jumlah:true,
                        harga:true,
                        total:true,
                        produk:{
                            select:{
                                nama_produk:true,
                            }
                        }
                    },
                },
                user:{
                    select:{
                        name:true,
                    }
                }
            }
        })

        if(!detail_penjualan){
            return NextResponse.json({
                message:"Detail penjualan tidak ditemukan!"
            }, {status:404})
        }

        const hasil = {
            ...detail_penjualan,
            nama_admin: detail_penjualan?.user?.name || "-",
            penjualandetail: detail_penjualan?.penjualandetail.map((detail=>({
                id: detail.id,
                produkId: detail.produkId,
                nama_produk: detail.produk.nama_produk,
                harga: detail.harga,
                jumlah: detail.jumlah,
                total: detail.total,
            })))
        }

        return NextResponse.json({
            message:"Berhasil ambil detail penjualan",
            data: hasil,
        }, {status:200})

    }catch(error){
        console.error("Error API GET Detail Penjualan", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}
