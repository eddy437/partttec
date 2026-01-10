"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Save, Eye, Trash2, Package, ImageIcon, Video, FileText, Plus, Edit } from "lucide-react"
import { toast } from "sonner"
import { brands } from "@/lib/data"
import Image from "next/image"

export default function BrandPortalPage() {
  const params = useParams()
  const brandSlug = params.slug as string
  const brand = brands.find((b) => b.id === brandSlug || b.slug === brandSlug)

  const [brandData, setBrandData] = useState(brand)
  const [brandProducts, setBrandProducts] = useState<any[]>([])
  const [brandImages, setBrandImages] = useState<any[]>([])
  const [brandVideos, setBrandVideos] = useState<any[]>([])
  const [brandDocuments, setBrandDocuments] = useState<any[]>([])

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!brand) return

    // Load brand-specific data from localStorage
    const savedBrandData = localStorage.getItem(`brand_${brandSlug}_data`)
    if (savedBrandData) {
      setBrandData(JSON.parse(savedBrandData))
    }

    // Load brand products
    const allProducts = JSON.parse(localStorage.getItem("inventory_data") || "[]")
    const filtered = allProducts.filter((p: any) => p.brand === brand.name)
    setBrandProducts(filtered)

    // Load brand media
    const images = JSON.parse(localStorage.getItem(`brand_${brandSlug}_images`) || "[]")
    setBrandImages(images)

    const videos = JSON.parse(localStorage.getItem(`brand_${brandSlug}_videos`) || "[]")
    setBrandVideos(videos)

    const documents = JSON.parse(localStorage.getItem(`brand_${brandSlug}_documents`) || "[]")
    setBrandDocuments(documents)
  }, [brand, brandSlug])

  const saveBrandData = () => {
    if (!brandData) return
    localStorage.setItem(`brand_${brandSlug}_data`, JSON.stringify(brandData))
    toast.success("Brand information updated successfully")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      size: file.size,
    }))

    const updated = [...brandImages, ...newImages]
    setBrandImages(updated)
    localStorage.setItem(`brand_${brandSlug}_images`, JSON.stringify(updated))
    toast.success(`${newImages.length} image(s) uploaded`)
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newVideos = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      size: file.size,
    }))

    const updated = [...brandVideos, ...newVideos]
    setBrandVideos(updated)
    localStorage.setItem(`brand_${brandSlug}_videos`, JSON.stringify(updated))
    toast.success(`${newVideos.length} video(s) uploaded`)
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newDocuments = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      size: file.size,
      type: file.type,
    }))

    const updated = [...brandDocuments, ...newDocuments]
    setBrandDocuments(updated)
    localStorage.setItem(`brand_${brandSlug}_documents`, JSON.stringify(updated))
    toast.success(`${newDocuments.length} document(s) uploaded`)
  }

  const deleteImage = (id: number) => {
    const updated = brandImages.filter((img) => img.id !== id)
    setBrandImages(updated)
    localStorage.setItem(`brand_${brandSlug}_images`, JSON.stringify(updated))
    toast.success("Image deleted")
  }

  const deleteVideo = (id: number) => {
    const updated = brandVideos.filter((vid) => vid.id !== id)
    setBrandVideos(updated)
    localStorage.setItem(`brand_${brandSlug}_videos`, JSON.stringify(updated))
    toast.success("Video deleted")
  }

  const deleteDocument = (id: number) => {
    const updated = brandDocuments.filter((doc) => doc.id !== id)
    setBrandDocuments(updated)
    localStorage.setItem(`brand_${brandSlug}_documents`, JSON.stringify(updated))
    toast.success("Document deleted")
  }

  const deleteProduct = (productId: string) => {
    const allProducts = JSON.parse(localStorage.getItem("inventory_data") || "[]")
    const updated = allProducts.filter((p: any) => p.id !== productId)
    localStorage.setItem("inventory_data", JSON.stringify(updated))
    setBrandProducts(brandProducts.filter((p) => p.id !== productId))
    toast.success("Product deleted")
  }

  if (!brand) {
    return (
      <div className="p-8">
        <Card className="bg-neutral-900 border-white/10">
          <CardContent className="p-12 text-center">
            <p className="text-white/60">Brand not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {brand.logo && (
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} width={48} height={48} className="p-2" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{brandData?.name} Brand Portal</h1>
            <p className="text-white/60">Manage {brandProducts.length} products, media, and brand information</p>
          </div>
        </div>
        <Badge className="bg-blue-600">{brand.foundedYear}</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-600/20 to-red-600/5 border-red-600/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{brandProducts.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border-blue-600/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{brandImages.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border-purple-600/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{brandVideos.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-600/20 to-green-600/5 border-green-600/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{brandDocuments.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="bg-neutral-900 border border-white/10">
          <TabsTrigger value="info">
            <Edit className="mr-2 h-4 w-4" /> Brand Info
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="mr-2 h-4 w-4" /> Products ({brandProducts.length})
          </TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="mr-2 h-4 w-4" /> Images ({brandImages.length})
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" /> Videos ({brandVideos.length})
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" /> Documents ({brandDocuments.length})
          </TabsTrigger>
        </TabsList>

        {/* Brand Info Tab */}
        <TabsContent value="info" className="mt-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader>
              <CardTitle>Edit Brand Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Brand Name</Label>
                  <Input
                    value={brandData?.name || ""}
                    onChange={(e) => setBrandData({ ...brandData!, name: e.target.value })}
                    className="bg-neutral-800 border-white/10"
                  />
                </div>
                <div>
                  <Label>Founded Year</Label>
                  <Input
                    value={brandData?.foundedYear || ""}
                    onChange={(e) => setBrandData({ ...brandData!, foundedYear: e.target.value })}
                    className="bg-neutral-800 border-white/10"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={brandData?.description || ""}
                  onChange={(e) => setBrandData({ ...brandData!, description: e.target.value })}
                  className="bg-neutral-800 border-white/10 min-h-32"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Logo URL</Label>
                  <Input
                    value={brandData?.logo || ""}
                    onChange={(e) => setBrandData({ ...brandData!, logo: e.target.value })}
                    className="bg-neutral-800 border-white/10"
                  />
                </div>
                <div>
                  <Label>Banner URL</Label>
                  <Input
                    value={brandData?.banner || ""}
                    onChange={(e) => setBrandData({ ...brandData!, banner: e.target.value })}
                    className="bg-neutral-800 border-white/10"
                  />
                </div>
              </div>

              <Button onClick={saveBrandData} className="bg-red-600 hover:bg-red-700">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="mt-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Brand Products</CardTitle>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <a href="/admin/upload-by-brand">
                  <Plus className="mr-2 h-4 w-4" /> Add More Products
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                {brandProducts.length === 0 ? (
                  <div className="text-center py-12 text-white/60">
                    <Package className="h-16 w-16 mx-auto mb-4 opacity-40" />
                    <p>No products uploaded yet for this brand.</p>
                    <p className="text-sm mt-2">Use the "Upload by Brand" feature to add products.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {brandProducts.map((product) => (
                      <Card key={product.id} className="bg-neutral-800 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-700 flex-shrink-0">
                              {product.images && product.images[0] ? (
                                <Image
                                  src={product.images[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  width={80}
                                  height={80}
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-8 w-8 text-white/40" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{product.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-white/60">
                                <span>SKU: {product.sku}</span>
                                <span>•</span>
                                <span>${product.price}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {product.condition}
                                </Badge>
                              </div>
                              <p className="text-xs text-white/40 mt-1">Stock: {product.stock || 0} units</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" asChild>
                                <a href={`/product/${product.id}`} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button size="sm" variant="ghost" asChild>
                                <a href={`/admin/products/${product.id}`}>
                                  <Edit className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="mt-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Brand Images</CardTitle>
              <div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button onClick={() => imageInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="mr-2 h-4 w-4" /> Upload Images
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {brandImages.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-40" />
                  <p>No images uploaded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {brandImages.map((img) => (
                    <div key={img.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-neutral-800">
                        <Image
                          src={img.url || "/placeholder.svg"}
                          alt={img.name}
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => deleteImage(img.id)} className="text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-white/60 mt-2 truncate">{img.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="mt-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Brand Videos</CardTitle>
              <div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <Button onClick={() => videoInputRef.current?.click()} className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="mr-2 h-4 w-4" /> Upload Videos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {brandVideos.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-40" />
                  <p>No videos uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {brandVideos.map((video) => (
                    <Card key={video.id} className="bg-neutral-800 border-white/10">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Video className="h-8 w-8 text-purple-400" />
                          <div>
                            <p className="font-medium">{video.name}</p>
                            <p className="text-xs text-white/60">
                              {(video.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                              {new Date(video.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteVideo(video.id)}
                          className="text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Brand Documents</CardTitle>
              <div>
                <input
                  ref={documentInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  multiple
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
                <Button onClick={() => documentInputRef.current?.click()} className="bg-green-600 hover:bg-green-700">
                  <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {brandDocuments.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-40" />
                  <p>No documents uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {brandDocuments.map((doc) => (
                    <Card key={doc.id} className="bg-neutral-800 border-white/10">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-green-400" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-white/60">
                              {(doc.size / 1024).toFixed(2)} KB • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteDocument(doc.id)}
                          className="text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
