
// Halaman Cari Detail Penjualan
'use client'

import { useState } from "react"
import { formatTanggalJam } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import{
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, InfoIcon, ScanQrCode} from "lucide-react"
import { Input } from "@/components/ui/input"

type DataPenjualan = {
    id: string
    kode_penjualan: string
    jumlahtotal: number
    metode_bayar: string
    status_penjualan: string
    nilai_diskon: number
    persen_diskon: number
    keterangan: string
    nama_pelanggan: string
    nama_admin: string
    createdAt: string
    updatedAt: string
    penjualandetail:[
        {
            produkId: string
            nama_produk: string
            harga: number
            jumlah: number
            total: number
        }
    ]

}

export default function HalamanCariPenjualan(){

    const [kode, setKode] = useState("")
    const [penjualans, setPenjualans] = useState<DataPenjualan | null>(null)
    const [loading, setLoading] = useState(false)

    const cariPenjualan = async () => {
    if (!kode) {
      toast.error("Masukkan kode penjualan")
      return
    }

    try {
      setLoading(true)

      const respon = await fetch(
        `${baseUrl}${switchAPI}/cari-penjualan?kode=${kode}`,
        { cache: "no-store" }
      )

      if (!respon.ok) {
        toast.error("Data tidak ditemukan")
        setPenjualans(null)
        return
      }

      const hasil = await respon.json()
      setPenjualans(hasil.data || null)
      setKode("")
    } catch (error) {
      console.error("Error Cari Penjualan", error)
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

    return(
<div>
<Card>
    <CardHeader className="border-b-2">
        <CardTitle className="text-xl text-center">
            Cari Detail Penjualan
        </CardTitle>
    </CardHeader>
    <CardContent>
       <div className="flex gap-2">
        <Input
            type="text"
            placeholder="Masukkan kode penjualan..."
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") cariPenjualan()
            }}
        />

        <Button onClick={cariPenjualan} disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            {loading ? "Mencari..." : "Cari"}
        </Button>
        </div>

{/* BELUM ADA DATA */}
{!penjualans && (
<p className="text-sm text-muted-foreground mt-7 text-center">
    Masukkan kode untuk menampilkan detail penjualan
</p>
)}

{/* Data Sudah Diambil */}
{penjualans && (
<div className="mt-7">

<div className="space-y-2 mt-3 mb-5">
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Kode</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{penjualans.kode_penjualan}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Jumlah Total</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">Rp{(penjualans.jumlahtotal).toLocaleString('id-ID')}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Metode</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{penjualans.metode_bayar}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Status</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{penjualans.status_penjualan}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Jumlah Diskon</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">
        Rp{(penjualans.nilai_diskon).toLocaleString('id-ID')}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Persen Diskon</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">
        {Number(penjualans.persen_diskon).toFixed(2) ?? "-"} %
    </p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Keterangan</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{penjualans.keterangan}</p>
    </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Pelanggan</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{penjualans.nama_pelanggan ?? "-"}</p>
    </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Admin</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{penjualans.nama_admin}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Dibuat</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{formatTanggalJam(penjualans.createdAt)}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
    <p className="font-medium text-left w-25">Diubah</p>
    <p className="text-center">:</p>
    <p className="whitespace-normal wrap-break-word">{formatTanggalJam(penjualans.updatedAt)}</p>
    </div>
</div>

<div className="mt-7">
<Table>
<TableHeader>
<TableRow>
    <TableHead className="w-12">No.</TableHead>
    <TableHead>Nama Produk</TableHead>
    <TableHead>Harga</TableHead>
    <TableHead>
        Jumlah
    </TableHead>
    <TableHead className="text-right">Total</TableHead>
</TableRow>
</TableHeader>
<TableBody>
    {penjualans.penjualandetail.map((details:any, index: number)=>(
    <TableRow key={details.produkId}>
    <TableCell>{index + 1}.</TableCell>
    <TableCell>{details.nama_produk}</TableCell>
    <TableCell>Rp{parseInt(details.harga).toLocaleString('id-ID')}</TableCell>
    <TableCell>{details.jumlah}</TableCell>
    <TableCell className="text-right">Rp{parseInt(details.total).toLocaleString('id-ID')}</TableCell>
    </TableRow>
    ))}
</TableBody>
<TableFooter>
    <TableRow>
        <TableCell colSpan={4}>Jumlah Total</TableCell>
        <TableCell className="text-right">Rp{(penjualans.jumlahtotal).toLocaleString('id-ID')}</TableCell>
    </TableRow>
</TableFooter>
</Table>

</div>

</div>

)}
    </CardContent>
</Card>

</div>
    )
}

