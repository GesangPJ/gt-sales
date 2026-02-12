// Komponen Login

'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { loginSchema, LoginSchema } from "@/lib/zod-schema"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  
      const form = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
  
    const onSubmit = async (data: LoginSchema) => {
      const {error} = await authClient.signIn.email({
                      email: data.email,
                      password: data.password,
                      callbackURL:"/kasir"
                    })
  
        if (error) {
        toast.error(error.message ?? "Error Saat Masuk")
        return
      }
  
      toast.success("Berhasil masuk")
      router.push("/") 
    }

  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-4 sm:max-w-md">
        <div className="text-center">
         
          <div className="mt-2 space-y-2">
            <h3 className="text-3xl lg:text-4xl font-bold text-yellow-500">
              GT-SALES
            </h3>
            <p className="text-center mt-3">Masuk ke Akun anda</p>
          </div>
        </div>
        <div className="space-y-6 p-4 py-6 shadow sm:rounded-lg sm:p-6">
          <div className="relative">
            <span className="bg-secondary block h-px w-full"></span>
            <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit px-2 text-sm">
              
            </p>
          </div>
          {/* OnSubmit declare yourself */}
          <form  onSubmit={form.handleSubmit(onSubmit)} noValidate
          className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <Input
                {...form.register("email")}
                type="email"
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-sky-600"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500 my-2">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="font-medium">Password</label>
              <div className="relative">
                <Input
                  {...form.register("password")}
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-sky-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 mt-2 mr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-secondary" />
                  ) : (
                    <Eye size={20} className="text-secondary" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-500 my-2">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-full bg-sky-600 px-4 py-2 font-medium text-white duration-150 hover:bg-sky-500 active:bg-sky-600">
              Masuk
            </Button>
          </form>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">&copy; 2026 GESANG PAUDRA JAYA</p>
        </div>
      </div>
    </div>
  )
}
