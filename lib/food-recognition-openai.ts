// Bu dosya, OpenAI Vision API kullanarak yemek tanıma için alternatif bir yaklaşım sunar
// Fal AI çalışmazsa, bu dosyayı kullanabilirsiniz

// API anahtarı güvenlik nedeniyle çevresel değişken olarak saklanmalıdır
const OPENAI_API_KEY = "your-openai-api-key" // Gerçek bir OpenAI API anahtarı ile değiştirin

export interface FoodRecognitionResult {
  name: string
  confidence: number
  nutritionalValues: {
    calories: string
    protein: string
    carbs: string
    fat: string
    fiber: string
  }
  ingredients: string[]
}

export async function recognizeFoodWithOpenAI(imageData: string | Blob): Promise<FoodRecognitionResult> {
  try {
    // Görüntü verilerini hazırla
    let base64Image = ""

    if (typeof imageData === "string" && imageData.startsWith("data:image")) {
      // Base64 görüntü verisi - data:image/jpeg;base64, kısmını kaldır
      base64Image = imageData.split(",")[1]
    } else if (typeof imageData === "string" && imageData.startsWith("blob:")) {
      // Blob URL
      const response = await fetch(imageData)
      const blob = await response.blob()
      base64Image = await blobToBase64(blob)
    } else if (imageData instanceof Blob) {
      // Doğrudan blob
      base64Image = await blobToBase64(imageData)
    } else {
      throw new Error("Desteklenmeyen görüntü formatı")
    }

    // OpenAI API isteği gönder
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content:
              "Sen bir yemek tanıma ve besin değeri analiz uzmanısın. Verilen yemek fotoğrafını analiz et ve yemeğin adını, besin değerlerini ve içeriklerini belirle. Yanıtını JSON formatında ver.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: 'Bu yemeği tanı ve besin değerlerini analiz et. Yanıtını şu JSON formatında ver: {"name": "Yemek Adı", "confidence": 85, "nutritionalValues": {"calories": "320 kcal", "protein": "28g", "carbs": "12g", "fat": "18g", "fiber": "4g"}, "ingredients": ["Malzeme1", "Malzeme2"]}',
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 800,
      }),
    })

    if (!response.ok) {
      throw new Error(`API hatası: ${response.status}`)
    }

    const data = await response.json()

    // API yanıtını işle
    try {
      const content = data.choices[0].message.content
      const parsedResult = JSON.parse(content)

      return {
        name: parsedResult.name || "Bilinmeyen Yemek",
        confidence: parsedResult.confidence || 70,
        nutritionalValues: {
          calories: parsedResult.nutritionalValues?.calories || "0 kcal",
          protein: parsedResult.nutritionalValues?.protein || "0g",
          carbs: parsedResult.nutritionalValues?.carbs || "0g",
          fat: parsedResult.nutritionalValues?.fat || "0g",
          fiber: parsedResult.nutritionalValues?.fiber || "0g",
        },
        ingredients: parsedResult.ingredients || [],
      }
    } catch (error) {
      console.error("JSON ayrıştırma hatası:", error)
      // Hata durumunda varsayılan değerler döndür
      return getFallbackFoodData()
    }
  } catch (error) {
    console.error("Yemek tanıma hatası:", error)
    // Hata durumunda varsayılan değerler döndür
    return getFallbackFoodData()
  }
}

// Blob'u base64'e dönüştür
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      // data:image/jpeg;base64, kısmını kaldır
      const base64 = base64String.split(",")[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Hata durumunda kullanılacak varsayılan veri
function getFallbackFoodData(): FoodRecognitionResult {
  return {
    name: "Tanınamayan Yemek",
    confidence: 0,
    nutritionalValues: {
      calories: "0 kcal",
      protein: "0g",
      carbs: "0g",
      fat: "0g",
      fiber: "0g",
    },
    ingredients: ["Tanımlanamadı"],
  }
}
