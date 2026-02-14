"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { baseUrl } from "@/lib/base-url"
import { useRouter } from "next/navigation"
import { switchAPI } from "@/lib/select-API"

type Props = {
  id: string
  stok: number
  nama:string
  onSuccess: () => void
}

export default function UpdateStokButton({
  id,
  stok,
  nama,
  onSuccess,
}: Props) {

  const router = useRouter()

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${baseUrl}${switchAPI}/update-stok`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          stokproduk: stok,
        }),
      })

      if (!res.ok) throw new Error()

      toast.success(`Stok produk ${nama} berhasil diupdate`)
      onSuccess()
      window.location.reload()
    } catch {
      toast.error("Gagal update stok")
    }
  }

  return (
    <Button size="sm" onClick={handleUpdate}>
      Update Stok
    </Button>
  )
}
