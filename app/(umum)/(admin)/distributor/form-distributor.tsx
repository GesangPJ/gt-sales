// Komponen form tambah distributor
'use client'

import { useState } from "react"
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
import { switchAPI } from "@/lib/select-API"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { DistributorSchema, distributorSchema } from "@/lib/zod-schema"

export default function FormDistributor(){
    const [Alamat, setAlamat] = useState("")
    const maxAlamat = 500 // maksimum Alamat
    const sisaAlamat = maxAlamat - Alamat.length //hitung sisa Alamat

    const form = useForm<DistributorSchema>({
        resolver: zodResolver(distributorSchema),
        mode:"onChange",
        defaultValues:{
            namadist:"",
            emaildist:"",
            alamatdist:"",
            notelpdist:"",
        }
    })

    const {isSubmitting} = form.formState

    const clear = () => {
        form.reset()
        setAlamat("")
    }

    const onSubmit = async (data:DistributorSchema)=>{

        try{

            const respon = await fetch(`${baseUrl}${switchAPI}/data-dsitributor`,{
                method:"POST",
                headers:{'Content-Type':"application/json",},
                body: JSON.stringify(data)
            })

            if(!respon.ok){
                toast.error("Tidak dapat menambahkan distributor")
            }

            toast.success("Distributor berhasil ditambahkan")
            clear()

        }catch(error:any){
            console.error("Error menambahkan distribtuor", error)
        }
    }

    return(
    <div>
        <Card>
        <CardHeader>
            <CardTitle>
                <h1 className="text-2xl font-bold text-center">Form Tambah Distributor</h1>
            </CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
            <Field>
                <FieldLabel>Nama Distributor</FieldLabel>
                <Input
                {...form.register("namadist")}
                id="namadist"
                name="namadist"
                type="text"
                required
                />
            </Field>
            <FieldDescription>
            {form.formState.errors.namadist && (
            <span className="text-sm text-red-500 mt-1">
            {form.formState.errors.namadist.message}
            </span>
            )}
            </FieldDescription>
            <Field>
                <FieldLabel>Email Distributor</FieldLabel>
                <Input
                {...form.register("emaildist")}
                id="emaildist"
                name="emaildist"
                />

            </Field>
            <FieldDescription>
            {form.formState.errors.emaildist && (
            <span className="text-sm text-red-500 mt-1">
            {form.formState.errors.emaildist.message}
            </span>
            )}
            </FieldDescription>
            <Field>
                <FieldLabel>Nomor Telpon Distributor</FieldLabel>
                <Input
                {...form.register("notelpdist")}
                id="notelpdist"
                type="tel"
                inputMode="numeric"
                name="notelpdist"
                />
            </Field>
            <FieldDescription>
                {form.formState.errors.notelpdist && (
            <span className="text-sm text-red-500 mt-1">
            {form.formState.errors.notelpdist.message}
            </span>
            )}
            </FieldDescription>
            <Field>
                <FieldLabel>Alamat Distributor</FieldLabel>
               <InputGroup className="border">
                    <InputGroupTextarea
                    {...form.register("alamatdist")}
                    name="alamat"
                    id="Alamat"
                    placeholder="Ketik Alamat Distributor (opsional)"
                    value={Alamat}
                    onChange={(e) => setAlamat(e.target.value.slice(0, maxAlamat))}  // Paksa limit
                    maxLength={maxAlamat}
                    rows={5}
                    />
                    
                    <InputGroupAddon align="block-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        {sisaAlamat}/{maxAlamat} karakter
                        {sisaAlamat < 20 && <span className="text-destructive ml-1">!</span>}
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
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
                {isSubmitting ? "Sedang Menyimpan..." : "Simpan Distributor"}
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
