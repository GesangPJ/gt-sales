
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useEditPembelianStore } from "./keranjang-pembelian-edit"
import { useDebouncedCallback } from "use-debounce"
import {EditRow} from "./row-edit-pembelian"
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import {Search, InfoIcon, ArrowLeft} from "lucide-react"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Distributor {
  id: string
  nama_distributor: string
}

interface Produk {
  id: string
  nama_produk: string
  harga_beli: number
  stok: number
}

interface Props {
  pembelianId: string
  idadmin: string
}

export default function FormEditPembelian({
  pembelianId, idadmin
}: Props) {
//   const { id } = useParams()
  const router = useRouter()

  const {
    items,
    setItems,
    addItem,
    removeItem,
    clear,
  } = useEditPembelianStore()

  const [loading, setLoading] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)
  const [kodepembeliam, setKodePembelian] = useState("")
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [selectedDistributor, setSelectedDistributor] =
    useState<Distributor | null>(null)
  const [biayaKirim, setBiayaKirim] = useState(0)

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<Produk[]>([])

  // =============================
  // Load Distributor
  // =============================
  useEffect(() => {
    async function loadDistributor() {
      const res = await fetch(`${baseUrl}${switchAPI}/data-distributor`)
      const data = await res.json()
      setDistributors(data.data)
    }
    loadDistributor()
  }, [])

  // =============================
  // Load Data Pembelian
  // =============================
  useEffect(() => {
  async function loadData() {
    try {
      const res = await fetch(
        `${baseUrl}${switchAPI}/detail-pembelian?id=${pembelianId}`
      )

      if (!res.ok) throw new Error("Data tidak ditemukan")

      const data = await res.json()

      const pembelian = data.data

      setSelectedDistributor(pembelian.distributor)
      setBiayaKirim(pembelian.biaya_kirim)
      setKodePembelian(pembelian.kode_pembelian)

      setItems(
        pembelian.pembeliandetail.map((d: any) => ({
          produkId: d.produkId,
          nama_produk: d.nama_produk,
          harga_beli: d.harga_beli,
          jumlah: d.jumlah,
          total: d.total,
          // stok: d.produk.stok,
        }))
      )
    } catch (error) {
      console.error("Gagal load data", error)
    } finally {
      setLoading(false)
    }
  }

  if (pembelianId) loadData()
}, [pembelianId, setItems])

  // =============================
  // Search Produk
  // =============================

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

  const handleSelectProduk = (produk: Produk) => {
  addItem({
    produkId: produk.id,
    nama_produk: produk.nama_produk,
    harga_beli: produk.harga_beli,
    jumlah: 1,
    stok: produk.stok,
  })

  setSearch("")
  setSearchResults([])
}

useEffect(() => {
  return () => {
    debouncedSearch.cancel()
  }
}, [debouncedSearch])

  // =============================
  // Total
  // =============================
  const totalProduk = items.reduce(
    (sum, item) => sum + item.harga_beli * item.jumlah,
    0
  )

  const totalSemua = totalProduk + biayaKirim

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

  // =============================
  // Submit
  // =============================
  const handleUpdate = async () => {
    setLoadingSave(true)

    try {
      const payload = {
        pembelianId,
        adminId: idadmin,
        totalharga: totalSemua,
        distributorId: selectedDistributor?.id || null,
        biayakirim: biayaKirim,
        items: items.map((item) => ({
          produkId: item.produkId,
          harga_beli: item.harga_beli,
          jumlah: item.jumlah,
        })),
      }

      const res = await fetch(`${baseUrl}${switchAPI}/edit-pembelian`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Gagal update")

      toast.success("Berhasil update pembelian")
      clear()
      router.push("/pembelian/daftar-pembelian")
    } catch (error) {
      console.error("Error update", error)
    } finally {
      setLoadingSave(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">

     {/* Distributor */}
<div className="space-y-2">
  <Label className="text-lg font-medium">Distributor</Label>

  <Select
  value={selectedDistributor?.id ?? "none"}
  onValueChange={(value) => {
    if (value === "none") {
      setSelectedDistributor(null)
      return
    }

    const dist = distributors.find((d) => d.id === value)
    setSelectedDistributor(dist ?? null)
  }}
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Pilih Distributor">
      {selectedDistributor?.nama_distributor ?? "Pilih Distributor"}
    </SelectValue>
  </SelectTrigger>

  <SelectContent alignItemWithTrigger={false}>
    <SelectItem value="none">Tanpa Distributor</SelectItem>

    {distributors.map((d) => (
      <SelectItem key={d.id} value={d.id}>
        {d.nama_distributor}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
</div>

      {/* Search Produk */}
<InputGroup>
  <InputGroupInput
    className="font-mono text-xl tracking-widest"
    placeholder="Ketik Nama Produk..."
    value={search}
    onChange={(e) => {
      const value = e.target.value
      setSearch(value)
      debouncedSearch(value)
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
        onClick={() => handleSelectProduk(produk)}
      >
        <div className="font-medium">{produk.nama_produk}</div>

        <div className="text-sm text-muted-foreground">
          stok: {produk.stok}
        </div>

        <div className="text-sm text-muted-foreground">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(produk.harga_beli)}
        </div>
      </div>
    ))}
  </div>
)}

      {/* Table */}
      <Table className="w-full border">
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Hapus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <EditRow key={item.produkId} item={item} />
          ))}
        </TableBody>
      </Table>
 <div className="sticky bottom-0 bg-background border-t p-4">
{/* Biaya Kirim */}
      <div className="flex max-w-75">
      <InputGroup>
        <InputGroupInput
          id="biayaKirim"
        type="number"
        min={0}
        placeholder='masukkan biaya pengiriman'
          value={biayaKirim}
          onChange={(e) =>
            setBiayaKirim(Number(e.target.value) || 0)
          }
          className="border p-2 w-full"
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

      {/* Total */}
      <div className="text-right md:text-right space-y-2 mr-5 md:max-w-md md:ml-auto">
      <div className="text-2xl text-right font-bold mb-3">
        Total: {formatRupiah(totalSemua)}
      </div>
      </div>
     

<div className="flex gap-3 mt-5">


<Button
size="lg"
variant="default"
className="flex-1 h-14 bg-blue-500/40 text-white text-xl"
>
  <Link href="/pembelian/daftar-pembelian" 
  className="flex items-center justify-center gap-2 w-full">
    <ArrowLeft className="h-5 w-5" />
    <span className="font-bold">Kembali</span>
  </Link>
</Button>

    <AlertDialog>
        <AlertDialogTrigger
        render={
            <Button
            // onClick={handleUpdate}
            disabled={loadingSave || items.length === 0}
            className="flex-1 h-14 bg-green-600 text-white text-xl"
            >
            {loadingSave ? "Menyimpan..." : "Update Pembelian"}
            </Button>
        }
        />
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Simpan Perubahan?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah anda yakin ingin menyimpan perubahan pembelian {kodepembeliam} ?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Batal
                </AlertDialogCancel>
                <AlertDialogAction
                onClick={handleUpdate}
                disabled={loadingSave || items.length === 0}
                className="bg-green-600 text-white"
                >
                {loadingSave ? "Menyimpan..." : "Update Pembelian"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
 </div>
    </div>
  )
}

