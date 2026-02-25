// Komponen tambah produk

"use client"

import { useForm } from "react-hook-form"
import { useState, useEffect, useRef } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {IconArrowBadgeDownFilled, IconHexagonPlus, IconChevronDown} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import{
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {CirclePlus} from "lucide-react"
import { baseUrl } from '@/lib/base-url'
import { switchAPI } from "@/lib/select-API"
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProdukSchema, tambahProduk } from "@/lib/zod-schema"
import { Kategori } from "../kategori/kolom-kategori"
import { Brand } from "../brand/kolom-brand"
import { Distributor } from "../distributor/kolom-distributor"


export default function FormTambahProduk(){
    const [keterangan, setKeterangan] = useState("")
    const maxLength = 150 // banyaknya kata untuk textarea
    const remaining = maxLength - keterangan.length  //sisa kata untuk textarea
    const [loading, setLoading] = useState(false)
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [selectedKategori, setSelectedKategori] = useState<Kategori | null>(null)
    const [selectedKategoriId, setSelectedKategoriId] = useState<string>("")
    const [brands, setBrands] = useState<Brand[]>([])
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
    const [selectedBrandId, setSelectedBrandId] = useState<string>("")
    const [open, setOpen] = useState(false)

    const {data: session, isPending} = authClient.useSession()

    const form = useForm({
        resolver: zodResolver(tambahProduk),
        mode:"onChange",
        defaultValues:{
            namaproduk:"",
            hargabeli:"",
            hargajual:"",
            stokproduk:"",
        }
    })

    const { isSubmitting } = form.formState

    const clear = () => {
        form.reset()
        setKeterangan("")
        setSelectedBrand(null)
        setSelectedKategori(null)
    }

    async function ambilKategori(){
        try{
            const respon = await fetch(`${baseUrl}${switchAPI}/data-kategori`,{
                next:{
                    tags:['kategori'],
                    revalidate:3600,
                }
            })

            if(!respon.ok){
                throw new Error("Gagal ambil data kategori!")
            }
            const hasil = await respon.json()
            setKategoris(hasil.data)

        }catch(error){
            console.error("Gagal ambil kategori", error)
        }
    }

    async function ambilBrand(){
        try{
            const respon = await fetch(`${baseUrl}${switchAPI}/data-brand`,{
                next:{
                    tags:['brand'],
                    revalidate:3600,
                }
            })

            if(!respon.ok){
                throw new Error("Gagal ambil data brand!")
            }
            const hasil = await respon.json()
            setBrands(hasil.data)

        }catch(error){
            console.error("Gagal ambil brand", error)
        }
    }

    const idAdmin = session?.user?.id ?? null

    useEffect(()=>{
        ambilBrand()
        ambilKategori()
    },[])

    const handleSelectKategori = (id: string) => {
        setSelectedKategoriId(id)
        const kategori = kategoris.find(k => k.id.toString() === id)
        setSelectedKategori(kategori || null)
    }

    const handleSelectedBrand = (id: string) => {
        setSelectedBrandId(id)
        const brand = brands.find(x => x.id.toString() === id)
        setSelectedBrand(brand || null)
    }

    const simpanProduk = async (data:ProdukSchema) => {

        if(!idAdmin){
            toast.warning("Menunggu mengambil ID")
        }

        try{

            const payload = {
                ...data,
                idadmin: idAdmin,
                keterangan: keterangan,
                idkategori: selectedKategori?.id,
                idbrand: selectedBrand?.id ?? null,
            }

            const respon = await fetch(`${baseUrl}${switchAPI}/data-produk`,{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body: JSON.stringify(payload)
            })

            if(!respon.ok){
                toast.error("Tidak dapat menambahkan produk")
                setOpen(false)
            }

            setOpen(false)
            toast.success("Berhasil menyimpan produk")
            clear()


        }catch(error){
            console.error("Tidak dapat menyimpan produk", error)
        }

    }

    return(
    <div>
    <Card>
    <CardHeader>
    <CardTitle>
        <h1 className="text-2xl font-bold text-center">Form Tambah Produk</h1>
    </CardTitle>
    </CardHeader>
    <CardContent>
    <form noValidate>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <FieldGroup>
            <Field>
                <FieldLabel>Nama Produk</FieldLabel>
                <Input
                {...form.register("namaproduk")}
                className="max-w-150"
                id="namaproduk"
                type="text"
                required
                />
            </Field>
            <FieldDescription>
                {form.formState.errors.namaproduk && (
                <span className="text-sm text-red-500 mt-1">
                {form.formState.errors.namaproduk.message}
                </span>
                )}
            </FieldDescription>
            <Field>
                <FieldLabel>Barcode Produk</FieldLabel>
                <Input
                {...form.register("barcodeproduk")}
                className="max-w-150"
                id="barcodeproduk"
                type="text"
                maxLength={13}
                />
            </Field>
            <FieldDescription>
                {form.formState.errors.barcodeproduk && (
                <span className="text-sm text-red-500 mt-1">
                {form.formState.errors.barcodeproduk.message}
                </span>
                )}
            </FieldDescription>
            <Field>
                <FieldLabel>Harga Beli</FieldLabel>
                <Input
                {...form.register("hargabeli")}
                className="max-w-150"
                id="hargabeli"
                type="text"
                inputMode="numeric"
                required
                />
            </Field>
            <FieldDescription>
                {form.formState.errors.hargabeli && (
                <span className="text-sm text-red-500 mt-1">
                {form.formState.errors.hargabeli.message}
                </span>
                )}
            </FieldDescription>
            <Field>
                <FieldLabel>Harga Jual</FieldLabel>
                <Input
                {...form.register("hargajual")}
                className="max-w-150"
                id="hargajual"
                type="text"
                inputMode="numeric"
                required
                />
            </Field>
            <FieldDescription>
                {form.formState.errors.hargajual && (
                <span className="text-sm text-red-500 mt-1">
                {form.formState.errors.hargajual.message}
                </span>
                )}
            </FieldDescription>
            <Field>
                <FieldLabel>Stok Awal</FieldLabel>
                <Input
                {...form.register("stokproduk")}
                className="max-w-150"
                id="stokproduk"
                type="text"
                inputMode="numeric"
                required
                />
            </Field>
            <FieldDescription>
                {form.formState.errors.stokproduk && (
                <span className="text-sm text-red-500 mt-1">
                {form.formState.errors.stokproduk.message}
                </span>
                )}
            </FieldDescription>
        </FieldGroup>
        {/* Kolom ke 2 */}
        <FieldGroup>
            
            <Field>
                <FieldLabel>Keterangan Produk</FieldLabel>
                <InputGroup className="border max-w-150">
                    <InputGroupTextarea
                    name="keterangan"
                    id="keterangan"
                    placeholder="Masukkan Keterangan produk"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value.slice(0, maxLength))}  // Paksa limit
                    maxLength={maxLength}
                    rows={5}
                    />
                    <InputGroupAddon align="block-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        {remaining}/{maxLength} karakter
                        {remaining < 20 && <span className="text-destructive ml-1">!</span>}
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Field>
            <Field className="mt-3 max-w-100">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="w-full justify-between" />}>
                                {selectedKategori
                                    ? selectedKategori.nama_kategori
                                    : "Pilih Kategori"}{" "}
                                <IconArrowBadgeDownFilled className="ml-2" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-w-150 max-h-60 overflow-y-auto p-1" align="start">
                            {[...kategoris]
                            .sort((a, b) =>
                                a.nama_kategori.localeCompare(b.nama_kategori, "id", {
                                sensitivity: "base",
                                })
                            )
                            .map((kategori) => (
                                <DropdownMenuItem
                                key={kategori.id}
                                onClick={() => setSelectedKategori(kategori)}
                                >
                                {kategori.nama_kategori}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Field>
                {/* Brand */}
                <Field className="mt-3 max-w-100">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="w-full justify-between" />}>
                                {selectedBrand
                                    ? selectedBrand.nama_brand
                                    : "Pilih Merk / Brand"}{" "}
                                <IconArrowBadgeDownFilled className="ml-2" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-w-150 max-h-60 overflow-y-auto p-1" align="start">
                             {[...brands]
                            .sort((a, b) =>
                                a.nama_brand.localeCompare(b.nama_brand, "id", {
                                sensitivity: "base",
                                })
                            )
                            .map((brand) => (
                                <DropdownMenuItem
                                key={brand.id}
                                onClick={() => setSelectedBrand(brand)}
                                >
                                {brand.nama_brand}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Field>
        </FieldGroup>
        
    </div>
    <Field>
    <div className="flex gap-3 mt-3 items-center">
    <Button
        variant="destructive" 
        className="flex-1 h-14 text-xl"
        onClick={clear}
    >
        Reset
    </Button>
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
        render={<Button disabled={loading || !selectedKategori || isPending}
        onClick={()=> setOpen(true)}
        className="flex-1 h-14 text-lg" >
        <IconHexagonPlus className="h-32 w-32" />
        {isSubmitting ? "Menyimpan..." : "Simpan"}
    </Button>}
        />
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Simpan Produk?</AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah anda yakin untuk menyimpan produk ini?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel variant="destructive">Batal</AlertDialogCancel>
                <AlertDialogAction
                onClick={form.handleSubmit(simpanProduk)}
                className="bg-green-100 text-green-700 hover:bg-green-100"
                >
                    <IconHexagonPlus className="h-32 w-32" />
                    Simpan
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
    </Field>
    </form>
    </CardContent>
    </Card>

    </div>
    )
}