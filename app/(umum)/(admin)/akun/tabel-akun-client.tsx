// Test middle component

"use client"

import { DataTable } from "@/components/data-table"
import { kolom_akun, Akun } from "./kolom-akun"


export default function TableAkunClient({
  data,
  currentUserId,
}: {
  data: Akun[]
  currentUserId?: string
}){

    const columns = kolom_akun({ currentUserId })

    return(
        <div>
            <DataTable
            data={data}
            columns={columns}
            />
        </div>
    )

}


