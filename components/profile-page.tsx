"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Award, TrendingUp, Calendar, ChevronRight, Edit, Save, Camera, Target, Weight, Github } from "lucide-react"
import Link from "next/link"

export function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editWeight, setEditWeight] = useState(false)
  const [editTarget, setEditTarget] = useState(false)
  const [userData, setUserData] = useState({
    name: "Semih ERGİLİ",
    email: "semih.ergili@example.com",
    weight: 66,
    height: 178,
    age: 32,
    targetWeight: 62,
    gender: "male",
    activityLevel: "moderately_active",
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Gerçek uygulamada burada API çağrısı yapılır
  }

  const handleWeightChange = (value: number[]) => {
    setUserData({ ...userData, weight: value[0] })
  }

  const handleTargetWeightChange = (value: number[]) => {
    setUserData({ ...userData, targetWeight: value[0] })
  }

  const handleSaveWeight = () => {
    setEditWeight(false)
    // Gerçek uygulamada burada API çağrısı yapılır
  }

  const handleSaveTarget = () => {
    setEditTarget(false)
    // Gerçek uygulamada burada API çağrısı yapılır
  }

  return (
    <div className="p-3">
      <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="@user" />
            <AvatarFallback>SE</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1">
            <div className="text-base font-medium">{userData.name}</div>
            <div className="text-xs text-gray-500">Premium Üye</div>
            <div className="flex mt-1">
              <Badge variant="outline" className="text-[10px] h-4 mr-1 bg-primary/5 text-primary border-primary/20">
                {userData.weight} kg
              </Badge>
              <Badge variant="outline" className="text-[10px] h-4 mr-1 bg-primary/5 text-primary border-primary/20">
                {userData.height} cm
              </Badge>
              <Badge variant="outline" className="text-[10px] h-4 bg-primary/5 text-primary border-primary/20">
                {userData.age} yaş
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <StatItem icon={<Calendar className="h-4 w-4" />} value="124" label="Gün" />
          <StatItem icon={<TrendingUp className="h-4 w-4" />} value="-5.2" label="kg" />
          <StatItem icon={<Award className="h-4 w-4" />} value="8" label="Rozet" />
        </div>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary h-8 mb-2">
          <TabsTrigger value="goals" className="text-xs h-8">
            Hedeflerim
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs h-8">
            Başarılarım
          </TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="mt-0">
          <GoalsTab
            userData={userData}
            onEditWeight={() => setEditWeight(true)}
            onEditTarget={() => setEditTarget(true)}
          />
        </TabsContent>

        <TabsContent value="achievements" className="mt-0">
          <AchievementsTab />
        </TabsContent>
      </Tabs>

      {/* Profil Düzenleme Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profil Bilgilerini Düzenle</DialogTitle>
            <DialogDescription>Kişisel bilgilerinizi güncelleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="@user" />
                  <AvatarFallback>SE</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 shadow-md">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Cinsiyet</Label>
                <Select value={userData.gender} onValueChange={(value) => setUserData({ ...userData, gender: value })}>
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
                <Input
                  id="age"
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData({ ...userData, age: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Boy (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={userData.height}
                  onChange={(e) => setUserData({ ...userData, height: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Kilo (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={userData.weight}
                  onChange={(e) => setUserData({ ...userData, weight: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Aktivite Seviyesi</Label>
              <Select
                value={userData.activityLevel}
                onValueChange={(value) => setUserData({ ...userData, activityLevel: value })}
              >
                <SelectTrigger id="activityLevel">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Hareketsiz</SelectItem>
                  <SelectItem value="lightly_active">Az Hareketli</SelectItem>
                  <SelectItem value="moderately_active">Orta Hareketli</SelectItem>
                  <SelectItem value="very_active">Çok Hareketli</SelectItem>
                  <SelectItem value="extra_active">Ekstra Hareketli</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Kilo Düzenleme Dialog */}
      <Dialog open={editWeight} onOpenChange={setEditWeight}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mevcut Kilonuzu Güncelleyin</DialogTitle>
            <DialogDescription>Kilo takibinizi güncel tutun.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center mb-4">
              <Weight className="h-8 w-8 text-primary mr-3" />
              <div>
                <div className="text-2xl font-bold">{userData.weight} kg</div>
                <div className="text-sm text-gray-500">Mevcut Kilonuz</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">50 kg</span>
                  <span className="text-sm">120 kg</span>
                </div>
                <Slider value={[userData.weight]} min={50} max={120} step={0.1} onValueChange={handleWeightChange} />
              </div>
              <div className="flex justify-center">
                <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">{userData.weight}</div>
                  <div className="text-xs text-gray-500">kilogram</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditWeight(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveWeight}>
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hedef Kilo Düzenleme Dialog */}
      <Dialog open={editTarget} onOpenChange={setEditTarget}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hedef Kilonuzu Güncelleyin</DialogTitle>
            <DialogDescription>Kilo hedeflerinizi belirleyin.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-primary mr-3" />
              <div>
                <div className="text-2xl font-bold">{userData.targetWeight} kg</div>
                <div className="text-sm text-gray-500">Hedef Kilonuz</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">50 kg</span>
                  <span className="text-sm">120 kg</span>
                </div>
                <Slider
                  value={[userData.targetWeight]}
                  min={50}
                  max={120}
                  step={0.1}
                  onValueChange={handleTargetWeightChange}
                />
              </div>
              <div className="flex justify-center">
                <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">{userData.targetWeight}</div>
                  <div className="text-xs text-gray-500">kilogram</div>
                </div>
              </div>
              <div className="text-center text-sm">
                {userData.weight > userData.targetWeight ? (
                  <span className="text-green-600">
                    {(userData.weight - userData.targetWeight).toFixed(1)} kg vermeniz gerekiyor
                  </span>
                ) : userData.weight < userData.targetWeight ? (
                  <span className="text-blue-600">
                    {(userData.targetWeight - userData.weight).toFixed(1)} kg almanız gerekiyor
                  </span>
                ) : (
                  <span className="text-gray-600">Hedefinize ulaştınız!</span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveTarget}>
              <Save className="h-4 w-4 mr-2" /> Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6 text-center">
        <div className="text-xs text-gray-500 mb-2">Development by SEMİH ERGİLİ</div>
        <Link
          href="https://github.com/SemihErgili"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-gray-600 hover:text-gray-900"
        >
          <Github className="h-4 w-4 mr-1" />
          github.com/SemihErgili
        </Link>
      </div>
    </div>
  )
}

function StatItem({ icon, value, label }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2 text-center">
      <div className="flex justify-center text-primary mb-1">{icon}</div>
      <div className="text-sm font-medium">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

function GoalsTab({ userData, onEditWeight, onEditTarget }) {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Günlük Kalori Hedefi</div>
              <div className="text-xs text-gray-500">Kilo vermek için günlük hedef</div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mr-1">2550</div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Mevcut Kilo</div>
              <div className="text-xs text-gray-500">Son güncelleme: Bugün</div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mr-1">{userData.weight} kg</div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onEditWeight}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Hedef Kilo</div>
              <div className="text-xs text-gray-500">
                {userData.weight > userData.targetWeight
                  ? `${(userData.weight - userData.targetWeight).toFixed(1)} kg kaldı`
                  : userData.weight < userData.targetWeight
                    ? `${(userData.targetWeight - userData.weight).toFixed(1)} kg kaldı`
                    : "Hedefe ulaşıldı!"}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mr-1">{userData.targetWeight} kg</div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onEditTarget}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, 100 - Math.abs(((userData.targetWeight - userData.weight) / userData.weight) * 100)),
                )}%`,
              }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Makro Besin Hedefleri</div>
              <div className="text-xs text-gray-500">Protein, karbonhidrat ve yağ oranları</div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mr-1">25/45/30</div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex w-full h-1.5 mt-2 rounded-full overflow-hidden">
            <div className="bg-primary h-1.5" style={{ width: "25%" }}></div>
            <div className="bg-blue-400 h-1.5" style={{ width: "45%" }}></div>
            <div className="bg-yellow-400 h-1.5" style={{ width: "30%" }}></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Su Tüketimi</div>
              <div className="text-xs text-gray-500">Günlük 2.5 litre hedefi</div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mr-1">1.8 / 2.5 L</div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: "72%" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AchievementsTab() {
  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center">
            <div className="bg-primary-100 p-2 rounded-full mr-3">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">7 Gün Arka Arkaya</div>
              <div className="text-xs text-gray-500">7 gün boyunca uygulama kullanımı</div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-primary">Kazanıldı</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex items-center">
            <div className="bg-primary-100 p-2 rounded-full mr-3">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">İlk Kilo Kaybı</div>
              <div className="text-xs text-gray-500">İlk 1 kg'ı verme başarısı</div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-primary">Kazanıldı</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <Award className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <div className="text-sm font-medium">Hedef Kiloya Ulaşma</div>
              <div className="text-xs text-gray-500">Belirlediğin hedefe ulaşma</div>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-gray-500">
                İlerleme: 60%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <Award className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <div className="text-sm font-medium">30 Gün Arka Arkaya</div>
              <div className="text-xs text-gray-500">30 gün boyunca uygulama kullanımı</div>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-gray-500">
                İlerleme: 80%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
