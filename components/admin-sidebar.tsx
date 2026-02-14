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
    IconBuildingCommunity,
    IconBuildingWarehouse,
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
        icon: (<IconCashRegister/>),
    },
  ],
  navBrand:[
    {
      title:"Brand",
      url:"#",
      icon:(<IconBuildingCommunity/>),
      items:[
        {
          title:"Daftar Brand",
          url:"/brand"
        },
        {
          title:"Edit Brand",
          url:"/brand/edit-brand",
        },

        ],
      
    },
    {
      title:"Distributor",
      url:"#",
      icon:(<IconBuildingWarehouse/>),
      items:[
        {
          title:"Daftar Distributor",
          url:"/distributor",
        },
        {
          title:"Edit Distributor",
          url:"/distributor/edit-distributor",
        },
      ]
    }

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
          title: "Tambah Produk",
          url: "/tambah-produk",
        },
        {
          title: "Update Stok",
          url:"/produk/stok-produk"
        },
        {
          title: "Edit Produk",
          url: "/edit-produk",
        },
      ],
    },
    {
      title: "Kategori",
      url: "#",
      icon: (
        <IconCategory/>
      ),
      items: [
        {
          title: "Daftar Kategori",
          url: "/kategori",
        },
        {
          title: "Edit Kategori",
          url: "/kategori/edit-kategori",
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
        {
          title: "Edit Pembelian",
          url: "/pembelian/edit-pembelian",
        },
      ],
    },
    {
      title: "Jurnal",
      url: "#",
      icon: (
        <IconBook2/>
      ),
      items: [
        {
          title: "Tabel Jurnal",
          url: "/jurnal",
        },
        {
          title: "Buat Jurnal Debit",
          url: "/jurnal/buat-debit",
        },
        {
          title: "Buat Jurnal Kredit",
          url: "/jurnal/buat-kredit",
        },
        {
          title: "Edit Jurnal",
          url: "/jurnal/edit-jurnal",
        },
      ],
    },
  ],
}

interface AdminSidebarProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenuItem>
            <SidebarMenuButton
            render={<Link href="#" />}
            >
                <IconAppsFilled/>
                <span className="text-yellow-500  text-xl font-semibold">GT-SALES</span> 
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
        <NavMain items={data.navBrand}/>
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={user} /> */}
        <TombolNav/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
