
// Komponen Form Kategori

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import{
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { baseUrl } from "@/lib/base-url"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { KategoriSchema, kategoriSchema } from "@/lib/zod-schema"
import { switchAPI } from "@/lib/select-API"

export default function FormKategori(){

     const [jenisKategori, setJenisKategori] = useState("")
    
    const form = useForm<KategoriSchema>({
        resolver: zodResolver(kategoriSchema),
        mode:"onChange",
        defaultValues:{
            nama: "",
        }
    })

    const { isSubmitting } = form.formState

    const clear = () => {
        form.reset()
        setJenisKategori("")
    }

    const onSubmit = async (data: KategoriSchema)=>{

        try{
            const payload = {
            ...data,           //
            jenis: jenisKategori //
            }

            const respon = await fetch(`${baseUrl}${switchAPI}/data-kategori`,{
                method: "POST",
                headers:{"Content-Type":"application/json",

                },
                body: JSON.stringify(payload)
            })
            if(!respon.ok){
                toast.error("Terjadi kesalahan saat akan menambahkan kategori")
            }
            toast.success("Berhasil menambahkan brand")
            form.reset()
            setJenisKategori("")

        }catch(error){
            console.error("Error Menyimpan kategori", error)
        }
    }

    return(
        <div>
    <Card>
        <CardHeader>
            <CardTitle>
                <h1 className="text-2xl font-bold text-center">Form Tambah Kategori</h1>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nama Kategori</FieldLabel>
                        <Input
                            {...form.register("nama")}
                            id="nama"
                            name="nama_kategori"
                            type="text"
                            required
                            />
                    </Field>
                    <FieldDescription>
                        {form.formState.errors.nama && (
                            <span className="text-sm text-red-500 mt-1">
                            {form.formState.errors.nama.message}
                            </span>
                        )}

                    </FieldDescription>
                    <Field>
                        <Select onValueChange={(val) => setJenisKategori(val ?? "")} value={jenisKategori}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Pilih Jenis" />
                            </SelectTrigger>
                            <SelectContent alignItemWithTrigger={false}>
                                <SelectItem className="relative flex items-center px-4 py-2 cursor-pointer outline-none focus:bg-accent" 
                                value="SEMBAKO">Sembako</SelectItem>
                                <SelectItem className="relative flex items-center px-4 py-2 cursor-pointer outline-none focus:bg-accent"
                                 value="ELEKTRONIK">Elektronik</SelectItem>
                                <SelectItem className="relative flex items-center px-4 py-2 cursor-pointer outline-none focus:bg-accent"
                                 value="LAINNYA">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
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
                        <Button
                        type="submit"
                        size="lg"
                        className="flex-1 h-14 text-xl rounded-md bg-sky-600/10 text-sky-600 hover:bg-sky-600/20"
                        disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sedang Menyimpan..." : "Tambah Kategori"}
                        </Button>
                        </div>
                    </Field>
                </FieldGroup>
            </form>
            
        </CardContent>
        
    </Card>

    </div>
    )
}


