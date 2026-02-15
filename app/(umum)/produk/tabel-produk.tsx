// Komponen tabel produk

import { kolom_produk, Produk } from "./kolom-produk"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { toast } from "sonner"

export default async function TabelProduk(){

    let produks: Produk[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/data-produk`,{
            next:{
                tags:['produk'],
                revalidate: 120,
            }
        })

        if(!respon.ok){
            console.error("Tidak dapat mengambil data produk")
        }

        const hasil = await respon.json()
        produks = hasil.data

    }catch(error){

    }

    return(
        <div>
            <DataTable
            columns={kolom_produk}
            data={produks}
            />

        </div>
    )
}
