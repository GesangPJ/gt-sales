// Komponen Kolom pembelian

"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
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

export type Pembelian = {
    id: string
    kode_pembelian: string
    jumlahtotal: number,
    status_pembelian: string,
    biaya_kirim: number
}

export const kolom_pembelian = ({
  currentUserId,
}: {
  currentUserId?: string
}): ColumnDef<Pembelian>[] => [
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
    accessorKey: "kode_pembelian",
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
        {row.getValue("kode_pembelian")}
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
    accessorKey: "biaya_kirim",
    size:52,
    minSize:32,
    header: "Biaya Kirim",
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("biaya_kirim"))
      
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
    accessorKey:"status_pembelian",
    header:"Status",
    cell: ({ row }) => {
    const status = row.getValue("status_pembelian") as string

    return (
      <div className="pl-2">
        {status === "DIPESAN" && (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Dipesan
          </Badge>
        )}

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
    id:"detail",
    header:"",
    size:12,
    cell: ({row}) => {
        const id = row.original.id
        const kode = row.original.kode_pembelian
        const status = row.getValue("status_pembelian") as string

        const statusSelesai = async (pembelianId:string) =>{

            const payload = {
                pembelianId,
                idadmin:currentUserId,
            }

            try{

                const respon = await fetch(`${baseUrl}${switchAPI}/status-pembelian-selesai`,{
                    method:"PATCH",
                    headers:{"Content-Type":"application/json",},
                    body: JSON.stringify(payload)
                })

                if(!respon.ok){
                    console.log("Gagal ubah status ke SELESAI")
                    toast.warning("Gagal API mengubah status ke SELESAI")
                }

                toast.success("Berhasil mengubah status ke SELESAI")
                window.location.reload()

            }catch(error){
                console.error(error)
                toast.error("Gagal set status ke SELESAI")
            }

        }

        const statusBatal = async (pembelianId:string) =>{

            const payload = {
                pembelianId,
                idadmin:currentUserId,
            }

            try{

                const respon = await fetch(`${baseUrl}${switchAPI}/status-pembelian-batal`,{
                    method:"PATCH",
                    headers:{"Content-Type":"application/json",},
                    body: JSON.stringify(payload)
                })

                if(!respon.ok){
                    console.log("Gagal ubah status ke BATAL")
                    toast.warning("Gagal API mengubah status ke BATAL")
                }

                toast.success("Berhasil mengubah status ke BATAL")
                window.location.reload()

            }catch(error){
                console.error(error)
                toast.error("Gagal set status ke BATAL")
            }

        }

        return(
        <Popover>
            <PopoverTrigger render={<Button variant="outline"><IconDots/></Button>} />
        <PopoverContent className="w-64" align="end">
            <PopoverHeader>
                <PopoverTitle>
                    Pilih Opsi untuk: {kode}
                </PopoverTitle>
            </PopoverHeader>
            {status === "DIPESAN" && (
            <div className="grid grid-cols-1 gap-2">
            <AlertDialog>
            <AlertDialogTrigger 
            render={<Button 
            className="bg-green-100 text-green-700 hover:bg-green-100" 
            >Selesai</Button>} />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Set Status ke SELESAI?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Pastikan produk sudah sampai untuk pembelian :
                        {kode}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="destructive">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                    className="bg-green-100 text-green-700 hover:bg-green-100"
                    onClick={()=>statusSelesai(id)}
                    >
                        Status SELESAI
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
            <AlertDialogTrigger 
            render={<Button 
            className="bg-red-300 text-red-700 hover:bg-red-500" 
            >Batal</Button>} />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Set Status ke BATAL?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Pastikan pembelian tidak jadi untuk :
                        {kode}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Keluar
                    </AlertDialogCancel>
                    <AlertDialogAction
                    onClick={()=>statusBatal(id)}
                    className="bg-red-300 text-red-700 hover:bg-red-500" 
                    >
                        Status BATAL
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

            </AlertDialog>
            </div>
            )}

            <Button size="sm" variant="outline">
            <Link href={`/pembelian/detail-pembelian/${id}`}>Detail Pembelian</Link>
            </Button>

        
        </PopoverContent>
        </Popover>
        )


    }
  }

]


