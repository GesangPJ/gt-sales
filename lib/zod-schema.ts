// Skema zod

import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
})

export const registrasiSchema = z.object({
    email: z.email("Format email tidak valid").trim().min(1, "Email wajib diisi").toLowerCase(),
    name: z.string().trim().min(1, "Nama wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    notelp: z.string().trim().optional(),
    alamat: z.string().trim().max(250).optional().or(z.literal("")),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegistrasiSchema = z.infer<typeof registrasiSchema>

