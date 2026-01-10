"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Package,
  Truck,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Shield,
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ImageIcon,
  MessageSquare,
  Send,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TeamNote {
  id: string
  team: string
  agent: string
  message: string
  timestamp: string
  isCustomerVisible: boolean
  attachments?: { name: string; url: string; type: string }[]
}

interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadedBy: string
  uploadedByType: "team" | "customer"
  team?: string
  timestamp: string
  category: string
}

interface OrderData {
  id: string
  orderNumber: string
  status: string
  teamStatuses: Record<string, string>
  currentTeam: string
  completedTeams: string[]
  product: {
    year: string
    make: string
    model: string
    part: string
    spec: string
    image: string
  }
  customer: {
    name: string
    email: string
    phone: string
    business: string
    type: string
    leadSource: string
  }
  shipping: {
    address: string
    city: string
    state: string
    zip: string
    unloadingEquip: boolean
  }
  pricing: {
    sellingPrice: number
    costPrice: number
    taxExtra: number
    payment: string
    chargedVia: string
  }
  orderDetails: {
    saleDate: string
    warranty: string
    milesPromised: string
    saleBy: string
    invoiceBy: string
  }
  yard: {
    name: string
    address: string
    contact: string
    phone: string
    poStatus: string
    yardCharge: number
  }
  tracking: {
    trackingNumber: string
    carrier: string
    eta: string
    bol: string
    invoiceSent: boolean
  }
  notes: TeamNote[]
  documents: Document[]
  flags: string[]
  createdAt: string
  updatedAt: string
}

const STATUS_STEPS = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
]

export default function CustomerOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [newMessage, setNewMessage] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadCategory, setUploadCategory] = useState("photos")

  // Load order data - syncs with admin
  useEffect(() => {
    const loadOrder = () => {
      // First try customer-specific storage, then admin storage
      const stored = localStorage.getItem(`customer_order_${orderId}`) || localStorage.getItem(`order_${orderId}`)
      if (stored) {
        setOrder(JSON.parse(stored))
      }
      setLoading(false)
    }

    loadOrder()

    // Poll for updates from admin (simulating real-time sync)
    const interval = setInterval(() => {
      const stored = localStorage.getItem(`customer_order_${orderId}`) || localStorage.getItem(`order_${orderId}`)
      if (stored) {
        setOrder(JSON.parse(stored))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId])

  // Save order (syncs to admin)
  const saveOrder = (updatedOrder: OrderData) => {
    updatedOrder.updatedAt = new Date().toISOString()
    setOrder(updatedOrder)
    localStorage.setItem(`customer_order_${orderId}`, JSON.stringify(updatedOrder))
    localStorage.setItem(`order_${orderId}`, JSON.stringify(updatedOrder))
  }

  // Add customer message
  const addMessage = () => {
    if (!newMessage.trim() || !order) return

    const note: TeamNote = {
      id: Date.now().toString(),
      team: "customer",
      agent: order.customer.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isCustomerVisible: true,
    }

    const updatedOrder = {
      ...order,
      notes: [...order.notes, note],
    }
    saveOrder(updatedOrder)
    setNewMessage("")
  }

  // Upload document
  const uploadDocument = (file: File) => {
    if (!order) return

    const doc: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "document",
      url: URL.createObjectURL(file),
      uploadedBy: order.customer.name,
      uploadedByType: "customer",
      timestamp: new Date().toISOString(),
      category: uploadCategory,
    }

    const updatedOrder = {
      ...order,
      documents: [...order.documents, doc],
    }
    saveOrder(updatedOrder)
    setUploadDialogOpen(false)
  }

  // Get current status step
  const getCurrentStep = () => {
    const statusMap: Record<string, number> = {
      Pending: 0,
      Processing: 1,
      Shipped: 2,
      "Out for Delivery": 3,
      Delivered: 4,
    }
    return statusMap[order?.status || ""] || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-4">
        <AlertTriangle className="h-16 w-16 text-amber-500" />
        <h1 className="text-2xl font-bold text-foreground">Order Not Found</h1>
        <p className="text-muted-foreground text-center">
          This order doesn't exist or you don't have access to view it.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/account")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            My Account
          </Button>
          <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  const currentStep = getCurrentStep()
  const visibleNotes = order.notes.filter((n) => n.isCustomerVisible)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/account")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{order.orderNumber}</h1>
                <p className="text-sm text-muted-foreground">Placed on {order.orderDetails.saleDate}</p>
              </div>
            </div>
            <Badge
              className={
                order.status === "Delivered"
                  ? "bg-emerald-500"
                  : order.status === "Shipped"
                    ? "bg-blue-500"
                    : order.status === "Processing"
                      ? "bg-amber-500"
                      : "bg-muted"
              }
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {STATUS_STEPS.map((step, idx) => {
              const Icon = step.icon
              const isComplete = idx <= currentStep
              const isCurrent = idx === currentStep

              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    {idx > 0 && <div className={`h-1 flex-1 ${idx <= currentStep ? "bg-emerald-500" : "bg-muted"}`} />}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isComplete ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-emerald-500/30" : ""}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {idx < STATUS_STEPS.length - 1 && (
                      <div className={`h-1 flex-1 ${idx < currentStep ? "bg-emerald-500" : "bg-muted"}`} />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${isComplete ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "tracking", label: "Tracking" },
              { id: "messages", label: "Messages", count: visibleNotes.length },
              { id: "documents", label: "Documents", count: order.documents.length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id ? "bg-red-500/20 text-red-400" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product */}
            <div className="bg-card rounded-xl border border-border p-4 md:col-span-2">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-red-500" />
                Order Item
              </h3>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground">
                    {order.product.year} {order.product.make} {order.product.model}
                  </h4>
                  <p className="text-muted-foreground">
                    {order.product.part} - {order.product.spec}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                      <Shield className="h-3 w-3 mr-1" />
                      {order.orderDetails.warranty} Warranty
                    </Badge>
                    <span className="text-muted-foreground text-sm">{order.orderDetails.milesPromised} Miles</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">${order.pricing.sellingPrice.toLocaleString()}</p>
                  <Badge className={order.pricing.payment === "PAID" ? "bg-emerald-500" : "bg-amber-500"}>
                    {order.pricing.payment}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Shipping Address
              </h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.shipping.address}</p>
                <p className="text-muted-foreground">
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                </p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                Payment Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${order.pricing.sellingPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax & Fees</span>
                  <span className="text-foreground">${order.pricing.taxExtra}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">
                    ${(order.pricing.sellingPrice + order.pricing.taxExtra).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === "tracking" && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              Shipping Information
            </h3>

            {order.tracking.trackingNumber ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Tracking Number</p>
                    <p className="font-medium text-foreground">{order.tracking.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Carrier</p>
                    <p className="font-medium text-foreground">{order.tracking.carrier}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ETA</p>
                    <p className="font-medium text-foreground">{order.tracking.eta || "Calculating..."}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">BOL</p>
                    <p className="font-medium text-foreground">{order.tracking.bol || "-"}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Truck className="h-4 w-4 mr-2" />
                  Track Package
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Tracking information will be available once your order ships.</p>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              Order Updates & Messages
            </h3>

            {/* Messages List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
              {visibleNotes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No messages yet</p>
                </div>
              ) : (
                visibleNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg ${
                      note.team === "customer"
                        ? "bg-red-500/10 border border-red-500/30 ml-8"
                        : "bg-muted/50 border border-border mr-8"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {note.team === "customer"
                          ? "You"
                          : `AUW ${note.team.charAt(0).toUpperCase() + note.team.slice(1)} Team`}
                      </span>
                      <span className="text-xs text-muted-foreground">{new Date(note.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-foreground">{note.message}</p>
                  </div>
                ))
              )}
            </div>

            {/* Send Message */}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && addMessage()}
              />
              <Button onClick={addMessage} className="bg-red-600 hover:bg-red-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                Documents & Photos
              </h3>
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>Upload photos or documents related to your order.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={uploadCategory} onValueChange={setUploadCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="photos">Product Photos</SelectItem>
                          <SelectItem value="damage">Damage Report</SelectItem>
                          <SelectItem value="receipt">Receipt/Proof</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>File</Label>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) uploadDocument(file)
                        }}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Documents List */}
            <div className="space-y-2">
              {order.documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No documents available</p>
                </div>
              ) : (
                order.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {doc.type === "image" ? (
                        <ImageIcon className="h-8 w-8 text-blue-400" />
                      ) : (
                        <FileText className="h-8 w-8 text-amber-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                          <span>{doc.uploadedByType === "customer" ? "You" : "AUW Team"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Need Help Section */}
        <div className="mt-6 bg-card rounded-xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call 1-800-528-9978
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/returns">Return Policy</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/warranty">Warranty Info</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
