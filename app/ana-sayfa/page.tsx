import { MobileAppLayout } from "@/components/mobile-app-layout"
import { HomePage } from "@/components/home-page"

export default function AnaSayfa() {
  return (
    <MobileAppLayout currentPage="home">
      <HomePage />
    </MobileAppLayout>
  )
}
