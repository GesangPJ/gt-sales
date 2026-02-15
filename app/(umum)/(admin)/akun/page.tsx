
// Halaman daftar akun

import { Suspense } from "react"
import { ShimmerTable } from "@/components/mvpblocks/skeleton-table-1"
import TabelAkun from "./tabel-akun"

export default function HalamanAkun(){

    return(
        <div>
            <Suspense fallback={<ShimmerTable rowCount={5} columnCount={4}/>} >
                <TabelAkun/>
            </Suspense>
        </div>
    )


}



