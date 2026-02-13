// Komponen tabel kategori

import { kolom_kategori, Kategori } from "./kolom-kategori"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"


export default async function TabelKategori(){

    let kategoris: Kategori[] = []

    try{
        const respon = await fetch(`${baseUrl}${switchAPI}/data-kategori`,{
            next:{
                tags:["kategori"],
                revalidate:86400
            }
        })

        if(!respon.ok){
            console.error("Error ambil data kategori dari API")
        }

        const hasil = await respon.json()
        kategoris = hasil.data


    }catch(error:any){
        console.error("Error ambil data kategori :", error)
    }

    return(
        <div>
            <DataTable
            columns={kolom_kategori}
            data={kategoris}
            />
            
        </div>
    )
}


