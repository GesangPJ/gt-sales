// Row tabel edit pembelian

import { useEditPembelianStore, EditItem } from "./keranjang-pembelian-edit"
import { Button } from "@/components/ui/button"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

export function EditRow({ item }: { item: EditItem }) {
  const { updateQty, updateHarga, removeItem } =
    useEditPembelianStore()

  const total = item.harga_beli * item.jumlah

  return (
    <TableRow>
      <TableCell>{item.nama_produk}</TableCell>

      <TableCell>
        <input
          type="number"
          value={item.harga_beli}
          onChange={(e) =>
            updateHarga(item.produkId, Number(e.target.value))
          }
        />
      </TableCell>

      <TableCell>
        <input
          type="number"
          value={item.jumlah}
          onChange={(e) =>
            updateQty(item.produkId, Number(e.target.value))
          }
        />
      </TableCell>

      <TableCell>{total}</TableCell>

      <TableCell>
        <Button variant="destructive" onClick={() => removeItem(item.produkId)}>
          X
        </Button>
      </TableCell>
    </TableRow>
  )
}