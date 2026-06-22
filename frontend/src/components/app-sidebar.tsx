"use client"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, UsersIcon, TagsIcon, ImageIcon, SettingsIcon } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "İş Ortakları",
    url: "/admin/partners",
    icon: <UsersIcon />,
    items: [
      { title: "Başvurular", url: "/admin/partners" },
      { title: "Kategoriler", url: "/admin/partner-categories" },
    ],
  },
  {
    title: "Slaytlar",
    url: "/admin/slides",
    icon: <ImageIcon />,
  },
  {
    title: "Ayarlar",
    url: "/admin/settings",
    icon: <SettingsIcon />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[{ name: "Reform İnovasyon", logo: <TagsIcon />, plan: "Admin Panel" }]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "Admin", email: "admin@reform.com", avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
