// Halaman buat akun
// Untuk admin
'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { RegistrasiSchema, registrasiSchema } from "@/lib/zod-schema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HalamanRegisterAkun(){
    const [tipe, setTipe] = useState<"user" | "admin">("user")

    const form = useForm<RegistrasiSchema>({
        resolver: zodResolver(registrasiSchema),
         mode:"onChange",
        defaultValues: {
            email: "",
            name: "",
            password: "",
            notelp: "",
            alamat: "",
        }
    })

    const clear = () => {
        form.reset()
        setTipe("user")
    }

    const { isSubmitting } = form.formState

   const onSubmit = async (data: RegistrasiSchema) => {
//    const { confirmPassword } = data

    const { error } = await authClient.admin.createUser({
        email: data.email,
        password: data.password,
        name: data.name,
        role: tipe,
        data: {
            tipe,
            notelp: data.notelp,
            alamat: data.alamat,
            }
    })

    if (error) {
        toast.error(error.message)
        return
    }

    toast.success("Registrasi akun berhasil")
    clear()
    }


    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-center">Registrasi Akun</CardTitle>
                </CardHeader>
                <CardContent >
                    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                        <FieldGroup>
                            <Field>
                                <Select onValueChange={(val) => { if (val) setTipe(val) }} value={tipe}>
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue placeholder="Pilih Tipe Akun" />
                                    </SelectTrigger>
                                    <SelectContent alignItemWithTrigger={false}>
                                        <SelectItem className="relative flex items-center px-4 py-2 cursor-pointer outline-none focus:bg-accent" 
                                        value="user">User</SelectItem>
                                        <SelectItem className="relative flex items-center px-4 py-2 cursor-pointer outline-none focus:bg-accent"
                                            value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="nama">Nama</FieldLabel>
                                <Input {...form.register("name")}
                                id="name"
                                type="text"
                                name="name"
                                required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input {...form.register("email")}
                                id="email"
                                type="email"
                                name="email"
                                required
                                />
                                <FieldDescription>
                                    {form.formState.errors.email && (
                                        <span className="text-sm text-red-500 mt-1">
                                        {form.formState.errors.email.message}
                                        </span>
                                    )}
                                </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="notelp">Nomor telepon</FieldLabel>
                                <Input {...form.register("notelp")}
                                id="notelp"
                                type="tel"
                                name="notelp"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="notelp">Alamat</FieldLabel>
                                <Input {...form.register("alamat")}
                                id="alamat"
                                type="text"
                                name="alamat"
                                />
                            </Field>
                            <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input {...form.register("password")} id="password" type="password" required />
                                </Field>
                                <Field>
                                <FieldLabel htmlFor="confirm-password">
                                    Konfirmasi Password
                                </FieldLabel>
                                <Input 
                                    id="confirm-password"
                                    type="password"
                                    {...form.register("confirmPassword")} 
                                    required />
                                <FieldDescription>
                                    {form.formState.errors.confirmPassword && (
                                    <span className="text-sm text-red-500">
                                        {form.formState.errors.confirmPassword.message}
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
                            <Button
                            type="submit"
                            size="lg"
                            className="flex-1 h-14 text-xl rounded-md bg-sky-600/10 text-sky-600 hover:bg-sky-600/20"
                            disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sedang Menyimpan..." : "Registrasi Akun"}
                            </Button>
                            </div>
                        </Field>
                            {/* <Field>
                                <Button type="submit"
                                size="lg"
                                className="rounded-md bg-sky-600/10 text-sky-600 hover:bg-sky-600/20"
                                disabled={form.formState.isSubmitting}
                                >
                                    Registrasi</Button>
                                
                            </Field> */}
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


