import { MobileAppLayout } from "@/components/mobile-app-layout"
import { ContactPage } from "@/components/contact-page"

export default function Iletisim() {
  return (
    <MobileAppLayout currentPage="contact">
      <ContactPage />
    </MobileAppLayout>
  )
}
