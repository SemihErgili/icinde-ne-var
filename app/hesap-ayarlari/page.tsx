import { MobileAppLayout } from "@/components/mobile-app-layout"
import { AccountSettingsPage } from "@/components/account-settings-page"

export default function HesapAyarlari() {
  return (
    <MobileAppLayout currentPage="profile">
      <AccountSettingsPage />
    </MobileAppLayout>
  )
}
