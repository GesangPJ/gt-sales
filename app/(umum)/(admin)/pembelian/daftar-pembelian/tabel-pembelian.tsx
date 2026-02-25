// Komponen tabel pembelian
import { Pembelian } from "./kolom-pembelian"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import TabelClientPembelian from "./tabel-client-pembelian"

export default async function TabelPembelian(){
    const session = await auth.api.getSession({
            headers: await headers(),
    })

    let pembelians: Pembelian[] = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/daftar-pembelian`,{
            cache:"no-store",
        })

        if(!respon.ok) throw new Error("Gagal ambil data pembelian")
        const hasil = await respon.json()
        pembelians = hasil.data

    }catch(error){
        console.error(error)
    }

    const idadmin = session?.user?.id

    return(
        <div>
            <TabelClientPembelian
            data={pembelians}
            currentUserId={idadmin}
            />
        </div>
    )
}

