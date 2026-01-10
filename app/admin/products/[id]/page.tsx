"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Upload, Save, Trash, Pencil } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pageTitle, setPageTitle] = useState("Edit Product")
  const [pageSubtitle, setPageSubtitle] = useState("Update product details and inventory.")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState("")
  const [tempSubtitle, setTempSubtitle] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    condition: "New",
    description: "",
    price: "",
    sku: "",
    stock: "",
    status: "active",
  })

  useEffect(() => {
    const loadProduct = async () => {
      const mode = localStorage.getItem("inventory_mode")
      let products = []

      if (mode === "custom") {
        try {
          products = JSON.parse(localStorage.getItem("inventory_data") || "[]")
        } catch (e) {
          console.error("Failed to load inventory", e)
        }
      } else {
        // Generate default product data dynamically
        const brands = ["Brembo", "BMW", "Mercedes", "Audi", "Toyota", "Honda"]
        const categories = ["Engine", "Transmission", "Brakes", "Suspension"]
        const conditions = ["New", "Excellent", "Good", "Fair", "Remanufactured"]

        const id = Number.parseInt(params.id)
        const product = {
          id: params.id,
          name: `Auto Part ${id}`,
          sku: `SKU-${id}`,
          brand: brands[id % brands.length],
          category: categories[id % categories.length],
          condition: conditions[id % conditions.length],
          stock: Math.floor(Math.random() * 50) + 10,
          price: Math.floor(Math.random() * 500) + 50,
          status: "active",
          description: `High-quality auto part for various vehicle makes and models.`,
        }
        products = [product]
      }

      const product = products.find((p: any) => p.id === params.id || p.id === Number.parseInt(params.id))
      if (product) {
        setFormData({
          name: product.name,
          brand: product.brand,
          category: product.category,
          condition: product.condition || "New",
          description: product.description || "",
          price: product.price.toString(),
          sku: product.sku,
          stock: product.stock.toString(),
          status: product.status,
        })
      }
    }

    loadProduct()
  }, [params.id])

  const handleSave = () => {
    setLoading(true)

    const mode = localStorage.getItem("inventory_mode")
    if (mode === "custom") {
      try {
        const products = JSON.parse(localStorage.getItem("inventory_data") || "[]")
        const updatedProducts = products.map((p: any) => {
          if (p.id === params.id) {
            return {
              ...p,
              name: formData.name,
              brand: formData.brand,
              category: formData.category,
              condition: formData.condition,
              description: formData.description,
              price: Number.parseFloat(formData.price),
              sku: formData.sku,
              stock: Number.parseInt(formData.stock),
              status: formData.status,
            }
          }
          return p
        })
        localStorage.setItem("inventory_data", JSON.stringify(updatedProducts))
        window.dispatchEvent(new Event("inventory_updated"))
      } catch (e) {
        console.error("Failed to save product", e)
      }
    }

    setTimeout(() => {
      setLoading(false)
      toast.success("Product updated successfully")
      router.push("/admin/products")
    }, 1000)
  }

  const handleTitleSave = () => {
    setPageTitle(tempTitle)
    setPageSubtitle(tempSubtitle)
    setIsEditingTitle(false)
    toast.success("Page header updated")
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
          <div className="group relative">
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
              {pageTitle}
              <Dialog open={isEditingTitle} onOpenChange={setIsEditingTitle}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setTempTitle(pageTitle)
                      setTempSubtitle(pageSubtitle)
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-neutral-900 border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Edit Page Header</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input
                        value={tempSubtitle}
                        onChange={(e) => setTempSubtitle(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <Button onClick={handleTitleSave} className="w-full bg-red-600 hover:bg-red-700">
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </h1>
            <p className="text-white/60">{pageSubtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400 bg-transparent"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand / Make</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  >
                    <option value="">Select Brand</option>
                    <option value="Brembo">Brembo</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  >
                    <option value="">Select Category</option>
                    <option value="Engine">Engine</option>
                    <option value="Transmission">Transmission</option>
                    <option value="Brakes">Brakes</option>
                    <option value="Suspension">Suspension</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  >
                    <option value="New">New</option>
                    <option value="Excellent">Excellent (Used)</option>
                    <option value="Good">Good (Used)</option>
                    <option value="Fair">Fair (Used)</option>
                    <option value="Remanufactured">Remanufactured</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compare at Price ($)</label>
                  <Input type="number" placeholder="100.00" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cost per Item ($)</label>
                  <Input type="number" placeholder="45.00" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SKU</label>
                  <Input
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Quantity</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
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
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                >
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative group">
                  <span className="text-xs text-white/40">Main Image</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white/20" />
                </div>
              </div>
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 bg-transparent">
                <Upload className="mr-2 h-4 w-4" /> Upload New
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
