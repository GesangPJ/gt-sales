

// Tabel Client Penjualan
'use client'
import { DataTable } from "@/components/data-table"
import { kolom_penjualan, Penjualan } from "./kolom-penjualan"

export default function TabelClientPenjualan({
  data,
  currentUserId,
}: {
  data: Penjualan[]
  currentUserId?: string
}){
    const columns = kolom_penjualan({currentUserId})

    return(
        <div>
            <DataTable
            data={data}
            columns={columns}
            />
        </div>
    )

}




