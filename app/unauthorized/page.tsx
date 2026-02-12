
// Halaman Unauthorized 403
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Unauthorized(){

    return(
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="text-8xl md:text-9xl font-black bg-linear-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-8">
        403
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        Anda tidak memiliki izin
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-12">
        Anda tidak memiliki izin untuk akses halaman ini.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-8 py-4 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft className="h-5 w-5" />
        Kembali
      </Link>
    </div>
    )
}






