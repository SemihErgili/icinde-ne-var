import { MobileAppLayout } from "@/components/mobile-app-layout"
import { ScanPage } from "@/components/scan-page"

export default function Tara() {
  return (
    <MobileAppLayout currentPage="scan">
      <ScanPage />
    </MobileAppLayout>
  )
}
