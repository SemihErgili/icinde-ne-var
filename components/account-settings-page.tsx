"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, LogOut, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AccountSettingsPage() {
  const router = useRouter()
  const [name, setName] = useState("Ahmet Kaya")
  const [email, setEmail] = useState("ahmet.kaya@example.com")
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("32")
  const [height, setHeight] = useState("178")
  const [weight, setWeight] = useState("66")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update user data with your backend
      setLoading(false)
      router.push("/profil")
    }, 1000)
  }

  const handleDeleteAccount = () => {
    // In a real app, you would delete the user account with your backend
    setDeleteDialogOpen(false)
    router.push("/giris")
  }

  const handleLogout = () => {
    // In a real app, you would log out the user
    router.push("/giris")
  }

  return (
    <div className="p-3">
      <div className="mb-4">
        <Link href="/profil" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Profile dön
        </Link>
      </div>

      <h1 className="text-xl font-bold mb-4">Hesap Ayarları</h1>

      <div className="mb-4 flex justify-center">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="@user" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 shadow-md">
            <Camera className="h-4 w-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Kişisel Bilgiler</CardTitle>
            <CardDescription>Profil bilgilerinizi güncelleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Cinsiyet</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Erkek</SelectItem>
                    <SelectItem value="female">Kadın</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Yaş</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Boy (cm)</Label>
                <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Kilo (kg)</Label>
                <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Uygulama Ayarları</CardTitle>
            <CardDescription>Bildirim ve görünüm ayarlarınızı düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Bildirimler</p>
                <p className="text-xs text-gray-500">Uygulama bildirimlerini al</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Karanlık Mod</p>
                <p className="text-xs text-gray-500">Koyu tema kullan</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Güvenlik</CardTitle>
            <CardDescription>Şifre ve hesap güvenliği ayarları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" type="button">
              Şifremi Değiştir
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end mb-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </Button>
        </div>
      </form>

      <Separator className="my-6" />

      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start text-gray-700" type="button" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Çıkış Yap
        </Button>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200" type="button">
              <Trash2 className="h-4 w-4 mr-2" />
              Hesabımı Sil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hesabınızı silmek istediğinize emin misiniz?</DialogTitle>
              <DialogDescription>
                Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                İptal
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Hesabımı Sil
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
