import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ProfileProvider } from "./contexts/profile-contexts"
import { ProfileModal } from "@/components/profile-modal"
import { CallListener } from "../components/call-listner"

export const metadata: Metadata = {
  title: "Communication Management System",
  description: "Manage communications, profiles, and company details",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ProfileProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-6">{children}</main>
            <ProfileModal />
            <CallListener />
          </div>
        </ProfileProvider>
      </body>
    </html>
  )
}
