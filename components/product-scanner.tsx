"use client"

import { useState } from "react"
import { QrScanner } from "@/components/qr-scanner"
import { ProductInfo } from "@/components/product-info"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, X } from "lucide-react"

// Mock database of products
const productDatabase = {
  "1234567890": {
    name: "Organik Elma",
    brand: "Doğal Bahçe",
    price: "12.99 TL",
    weight: "1 kg",
    nutritionalValues: {
      calories: "52 kcal",
      protein: "0.3g",
      carbs: "14g",
      fat: "0.2g",
      fiber: "2.4g",
    },
    origin: "Türkiye",
    expiryDate: "10.06.2025",
  },
  "0987654321": {
    name: "Tam Buğday Ekmeği",
    brand: "Sağlıklı Fırın",
    price: "15.50 TL",
    weight: "500g",
    nutritionalValues: {
      calories: "247 kcal",
      protein: "13g",
      carbs: "41g",
      fat: "3.2g",
      fiber: "7g",
    },
    origin: "Türkiye",
    expiryDate: "25.05.2025",
  },
  "5678901234": {
    name: "Protein Yoğurt",
    brand: "Süt Dünyası",
    price: "22.75 TL",
    weight: "400g",
    nutritionalValues: {
      calories: "130 kcal",
      protein: "18g",
      carbs: "7g",
      fat: "4.5g",
      fiber: "0g",
    },
    origin: "Türkiye",
    expiryDate: "01.06.2025",
  },
}

export function ProductScanner() {
  const [scanning, setScanning] = useState(false)
  const [productData, setProductData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = (data: string | null) => {
    if (data) {
      // In a real app, you would make an API call to fetch product data
      // For this demo, we're using a mock database
      const productInfo = productDatabase[data]

      if (productInfo) {
        setProductData(productInfo)
        setError(null)
      } else {
        setError("Ürün bulunamadı. Lütfen geçerli bir QR kod tarayın.")
        setProductData(null)
      }

      setScanning(false)
    }
  }

  const handleError = (err: Error) => {
    console.error(err)
    setError("QR kod tarama sırasında bir hata oluştu. Lütfen tekrar deneyin.")
    setScanning(false)
  }

  const startScanning = () => {
    setScanning(true)
    setError(null)
  }

  const stopScanning = () => {
    setScanning(false)
  }

  return (
    <div className="p-4">
      {!scanning && !productData && (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="bg-secondary inline-block p-4 rounded-full mb-4">
              <Camera className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Ürün Bilgilerini Görüntüle</h2>
            <p className="text-gray-600 mt-2">Ürünün QR kodunu tarayarak besin değerlerini ve detaylarını öğrenin</p>
          </div>
          <Button onClick={startScanning} className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full">
            QR Kodu Tara
          </Button>
        </div>
      )}

      {scanning && (
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Button variant="outline" size="icon" className="bg-white rounded-full" onClick={stopScanning}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-4 text-center border-b">
              <h3 className="font-medium">QR Kodu Tarayın</h3>
            </div>
            <QrScanner onScan={handleScan} onError={handleError} />
          </div>
        </div>
      )}

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mt-4">{error}</div>}

      {productData && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{productData.name}</h2>
            <Button variant="outline" size="sm" onClick={() => setProductData(null)} className="text-gray-500">
              Kapat
            </Button>
          </div>

          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="nutrition" className="text-sm">
                Besin Değerleri
              </TabsTrigger>
              <TabsTrigger value="details" className="text-sm">
                Detaylar
              </TabsTrigger>
              <TabsTrigger value="similar" className="text-sm">
                Benzer Ürünler
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nutrition">
              <Card className="border-0 shadow-none">
                <ProductInfo product={productData} />
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card className="border-0 shadow-none p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-sm font-medium">Marka:</div>
                  <div className="text-sm">{productData.brand}</div>

                  <div className="text-sm font-medium">Fiyat:</div>
                  <div className="text-sm">{productData.price}</div>

                  <div className="text-sm font-medium">Ağırlık:</div>
                  <div className="text-sm">{productData.weight}</div>

                  <div className="text-sm font-medium">Menşei:</div>
                  <div className="text-sm">{productData.origin}</div>

                  <div className="text-sm font-medium">Son Kullanma Tarihi:</div>
                  <div className="text-sm">{productData.expiryDate}</div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="similar">
              <Card className="border-0 shadow-none p-4">
                <p className="text-gray-500 text-center py-8">Benzer ürünler bulunamadı.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
