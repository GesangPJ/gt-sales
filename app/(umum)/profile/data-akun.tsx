
// Komponen ambil data akun dari session

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function DataAkun(){

    const session = await auth.api.getSession({
        headers: await headers(),
      })

    const id = session?.user?.id
    const nama = session?.user?.name
    const email = session?.user?.email
    const notelp = session?.user?.notelp ?? "-"
    const alamat = session?.user?.alamat ?? "-"

    return(
       <Card className="bg-accent/50 border dark:bg-card dark:border-border dark:shadow-sm">
            <CardHeader className="border-b-2">
                <CardTitle className="font-mono text-center text-xl warp-break-words hyphens-auto leading-relaxed">
                    Detail Akun
                </CardTitle>
            </CardHeader>
            <CardContent className="font-mono space-y-2 mt-3 mb-5 text-lg">
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-25 warp-break-words hyphens-auto leading-relaxed">Nama</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{nama}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-25 warp-break-words hyphens-auto leading-relaxed">Email</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{email}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                    <p className=" text-left w-25 warp-break-words hyphens-auto leading-relaxed">No.telpon</p>
                    <p className="text-center">:</p>
                    <p>{notelp}</p>
                </div>
                <div className="grid grid-cols-[auto_auto_1fr] items-start gap-x-2">
                    <p className=" text-left w-25 warp-break-words hyphens-auto leading-relaxed">Alamat</p>
                    <p className="text-center">:</p>
                    <p className="warp-break-words hyphens-auto leading-relaxed">{alamat}</p>
                </div>
            </CardContent>
            <CardFooter>
                <p className="font-mono text-center text-sm text-muted-foreground">ID Akun : {id}</p>
            </CardFooter>
        </Card>
    )


}

