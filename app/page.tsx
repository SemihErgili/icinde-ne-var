import { redirect } from "next/navigation"

export default function Home() {
  // Gerçek uygulamada, oturum kontrolü yapılır
  // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendirilir
  redirect("/giris")
  return null
}
