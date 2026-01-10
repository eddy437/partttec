import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ToastProvider } from "@/lib/toast"
import { FloatingQuoteWidget } from "@/components/floating-quote-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ALL USED AUTO PARTS WORLD (AUW) - Find Quality Used Auto Parts Instantly",
  description:
    "Your trusted partner for automotive service & solutions. Instant search across thousands of used engines, transmissions, and more.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            {children}
            <FloatingQuoteWidget />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
