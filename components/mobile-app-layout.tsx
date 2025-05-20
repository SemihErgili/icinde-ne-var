import type { ReactNode } from "react"
import Link from "next/link"
import { Home, BarChart2, Camera, User, Search, Github, Mail } from "lucide-react"

interface MobileAppLayoutProps {
  children: ReactNode
  currentPage?: "home" | "reports" | "scan" | "profile" | "contact"
  hideNav?: boolean
}

export function MobileAppLayout({ children, currentPage, hideNav }: MobileAppLayoutProps) {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header */}
      {!hideNav && (
        <header className="bg-primary text-white py-2 px-3 flex items-center justify-between shadow-md">
          <div className="text-base font-semibold">İçinde Ne Var?</div>
          <div className="flex items-center space-x-2">
            <div className="text-xs">Cuma, Oca 18</div>
            <div className="bg-white/20 rounded-full p-1">
              <Search className="h-3.5 w-3.5" />
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${!hideNav ? "bg-gray-50" : "bg-white"}`}>{children}</main>

      {/* Bottom Navigation */}
      {!hideNav && (
        <>
          <nav className="bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around py-1.5">
              <NavItem
                href="/ana-sayfa"
                icon={<Home className="h-5 w-5" />}
                label="Ana Sayfa"
                active={currentPage === "home"}
              />
              <NavItem
                href="/raporlar"
                icon={<BarChart2 className="h-5 w-5" />}
                label="Raporlar"
                active={currentPage === "reports"}
              />
              <NavItem
                href="/tara"
                icon={<Camera className="h-5 w-5" />}
                label="Tara"
                active={currentPage === "scan"}
              />
              <NavItem
                href="/profil"
                icon={<User className="h-5 w-5" />}
                label="Profil"
                active={currentPage === "profile"}
              />
              <NavItem
                href="/iletisim"
                icon={<Mail className="h-5 w-5" />}
                label="İletişim"
                active={currentPage === "contact"}
              />
            </div>
          </nav>

          {/* Footer */}
          <div className="bg-white border-t border-gray-100 py-1 px-3 text-center">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <span>Development by SEMİH ERGİLİ</span>
              <Link
                href="https://github.com/SemihErgili"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <Github className="h-3.5 w-3.5 mr-1" />
                GitHub
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface NavItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  href: string
}

function NavItem({ icon, label, active, href }: NavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center">
      <div className={`p-1 ${active ? "text-primary" : "text-gray-500"}`}>{icon}</div>
      <span className={`text-xs ${active ? "text-primary" : "text-gray-500"}`}>{label}</span>
    </Link>
  )
}
