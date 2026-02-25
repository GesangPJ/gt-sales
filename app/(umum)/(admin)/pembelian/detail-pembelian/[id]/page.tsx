// Halaman detail pembelian

import { formatTanggal, formatTanggalJam } from "@/lib/formattanggal"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {ArrowLeft} from "lucide-react"
import { toast } from "sonner"
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

interface DetailProps{
    params: Promise<{id:string}>
}

export default async function HalamanDetailPembelian({params}: DetailProps){

    const {id} = await params

    let details = null
    let detailPembelian = []

    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/detail-pembelian?id=${id}`,{
            next:{
                tags:['pembelian',`pembelian-${id}`],
            }
        })

        if(!respon.ok){
            console.log("Gagal ambil detail pembelian")
            toast.warning("Gagal ambil data dari API")
        }

        const hasil = await respon.json()
        details = hasil.data
        detailPembelian = details?.pembeliandetail || []


    }catch(error){
        toast.error("Gagal ambil detail pembelian")
        console.error(error)
    }

    return(
<div>
<Card>
<CardHeader  className="border-b-2">
    <CardTitle className="text-xl font-bold text-center">
        Detail Pembelian</CardTitle>
</CardHeader>
<CardContent>
    <div className="space-y-2 mt-3 mb-5">
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Kode</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{details.kode_pembelian}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Jumlah Total</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">Rp{parseInt(details.jumlahtotal).toLocaleString('id-ID')}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Biaya Kirim</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">Rp{parseInt(details.biaya_kirim).toLocaleString('id-ID')}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Status</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{details.status_pembelian}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Distributor</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{details.nama_distributor}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Admin</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{details.nama_admin}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Tanggal Pembelian</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{formatTanggalJam(details.createdAt)}</p>
    </div>
    <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-1">
        <p className="font-medium text-left w-25">Diubah</p>
        <p className="text-center">:</p>
        <p className="whitespace-normal wrap-break-word">{formatTanggalJam(details.updatedAt)}</p>
    </div>
    </div>
</CardContent>
<CardFooter>
        <span className="font-mono text-muted-foreground text-sm">ID Pembelian : {details.id}</span>
</CardFooter>
</Card>
<Card className="my-5">
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
    {detailPembelian.map((details:any, index:number)=>(
    <TableRow key={details.produkId}>
        <TableCell>{index + 1}.</TableCell>
        <TableCell>{details.nama_produk}</TableCell>
        <TableCell>Rp{parseInt(details.harga_beli).toLocaleString('id-ID')}</TableCell>
        <TableCell>{details.jumlah}</TableCell>
        <TableCell className="text-right">Rp{parseInt(details.total).toLocaleString('id-ID')}</TableCell>
    </TableRow>
    ))}
    </TableBody>
    <TableFooter>
        <TableRow>
            <TableCell colSpan={4}>Jumlah Total</TableCell>
            <TableCell className="text-right">Rp{parseInt(details.jumlahtotal).toLocaleString('id-ID')}</TableCell>
        </TableRow>
    </TableFooter>
</Table>
</CardContent>

</Card>

 <Link href="/pembelian/daftar-pembelian" className="inline-block mt-3">
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


