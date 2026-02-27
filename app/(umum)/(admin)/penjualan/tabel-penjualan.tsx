// Komponen tabel Penjualan
import { Penjualan } from "./kolom-penjualan"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import TabelClientPenjualan from "./tabel-client-penjualan"

export default async function TabelPenjualan(){
    const session = await auth.api.getSession({
            headers: await headers(),
    })

    let penjualans: Penjualan[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/data-penjualan`,{
            cache:"no-store",
        })

        if(!respon.ok) throw new Error("Gagal ambil data Penjualan")
        const hasil = await respon.json()
        penjualans = hasil.data

    }catch(error){
        console.error(error)
    }

    const idadmin = session?.user?.id

    return(
        <div>
            <TabelClientPenjualan
            data={penjualans}
            currentUserId={idadmin}
            />
        </div>
    )
}

