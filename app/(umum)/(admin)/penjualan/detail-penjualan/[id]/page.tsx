// Halaman Detail Penjualan
// 'use client'

import { Suspense, use } from "react"

import DetailPenjualan from "./detail-penjualan"
import LoadingDetails from "@/components/loading/loading-details"

export default function HalamanDetailPenjualan({
  params,
}: {
  params: Promise<{ id: string }>
}){
    const {id} = use(params)

    return(
    <div>
    <Suspense fallback={<LoadingDetails/>}>
        <DetailPenjualan
        idpenjualan={id}
        />
    </Suspense>
    </div>
    )
}



