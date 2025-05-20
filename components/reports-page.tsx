"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Calendar, ArrowUp, ArrowDown, Github } from "lucide-react"
import Link from "next/link"

export function ReportsPage() {
  const [dateRange, setDateRange] = useState("week")
  const [currentPeriod, setCurrentPeriod] = useState("Bu Hafta")

  const handlePrevPeriod = () => {
    setCurrentPeriod((prev) => (prev === "Bu Hafta" ? "Geçen Hafta" : "Bu Hafta"))
  }

  const handleNextPeriod = () => {
    setCurrentPeriod((prev) => (prev === "Bu Hafta" ? "Geçen Hafta" : "Bu Hafta"))
  }

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Raporlar</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue placeholder="Zaman Aralığı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Haftalık</SelectItem>
            <SelectItem value="month">Aylık</SelectItem>
            <SelectItem value="year">Yıllık</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevPeriod}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center text-sm font-medium">
          <Calendar className="h-4 w-4 mr-2" />
          {currentPeriod}
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextPeriod}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-9 mb-3">
          <TabsTrigger value="overview" className="text-xs">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="text-xs">
            Besin Değerleri
          </TabsTrigger>
          <TabsTrigger value="weight" className="text-xs">
            Kilo Takibi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-3">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-3">
          <NutritionTab />
        </TabsContent>

        <TabsContent value="weight" className="space-y-3">
          <WeightTab />
        </TabsContent>
      </Tabs>

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

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Kalori Alımı"
          value="1,842"
          unit="kcal"
          change={-5.2}
          changeText="geçen haftaya göre"
          color="green"
        />
        <StatCard
          title="Protein Alımı"
          value="98"
          unit="g"
          change={12.5}
          changeText="geçen haftaya göre"
          color="blue"
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Günlük Kalori Alımı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <div className="flex h-full items-end">
              {[65, 80, 95, 75, 85, 90, 70].map((value, index) => (
                <div key={index} className="flex-1 mx-1">
                  <div
                    className="bg-primary rounded-t-sm w-full"
                    style={{ height: `${value}%`, maxHeight: "100%" }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <div>Pzt</div>
              <div>Sal</div>
              <div>Çar</div>
              <div>Per</div>
              <div>Cum</div>
              <div>Cmt</div>
              <div>Paz</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Makro Besin Dağılımı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="188.4"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="125.6"
                  strokeLinecap="round"
                  transform="rotate(37.5 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="188.4"
                  strokeLinecap="round"
                  transform="rotate(180 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-xs text-gray-500">Toplam</div>
                <div className="text-lg font-bold">1,842</div>
                <div className="text-xs text-gray-500">kcal</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-sm mr-2"></div>
                <span className="text-sm">Protein</span>
              </div>
              <div className="text-sm font-medium">98g (25%)</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                <span className="text-sm">Karbonhidrat</span>
              </div>
              <div className="text-sm font-medium">210g (45%)</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-2"></div>
                <span className="text-sm">Yağ</span>
              </div>
              <div className="text-sm font-medium">62g (30%)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Öğün Dağılımı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden flex">
                <div className="bg-yellow-400 h-full" style={{ width: "25%" }}></div>
                <div className="bg-blue-400 h-full" style={{ width: "35%" }}></div>
                <div className="bg-orange-400 h-full" style={{ width: "30%" }}></div>
                <div className="bg-purple-400 h-full" style={{ width: "10%" }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-sm mr-2"></div>
                <span className="text-xs">Kahvaltı (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-sm mr-2"></div>
                <span className="text-xs">Öğle (35%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-sm mr-2"></div>
                <span className="text-xs">Akşam (30%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-400 rounded-sm mr-2"></div>
                <span className="text-xs">Atıştırmalık (10%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function NutritionTab() {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Besin Değerleri Özeti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <NutrientProgress name="Protein" current={98} target={120} unit="g" color="bg-primary" />
            <NutrientProgress name="Karbonhidrat" current={210} target={250} unit="g" color="bg-blue-500" />
            <NutrientProgress name="Yağ" current={62} target={70} unit="g" color="bg-yellow-500" />
            <NutrientProgress name="Lif" current={18} target={30} unit="g" color="bg-green-600" />
            <NutrientProgress name="Şeker" current={45} target={50} unit="g" color="bg-red-500" />
            <NutrientProgress name="Sodyum" current={1850} target={2300} unit="mg" color="bg-orange-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Vitamin ve Mineraller</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <NutrientCircle name="Vitamin A" percentage={65} color="#22c55e" />
            <NutrientCircle name="Vitamin C" percentage={85} color="#3b82f6" />
            <NutrientCircle name="Kalsiyum" percentage={45} color="#eab308" />
            <NutrientCircle name="Demir" percentage={70} color="#ef4444" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Su Tüketimi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-3">
            <div className="relative w-16 h-24 bg-blue-100 rounded-full overflow-hidden mr-4">
              <div
                className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500 ease-in-out"
                style={{ height: "65%" }}
              ></div>
            </div>
            <div>
              <div className="text-2xl font-bold">1.6 / 2.5</div>
              <div className="text-sm text-gray-500">litre</div>
              <div className="text-xs text-gray-500 mt-1">Günlük hedefin %65'i tamamlandı</div>
            </div>
          </div>
          <div className="h-12 w-full">
            <div className="flex h-full items-end">
              {[60, 75, 85, 55, 65, 90, 65].map((value, index) => (
                <div key={index} className="flex-1 mx-0.5">
                  <div
                    className="bg-blue-500 rounded-t-sm w-full"
                    style={{ height: `${value}%`, maxHeight: "100%" }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <div>Pzt</div>
              <div>Sal</div>
              <div>Çar</div>
              <div>Per</div>
              <div>Cum</div>
              <div>Cmt</div>
              <div>Paz</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function WeightTab() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Mevcut Kilo" value="66" unit="kg" change={-1.2} changeText="son 30 günde" color="green" />
        <StatCard
          title="Hedef Kilo"
          value="62"
          unit="kg"
          change={4}
          changeText="kalan"
          color="blue"
          showArrow={false}
        />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Kilo Değişimi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <div className="relative h-full w-full">
              <svg viewBox="0 0 300 150" className="w-full h-full">
                <path
                  d="M0,75 C20,70 40,68 60,65 C80,62 100,60 120,58 C140,56 160,55 180,52 C200,49 220,45 240,42 C260,39 280,35 300,30"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                />
                <circle cx="0" cy="75" r="3" fill="#22c55e" />
                <circle cx="60" cy="65" r="3" fill="#22c55e" />
                <circle cx="120" cy="58" r="3" fill="#22c55e" />
                <circle cx="180" cy="52" r="3" fill="#22c55e" />
                <circle cx="240" cy="42" r="3" fill="#22c55e" />
                <circle cx="300" cy="30" r="3" fill="#22c55e" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200"></div>
              <div className="absolute top-0 left-0 right-0 border-b border-gray-200"></div>
              <div className="absolute top-1/2 left-0 right-0 border-b border-gray-200"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <div>1 Nis</div>
              <div>8 Nis</div>
              <div>15 Nis</div>
              <div>22 Nis</div>
              <div>29 Nis</div>
              <div>6 May</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Vücut Kompozisyonu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="175.84"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="200.96"
                  strokeLinecap="round"
                  transform="rotate(30 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-xs text-gray-500">Toplam</div>
                <div className="text-lg font-bold">66</div>
                <div className="text-xs text-gray-500">kg</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-sm mr-2"></div>
                <span className="text-sm">Kas Kütlesi</span>
              </div>
              <div className="text-sm font-medium">30 kg (45%)</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                <span className="text-sm">Yağ Oranı</span>
              </div>
              <div className="text-sm font-medium">13.2 kg (20%)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Hedef İlerleme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Kilo Hedefi</div>
                <div className="text-sm">66 kg → 62 kg</div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <div className="text-xs text-gray-500">%25 tamamlandı</div>
                <div className="text-xs text-gray-500">4 kg kaldı</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium">Yağ Oranı Hedefi</div>
                <div className="text-sm">%20 → %15</div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <div className="text-xs text-gray-500">%40 tamamlandı</div>
                <div className="text-xs text-gray-500">%5 kaldı</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function StatCard({ title, value, unit, change, changeText, color, showArrow = true }) {
  const isPositive = change > 0
  const isNegative = change < 0
  const changeColor = color === "green" ? (isNegative ? "text-green-600" : "text-red-500") : "text-blue-600"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold">
          {value}
          <span className="text-sm font-normal ml-1">{unit}</span>
        </div>
        <div className={`text-xs flex items-center mt-1 ${changeColor}`}>
          {showArrow && isPositive && <ArrowUp className="h-3 w-3 mr-1" />}
          {showArrow && isNegative && <ArrowDown className="h-3 w-3 mr-1" />}
          {showArrow ? Math.abs(change) : change} {unit} {changeText}
        </div>
      </CardContent>
    </Card>
  )
}

function NutrientProgress({ name, current, target, unit, color }) {
  const percentage = Math.min(100, Math.round((current / target) * 100))

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-sm">{name}</div>
        <div className="text-sm">
          {current} / {target} {unit}
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{percentage}% tamamlandı</div>
    </div>
  )
}

function NutrientCircle({ name, percentage, color }) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="55" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#333">
            {percentage}%
          </text>
        </svg>
      </div>
      <div className="text-xs text-center mt-1">{name}</div>
    </div>
  )
}
