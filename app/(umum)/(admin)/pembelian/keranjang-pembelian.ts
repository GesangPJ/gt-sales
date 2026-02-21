// keranjang menggunakan zustand

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  nama_produk: string
  harga_beli: number
  jumlah: number ,
  total:number,
  totalharga: number,
  stok: number,
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'jumlah'> & { jumlah: number }) => void
  updateHargaBeli: (id: string, harga: number) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const keranjangPembelian = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      // addItem: (item) => set((state) => ({ items: [...state.items, { ...item }] })),
      addItem: (item) => set((state) => {
        const newItem: CartItem = {
          ...item,
          total: item.harga_beli * item.jumlah,     // ✅ Hitung total = harga_beli * jumlah
          totalharga: item.harga_beli * item.jumlah // ✅ Sama dengan total
        }
        return { 
          items: [...state.items, newItem] 
        }
      }),
      updateQty: (id, qty: number) => set((state) => ({  // ✅ number
        items: state.items.map(item => 
          item.id === id ? { ...item, jumlah: qty } : item
        )
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateHargaBeli: (id, harga) => set((state) => ({
        items: state.items.map(item => 
          item.id === id 
            ? { 
                ...item, 
                harga_beli: harga,
                totalharga: harga * item.jumlah  // Recalculate total
              } 
            : item
        )
      })),
      clear: () => set({ items: [] })
    }),
    { name: 'keranjang-pembelian' }
  )
)
