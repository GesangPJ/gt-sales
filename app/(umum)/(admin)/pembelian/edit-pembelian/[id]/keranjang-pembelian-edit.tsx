// Keranjang zustand untuk edit pembelian yang sudah dibuat

import { create } from "zustand"

export interface EditItem {
  produkId: string
  nama_produk: string
  harga_beli: number
  jumlah: number
  stok: number
}

interface EditPembelianState {
  items: EditItem[]
  setItems: (items: EditItem[]) => void
  updateQty: (produkId: string, qty: number) => void
  updateHarga: (produkId: string, harga: number) => void
  removeItem: (produkId: string) => void
  addItem: (item: EditItem) => void
  clear: () => void
}

export const useEditPembelianStore = create<EditPembelianState>((set) => ({
  items: [],

  setItems: (items) => set({ items }),

  updateQty: (produkId, qty) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.produkId === produkId
          ? { ...item, jumlah: qty }
          : item
      ),
    })),

  updateHarga: (produkId, harga) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.produkId === produkId
          ? { ...item, harga_beli: harga }
          : item
      ),
    })),

  removeItem: (produkId) =>
    set((state) => ({
      items: state.items.filter((item) => item.produkId !== produkId),
    })),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  clear: () => set({ items: [] }),
}))