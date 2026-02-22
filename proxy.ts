import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // publik
  if (pathname === "/") {
    return NextResponse.next()
  }

  // HANYA ADMIN
  if (
    ["/akun", 
      "/tambah-produk",
      "/edit-produk", 
      "/kategori",
      "/pembelian",
      "/brand", 
      "/jurnal", 
      "/laporan"].some(p =>
      pathname.startsWith(p)
    )
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (!["admin"].includes(session.user.tipe)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    return NextResponse.next()
  }

  // BUTUH LOGIN
  if (
    ["/kasir", "/produk","/profile"].some(p =>
      pathname.startsWith(p)
    )
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico).*)",
  ],
}
