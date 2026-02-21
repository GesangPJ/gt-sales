// Tabel daftar akun

import { kolom_akun, Akun  } from "./kolom-akun";

import { DataTable } from "@/components/data-table"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import TableAkunClient from "./tabel-akun-client";

export default async function TabelAkun(){
    const session = await auth.api.getSession({
        headers: await headers(),
      })

    let akuns: Akun[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/data-akun`,
            {
               cache: 'no-store'
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
            <TableAkunClient
            data={akuns}
            currentUserId={session?.user?.id}
            />

        </div>
    )
}

