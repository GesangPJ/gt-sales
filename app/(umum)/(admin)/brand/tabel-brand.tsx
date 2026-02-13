// Komponen tabel Brand

import { kolom_brand, Brand } from "./kolom-brand";
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"

export default async function TabelBrand(){

    let brandis: Brand[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/data-brand`,{
            next:{
                tags:["brand"],
                revalidate: 86400,
            }
        })

        if(!respon.ok){
            console.error("Error ambil data brand")
        }

        const hasil = await respon.json()
        brandis = hasil.data


    }catch(error:any){
        console.error("Error ambil data brand dari API", error)

    }

    return(
        <div>
            <DataTable
            columns={kolom_brand}
            data={brandis}
            />
        </div>
    )
}

