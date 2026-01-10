"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Search,
  Phone,
  Mail,
  TrendingUp,
  DollarSign,
  Users,
  Filter,
  Download,
  Target,
  ShoppingCart,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Upload,
  Truck,
  Shield,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Send,
  Printer,
  History,
  Flag,
  Package,
  AlertCircle,
  FileUp,
  BanknoteIcon,
} from "lucide-react"

// Customer Orders - Auto-synced from frontend when customers place orders/inquiries
const customerOrders = [
  {
    id: "ORD-2024-8847",
    type: "order",
    customer: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Los Angeles, CA 90001",
    },
    product: {
      name: "2018 Toyota Camry Engine 2.5L",
      sku: "TOY-CAM-ENG-2018-25L",
      price: 2450,
      image: "/toyota-engine.jpg",
    },
    orderDate: "Dec 1, 2025 10:34 AM",
    source: "Website",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    status: "processing",
    assignedTo: "Mike Rogers",
    priority: "high",
    timeline: [
      { date: "Dec 1, 2025 10:34 AM", action: "Order Placed", by: "Customer", note: "Customer placed order online" },
      { date: "Dec 1, 2025 10:35 AM", action: "Payment Confirmed", by: "System", note: "Stripe payment successful" },
      { date: "Dec 1, 2025 11:00 AM", action: "Assigned to Sales", by: "System", note: "Auto-assigned to Mike Rogers" },
    ],
    notes: [],
    documents: [],
    flags: [],
  },
  {
    id: "INQ-2024-8848",
    type: "inquiry",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Houston, TX 77001",
    },
    product: {
      name: "BMW X5 Transmission Automatic",
      sku: "BMW-X5-TRANS-AUTO",
      price: 3200,
      image: "/bmw-transmission.jpg",
    },
    orderDate: "Dec 1, 2025 09:15 AM",
    source: "Phone Call",
    paymentStatus: "pending",
    paymentMethod: null,
    status: "contacted",
    assignedTo: "Lisa Kim",
    priority: "medium",
    timeline: [
      {
        date: "Dec 1, 2025 09:15 AM",
        action: "Inquiry Received",
        by: "Customer",
        note: "Called asking about transmission",
      },
      { date: "Dec 1, 2025 09:20 AM", action: "Quote Sent", by: "Lisa Kim", note: "Sent quote via email" },
      { date: "Dec 1, 2025 02:00 PM", action: "Follow-up Call", by: "Lisa Kim", note: "Scheduled for tomorrow" },
    ],
    notes: [{ date: "Dec 1, 2025", by: "Lisa Kim", text: "Customer interested but comparing prices" }],
    documents: [],
    flags: [],
  },
  {
    id: "ORD-2024-8845",
    type: "order",
    customer: {
      name: "Mike's Auto Shop",
      email: "mike@autoshop.com",
      phone: "(555) 345-6789",
      address: "789 Industrial Blvd, Phoenix, AZ 85001",
    },
    product: {
      name: "Ford F-150 Transfer Case 4WD",
      sku: "FORD-F150-TC-4WD",
      price: 1890,
      image: "/ford-transfer-case.jpg",
    },
    orderDate: "Nov 30, 2025 03:45 PM",
    source: "Returning Customer",
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    status: "shipped",
    assignedTo: "John Davis",
    priority: "normal",
    timeline: [
      { date: "Nov 30, 2025 03:45 PM", action: "Order Placed", by: "Customer", note: "Repeat customer order" },
      { date: "Nov 30, 2025 03:46 PM", action: "Payment Confirmed", by: "System", note: "PayPal payment received" },
      {
        date: "Nov 30, 2025 04:00 PM",
        action: "Order Verified",
        by: "John Davis",
        note: "Verified stock availability",
      },
      { date: "Dec 1, 2025 09:00 AM", action: "Shipped", by: "Warehouse", note: "Tracking: 1Z999AA10123456784" },
    ],
    notes: [],
    documents: [{ name: "Invoice-8845.pdf", type: "invoice", date: "Nov 30, 2025" }],
    flags: [],
    tracking: "1Z999AA10123456784",
  },
  {
    id: "ORD-2024-8840",
    type: "order",
    customer: {
      name: "Robert Wilson",
      email: "rwilson@email.com",
      phone: "(555) 456-7890",
      address: "321 Elm St, Chicago, IL 60601",
    },
    product: {
      name: "Chevy Silverado Engine 5.3L V8",
      sku: "CHEVY-SIL-ENG-53V8",
      price: 4500,
      image: "/chevy-engine.jpg",
    },
    orderDate: "Nov 28, 2025 11:20 AM",
    source: "Website",
    paymentStatus: "chargeback",
    paymentMethod: "Credit Card",
    status: "dispute",
    assignedTo: "Mike Rogers",
    priority: "urgent",
    timeline: [
      { date: "Nov 28, 2025 11:20 AM", action: "Order Placed", by: "Customer", note: "Online order" },
      { date: "Nov 28, 2025 11:21 AM", action: "Payment Confirmed", by: "System", note: "Visa ending 4242" },
      { date: "Nov 29, 2025 10:00 AM", action: "Shipped", by: "Warehouse", note: "Tracking: 1Z999AA10123456780" },
      { date: "Dec 1, 2025 02:30 PM", action: "Chargeback Filed", by: "Bank", note: "Customer disputed charge" },
    ],
    notes: [
      {
        date: "Dec 1, 2025",
        by: "Mike Rogers",
        text: "Customer claims item not received but tracking shows delivered",
      },
    ],
    documents: [
      { name: "Invoice-8840.pdf", type: "invoice", date: "Nov 28, 2025" },
      { name: "Delivery-Proof.pdf", type: "delivery", date: "Nov 30, 2025" },
    ],
    flags: ["chargeback", "red_flag"],
    tracking: "1Z999AA10123456780",
  },
  {
    id: "ORD-2024-8838",
    type: "order",
    customer: {
      name: "Emily Brown",
      email: "emily.b@email.com",
      phone: "(555) 567-8901",
      address: "654 Pine St, Miami, FL 33101",
    },
    product: {
      name: "Honda Accord Headlights LED Set",
      sku: "HONDA-ACC-HL-LED",
      price: 650,
      image: "/honda-headlights.jpg",
    },
    orderDate: "Nov 27, 2025 04:10 PM",
    source: "Mobile App",
    paymentStatus: "refund_requested",
    paymentMethod: "Credit Card",
    status: "return",
    assignedTo: "Amy Chen",
    priority: "high",
    timeline: [
      { date: "Nov 27, 2025 04:10 PM", action: "Order Placed", by: "Customer", note: "Mobile app order" },
      { date: "Nov 27, 2025 04:11 PM", action: "Payment Confirmed", by: "System", note: "Mastercard ending 5555" },
      { date: "Nov 28, 2025 09:00 AM", action: "Shipped", by: "Warehouse", note: "Tracking: 1Z999AA10123456781" },
      { date: "Nov 30, 2025 11:00 AM", action: "Delivered", by: "UPS", note: "Left at front door" },
      { date: "Dec 1, 2025 10:00 AM", action: "Return Requested", by: "Customer", note: "Wrong fitment claimed" },
    ],
    notes: [{ date: "Dec 1, 2025", by: "Amy Chen", text: "Checking if customer ordered correct year model" }],
    documents: [],
    flags: ["return_requested"],
    tracking: "1Z999AA10123456781",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: RefreshCw },
  contacted: { label: "Contacted", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Phone },
  quoted: { label: "Quote Sent", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", icon: FileText },
  confirmed: {
    label: "Confirmed",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: CheckCircle,
  },
  shipped: { label: "Shipped", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: Package },
  cancelled: { label: "Cancelled", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: XCircle },
  dispute: { label: "Dispute", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertTriangle },
  return: { label: "Return", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: RefreshCw },
  completed: {
    label: "Completed",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: CheckCircle,
  },
}

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400" },
  paid: { label: "Paid", color: "bg-emerald-500/20 text-emerald-400" },
  failed: { label: "Failed", color: "bg-red-500/20 text-red-400" },
  refunded: { label: "Refunded", color: "bg-gray-500/20 text-gray-400" },
  refund_requested: { label: "Refund Requested", color: "bg-orange-500/20 text-orange-400" },
  chargeback: { label: "Chargeback", color: "bg-red-600/30 text-red-300" },
}

export default function SalesCRM() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [newStatus, setNewStatus] = useState("")
  const [newNote, setNewNote] = useState("")

  const tabs = [
    { id: "all", label: "All Orders", count: customerOrders.length },
    { id: "inquiry", label: "Inquiries", count: customerOrders.filter((o) => o.type === "inquiry").length },
    { id: "processing", label: "Processing", count: customerOrders.filter((o) => o.status === "processing").length },
    { id: "shipped", label: "Shipped", count: customerOrders.filter((o) => o.status === "shipped").length },
    {
      id: "dispute",
      label: "Disputes",
      count: customerOrders.filter((o) => o.status === "dispute" || o.status === "return").length,
    },
    {
      id: "urgent",
      label: "Urgent",
      count: customerOrders.filter((o) => o.priority === "urgent" || o.flags.length > 0).length,
    },
  ]

  const filteredOrders = customerOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "inquiry") return matchesSearch && order.type === "inquiry"
    if (activeTab === "processing") return matchesSearch && order.status === "processing"
    if (activeTab === "shipped") return matchesSearch && order.status === "shipped"
    if (activeTab === "dispute") return matchesSearch && (order.status === "dispute" || order.status === "return")
    if (activeTab === "urgent") return matchesSearch && (order.priority === "urgent" || order.flags.length > 0)
    return matchesSearch
  })

  const stats = {
    totalOrders: customerOrders.length,
    totalRevenue: customerOrders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.product.price, 0),
    pendingInquiries: customerOrders.filter((o) => o.type === "inquiry").length,
    disputes: customerOrders.filter((o) => o.status === "dispute").length,
    returns: customerOrders.filter((o) => o.status === "return").length,
    conversionRate: Math.round((customerOrders.filter((o) => o.type === "order").length / customerOrders.length) * 100),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            Sales CRM
          </h1>
          <p className="text-white/60 mt-1">Real-time orders & inquiries from customers - Auto-synced</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
            <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Live Sync
          </Badge>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-white/60">Total Orders</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-white/60">Revenue</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-white/60">Inquiries</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.pendingInquiries}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-white/60">Conversion</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.conversionRate}%</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-600/20 to-red-900/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-xs text-white/60">Disputes</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.disputes}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-600/20 to-orange-900/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-white/60">Returns</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.returns}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? tab.id === "dispute" || tab.id === "urgent"
                    ? "bg-red-600 text-white"
                    : "bg-emerald-600 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tab.label}
              <Badge className={`${activeTab === tab.id ? "bg-white/20" : "bg-white/10"} text-xs`}>{tab.count}</Badge>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search orders, customers, products..."
              className="pl-10 bg-white/5 border-white/10 text-white w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status]?.icon || Clock
          const isExpanded = expandedOrder === order.id
          const hasFlags = order.flags && order.flags.length > 0

          return (
            <Card
              key={order.id}
              className={`border transition-all ${
                hasFlags
                  ? "bg-red-950/30 border-red-500/50 shadow-lg shadow-red-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <CardContent className="p-0">
                {/* Order Header - Always Visible */}
                <div className="p-4 cursor-pointer" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Order ID & Type */}
                    <div className="flex items-center gap-3 min-w-48">
                      {hasFlags && (
                        <div className="p-1 bg-red-500/20 rounded animate-pulse">
                          <Flag className="h-4 w-4 text-red-400" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">{order.id}</span>
                          <Badge
                            className={`text-xs ${order.type === "inquiry" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}
                          >
                            {order.type === "inquiry" ? "Inquiry" : "Order"}
                          </Badge>
                          {order.priority === "urgent" && (
                            <Badge className="bg-red-500/20 text-red-400 animate-pulse">Urgent</Badge>
                          )}
                        </div>
                        <div className="text-xs text-white/50">{order.orderDate}</div>
                      </div>
                    </div>

                    {/* Product */}
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={order.product.image || "/placeholder.svg"}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover bg-white/10"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{order.product.name}</div>
                        <div className="text-xs text-white/50">{order.product.sku}</div>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="min-w-40">
                      <div className="text-sm font-medium text-white">{order.customer.name}</div>
                      <div className="text-xs text-white/50">{order.customer.email}</div>
                    </div>

                    {/* Price */}
                    <div className="min-w-24 text-right">
                      <div className="text-lg font-bold text-emerald-400">${order.product.price.toLocaleString()}</div>
                      <Badge className={paymentStatusConfig[order.paymentStatus]?.color || ""}>
                        {paymentStatusConfig[order.paymentStatus]?.label || order.paymentStatus}
                      </Badge>
                    </div>

                    {/* Status */}
                    <div className="min-w-32">
                      <Badge className={`${statusConfig[order.status]?.color || ""} flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status]?.label || order.status}
                      </Badge>
                      <div className="text-xs text-white/50 mt-1">Agent: {order.assignedTo}</div>
                    </div>

                    {/* Expand Button */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedOrder(isExpanded ? null : order.id)
                        }}
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Flags Banner */}
                  {hasFlags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {order.flags.map((flag: string, idx: number) => (
                        <Badge key={idx} className="bg-red-500/30 text-red-300 border-red-500/50">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {flag === "chargeback"
                            ? "CHARGEBACK FILED"
                            : flag === "red_flag"
                              ? "RED FLAG CUSTOMER"
                              : flag === "return_requested"
                                ? "RETURN REQUESTED"
                                : flag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4 space-y-6">
                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowUpdateDialog(true)
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" /> Update Status
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowNoteDialog(true)
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" /> Add Note
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Send className="h-4 w-4 mr-2" /> Send Quote
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowDocumentDialog(true)
                        }}
                      >
                        <FileUp className="h-4 w-4 mr-2" /> Upload Document
                      </Button>
                      {hasFlags && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Shield className="h-4 w-4 mr-2" /> Fight Dispute
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <Card className="bg-white/5 border-white/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                            <Users className="h-4 w-4" /> Customer Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/50">Name:</span>
                            <span className="text-white">{order.customer.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/50">Email:</span>
                            <span className="text-white">{order.customer.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/50">Phone:</span>
                            <span className="text-white">{order.customer.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/50">Address:</span>
                            <span className="text-white text-right">{order.customer.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/50">Source:</span>
                            <Badge className="bg-blue-500/20 text-blue-400">{order.source}</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Timeline */}
                      <Card className="bg-white/5 border-white/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                            <History className="h-4 w-4" /> Order Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 max-h-48 overflow-y-auto">
                            {order.timeline.map((event: any, idx: number) => (
                              <div key={idx} className="flex gap-3 text-sm">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`h-2 w-2 rounded-full ${idx === 0 ? "bg-emerald-400" : "bg-white/30"}`}
                                  />
                                  {idx < order.timeline.length - 1 && <div className="w-px h-full bg-white/10 my-1" />}
                                </div>
                                <div className="flex-1 pb-3">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-white">{event.action}</span>
                                    <span className="text-xs text-white/40">{event.by}</span>
                                  </div>
                                  <div className="text-xs text-white/50">{event.date}</div>
                                  <div className="text-xs text-white/60 mt-1">{event.note}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Documents & Notes */}
                      <Card className="bg-white/5 border-white/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-white/80 flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Documents & Notes
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Documents */}
                          <div>
                            <div className="text-xs text-white/50 mb-2">Documents</div>
                            {order.documents && order.documents.length > 0 ? (
                              <div className="space-y-2">
                                {order.documents.map((doc: any, idx: number) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-400" />
                                      <span className="text-sm text-white">{doc.name}</span>
                                    </div>
                                    <Button size="sm" variant="ghost" className="h-6 text-xs text-white/60">
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-white/40">No documents uploaded</div>
                            )}
                          </div>

                          {/* Notes */}
                          <div>
                            <div className="text-xs text-white/50 mb-2">Notes</div>
                            {order.notes && order.notes.length > 0 ? (
                              <div className="space-y-2">
                                {order.notes.map((note: any, idx: number) => (
                                  <div key={idx} className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                                    <div className="text-sm text-white">{note.text}</div>
                                    <div className="text-xs text-white/40 mt-1">
                                      {note.by} - {note.date}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-white/40">No notes added</div>
                            )}
                          </div>

                          {/* Tracking */}
                          {order.tracking && (
                            <div>
                              <div className="text-xs text-white/50 mb-2">Tracking</div>
                              <div className="flex items-center gap-2 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded">
                                <Truck className="h-4 w-4 text-indigo-400" />
                                <span className="font-mono text-sm text-white">{order.tracking}</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Chargeback/Dispute Section */}
                    {(order.status === "dispute" || order.paymentStatus === "chargeback") && (
                      <Card className="bg-red-950/30 border-red-500/30">
                        <CardHeader>
                          <CardTitle className="text-red-400 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" /> Dispute Management - Action Required
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg">
                              <div className="text-sm text-white/60 mb-1">Dispute Amount</div>
                              <div className="text-2xl font-bold text-red-400">
                                ${order.product.price.toLocaleString()}
                              </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                              <div className="text-sm text-white/60 mb-1">Response Deadline</div>
                              <div className="text-xl font-bold text-yellow-400">Dec 8, 2025</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                              <div className="text-sm text-white/60 mb-1">Status</div>
                              <Badge className="bg-yellow-500/20 text-yellow-400">Pending Evidence</Badge>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button className="bg-red-600 hover:bg-red-700">
                              <FileUp className="h-4 w-4 mr-2" /> Upload Evidence to Bank
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                            >
                              <BanknoteIcon className="h-4 w-4 mr-2" /> Submit to Payment Gateway
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Printer className="h-4 w-4 mr-2" /> Print Documents
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Update Status Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Order: {selectedOrder?.id}</Label>
            </div>
            <div>
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/10">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Note (optional)</Label>
              <Textarea
                placeholder="Add a note about this update..."
                className="bg-white/5 border-white/10 text-white mt-2"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <CheckCircle className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300">Customer will be automatically notified of this update</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowUpdateDialog(false)}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Update & Notify Customer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Document Dialog */}
      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Document Type</Label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/10">
                  <SelectItem value="invoice" className="text-white hover:bg-white/10">
                    Invoice
                  </SelectItem>
                  <SelectItem value="delivery" className="text-white hover:bg-white/10">
                    Delivery Proof
                  </SelectItem>
                  <SelectItem value="tracking" className="text-white hover:bg-white/10">
                    Tracking Confirmation
                  </SelectItem>
                  <SelectItem value="communication" className="text-white hover:bg-white/10">
                    Customer Communication
                  </SelectItem>
                  <SelectItem value="chargeback" className="text-white hover:bg-white/10">
                    Chargeback Evidence
                  </SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-white/10">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>File</Label>
              <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-white/40 mb-2" />
                <p className="text-sm text-white/60">Drag and drop or click to upload</p>
                <p className="text-xs text-white/40 mt-1">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="submitToBank" className="rounded" />
              <Label htmlFor="submitToBank" className="text-sm">
                Also submit to bank/payment gateway for dispute
              </Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDocumentDialog(false)}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Upload Document</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Note</Label>
              <Textarea
                placeholder="Add internal note about this order..."
                className="bg-white/5 border-white/10 text-white mt-2"
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="visibleToCustomer" className="rounded" />
              <Label htmlFor="visibleToCustomer" className="text-sm">
                Make visible to customer
              </Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNoteDialog(false)}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Add Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
