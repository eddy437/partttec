"use client"

import type React from "react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Mail,
  Phone,
  Send,
  FileText,
  Truck,
  Package,
  ChevronUp,
  ChevronDown,
  Upload,
  DollarSign,
  MapPin,
  User,
  Building2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MessageSquare,
  FileUp,
  Download,
  Eye,
  CreditCard,
  Receipt,
  History,
  RefreshCw,
  ShoppingCart,
  Headphones,
  Lock,
  Edit2,
  Save,
  X,
  Users,
} from "lucide-react"
import { toast } from "sonner"

const TEAMS = [
  {
    id: "sales",
    name: "Sales",
    icon: ShoppingCart,
    color: "emerald",
    description: "Lead conversion & order processing",
  },
  { id: "support", name: "Support", icon: Headphones, color: "blue", description: "Customer issues & communication" },
  { id: "buying", name: "Buying", icon: Building2, color: "purple", description: "Vendor PO & sourcing" },
  { id: "shipping", name: "Shipping", icon: Truck, color: "amber", description: "Tracking & delivery" },
  { id: "billing", name: "Billing", icon: CreditCard, color: "red", description: "Payments & disputes" },
]

const TEAM_STATUSES: Record<string, string[]> = {
  sales: ["New", "Contacted", "Quote Sent", "Negotiating", "Converted", "Lost"],
  support: ["Open", "In Progress", "Waiting Customer", "Escalated", "Resolved"],
  buying: ["PO Pending", "PO Sent", "Confirmed", "Backordered", "Received"],
  shipping: ["Pending Pickup", "Picked Up", "In Transit", "Out for Delivery", "Delivered"],
  billing: ["Pending", "Paid", "Partial", "Refund Requested", "Refunded", "Chargeback"],
}

interface OrderDocument {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
  uploadedBy: string
  uploadedByType: "team" | "customer"
  category: "invoice" | "delivery" | "tracking" | "chargeback" | "communication" | "photos" | "other"
}

interface OrderNote {
  id: string
  text: string
  author: string
  timestamp: string
  type: "note" | "system" | "customer"
  team?: string
  isCustomerVisible: boolean
}

interface OrderTimeline {
  id: string
  action: string
  description: string
  timestamp: string
  agent: string
  type: "status" | "communication" | "document" | "payment" | "shipping" | "team_transfer"
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params?.id as string
  const [order, setOrder] = useState<any>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [activeTeam, setActiveTeam] = useState("sales")
  const [newNote, setNewNote] = useState("")
  const [noteVisibleToCustomer, setNoteVisibleToCustomer] = useState(true)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [lastSync, setLastSync] = useState(new Date())
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentAgent = "Admin User"

  // Demo order data
  const demoOrder = {
    id: orderId,
    orderNumber: `PC#${orderId?.replace(/\D/g, "").slice(0, 5) || "10525"}`,
    status: "pending",
    createdAt: "2025-11-25T10:30:00Z",
    currentTeam: "sales",
    completedTeams: [] as string[],
    teamStatuses: {
      sales: "New",
      support: "Open",
      buying: "PO Pending",
      shipping: "Pending Pickup",
      billing: "Pending",
    },
    product: {
      year: "2020",
      make: "Toyota",
      model: "Camry",
      part: "Transmission",
      spec: "CVT, 2.5L",
      sku: "TOY-CAM-2020-TRANS-CVT",
      image: "/toyota-engine.jpg",
    },
    customer: {
      name: "John's Garage",
      email: "john@johnsgarage.net",
      phone: "(312) 555-9876",
      leadSource: "Website",
      type: "Commercial",
      business: "John's Garage",
    },
    shipping: {
      address: "789 Oak Ave",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      business: "John's Garage",
      type: "Commercial",
      unloadingEquip: false,
    },
    pricing: {
      sellingPrice: 1850,
      costPrice: 1200,
      taxExtra: 148,
      shipping: 0,
      total: 1998,
      payment: "pending",
      chargedVia: null,
      paymentMethod: null,
    },
    details: {
      saleDate: "11/25/2025",
      warranty: "90 Days",
      milesPromised: "38K",
      saleBy: "Ben",
      invoiceBy: null,
    },
    yard: {
      name: "Midwest Auto Parts",
      address: "4321 Industrial Blvd, Indianapolis, IN 46201",
      contact: "Steve Brown",
      phone: "3175551234",
      poStatus: "Pending",
      yardCharge: 0,
    },
    tracking: {
      trackingNumber: null,
      carrier: null,
      eta: null,
      bol: null,
      invoiceSent: false,
    },
    notes: [
      {
        id: "1",
        text: "Waiting for customer payment confirmation.",
        author: "System",
        timestamp: "2025-11-25T10:30:00Z",
        type: "system",
        team: "sales",
        isCustomerVisible: true,
      },
    ] as OrderNote[],
    documents: [] as OrderDocument[],
    timeline: [
      {
        id: "1",
        action: "Order Created",
        description: "Order placed via website",
        timestamp: "2025-11-25T10:30:00Z",
        agent: "System",
        type: "status",
      },
    ] as OrderTimeline[],
    flags: {
      isDispute: false,
      isChargeback: false,
      isReturn: false,
      isPriority: false,
      isRedFlag: false,
    },
  }

  useEffect(() => {
    const loadOrder = () => {
      const stored = localStorage.getItem(`order_${orderId}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure team fields exist
        if (!parsed.currentTeam) parsed.currentTeam = "sales"
        if (!parsed.completedTeams) parsed.completedTeams = []
        if (!parsed.teamStatuses) parsed.teamStatuses = demoOrder.teamStatuses
        setOrder(parsed)
        setActiveTeam(parsed.currentTeam)
      } else {
        setOrder(demoOrder)
        localStorage.setItem(`order_${orderId}`, JSON.stringify(demoOrder))
      }
    }

    loadOrder()

    // Poll for sync with customer portal
    const interval = setInterval(() => {
      loadOrder()
      setLastSync(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [orderId])

  const saveOrder = (updatedOrder: any) => {
    updatedOrder.updatedAt = new Date().toISOString()
    localStorage.setItem(`order_${orderId}`, JSON.stringify(updatedOrder))
    // Also save to customer-visible storage
    localStorage.setItem(`customer_order_${orderId}`, JSON.stringify(updatedOrder))
    setOrder(updatedOrder)
  }

  const isTeamCompleted = (teamId: string) => order?.completedTeams?.includes(teamId)

  const isTeamLocked = (teamId: string) => {
    if (!order) return true
    const teamIndex = TEAMS.findIndex((t) => t.id === teamId)
    const currentIndex = TEAMS.findIndex((t) => t.id === order.currentTeam)
    return teamIndex > currentIndex && !isTeamCompleted(teamId)
  }

  const updateTeamStatus = (team: string, status: string) => {
    if (!order) return
    const updatedOrder = {
      ...order,
      teamStatuses: { ...order.teamStatuses, [team]: status },
    }
    const timeline: OrderTimeline = {
      id: Date.now().toString(),
      action: `${team.charAt(0).toUpperCase() + team.slice(1)} Status Updated`,
      description: `Status changed to ${status}`,
      timestamp: new Date().toISOString(),
      agent: currentAgent,
      type: "status",
    }
    updatedOrder.timeline = [...updatedOrder.timeline, timeline]
    saveOrder(updatedOrder)
    toast.success(`${team} status updated to ${status}`)
  }

  const completeTeamWork = () => {
    if (!order) return
    const teamIndex = TEAMS.findIndex((t) => t.id === activeTeam)
    const nextTeam = TEAMS[teamIndex + 1]

    const updatedOrder = {
      ...order,
      completedTeams: [...order.completedTeams, activeTeam],
      currentTeam: nextTeam?.id || activeTeam,
    }

    const timeline: OrderTimeline = {
      id: Date.now().toString(),
      action: "Team Work Completed",
      description: `${TEAMS[teamIndex].name} team completed. ${nextTeam ? `Transferred to ${nextTeam.name} team.` : "All teams completed."}`,
      timestamp: new Date().toISOString(),
      agent: currentAgent,
      type: "team_transfer",
    }
    updatedOrder.timeline = [...updatedOrder.timeline, timeline]

    // Add customer-visible note
    const note: OrderNote = {
      id: Date.now().toString(),
      text: `Order ${nextTeam ? `moved to ${nextTeam.name.toLowerCase()} stage` : "processing completed"}.`,
      author: "System",
      timestamp: new Date().toISOString(),
      type: "system",
      team: activeTeam,
      isCustomerVisible: true,
    }
    updatedOrder.notes = [...updatedOrder.notes, note]

    saveOrder(updatedOrder)
    if (nextTeam) setActiveTeam(nextTeam.id)
    toast.success(`Transferred to ${nextTeam?.name || "completed"}`)
  }

  const startEdit = (section: string, data: any) => {
    setEditingSection(section)
    setEditData({ ...data })
  }

  const saveEdit = (section: string) => {
    if (!order) return
    const updatedOrder = { ...order }

    switch (section) {
      case "customer":
        updatedOrder.customer = { ...order.customer, ...editData }
        break
      case "shipping":
        updatedOrder.shipping = { ...order.shipping, ...editData }
        break
      case "pricing":
        updatedOrder.pricing = { ...order.pricing, ...editData }
        break
      case "details":
        updatedOrder.details = { ...order.details, ...editData }
        break
      case "yard":
        updatedOrder.yard = { ...order.yard, ...editData }
        break
      case "tracking":
        updatedOrder.tracking = { ...order.tracking, ...editData }
        break
    }

    const timeline: OrderTimeline = {
      id: Date.now().toString(),
      action: `${section.charAt(0).toUpperCase() + section.slice(1)} Updated`,
      description: `${section} information was edited`,
      timestamp: new Date().toISOString(),
      agent: currentAgent,
      type: "status",
    }
    updatedOrder.timeline = [...updatedOrder.timeline, timeline]

    saveOrder(updatedOrder)
    setEditingSection(null)
    setEditData({})
    toast.success(`${section} updated`)
  }

  const cancelEdit = () => {
    setEditingSection(null)
    setEditData({})
  }

  const updateStatus = (newStatus: string) => {
    const timeline: OrderTimeline = {
      id: Date.now().toString(),
      action: "Status Updated",
      description: `Status changed from ${order.status} to ${newStatus}`,
      timestamp: new Date().toISOString(),
      agent: currentAgent,
      type: "status",
    }
    const updatedOrder = {
      ...order,
      status: newStatus,
      timeline: [...order.timeline, timeline],
    }
    saveOrder(updatedOrder)
    setShowStatusDropdown(false)
    toast.success(`Status updated to ${newStatus}`)
  }

  const addNote = () => {
    if (!newNote.trim()) return
    const note: OrderNote = {
      id: Date.now().toString(),
      text: newNote,
      author: currentAgent,
      timestamp: new Date().toISOString(),
      type: "note",
      team: activeTeam,
      isCustomerVisible: noteVisibleToCustomer,
    }
    const updatedOrder = { ...order, notes: [...order.notes, note] }
    saveOrder(updatedOrder)
    setNewNote("")
    toast.success(noteVisibleToCustomer ? "Note added (visible to customer)" : "Note added (internal only)")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, category: OrderDocument["category"]) => {
    const file = e.target.files?.[0]
    if (!file) return

    const doc: OrderDocument = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      uploadedBy: currentAgent,
      uploadedByType: "team",
      category,
    }

    const timeline: OrderTimeline = {
      id: Date.now().toString(),
      action: "Document Uploaded",
      description: `${file.name} uploaded to ${category}`,
      timestamp: new Date().toISOString(),
      agent: currentAgent,
      type: "document",
    }

    const updatedOrder = {
      ...order,
      documents: [...order.documents, doc],
      timeline: [...order.timeline, timeline],
    }
    saveOrder(updatedOrder)
    toast.success("Document uploaded")
  }

  const handleAction = (action: string) => {
    const timeline: OrderTimeline = {
      id: Date.now().toString(),
      action: action,
      description: `${action} action performed`,
      timestamp: new Date().toISOString(),
      agent: currentAgent,
      type:
        action.includes("Email") || action.includes("Call")
          ? "communication"
          : action.includes("Invoice") || action.includes("Payment")
            ? "payment"
            : action.includes("Tracking") || action.includes("PO")
              ? "shipping"
              : "status",
    }
    const updatedOrder = { ...order, timeline: [...order.timeline, timeline] }
    saveOrder(updatedOrder)
    toast.success(`${action} - Action recorded`)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "dispute":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Package },
    { id: "timeline", label: "Timeline", icon: History },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "disputes", label: "Disputes", icon: AlertTriangle },
  ]

  if (!order) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">{order.orderNumber}</h1>
                <Badge className={`${getStatusColor(order.status)} border`}>{order.status?.toUpperCase()}</Badge>
                {order.flags?.isRedFlag && (
                  <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">RED FLAG</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Synced {lastSync.toLocaleTimeString()}
              </span>
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Header */}
      {!isCollapsed && (
        <div className="px-6 py-4 bg-card border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {order.product.year} {order.product.make} {order.product.model}
              </h2>
              <p className="text-muted-foreground">
                {order.product.part} - {order.product.spec}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase">Selling Price</p>
              <p className="text-2xl font-bold text-foreground">${order.pricing.sellingPrice.toLocaleString()}</p>
              <Badge className={`${getStatusColor(order.pricing.payment)} border mt-1`}>
                {order.pricing.payment?.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border-b border-border">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              TEAM WORKFLOW
            </h3>
            {!isTeamCompleted(activeTeam) && (
              <Button size="sm" onClick={completeTeamWork} className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete & Transfer
              </Button>
            )}
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {TEAMS.map((team) => {
              const Icon = team.icon
              const completed = isTeamCompleted(team.id)
              const locked = isTeamLocked(team.id)
              const isActive = activeTeam === team.id
              const status = order.teamStatuses?.[team.id]

              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => !locked && setActiveTeam(team.id)}
                  disabled={locked}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-red-600 text-white"
                      : locked
                        ? "bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                        : completed
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {locked ? (
                    <Lock className="h-4 w-4" />
                  ) : completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="font-medium">{team.name}</span>
                  {status && (
                    <Badge variant="outline" className="text-xs ml-1">
                      {status}
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Status Update */}
      <div className="px-6 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(() => {
              const team = TEAMS.find((t) => t.id === activeTeam)
              const Icon = team?.icon || Users
              return (
                <>
                  <Icon className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-foreground">{team?.name} Team</p>
                    <p className="text-xs text-muted-foreground">{team?.description}</p>
                  </div>
                </>
              )
            })()}
          </div>
          <Select value={order.teamStatuses?.[activeTeam]} onValueChange={(v) => updateTeamStatus(activeTeam, v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_STATUSES[activeTeam]?.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6 py-3 bg-card/50 border-b border-border">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Info Grid with Edit Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Customer Information */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-pink-400" />
                    <h3 className="text-sm font-semibold text-pink-400 uppercase">Customer Information</h3>
                  </div>
                  {editingSection === "customer" ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveEdit("customer")}>
                        <Save className="h-3 w-3 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => startEdit("customer", order.customer)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingSection === "customer" ? (
                    <>
                      <Input
                        value={editData.name || ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        placeholder="Name"
                        className="h-8"
                      />
                      <Input
                        value={editData.email || ""}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        placeholder="Email"
                        className="h-8"
                      />
                      <Input
                        value={editData.phone || ""}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Phone"
                        className="h-8"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Name</span>
                        <span className="text-foreground text-sm font-medium">{order.customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Email</span>
                        <a href={`mailto:${order.customer.email}`} className="text-blue-400 text-sm hover:underline">
                          {order.customer.email}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Phone</span>
                        <a href={`tel:${order.customer.phone}`} className="text-blue-400 text-sm hover:underline">
                          {order.customer.phone}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Lead Source</span>
                        <Badge variant="outline">{order.customer.leadSource}</Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <h3 className="text-sm font-semibold text-green-400 uppercase">Shipping Details</h3>
                  </div>
                  {editingSection === "shipping" ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveEdit("shipping")}>
                        <Save className="h-3 w-3 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => startEdit("shipping", order.shipping)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingSection === "shipping" ? (
                    <>
                      <Input
                        value={editData.address || ""}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        placeholder="Address"
                        className="h-8"
                      />
                      <Input
                        value={editData.city || ""}
                        onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                        placeholder="City"
                        className="h-8"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={editData.state || ""}
                          onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                          placeholder="State"
                          className="h-8"
                        />
                        <Input
                          value={editData.zip || ""}
                          onChange={(e) => setEditData({ ...editData, zip: e.target.value })}
                          placeholder="ZIP"
                          className="h-8"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Business</span>
                        <span className="text-foreground text-sm font-medium">{order.shipping.business}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Address</span>
                        <span className="text-foreground text-sm text-right max-w-[180px]">
                          {order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Type</span>
                        <span className="text-foreground text-sm">{order.shipping.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Unloading Equip</span>
                        <span
                          className={`text-sm font-medium ${order.shipping.unloadingEquip ? "text-green-400" : "text-red-400"}`}
                        >
                          {order.shipping.unloadingEquip ? "Yes" : "No"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pricing & Payment */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase">Pricing & Payment</h3>
                  </div>
                  {editingSection === "pricing" ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveEdit("pricing")}>
                        <Save className="h-3 w-3 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => startEdit("pricing", order.pricing)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingSection === "pricing" ? (
                    <>
                      <Input
                        type="number"
                        value={editData.sellingPrice || ""}
                        onChange={(e) => setEditData({ ...editData, sellingPrice: Number(e.target.value) })}
                        placeholder="Selling Price"
                        className="h-8"
                      />
                      <Input
                        type="number"
                        value={editData.costPrice || ""}
                        onChange={(e) => setEditData({ ...editData, costPrice: Number(e.target.value) })}
                        placeholder="Cost Price"
                        className="h-8"
                      />
                      <Input
                        type="number"
                        value={editData.taxExtra || ""}
                        onChange={(e) => setEditData({ ...editData, taxExtra: Number(e.target.value) })}
                        placeholder="Tax/Extra"
                        className="h-8"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Selling Price</span>
                        <span className="text-emerald-400 text-sm font-bold">
                          ${order.pricing.sellingPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Cost Price</span>
                        <span className="text-foreground text-sm">${order.pricing.costPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Tax/Extra</span>
                        <span className="text-foreground text-sm">${order.pricing.taxExtra}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Payment</span>
                        <Badge
                          className={`${order.pricing.payment === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"} text-xs`}
                        >
                          {order.pricing.payment?.toUpperCase()}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Order Details */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-400" />
                    <h3 className="text-sm font-semibold text-red-400 uppercase">Order Details</h3>
                  </div>
                  {editingSection === "details" ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveEdit("details")}>
                        <Save className="h-3 w-3 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => startEdit("details", order.details)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingSection === "details" ? (
                    <>
                      <Input
                        value={editData.warranty || ""}
                        onChange={(e) => setEditData({ ...editData, warranty: e.target.value })}
                        placeholder="Warranty"
                        className="h-8"
                      />
                      <Input
                        value={editData.milesPromised || ""}
                        onChange={(e) => setEditData({ ...editData, milesPromised: e.target.value })}
                        placeholder="Miles Promised"
                        className="h-8"
                      />
                      <Input
                        value={editData.saleBy || ""}
                        onChange={(e) => setEditData({ ...editData, saleBy: e.target.value })}
                        placeholder="Sale By"
                        className="h-8"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Sale Date</span>
                        <span className="text-foreground text-sm">{order.details.saleDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Warranty</span>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">{order.details.warranty}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Miles Promised</span>
                        <span className="text-foreground text-sm font-medium">{order.details.milesPromised}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Sale By</span>
                        <Badge variant="outline">{order.details.saleBy}</Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Yard Information */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-amber-400" />
                    <h3 className="text-sm font-semibold text-amber-400 uppercase">Yard Information</h3>
                  </div>
                  {editingSection === "yard" ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveEdit("yard")}>
                        <Save className="h-3 w-3 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => startEdit("yard", order.yard)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingSection === "yard" ? (
                    <>
                      <Input
                        value={editData.name || ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        placeholder="Yard Name"
                        className="h-8"
                      />
                      <Input
                        value={editData.contact || ""}
                        onChange={(e) => setEditData({ ...editData, contact: e.target.value })}
                        placeholder="Contact"
                        className="h-8"
                      />
                      <Input
                        value={editData.phone || ""}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Phone"
                        className="h-8"
                      />
                    </>
                  ) : (
                    <>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-foreground font-medium text-sm">{order.yard.name}</p>
                        <p className="text-muted-foreground text-xs">{order.yard.address}</p>
                        <p className="text-muted-foreground text-xs">Contact: {order.yard.contact}</p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Phone</span>
                        <a href={`tel:${order.yard.phone}`} className="text-blue-400 text-sm hover:underline">
                          {order.yard.phone}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">PO Status</span>
                        <span className="text-yellow-400 text-sm">{order.yard.poStatus}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Tracking & Delivery */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase">Tracking & Delivery</h3>
                  </div>
                  {editingSection === "tracking" ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => saveEdit("tracking")}>
                        <Save className="h-3 w-3 text-emerald-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={cancelEdit}>
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => startEdit("tracking", order.tracking)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingSection === "tracking" ? (
                    <>
                      <Input
                        value={editData.trackingNumber || ""}
                        onChange={(e) => setEditData({ ...editData, trackingNumber: e.target.value })}
                        placeholder="Tracking #"
                        className="h-8"
                      />
                      <Input
                        value={editData.carrier || ""}
                        onChange={(e) => setEditData({ ...editData, carrier: e.target.value })}
                        placeholder="Carrier"
                        className="h-8"
                      />
                      <Input
                        value={editData.eta || ""}
                        onChange={(e) => setEditData({ ...editData, eta: e.target.value })}
                        placeholder="ETA"
                        className="h-8"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Tracking #</span>
                        <span className="text-foreground text-sm">{order.tracking.trackingNumber || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Carrier</span>
                        <span className="text-foreground text-sm">{order.tracking.carrier || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">ETA</span>
                        <span className="text-foreground text-sm">{order.tracking.eta || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Invoice</span>
                        <span className={`text-sm ${order.tracking.invoiceSent ? "text-green-400" : "text-red-400"}`}>
                          {order.tracking.invoiceSent ? "Sent" : "Not Sent"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-red-400" />
                  <h3 className="text-sm font-semibold text-red-400 uppercase">Order Notes</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Synced with customer portal
                </Badge>
              </div>
              <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                {order.notes.map((note: OrderNote) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg ${
                      note.type === "system"
                        ? "bg-blue-500/10 border border-blue-500/20"
                        : note.type === "customer"
                          ? "bg-green-500/10 border border-green-500/20"
                          : note.isCustomerVisible
                            ? "bg-muted/50 border border-border"
                            : "bg-amber-500/10 border border-amber-500/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {note.team && (
                          <Badge variant="outline" className="text-xs">
                            {note.team}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{note.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {note.isCustomerVisible ? (
                          <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-400">
                            <Eye className="h-3 w-3 mr-1" />
                            Customer Visible
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-amber-400 border-amber-400">
                            Internal Only
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground text-sm">{note.text}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={noteVisibleToCustomer}
                    onCheckedChange={setNoteVisibleToCustomer}
                    id="customer-visible"
                  />
                  <Label htmlFor="customer-visible" className="text-xs text-muted-foreground">
                    Visible to customer
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                  />
                  <Button onClick={addNote} className="bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab - Keep existing */}
        {activeTab === "timeline" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Order Timeline</h3>
            <div className="space-y-4">
              {order.timeline.map((event: OrderTimeline, index: number) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.type === "status"
                          ? "bg-blue-500/20 text-blue-400"
                          : event.type === "communication"
                            ? "bg-green-500/20 text-green-400"
                            : event.type === "document"
                              ? "bg-purple-500/20 text-purple-400"
                              : event.type === "payment"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : event.type === "team_transfer"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {event.type === "status" && <CheckCircle2 className="h-5 w-5" />}
                      {event.type === "communication" && <MessageSquare className="h-5 w-5" />}
                      {event.type === "document" && <FileText className="h-5 w-5" />}
                      {event.type === "payment" && <CreditCard className="h-5 w-5" />}
                      {event.type === "shipping" && <Truck className="h-5 w-5" />}
                      {event.type === "team_transfer" && <Users className="h-5 w-5" />}
                    </div>
                    {index < order.timeline.length - 1 && <div className="w-0.5 h-full bg-border my-2" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-foreground font-medium">{event.action}</h4>
                      <span className="text-muted-foreground text-sm">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                    <p className="text-muted-foreground text-xs mt-1">By: {event.agent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab - Keep existing but add customer upload indicator */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["invoice", "delivery", "tracking", "chargeback", "photos", "other"].map((category) => (
                <div key={category} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-foreground uppercase mb-4 flex items-center gap-2">
                    <FileUp className="h-4 w-4 text-red-400" />
                    {category.charAt(0).toUpperCase() + category.slice(1)} Documents
                  </h3>
                  <div className="space-y-2 mb-4">
                    {order.documents
                      .filter((doc: OrderDocument) => doc.category === category)
                      .map((doc: OrderDocument) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <span className="text-foreground text-sm truncate max-w-[120px] block">{doc.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {doc.uploadedByType === "customer" ? "Customer" : "Team"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button type="button" className="p-1 hover:bg-muted rounded">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button type="button" className="p-1 hover:bg-muted rounded">
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-dashed bg-transparent"
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.onchange = (e) => handleFileUpload(e as any, category as OrderDocument["category"])
                      input.click()
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {category}
                  </Button>
                </div>
              ))}
            </div>

            {/* Submit to Bank/Gateway */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Submit Documents to Bank / Payment Gateway
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Upload all required evidence for chargeback disputes, refund requests, or fraud reports.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleAction("Submit to Bank")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit to Bank
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAction("Submit to Stripe")}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Submit to Stripe
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => handleAction("Submit to PayPal")}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Submit to PayPal
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === "communication" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Send Communication</h3>
              <Textarea placeholder="Type your message..." className="min-h-[150px] mb-4" />
              <div className="flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAction("Email Sent")}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleAction("SMS Sent")}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleAction("Call Made")}>
                  <Phone className="h-4 w-4 mr-2" />
                  Log Call
                </Button>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Communication History</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {order.timeline
                  .filter((t: OrderTimeline) => t.type === "communication")
                  .map((comm: OrderTimeline) => (
                    <div key={comm.id} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-foreground font-medium text-sm">{comm.action}</p>
                      <p className="text-muted-foreground text-xs">{comm.description}</p>
                      <p className="text-muted-foreground text-xs mt-1">{new Date(comm.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                {order.timeline.filter((t: OrderTimeline) => t.type === "communication").length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No communications yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Disputes Tab */}
        {activeTab === "disputes" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Dispute & Chargeback Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-muted-foreground text-sm">Dispute Status</p>
                  <p className="text-2xl font-bold text-foreground">{order.flags?.isDispute ? "Active" : "None"}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-muted-foreground text-sm">Chargeback</p>
                  <p className="text-2xl font-bold text-foreground">{order.flags?.isChargeback ? "Filed" : "None"}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-muted-foreground text-sm">Return Request</p>
                  <p className="text-2xl font-bold text-foreground">{order.flags?.isReturn ? "Pending" : "None"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/20 bg-transparent"
                  onClick={() => {
                    const updated = { ...order, flags: { ...order.flags, isDispute: !order.flags.isDispute } }
                    saveOrder(updated)
                    toast.success(order.flags.isDispute ? "Dispute removed" : "Dispute flagged")
                  }}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {order.flags?.isDispute ? "Remove Dispute" : "Flag as Dispute"}
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/20 bg-transparent"
                  onClick={() => {
                    const updated = { ...order, flags: { ...order.flags, isChargeback: !order.flags.isChargeback } }
                    saveOrder(updated)
                    toast.success(order.flags.isChargeback ? "Chargeback removed" : "Chargeback flagged")
                  }}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {order.flags?.isChargeback ? "Remove Chargeback" : "Flag as Chargeback"}
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 bg-transparent"
                  onClick={() => {
                    const updated = { ...order, flags: { ...order.flags, isReturn: !order.flags.isReturn } }
                    saveOrder(updated)
                    toast.success(order.flags.isReturn ? "Return removed" : "Return flagged")
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {order.flags?.isReturn ? "Remove Return" : "Flag as Return"}
                </Button>
                <Button
                  variant="outline"
                  className="border-red-700/50 text-red-500 hover:bg-red-700/20 bg-transparent"
                  onClick={() => {
                    const updated = { ...order, flags: { ...order.flags, isRedFlag: !order.flags.isRedFlag } }
                    saveOrder(updated)
                    toast.success(order.flags.isRedFlag ? "Red flag removed" : "Customer marked as Red Flag")
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {order.flags?.isRedFlag ? "Remove Red Flag" : "Red Flag Customer"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => handleAction("Email Customer")}>
            <Mail className="h-4 w-4 mr-2" />
            Email Customer
          </Button>
          <Button variant="outline" onClick={() => handleAction("Call Customer")}>
            <Phone className="h-4 w-4 mr-2" />
            Call Customer
          </Button>
          <Button variant="outline" onClick={() => handleAction("Send PO to Yard")}>
            <Send className="h-4 w-4 mr-2" />
            Send PO to Yard
          </Button>
          <Button variant="outline" onClick={() => handleAction("Generate Invoice")}>
            <Receipt className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
          <Button variant="outline" onClick={() => handleAction("Update Tracking")}>
            <Truck className="h-4 w-4 mr-2" />
            Update Tracking
          </Button>
          <div className="relative ml-auto">
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
              Update Status
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            {showStatusDropdown && (
              <div className="absolute bottom-full mb-2 right-0 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[150px]">
                {["pending", "processing", "shipped", "delivered", "cancelled", "dispute"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateStatus(status)}
                    className="w-full px-4 py-2 text-left text-foreground hover:bg-muted text-sm capitalize"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
