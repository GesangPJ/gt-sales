// Tabel daftar akun

import { kolom_akun, Akun  } from "./kolom-akun";

import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"


export default async function TabelAkun(){

    let akuns: Akun[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/data-akun`,
            {
                next:{
                    tags:['akun'],
                    revalidate: 3600,
                }
            }
        )

        if(!respon.ok) throw new Error("Gagal ambil data akun")

        const hasil = await respon.json()

        akuns = hasil.data

    }catch(error){
        console.error(error)
    }

    return(
        <div>
            <DataTable
            columns={kolom_akun}
            data={akuns}
            />

        </div>
    )
}

