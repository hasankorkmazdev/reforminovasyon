"use client"

import { useState, useEffect } from "react"
import { api, type Application, type CategoryGroup } from "@/lib/api"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { toast } from "sonner"

const statusColors: Record<string, string> = {
  "Yeni": "bg-blue-500/10 text-blue-600",
  "İncelendi": "bg-yellow-500/10 text-yellow-600",
  "İletişime Geçildi": "bg-green-500/10 text-green-600",
}

export default function PartnersPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [groups, setGroups] = useState<CategoryGroup[]>([])
  const [filterStatus, setFilterStatus] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [apps, cats] = await Promise.all([
        api.getApplications(filterStatus || undefined, filterCategory ? Number(filterCategory) : undefined),
        api.getCategories(),
      ])
      if (!cancelled) {
        setApplications(apps)
        setGroups(cats)
      }
    })()
    return () => { cancelled = true }
  }, [filterStatus, filterCategory])

  async function handleStatusChange(id: number, status: string) {
    try {
      await api.updateApplicationStatus(id, status)
      toast.success("Durum güncellendi")
      const apps = await api.getApplications(filterStatus || undefined, filterCategory ? Number(filterCategory) : undefined)
      setApplications(apps)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  const allCategories = groups.flatMap(g => g.categories)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>İş Ortağı Başvuruları</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-2">
            <select
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tüm Durumlar</option>
              <option value="Yeni">Yeni</option>
              <option value="İncelendi">İncelendi</option>
              <option value="İletişime Geçildi">İletişime Geçildi</option>
            </select>
            <select
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Tüm Kategoriler</option>
              {allCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Firma</th>
                    <th className="px-4 py-3 text-left font-medium">Yetkili</th>
                    <th className="px-4 py-3 text-left font-medium">E-posta</th>
                    <th className="px-4 py-3 text-left font-medium">Telefon</th>
                    <th className="px-4 py-3 text-left font-medium">Kategori</th>
                    <th className="px-4 py-3 text-left font-medium">Grup</th>
                    <th className="px-4 py-3 text-left font-medium">Tarih</th>
                    <th className="px-4 py-3 text-left font-medium">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                        Henüz başvuru bulunmuyor.
                      </td>
                    </tr>
                  )}
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{app.companyName}</td>
                      <td className="px-4 py-3">{app.contactPerson}</td>
                      <td className="px-4 py-3">{app.email}</td>
                      <td className="px-4 py-3">{app.phone}</td>
                      <td className="px-4 py-3">{app.categoryName}</td>
                      <td className="px-4 py-3">{app.groupName}</td>
                      <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString("tr-TR")}</td>
                      <td className="px-4 py-3">
                        <select
                          className={`h-7 rounded-md border-0 px-2 text-xs font-medium ${statusColors[app.status] || ""}`}
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        >
                          <option value="Yeni">Yeni</option>
                          <option value="İncelendi">İncelendi</option>
                          <option value="İletişime Geçildi">İletişime Geçildi</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
