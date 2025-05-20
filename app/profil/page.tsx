import { MobileAppLayout } from "@/components/mobile-app-layout"
import { ProfilePage } from "@/components/profile-page"

export default function Profil() {
  return (
    <MobileAppLayout currentPage="profile">
      <ProfilePage />
    </MobileAppLayout>
  )
}
