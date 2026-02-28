
// Komponen Tabel Distributor

import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { kolom_distributor, Distributor } from "./kolom-distributor"
import { toast } from "sonner"

export default async function TabelDistributor(){

    let distributors: Distributor[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/data-distributor`,{
            next:{
                tags:['distributor'],
            }
        })

        if(!respon.ok){
            toast.error("Gagal ambil data distributor")
        }

        const hasil = await respon.json()
        distributors = hasil.data


    }catch(error:any){
        console.error("Error ambil data distributor", error)
    }

    return(
        <div>
            <DataTable
            columns={kolom_distributor}
            data={distributors}
            />

        </div>
    )
}

