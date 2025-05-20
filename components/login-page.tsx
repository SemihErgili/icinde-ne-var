"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Github } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would validate credentials with your backend
      // If rememberMe is true, you would store the token in localStorage
      // Otherwise, you would store it in sessionStorage
      if (rememberMe) {
        // Store in localStorage for persistent login
        localStorage.setItem("isLoggedIn", "true")
      } else {
        // Store in sessionStorage for session-based login
        sessionStorage.setItem("isLoggedIn", "true")
      }

      setLoading(false)
      router.push("/ana-sayfa")
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-block bg-primary rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
              <path d="m7 16.5-4.74-2.85" />
              <path d="m7 16.5 5-3" />
              <path d="M7 16.5V21" />
              <path d="M21.03 12.92A2 2 0 0 1 22 14.63v3.24a2 2 0 0 1-.97 1.71l-3 1.8a2 2 0 0 1-2.06 0L12 19v-5.5l5-3 4.03 2.42Z" />
              <path d="m17 16.5 4.74-2.85" />
              <path d="m17 16.5-5-3" />
              <path d="M17 16.5V21" />
              <path d="M8.96 6.58A2 2 0 0 0 12 6.05l1.03-.62a2 2 0 0 1 2.01-.01l3 1.8A2 2 0 0 1 19 9.33V12l-7-4-3.96 2.37A2 2 0 0 0 7 12.18V12l1.96-5.42Z" />
              <path d="m12 6-4.74 2.85" />
              <path d="m12 6 4.74 2.85" />
              <path d="M12 6v4.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">İçinde Ne Var?</h1>
          <p className="text-sm text-gray-500 mt-1">Sağlıklı beslenmenin akıllı yolu</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Giriş Yap</CardTitle>
            <CardDescription>Hesabınıza giriş yaparak devam edin</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Şifre</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Şifremi Unuttum
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                  Beni Hatırla
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Hesabınız yok mu?{" "}
                <Link href="/kayit" className="text-primary hover:underline font-medium">
                  Kayıt Ol
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

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
    </div>
  )
}
