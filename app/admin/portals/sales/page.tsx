import { ShoppingCart, Users, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SalesPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Sales Management Portal</h1>
            <p className="text-white/60">Manage orders, customers, and sales operations</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-white mt-1">8,456</p>
                </div>
                <ShoppingCart className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Customers</p>
                  <p className="text-3xl font-bold text-green-500 mt-1">12,834</p>
                </div>
                <Users className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Revenue</p>
                  <p className="text-3xl font-bold text-emerald-500 mt-1">$2.4M</p>
                </div>
                <DollarSign className="h-10 w-10 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Pending Orders</p>
                  <p className="text-3xl font-bold text-amber-500 mt-1">142</p>
                </div>
                <Clock className="h-10 w-10 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/orders">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <ShoppingCart className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Order Management</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  View orders, process payments, manage shipping and quotes
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/customers">
            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Customer Management</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Manage customer accounts, subscriptions, and communication
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
