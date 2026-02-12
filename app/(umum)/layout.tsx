// Layout umum

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { RoleLayout } from "@/components/layout-role"

export default async function LayoutUmum({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

    // 🔒 guard pertama
    if (!session) {
    redirect("/")
    }

  return (
    <RoleLayout>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                {children}
            </div>
        </div>
    </RoleLayout>
  )
}


