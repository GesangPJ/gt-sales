
// Komponen Keranjang Transaksi Penjualan

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  nama_produk: string
  harga_jual: number
  jumlah: number ,
  total:number,
//   totalharga: number,
  stok: number,
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'jumlah'> & { jumlah: number }) => void
//   updateHargaBeli: (id: string, harga: number) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const keranjangPenjualan = create<CartState>()(
persist(
(set, get) => ({
    items: [],
    addItem: (item) =>
    set((state) => {
        const existingItem = state.items.find(
        (i) => i.id === item.id
        )

        // 🔹 Kalau sudah ada → tambah qty
        if (existingItem) {
        const updatedItems = state.items.map((i) =>
            i.id === item.id
            ? {
                ...i,
                jumlah: i.jumlah + item.jumlah,
                total: (i.jumlah + item.jumlah) * i.harga_jual,
                }
            : i
        )

        return { items: updatedItems }
        }

        // 🔹 Kalau belum ada → tambah baru
        const newItem: CartItem = {
        ...item,
        total: item.harga_jual * item.jumlah,
        }

        return {
        items: [...state.items, newItem],
        }
    }),
      updateQty: (id, qty: number) =>
        set((state) => ({
            items: state.items.map((item) =>
            item.id === id
                ? {
                    ...item,
                    jumlah: qty,
                    total: qty * item.harga_jual,
                }
                : item
            ),
        })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      clear: () => set({ items: [] })
      }),
       { name: 'keranjang-penjualan' }
)
)
