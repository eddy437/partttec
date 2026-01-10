import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      <div className="hidden md:block w-64 shrink-0">
        <AdminSidebar />
      </div>
      <main className="flex-1 overflow-x-hidden min-h-screen">{children}</main>
    </div>
  )
}
