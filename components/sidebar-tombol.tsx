// Komponen Tombol Sign out dan profile Sidebar Footer

"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  House,
  CircleUserRound,
  LogOut,
  Sparkles } from 'lucide-react'


export function TombolNav(){

    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()
    const isLogin = !!session?.user
  
    async function handleLogout() {
      await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
        router.push("/")
        },
      },
      })
    }

    return(
        <SidebarMenu>
       <SidebarMenuItem className="mb-5">
              <Link 
              href="/profile"
              className="flex items-center justify-center gap-2
              w-full rounded-full py-2.5 font-medium border-3
              "
              >
              <CircleUserRound className="h8 w-8"/>
                <span>Profile</span>
              </Link>
              
            </SidebarMenuItem>
            <SidebarMenuItem className="mb-5">
                <Link
              prefetch={false}
              href="#"
              onClick={handleLogout}
                className="
                  flex items-center justify-center gap-2
                  w-full rounded-full
                  bg-linear-to-r from-red-500 to-red-700
                  py-2.5 font-medium text-white
                  transition-all duration-200 hover:shadow-lg
                "
              >
              <span>Keluar</span>
              <LogOut className="h-6 w-6" />
            </Link>
             
            </SidebarMenuItem>
    </SidebarMenu>
    )

}



