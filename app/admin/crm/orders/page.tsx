"use client"

import { useState, useMemo } from "react"
import {
  Package,
  User,
  Truck,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  Download,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  AlertCircle,
  Send,
  MessageSquare,
  Copy,
  ChevronDown,
  ChevronUp,
  Warehouse,
  Receipt,
  TrendingUp,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

// Sample orders data matching spreadsheet structure
const sampleOrders = [
  {
    id: "PC#10515",
    status: "Locate",
    part: {
      year: "2011",
      make: "Ford",
      model: "Truck-F150",
      type: "Engine",
      specs: "5.0L (VIN F, 8th digit)",
    },
    customer: {
      name: "Autos Unlimited (Scott Bedford)",
      email: "scott@autosunlimitedlv.com",
      phone: "(702) 595-3099",
      leadSource: "Meta",
    },
    shipping: {
      address: "3112 E Fremont St Las Vegas, NV 89104, USA",
      businessName: "Autos Unlimited",
      type: "Commercial",
      hasUnloadingEquip: true,
    },
    pricing: {
      sellingPrice: 2450.0,
      costPrice: 1650.0,
      taxExtra: 111.38,
      paymentStatus: "CHARGED",
      chargedVia: "Payment Cloud",
      chargedDate: "11/14",
    },
    orderDetails: {
      saleDate: "11/14/2025",
      warranty: "90 Days",
      milesPromised: "64K",
      saleBy: "Ben",
      invoiceBy: "Justin",
    },
    yard: {
      name: "Snyder's Recycled Auto & Truck Parts",
      address: "24549 State Highway 95 Holland, TX 76534",
      contactName: "",
      phone: "2542276720",
      email: "parts@snydersalvage.com",
      poStatus: "PO Sent 11/19 - Confirmed",
      yardCharge: 1761.38,
    },
    tracking: {
      trackingNumber: "PRO#6008230054",
      carrier: "AOW Logistics",
      eta: "12/02/2025",
      bol: "-",
      invoiceStatus: "Invoice Sent 11/14 - Confirmed 11/14",
    },
    notes: "Spoke to the cx shared AOW TD via text msg 26/11 Lisa.",
  },
  {
    id: "PC#10517",
    status: "Locate",
    part: {
      year: "2016",
      make: "Dodge",
      model: "Durango",
      type: "Transmission",
      specs: "AT, 3.6L, 4x4",
    },
    customer: {
      name: "Kyle Schmidt",
      email: "kyle.schmidt.emails@gmail.com",
      phone: "(816) 216-0267",
      leadSource: "Meta",
    },
    shipping: {
      address: "3004 S Westwood Blvd Poplar Bluff, MO 63901",
      businessName: "Barker's Towing & Auto Repair",
      type: "Commercial",
      hasUnloadingEquip: true,
    },
    pricing: {
      sellingPrice: 2134.36,
      costPrice: 0,
      taxExtra: 0,
      paymentStatus: "CHARGED",
      chargedVia: "Payment Cloud",
      chargedDate: "11/17",
    },
    orderDetails: {
      saleDate: "11/17/2025",
      warranty: "90 Days",
      milesPromised: "55K",
      saleBy: "Danny",
      invoiceBy: "Lisa",
    },
    yard: {
      name: "AESPO",
      address: "2542 Hw75 Beggs, OK 74421",
      contactName: "Weston Criqui",
      phone: "8162420531",
      email: "weston.criqui@aesop.com",
      poStatus: "PO Sent",
      yardCharge: 0,
    },
    tracking: {
      trackingNumber: "-",
      carrier: "-",
      eta: "-",
      bol: "-",
      invoiceStatus: "Pending",
    },
    notes: "Customer requested expedited shipping.",
  },
  {
    id: "PC#10520",
    status: "Shipped",
    part: {
      year: "2018",
      make: "Honda",
      model: "Accord",
      type: "Engine",
      specs: "2.0L Turbo",
    },
    customer: {
      name: "Mike's Auto Shop",
      email: "mike@mikesauto.com",
      phone: "(555) 123-4567",
      leadSource: "Google",
    },
    shipping: {
      address: "1234 Main St, Phoenix, AZ 85001",
      businessName: "Mike's Auto Shop",
      type: "Commercial",
      hasUnloadingEquip: true,
    },
    pricing: {
      sellingPrice: 3200.0,
      costPrice: 2100.0,
      taxExtra: 224.0,
      paymentStatus: "CHARGED",
      chargedVia: "Stripe",
      chargedDate: "11/20",
    },
    orderDetails: {
      saleDate: "11/20/2025",
      warranty: "6 Months",
      milesPromised: "45K",
      saleBy: "Sarah",
      invoiceBy: "Justin",
    },
    yard: {
      name: "Arizona Auto Recyclers",
      address: "5678 Desert Rd, Tucson, AZ 85701",
      contactName: "Tom Wilson",
      phone: "5205551234",
      email: "tom@azautorecyclers.com",
      poStatus: "Confirmed",
      yardCharge: 2324.0,
    },
    tracking: {
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS Freight",
      eta: "11/28/2025",
      bol: "BOL-2025-1120",
      invoiceStatus: "Sent & Confirmed",
    },
    notes: "Priority customer - repeat buyer.",
  },
  {
    id: "PC#10525",
    status: "Pending",
    part: {
      year: "2020",
      make: "Toyota",
      model: "Camry",
      type: "Transmission",
      specs: "CVT, 2.5L",
    },
    customer: {
      name: "John's Garage",
      email: "john@johnsgarage.net",
      phone: "(312) 555-9876",
      leadSource: "Website",
    },
    shipping: {
      address: "789 Oak Ave, Chicago, IL 60601",
      businessName: "John's Garage",
      type: "Commercial",
      hasUnloadingEquip: false,
    },
    pricing: {
      sellingPrice: 1850.0,
      costPrice: 1200.0,
      taxExtra: 148.0,
      paymentStatus: "PENDING",
      chargedVia: "-",
      chargedDate: "-",
    },
    orderDetails: {
      saleDate: "11/25/2025",
      warranty: "90 Days",
      milesPromised: "38K",
      saleBy: "Ben",
      invoiceBy: "-",
    },
    yard: {
      name: "Midwest Auto Parts",
      address: "4321 Industrial Blvd, Indianapolis, IN 46201",
      contactName: "Steve Brown",
      phone: "3175551234",
      email: "steve@midwestauto.com",
      poStatus: "Pending",
      yardCharge: 0,
    },
    tracking: {
      trackingNumber: "-",
      carrier: "-",
      eta: "-",
      bol: "-",
      invoiceStatus: "Not Sent",
    },
    notes: "Waiting for customer payment confirmation.",
  },
  {
    id: "PC#10530",
    status: "Delivered",
    part: {
      year: "2015",
      make: "Chevrolet",
      model: "Silverado 1500",
      type: "Engine",
      specs: "5.3L V8",
    },
    customer: {
      name: "Quick Fix Motors",
      email: "orders@quickfixmotors.com",
      phone: "(713) 555-4321",
      leadSource: "Referral",
    },
    shipping: {
      address: "2468 Texas Blvd, Houston, TX 77001",
      businessName: "Quick Fix Motors",
      type: "Commercial",
      hasUnloadingEquip: true,
    },
    pricing: {
      sellingPrice: 2800.0,
      costPrice: 1900.0,
      taxExtra: 196.0,
      paymentStatus: "CHARGED",
      chargedVia: "Wire Transfer",
      chargedDate: "11/10",
    },
    orderDetails: {
      saleDate: "11/10/2025",
      warranty: "6 Months",
      milesPromised: "72K",
      saleBy: "Danny",
      invoiceBy: "Lisa",
    },
    yard: {
      name: "Texas Truck Parts",
      address: "9876 Highway 59, Dallas, TX 75201",
      contactName: "Robert Lee",
      phone: "2145559876",
      email: "robert@texastruckparts.com",
      poStatus: "Completed",
      yardCharge: 2096.0,
    },
    tracking: {
      trackingNumber: "PRO#5551234567",
      carrier: "Estes Express",
      eta: "Delivered 11/18",
      bol: "BOL-2025-1110",
      invoiceStatus: "Completed",
    },
    notes: "Customer confirmed receipt. Left 5-star review.",
  },
  {
    id: "PC#10535",
    status: "Issue",
    part: {
      year: "2019",
      make: "BMW",
      model: "X5",
      type: "Transmission",
      specs: "8-Speed Auto, xDrive",
    },
    customer: {
      name: "Euro Auto Specialists",
      email: "parts@euroauto.com",
      phone: "(404) 555-7890",
      leadSource: "Meta",
    },
    shipping: {
      address: "1357 Peachtree St, Atlanta, GA 30301",
      businessName: "Euro Auto Specialists",
      type: "Commercial",
      hasUnloadingEquip: true,
    },
    pricing: {
      sellingPrice: 4500.0,
      costPrice: 3200.0,
      taxExtra: 315.0,
      paymentStatus: "REFUND PENDING",
      chargedVia: "Payment Cloud",
      chargedDate: "11/08",
    },
    orderDetails: {
      saleDate: "11/08/2025",
      warranty: "6 Months",
      milesPromised: "52K",
      saleBy: "Sarah",
      invoiceBy: "Justin",
    },
    yard: {
      name: "German Auto Recyclers",
      address: "7890 Import Way, Charlotte, NC 28201",
      contactName: "Hans Mueller",
      phone: "7045558888",
      email: "hans@germanrecyclers.com",
      poStatus: "Disputed",
      yardCharge: 3515.0,
    },
    tracking: {
      trackingNumber: "PRO#9998887776",
      carrier: "R+L Carriers",
      eta: "Delivered 11/15",
      bol: "BOL-2025-1108",
      invoiceStatus: "Under Review",
    },
    notes: "Customer claims transmission has issues. Warranty claim in progress. Need to verify with yard.",
  },
]

const statusColors: Record<string, string> = {
  Locate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Issue: "bg-red-500/20 text-red-400 border-red-500/30",
  Cancelled: "bg-gray-500/20 text-gray-400 border-gray-500/30",
}

const paymentStatusColors: Record<string, string> = {
  CHARGED: "bg-green-500/20 text-green-400",
  PENDING: "bg-yellow-500/20 text-yellow-400",
  "REFUND PENDING": "bg-red-500/20 text-red-400",
  REFUNDED: "bg-gray-500/20 text-gray-400",
}

export default function OrdersCRMPage() {
  const [orders, setOrders] = useState(sampleOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [editingOrder, setEditingOrder] = useState<(typeof sampleOrders)[0] | null>(null)
  const [isAddingOrder, setIsAddingOrder] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "price" | "status">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Stats calculation
  const stats = useMemo(() => {
    const totalOrders = orders.length
    const totalSales = orders.reduce((sum, o) => sum + o.pricing.sellingPrice, 0)
    const totalCost = orders.reduce((sum, o) => sum + o.pricing.costPrice, 0)
    const profit = totalSales - totalCost
    const pendingPayments = orders.filter((o) => o.pricing.paymentStatus === "PENDING").length
    const issues = orders.filter((o) => o.status === "Issue").length
    return { totalOrders, totalSales, totalCost, profit, pendingPayments, issues }
  }, [orders])

  // Filtered and sorted orders
  const filteredOrders = useMemo(() => {
    const result = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.part.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.part.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.part.type.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      if (sortBy === "date") {
        comparison = new Date(a.orderDetails.saleDate).getTime() - new Date(b.orderDetails.saleDate).getTime()
      } else if (sortBy === "price") {
        comparison = a.pricing.sellingPrice - b.pricing.sellingPrice
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return result
  }, [orders, searchQuery, statusFilter, sortBy, sortOrder])

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const toggleOrderSelect = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    toast.success(`Order ${orderId} status updated to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] rounded-2xl border border-[#2a4a7f] p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#e94560] to-[#ff6b6b] bg-clip-text text-transparent">
                All Used Auto Parts x AOW
              </h1>
              <p className="text-[#8892b0] mt-1">Advanced Orders CRM - November 2025</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-[#2a4a7f] text-[#8892b0] hover:bg-[#2a4a7f]/30 bg-transparent"
                onClick={() => toast.success("Refreshing orders...")}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="border-[#2a4a7f] text-[#8892b0] hover:bg-[#2a4a7f]/30 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                className="bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:opacity-90"
                onClick={() => setIsAddingOrder(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] border-[#2a4a7f]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#e94560]/20 rounded-lg">
                  <Package className="w-5 h-5 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-xs text-[#8892b0] uppercase tracking-wider">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] border-[#2a4a7f]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-[#8892b0] uppercase tracking-wider">Total Sales</p>
                  <p className="text-2xl font-bold text-green-400">${stats.totalSales.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] border-[#2a4a7f]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Receipt className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-[#8892b0] uppercase tracking-wider">Total Cost</p>
                  <p className="text-2xl font-bold text-amber-400">${stats.totalCost.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] border-[#2a4a7f]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-[#8892b0] uppercase tracking-wider">Profit</p>
                  <p className="text-2xl font-bold text-emerald-400">${stats.profit.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] border-[#2a4a7f]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-[#8892b0] uppercase tracking-wider">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.pendingPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] border-[#2a4a7f]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-[#8892b0] uppercase tracking-wider">Issues</p>
                  <p className="text-2xl font-bold text-red-400">{stats.issues}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <div className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-[#2a4a7f] p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892b0]" />
              <Input
                placeholder="Search orders, customers, parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0f3460]/50 border-[#2a4a7f] text-white placeholder:text-[#8892b0]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Status Filter Tabs */}
              {["all", "Locate", "Pending", "Shipped", "Delivered", "Issue"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === status
                      ? status === "all"
                        ? "bg-[#e94560] text-white"
                        : status === "Locate"
                          ? "bg-amber-500 text-white"
                          : status === "Pending"
                            ? "bg-yellow-500 text-black"
                            : status === "Shipped"
                              ? "bg-blue-500 text-white"
                              : status === "Delivered"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                      : "bg-[#0f3460]/50 text-[#8892b0] hover:bg-[#2a4a7f]/50"
                  }`}
                >
                  {status === "all" ? "All" : status}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                <SelectTrigger className="w-32 bg-[#0f3460]/50 border-[#2a4a7f] text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-[#2a4a7f]">
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                className="border-[#2a4a7f] text-[#8892b0] hover:bg-[#2a4a7f]/30"
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-2xl border border-[#2a4a7f] overflow-hidden transition-all hover:shadow-lg hover:shadow-[#e94560]/10"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-[#e94560] to-[#ff6b6b] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleOrderSelect(order.id)}
                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-[#e94560]"
                  />
                  <span className="text-xl font-bold text-white">{order.id}</span>
                  <Badge className={`${statusColors[order.status]} border`}>{order.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderExpand(order.id)}
                    className="text-white/80 hover:text-white hover:bg-white/20"
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" /> Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" /> Expand
                      </>
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/20">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1a1a2e] border-[#2a4a7f]">
                      <DropdownMenuItem
                        onClick={() => setEditingOrder(order)}
                        className="text-white hover:bg-[#2a4a7f]"
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit Order
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-[#2a4a7f]">
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-[#2a4a7f]">
                        <Send className="w-4 h-4 mr-2" /> Send Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => copyToClipboard(order.id)}
                        className="text-white hover:bg-[#2a4a7f]"
                      >
                        <Copy className="w-4 h-4 mr-2" /> Copy Order #
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#2a4a7f]" />
                      <DropdownMenuItem className="text-white hover:bg-[#2a4a7f]">
                        Update Status
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Part Info Banner */}
              <div className="bg-gradient-to-r from-[#0f3460] to-[#16213e] px-6 py-4 border-b border-[#2a4a7f]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {order.part.year} {order.part.make} {order.part.model}
                    </p>
                    <p className="text-[#8892b0]">
                      {order.part.type} - {order.part.specs}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-[#8892b0] uppercase">Selling Price</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${order.pricing.sellingPrice.toLocaleString()}
                      </p>
                    </div>
                    <Badge className={paymentStatusColors[order.pricing.paymentStatus]}>
                      {order.pricing.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedOrder === order.id && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Customer Information */}
                    <div className="bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <User className="w-4 h-4" /> Customer Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Name</span>
                          <span className="text-white text-sm text-right max-w-[60%]">{order.customer.name}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Email</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(order.customer.email)}
                            className="text-blue-400 text-sm hover:underline text-right max-w-[60%] truncate"
                          >
                            {order.customer.email}
                          </button>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Phone</span>
                          <a href={`tel:${order.customer.phone}`} className="text-blue-400 text-sm hover:underline">
                            {order.customer.phone}
                          </a>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Lead Source</span>
                          <Badge variant="outline" className="border-[#2a4a7f] text-[#8892b0]">
                            {order.customer.leadSource}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Shipping Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Business</span>
                          <span className="text-white text-sm text-right max-w-[60%]">
                            {order.shipping.businessName}
                          </span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Address</span>
                          <span className="text-white text-sm text-right max-w-[60%]">{order.shipping.address}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Type</span>
                          <span className="text-white text-sm">{order.shipping.type}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Unloading Equip</span>
                          <span
                            className={`text-sm ${order.shipping.hasUnloadingEquip ? "text-green-400" : "text-red-400"}`}
                          >
                            {order.shipping.hasUnloadingEquip ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Payment */}
                    <div className="bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> Pricing & Payment
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Selling Price</span>
                          <span className="text-green-400 text-lg font-bold">
                            ${order.pricing.sellingPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Cost Price</span>
                          <span className="text-white text-sm">${order.pricing.costPrice.toLocaleString() || "-"}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Tax/Extra</span>
                          <span className="text-white text-sm">${order.pricing.taxExtra.toLocaleString() || "-"}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Payment</span>
                          <Badge className={paymentStatusColors[order.pricing.paymentStatus]}>
                            {order.pricing.paymentStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Charged Via</span>
                          <span className="text-white text-sm">
                            {order.pricing.chargedVia} {order.pricing.chargedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Order Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Sale Date</span>
                          <span className="text-white text-sm">{order.orderDetails.saleDate}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Warranty</span>
                          <Badge className="bg-blue-500/20 text-blue-400">{order.orderDetails.warranty}</Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Miles Promised</span>
                          <span className="text-white text-sm">{order.orderDetails.milesPromised}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Sale By</span>
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            {order.orderDetails.saleBy}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Invoice By</span>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            {order.orderDetails.invoiceBy || "-"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Yard Information */}
                    <div className="bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <Warehouse className="w-4 h-4" /> Yard Information
                      </h3>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-3">
                        <p className="text-white font-medium">{order.yard.name}</p>
                        <p className="text-[#8892b0] text-sm mt-1">{order.yard.address}</p>
                        {order.yard.contactName && (
                          <p className="text-[#8892b0] text-sm">Contact: {order.yard.contactName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[#8892b0] text-sm">Phone</span>
                          <a href={`tel:${order.yard.phone}`} className="text-blue-400 text-sm hover:underline">
                            {order.yard.phone}
                          </a>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#8892b0] text-sm">PO Status</span>
                          <span className="text-white text-sm">{order.yard.poStatus}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#8892b0] text-sm">Yard Charge</span>
                          <span className="text-amber-400 font-medium">
                            ${order.yard.yardCharge.toLocaleString() || "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tracking & Delivery */}
                    <div className="bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Tracking & Delivery
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Tracking #</span>
                          {order.tracking.trackingNumber !== "-" ? (
                            <button
                              type="button"
                              onClick={() => copyToClipboard(order.tracking.trackingNumber)}
                              className="text-blue-400 text-sm hover:underline"
                            >
                              {order.tracking.trackingNumber}
                            </button>
                          ) : (
                            <span className="text-[#8892b0] text-sm">-</span>
                          )}
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Carrier</span>
                          <span className="text-white text-sm">{order.tracking.carrier}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">ETA</span>
                          <span className="text-white text-sm">{order.tracking.eta}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">BOL</span>
                          <span className="text-white text-sm">{order.tracking.bol}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-[#8892b0] text-sm">Invoice</span>
                          <span className="text-white text-sm text-right max-w-[60%]">
                            {order.tracking.invoiceStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes Section - Full Width */}
                    <div className="lg:col-span-3 bg-[#0f3460]/30 rounded-xl p-5 border border-[#2a4a7f]/50">
                      <h3 className="text-sm font-semibold text-[#e94560] uppercase tracking-wider mb-4 pb-2 border-b border-[#e94560]/30 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Order Notes
                      </h3>
                      <p className="text-[#b8c5d6] leading-relaxed">{order.notes || "No notes added."}</p>
                      <div className="mt-4 flex gap-2">
                        <Input
                          placeholder="Add a note..."
                          className="bg-[#0f3460]/50 border-[#2a4a7f] text-white placeholder:text-[#8892b0]"
                        />
                        <Button className="bg-[#e94560] hover:bg-[#e94560]/80">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-[#2a4a7f]">
                    <Button
                      variant="outline"
                      className="border-[#2a4a7f] text-white hover:bg-[#2a4a7f]/30 bg-transparent"
                    >
                      <Mail className="w-4 h-4 mr-2" /> Email Customer
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a4a7f] text-white hover:bg-[#2a4a7f]/30 bg-transparent"
                    >
                      <Phone className="w-4 h-4 mr-2" /> Call Customer
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a4a7f] text-white hover:bg-[#2a4a7f]/30 bg-transparent"
                    >
                      <Send className="w-4 h-4 mr-2" /> Send PO to Yard
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a4a7f] text-white hover:bg-[#2a4a7f]/30 bg-transparent"
                    >
                      <Receipt className="w-4 h-4 mr-2" /> Generate Invoice
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a4a7f] text-white hover:bg-[#2a4a7f]/30 bg-transparent"
                    >
                      <Truck className="w-4 h-4 mr-2" /> Update Tracking
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-[#e94560] hover:bg-[#e94560]/80">
                          Update Status <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1a1a2e] border-[#2a4a7f]">
                        {["Locate", "Pending", "Shipped", "Delivered", "Issue", "Cancelled"].map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            className="text-white hover:bg-[#2a4a7f]"
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-[#8892b0] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
            <p className="text-[#8892b0]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
