import { MobileAppLayout } from "@/components/mobile-app-layout"
import { OnboardingPage } from "@/components/onboarding-page"

export default function Onboarding() {
  return (
    <MobileAppLayout hideNav>
      <OnboardingPage />
    </MobileAppLayout>
  )
}
