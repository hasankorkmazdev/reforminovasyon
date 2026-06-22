"use client"

import { useState, useEffect } from "react"
import { api, type CategoryGroup } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function PartnerCategoriesPage() {
  const [groups, setGroups] = useState<CategoryGroup[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editGroupId, setEditGroupId] = useState<number>(0)
  const [name, setName] = useState("")
  const [sortOrder, setSortOrder] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await api.getCategories()
      if (!cancelled) setGroups(data)
    })()
    return () => { cancelled = true }
  }, [])

  async function load() {
    const data = await api.getCategories()
    setGroups(data)
  }

  function openCreate() {
    setEditId(null)
    setEditGroupId(groups[0]?.id || 0)
    setName("")
    setSortOrder(0)
    setOpen(true)
  }

  function openEdit(cat: { id: number; name: string; sortOrder: number; groupId: number }) {
    setEditId(cat.id)
    setEditGroupId(cat.groupId)
    setName(cat.name)
    setSortOrder(cat.sortOrder)
    setOpen(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editId) {
        await api.updateCategory(editId, editGroupId, name, sortOrder)
        toast.success("Kategori güncellendi")
      } else {
        await api.createCategory(editGroupId, name)
        toast.success("Kategori oluşturuldu")
      }
      setOpen(false)
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return
    try {
      await api.deleteCategory(id)
      toast.success("Kategori silindi")
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  const allCategories = groups.flatMap(g =>
    g.categories.map(c => ({ ...c, groupId: g.id, groupName: g.name }))
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader items={[{ label: "İş Kolu Kategorileri" }]} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-end">
            <Button onClick={openCreate}>Yeni Kategori</Button>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editId ? "Kategori Düzenle" : "Yeni Kategori"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Grup</label>
                  <select
                    className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
                    value={editGroupId}
                    onChange={(e) => setEditGroupId(Number(e.target.value))}
                    required
                  >
                    <option value="">Grup seçin</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Kategori Adı</label>
                  <Input
                    placeholder="Kategori adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Sıra</label>
                  <Input
                    type="number"
                    placeholder="Sıra"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>İptal</Button>
                  <Button type="submit">{editId ? "Güncelle" : "Ekle"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Grup</th>
                    <th className="px-4 py-3 text-left font-medium">Kategori</th>
                    <th className="px-4 py-3 text-left font-medium">Sıra</th>
                    <th className="px-4 py-3 text-left font-medium">Başvuru</th>
                    <th className="px-4 py-3 text-right font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        Henüz kategori eklenmemiş.
                      </td>
                    </tr>
                  )}
                  {allCategories.map((cat) => (
                    <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 text-muted-foreground">{cat.groupName}</td>
                      <td className="px-4 py-3 font-medium">{cat.name}</td>
                      <td className="px-4 py-3">{cat.sortOrder}</td>
                      <td className="px-4 py-3">{cat.applicationCount}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => openEdit(cat)}>
                          Düzenle
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)}>
                          Sil
                        </Button>
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
