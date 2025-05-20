"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, Github, Phone, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call to send email
    setTimeout(() => {
      // In a real app, you would send the email via an API
      console.log("Sending email:", formData)
      setLoading(false)
      setSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div className="p-3">
      <h1 className="text-xl font-bold mb-4">İletişim</h1>

      {success ? (
        <Card className="mb-4 border-green-200 bg-green-50">
          <CardContent className="pt-6 pb-4 flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <h2 className="text-lg font-medium text-green-800">Mesajınız Gönderildi!</h2>
            <p className="text-sm text-green-600 mt-1">En kısa sürede size geri dönüş yapacağız.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Bize Ulaşın</CardTitle>
            <CardDescription>Sorularınız veya önerileriniz için mesaj gönderin</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Konu</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Mesajınızın konusu"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Mesajınızı buraya yazın..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Gönderiliyor..." : "Mesaj Gönder"} {!loading && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">İletişim Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium">E-posta</div>
              <a href="mailto:info@icindenevaryok.com" className="text-sm text-gray-600 hover:text-primary">
                info@icindenevaryok.com
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Telefon</div>
              <a href="tel:+902121234567" className="text-sm text-gray-600 hover:text-primary">
                +90 (212) 123 45 67
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Adres</div>
              <div className="text-sm text-gray-600">Teknoloji Mahallesi, Yazılım Caddesi No:42, İstanbul</div>
            </div>
          </div>
          <div className="flex items-start">
            <Github className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium">GitHub</div>
              <Link
                href="https://github.com/SemihErgili"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-primary"
              >
                github.com/SemihErgili
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <div className="text-xs text-gray-500">Development by SEMİH ERGİLİ</div>
        <Link
          href="https://github.com/SemihErgili"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-gray-600 hover:text-gray-900 mt-1"
        >
          <Github className="h-4 w-4 mr-1" />
          github.com/SemihErgili
        </Link>
      </div>
    </div>
  )
}
