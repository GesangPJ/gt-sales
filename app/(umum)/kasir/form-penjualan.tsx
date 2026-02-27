
// Form Penjualan Produk (Kasir)
'use client'

import { useState, useRef, useEffect} from "react"
import { keranjangPenjualan } from "./keranjang-penjualan"
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce" 
import { baseUrl } from '@/lib/base-url'
import { switchAPI } from '@/lib/select-API'
import {IconUser} from "@tabler/icons-react"
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
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Search, InfoIcon, ScanQrCode} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RowPenjualan } from "./row-penjualan"
import RippleWaveLoader from '@/components/mvpblocks/ripple-loader'
import { Separator } from '@/components/ui/separator'

export type Produk = {
    id: string,
    nama_produk: string,
    harga_jual: number,
    stok:number,
    jumlah: number,
    total:number,
    totalharga: number,
}

type MetodeTransaksi = "CASH" | "TRANSFER" | "QRIS"

export default function FormPenjualan(){
    const items = keranjangPenjualan((s) => s.items)
    const addItem = keranjangPenjualan((s)=> s.addItem)
    const clear = keranjangPenjualan((s)=>s.clear)
    const barcodeRef = useRef<HTMLInputElement>(null)
    const [barcode, setBarcode] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Produk[]>([])
    const [loadingBayar, setLoadingBayar] = useState(false)
    const [jumlahDiskon, setJumlahDiskon] = useState<number>(0)
    const [namaPelanggan, setNamaPelanggan] = useState("")
    const [open, setOpen] = useState(false)
    const { data: session, isPending, error } = authClient.useSession()
    const MAX_DISKON_PERCENT = 30
    const [keterangan, setKeterangan] = useState("")
    const maxLength = 150 // banyaknya kata untuk textarea
    const remaining = maxLength - keterangan.length  //sisa kata
    const [metodeTransaksi, setMetodeTransaksi] = useState<MetodeTransaksi | null>(null)

    const debouncedSearch = useDebouncedCallback(async (query: string) => {
        if (query.length < 2) {
        setSearchResults([])
        return
        }
        
        try {
        const res = await fetch(`${baseUrl}${switchAPI}/cari-produk?q=${encodeURIComponent(query)}`)
        if (res.ok) {
            const results = await res.json()
            setSearchResults(results)
        }
        } catch (error) {
        console.error("Search error:", error)
        }
    }, 300)

    // Barcode Scan
    const handleBarcodeScan = async (code: string) => {
    try {
      const res = await fetch(`${baseUrl}${switchAPI}/cari-produk-barcode?barcode=${code}`)
      
      if (res.ok) {
        const produk = await res.json()
        if (produk.id) {
          addItem({ ...produk, jumlah: 1 })
          toast.success(`Ditambahkan: ${produk.nama_produk}`)
        } else {
          toast.error("produk tidak ditemukan")
        }
      }
    } catch (error) {
      toast.error("Error scan barcode")
    } finally {
      setBarcode("")  // clear barcode
      barcodeRef.current?.focus()
    }
    }

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    const id_akun = session?.user?.id

    const Reset = () => {
        clear()
        setBarcode("")
        setJumlahDiskon(0)
        setNamaPelanggan("")
        setKeterangan("")
    }

    //  Hitung total belanja
const total = items.reduce(
  (sum, item) => sum + item.harga_jual * item.jumlah,
  0
)

// Maksimal diskon rupiah
const maxDiskonRupiah = (MAX_DISKON_PERCENT / 100) * total

// Derived persen (tidak disimpan di state)
const persenDiskon =
  total > 0 ? (jumlahDiskon / total) * 100 : 0

// Total setelah diskon
const totalsemua = total - jumlahDiskon

    const handleJumlahDiskon = (value: number) => {
    if (!total) {
        setJumlahDiskon(0)
        return
    }

    if (value < 0) value = 0

    if (value > maxDiskonRupiah) {
        value = maxDiskonRupiah
    }

    setJumlahDiskon(Math.round(value))
    }

    const handlePersenDiskon = (value: number) => {
    if (!total) {
        setJumlahDiskon(0)
        return
    }

    if (value < 0) value = 0
    if (value > MAX_DISKON_PERCENT) {
        value = MAX_DISKON_PERCENT
    }

    const rupiah = (value / 100) * total

    setJumlahDiskon(Math.round(rupiah))
    }

    if (error) {
    return (
        <div className="flex h-full items-center justify-center text-red-500">
        Gagal memuat sesi
        </div>
        )
    }

    if (isPending) {
    return (
        <div className="flex h-full items-center justify-center">
        <RippleWaveLoader />
        </div>
    )
    }

    const handleNamaSelect = (produk: Produk) => {
        addItem({ ...produk, jumlah: 1 })
        setSearch("")
        setSearchResults([])
    }
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault()

    if (barcode.trim().length < 8) {
      toast.error("Barcode minimal 8 digit")
      return
    }

    handleBarcodeScan(barcode.trim())
  }
}

const handleBayar = async () => {
    setLoadingBayar(true)

    const dataPenjualan = {
        idadmin:id_akun,
        nilai_diskon:jumlahDiskon,
        persen_diskon:persenDiskon,
        namapelanggan: namaPelanggan || null,
        jumlahtotal:totalsemua,
        keterangan:keterangan,
        metode: metodeTransaksi,
        produk: items.map(item=>({
            id: item.id,
            jumlah: item.jumlah,
            harga: item.harga_jual,
            total: item.total,
        }))
    }
    try{

        const respon = await fetch(`${baseUrl}${switchAPI}/transaksi-penjualan`,{
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dataPenjualan)
        })

        if(respon.ok){
        setOpen(false)
        toast.success('Transaksi Penjualan berhasil! 🎉')
        Reset()
        }else{
        setOpen(false)
        toast.error("Gagal membuat penjualan")
        }

    }catch(error){
        toast.error('Error koneksi')
    }finally{
        setLoadingBayar(false)
    }
}

return(
    <div className="space-y-4">

{/* Nama Pelanggan (opsional) */}
        <InputGroup className="max-w-100">
        <InputGroupInput
        className="font-mono text-sm"
        placeholder="Ketik Nama Pelanggan (opsional)"
        value={namaPelanggan}
        onChange={(e) => {
            setNamaPelanggan(e.target.value)
        }}
        />
        <InputGroupAddon>
        <IconUser className="h-5 w-5" />
        </InputGroupAddon>
    </InputGroup>

{/* Cari Produk via Barcode */}
<InputGroup className="mb-4">
    <InputGroupInput
  ref={barcodeRef}
  placeholder="Barcode... (min 8 digit)"
  value={barcode}
  onChange={(e) => setBarcode(e.target.value)}
  onKeyDown={handleKeyDown}
  className="text-sm tracking-widest font-mono"
  autoFocus
/>
      <InputGroupAddon>
      <ScanQrCode className="h-5 w-5" />
      </InputGroupAddon>
</InputGroup>

{/* Cari Produk via Nama Produk */}
        <InputGroup>
        <InputGroupInput
        className="font-mono text-sm tracking-widest"
        placeholder="Ketik Nama Produk..."
        value={search}
        onChange={(e) => {
            setSearch(e.target.value)
            debouncedSearch(e.target.value)
        }}
        />
        <InputGroupAddon>
        <Search className="h-5 w-5" />
        </InputGroupAddon>
    </InputGroup>
    
    {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded-lg p-2 bg-background">
        {searchResults.slice(0, 9).map((produk) => (
            <div
            key={produk.id}
            className="p-3 hover:bg-accent rounded-md cursor-pointer border flex items-center space-x-3"
            onClick={() => handleNamaSelect(produk)}
            >
            <div className="font-medium">{produk.nama_produk}</div>
            <div className="text-sm text-muted-foreground ml-1">stok:{produk.stok}</div>
            <div className="text-sm text-muted-foreground ml-1">
                {new Intl.NumberFormat("id-ID", { 
                style: "currency", 
                currency: "IDR", 
                minimumFractionDigits: 0 
                }).format(produk.harga_jual)}
            </div>
            </div>
        ))}
        </div>
    )}

    <div className="border rounded-md max-h-[40vh] overflow-y-auto">
    <Table className="w-full text-sm border table-fixed">
    <TableHeader className="bg-muted sticky top-0 z-10">
      <TableRow>
      <TableHead className="sticky top-0 bg-muted z-20 p-2">
        Nama
      </TableHead>
      <TableHead className="sticky top-0 bg-muted z-20 p-2">
        Harga
      </TableHead>
      <TableHead className="sticky top-0 bg-muted z-20 p-2 w-20">
        Jumlah
      </TableHead>
      <TableHead className="sticky top-0 bg-muted z-20 p-2">
        Total
      </TableHead>
      <TableHead className="sticky top-0 bg-muted z-20 p-2 w-10" />
    </TableRow>
    </TableHeader>

    <TableBody>
        {items.map((item) => (
        <RowPenjualan key={item.id} item={item} />
        ))}
    </TableBody>
    </Table>
    </div>

<div className=" bg-background border-t">

    <div className="grid grid-cols-1 my-7 md:grid-cols-2 gap-3">

    <div>
         

<div className="grid grid-cols-2 gap-2">
  {/* Diskon Dalam Rupiah */}
  <InputGroup className="max-w-52">
    <InputGroupInput
      id="diskonRupiah"
      type="number"
      min={0}
      max={maxDiskonRupiah}
      placeholder="Masukkan diskon rupiah"
      value={jumlahDiskon}
      onChange={(e) => {
        const value = Number(e.target.value)
        handleJumlahDiskon(isNaN(value) ? 0 : value)
      }}
    />
    <InputGroupAddon align="block-start">
      <Label htmlFor="diskonRupiah" className="text-foreground">
        Diskon (Rp)
      </Label>

      <Tooltip>
        <TooltipTrigger
          render={
            <InputGroupButton
              variant="ghost"
              aria-label="Help"
              className="ml-auto rounded-full"
              size="icon-xs"
            >
              <InfoIcon />
            </InputGroupButton>
          }
        />
        <TooltipContent>
          <p>Diskon dalam jumlah Rupiah. </p>
          <p>Maksimal {MAX_DISKON_PERCENT}% dari total.</p>
        </TooltipContent>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>

  {/* Diskon Dalam Persen */}
  <InputGroup className="max-w-52">
    <InputGroupInput
      id="diskonPersen"
      type="number"
      min={0}
      max={MAX_DISKON_PERCENT}
      step="0.01"
      placeholder="Masukkan diskon persen"
      value={total > 0 ? Number(persenDiskon.toFixed(2)) : 0}
      onChange={(e) => {
        const value = Number(e.target.value)
        handlePersenDiskon(isNaN(value) ? 0 : value)
      }}
    />
    <InputGroupAddon align="block-start">
      <Label htmlFor="diskonPersen" className="text-foreground">
        Diskon (%)
      </Label>

      <Tooltip>
        <TooltipTrigger
          render={
            <InputGroupButton
              variant="ghost"
              aria-label="Help"
              className="ml-auto rounded-full"
              size="icon-xs"
            >
              <InfoIcon />
            </InputGroupButton>
          }
        />
        <TooltipContent>
          <p>Diskon dalam jumlah Persen. </p>
          <p>Maksimal {MAX_DISKON_PERCENT}%</p>
        </TooltipContent>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>
  
</div>
  
</div>
       

<div>

<div className="my-3 flex justify-start md:justify-end">
<Select
value={metodeTransaksi}
onValueChange={(value) => setMetodeTransaksi(value)}
>
<SelectTrigger>
<SelectValue placeholder="Pilih Metode Pembayaran" />
</SelectTrigger>

<SelectContent alignItemWithTrigger={false}>
<SelectGroup>
<SelectLabel>Metode Pembayaran</SelectLabel>
<SelectItem value="CASH">CASH</SelectItem>
<SelectItem value="QRIS">QRIS</SelectItem>
<SelectItem value="TRANSFER">TRANSFER BANK</SelectItem>

</SelectGroup>
</SelectContent>
</Select>

</div>
<div className="my-3 flex justify-start md:justify-end">
  <div className="w-full md:w-150">
    <InputGroup className="w-full">
      <InputGroupTextarea
        name="keterangan"
        id="keterangan"
        placeholder="Masukkan Keterangan transaksi (opsional)"
        value={keterangan}
        onChange={(e) =>
          setKeterangan(e.target.value.slice(0, maxLength))
        }
        maxLength={maxLength}
        rows={5}
      />

      <InputGroupAddon align="block-end">
        <InputGroupText className="text-muted-foreground text-xs">
          {remaining}/{maxLength} karakter
          {remaining < 20 && (
            <span className="text-destructive ml-1">!</span>
          )}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>

  </div>
</div>
</div>
    </div>
    <div className="flex flex-col gap-3 max-w-75">
</div>

<div className="text-right space-y-1 mr-5 md:max-w-md md:ml-auto">
  {/* Total sebelum diskon (hanya tampil jika ada diskon) */}
  {jumlahDiskon > 0 && (
    <div className="text-sm text-muted-foreground ">
      Total sebelum diskon: {formatRupiah(total)}
    </div>
  )}

  {/* Total setelah diskon */}
  <div className="text-xl font-bold">
    Jumlah Total: {formatRupiah(totalsemua)}
  </div>

</div>
<Separator/>

<div className="flex gap-3 mt-5">      
<Button
    variant="destructive" 
    className="flex-1 h-14 text-xl"
    onClick={Reset}
>
    Reset
</Button>
<AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger
    render={
        <Button 
    className="flex-1 h-14 text-xl" 
    onClick={()=> setOpen(true)}
    disabled={loadingBayar || items.length === 0}
>
    {loadingBayar ? "Memproses..." : "Bayar"}
</Button>
    }
    />
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                Buat Transaksi Penjualan?
            </AlertDialogTitle>
            <AlertDialogDescription>
                Apakah anda yakin ingin membuat transaksi penjualan ini?
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel variant="destructive">
                Batal
            </AlertDialogCancel>
            <AlertDialogAction
            onClick={handleBayar}
            disabled={loadingBayar || items.length === 0}
            className="bg-green-100 text-green-700 hover:bg-green-100"
            >
                Buat Pembelian
            </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>

</div>

</div>

</div>
)







}

