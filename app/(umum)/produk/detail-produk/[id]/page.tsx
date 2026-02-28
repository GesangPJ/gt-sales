// Halaman dinamis detail produk

import { formatTanggal } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import{
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

interface ProdukProp{
    params: Promise<{id:string}>
}

export default async function HalamanDetailProduk({params}: ProdukProp){

    const {id} = await params

    let produks = null

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/detail-produk/?id=${id}`,{
            next:{
                tags:[`produk-${id}`],
            }
        })

        if(!respon.ok){
            console.error("Error ambil detail produk")
        }

        const hasil = await respon.json()
        produks = hasil.data

    }catch(error){
        console.error("Error saat ambil detail produk")
    }

    return(
        <div className="flex flex-col gap-2 py-4 md:gap-6 md:py-6">
            <div className="px-2 lg:px-4">
    <Card className="">
    <CardHeader className="border-b-2">
        <CardTitle>
            <h1 className="text-xl font-mono text-center">Detail Produk</h1>
        </CardTitle>
    </CardHeader>
    
    <CardContent>
        <div className="space-y-2 mt-3 mb-5">
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Nama</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{produks.nama_produk}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-1">
                <p className="font-medium text-left w-25">Status</p>
                <p className="text-center">:</p>
                <div>
                    {produks.isActive ? (
                    <Badge className="bg-green-500 w-15 h-7 hover:bg-green-600 text-white">
                        Aktif
                    </Badge>
                    ) : (
                    <Badge variant="destructive">
                        Tidak Aktif
                    </Badge>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Barcode</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{produks.barcode}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Harga Beli</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">Rp{parseInt(produks.harga_beli).toLocaleString("id-ID")}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Harga Jual</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">Rp{parseInt(produks.harga_jual).toLocaleString("id-ID")}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Stok</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{parseInt(produks.stok)}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Keterangan</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{produks.keterangan}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Kategori</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{produks.kategori?.nama_kategori ?? "-"}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Brand</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{produks.brand?.nama_brand ?? "-"}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Admin</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{produks.user?.name ?? "-"}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Ditambahkan</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{formatTanggal(produks.createdAt)}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Diubah</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{formatTanggal(produks.updatedAt)}</p>
            </div>
            
        </div>
        <Link href="/produk" className="inline-block mt-3">
        <Button
        size="lg"
        variant="default"
        className="flex items-center gap-2 rounded-full h-10 w-35 bg-blue-500/40 text-white"
        >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Kembali</span>
        </Button>
        </Link>
    </CardContent>
    <CardFooter>
        <h1 className="font-mono text-center text-muted-foreground">ID Produk : {id}</h1>
    </CardFooter>
    </Card>
                
            </div>
        </div>
    )
}