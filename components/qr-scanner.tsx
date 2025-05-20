"use client"

import { useEffect, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QrScannerProps {
  onScan: (data: string) => void
  onError: (error: Error) => void
}

export function QrScanner({ onScan, onError }: QrScannerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const qrScannerId = "qr-reader"
    const qrContainer = document.getElementById(qrScannerId)

    if (!qrContainer) return

    const html5QrCode = new Html5Qrcode(qrScannerId)
    const config = { fps: 10, qrbox: { width: 250, height: 250 } }

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onScan(decodedText)
          html5QrCode.stop().catch((error) => console.error(error))
        },
        (errorMessage) => {
          if (errorMessage instanceof Error) {
            onError(errorMessage)
          } else {
            onError(new Error(errorMessage))
          }
        },
      )
      .catch((err) => {
        onError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      html5QrCode.stop().catch((err) => console.error(err))
    }
  }, [onScan, onError])

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square max-w-md mx-auto overflow-hidden">
        <div id="qr-reader" className="w-full h-full"></div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-gray-500 p-4">Ürünün arkasındaki QR kodu kameranın önüne getirin</p>
    </div>
  )
}
