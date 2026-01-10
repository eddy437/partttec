"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Upload, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast.success("Product created successfully")
      router.push("/admin/products")
    }, 1000)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="icon" className="h-10 w-10 border-white/10 hover:bg-white/5 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-1">Add New Product</h1>
            <p className="text-white/60">Create a new item in your inventory.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
              Cancel
            </Button>
          </Link>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
            {!loading && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input
                  placeholder="e.g. BMW X5 2022 Engine Assembly"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand / Make</label>
                  <select className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                    <option value="">Select Brand</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                    <option value="">Select Category</option>
                    <option value="Engine">Engine</option>
                    <option value="Transmission">Transmission</option>
                    <option value="Brakes">Brakes</option>
                    <option value="Suspension">Suspension</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Detailed description of the part..."
                  className="min-h-[150px] bg-white/5 border-white/10 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Price ($)</label>
                  <Input type="number" placeholder="0.00" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compare at Price ($)</label>
                  <Input type="number" placeholder="0.00" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cost per Item ($)</label>
                  <Input type="number" placeholder="0.00" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SKU</label>
                  <Input placeholder="e.g. ENG-BMW-001" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Quantity</label>
                  <Input type="number" placeholder="0" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Status */}
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-white/40 mb-3" />
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-white/40 mt-1">SVG, PNG, JPG or GIF</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
