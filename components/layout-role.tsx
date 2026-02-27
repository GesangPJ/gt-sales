// Layout berdasarkan Role akun

import React, { ReactNode } from "react"
import { auth } from '@/lib/auth'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from './admin-sidebar'
import { UserSidebar } from './user-sidebar'
import { headers } from "next/headers"

interface Props {
    children?: ReactNode
}

export async function RoleLayout({children}: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const tipe = session?.user?.tipe

  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: "/avatars/shadcn.jpg",
  }

  return (
    <SidebarProvider
    style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >

      {tipe === "admin" ? (
      <AdminSidebar user={user} />
    ) : tipe === "user" ? (
      <UserSidebar user={user} />
    ) : (
      <UserSidebar user={user} />
    )}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
        <footer>
          <div className='mx-auto flex max-w-7xl justify-center px-4 py-4 sm:px-6 border-t-2'>
            <p className='text-center font-medium text-balance'>
              &copy; {`${new Date().getFullYear()}`}{' '}
              GESANG TECHNOLOGY
            </p>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}




