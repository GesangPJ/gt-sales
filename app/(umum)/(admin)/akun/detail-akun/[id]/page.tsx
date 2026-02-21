// Halaman Detail akun

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

interface AkunProp{
    params: Promise<{id:string}>
}

export default async function HalamanDetailAkun({params}:AkunProp){

    const {id} = await params

    let akuns = null

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/detail-akun?id=${id}`,{
            cache: 'no-store'
        })

        if(!respon.ok){
            console.error("Error ambil detail akun")
        }

        const hasil= await respon.json()
        akuns = hasil.data

    }catch(error){

    }

    return(
        <div className="flex flex-col gap-2 py-4 md:gap-6 md:py-6">
            <div className="px-2 lg:px-4">
    <Card className="">
    <CardHeader className="border-b-2">
        <CardTitle>
            <h1 className="text-xl font-mono text-center">Detail Akun</h1>
        </CardTitle>
    </CardHeader>
    
    <CardContent>
        <div className="space-y-2 mt-3 mb-5">
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Nama</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{akuns.name}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Email</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{akuns.email}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Alamat</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{akuns.alamat}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">No. Telepon</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{akuns.notelp}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Status</p>
                <p className="text-center">:</p>
                <div className="whitespace-normal wrap-break-word">
                    <div>
                        {akuns.banned ? (
                            <span>Akun Diblokir</span>
                            ):(
                                <span>Akun Aktif</span>
                            )}

                    </div>
                    
                    
                    </div>
            </div>
             <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Dibuat</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{formatTanggal(akuns.createdAt)}</p>
            </div>
            <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
                <p className="font-medium text-left w-25">Diubah</p>
                <p className="text-center">:</p>
                <p className="whitespace-normal wrap-break-word">{formatTanggal(akuns.updatedAt)}</p>
            </div>
        </div>

        <Link href="/akun" className="inline-block mt-3">
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
    </Card>
    </div>
    </div>
    )

}


