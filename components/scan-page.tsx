"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, QrCode, X, Check, Loader2, ImageIcon, AlertTriangle } from "lucide-react"
import { ProductInfo } from "@/components/product-info"
import { recognizeFoodWithAI, type FoodRecognitionResult } from "@/lib/food-recognition"

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
}

export function ScanPage() {
  const [activeTab, setActiveTab] = useState("camera")
  const [scanning, setScanning] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [productData, setProductData] = useState<any>(null)
  const [foodData, setFoodData] = useState<FoodRecognitionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSimulated, setIsSimulated] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const handleQrScan = (data: string | null) => {
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

  const resetResults = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview)
    }
    setProductData(null)
    setFoodData(null)
    setImagePreview(null)
    setIsSimulated(false)
    stopCamera()
  }

  const startCamera = async () => {
    try {
      setCameraActive(true)
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Kamera erişim hatası:", err)
      setError("Kameraya erişilemedi. Lütfen kamera izinlerini kontrol edin.")
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const captureImage = () => {
    if (!cameraActive) {
      startCamera()
      return
    }

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Video boyutlarını al
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Videodan görüntüyü canvas'a çiz
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Canvas'tan veriyi al
        const imageData = canvas.toDataURL("image/jpeg")
        setImagePreview(imageData)

        // Kamerayı durdur
        stopCamera()

        // Görüntüyü AI ile işle
        processImageWithAI(imageData)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    // Process the image with AI
    processImageWithAI(file)
  }

  const processImageWithAI = async (imageData: string | Blob) => {
    setRecognizing(true)
    setError(null)
    setIsSimulated(false)

    try {
      // Gerçek API çağrısı
      const result = await recognizeFoodWithAI(imageData)
      setFoodData(result)

      // API hatası durumunda simüle edilmiş veri döndürüldüğünde
      // Bu durumu kullanıcıya bildirmek için bir bayrak ayarla
      setIsSimulated(true)
    } catch (err) {
      console.error("AI işleme hatası:", err)
      setError("Yemek tanıma sırasında bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setRecognizing(false)
    }
  }

  const startScanning = () => {
    setScanning(true)
    setError(null)
  }

  const stopScanning = () => {
    setScanning(false)
  }

  return (
    <div className="p-3">
      <Tabs
        defaultValue="camera"
        className="w-full"
        onValueChange={(value) => {
          setActiveTab(value)
          resetResults()
        }}
      >
        <TabsList className="grid w-full grid-cols-2 bg-secondary h-8 mb-2">
          <TabsTrigger value="camera" className="text-xs h-8">
            Kamera
          </TabsTrigger>
          <TabsTrigger value="qrcode" className="text-xs h-8">
            QR Kod
          </TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="mt-0">
          {!recognizing && !foodData && (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
                  {cameraActive ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
                  ) : imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Food preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-300" />
                    </div>
                  )}

                  {/* Gizli canvas elementi */}
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Button
                      onClick={captureImage}
                      className={`${cameraActive ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-600"} text-xs h-9`}
                    >
                      <Camera className="h-3.5 w-3.5 mr-1.5" />
                      {cameraActive ? "Fotoğraf Çek" : "Kamera Aç"}
                    </Button>
                    <label htmlFor="food-image-upload" className="cursor-pointer">
                      <div className="bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-md flex items-center justify-center h-9 text-xs font-medium">
                        <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                        Galeriden Seç
                      </div>
                    </label>
                    <input
                      id="food-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                    />
                  </div>
                  <div className="text-center text-xs text-gray-500">
                    Yemeğin fotoğrafını çekerek veya galeriden seçerek besin değerlerini öğrenin
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {recognizing && (
            <Card className="overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                <div className="text-sm font-medium">Yemek Tanınıyor...</div>
                <div className="text-xs text-gray-500 mt-1">AI modelimiz yemeği analiz ediyor</div>
              </CardContent>
            </Card>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mt-2 text-sm">
              <div className="font-medium mb-1">Hata</div>
              <div className="text-xs">{error}</div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-xs h-7 border-red-200 text-red-700 hover:bg-red-50"
                onClick={() => setError(null)}
              >
                Tekrar Dene
              </Button>
            </div>
          )}

          {foodData && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium">{foodData.name}</h2>
                <Button variant="outline" size="sm" onClick={resetResults} className="h-7 text-xs">
                  <X className="h-3.5 w-3.5 mr-1" /> Kapat
                </Button>
              </div>

              {isSimulated && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-2 rounded-md text-xs flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Demo Modu</div>
                    <p className="mt-0.5">
                      API bağlantısı kurulamadığı için simüle edilmiş veriler gösteriliyor. Gerçek bir uygulamada, bu
                      veriler AI tarafından analiz edilecektir.
                    </p>
                  </div>
                </div>
              )}

              <Card className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="text-sm">%{foodData.confidence} doğruluk oranıyla tanındı</div>
                  </div>

                  <div className="grid grid-cols-4 text-center mb-4 bg-gray-50 rounded-lg p-2">
                    <NutritionSummary label="Yağ" value={foodData.nutritionalValues.fat} />
                    <NutritionSummary label="Karb" value={foodData.nutritionalValues.carbs} />
                    <NutritionSummary label="Prot" value={foodData.nutritionalValues.protein} />
                    <NutritionSummary label="Kalori" value={foodData.nutritionalValues.calories} />
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-medium mb-2">İçindekiler:</div>
                    <div className="flex flex-wrap gap-1">
                      {foodData.ingredients.map((ingredient: string, index: number) => (
                        <span key={index} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button className="w-full text-xs h-8">Öğünlerime Ekle</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="qrcode" className="mt-0">
          {!scanning && !productData && (
            <Card className="overflow-hidden">
              <CardContent className="p-4 text-center">
                <div className="mb-4">
                  <div className="bg-secondary inline-block p-3 rounded-full mb-3">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium">QR Kod Tarayıcı</h3>
                  <p className="text-xs text-gray-500 mt-1">Ürünün QR kodunu tarayarak besin değerlerini öğrenin</p>
                </div>
                <Button onClick={startScanning} className="bg-primary hover:bg-primary-600 text-xs h-8">
                  QR Kodu Tara
                </Button>
              </CardContent>
            </Card>
          )}

          {scanning && (
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <Button variant="outline" size="icon" className="bg-white rounded-full h-7 w-7" onClick={stopScanning}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-2 text-center border-b text-xs font-medium">QR Kodu Tarayın</div>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center">
                      <div className="animate-pulse text-xs text-gray-400">Kamera başlatılıyor...</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded-md mt-2 text-xs">{error}</div>
          )}

          {productData && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-medium">{productData.name}</h2>
                <Button variant="outline" size="sm" onClick={resetResults} className="h-7 text-xs">
                  Kapat
                </Button>
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-3">
                  <ProductInfo product={productData} />
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface NutritionSummaryProps {
  label: string
  value: string
}

function NutritionSummary({ label, value }: NutritionSummaryProps) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xs font-medium">{value}</div>
    </div>
  )
}
