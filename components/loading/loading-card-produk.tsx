// Komponen skeleton untuk Daftar Produk

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function LoadingProdukCard() {
  // Membuat array kosong berjumlah 10 untuk iterasi
  const skeletonItems = Array.from({ length: 10 })

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 px-2 lg:px-6">
      {skeletonItems.map((_, index) => (
        <Card key={index} className="rounded-xl overflow-hidden">
          <CardContent className="p-4 space-y-3">
            {/* Image Skeleton */}
            <Skeleton className="relative aspect-square w-full rounded-md" />

            {/* Title Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>

            {/* Price Skeleton */}
            <div className="space-y-2 pt-1">
              
              
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}