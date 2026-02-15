
// Komponen Ganti Password (masing-masing Akun)
'use client'

import { useState, useRef } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RotateCcw, CircleCheckBig }from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from 'sonner'

export default function GantiPassword(){
    const [passSekarang, setPassSekarang] = useState("")
    const [passBaru, setPassBaru] = useState("")
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)

    const clear = () => {
        formRef.current?.reset() 
        setPassSekarang("")
        setPassBaru("")
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
         event.preventDefault()
    if (loading) return
    setLoading(true)

    try {
      const { error } = await authClient.changePassword({
        newPassword: passBaru,
        currentPassword: passSekarang,
        revokeOtherSessions: true,
      })

      if (error) {
        console.warn("Password change error:", error)
        toast.error(error.message ?? 'Gagal mengganti password')
        return
      }

      toast.success('Password berhasil diganti, silahkan login ulang')
      formRef.current?.reset()
      setPassSekarang("")
      setPassBaru("")
    } catch (err) {
      console.error(err)
      toast.error('Terjadi kesalahan, coba lagi')
    } finally {
      setLoading(false)
    }
        
    }

    return(
        <Card className="bg-accent/50 border dark:bg-card dark:border-border dark:shadow-sm">
            <CardHeader className="border-b-2">
                <CardTitle className="font-mono text-center text-xl warp-break-words hyphens-auto leading-relaxed">
                    Ganti Password Akun
                </CardTitle>
            </CardHeader>
            <CardContent className=" font-mono space-y-2 mt-3 mb-5 text-lg">
                <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
                <Label className=" mb-3">Password Saat ini</Label>
                <Input
                type="password"
                id="password-sekarang"
                name="password-sekarang"
                placeholder="ketik password saat ini"
                value={passSekarang}
                onChange={(e) => setPassSekarang(e.target.value)}
                required
                className="mb-1 max-w-150"
                >
                </Input>

                <Label className="mt-7 mb-3">
                    Password Baru
                </Label>
                <Input
                type="password"
                id="password-baru"
                name="password-baru"
                placeholder="ketik password baru"
                value={passBaru}
                onChange={(e) => setPassBaru(e.target.value)}
                required
                className="mb-3 max-w-150"
                >
                </Input>
                <div className="flex gap-3 w-full max-w-full pt-4">
                    <Button
                    variant="destructive"
                    className=" flex-1 h-14 text-lg"
                    onClick={clear}
                    >
                        <RotateCcw/>
                        Reset
                    </Button>
                    <Button
                    type="submit"
                    disabled={loading || !passSekarang || !passBaru}
                    className='flex-1 h-14 max-w-150 text-lg bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40'
                    >
                        <CircleCheckBig/>
                        {loading ? "Mengganti password..." :  "Ganti Password"}
                    </Button>
                </div>
                </form>

            </CardContent>
            <CardFooter>
                <p className="font-mono text-sm text-muted-foreground"> Anda harus masuk (Sign In) ulang setelah reset password akun anda</p>
            </CardFooter>

        </Card>

    )
}
