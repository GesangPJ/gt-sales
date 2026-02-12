"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"

import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
  IconHelp,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Menu } from '@base-ui/react/menu'

interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function NavUser({ user }: NavUserProps) {
  
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }

  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
  <SidebarMenuItem>
    <Menu.Root>
      <Menu.Trigger className="w-full" render={<SidebarMenuButton
          size="lg"
          className="data-open:bg-sidebar-accent 
                     data-open:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>

          <IconDotsVertical className="ml-auto size-4" />
        </SidebarMenuButton>}>
        
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <Menu.Popup
            className="min-w-56 rounded-lg border bg-popover p-1 shadow-md"
          >
            <div className="px-2 py-2">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">
                {user.email}
              </div>
            </div>

            <Menu.Separator />

            <Menu.Item>
              <Link
                href="/pengaturan"
                className="flex items-center gap-2"
              >
                <IconUserCircle />
                <span>Akun</span>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                href="/panduan"
                className="flex items-center gap-2"
              >
                <IconHelp />
                <span>Panduan</span>
              </Link>
            </Menu.Item>

            <Menu.Separator />

            <Menu.Item
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <IconLogout />
              <span>Keluar</span>
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  </SidebarMenuItem>
</SidebarMenu>
  )
}
