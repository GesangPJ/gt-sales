// Halaman dinamis detail produk

import { formatTanggal } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"

interface ProdukProp{
    params: Promise<{id:string}>
}

export default async function HalamanDetailProduk({params}: ProdukProp){

    const {id} = await params

    let produks = null

    try{


    }catch(error){
        console.error("Error saat ambil detail produk")
    }

    return(
        <div>

        </div>
    )
}