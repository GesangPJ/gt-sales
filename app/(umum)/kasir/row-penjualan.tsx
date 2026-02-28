
// Komponen Baris penjualan

import { useState, useEffect } from "react"
import { keranjangPenjualan, CartItem } from "./keranjang-penjualan"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  TableCell,
  TableRow,
} from "@/components/ui/table"


export function RowPenjualan({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = keranjangPenjualan()
  const [qtyInput, setQtyInput] = useState("")

  const handleUpdate = () => {
  let numericQty = Number(qtyInput)

  if (!numericQty || numericQty < 1) {
    numericQty = 1
  }

  setQtyInput(String(numericQty))
  updateQty(item.id, numericQty)
}

  const total = item.harga_jual * item.jumlah

    // useEffect(() => {
    // setQty(item.jumlah)
    // }, [item.jumlah])
    useEffect(() => {
    setQtyInput(String(item.jumlah))
  }, [item.jumlah])

  return (
   <TableRow className="border-t">
  {/* Nama */}
  <TableCell className="p-2 wrap-break-word whitespace-normal max-w-35 md:max-w-none">
    {item.nama_produk}
  </TableCell>

  {/* Harga */}
  <TableCell className="p-2 text-xs md:text-sm wrap-break-word whitespace-normal max-w-35">
    Rp{(item.harga_jual).toLocaleString('id-ID')}
  </TableCell>

  {/* Jumlah */}
  <TableCell className="p-2">
    <Input
  type="number"
  min="1"
  value={qtyInput}
  onChange={(e) => setQtyInput(e.target.value)}
  onBlur={handleUpdate}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleUpdate()
  }}
  onFocus={(e) => e.target.select()}
  className="max-w-14 md:w-20 border p-1"
/>
  </TableCell>

  {/* Total */}
  <TableCell className="p-2 font-medium text-xs md:text-sm wrap-break-word whitespace-normal max-w-35">
    Rp{(total).toLocaleString('id-ID')}
  </TableCell>

  {/* Delete */}
  <TableCell className="p-2 md:text-left sm:text-center">
    <Button
      onClick={() => removeItem(item.id)}
      variant="destructive"
      size="sm"
      className="px-2"
    >
      X
    </Button>
  </TableCell>
</TableRow>
  )
}

