"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  ShieldCheck,
  MessageSquare,
  BarChart,
  LogOut,
  Upload,
  Globe,
  Tag,
  Wrench,
  Warehouse,
  FileText,
  Mail,
  CreditCard,
  FolderOpen,
  TrendingUp,
  Headphones,
  Truck,
  ClipboardList,
  Bell,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Main",
    items: [{ name: "Dashboard", icon: LayoutDashboard, href: "/admin" }],
  },
  {
    title: "CRM",
    items: [
      { name: "CRM Dashboard", icon: BarChart, href: "/admin/crm" },
      { name: "Orders CRM", icon: ClipboardList, href: "/admin/crm/orders" },
      { name: "Sales Team", icon: TrendingUp, href: "/admin/crm/sales" },
      { name: "Support Team", icon: Headphones, href: "/admin/crm/support" },
      { name: "Buying Team", icon: Truck, href: "/admin/crm/buying" },
    ],
  },
  {
    title: "Product Management",
    items: [
      { name: "All Products", icon: Package, href: "/admin/products" },
      { name: "Add New Product", icon: Package, href: "/admin/products/new" },
      { name: "Bulk Upload", icon: Upload, href: "/admin/bulk-upload" },
      { name: "Upload by Brand", icon: Tag, href: "/admin/upload-by-brand" },
      { name: "Brands Portal", icon: FolderOpen, href: "/admin/brands" },
    ],
  },
  {
    title: "Sales & Orders",
    items: [
      { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
      { name: "Customers", icon: Users, href: "/admin/customers" },
      { name: "Reviews", icon: MessageSquare, href: "/admin/reviews" },
    ],
  },
  {
    title: "Finance & Disputes",
    items: [
      { name: "Chargebacks", icon: Shield, href: "/admin/chargebacks" },
      { name: "Refunds", icon: CreditCard, href: "/admin/refunds" },
      { name: "Red Flags", icon: AlertTriangle, href: "/admin/red-flags" },
    ],
  },
  {
    title: "Partners",
    items: [
      { name: "Mechanics", icon: Wrench, href: "/admin/partners/mechanics" },
      { name: "Junk Yards", icon: Warehouse, href: "/admin/partners/junkyards" },
    ],
  },
  {
    title: "Website Content",
    items: [
      { name: "Pages", icon: Globe, href: "/admin/content" },
      { name: "Footer", icon: FileText, href: "/admin/footer" },
      { name: "AI Chatbot", icon: MessageSquare, href: "/admin/chatbot" },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [{ name: "Analytics", icon: BarChart, href: "/admin/analytics" }],
  },
  {
    title: "System Settings",
    items: [
      { name: "Users", icon: ShieldCheck, href: "/admin/users" },
      { name: "Notifications", icon: Bell, href: "/admin/notifications" },
      { name: "Email", icon: Mail, href: "/admin/emails" },
      { name: "Payments", icon: CreditCard, href: "/admin/payments" },
      { name: "General Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full bg-neutral-900 border-r border-white/10 flex flex-col fixed md:static w-64 z-50">
      <div className="p-6 border-b border-white/10 bg-gradient-to-br from-red-600/20 to-orange-600/10">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-1.5 shadow-lg shadow-red-600/20">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wider text-white">ADMIN</span>
        </div>
        <div className="text-xs text-white/40 pl-11">Control Panel</div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-6 px-3">
          {menuItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-600/20"
                        : pathname.startsWith(item.href) && item.href !== "/admin"
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 bg-neutral-900">
        <div className="flex items-center gap-3 mb-3 p-2 bg-white/5 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-white truncate">Admin User</div>
            <div className="text-xs text-white/50 truncate">Super Admin</div>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
