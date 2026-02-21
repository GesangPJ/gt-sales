// Skema zod

import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
})

export const kategoriSchema = z.object({
  nama: z.string().trim().min(1, "Nama kategori harus diisi!")
})

export const brandSchema = z.object({
  nama: z.string().trim().min(1,"Nama brand harus diisi!")
})

export const editAkunSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  notelp: z.string().trim().optional(),
  alamat: z.string().trim().max(250).optional().or(z.literal("")),

})

export const registrasiSchema = z
  .object({
    email: z.email("Format email tidak valid")
      .trim()
      .min(1, "Email wajib diisi")
      .toLowerCase(),

    name: z.string().trim().min(1, "Nama wajib diisi"),

    password: z.string().min(8, "Password minimal 8 karakter"),

    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),

    notelp: z.string().trim().optional(),

    alamat: z.string().trim().max(250).optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"], // error diarahkan ke field confirmPassword
  })

export const distributorSchema = z.object({
  namadist: z.string().trim().min(1,"Nama distributor wajib diisi"),
  emaildist: z.email("Format email tidak valid").trim().optional(),
  alamatdist: z.string().trim().max(250).optional().or(z.literal("")),
  notelpdist: z.string().trim().optional(),
})

export const tambahProduk = z.object({
  namaproduk: z.string().trim().min(1, "Nama produk wajib diisi!"),
  barcodeproduk: z.string().trim().regex(/^[0-9]{13}$/, "Barcode retail wajib 13 digit"),
  hargajual: z.coerce.number().min(1, "Harga wajib diisi"),
  hargabeli: z.coerce.number().min(1, "Harga wajib diisi"),
  stokproduk: z.coerce.number().min(1,"Stok wajib diisi"),
  
})

export const editProduk = z.object({
  namaproduk: z.string().trim().min(1, "Nama produk wajib diisi!"),
  barcodeproduk: z.string().trim().regex(/^[0-9]{13}$/, "Barcode retail wajib 13 digit"),
  hargajual: z.coerce.number().min(1, "Harga wajib diisi"),
  hargabeli: z.coerce.number().min(1, "Harga wajib diisi"),
})

export type EditAkunSchema = z.infer<typeof editAkunSchema>
export type EditProdukSchema = z.infer<typeof editProduk>
export type ProdukSchema = z.infer<typeof tambahProduk>
export type DistributorSchema = z.infer<typeof distributorSchema>
export type BrandSchema = z.infer<typeof brandSchema>
export type KategoriSchema = z.infer<typeof kategoriSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type RegistrasiSchema = z.infer<typeof registrasiSchema>

