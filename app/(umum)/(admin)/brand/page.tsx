
// Halaman brand
import FormBrand from "./form-brand"
import TabelBrand from "./tabel-brand"
import { Suspense } from "react"
import { ShimmerTable } from "@/components/mvpblocks/skeleton-table-1"

export default function HalamanBrand(){

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

                {/* Tabel daftar brand */}
                <div>
                    <Suspense fallback={<ShimmerTable rowCount={10} columnCount={2}  />}>
                        <TabelBrand/>
                    </Suspense>

                </div>

                {/* Form Tambah Brand */}
                <div>
                    <FormBrand/>
                </div>

            </div>

        </div>
    )
}

