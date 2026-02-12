
// Komponen form brand

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
import { BrandSchema, brandSchema } from "@/lib/zod-schema"
import { switchAPI } from "@/lib/select-API"


export default function FormBrand(){
    const form = useForm<BrandSchema>({
            resolver: zodResolver(brandSchema),
            mode:"onChange",
            defaultValues:{
                nama: "",
            }
        })
    
        const { isSubmitting } = form.formState
    
        const clear = () => {
            form.reset()
        }

        const onSubmit = async (data: BrandSchema) => {

            try{

                const respon = await fetch(`${baseUrl}${switchAPI}/data-brand`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json",},
                    body: JSON.stringify(data)
                })

                if(!respon.ok){
                    toast.error("Error tidak bisa menambahkan brand")
                }

                toast.success("Brand berhasil ditambahkan")
                form.reset()


            }catch(error:any){
                console.error("Error Menyimpan Brand", error)
            }
        }

    return(
        <div>
    <Card>
        <CardHeader>
            <CardTitle>
                <h1 className="text-2xl font-bold text-center">Form Tambah Brand</h1>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nama Brand</FieldLabel>
                        <Input
                            {...form.register("nama")}
                            id="nama"
                            name="nama"
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
                            {isSubmitting ? "Sedang Menyimpan..." : "Tambah Brand"}
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
