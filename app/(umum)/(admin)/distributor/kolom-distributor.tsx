// Komponen kolom distributor

'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"

export type Distributor = {
    id: string
    nama_distributor: string
    email_distribtuor: string
    alamat_distributor: string
    notelp_distributor: string

}


export const kolom_distributor: ColumnDef<Distributor>[] = [
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
    accessorKey: "nama_distributor",
    size:50,
    minSize:32,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("nama_distributor")}
      </div>
    ),
  },
  {
    accessorKey: "email_distributor",
    size:50,
    minSize:32,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue("email_distributor")}
      </div>
    ),
  },
  {
    accessorKey: "notelp_distributor",
    size:32,
    minSize:12,
    header:"No. Telepon"
  },
  {
    id: "detail",
    header:" ",
    size:32,
    minSize:20,
    cell: ({row}) => {
      const id = row.original.id

      return (
        <div className="flex justify-center">
        <Button size="sm" variant="outline">
          <Link href={`/distributor/detail-distributor/${id}`}>Detail</Link>
        </Button>
      </div>
      )
      
    }
  },

]


