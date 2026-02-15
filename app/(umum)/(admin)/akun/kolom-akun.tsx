
// Kolom daftar akun

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"

export type Akun = {
    id: string
    name: string
    email: string
    alamat: string
    notelp: string
}

export const kolom_akun : ColumnDef<Akun>[] = [

    {
    id: "no",
    // header: "No",
    header: () => {
      return (
          <div className="text-center w-1.5">No.</div>
      )
    },
    size: 10,
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
    accessorKey: "name",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Akun
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Email Akun
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "alamat",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Alamat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "notelp",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nomor Telpon
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("notelp")}
      </div>
    ),
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
          <Link href={`/akun/detail-akun/${id}`}>Detail</Link>
        </Button>
      </div>
      ) 
    }
  },
]



