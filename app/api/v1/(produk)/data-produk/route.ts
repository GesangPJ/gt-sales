
// API data produk
// GET, POST, PUT, PATCH

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

//Ambil produk untuk daftar produk

export async function GET(){

    try{

        const data_produk = await prisma.produk.findMany({
            select:{
                id:true,
                nama_produk:true,
                harga_beli:true,
                harga_jual:true,
                stok:true,
                kategori:{
                    select:{
                        nama_kategori:true,
                    }
                },

            }
        })

        if(!data_produk){
            return NextResponse.json({
                message:"Data produk kosong!"
            }, {status:404})
        }

        const hasil = data_produk.map((produk)=>({
            ...produk,
            namakategori: produk.kategori?.nama_kategori ?? "-",
        }))

        return NextResponse.json({
            message:"Berhasil ambil data produk",
            data: hasil
        }, {status:200})


    }catch(error){

        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

// Tambah Produk
export async function POST(req: NextRequest){

    try{

        const body = await req.json()

        const {
            namaproduk,
            idadmin,
            barcodeproduk,
            idkategori,
            hargabeli,
            iddistributor,
            idbrand,
            hargajual,
            stokproduk,
            keterangan,
        } = body

        if(!namaproduk || !hargabeli || !hargajual || !idadmin){
            return NextResponse.json({
                message:"Ada data yang kosong!"
            },{status:400})
        }

        const tambah_produk = await prisma.produk.create({
            data:{
                nama_produk:namaproduk,
                barcode:barcodeproduk,
                harga_beli:parseInt(hargabeli),
                harga_jual:parseInt(hargajual),
                stok:parseInt(stokproduk),
                kategoriId:idkategori,
                userId:idadmin,
                distributorId:iddistributor,
                brandId:idbrand,
                keterangan,
                isActive:true,
            },
        })


        if(!tambah_produk){
            console.log("Gagal menambahkan produk", tambah_produk)
            return NextResponse.json({
                message:"Gagal menambahkan produk",
                data:tambah_produk
            }, {status:500})
        }

        revalidateTag("produk","max")
        console.log("Berhasil menambahkan produk", tambah_produk)
        return NextResponse.json({
            message:"Berhasil menambahkan produk"
        }, {status:201})

    }catch(error:any){
        console.error("Error tidak bisa menambahkan produk", error)

        return NextResponse.json({
            message:`Server Error ${error}`
        }, {status:500})
    }
}

// PATCH update stok produk
export async function PATCH(req: NextRequest){

    const query = req.nextUrl.searchParams.get('id')

    if(!query){
    return NextResponse.json({
        message:"ID tidak boleh kosong!"
    }, {status:400})
   }

    try{

        const body = await req.json()

        const {stokproduk} = body

        if(!stokproduk){
            return NextResponse.json({
                message:"Data stok kosong!"
            }, {status:400})
        }

        const update_stok = await prisma.produk.update({
            where:{id:query},
            data:{
                stok:parseInt(stokproduk),
            },
        })

        revalidateTag("produk","max")
        console.log("Stok produk diupdate ", query, update_stok,)

        return NextResponse.json({
            message:"Berhasil update stok produk"
        }, {status:201})

    }catch(error){

        return NextResponse.json({
            message:"Server Error"
        }, {status:500})
    }
}

