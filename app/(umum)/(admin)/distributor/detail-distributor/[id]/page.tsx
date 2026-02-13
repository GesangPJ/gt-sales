// Halaman dinamis detail distributor

import { formatTanggal } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"

interface DistributorProp{
    params: Promise<{id:string}>
}

export default async function HalamanDetailDistributor({params}:DistributorProp){

    const {id} = await params

    let dist = null

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/detail-distributor?id=${id}`,{
            next:{
                tags:['distributor',`distributor-${id}`],
                revalidate:86400,
            }
        })

        if(!respon.ok){
            console.log("Gagal ambil data distributor")
        }

        const hasil = await respon.json()
        dist = hasil.data

        console.log(dist)


    }catch(error:any){
        console.error("Error ambil detail distributor", error)
    }



    return(
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <h1 className="font-mono text-xl">ID Distributor : {id}</h1>
            </div>
            <div className="px-4 lg:px-6">
            <div className="space-y-2 mt-3 mb-5 text-xl">
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Nama</p>
                    <p className="text-center">:</p>
                    <p>{dist.nama_distributor}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Email</p>
                    <p className="text-center">:</p>
                    <p>{dist.email_distributor}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Alamat</p>
                    <p className="text-center">:</p>
                    <p>{dist.alamat_distributor}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">No.Telepon</p>
                    <p className="text-center">:</p>
                    <p>{dist.notelp_distributor}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Ditambahkan</p>
                    <p className="text-center">:</p>
                    <p>{formatTanggal(dist.createdAt)}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className="font-medium text-left w-40">Diubah</p>
                    <p className="text-center">:</p>
                    <p>{formatTanggal(dist.updatedAt)}</p>
                </div>
                
            </div>
           <Link href="/distributor" className="inline-block mt-3">
            <Button
                size="lg"
                variant="default"
                className="flex items-center gap-2 rounded-full h-10 w-35 bg-blue-500/40 text-white"
            >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-lg font-bold">Kembali</span>
            </Button>
            </Link>
            </div>
        </div>
    )

}

