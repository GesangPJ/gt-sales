
// Halaman Kategori
import TabelKategori from "./tabel-kategori"
import { Suspense } from "react"
import { ShimmerTable } from "@/components/mvpblocks/skeleton-table-1"
import FormKategori from "./form-kategori"

export default function HalamanKategori(){

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

                {/* Tabel Daftar Kategori */}
                <div className="mt-3">
                    <Suspense fallback={<ShimmerTable rowCount={10} columnCount={2}  />}>
                        <TabelKategori/>
                    </Suspense>
                </div>
                
                {/* Form Tambah Kategori */}
                <div className="mt-3">
                    <FormKategori/>
                </div>

            </div>
        </div>
    )
}

