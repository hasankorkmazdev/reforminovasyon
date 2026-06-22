"use client"

import { useState, useEffect, useRef } from "react"
import { api, type Slide } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function SlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [sortOrder, setSortOrder] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await api.getAllSlides()
      if (!cancelled) setSlides(data)
    })()
    return () => { cancelled = true }
  }, [])

  async function load() {
    const data = await api.getAllSlides()
    setSlides(data)
  }

  function resetForm() {
    setEditId(null)
    setImageUrl("")
    setTitle("")
    setSubtitle("")
    setDescription("")
    setLinkUrl("")
    setLinkText("")
    setSortOrder(0)
    setIsActive(true)
  }

  function openCreate() {
    resetForm()
    setOpen(true)
  }

  function openEdit(s: Slide) {
    setEditId(s.id)
    setImageUrl(s.imageUrl)
    setTitle(s.title || "")
    setSubtitle(s.subtitle || "")
    setDescription(s.description || "")
    setLinkUrl(s.linkUrl || "")
    setLinkText(s.linkText || "")
    setSortOrder(s.sortOrder)
    setIsActive(s.isActive)
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
    try {
      const data = { imageUrl, title: title || undefined, subtitle: subtitle || undefined, description: description || undefined, linkUrl: linkUrl || undefined, linkText: linkText || undefined, sortOrder, isActive }
      if (editId) {
        await api.updateSlide(editId, data)
        toast.success("Slayt güncellendi")
      } else {
        await api.createSlide(data)
        toast.success("Slayt oluşturuldu")
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
      await api.deleteSlide(id)
      toast.success("Slayt silindi")
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  async function toggleActive(s: Slide) {
    try {
      await api.updateSlide(s.id, { imageUrl: s.imageUrl, title: s.title || undefined, subtitle: s.subtitle || undefined, description: s.description || undefined, linkUrl: s.linkUrl || undefined, linkText: s.linkText || undefined, sortOrder: s.sortOrder, isActive: !s.isActive })
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

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
                  <BreadcrumbPage>Slayt Yönetimi</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-end">
            <Button onClick={openCreate}>Yeni Slayt</Button>
          </div>

          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm() }}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editId ? "Slayt Düzenle" : "Yeni Slayt"}</DialogTitle>
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
                  <label className="text-sm font-medium">Alt Başlık</label>
                  <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Açıklama</label>
                  <textarea className="min-h-[60px] rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Link URL</label>
                    <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Link Metni</label>
                    <Input value={linkText} onChange={(e) => setLinkText(e.target.value)} placeholder="Detaylı Bilgi" />
                  </div>
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
                    <th className="px-4 py-3 text-left font-medium">Sıra</th>
                    <th className="px-4 py-3 text-left font-medium">Aktif</th>
                    <th className="px-4 py-3 text-right font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {slides.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        Henüz slayt eklenmemiş.
                      </td>
                    </tr>
                  )}
                  {slides.map((s) => (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <img src={s.imageUrl} alt="" className="h-12 w-20 rounded border object-cover" />
                      </td>
                      <td className="px-4 py-3 font-medium">{s.title || <span className="text-muted-foreground italic">—</span>}</td>
                      <td className="px-4 py-3">{s.sortOrder}</td>
                      <td className="px-4 py-3">
                        <button
                          className={`inline-flex h-6 w-10 cursor-pointer items-center rounded-full border transition-colors ${s.isActive ? "bg-green-500 border-green-500" : "bg-muted border-input"}`}
                          onClick={() => toggleActive(s)}
                        >
                          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${s.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => openEdit(s)}>Düzenle</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>Sil</Button>
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
