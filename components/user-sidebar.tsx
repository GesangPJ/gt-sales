"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { IconLayoutRows, 
    IconWaveSine, 
    IconCommand, 
    IconTerminal2, 
    IconRobot, 
    IconBook, 
    IconSettings, 
    IconFrame, 
    IconChartPie,
    IconPackage,
    IconCashRegister,
    IconAppsFilled,
    IconReceipt2,
    IconCategory,
    IconBook2,
    IconMap 
} from "@tabler/icons-react"
import Link from "next/link"
import { AppInfo } from "./app-info"
import { TombolNav } from "./sidebar-tombol"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navKasir:[
    {
        title: "Kasir",
        url:"/kasir",
        icon: <IconCashRegister/>
    },
  ],
  navMain: [
    {
      title: "Produk",
      url: "#",
      icon: (
        <IconPackage/>
      ),
      items: [
        {
          title: "Daftar Produk",
          url: "/produk",
        },
        {
          title: "Update Stok",
          url:"/produk/stok-produk"
        },
      ],
    },
    {
      title: "Pembelian",
      url: "#",
      icon: (
        <IconReceipt2/>
      ),
      items: [
        {
          title: "Daftar Pembelian",
          url: "/pembelian/data-pembelian",
        },
        {
          title: "Buat Pembelian",
          url: "/pembelian",
        },
        {
          title: "Status Pembelian",
          url: "/pembelian/status-pembelian",
        },
      ],
    },
  ],
  
}

interface UserSidebarProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function UserSidebar({ user }: UserSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenuItem>
            <SidebarMenuButton
            render={<Link href="/" className="hover:bg-none"/>}
            >
                <IconAppsFilled/>
                <span className="text-yellow-500 font-semibold">GT-SALES</span> 
                <AppInfo/>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenu>

        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem className="px-2">
          <SidebarMenuButton render={<Link href="/kasir">
          <IconCashRegister className="w-10 h10"/>
          <span className="">Kasir</span>
          </Link>}>

          </SidebarMenuButton>
        </SidebarMenuItem>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <TombolNav/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
