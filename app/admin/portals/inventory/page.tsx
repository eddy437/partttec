import { Package, Upload, Tag, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InventoryPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Inventory Management Portal</h1>
            <p className="text-white/60">Manage products, bulk uploads, and brand catalog</p>
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
                  <p className="text-white/60 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-white mt-1">1,024,567</p>
                </div>
                <Package className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">In Stock</p>
                  <p className="text-3xl font-bold text-green-500 mt-1">892,341</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Low Stock</p>
                  <p className="text-3xl font-bold text-amber-500 mt-1">8,426</p>
                </div>
                <AlertCircle className="h-10 w-10 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Brands</p>
                  <p className="text-3xl font-bold text-purple-500 mt-1">14</p>
                </div>
                <Tag className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/products">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Package className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Product Management</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  View, edit, and manage your entire product catalog
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/bulk-upload">
            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <Upload className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Bulk Upload</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Import products in bulk via CSV with live status tracking
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/upload-by-brand">
            <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border-orange-500/30 hover:border-orange-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <Tag className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">Upload by Brand</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Upload brand-specific CSV files and auto-generate product pages
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/brands">
            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <Tag className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Brand Management</CardTitle>
                </div>
                <CardDescription className="text-white/60">
                  Manage brands, logos, and product associations
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
