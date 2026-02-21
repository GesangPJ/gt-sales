
// Form Edit Data Akun
'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { EditAkunSchema, editAkunSchema } from "@/lib/zod-schema"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"
import {IconArrowBadgeDownFilled, IconHexagonPlus, IconChevronDown} from "@tabler/icons-react"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"

type EditAkun = {
    id: string
    name: string
    alamat: string
    notelp: string

}

export default function FormEditAkun(){
    const [selectedAkun, setSelectedAkun] = useState<EditAkun | null>(null)
    const [dataAkun, setDataAkun] = useState<EditAkun[]>([])
    const [alamat, setAlamat] = useState("")
    const maxLength = 150
    const remaining = maxLength - alamat.length
    const [open, setOpen] = useState(false)

    

    useEffect(()=>{
        ambilAkun()
    }, [])
    
    async function ambilAkun(){

        try{

            const respon = await fetch(`${baseUrl}${switchAPI}/data-akun`,{
                next:{
                    tags:['akun'],
                }
            })

            if(!respon.ok){
                toast.warning("Data akun tidak dapat diambil!")
            }

            const hasil = await respon.json()
            setDataAkun(hasil.data)

        }catch(error){
            console.error("Error tidak dapat mengambil data akun", error)
        }
    }

    const form = useForm({
        resolver: zodResolver(editAkunSchema),
        mode: "onChange",
        defaultValues:{
            name:"",
            alamat:"",
            notelp:"",
        }
        })

    const { isSubmitting } = form.formState

    useEffect(() => {
    if (selectedAkun) {
        form.reset({
        name: selectedAkun.name,
        notelp: selectedAkun.notelp ?? "",
        alamat: selectedAkun.alamat ?? "",
        })

        setAlamat(selectedAkun.alamat ?? "")
    }
    }, [selectedAkun])

    const simpanAkun = async (data: EditAkunSchema) => {

        try{

            const payload = {
                ...data,
                idakun: selectedAkun?.id,
            }

            const respon = await fetch(`${baseUrl}${switchAPI}/data-akun`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(payload),
            })

             if(!respon.ok){
                setOpen(false)
                const errorData = await respon.json()
                throw new Error(errorData.message || "Gagal update akun")
            }

            clear()
            setOpen(false)
            toast.success("Berhasil menyimpan akun")

        }catch(error){
            console.error("Error tidak dapat menyimpan data akun", error)
        }

    }

    const clear = () => {
        setSelectedAkun(null)
        setAlamat("")
        form.reset({
        name: "",
        notelp: "",
        alamat: "",
        })
    }

    return (
<div>
<Card>
<CardHeader>
    <CardTitle>
        <h1 className="text-xl text-center">Form Edit Data Akun</h1>
    </CardTitle>
</CardHeader>
<CardContent>
<form action="">
<Field className="mb-5">
    <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" className="w-full justify-between" />}>
            {selectedAkun
                ? selectedAkun.name
                : "Pilih Akun"}{" "}
            <IconArrowBadgeDownFilled className="ml-2" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="max-w-150 max-h-60 overflow-y-auto p-1" align="start">
        {dataAkun.map((akun) => (
        <DropdownMenuItem
            key={akun.id}
            onClick={() => setSelectedAkun(akun)}
        >
            {akun.name}
        </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
</DropdownMenu>
</Field>
    <Field className="mb-5">
        <FieldLabel>Nama Akun</FieldLabel>
        <Input
        id="name"
        type="text"
        {...form.register("name")}
        />
     <FieldDescription>
        {form.formState.errors.name && (
        <span className="text-sm text-red-500 mt-1">
        {form.formState.errors.name.message}
        </span>
        )}
    </FieldDescription>
    </Field>
    <Field className="mb-5">
        <FieldLabel>No.Telepon Akun</FieldLabel>
        <Input
        id="name"
        type="telp"
        inputMode="numeric"
        {...form.register("notelp")}
        />
     <FieldDescription>
        {form.formState.errors.notelp && (
        <span className="text-sm text-red-500 mt-1">
        {form.formState.errors.notelp.message}
        </span>
        )}
    </FieldDescription>
    </Field>
    <Field className="mb-5">
    <FieldLabel>Alamat</FieldLabel>
    <InputGroup className="border max-w-150">
        <InputGroupTextarea
        {...form.register("alamat")}
        name="alamat"
        id="alamat"
        placeholder="Masukkan Alamat"
        value={alamat}
        onChange={(e) => setAlamat(e.target.value.slice(0, maxLength))}  // Paksa limit
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
    <FieldDescription>
        {form.formState.errors.alamat && (
        <span className="text-sm text-red-500 mt-1">
        {form.formState.errors.alamat.message}
        </span>
        )}
    </FieldDescription>
</Field>
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
        <AlertDialogTrigger render={
        <Button
        onClick={()=> setOpen(true)}
        size="lg"
        className="flex-1 h-14 text-xl rounded-md bg-sky-600/10 text-sky-600 hover:bg-sky-600/20"
        disabled={isSubmitting}
        >
            <IconHexagonPlus className="h-32 w-32" />
            {isSubmitting ? "Sedang Menyimpan..." : "Simpan Akun"}
        </Button>

        }/>

    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                Simpan Hasil Edit Akun?
            </AlertDialogTitle>
            <AlertDialogDescription>
                Apakah anda yakin ingin menyimpan perubahan akun?
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel variant="destructive">
                Batal
            </AlertDialogCancel>
            <AlertDialogAction
            onClick={form.handleSubmit(simpanAkun)}
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



