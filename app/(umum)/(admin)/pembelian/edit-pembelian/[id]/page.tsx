// Halaman dinamis edit pembelian produk
'use client'
import { use } from "react"
import { authClient } from "@/lib/auth-client"
import RippleWaveLoader from "@/components/mvpblocks/ripple-loader"
import FormEditPembelian from "./form-pembelian-edit"

// interface DetailProps{
//     params: Promise<{id:string}>
// }

export default function HalamanEditPembelian({
  params,
}: {
  params: Promise<{ id: string }>
}){
    const {data: session, isPending} = authClient.useSession()

     const { id } = use(params)

    const idakun = session?.user?.id || ""

    if (isPending) {
    return (
        <div className="flex h-full items-center justify-center">
        <RippleWaveLoader />
        </div>
    )
    }

    return(
        <div>
            <FormEditPembelian
            pembelianId={id}
            idadmin={idakun}
            />
        </div>
    )

}

