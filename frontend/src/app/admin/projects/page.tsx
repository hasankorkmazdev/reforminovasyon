"use client"

import { useState, useEffect, useRef } from "react"
import { api, type Project } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sortOrder, setSortOrder] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await api.getAllProjects()
      if (!cancelled) setProjects(data)
    })()
    return () => { cancelled = true }
  }, [])

  async function load() {
    const data = await api.getAllProjects()
    setProjects(data)
  }

  function resetForm() {
    setEditId(null)
    setImageUrl("")
    setTitle("")
    setDescription("")
    setSortOrder(0)
    setIsActive(true)
  }

  function openCreate() {
    resetForm()
    setOpen(true)
  }

  function openEdit(p: Project) {
    setEditId(p.id)
    setImageUrl(p.imageUrl)
    setTitle(p.title)
    setDescription(p.description || "")
    setSortOrder(p.sortOrder)
    setIsActive(p.isActive)
    setOpen(true)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file)
      setImageUrl(url)
      toast.success("Resim yüklendi")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Yükleme hatası")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!imageUrl) { toast.error("Lütfen bir resim yükleyin"); return }
    if (!title.trim()) { toast.error("Lütfen bir başlık girin"); return }
    try {
      const data = { imageUrl, title, description: description || undefined, sortOrder, isActive }
      if (editId) {
        await api.updateProject(editId, data)
        toast.success("Proje güncellendi")
      } else {
        await api.createProject(data)
        toast.success("Proje oluşturuldu")
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
      await api.deleteProject(id)
      toast.success("Proje silindi")
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  async function toggleActive(p: Project) {
    try {
      await api.updateProject(p.id, { imageUrl: p.imageUrl, title: p.title, description: p.description || undefined, sortOrder: p.sortOrder, isActive: !p.isActive })
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader items={[{ label: "Proje Yönetimi" }]} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-end">
            <Button onClick={openCreate}>Yeni Proje</Button>
          </div>

          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm() }}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editId ? "Proje Düzenle" : "Yeni Proje"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Resim</label>
                  <div className="flex items-center gap-3">
                    <Input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="flex-1" />
                    {uploading && <span className="text-sm text-muted-foreground">Yükleniyor...</span>}
                  </div>
                  {imageUrl && (
                    <img src={imageUrl} alt="preview" className="mt-2 h-32 w-full rounded-lg border object-cover" />
                  )}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Başlık</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Açıklama</label>
                  <textarea className="min-h-[60px] rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Sıra</label>
                    <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Aktif</label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4" />
                      {isActive ? "Aktif" : "Pasif"}
                    </label>
                  </div>
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
                    <th className="px-4 py-3 text-left font-medium">Önizleme</th>
                    <th className="px-4 py-3 text-left font-medium">Başlık</th>
                    <th className="px-4 py-3 text-left font-medium">Açıklama</th>
                    <th className="px-4 py-3 text-left font-medium">Sıra</th>
                    <th className="px-4 py-3 text-left font-medium">Aktif</th>
                    <th className="px-4 py-3 text-right font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        Henüz proje eklenmemiş.
                      </td>
                    </tr>
                  )}
                  {projects.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <img src={p.imageUrl} alt="" className="h-12 w-20 rounded border object-cover" />
                      </td>
                      <td className="px-4 py-3 font-medium">{p.title}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{p.description || <span className="text-muted-foreground italic">—</span>}</td>
                      <td className="px-4 py-3">{p.sortOrder}</td>
                      <td className="px-4 py-3">
                        <button
                          className={`inline-flex h-6 w-10 cursor-pointer items-center rounded-full border transition-colors ${p.isActive ? "bg-green-500 border-green-500" : "bg-muted border-input"}`}
                          onClick={() => toggleActive(p)}
                        >
                          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${p.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => openEdit(p)}>Düzenle</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Sil</Button>
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
