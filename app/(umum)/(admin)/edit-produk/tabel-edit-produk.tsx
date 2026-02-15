// Tabel daftar produk untuk pilih edit produk

import { EditProduk, KolomEditProduk } from "./kolom-edit-produk"
import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"


export default async function TabelEditProduk(){

    let produks: EditProduk[] = []

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
            columns={KolomEditProduk}
            data={produks}
            />
        </div>
    )
}



