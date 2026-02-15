// Halaman profile akun
// diambil dari session

import DataAkun from "./data-akun"
import GantiPassword from "./ganti-pass"
import { Suspense } from "react"
import LoadingCardBiasa from "@/components/loading/loading-card-biasa"

export default function HalamanProfile(){

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <Suspense fallback={<LoadingCardBiasa/>}>
                    <DataAkun/>
                </Suspense>

                <GantiPassword/>

            </div>
        </div>
    )


}

