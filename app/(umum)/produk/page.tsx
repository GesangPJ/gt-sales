// Halaman daftar produk

import { Suspense } from "react"
import { ShimmerTable } from "@/components/mvpblocks/skeleton-table-1"
import TabelProduk from "./tabel-produk"

export default function HalamanProduk(){

    return(
        <div>
            <Suspense fallback={<ShimmerTable rowCount={5} columnCount={5}/>}>
                <TabelProduk/>
            </Suspense>
            
        </div>
    )
}

