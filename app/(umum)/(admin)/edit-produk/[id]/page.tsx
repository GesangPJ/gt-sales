// Halaman dinamis edit produk

'use client'
import { useState, use, useEffect } from "react"

import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProdukSchema, tambahProduk } from "@/lib/zod-schema"
import { Distributor } from "../../distributor/kolom-distributor"
import { useForm } from "react-hook-form"
import {IconArrowBadgeDownFilled, IconChevronDown} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {Save, ArrowLeft} from "lucide-react"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { EditProdukSchema, editProduk } from "@/lib/zod-schema"


type ProdukApi = {
  id: string
  nama_produk: string
  barcode: string
  harga_beli: number
  harga_jual: number
  keterangan?: string
}

interface EditProdukProps {
  params: Promise<{ id: string }>
}

export default function HalamanEditProduk({ params }: EditProdukProps){
    const router = useRouter()

    const {id} = use(params)
    const [dataProduk, setDataProduk] = useState<ProdukApi | null>(null)
    const [keterangan, setKeterangan] = useState("")
    const maxLength = 150 
    const remaining = maxLength - keterangan.length
    const [loading, setLoading] = useState(false)

    const {data: session, isPending} = authClient.useSession()

    const form = useForm({
    resolver: zodResolver(editProduk),
    mode: "onChange",
    })

    const { isSubmitting } = form.formState

    async function ambilProduk() {
        setLoading(true)
    try {
      const respon = await fetch(
        `${baseUrl}${switchAPI}/detail-produk?id=${id}`,
        {cache: 'no-store'}
      )

      if (!respon.ok) throw new Error("Gagal ambil produk")

      const hasil = await respon.json()
      const produk = hasil.data

      setDataProduk(produk)
      setKeterangan(produk.keterangan)

      // Isi default form
      form.reset({
        namaproduk: produk.nama_produk,
        barcodeproduk: produk.barcode,
        hargabeli: Number(produk.harga_beli) || 0,
        hargajual: Number(produk.harga_jual) || 0,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

    useEffect(()=>{
        ambilProduk()
    }, [id])

    const idAdmin = session?.user?.id ?? null

    const simpanProduk = async (data: EditProdukSchema) => {
        setLoading(true)

         if(!idAdmin){
            toast.warning("Menunggu mengambil ID")
            return
        }

        try{
            const payload = {
            ...data,
            idproduk: id,
            keterangan: keterangan,
            idadmin: idAdmin,
            }

            const respon = await fetch(`${baseUrl}${switchAPI}/data-produk`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(payload),
            })

            if(!respon.ok){
                const errorData = await respon.json()
                throw new Error(errorData.message || "Gagal update produk")
            }
            setLoading(false)
            toast.success("Berhasil update produk")
            router.replace('/edit-produk')

        }catch(error){
            throw new Error("Gagal update produk")
        }
    }
        
    return(
        <div>
    <Card>
    <CardHeader>
    <CardTitle>
        <h1 className="text-2xl font-bold text-center">Form Edit Produk</h1>
    </CardTitle>
    </CardHeader>
    <CardContent>
    <form onSubmit={form.handleSubmit(simpanProduk)} noValidate>
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
                type="number"
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
                type="number"
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

        </FieldGroup>
        
    </div>
    <Field>
    <div className="flex gap-3 mt-3 items-center">
  
    <Link href="/edit-produk" className="flex-1">
        <Button
        size="lg"
        variant="default"
        className="w-full h-14 items-center gap-2 bg-blue-500/40 text-white"
        >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-bold">Kembali</span>
        </Button>
    </Link>

    <Button
        type="submit"
        disabled={loading || isPending}
        className="flex-1 h-14 text-lg"
    >
        <Save className="h-5 w-5 mr-2" />
        {isSubmitting ? "Menyimpan..." : "Simpan"}
    </Button>

    </div>
    </Field>
    </form>
    </CardContent>
    </Card>

    </div>


    )
}




