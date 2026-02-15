// Halaman Tabel Daftar produk untuk edit
// digunakan untuk pilih produk yang akan di edit

import TabelEditProduk from "./tabel-edit-produk"
import { ShimmerTable } from "@/components/mvpblocks/skeleton-table-1"
import { Suspense } from "react"

export default function DaftarEditProduk(){

    return(
        <div>
            <Suspense fallback={<ShimmerTable rowCount={5} columnCount={4}/>}>
                <TabelEditProduk/>
            </Suspense>

        </div>
    )
}



