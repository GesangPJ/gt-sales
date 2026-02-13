
// Halaman distributor
import TabelDistributor from "./tabel-distributor"
import FormDistributor from "./form-distributor"
import { Suspense } from "react"
import { ShimmerTable } from "@/components/mvpblocks/skeleton-table-1"

export default function HalamanDistributor(){


    return(
        <div>
            <div className="grid grid-cols-1 gap-2 md:gap-4">

                {/* Tabel daftar distributor */}
                <div>
                    <Suspense fallback={<ShimmerTable rowCount={5} columnCount={5}/>}>
                        <TabelDistributor/>
                    </Suspense>

                </div>

                {/* Form Tambah Distributor */}
                <div>
                <FormDistributor/>
                </div>

            </div>
        </div>
    )
}


