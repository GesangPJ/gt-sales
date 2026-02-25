// Tabel Client Pembelian
'use client'
import { DataTable } from "@/components/data-table"
import { kolom_pembelian, Pembelian } from "./kolom-pembelian"

export default function TabelClientPembelian({
  data,
  currentUserId,
}: {
  data: Pembelian[]
  currentUserId?: string
}){
    const columns = kolom_pembelian({currentUserId})

    return(
        <div>
            <DataTable
            data={data}
            columns={columns}
            />
        </div>
    )

}




