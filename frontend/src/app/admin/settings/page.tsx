"use client"

import { useState, useEffect } from "react"
import { api, type SocialMediaItem, type ContactInfoItem } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function SettingsPage() {
  const [socialMedia, setSocialMedia] = useState<SocialMediaItem[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfoItem[]>([])

  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [platform, setPlatform] = useState("")
  const [url, setUrl] = useState("")
  const [icon, setIcon] = useState("")
  const [isActive, setIsActive] = useState(true)

  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [mapLat, setMapLat] = useState("")
  const [mapLng, setMapLng] = useState("")
  const [mapAddress, setMapAddress] = useState("")

  const platformOptions = ["Facebook", "Twitter", "Instagram", "Linkedin", "Youtube", "WhatsApp", "TikTok", "Diğer"]

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const [social, contact] = await Promise.all([
        api.getAllSocialMedia(),
        api.getContactInfo(),
      ])
      setSocialMedia(social)

      const getVal = (type: string) => contact.find((c) => c.type === type)?.value || ""
      setPhone(getVal("phone"))
      setEmail(getVal("email"))
      setAddress(getVal("address"))
      setMapLat(getVal("map_lat"))
      setMapLng(getVal("map_lng"))
      setMapAddress(getVal("map_address"))
      setContactInfo(contact)
    } catch {
      toast.error("Ayarlar yüklenirken hata oluştu")
    }
  }

  function resetForm() {
    setEditId(null)
    setPlatform("")
    setUrl("")
    setIcon("")
    setIsActive(true)
  }

  function openCreate() {
    resetForm()
    setOpen(true)
  }

  function openEdit(s: SocialMediaItem) {
    setEditId(s.id)
    setPlatform(s.platform)
    setUrl(s.url)
    setIcon(s.icon || "")
    setIsActive(s.isActive)
    setOpen(true)
  }

  async function handleSaveSocial(e: React.FormEvent) {
    e.preventDefault()
    if (!platform || !url) { toast.error("Platform ve URL zorunludur"); return }
    try {
      const data = { platform, url, icon: icon || undefined, isActive }
      if (editId) {
        await api.updateSocialMedia(editId, data)
        toast.success("Sosyal medya güncellendi")
      } else {
        await api.createSocialMedia(data)
        toast.success("Sosyal medya eklendi")
      }
      setOpen(false)
      const list = await api.getAllSocialMedia()
      setSocialMedia(list)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  async function handleDeleteSocial(id: number) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return
    try {
      await api.deleteSocialMedia(id)
      toast.success("Sosyal medya silindi")
      const list = await api.getAllSocialMedia()
      setSocialMedia(list)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  async function handleSaveContact(e: React.FormEvent) {
    e.preventDefault()
    const items = [
      { type: "phone", value: phone },
      { type: "email", value: email },
      { type: "address", value: address },
      { type: "map_lat", value: mapLat },
      { type: "map_lng", value: mapLng },
      { type: "map_address", value: mapAddress },
    ]
    try {
      await api.upsertContactInfo(items)
      toast.success("İletişim bilgileri kaydedildi")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Bir hata oluştu")
    }
  }

  function getPlatformIcon(p: string) {
    const icons: Record<string, string> = {
      Facebook: "lni-facebook",
      Twitter: "lni-twitter-old",
      Instagram: "lni-instagram",
      Linkedin: "lni-linkedin",
      Youtube: "lni-youtube",
      WhatsApp: "lni-whatsapp",
      TikTok: "lni-tiktok",
    }
    return icons[p] || "lni-globe-1"
  }

  function getPlatformColor(p: string) {
    const colors: Record<string, string> = {
      Facebook: "#1877F2",
      Twitter: "#000",
      Instagram: "#E4405F",
      Linkedin: "#0A66C2",
      Youtube: "#FF0000",
      WhatsApp: "#25D366",
      TikTok: "#000",
    }
    return colors[p] || "#666"
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader items={[{ label: "Ayarlar" }]} />

        <div className="flex flex-1 flex-col gap-8 p-4 pt-0">
          {/* Sosyal Medya */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sosyal Medya Hesapları</h2>
              <Button onClick={openCreate}>Yeni Ekle</Button>
            </div>

            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm() }}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editId ? "Sosyal Medya Düzenle" : "Yeni Sosyal Medya"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveSocial} className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="justify-between"
                        >
                          {platform ? (
                            <span className="flex items-center gap-2">
                              <i className={`lni ${getPlatformIcon(platform)} text-base`} style={{ color: getPlatformColor(platform) }} />
                              {platform}
                            </span>
                          ) : (
                            "Platform seçin"
                          )}
                          <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Platform ara..." />
                          <CommandList>
                            <CommandEmpty>Platform bulunamadı.</CommandEmpty>
                            <CommandGroup>
                              {platformOptions.map((p) => (
                                <CommandItem
                                  key={p}
                                  value={p}
                                  onSelect={(v) => setPlatform(v === platform ? "" : v)}
                                >
                                  <i className={`lni ${getPlatformIcon(p)} text-base shrink-0`} style={{ color: getPlatformColor(p) }} />
                                  {p}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      platform === p ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">URL</label>
                    <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">İkon (opsiyonel)</label>
                    <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="lucide icon adı" />
                  </div>
                  <div className="grid gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4" />
                      {isActive ? "Aktif" : "Pasif"}
                    </label>
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
                      <th className="px-4 py-3 text-left font-medium">Platform</th>
                      <th className="px-4 py-3 text-left font-medium">URL</th>
                      <th className="px-4 py-3 text-center font-medium">Aktif</th>
                      <th className="px-4 py-3 text-right font-medium">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialMedia.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                          Henüz sosyal medya hesabı eklenmemiş.
                        </td>
                      </tr>
                    )}
                    {socialMedia.map((s) => (
                      <tr key={s.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <i className={`lni ${getPlatformIcon(s.platform)} text-lg`} style={{ color: getPlatformColor(s.platform) }} />
                            <span className="font-medium">{s.platform}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground max-w-[300px] truncate">
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {s.url}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block h-2 w-2 rounded-full ${s.isActive ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => openEdit(s)}>Düzenle</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteSocial(s.id)}>Sil</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h2 className="text-lg font-semibold mb-4">İletişim Bilgileri</h2>
            <form onSubmit={handleSaveContact} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Telefon</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5XX XXX XX XX" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">E-posta</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@reforminovasyon.com" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Adres</label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adres bilgisi" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Harita Enlem (Latitude)</label>
                    <Input value={mapLat} onChange={(e) => setMapLat(e.target.value)} placeholder="41.0082" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Harita Boylam (Longitude)</label>
                    <Input value={mapLng} onChange={(e) => setMapLng(e.target.value)} placeholder="28.9784" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Harita Adresi</label>
                    <Input value={mapAddress} onChange={(e) => setMapAddress(e.target.value)} placeholder="Harita üzerinde gösterilecek adres" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Kaydet</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
