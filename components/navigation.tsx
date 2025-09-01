"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, Mic } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/communication-log", label: "Communication Log" },
    // { href: "/profile", label: "Profile" },
    // { href: "/company-details", label: "Company Details" },
    { href: "/knowledge-bases", label: "Knowledge Bases" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-500 text-white text-sm">A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Good Morning, Rory</p>
            <p className="text-xs text-gray-500">Simplify how you manage calls and messages</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === item.href ? "text-blue-600" : "text-gray-600",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search" className="bg-transparent text-sm outline-none w-32" />
            <Mic className="h-4 w-4 text-gray-400" />
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-gray-300 text-xs">A</AvatarFallback>
            </Avatar>
            <span className="text-sm">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}
