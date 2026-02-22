
// Kolom daftar akun

"use client"

import { ColumnDef } from "@tanstack/react-table"
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

export type Akun = {
    id: string
    name: string
    email: string
    alamat: string
    notelp: string
}

export function useAmbilSesi() {
  const { data: session, isPending } = authClient.useSession()
  return { session, isPending }
}

export const kolom_akun = ({
  currentUserId,
}: {
  currentUserId?: string
}): ColumnDef<Akun>[] => [

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
      <div className="pl-2">
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
        {row.getValue("alamat")}
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
      <div className="pl-2">
        {row.getValue("notelp")}
      </div>
    ),
  },
  {
    accessorKey: "banned",
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isBanned = row.getValue("banned") as boolean

      

      return (
        <div className="pl-2">
          {isBanned ? (
            <Badge variant="destructive">Diblokir</Badge>
          ) : (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Aktif
            </Badge>
          )}
        </div>
      )
    }
  },
  {
    id: "detail",
    header:" ",
    size:32,
    minSize:20,
    cell: ({row}) => {
      const id = row.original.id
      const nama = row.original.name
      const isBanned = row.getValue("banned") as boolean

      const banAkun = async (iduser:string) => {

          try{

            if (currentUserId === iduser) {
              toast.error("Tidak bisa memblokir akun sendiri")
              return
            }

            const {error} = await authClient.admin.banUser({
              userId: iduser,
              banReason:"Blokir akses akun"
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success("Berhasil blokir akun")
            window.location.reload()
            

          }catch (err) {
            console.error(err)
            toast.error("Terjadi kesalahan saat ban user")
          }

        }

        const bukaBan = async (iduser: string) => {

          try{

            const {error} = await authClient.admin.unbanUser({
              userId: iduser
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success("Berhasil aktifkan akun")
            window.location.reload()
            

          }catch (err) {
            console.error(err)
            toast.error("Terjadi kesalahan saat aktifkan akun")
          }

        }

        const cabutSesi = async (iduser:string) => {

          try{
            const {error} =  await authClient.admin.revokeUserSessions({
              userId: iduser,
            })

          if (error) {
                toast.error(error.message)
                return
          }

          toast.success("Berhasil cabut sesi akun")
          window.location.reload()


          }catch(err){
            console.error(err)
            toast.error("Terjadi kesalahan")
          }
        }

      return (
        <Popover>
          <PopoverTrigger render={<Button variant="outline"><IconDots/></Button>} />
          <PopoverContent className="w-64" align="end">
            <PopoverHeader>
              <PopoverTitle>
                Pilih Opsi
              </PopoverTitle>
            </PopoverHeader>
            {isBanned ? (
              <AlertDialog>
                <AlertDialogTrigger 
              render={<Button variant="outline" >Aktifkan</Button>} />
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Aktifkan Akun ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah anda yakin ingin aktifkan akun "{nama}" ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">Batal</AlertDialogCancel>
                  <AlertDialogAction 
                  className="bg-green-100 text-green-700 hover:bg-green-100"
                  onClick={()=>bukaBan(id)}
                  >
                    Aktifkan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
              <AlertDialogTrigger 
              render={<Button variant="destructive" >Blokir</Button>} />
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Blokir Akun ini?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah anda yakin ingin blokir akun "{nama}" ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Batal</AlertDialogCancel>
                <AlertDialogAction 
                onClick={()=>banAkun(id)}
                variant="destructive">Blokir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
            ) }

            <AlertDialog>
              <AlertDialogTrigger 
              render={<Button variant="destructive" >Cabut Sesi</Button>} />
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Hapus semua session akun {nama} ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Ini akan membuat akun keluar dari semua perangkat.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                  onClick={()=>cabutSesi(id)}
                  variant="destructive"
                  >
                    Cabut Sesi Akun
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>

            </AlertDialog>
            
          <Button size="sm" variant="outline">
            <Link href={`/akun/detail-akun/${id}`}>Detail Akun</Link>
          </Button>

          </PopoverContent>

        </Popover>
      ) 
    }
  },
]



