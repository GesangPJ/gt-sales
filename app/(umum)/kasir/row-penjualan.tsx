
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
  const [qty, setQty] = useState(item.jumlah)

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

  const updateJumlah = () => {
    updateQty(item.id, qty)
  }

  const total = item.harga_jual * item.jumlah

    useEffect(() => {
    setQty(item.jumlah)
    }, [item.jumlah])

  return (
    <TableRow className="border-t">
      <TableCell className="p-2">{item.nama_produk}</TableCell>

      {/* Harga Jual */}
      <TableCell className="p-2">
        {formatRupiah(item.harga_jual)}
      </TableCell>

      {/* Jumlah */}
      <TableCell className="p-2">
        <Input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
          onBlur={updateJumlah}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateJumlah()
          }}
          className="w-20 border p-1"
        />
      </TableCell>

      {/* Total */}
      <TableCell className="p-2 font-medium">
        {formatRupiah(total)}
      </TableCell>

      {/* Delete */}
      <TableCell className="p-2">
        <Button
          onClick={() => removeItem(item.id)}
          variant="destructive"
        >
          X
        </Button>
      </TableCell>
    </TableRow>
  )
}

