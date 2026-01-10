"use client"

import { AlertDialogHeader } from "@/components/ui/alert-dialog"

import { AlertDialogContent } from "@/components/ui/alert-dialog"
import { AlertDialogAction } from "@/components/ui/alert-dialog"
import { AlertDialogCancel } from "@/components/ui/alert-dialog"
import { AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialogDescription } from "@/components/ui/alert-dialog"
import { AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogPortal, AlertDialogOverlay } from "@/components/ui/alert-dialog"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  Eye,
  Trash2,
  FileText,
  ShoppingBag,
  CheckCircle2,
  Plus,
  ArrowLeft,
  ArrowRight,
  X,
  Save,
  RotateCcw,
  BookOpen,
  Activity,
  Server,
  PauseCircle,
  LinkIcon,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { brands, categories } from "@/lib/data"
import { Textarea } from "@/components/ui/textarea"

const initialCsvPreviewData = [
  {
    brand_name: "Ford",
    brand_slug: "ford",
    brand_url: "https://allusedautoparts.world/brand/ford",
    product_count: "14095",
    category_engines_url: "https://allusedautoparts.world/brand/ford/engines",
  },
  {
    brand_name: "Chevy",
    brand_slug: "chevy",
    brand_url: "https://allusedautoparts.world/brand/chevy",
    product_count: "13738",
    category_engines_url: "https://allusedautoparts.world/brand/chevy/engines",
  },
  {
    brand_name: "Dodge",
    brand_slug: "dodge",
    brand_url: "https://allusedautoparts.world/brand/dodge",
    product_count: "8685",
    category_engines_url: "https://allusedautoparts.world/brand/dodge/engines",
  },
  {
    brand_name: "GMC",
    brand_slug: "gmc",
    brand_url: "https://allusedautoparts.world/brand/gmc",
    product_count: "5832",
    category_engines_url: "https://allusedautoparts.world/brand/gmc/engines",
  },
  {
    brand_name: "Volkswagen",
    brand_slug: "volkswagen",
    brand_url: "https://allusedautoparts.world/brand/volkswagen",
    product_count: "4177",
    category_engines_url: "https://allusedautoparts.world/brand/volkswagen/engines",
  },
]

const initialGuidelines = [
  {
    title: "Download Template",
    description:
      "Start with our standardized template (includes columns: brand_name, brand_slug, product_count, etc.).",
  },
  {
    title: "Prepare Your Data",
    description: "Ensure all required fields like SKU, Price, and Brand are filled.",
  },
  {
    title: "Upload & Verify",
    description: "Drag your file to the upload area and review any validation warnings.",
  },
]

export default function BulkUploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [uploadMode, setUploadMode] = useState("append")

  const [publishedGuidelines, setPublishedGuidelines] = useState(initialGuidelines)
  const [draftGuidelines, setDraftGuidelines] = useState(initialGuidelines)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [activeTab, setActiveTab] = useState("upload")

  useEffect(() => {
    const savedPublished = localStorage.getItem("upload_guidelines_published")
    if (savedPublished) {
      setPublishedGuidelines(JSON.parse(savedPublished))
    }

    const savedDraft = localStorage.getItem("upload_guidelines_draft")
    if (savedDraft) {
      setDraftGuidelines(JSON.parse(savedDraft))
      setHasUnsavedChanges(true) // Assuming if draft exists it might differ, logic can be refined
    }

    const savedColumns = localStorage.getItem("upload_template_columns")
    if (savedColumns) {
      setTemplateColumns(JSON.parse(savedColumns))
    }
  }, [])

  const handleSaveDraftGuideline = (index: number, field: "title" | "description", value: string) => {
    const newDraft = [...draftGuidelines]
    newDraft[index] = { ...newDraft[index], [field]: value }
    setDraftGuidelines(newDraft)
    setHasUnsavedChanges(true)
    localStorage.setItem("upload_guidelines_draft", JSON.stringify(newDraft))
  }

  const handleAddGuidelineStep = () => {
    const newDraft = [...draftGuidelines, { title: "New Step", description: "Add description here" }]
    setDraftGuidelines(newDraft)
    setHasUnsavedChanges(true)
    localStorage.setItem("upload_guidelines_draft", JSON.stringify(newDraft))
  }

  const handleRemoveGuidelineStep = (index: number) => {
    const newDraft = draftGuidelines.filter((_, i) => i !== index)
    setDraftGuidelines(newDraft)
    setHasUnsavedChanges(true)
    localStorage.setItem("upload_guidelines_draft", JSON.stringify(newDraft))
  }

  const handlePublishGuidelines = () => {
    setPublishedGuidelines(draftGuidelines)
    setHasUnsavedChanges(false)
    localStorage.setItem("upload_guidelines_published", JSON.stringify(draftGuidelines))
    // Also clear the draft specifically or sync it
    localStorage.setItem("upload_guidelines_draft", JSON.stringify(draftGuidelines))

    // Save columns as part of "publishing" the spec
    localStorage.setItem("upload_template_columns", JSON.stringify(templateColumns))

    toast.success("Guidelines and Template Structure Published Successfully")
  }

  const handleResetDraft = () => {
    setDraftGuidelines(publishedGuidelines)
    setHasUnsavedChanges(false)
    localStorage.setItem("upload_guidelines_draft", JSON.stringify(publishedGuidelines))
    toast.info("Draft reset to last published version")
  }

  const [templateColumns, setTemplateColumns] = useState([
    { id: "brand_name", label: "Brand Name" },
    { id: "brand_slug", label: "Slug" },
    { id: "product_count", label: "Product Count" },
    { id: "category_engines_url", label: "Engines URL" },
  ])
  const [previewData, setPreviewData] = useState(initialCsvPreviewData)
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnName, setNewColumnName] = useState("")

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return
    const id = newColumnName.toLowerCase().replace(/\s+/g, "_")
    const newCols = [...templateColumns, { id, label: newColumnName }] // capture new cols
    setTemplateColumns(newCols)
    setNewColumnName("")
    setIsAddingColumn(false)
    localStorage.setItem("upload_template_columns", JSON.stringify(newCols))
    toast.success(`Column "${newColumnName}" added`)
  }

  const handleDeleteColumn = (index: number) => {
    const newCols = [...templateColumns]
    newCols.splice(index, 1)
    setTemplateColumns(newCols)
    localStorage.setItem("upload_template_columns", JSON.stringify(newCols)) // Persist
  }

  const handleMoveColumn = (index: number, direction: "left" | "right") => {
    if ((direction === "left" && index === 0) || (direction === "right" && index === templateColumns.length - 1)) return
    const newCols = [...templateColumns]
    const targetIndex = direction === "left" ? index - 1 : index + 1
    const temp = newCols[index]
    newCols[index] = newCols[targetIndex]
    newCols[targetIndex] = temp
    setTemplateColumns(newCols)
    localStorage.setItem("upload_template_columns", JSON.stringify(newCols)) // Persist
  }

  const [isUploading, setIsUploading] = useState(false)
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    processed: 0,
    success: 0,
    failed: 0,
    processing: 0,
    hold: 0,
    brokenLinks: 0,
    currentFile: "",
  })
  const [uploadLogs, setUploadLogs] = useState<string[]>([])
  const logsEndRef = useRef<HTMLDivElement>(null)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [historyToDelete, setHistoryToDelete] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, name: "inventory_update_v3.csv", date: "2 hours ago", size: "1.2MB", status: "Completed", count: "1,245" },
    { id: 2, name: "inventory_update_v2.csv", date: "1 day ago", size: "1.1MB", status: "Completed", count: "850" },
    { id: 3, name: "inventory_update_v1.csv", date: "3 days ago", size: "980KB", status: "Completed", count: "1,100" },
  ])

  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false)

  useEffect(() => {
    const savedHistory = localStorage.getItem("upload_history")
    if (savedHistory) {
      try {
        setRecentUploads(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse upload history", e)
      }
    }
    setIsHistoryLoaded(true)
  }, [])

  useEffect(() => {
    if (isHistoryLoaded) {
      localStorage.setItem("upload_history", JSON.stringify(recentUploads))
    }
  }, [recentUploads, isHistoryLoaded])

  const [googleMerchantEnabled, setGoogleMerchantEnabled] = useState(true)
  const [autoSyncAfterUpload, setAutoSyncAfterUpload] = useState(true)
  const [lastGoogleSync, setLastGoogleSync] = useState("2024-01-15 10:30")

  const downloadTemplate = () => {
    const headers = templateColumns.map((col) => col.id)
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "brand_upload_template.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0])
    }
  }

  const handleUpload = (file: File) => {
    setIsUploading(true)
    setActiveTab("live-status")
    const totalRecords = uploadMode === "replace" ? 154 : 106524
    setUploadStats({
      total: totalRecords,
      processed: 0,
      success: 0,
      failed: 0,
      processing: 0,
      hold: 0,
      brokenLinks: 0,
      currentFile: file.name,
    })

    const initialLogs = [
      `[System] Initializing upload for ${file.name}...`,
      `[System] Mode: ${uploadMode === "replace" ? "REPLACE ALL (Clearing existing data)" : "APPEND / UPDATE (Merging with existing data)"}`,
      `[System] Validating CSV structure... OK`,
    ]
    setUploadLogs(initialLogs)

    const interval = setInterval(() => {
      setUploadStats((prev) => {
        const batchSize = Math.floor(Math.random() * 500) + 100
        const newProcessed = Math.min(prev.processed + batchSize, totalRecords)

        const processingNow = Math.floor(Math.random() * 200) + 50 // Simulate active processing
        const newFailures = Math.floor(Math.random() * 2)
        const newBrokenLinks = Math.random() > 0.7 ? 1 : 0
        const newHold = Math.random() > 0.8 ? 1 : 0

        const newSuccess = batchSize - newFailures - newHold

        const newLogs = []
        if (newProcessed % 2000 < batchSize) {
          newLogs.push(`[Processing] Batch ${Math.floor(newProcessed / 1000)}: Creating product pages...`)
        }
        if (newFailures > 0) {
          newLogs.push(`[Error] Row ${newProcessed - 5}: Missing SKU for line item. Skipped.`)
        }
        if (newBrokenLinks > 0) {
          newLogs.push(`[Warning] Row ${newProcessed - 2}: Image URL returned 404. Flagged as Broken Link.`)
        }
        if (newHold > 0) {
          newLogs.push(`[Hold] Row ${newProcessed - 1}: Price variance > 50%. Held for manual review.`)
        }

        if (newProcessed >= totalRecords) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            setRecentUploads([
              {
                id: Date.now(),
                name: file.name,
                date: "Just now",
                size: `${(file.size / 1024).toFixed(1)}KB`,
                status: "Completed",
                count: totalRecords.toLocaleString(),
              },
              ...recentUploads,
            ])
            toast.success(`Successfully uploaded ${totalRecords.toLocaleString()} products`)

            if (typeof window !== "undefined") {
              const newItems = []
              for (let i = 0; i < totalRecords; i++) {
                const id = (3000000 + i).toString()
                newItems.push({
                  id,
                  name: `Uploaded Item ${i + 1} - ${file.name.split(".")[0]}`,
                  sku: `UPL-${3000000 + i}`,
                  brand: brands[i % brands.length].name,
                  category: categories[i % categories.length].name,
                  stock: Math.floor(Math.random() * 100),
                  price: Math.floor(Math.random() * 200) + 20,
                  status: "active",
                  createdAt: new Date().toISOString().split("T")[0],
                  mileageOptions: [
                    { price: Math.floor(Math.random() * 200) + 20, availability: "In Stock", condition: "New" },
                  ],
                  images: ["/placeholder.svg?height=300&width=300"],
                  fitment: ["Universal"],
                  partNumber: `UPL-${3000000 + i}`,
                })
              }

              if (uploadMode === "replace") {
                localStorage.setItem("inventory_mode", "custom")
                localStorage.setItem("inventory_data", JSON.stringify(newItems))
                window.dispatchEvent(new Event("inventory_updated"))
              } else {
                const currentMode = localStorage.getItem("inventory_mode")
                if (currentMode === "custom") {
                  const existing = JSON.parse(localStorage.getItem("inventory_data") || "[]")
                  localStorage.setItem("inventory_data", JSON.stringify([...existing, ...newItems]))
                } else {
                  localStorage.setItem("inventory_mode", "custom")
                  localStorage.setItem("inventory_data", JSON.stringify(newItems))
                }
              }
            }

            if (autoSyncAfterUpload && googleMerchantEnabled) {
              setTimeout(() => {
                toast.info("Auto-syncing to Google Merchant Center...")
                setTimeout(() => {
                  setLastGoogleSync(new Date().toLocaleString())
                  toast.success(
                    uploadMode === "replace" ? "Full catalog replaced and synced" : "Catalog updated and synced",
                  )
                }, 2000)
              }, 1000)
            }
          }, 1000)
        }

        setUploadLogs((prevLogs) => [...prevLogs, ...newLogs].slice(-50))

        return {
          ...prev,
          processed: newProcessed,
          success: prev.success + newSuccess,
          failed: prev.failed + newFailures,
          processing: newProcessed >= totalRecords ? 0 : processingNow,
          hold: prev.hold + newHold,
          brokenLinks: prev.brokenLinks + newBrokenLinks,
        }
      })
    }, 100)
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }

  const handleDeleteHistory = (id: number) => {
    setHistoryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleClearAllHistory = () => {
    setHistoryToDelete(-1)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (historyToDelete === -1) {
      setRecentUploads([])
      toast.success("Upload history cleared")
    } else if (historyToDelete) {
      setRecentUploads(recentUploads.filter((u) => u.id !== historyToDelete))
      toast.success("History entry deleted")
    }
    setDeleteDialogOpen(false)
    setHistoryToDelete(null)
  }

  const handleManualGoogleSync = () => {
    toast.info("Syncing all products to Google Merchant Center...")
    setTimeout(() => {
      setLastGoogleSync(new Date().toLocaleString())
      toast.success("Successfully synced 106,529 products to Google Merchant Center")
    }, 2000)
  }

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [uploadLogs])

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bulk Product Upload</h1>
          <p className="text-white/60">Upload and manage large product catalogs via CSV or Excel.</p>
        </div>
        <Button
          variant="outline"
          className="border-white/10 hover:bg-white/5 bg-transparent"
          onClick={downloadTemplate}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Download Template
        </Button>
      </div>

      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-neutral-900 border border-white/10 p-1 mb-6">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white px-6 py-2"
          >
            <Upload className="mr-2 h-4 w-4" /> Product Upload
          </TabsTrigger>
          <TabsTrigger
            value="live-status"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white px-6 py-2"
          >
            <Activity className="mr-2 h-4 w-4" /> Live Data Status
          </TabsTrigger>
          <TabsTrigger
            value="guidelines"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-2"
          >
            <BookOpen className="mr-2 h-4 w-4" /> Guidelines Editor
          </TabsTrigger>
          <TabsTrigger
            value="google-merchant"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Google Merchant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card className="bg-neutral-900 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Template Data Structure</CardTitle>
                  <div className="flex gap-2">
                    {showPreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddingColumn(!isAddingColumn)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Column
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-white/60 hover:text-white"
                    >
                      <Eye className="mr-2 h-4 w-4" /> {showPreview ? "Hide" : "Show"} Preview
                    </Button>
                  </div>
                </CardHeader>
                {showPreview && (
                  <CardContent>
                    {isAddingColumn && (
                      <div className="flex items-center gap-2 mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <Input
                          placeholder="Column Name (e.g. Manufacturer ID)"
                          value={newColumnName}
                          onChange={(e) => setNewColumnName(e.target.value)}
                          className="bg-black/50 border-white/10"
                        />
                        <Button size="sm" onClick={handleAddColumn} className="bg-green-600 hover:bg-green-700">
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsAddingColumn(false)}
                          className="hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                            {templateColumns.map((col, i) => (
                              <TableHead key={col.id} className="text-white/60 min-w-[150px] group">
                                <div className="flex items-center justify-between">
                                  <span>{col.label}</span>
                                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleMoveColumn(i, "left")}
                                      disabled={i === 0}
                                      className="p-1 hover:text-white disabled:opacity-30"
                                    >
                                      <ArrowLeft className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => handleMoveColumn(i, "right")}
                                      disabled={i === templateColumns.length - 1}
                                      className="p-1 hover:text-white disabled:opacity-30"
                                    >
                                      <ArrowRight className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteColumn(i)}
                                      className="p-1 hover:text-red-400 text-white/40"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {previewData.map((row, i) => (
                            <TableRow key={i} className="border-white/10 hover:bg-white/5">
                              {templateColumns.map((col) => (
                                <TableCell key={col.id} className="text-white/80">
                                  {/* @ts-ignore */}
                                  <span className="truncate block max-w-[200px]">{row[col.id] || "-"}</span>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text-xs text-white/40 mt-4">
                      * Showing first 5 records from system template. Ensure your CSV matches this structure.
                    </p>
                  </CardContent>
                )}
              </Card>

              {!isUploading && (
                <Card className="bg-neutral-900 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue="append"
                      value={uploadMode}
                      onValueChange={setUploadMode}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="append" id="append" className="peer sr-only" />
                        <Label
                          htmlFor="append"
                          className="flex flex-col items-start justify-between rounded-md border-2 border-white/10 bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                        >
                          <span className="text-base font-semibold text-white">Update & Append</span>
                          <span className="text-sm font-normal text-white/60 mt-1">
                            Updates existing products by ID and adds new ones. Safe for daily updates.
                          </span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="replace" id="replace" className="peer sr-only" />
                        <Label
                          htmlFor="replace"
                          className="flex flex-col items-start justify-between rounded-md border-2 border-white/10 bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-red-500 [&:has([data-state=checked])]:border-red-500 cursor-pointer"
                        >
                          <span className="text-base font-semibold text-white">Replace All</span>
                          <span className="text-sm font-normal text-white/60 mt-1">
                            Deletes ALL current inventory and replaces it with this file. Use for full resets.
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {isUploading ? (
                <Card className="bg-neutral-900 border-white/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span>Uploading {uploadStats.currentFile}</span>
                      <span className="text-sm font-normal text-white/60">
                        {Math.round((uploadStats.processed / uploadStats.total) * 100)}% Complete
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Progress value={(uploadStats.processed / uploadStats.total) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-white/40">
                        <span>Started: Just now</span>
                        <span>
                          Est. Remaining: {Math.max(0, Math.ceil((uploadStats.total - uploadStats.processed) / 4500))}s
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-xs text-white/40 mb-1">Total Records</div>
                        <div className="text-xl font-bold">{uploadStats.total.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="text-xs text-green-400 mb-1">Successful</div>
                        <div className="text-xl font-bold text-green-500">{uploadStats.success.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="text-xs text-red-400 mb-1">Failed</div>
                        <div className="text-xl font-bold text-red-500">{uploadStats.failed.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="text-xs text-blue-400 mb-1">Pages Created</div>
                        <div className="text-xl font-bold text-blue-500">{uploadStats.success.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Live System Logs
                      </div>
                      <ScrollArea className="h-[200px] w-full rounded-md border border-white/10 bg-black/50 p-4 font-mono text-xs">
                        {uploadLogs.map((log, index) => (
                          <div
                            key={index}
                            className={`mb-1 ${log.includes("Error") ? "text-red-400" : "text-white/60"}`}
                          >
                            <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()}</span>
                            {log}
                          </div>
                        ))}
                        <div ref={logsEndRef} />
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className={`bg-neutral-900 border-2 border-dashed transition-colors ${dragActive ? "border-blue-500 bg-blue-500/5" : "border-white/10"}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".csv,.xls,.xlsx"
                      onChange={handleFileSelect}
                    />
                    <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <Upload className="h-10 w-10 text-white/40" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Drag and drop your file here</h3>
                    <p className="text-white/60 mb-8 max-w-sm">
                      Support for .csv, .xls, and .xlsx files. Maximum file size 50MB.
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={onButtonClick}>
                      Browse Files
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-neutral-900 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Uploads</CardTitle>
                  {recentUploads.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/40 hover:text-red-400 hover:bg-red-500/10"
                      onClick={handleClearAllHistory}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Clear History
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {recentUploads.length > 0 ? (
                    <div className="space-y-4">
                      {recentUploads.map((upload) => (
                        <div
                          key={upload.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <FileSpreadsheet className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <div className="font-medium">{upload.name}</div>
                              <div className="text-xs text-white/40">
                                Uploaded {upload.date} • {upload.size}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-green-500">{upload.status}</div>
                              <div className="text-xs text-white/40">{upload.count} items processed</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-white/20 hover:text-red-500 hover:bg-red-500/10"
                              onClick={() => handleDeleteHistory(upload.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-white/40">
                      <FileSpreadsheet className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No upload history found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-neutral-900 border-white/10">
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {publishedGuidelines.map((step, index) => (
                    <div className="flex gap-3" key={index}>
                      <div className="mt-1">
                        <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{step.title}</h4>
                        <p className="text-xs text-white/60 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-orange-500/10 border-orange-500/20">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-orange-500">Important Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-300/80">
                    Large uploads may take several minutes. Do not close this page until the upload is complete.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="live-status" className="space-y-8">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader className="border-b border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Activity className="h-6 w-6 text-green-500" />
                    Live Data Screener
                  </CardTitle>
                  <p className="text-white/60 mt-2">
                    Real-time monitoring of data ingestion, validation, and processing queues.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <div className="text-sm text-white/40">Current File</div>
                    <div className="font-mono font-bold text-lg">{uploadStats.currentFile || "No active upload"}</div>
                  </div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="text-right">
                    <div className="text-sm text-white/40">System Status</div>
                    <div
                      className={`flex items-center gap-2 font-bold ${isUploading ? "text-green-500" : "text-neutral-500"}`}
                    >
                      <span className="relative flex h-3 w-3">
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 ${isUploading ? "" : "hidden"}`}
                        ></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      {isUploading ? "PROCESSING" : "IDLE"}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              {/* Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-400 font-medium">Integrated</span>
                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{uploadStats.success.toLocaleString()}</div>
                  <Progress
                    value={(uploadStats.success / (uploadStats.total || 1)) * 100}
                    className="h-1 bg-blue-950"
                  />
                  <div className="text-xs text-blue-300 mt-2">Successfully live on site</div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 font-medium">Processing</span>
                    <Server className={`h-5 w-5 text-yellow-500 ${isUploading ? "animate-pulse" : ""}`} />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{uploadStats.processing.toLocaleString()}</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500/20">
                    <div className="h-full bg-yellow-500 animate-progress-indeterminate w-1/3"></div>
                  </div>
                  <div className="text-xs text-yellow-300 mt-2">Currently in batch queue</div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-orange-400 font-medium">On Hold</span>
                    <PauseCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{uploadStats.hold.toLocaleString()}</div>
                  <div className="text-xs text-orange-300 mt-2">Validation required</div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-red-400 font-medium">Broken Links</span>
                    <LinkIcon className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{uploadStats.brokenLinks.toLocaleString()}</div>
                  <div className="text-xs text-red-300 mt-2">Images or external URLs 404</div>
                </div>
              </div>

              {/* Detailed Progress Section */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-black/40 rounded-lg border border-white/5 p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-white/60" /> Live Data Stream
                    </h3>
                    <ScrollArea className="h-[300px] w-full font-mono text-xs space-y-1 pr-4">
                      {uploadLogs.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-white/20">
                          Waiting for data stream...
                        </div>
                      ) : (
                        uploadLogs.map((log, index) => (
                          <div
                            key={index}
                            className={`py-1 border-b border-white/5 last:border-0 ${
                              log.includes("Error")
                                ? "text-red-400"
                                : log.includes("Warning")
                                  ? "text-orange-400"
                                  : log.includes("Hold")
                                    ? "text-yellow-400"
                                    : "text-white/60"
                            }`}
                          >
                            <span className="opacity-30 mr-3 inline-block w-[80px]">
                              {new Date().toLocaleTimeString()}
                            </span>
                            {log}
                          </div>
                        ))
                      )}
                      <div ref={logsEndRef} />
                    </ScrollArea>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6 border border-white/5">
                    <h3 className="text-sm font-bold text-white/80 mb-4 uppercase tracking-wider">Queue Health</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Success Rate</span>
                          <span className="text-green-400">
                            {uploadStats.processed > 0
                              ? ((uploadStats.success / uploadStats.processed) * 100).toFixed(1)
                              : 0}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(uploadStats.success / (uploadStats.processed || 1)) * 100}
                          className="h-1.5 bg-neutral-700"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Data Integrity</span>
                          <span className="text-blue-400">98.2%</span>
                        </div>
                        <Progress value={98} className="h-1.5 bg-neutral-700" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">API Latency</span>
                          <span className="text-yellow-400">45ms</span>
                        </div>
                        <Progress value={30} className="h-1.5 bg-neutral-700" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6 border border-white/5">
                    <h3 className="text-sm font-bold text-white/80 mb-4 uppercase tracking-wider">Active Nodes</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((node) => (
                        <div key={node} className="bg-black/40 p-2 rounded flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${isUploading ? "bg-green-500 animate-pulse" : "bg-neutral-600"}`}
                          ></div>
                          <span className="text-xs text-white/60">Node 0{node}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Edit Upload Guidelines</CardTitle>
                <p className="text-white/60 text-sm mt-2">
                  Customize the instructions shown to users during the upload process.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetDraft}
                  disabled={!hasUnsavedChanges}
                  className="border-white/10 hover:bg-white/5 bg-transparent"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button onClick={handlePublishGuidelines} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="mr-2 h-4 w-4" /> Publish Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {draftGuidelines.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5 relative group">
                  <div className="mt-2">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid gap-2">
                      <Label>Step Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => handleSaveDraftGuideline(index, "title", e.target.value)}
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Description</Label>
                      <Textarea
                        value={step.description}
                        onChange={(e) => handleSaveDraftGuideline(index, "description", e.target.value)}
                        className="bg-black/50 border-white/10"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white/20 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => handleRemoveGuidelineStep(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={handleAddGuidelineStep}
                className="w-full border-dashed border-white/20 hover:bg-white/5 bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Step
              </Button>

              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-sm text-blue-300">
                <span className="font-bold">Note:</span> Changes made here will not appear on the "Product Upload" page
                until you click <strong>Publish Changes</strong>.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="google-merchant" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Google Merchant Center Sync</CardTitle>
                  <p className="text-white/60 text-sm mt-2">
                    Configure automatic syncing of uploaded products to Google Merchant Center for Shopping ads.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${googleMerchantEnabled ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                    />
                    <span className="text-sm text-white/60">{googleMerchantEnabled ? "Active" : "Inactive"}</span>
                  </div>
                  <Button
                    onClick={() => setGoogleMerchantEnabled(!googleMerchantEnabled)}
                    variant={googleMerchantEnabled ? "destructive" : "default"}
                    className={
                      googleMerchantEnabled ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    {googleMerchantEnabled ? "Disable Sync" : "Enable Sync"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {googleMerchantEnabled && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-blue-500/10 border-blue-500/20">
                      <CardContent className="pt-6">
                        <div className="text-sm text-blue-400 mb-1">Total Products</div>
                        <div className="text-3xl font-bold text-blue-500">106,529</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-500/10 border-green-500/20">
                      <CardContent className="pt-6">
                        <div className="text-sm text-green-400 mb-1">Status</div>
                        <div className="text-xl font-bold text-green-500">Synced</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-500/10 border-purple-500/20">
                      <CardContent className="pt-6">
                        <div className="text-sm text-purple-400 mb-1">Last Sync</div>
                        <div className="text-sm font-medium text-purple-500">{lastGoogleSync}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-b border-white/10 pb-2">Sync Settings</h3>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="autoSyncAfterUpload"
                          checked={autoSyncAfterUpload}
                          onChange={(e) => setAutoSyncAfterUpload(e.target.checked)}
                          className="h-4 w-4 rounded border-white/20 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <label htmlFor="autoSyncAfterUpload" className="font-medium cursor-pointer">
                            Auto-Sync After Upload
                          </label>
                          <p className="text-xs text-white/50">
                            Automatically push newly uploaded products to Google Merchant Center.
                          </p>
                        </div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>

                    <Card className="bg-blue-500/10 border-blue-500/20">
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <ShoppingBag className="h-6 w-6 text-blue-400 mt-1" />
                          <div>
                            <h4 className="font-bold text-blue-400 mb-1">Feed Configuration</h4>
                            <p className="text-sm text-blue-300/80 mb-3">
                              All uploaded products are automatically included in your Google Merchant feed. The feed
                              URL is generated automatically and updated in real-time.
                            </p>
                            <div className="p-3 bg-black/30 rounded-lg font-mono text-xs text-blue-200 break-all">
                              https://autoparts.world/feed/google-merchant.xml
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="text-sm text-white/60">
                        Sync all 106,529 products to Google Merchant Center now.
                      </div>
                      <Button onClick={handleManualGoogleSync} className="bg-blue-600 hover:bg-blue-700">
                        <ShoppingBag className="mr-2 h-4 w-4" /> Manual Sync
                      </Button>
                    </div>
                  </div>

                  <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-bold text-green-400 mb-1">Integration Active</h4>
                          <p className="text-sm text-green-300/80">
                            Your products are being automatically synced to Google Merchant Center. New uploads will be
                            pushed immediately if auto-sync is enabled.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!googleMerchantEnabled && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-white/40" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Google Merchant Sync is Disabled</h3>
                  <p className="text-white/60 mb-6 max-w-md mx-auto">
                    Enable Google Merchant Center integration to automatically sync all uploaded products and appear in
                    Google Shopping results.
                  </p>
                  <Button onClick={() => setGoogleMerchantEnabled(true)} className="bg-green-600 hover:bg-green-700">
                    Enable Integration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent className="bg-neutral-900 border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/60">
                {historyToDelete === -1
                  ? "This will permanently delete all upload history. This action cannot be undone."
                  : "This will permanently delete this upload history entry. This action cannot be undone."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/5 text-white hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white border-0">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  )
}
