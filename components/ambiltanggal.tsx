"use client"

import { useEffect, useState } from "react"

export function AmbilTanggal() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      })

      const formatted = formatter.format(now).replace(/\//g, "-")
      setDate(formatted)
    }

    // Jalankan sekali saat mount
    updateDate()

    // Cek setiap 1 menit (60000ms) untuk memastikan tanggal berganti jika lewat tengah malam
    const interval = setInterval(updateDate, 60000)

    // Bersihkan interval saat komponen tidak lagi digunakan
    return () => clearInterval(interval)
  }, [])

  // Mencegah teks melompat/kosong (optional)
  if (!date) return <span className="opacity-0">Memuat...</span>

  return <span>{date}</span>
}
