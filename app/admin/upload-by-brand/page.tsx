"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { brands, categories } from "@/lib/data"
import {
  Upload,
  FileSpreadsheet,
  Package,
  CheckCircle2,
  Eye,
  Trash2,
  Download,
  Bell,
  Mail,
  Users,
  Send,
} from "lucide-react"
import { toast } from "sonner"

export default function UploadByBrandPage() {
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "complete">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedProducts, setUploadedProducts] = useState<any[]>([])
  const [uploadLogs, setUploadLogs] = useState<string[]>([])
  const [brandUploads, setBrandUploads] = useState<any[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logsEndRef = useRef<HTMLDivElement>(null)

  const [autoNotify, setAutoNotify] = useState(true)
  const [notificationResult, setNotificationResult] = useState<{
    sent: number
    customers: string[]
  } | null>(null)
  const [sendingNotifications, setSendingNotifications] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  useEffect(() => {
    const saved = localStorage.getItem("brand_uploads_history")
    if (saved) {
      setBrandUploads(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [uploadLogs])

  const notifyCustomers = async (products: any[]) => {
    setSendingNotifications(true)
    setUploadLogs((prev) => [...prev, `[Notifications] Finding subscribers for ${selectedBrand}...`])

    let totalNotified = 0
    const notifiedCustomers: string[] = []

    for (const product of products) {
      try {
        const res = await fetch("/api/products/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            make: product.brand,
            model: product.fitment?.[0]?.split(" ").pop() || "Universal",
            year: product.fitment?.[0]?.split(" ")[0] || "2020",
            price: product.price,
            condition: product.condition,
            image: product.images?.[0],
          }),
        })

        const result = await res.json()
        if (result.notificationsSent > 0) {
          totalNotified += result.notificationsSent
          result.customers.forEach((c: string) => {
            if (!notifiedCustomers.includes(c)) {
              notifiedCustomers.push(c)
            }
          })
        }
      } catch (error) {
        console.error("Notification error:", error)
      }
    }

    if (totalNotified > 0) {
      setUploadLogs((prev) =>
        [
          ...prev,
          `[Notifications] Sent ${totalNotified} notifications to ${notifiedCustomers.length} customers`,
          ...notifiedCustomers.slice(0, 5).map((c) => `[Email Sent] ${c}`),
          notifiedCustomers.length > 5 ? `[Notifications] ...and ${notifiedCustomers.length - 5} more customers` : "",
        ].filter(Boolean),
      )

      setNotificationResult({ sent: totalNotified, customers: notifiedCustomers })
      toast.success(`Notified ${notifiedCustomers.length} customers about new products!`)
    } else {
      setUploadLogs((prev) => [...prev, `[Notifications] No matching subscribers found for these products`])
    }

    setSendingNotifications(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!selectedBrand) {
      toast.error("Please select a brand first")
      return
    }

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file")
      return
    }

    processUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (selectedBrand) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (!selectedBrand) {
      toast.error("Please select a brand first")
      return
    }

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        processUpload(file)
      } else {
        toast.error("Please upload a CSV file")
      }
    }
  }

  const processUpload = (file: File) => {
    if (!selectedBrand) {
      toast.error("Please select a brand first")
      return
    }

    setUploadStatus("uploading")
    setUploadProgress(0)
    setNotificationResult(null)
    setUploadLogs([`[System] Starting upload for ${selectedBrand}...`, `[System] File: ${file.name}`])

    const reader = new FileReader()
    reader.onload = async (e) => {
      const content = e.target?.result as string
      const lines = content.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim())

      const products = []
      const totalLines = lines.length - 1

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue

        const values = lines[i].split(",").map((v) => v.trim())
        const productData: any = {}

        headers.forEach((header, index) => {
          productData[header] = values[index]
        })

        const productId = `${selectedBrand.toLowerCase()}-${Date.now()}-${i}`

        const product = {
          id: productId,
          name: productData.name || productData.product_name || `${selectedBrand} Part ${i}`,
          sku: productData.sku || `SKU-${productId}`,
          brand: selectedBrand,
          category: selectedCategory || productData.category || categories[0].name,
          price: Number.parseFloat(productData.price) || Math.floor(Math.random() * 500) + 50,
          stock: Number.parseInt(productData.stock) || Math.floor(Math.random() * 100),
          condition: productData.condition || "Used",
          description: productData.description || `Quality ${selectedBrand} auto part`,
          images: [productData.image_url || "/placeholder.svg?height=400&width=400"],
          mileageOptions: [
            {
              price: Number.parseFloat(productData.price) || Math.floor(Math.random() * 500) + 50,
              availability: "In Stock",
              condition: productData.condition || "Used",
            },
          ],
          fitment: productData.fitment ? productData.fitment.split(";") : ["Universal"],
          partNumber: productData.part_number || productData.sku || `PN-${productId}`,
          status: "active",
          createdAt: new Date().toISOString().split("T")[0],
        }

        products.push(product)

        const progress = Math.floor(((i + 1) / totalLines) * 100)
        setUploadProgress(progress)

        if (i % 10 === 0) {
          setUploadLogs((prev) => [...prev, `[Processing] Created product page: ${product.name} (ID: ${productId})`])
        }
      }

      const existingProducts = JSON.parse(localStorage.getItem("inventory_data") || "[]")
      const updatedProducts = [...existingProducts, ...products]
      localStorage.setItem("inventory_data", JSON.stringify(updatedProducts))
      localStorage.setItem("inventory_mode", "custom")

      setUploadedProducts(products)
      setUploadStatus("complete")

      const uploadRecord = {
        id: Date.now(),
        brand: selectedBrand,
        category: selectedCategory,
        fileName: file.name,
        count: products.length,
        date: new Date().toISOString(),
        products: products.slice(0, 5),
      }

      const newHistory = [uploadRecord, ...brandUploads]
      setBrandUploads(newHistory)
      localStorage.setItem("brand_uploads_history", JSON.stringify(newHistory))

      setUploadLogs((prev) => [
        ...prev,
        `[Success] ${products.length} products uploaded successfully`,
        `[Success] Product pages created and accessible at /product/[id]`,
      ])

      toast.success(`Successfully uploaded ${products.length} products for ${selectedBrand}`)

      if (autoNotify && products.length > 0) {
        setUploadLogs((prev) => [...prev, `[Notifications] Auto-notify enabled, sending notifications...`])
        await notifyCustomers(products.slice(0, 10)) // Notify for first 10 products to avoid spam
      }
    }

    reader.readAsText(file)
  }

  const downloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "name,sku,price,stock,condition,category,description,image_url,part_number,fitment\n" +
      "Example Part,SKU001,199.99,50,New,Engine Parts,High quality engine component,https://example.com/image.jpg,PN12345,2020 Ford F-150;2021 Ford F-150"

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${selectedBrand || "brand"}_upload_template.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearHistory = (id: number) => {
    const newHistory = brandUploads.filter((u) => u.id !== id)
    setBrandUploads(newHistory)
    localStorage.setItem("brand_uploads_history", JSON.stringify(newHistory))
    toast.success("Upload record deleted")
  }

  const manualNotify = async () => {
    if (uploadedProducts.length === 0) {
      toast.error("No products to notify about")
      return
    }
    await notifyCustomers(uploadedProducts.slice(0, 10))
  }

  const tabs = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "history", label: "Upload History", icon: Package },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Upload Products by Brand</h1>
          <p className="text-white/60">
            Upload CSV files organized by vehicle brand and automatically create product pages
          </p>
        </div>
        <Button
          onClick={downloadTemplate}
          variant="outline"
          className="border-white/10 hover:bg-white/5 bg-transparent text-white"
        >
          <Download className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </div>

      <div className="flex gap-2 border-b border-zinc-800 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? tab.id === "upload"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "upload" && (
        <div className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-neutral-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-red-500" />
                  Select Brand & Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Brand *</Label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-neutral-800 border-white/10 text-white">
                      <SelectValue placeholder="Select brand..." />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-white/10">
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.name} className="text-white hover:bg-neutral-700">
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Category (Optional)</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-neutral-800 border-white/10 text-white">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-white/10">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name} className="text-white hover:bg-neutral-700">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Bell className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Auto-Notify Customers</p>
                      <p className="text-xs text-zinc-400">Send email/SMS to subscribers when products upload</p>
                    </div>
                  </div>
                  <Switch checked={autoNotify} onCheckedChange={setAutoNotify} />
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? "border-red-500 bg-red-500/10"
                      : selectedBrand
                        ? "border-white/20 hover:border-white/40"
                        : "border-white/10 opacity-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-white/40" />
                  <p className="text-white/80 mb-2">
                    {selectedBrand ? "Drag & drop CSV file here" : "Select a brand first"}
                  </p>
                  <p className="text-white/40 text-sm mb-4">or</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={!selectedBrand}
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!selectedBrand || uploadStatus === "uploading"}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Browse Files
                  </Button>
                </div>

                {uploadStatus === "uploading" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "complete" && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Upload Complete!</span>
                    </div>
                    <p className="text-white/60 text-sm mt-1">
                      {uploadedProducts.length} products uploaded for {selectedBrand}
                    </p>

                    {notificationResult && (
                      <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-400">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {notificationResult.customers.length} customers notified!
                          </span>
                        </div>
                      </div>
                    )}

                    {!autoNotify && !notificationResult && (
                      <Button
                        onClick={manualNotify}
                        disabled={sendingNotifications}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        {sendingNotifications ? (
                          <>Sending Notifications...</>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Notify Subscribers Now
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  Upload Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] rounded-lg bg-black/50 p-4 font-mono text-sm">
                  {uploadLogs.length === 0 ? (
                    <p className="text-white/40">Waiting for upload...</p>
                  ) : (
                    uploadLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`mb-1 ${
                          log.includes("[Success]") || log.includes("[Email Sent]")
                            ? "text-emerald-400"
                            : log.includes("[Error]")
                              ? "text-red-400"
                              : log.includes("[Notifications]")
                                ? "text-blue-400"
                                : "text-white/60"
                        }`}
                      >
                        {log}
                      </div>
                    ))
                  )}
                  <div ref={logsEndRef} />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Customer Notifications</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    When you upload products, customers who subscribed to the brand, category, or part type will
                    automatically receive email/SMS notifications about new inventory. Manage subscriptions in the{" "}
                    <a href="/admin/notifications" className="text-red-400 hover:underline">
                      Notification Center
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4 mt-6">
          {brandUploads.length === 0 ? (
            <Card className="bg-neutral-900 border-white/10">
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-white/20" />
                <p className="text-white/60">No upload history yet</p>
              </CardContent>
            </Card>
          ) : (
            brandUploads.map((upload) => (
              <Card key={upload.id} className="bg-neutral-900 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg">
                        <Package className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{upload.brand}</span>
                          {upload.category && (
                            <Badge variant="outline" className="border-white/20 text-white/60">
                              {upload.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/40 text-sm">
                          {upload.count} products • {upload.fileName}
                        </p>
                        <p className="text-white/30 text-xs">{new Date(upload.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/40 hover:text-red-400 hover:bg-red-400/10"
                        onClick={() => clearHistory(upload.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
