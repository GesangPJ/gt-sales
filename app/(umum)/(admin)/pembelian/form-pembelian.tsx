// Form Pembelian Produk

"use client"

import { useState, useEffect} from 'react'
import { keranjangPembelian } from './keranjang-pembelian'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Search, InfoIcon} from "lucide-react"
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
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce" 
import { baseUrl } from '@/lib/base-url'
import { switchAPI } from '@/lib/select-API'
import {IconArrowBadgeDownFilled, IconDeviceFloppy} from "@tabler/icons-react"
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
import RippleWaveLoader from '@/components/mvpblocks/ripple-loader'
import { Separator } from '@/components/ui/separator'

interface CartItem {
  id: string
  nama_produk: string
  harga_beli: number
  jumlah: number ,
  total:number,
  totalharga: number,
  stok: number,
}

type Produk = {
    id: string,
    nama_produk: string,
    harga_beli: number,
    stok:number,
    jumlah: number,
    total:number,
    totalharga: number,
}

type Distributor = {
    id: string
    nama_distributor: string
}

function CartRow({ item }: { item: CartItem }) {
  const { updateHargaBeli, updateQty, removeItem } = keranjangPembelian()

  const [editing, setEditing] = useState(false)
  const [harga, setHarga] = useState(item.harga_beli)
  const [qty, setQty] = useState(item.jumlah)

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

  const updateHarga = () => {
    updateHargaBeli(item.id, harga)
    setEditing(false)
  }

  const updateJumlah = () => {
    updateQty(item.id, qty)
  }

  const total = item.harga_beli * item.jumlah

  return (
    <tr className="border-t">
      <td className="p-2">{item.nama_produk}</td>

      {/* Harga Beli */}
      <td className="p-2">
        {editing ? (
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(parseInt(e.target.value) || 0)}
            onBlur={updateHarga}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateHarga()
              if (e.key === "Escape") {
                setHarga(item.harga_beli)
                setEditing(false)
              }
            }}
            className="w-28 border p-1"
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={() => setEditing(true)}
            className="cursor-pointer"
          >
            {formatRupiah(item.harga_beli)}
          </div>
        )}
      </td>

      {/* Jumlah */}
      <td className="p-2">
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
          onBlur={updateJumlah}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateJumlah()
          }}
          className="w-20 border p-1"
        />
      </td>

      {/* Total */}
      <td className="p-2 font-medium">
        {formatRupiah(total)}
      </td>

      {/* Delete */}
      <td className="p-2">
        <button
          onClick={() => removeItem(item.id)}
          className="bg-red-500 text-white px-2 py-1"
        >
          X
        </button>
      </td>
    </tr>
  )
}

export default function FormPembelian(){
   const items = keranjangPembelian((s) => s.items)
    const addItem = keranjangPembelian((s) => s.addItem)
    const clear = keranjangPembelian((s) => s.clear)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Produk[]>([])
    const [loadingBayar, setLoadingBayar] = useState(false)
    const [biayaKirim, setBiayaKirim] = useState(0)
    const [distributors, setDistributor] = useState<Distributor[]>([])
    const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null)
    const [open, setOpen] = useState(false)
    const { data: session, isPending, error } = authClient.useSession()

     useEffect(() => {
        ambilDistributor()
    }, [])

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

    const id_akun = session?.user?.id

    const Reset = () => {
        clear()
        setBiayaKirim(0)
        setSelectedDistributor(null)
    }

    const total = items.reduce((sum, item) => sum + (item.harga_beli * item.jumlah), 0)

    const totalsemua = total + biayaKirim

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    async function ambilDistributor(){

        try{
            const respon = await fetch(`${baseUrl}${switchAPI}/data-distributor`)
            if (!respon.ok) throw new Error("Gagal ambil nama distributor")

            const hasil = await respon.json()

            setDistributor(hasil.data)

        }catch(error){
            console.error("Nama distributor tidak bisa diambil dari API", error)
        }
    }

    const handleNamaSelect = (produk: Produk) => {
        addItem({ ...produk, jumlah: 1 })
        setSearch("")
        setSearchResults([])
    }

    const handleBayar = async () => {
        setLoadingBayar(true)
        
        // Siapkan data untuk API
        const dataPembelian = {
            userId: id_akun,
            distributorId : selectedDistributor?.id || null,
            biayakirim: biayaKirim || 0,
            totalharga: totalsemua,
            produk: items.map(item => ({
                id: item.id,
                jumlah: item.jumlah,
                harga_beli: item.harga_beli,
                total: item.totalharga,
            }))
        }
        
        try {
            const res = await fetch(`${baseUrl}${switchAPI}/transaksi-pembelian`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataPembelian),
            })
            
            if (res.ok) {
            setOpen(false)
            toast.success('Transaksi Pembelian berhasil! 🎉')
            clear()  // Kosongkan cart
            setSelectedDistributor(null)
            setBiayaKirim(0)
            } else {
            setOpen(false)
            toast.error('Gagal membuat pembelian')
            }
        } catch (error) {
            toast.error('Error koneksi')
        } finally {
            setLoadingBayar(false)
        }
    }

    return(
        <div className="space-y-4">
            <div className="max-w-full">
                <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline">
                        {selectedDistributor
                            ? selectedDistributor.nama_distributor
                            : "Pilih Distributor"}{" "}
                        <IconArrowBadgeDownFilled className="ml-2" /></Button>}
                        />
                <DropdownMenuContent className="max-w-150 max-h-60 overflow-y-auto p-1" align="start">
                    {distributors.map((distributor) => (
                    <DropdownMenuItem
                        key={distributor.id}
                        onClick={() => setSelectedDistributor(distributor)}
                    >
                        {distributor.nama_distributor}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            </div>
            <InputGroup>
            <InputGroupInput
            className="font-mono text-xl tracking-widest"
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
                    }).format(produk.harga_beli)}
                </div>
                </div>
            ))}
            </div>
        )}

        {/* <DataTable columns={columnpembelian as any} data={data} /> */}
        <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm border">
            <thead className="bg-muted">
                <tr>
                <th className="text-left p-2">Nama</th>
                <th className="text-left p-2">Harga Beli</th>
                <th className="text-left p-2 w-24">Jumlah</th>
                <th className="text-left p-2">Total Harga</th>
                <th className="text-left p-2 w-10">Hapus</th>
                </tr>
            </thead>

            <tbody>
                {items.map((item) => (
                <CartRow key={item.id} item={item} />
                ))}
            </tbody>
            </table>
        </div>

        <div className="sticky bottom-0 bg-background border-t p-4">

            <div className="flex max-w-75">
            <InputGroup>
                <InputGroupInput
                id="biayaKirim"
                type="number"
                min={0}
                placeholder='masukkan biaya pengiriman'
                value={biayaKirim}
                onChange={(e) => setBiayaKirim(parseInt(e.target.value) || 0)}
                />
                <InputGroupAddon align="block-start">
                <Label htmlFor="email-2" className="text-foreground">
                    Biaya Kirim
                </Label>
                <Tooltip>
                    <TooltipTrigger render={
                        <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        className="ml-auto rounded-full"
                        size="icon-xs"
                    >
                        <InfoIcon />
                    </InputGroupButton>
                    }/>
                    <TooltipContent>
                    <p>Masukkan Biaya pengiriman jika ada.</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
            </InputGroup>
            </div>
           <div className="text-right md:text-right space-y-2 mr-5 md:max-w-md md:ml-auto">
            
            <div className="text-3xl font-bold mb-3">
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
                {loadingBayar ? "Memproses..." : "Pesan Produk"}
            </Button>
                }
                />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Buat Transaksi Pembelian?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin ingin membuat transaksi pembelian ini?
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
