
import { StokProduk } from "./stok-column"
import TabelStokProduk from "./tabel-stok"
import { baseUrl } from "@/lib/base-url"
import { switchAPI } from "@/lib/select-API"


export default async function HalamanStokBarang() {

  const res = await fetch(`${baseUrl}${switchAPI}/update-stok`, {
    cache: "no-store",
  })

  const json = await res.json()
  
  return (
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-2xl font-bold">Update Stok Produk</h1>
                </div>
             
              <div className="px-4 lg:px-6">
                <TabelStokProduk initialData={json.data ?? []} />
              
              </div>
              
            </div>
          </div>
        </div>
  )
}
