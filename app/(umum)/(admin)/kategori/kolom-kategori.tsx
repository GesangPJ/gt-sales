
// Komponen Kolom Kategori

'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

export type Kategori = {
    id: string
    nama_kategori: string
}

export const kolom_kategori: ColumnDef<Kategori>[] = [
    {
    id: "no",
    size:12,
    minSize:10,
    header: () => {
      return (
          <div className="text-center">No.</div>
      )
    },
    cell: ({ row, table }) => {
      // Index berdasarkan row yang sedang ditampilkan (respect sorting & filtering)
      const sortedRows = table.getSortedRowModel().flatRows
      const index =
        sortedRows.findIndex((r) => r.id === row.id)
      return <p className="text-center">{index + 1}.</p>
    },
    enableSorting: false,
  },
  {
    accessorKey: "nama_kategori",
    size:50,
    minSize:32,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("nama_kategori")}
      </div>
    ),
  },
  {
    accessorKey: "jenis_kategori",
    size:50,
    minSize:32,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Jenis Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("jenis_kategori")}
      </div>
    ),
  },
]


