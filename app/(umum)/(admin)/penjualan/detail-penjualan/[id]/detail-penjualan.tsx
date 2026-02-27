// Komponen Detail Penjualan

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

interface DetailProps {
    idpenjualan: string
}

export default async function DetailPenjualan(
    {idpenjualan}:DetailProps
){

    let penjualans = null
    let details = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/detail-penjualan?id=${idpenjualan}`,{
            next:{
                tags:['penjualan',`penjualan-${idpenjualan}`],
            }
        })

        if(!respon.ok){
            toast.warning("Tidak bisa mengambil data dari API")
        }

        const hasil = await respon.json()
        penjualans = hasil.data
        details = penjualans?.penjualandetail || []

    }catch(error){
        console.error("Error Detail Penjualan :", error)
    }

    return(
<div>
    {/* Detail Penjualan */}
    <Card className="mb-7">
    <CardHeader className="border-b-2">
        <CardTitle className="text-xl text-center font-bold">
            Detail Penjualan
        </CardTitle>
    </CardHeader>
    <CardContent>
    <div className="space-y-2 mt-3 mb-5">
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Kode</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{penjualans.kode_penjualan}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Jumlah Total</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">Rp{parseInt(penjualans.jumlahtotal).toLocaleString('id-ID')}</p>
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
            Rp{parseInt(penjualans.nilai_diskon).toLocaleString('id-ID')}</p>
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
    </CardContent>
        
    </Card>

{/* Tabel Daftar Produk */}
<Card>
<CardHeader className="border-b-2">
    <CardTitle className="text-xl text-center font-bold">
        Daftar Produk
    </CardTitle>
</CardHeader>
<CardContent>
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
    {details.map((details:any, index: number)=>(
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
        <TableCell className="text-right">Rp{parseInt(penjualans.jumlahtotal).toLocaleString('id-ID')}</TableCell>
    </TableRow>
</TableFooter>
</Table>
</CardContent>
</Card>

<Link href="/penjualan" className="inline-block mt-3">
<Button
size="lg"
variant="default"
className="flex items-center gap-2 rounded-full h-10 w-35 bg-blue-500/40 text-white"
>
    <ArrowLeft className="h-5 w-5" />
    <span className="font-bold">Kembali</span>
</Button>
</Link>

</div>
    )


}
