"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MessageCircle } from "lucide-react"
import Link from "next/link"

export function HomePage() {
  const [activeTab, setActiveTab] = useState("meals")

  return (
    <div className="p-3">
      {/* User Stats */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-3">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
            <AvatarFallback>SE</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-sm font-medium">Merhaba, Semih</div>
            <div className="text-xs text-gray-500">Günlük hedef: 2100 kcal</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-lg font-bold text-primary">1660</div>
            <div className="text-xs text-gray-500">kcal alındı</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          <StatItem label="Yağ" value="56.53g" percentage="80%" />
          <StatItem label="Karb" value="281.52g" percentage="60%" />
          <StatItem label="Prot" value="101.76g" percentage="90%" />
          <StatItem label="Kalori" value="2081" percentage="75%" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="meals" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-secondary h-8 mb-2">
          <TabsTrigger value="meals" className="text-xs h-8">
            Öğünlerim
          </TabsTrigger>
          <TabsTrigger value="messages" className="text-xs h-8">
            Mesajlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="mt-0">
          <MealsTab />
        </TabsContent>

        <TabsContent value="messages" className="mt-0">
          <MessagesTab />
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <Link href="/tara">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary-600 shadow-lg flex items-center justify-center"
          >
            {activeTab === "meals" ? <Plus className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </Button>
        </Link>
      </div>
    </div>
  )
}

function StatItem({ label, value, percentage }: { label: string; value: string; percentage: string }) {
  return (
    <div className="text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xs font-medium">{value}</div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
        <div className="bg-primary h-1.5 rounded-full" style={{ width: percentage }}></div>
      </div>
    </div>
  )
}

function MealsTab() {
  return (
    <div className="space-y-2">
      <MealItem
        title="Kahvaltı"
        time="08:30"
        calories="644"
        items={[
          { name: "Yumurta", amount: "2 adet", calories: "156" },
          { name: "Tam Tahıllı Ekmek", amount: "2 dilim", calories: "138" },
        ]}
      />

      <MealItem
        title="Öğle Yemeği"
        time="13:15"
        calories="463"
        items={[
          { name: "Tavuk", amount: "100g", calories: "237" },
          { name: "Çavdar Ekmeği", amount: "2 dilim", calories: "135" },
          { name: "Erikler", amount: "3 adet", calories: "91" },
        ]}
      />

      <MealItem
        title="Akşam Yemeği"
        time="19:30"
        calories="798"
        items={[
          { name: "Somon", amount: "150g", calories: "354" },
          { name: "Karışık Salata", amount: "1 porsiyon", calories: "124" },
          { name: "Pirinç", amount: "100g", calories: "320" },
        ]}
      />
    </div>
  )
}

function MealItem({
  title,
  time,
  calories,
  items,
}: {
  title: string
  time: string
  calories: string
  items: { name: string; amount: string; calories: string }[]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <div className="bg-primary-100 text-primary-700 rounded-full p-1.5 mr-2">
            <Plus className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="text-sm font-medium">{title}</div>
            <div className="text-xs text-gray-500">{time}</div>
          </div>
        </div>
        <div className="text-sm font-medium text-primary">{calories}</div>
      </div>

      {expanded && (
        <CardContent className="pt-0 pb-2 px-3">
          <div className="border-t pt-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between py-1 text-xs">
                <div className="flex">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-500 ml-2">{item.amount}</span>
                </div>
                <span>{item.calories}</span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function MessagesTab() {
  return (
    <div className="space-y-2">
      <MessageItem
        name="Diyetisyen Ayşe"
        avatar="/placeholder.svg?height=40&width=40"
        message="Merhaba, bugünkü öğünleriniz nasıl gidiyor?"
        time="10:23"
        unread={true}
      />
      <MessageItem
        name="Koç Mehmet"
        avatar="/placeholder.svg?height=40&width=40"
        message="Egzersiz planınızı güncelledim, kontrol edebilirsiniz."
        time="Dün"
        unread={false}
      />
      <MessageItem
        name="İçinde Ne Var? Asistan"
        avatar="/placeholder.svg?height=40&width=40"
        message="Haftalık besin analiz raporunuz hazır!"
        time="Paz"
        unread={false}
      />
    </div>
  )
}

function MessageItem({
  name,
  avatar,
  message,
  time,
  unread,
}: {
  name: string
  avatar: string
  message: string
  time: string
  unread: boolean
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center p-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-gray-500">{time}</div>
          </div>
          <div className="text-xs text-gray-600 truncate">{message}</div>
        </div>
        {unread && <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>}
      </div>
    </Card>
  )
}
