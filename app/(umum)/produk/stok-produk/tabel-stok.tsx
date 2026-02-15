// Komponen form update stok barang
"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { stokColumns, StokProduk } from "./stok-column"

type Props = {
  initialData: StokProduk[]
}

export default function TabelStokProduk({ initialData }: Props){
  const [data, setData] = useState<StokProduk[]>(initialData)
  const [editedStok, setEditedStok] = useState<Record<number, number>>({})

    return(
        <div className="">
            <DataTable
            columns={stokColumns(editedStok, setEditedStok)}
            data={data}
            />

        </div>
    )
}





