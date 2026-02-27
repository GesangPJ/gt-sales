// Komponen Kolom Penjualan
'use client'

import { useState } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {IconDots} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { Input } from "@/components/ui/input"

export type Penjualan = {
    id: string
    kode_penjualan: string
    jumlahtotal: number
    metode_bayar: string
    status_penjualan: string
    persen_diskon: number
}

export const kolom_penjualan = ({
  currentUserId,
}: {
  currentUserId?: string
}): ColumnDef<Penjualan>[] => [
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
    accessorKey: "kode_penjualan",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Kode Penjualan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("kode_penjualan")}
      </div>
    ),
  },
  {
    accessorKey: "jumlahtotal",
    size:32,
    minSize:12,
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Jumlah Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("jumlahtotal"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,  // Hilangkan .00
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  {
  accessorKey: "persen_diskon",
  size: 32,
  minSize: 12,
  header: ({ column }) => {
    return (
      <div className="w-24">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Diskon (%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  },
  cell: ({ row }) => {
    const persen = Number(row.getValue("persen_diskon")) || 0

    const formatted = persen.toFixed(2) // 2 angka belakang koma

    return (
      <div className="text-left font-medium pl-2">
        {formatted}%
      </div>
    )
  },
},
{
    accessorKey: "metode_bayar",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Metode
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("metode_bayar")}
      </div>
    ),
  },
  {
    accessorKey:"status_penjualan",
    header:"Status",
    cell: ({ row }) => {
    const status = row.getValue("status_penjualan") as string

    return (
      <div className="pl-2">
        {status === "SELESAI" && (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Selesai
          </Badge>
        )}

        {status === "BATAL" && (
          <Badge variant="destructive">
            Batal
          </Badge>
        )}
      </div>
    )
  },
  },
  {
    id: 'detail',
    header:"",
    size: 12,
    cell: ({row}) => {
        const id = row.original.id
        const kode = row.original.kode_penjualan
        const status = row.original.status_penjualan
        const idadmin = currentUserId
        const [inputKode, setInputKode] = useState("")

const penjualanBatal = async (
  penjualanId: string,
  input_kode: string
) => {
  if (input_kode.trim() !== kode) {
    toast.warning("Kode tidak cocok!")
    return
  }

  try {
    const respon = await fetch(
      `${baseUrl}${switchAPI}/data-penjualan?id=${penjualanId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idadmin: idadmin,
        }),
      }
    )

    if (!respon.ok) {
      toast.error("Gagal membatalkan Penjualan")
      return
    }

    toast.warning(`Penjualan ${kode} Dibatalkan!`)
    window.location.reload()

  } catch (error) {
    console.error(error)
    toast.error("Gagal membatalkan Penjualan")
  }
}

return(
    <div>
<Popover>
<PopoverTrigger render={<Button variant="outline"><IconDots/></Button>} />
<PopoverContent className="w-64" align="end">
    <PopoverHeader>
        Pilih Opsi untuk : {kode}
    </PopoverHeader>
    {status === "SELESAI" && (
        <div className="grid grid-cols-1 gap-2">
    <AlertDialog>
    <AlertDialogTrigger 
    render={<Button 
    variant="destructive"
    >Batalkan</Button>} />
    <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Batalkan Penjualan ini?
      </AlertDialogTitle>
      <AlertDialogDescription>
        Apakah anda yakin ingin membatalkan penjualan : <b>{kode}</b>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className="space-y-2">
      <AlertDialogDescription>
        Ketik Kode Penjualan untuk Membatalkan
      </AlertDialogDescription>
      <Input
        type="text"
        value={inputKode}
        onChange={(e) => setInputKode(e.target.value)}
        placeholder="Masukkan kode penjualan"
      />
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel variant="outline">
        Keluar
      </AlertDialogCancel>

      <AlertDialogAction
        variant="destructive"
        onClick={() => penjualanBatal(id, inputKode)}
      >
        Batalkan Penjualan
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
    </AlertDialog>

<Button variant="outline">
    <Link href={`/penjualan/edit-penjualan/${id}`}>Edit Penjualan</Link>
</Button>
</div>
    )}
    <Button variant="outline">
    <Link href={`/penjualan/detail-penjualan/${id}`}>Detail Penjualan</Link>
</Button>
</PopoverContent>

</Popover>
</div>
)
    }
  }
]


