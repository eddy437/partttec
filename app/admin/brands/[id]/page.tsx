"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  FileText,
  ImageIcon,
  HelpCircle,
  BookOpen,
  Wrench,
  LinkIcon,
  Globe,
  Video,
  ImageIcon as ImageIconLucide,
  ExternalLink,
  Share2,
  Megaphone,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { getBrandById, categories } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BrandEditor() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const isNew = id === "new"

  // Mock data fetching - in real app this would be an API call
  const existingBrand = !isNew ? getBrandById(id) : null

  const [formData, setFormData] = useState({
    name: existingBrand?.name || "",
    description: existingBrand?.description || "",
    country: "Germany", // Default for now
    websiteUrl: "",
    logo: existingBrand?.logo || "",
    banner: existingBrand?.banner || "", // Added banner state
    history: existingBrand?.history || "",
    foundedYear: existingBrand?.foundedYear || "",
    headquarters: existingBrand?.headquarters || "",
    isPublished: existingBrand?.isPublished ?? true, // Added publish state
    googleMerchantSync: existingBrand?.googleMerchantSync ?? false,
  })

  // State for dynamic lists
  const [articles, setArticles] = useState(existingBrand?.articles || [])
  const [images, setImages] = useState<string[]>(["/placeholder.svg"])
  const [categoryAssets, setCategoryAssets] = useState(existingBrand?.categoryAssets || [])
  const [bulkUrls, setBulkUrls] = useState("")
  const [redirectUrl, setRedirectUrl] = useState("") // added state for redirect URL in bulk upload
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedAssetType, setSelectedAssetType] = useState<"image" | "video" | "social" | "marketing">("image")
  const [socialPlatform, setSocialPlatform] = useState("") // Added state for social platform name

  const [guides, setGuides] = useState<{ title: string; url: string; type: "mechanic" | "guide" }[]>([
    { title: "Brake Installation Guide", url: "https://example.com/guide", type: "guide" },
    { title: "Mechanic's Note: Rotor Wear", url: "https://example.com/note", type: "mechanic" },
  ])
  const [faqs, setFaqs] = useState<{ question: string; answer: string; url?: string }[]>([
    {
      question: "What is the warranty period?",
      answer: "2 years standard warranty.",
      url: "https://example.com/warranty",
    },
  ])

  const [googleMerchantSettings, setGoogleMerchantSettings] = useState({
    feedUrl: "",
    autoSync: true,
    syncFrequency: "daily" as "hourly" | "daily" | "weekly",
    includeOutOfStock: false,
    customLabels: {
      label0: "",
      label1: "",
      label2: "",
      label3: "",
      label4: "",
    },
    lastSyncDate: "2024-01-15 14:32",
    totalProductsSynced: existingBrand?.partCount || 0,
  })

  const handleSave = () => {
    toast.success(`Brand information saved. Updates applied to ${existingBrand?.partCount || 0} linked parts.`)
    setTimeout(() => router.push("/admin/brands"), 1000)
  }

  const handleFileUpload = (type: string) => {
    toast.info(`Uploading ${type}... (Simulation)`)
    // Simulation of file upload
  }

  const handleBulkAssetAdd = () => {
    if (!bulkUrls.trim() || !selectedCategory) {
      toast.error("Please enter URLs and select a category")
      return
    }

    if (selectedAssetType === "social" && !socialPlatform) {
      toast.error("Please select a Social Media Platform")
      return
    }

    const urls = bulkUrls.split("\n").filter((url) => url.trim().length > 0)
    const newAssets = urls.map((url) => ({
      categorySlug: selectedCategory,
      type: selectedAssetType,
      url: url.trim(),
      label: selectedAssetType === "social" ? socialPlatform : `${selectedCategory} ${selectedAssetType}`,
      redirectUrl: redirectUrl.trim() || undefined,
    }))

    setCategoryAssets([...categoryAssets, ...newAssets])
    setBulkUrls("")
    setRedirectUrl("")
    setSocialPlatform("")

    if (selectedAssetType === "marketing") {
      toast.success(`Marketing assets auto-synced to all ${selectedCategory} parts!`)
    } else {
      toast.success(`Added ${newAssets.length} assets to ${selectedCategory} category`)
    }
  }

  const handleGoogleMerchantSync = () => {
    toast.info("Syncing products to Google Merchant Center...")
    setTimeout(() => {
      setGoogleMerchantSettings((prev) => ({
        ...prev,
        lastSyncDate: new Date().toLocaleString(),
        totalProductsSynced: existingBrand?.partCount || 0,
      }))
      toast.success(`Successfully synced ${existingBrand?.partCount || 0} products to Google Merchant Center`)
    }, 2000)
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/brands">
            <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{isNew ? "Add New Brand" : `Edit ${formData.name}`}</h1>
            <p className="text-white/60">Manage brand details, assets, content, and guides.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent text-white">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-neutral-900 border border-white/10 p-1 w-full justify-start h-auto flex-wrap">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2"
          >
            <FileText className="mr-2 h-4 w-4" /> General Info
          </TabsTrigger>
          <TabsTrigger
            value="images"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2"
          >
            <ImageIcon className="mr-2 h-4 w-4" /> Images & Assets
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2"
          >
            <Share2 className="mr-2 h-4 w-4" /> Social & Marketing
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2"
          >
            <BookOpen className="mr-2 h-4 w-4" /> History & Articles
          </TabsTrigger>
          <TabsTrigger
            value="guides"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2"
          >
            <Wrench className="mr-2 h-4 w-4" /> Guides & Suggestions
          </TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2">
            <HelpCircle className="mr-2 h-4 w-4" /> FAQ & Links
          </TabsTrigger>
          <TabsTrigger
            value="merchant"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Google Merchant
          </TabsTrigger>
          <TabsTrigger
            value="publish"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white px-6 py-2"
          >
            <Globe className="mr-2 h-4 w-4" /> Publish
          </TabsTrigger>
        </TabsList>

        {/* General Information Tab */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Brand Details</CardTitle>
              <CardDescription>Basic information about the manufacturer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Brand Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Official Website URL</Label>
                  <Input
                    placeholder="https://brand.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Headquarters</Label>
                  <Input
                    value={formData.headquarters}
                    onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Founded Year</Label>
                  <Input
                    value={formData.foundedYear}
                    onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-white/5 border-white/10 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Brand Imagery & Assets</CardTitle>
                  <CardDescription>
                    Upload logos, banners, gallery images. These assets will appear on all linked product pages.
                  </CardDescription>
                </div>
                <Button onClick={() => handleFileUpload("image")} className="bg-white/10 hover:bg-white/20">
                  <Upload className="mr-2 h-4 w-4" /> Upload New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b border-white/10 pb-2">Brand Logo</h3>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center p-2 relative group overflow-hidden">
                    <img src={formData.logo || "/placeholder.svg"} alt="Logo" className="object-contain max-h-full" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={() => handleFileUpload("logo")}>
                        Change
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Logo URL</Label>
                    <Input
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                    <p className="text-xs text-white/50">Used on headers, product cards, and brand lists.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b border-white/10 pb-2">Brand Banner</h3>
                <div className="relative w-full h-48 bg-white/5 rounded-lg overflow-hidden group">
                  <img
                    src={formData.banner || "/placeholder.svg"}
                    alt="Banner"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" onClick={() => handleFileUpload("banner")}>
                      Change Banner
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Banner URL</Label>
                  <Input
                    value={formData.banner}
                    onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                  <p className="text-xs text-white/50">Large background image for the Brand Page header.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b border-white/10 pb-2">Gallery Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    className="border-2 border-dashed border-white/10 rounded-lg aspect-square flex flex-col items-center justify-center text-white/40 hover:border-white/20 hover:text-white/60 cursor-pointer transition-colors"
                    onClick={() => handleFileUpload("image")}
                  >
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group"
                    >
                      <img src={img || "/placeholder.svg"} alt="Brand asset" className="object-cover w-full h-full" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social & Marketing Tab */}
        <TabsContent value="social" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Social Media & Marketing Assets</CardTitle>
                  <CardDescription>
                    Manage social links, marketing materials, and category-specific assets.
                  </CardDescription>
                </div>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="mr-2 h-4 w-4" /> Save & Sync Assets
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      {selectedAssetType === "social"
                        ? "Social Media Profile Links (One per line)"
                        : "Asset URLs (One per line)"}
                    </Label>
                    <Textarea
                      placeholder={
                        selectedAssetType === "social"
                          ? "https://facebook.com/brand\nhttps://instagram.com/brand"
                          : "https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
                      }
                      className="bg-white/5 border-white/10 min-h-[150px] font-mono text-xs"
                      value={bulkUrls}
                      onChange={(e) => setBulkUrls(e.target.value)}
                    />
                  </div>

                  {selectedAssetType !== "social" && (
                    <div className="space-y-2">
                      <Label>Redirect URL (Optional)</Label>
                      <Input
                        placeholder="https://autoparts.world/category/engine"
                        value={redirectUrl}
                        onChange={(e) => setRedirectUrl(e.target.value)}
                        className="bg-white/5 border-white/10"
                      />
                      <p className="text-xs text-white/50">
                        If provided, clicking the asset on the product page will take the user to this link.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Asset Type</Label>
                      <Select
                        value={selectedAssetType}
                        onValueChange={(val: "image" | "video" | "social" | "marketing") => setSelectedAssetType(val)}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="social">Social Media Link</SelectItem>
                          <SelectItem value="marketing">Marketing Material</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedAssetType === "social" && (
                    <div className="space-y-2">
                      <Label>Social Platform Name</Label>
                      <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select Platform (e.g. Facebook)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Twitter / X">Twitter / X</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="YouTube">YouTube</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                          <SelectItem value="Pinterest">Pinterest</SelectItem>
                          <SelectItem value="Website">Official Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedAssetType === "marketing" && (
                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded text-xs flex items-center gap-2">
                      <Megaphone className="h-4 w-4" />
                      Marketing assets are automatically synced and prioritized in search results.
                    </div>
                  )}

                  <Button onClick={handleBulkAssetAdd} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    {selectedAssetType === "social" ? "Add Social Links" : "Add to All Pages"}
                  </Button>
                </div>

                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/60">
                    Active Category Assets
                  </h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {categoryAssets.map((asset, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-black/40 rounded border border-white/5 group"
                      >
                        <div className="h-10 w-10 bg-white/10 rounded flex items-center justify-center shrink-0">
                          {asset.type === "video" && <Video className="h-5 w-5 text-blue-400" />}
                          {asset.type === "image" && <ImageIconLucide className="h-5 w-5 text-green-400" />}
                          {asset.type === "social" && <Share2 className="h-5 w-5 text-purple-400" />}
                          {asset.type === "marketing" && <Megaphone className="h-5 w-5 text-orange-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{asset.url}</div>
                          <div className="text-xs text-white/40 capitalize flex items-center gap-2">
                            {asset.categorySlug} • {asset.type}
                            {asset.redirectUrl && (
                              <span className="flex items-center gap-1 text-blue-400">
                                <ExternalLink className="h-3 w-3" /> Linked
                              </span>
                            )}
                            {(asset.type === "marketing" || asset.type === "social") && (
                              <span className="flex items-center gap-1 text-green-400 ml-auto">● Synced</span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/20 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                          onClick={() => {
                            const newAssets = [...categoryAssets]
                            newAssets.splice(idx, 1)
                            setCategoryAssets(newAssets)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {categoryAssets.length === 0 && (
                      <div className="text-center py-8 text-white/20 text-sm italic">
                        No active assets. Upload above to sync content.
                      </div>
                    )}
                  </div>
                  {categoryAssets.length > 0 && (
                    <Button
                      onClick={handleSave}
                      variant="outline"
                      className="w-full mt-4 border-white/10 hover:bg-white/5 text-xs h-8 bg-transparent"
                    >
                      <Save className="mr-2 h-3 w-3" /> Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History & Articles Tab */}
        <TabsContent value="history" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Brand History</CardTitle>
              <CardDescription>Detailed history content for the brand page.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                className="bg-white/5 border-white/10 min-h-[200px]"
                placeholder="Write the brand's history here..."
              />
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Related Articles</CardTitle>
                  <CardDescription>Connect blog posts and articles.</CardDescription>
                </div>
                <Button className="bg-white/10 hover:bg-white/20">
                  <LinkIcon className="mr-2 h-4 w-4" /> Link Article
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {articles?.map((article: any, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-xs text-white/40">{article.date}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {(!articles || articles.length === 0) && (
                <div className="text-center py-8 text-white/40 italic">No articles linked yet.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Manage FAQs and external support links.</CardDescription>
                </div>
                <Button className="bg-white/10 hover:bg-white/20">
                  <Plus className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <Label className="text-white/80">Q: {faq.question}</Label>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-white/60">A: {faq.answer}</p>
                  {faq.url && (
                    <div className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                      <LinkIcon className="h-3 w-3" /> {faq.url}
                    </div>
                  )}
                </div>
              ))}

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-medium text-sm text-white/60">Add New FAQ</h4>
                <div className="space-y-3">
                  <Input placeholder="Question" className="bg-white/5 border-white/10" />
                  <Textarea placeholder="Answer" className="bg-white/5 border-white/10" />
                  <Input placeholder="Related Link URL (Optional)" className="bg-white/5 border-white/10" />
                  <Button className="bg-white/10 hover:bg-white/20">Save FAQ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Guides & Suggestions</CardTitle>
              <CardDescription>Provide helpful guides and suggestions for users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {guides.map((guide, idx) => (
                <div key={idx} className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{guide.title}</div>
                      <div className="text-sm text-white/60">{guide.url}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchant" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Google Merchant Center Integration</CardTitle>
                  <CardDescription>
                    Sync your product catalog to Google Merchant Center for Shopping ads and free listings.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${formData.googleMerchantSync ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                    />
                    <span className="text-sm text-white/60">{formData.googleMerchantSync ? "Active" : "Inactive"}</span>
                  </div>
                  <Button
                    onClick={() => setFormData({ ...formData, googleMerchantSync: !formData.googleMerchantSync })}
                    variant={formData.googleMerchantSync ? "destructive" : "default"}
                    className={
                      formData.googleMerchantSync ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    {formData.googleMerchantSync ? "Disable Sync" : "Enable Sync"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.googleMerchantSync && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-blue-500/10 border-blue-500/20">
                      <CardContent className="pt-6">
                        <div className="text-sm text-blue-400 mb-1">Products Synced</div>
                        <div className="text-3xl font-bold text-blue-500">
                          {googleMerchantSettings.totalProductsSynced.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-500/10 border-green-500/20">
                      <CardContent className="pt-6">
                        <div className="text-sm text-green-400 mb-1">Sync Status</div>
                        <div className="text-xl font-bold text-green-500">
                          {googleMerchantSettings.autoSync ? "Auto" : "Manual"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-500/10 border-purple-500/20">
                      <CardContent className="pt-6">
                        <div className="text-sm text-purple-400 mb-1">Last Sync</div>
                        <div className="text-sm font-medium text-purple-500">
                          {googleMerchantSettings.lastSyncDate || "Never"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-b border-white/10 pb-2">Feed Configuration</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Product Feed URL</Label>
                        <Input
                          value={googleMerchantSettings.feedUrl}
                          onChange={(e) =>
                            setGoogleMerchantSettings({ ...googleMerchantSettings, feedUrl: e.target.value })
                          }
                          placeholder="https://autoparts.world/feed/google-merchant.xml"
                          className="bg-white/5 border-white/10 font-mono text-xs"
                        />
                        <p className="text-xs text-white/50">
                          This URL will be submitted to Google Merchant Center for product ingestion.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Sync Frequency</Label>
                        <Select
                          value={googleMerchantSettings.syncFrequency}
                          onValueChange={(val: "hourly" | "daily" | "weekly") =>
                            setGoogleMerchantSettings({ ...googleMerchantSettings, syncFrequency: val })
                          }
                        >
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-white/50">How often the product feed should be updated.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <input
                        type="checkbox"
                        id="autoSync"
                        checked={googleMerchantSettings.autoSync}
                        onChange={(e) =>
                          setGoogleMerchantSettings({ ...googleMerchantSettings, autoSync: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-white/20 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <Label htmlFor="autoSync" className="font-medium cursor-pointer">
                          Enable Automatic Sync
                        </Label>
                        <p className="text-xs text-white/50">
                          Automatically push product updates to Google Merchant Center.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <input
                        type="checkbox"
                        id="includeOutOfStock"
                        checked={googleMerchantSettings.includeOutOfStock}
                        onChange={(e) =>
                          setGoogleMerchantSettings({
                            ...googleMerchantSettings,
                            includeOutOfStock: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded border-white/20 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <Label htmlFor="includeOutOfStock" className="font-medium cursor-pointer">
                          Include Out of Stock Products
                        </Label>
                        <p className="text-xs text-white/50">
                          Send out-of-stock items to Google with availability status.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-b border-white/10 pb-2">Custom Labels (Optional)</h3>
                    <p className="text-sm text-white/60">
                      Use custom labels to segment your products in Google Merchant Center for better campaign
                      targeting.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <div key={num} className="space-y-2">
                          <Label>Custom Label {num}</Label>
                          <Input
                            value={
                              googleMerchantSettings.customLabels[
                                `label${num}` as keyof typeof googleMerchantSettings.customLabels
                              ]
                            }
                            onChange={(e) =>
                              setGoogleMerchantSettings({
                                ...googleMerchantSettings,
                                customLabels: {
                                  ...googleMerchantSettings.customLabels,
                                  [`label${num}`]: e.target.value,
                                },
                              })
                            }
                            placeholder={`e.g., ${num === 0 ? "Premium" : num === 1 ? "High Demand" : num === 2 ? "Seasonal" : num === 3 ? "Clearance" : "New Arrival"}`}
                            className="bg-white/5 border-white/10"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="text-sm text-white/60">
                      Sync will include all {existingBrand?.partCount || 0} products from this brand.
                    </div>
                    <Button onClick={handleGoogleMerchantSync} className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingBag className="mr-2 h-4 w-4" /> Sync Now
                    </Button>
                  </div>
                </>
              )}

              {!formData.googleMerchantSync && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-white/40" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Google Merchant Sync is Disabled</h3>
                  <p className="text-white/60 mb-6 max-w-md mx-auto">
                    Enable Google Merchant Center integration to automatically sync your product catalog and appear in
                    Google Shopping results.
                  </p>
                  <Button
                    onClick={() => setFormData({ ...formData, googleMerchantSync: true })}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Enable Integration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publish Tab */}
        <TabsContent value="publish" className="mt-6 space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
              <CardDescription>Control visibility and status of this brand.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="space-y-1">
                  <div className="font-bold">Public Visibility</div>
                  <div className="text-sm text-white/60">Make this brand page visible to all users.</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={formData.isPublished ? "text-green-400" : "text-white/40"}>
                    {formData.isPublished ? "Published" : "Draft"}
                  </span>
                  <Button
                    variant={formData.isPublished ? "outline" : "default"}
                    className={
                      formData.isPublished
                        ? "border-red-500 text-red-500 hover:bg-red-500/10"
                        : "bg-green-600 hover:bg-green-700"
                    }
                    onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                  >
                    {formData.isPublished ? "Unpublish" : "Publish Now"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">Sync Status</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-white/50 mb-1">Linked Products</div>
                    <div className="text-2xl font-bold">{existingBrand?.partCount || 0}</div>
                    <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div> Up to date
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-white/50 mb-1">Assets</div>
                    <div className="text-2xl font-bold">4 Files</div>
                    <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div> Synced
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-white/50 mb-1">Last Updated</div>
                    <div className="text-xl font-bold">Just now</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSave}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                >
                  <Globe className="mr-2 h-4 w-4" /> Publish Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
