// Script untuk promote user jadi admin

import prisma  from "../lib/prisma"

async function promoteAdmin() {
  const EMAIL = "admin@email.com" // targe email untuk admin

  try {
    const user = await prisma.user.findUnique({
      where: { email: EMAIL },
    })

    if (!user) {
      console.error("❌ User tidak ditemukan:", EMAIL)
      process.exit(1)
    }

    if (user.role === "admin") {
      console.log("ℹ️ User sudah admin:", EMAIL)
      return
    }

    await prisma.user.update({
      where: { email: EMAIL },
      data: {
        role: "admin",
      },
    })

    console.log("✅ Berhasil promote jadi admin:", EMAIL)
  } catch (err) {
    console.error("🔥 Gagal promote admin:", err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function promoteAdmin2() {
  const EMAIL = "admin2@email.com" // targe email untuk admin

  try {
    const user = await prisma.user.findUnique({
      where: { email: EMAIL },
    })

    if (!user) {
      console.error("❌ User tidak ditemukan:", EMAIL)
      process.exit(1)
    }

    if (user.role === "admin") {
      console.log("ℹ️ User sudah admin:", EMAIL)
      return
    }

    await prisma.user.update({
      where: { email: EMAIL },
      data: {
        role: "admin",
      },
    })

    console.log("✅ Berhasil promote jadi admin:", EMAIL)
  } catch (err) {
    console.error("🔥 Gagal promote admin:", err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

promoteAdmin()
promoteAdmin2()
