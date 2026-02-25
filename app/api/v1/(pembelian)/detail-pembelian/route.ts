
// API ambil detail pembelian

import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if(!query){
            return NextResponse.json({
                message:"ID tidak boleh kosong!"
            }, {status:400})
        }

    try{

        const detail_pembelian = await prisma.pembelian.findUnique({
            where:{id:query,},
            include:{
                pembeliandetail:{
                    select:{
                        id:true,
                        produkId:true,
                        harga:true,
                        jumlah:true,
                        total:true,
                        produk:{
                            select:{
                                nama_produk:true,
                            }
                        }

                    }
                },
                user:{
                    select:{
                        name:true,
                    }
                },
                distributor:{
                    select:{
                        nama_distributor:true,
                    }
                }
            }
        
        })

        if(!detail_pembelian){
            return NextResponse.json({
                message:"Data pembelian tidak ditemukan!"
            }, {status:404})
        }

        const hasil = {
            ...detail_pembelian,
            nama_admin: detail_pembelian?.user?.name,
            nama_distributor: detail_pembelian?.distributor?.nama_distributor || "-",
            pembeliandetail: detail_pembelian?.pembeliandetail.map(detail=>({
                id: detail.id,
                produkId: detail.produkId,
                nama_produk: detail.produk.nama_produk,
                harga_beli: detail.harga,
                jumlah: detail.jumlah,
                total: detail.total,
            }))

        }

        return NextResponse.json({
            message:"Berhasil ambil detail pembelian",
            data: hasil,
        }, {status:200})

    }catch(error:any){
        console.error("Error API detail pembelian", error)
        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}
