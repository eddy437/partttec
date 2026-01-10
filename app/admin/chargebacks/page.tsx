"use client"

import { useState, useMemo } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Eye,
  Phone,
  Mail,
  Flag,
  Shield,
  TrendingUp,
  AlertOctagon,
  Send,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  User,
  CreditCard,
  Building,
  RefreshCw,
  Ban,
  Scale,
  Gavel,
  FileCheck,
  FilePlus,
  ExternalLink,
  Bell,
  ShieldAlert,
  UserX,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Chargeback data
const chargebacks = [
  {
    id: "CB-2024-001",
    orderId: "ORD-89456",
    customer: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      redFlags: 3,
      previousChargebacks: 2,
      totalOrders: 5,
      fraudScore: 85,
    },
    amount: 1249.99,
    reason: "Product Not Received",
    reasonCode: "13.1",
    status: "pending_response",
    priority: "high",
    bank: "Chase Bank",
    cardType: "Visa",
    cardLast4: "4242",
    filedDate: "2024-01-15",
    responseDeadline: "2024-01-25",
    daysLeft: 3,
    product: "Honda Accord 2019 Transmission",
    tracking: "1Z999AA10123456784",
    deliveryStatus: "Delivered",
    deliveryDate: "2024-01-10",
    signedBy: "J. Smith",
    documents: ["invoice", "tracking", "delivery_proof"],
    notes: "Customer claims item not received despite delivery confirmation",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "CB-2024-002",
    orderId: "ORD-78234",
    customer: {
      name: "Mike Wilson",
      email: "mike.w@gmail.com",
      phone: "+1 (555) 987-6543",
      redFlags: 0,
      previousChargebacks: 0,
      totalOrders: 12,
      fraudScore: 15,
    },
    amount: 589.0,
    reason: "Item Not As Described",
    reasonCode: "13.3",
    status: "in_review",
    priority: "medium",
    bank: "Bank of America",
    cardType: "Mastercard",
    cardLast4: "5555",
    filedDate: "2024-01-12",
    responseDeadline: "2024-01-22",
    daysLeft: 0,
    product: "Toyota Camry 2018 Engine",
    tracking: "1Z999AA10123456785",
    deliveryStatus: "Delivered",
    deliveryDate: "2024-01-08",
    signedBy: "M. Wilson",
    documents: ["invoice", "tracking", "photos"],
    notes: "Customer says engine has different mileage than listed",
    assignedTo: "Tom Davis",
  },
  {
    id: "CB-2024-003",
    orderId: "ORD-67123",
    customer: {
      name: "Emily Chen",
      email: "emily.chen@yahoo.com",
      phone: "+1 (555) 456-7890",
      redFlags: 5,
      previousChargebacks: 4,
      totalOrders: 6,
      fraudScore: 95,
    },
    amount: 2150.0,
    reason: "Fraudulent Transaction",
    reasonCode: "10.4",
    status: "fighting",
    priority: "critical",
    bank: "Wells Fargo",
    cardType: "Visa",
    cardLast4: "1234",
    filedDate: "2024-01-10",
    responseDeadline: "2024-01-20",
    daysLeft: -2,
    product: "BMW 328i 2017 Transmission",
    tracking: "1Z999AA10123456786",
    deliveryStatus: "Delivered",
    deliveryDate: "2024-01-05",
    signedBy: "E. Chen",
    documents: ["invoice", "tracking", "delivery_proof", "ip_logs", "signature"],
    notes: "Serial chargeback abuser - fight aggressively",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "CB-2024-004",
    orderId: "ORD-56012",
    customer: {
      name: "David Brown",
      email: "dbrown@hotmail.com",
      phone: "+1 (555) 321-0987",
      redFlags: 1,
      previousChargebacks: 1,
      totalOrders: 8,
      fraudScore: 45,
    },
    amount: 875.5,
    reason: "Credit Not Processed",
    reasonCode: "13.6",
    status: "won",
    priority: "low",
    bank: "Citibank",
    cardType: "Amex",
    cardLast4: "0005",
    filedDate: "2024-01-05",
    responseDeadline: "2024-01-15",
    daysLeft: -7,
    product: "Ford F-150 2020 Starter Motor",
    tracking: "1Z999AA10123456787",
    deliveryStatus: "Delivered",
    deliveryDate: "2024-01-02",
    signedBy: "D. Brown",
    documents: ["invoice", "refund_proof", "communication"],
    notes: "Refund was already issued - provided proof to bank",
    assignedTo: "Tom Davis",
  },
  {
    id: "CB-2024-005",
    orderId: "ORD-45901",
    customer: {
      name: "Lisa Martinez",
      email: "lisa.m@outlook.com",
      phone: "+1 (555) 654-3210",
      redFlags: 0,
      previousChargebacks: 0,
      totalOrders: 3,
      fraudScore: 10,
    },
    amount: 425.0,
    reason: "Duplicate Processing",
    reasonCode: "12.6",
    status: "lost",
    priority: "low",
    bank: "Capital One",
    cardType: "Visa",
    cardLast4: "9876",
    filedDate: "2024-01-01",
    responseDeadline: "2024-01-11",
    daysLeft: -11,
    product: "Chevrolet Malibu 2019 Alternator",
    tracking: "1Z999AA10123456788",
    deliveryStatus: "Delivered",
    deliveryDate: "2023-12-28",
    signedBy: "L. Martinez",
    documents: ["invoice"],
    notes: "Legitimate duplicate charge - refunded customer",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "CB-2024-006",
    orderId: "ORD-34890",
    customer: {
      name: "Robert Taylor",
      email: "rtaylor@gmail.com",
      phone: "+1 (555) 789-0123",
      redFlags: 2,
      previousChargebacks: 1,
      totalOrders: 4,
      fraudScore: 60,
    },
    amount: 1875.0,
    reason: "Product Not Received",
    reasonCode: "13.1",
    status: "pending_response",
    priority: "high",
    bank: "US Bank",
    cardType: "Mastercard",
    cardLast4: "7777",
    filedDate: "2024-01-14",
    responseDeadline: "2024-01-24",
    daysLeft: 2,
    product: "Jeep Wrangler 2018 Transfer Case",
    tracking: "1Z999AA10123456789",
    deliveryStatus: "In Transit",
    deliveryDate: null,
    signedBy: null,
    documents: ["invoice", "tracking"],
    notes: "Package still in transit - valid concern",
    assignedTo: "Tom Davis",
  },
]

// Red flagged customers
const redFlaggedCustomers = [
  {
    name: "Emily Chen",
    email: "emily.chen@yahoo.com",
    fraudScore: 95,
    chargebacks: 4,
    totalLost: 5420.0,
    flags: ["Serial Chargebacker", "IP Mismatch", "Multiple Cards", "Fake Signatures"],
    status: "blocked",
  },
  {
    name: "John Smith",
    email: "john.smith@email.com",
    fraudScore: 85,
    chargebacks: 2,
    totalLost: 2100.0,
    flags: ["Previous Chargebacks", "Delivery Disputes"],
    status: "flagged",
  },
  {
    name: "Robert Taylor",
    email: "rtaylor@gmail.com",
    fraudScore: 60,
    chargebacks: 1,
    totalLost: 750.0,
    flags: ["Address Mismatch"],
    status: "watch",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending_response: {
    label: "Pending Response",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: Clock,
  },
  in_review: { label: "In Review", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Eye },
  fighting: { label: "Fighting", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Gavel },
  won: { label: "Won", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CheckCircle },
  lost: { label: "Lost", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  critical: { label: "Critical", color: "bg-red-600 text-white" },
  high: { label: "High", color: "bg-orange-500 text-white" },
  medium: { label: "Medium", color: "bg-yellow-500 text-black" },
  low: { label: "Low", color: "bg-gray-500 text-white" },
}

export default function ChargebacksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedChargeback, setSelectedChargeback] = useState<(typeof chargebacks)[0] | null>(null)

  const stats = useMemo(() => {
    const total = chargebacks.length
    const pending = chargebacks.filter((c) => c.status === "pending_response" || c.status === "in_review").length
    const fighting = chargebacks.filter((c) => c.status === "fighting").length
    const won = chargebacks.filter((c) => c.status === "won").length
    const lost = chargebacks.filter((c) => c.status === "lost").length
    const totalAmount = chargebacks.reduce((sum, c) => sum + c.amount, 0)
    const wonAmount = chargebacks.filter((c) => c.status === "won").reduce((sum, c) => sum + c.amount, 0)
    const lostAmount = chargebacks.filter((c) => c.status === "lost").reduce((sum, c) => sum + c.amount, 0)
    const winRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : 0
    const urgentCount = chargebacks.filter((c) => c.daysLeft <= 3 && c.daysLeft >= 0).length
    const overdueCount = chargebacks.filter((c) => c.daysLeft < 0 && c.status !== "won" && c.status !== "lost").length

    return {
      total,
      pending,
      fighting,
      won,
      lost,
      totalAmount,
      wonAmount,
      lostAmount,
      winRate,
      urgentCount,
      overdueCount,
    }
  }, [])

  const filteredChargebacks = useMemo(() => {
    return chargebacks.filter((cb) => {
      const matchesSearch =
        cb.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cb.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cb.customer.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "pending" && (cb.status === "pending_response" || cb.status === "in_review")) ||
        (activeTab === "fighting" && cb.status === "fighting") ||
        (activeTab === "won" && cb.status === "won") ||
        (activeTab === "lost" && cb.status === "lost") ||
        (activeTab === "urgent" && cb.daysLeft <= 3 && cb.daysLeft >= 0) ||
        (activeTab === "overdue" && cb.daysLeft < 0 && cb.status !== "won" && cb.status !== "lost")

      return matchesSearch && matchesTab
    })
  }, [searchTerm, activeTab])

  const getFraudScoreColor = (score: number) => {
    if (score >= 80) return "text-red-500 bg-red-500/20"
    if (score >= 50) return "text-orange-500 bg-orange-500/20"
    if (score >= 30) return "text-yellow-500 bg-yellow-500/20"
    return "text-emerald-500 bg-emerald-500/20"
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              Chargeback Management
            </h1>
            <p className="text-white/60 mt-1">Fight disputes, manage refunds, and protect your revenue</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
              <FilePlus className="h-4 w-4 mr-2" />
              New Dispute
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Total Cases</p>
                  <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">At Risk</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">${stats.totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Win Rate</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.winRate}%</p>
                </div>
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Won</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">${stats.wonAmount.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Lost</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">${stats.lostAmount.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-300 uppercase tracking-wider">Urgent</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">{stats.urgentCount + stats.overdueCount}</p>
                </div>
                <div className="p-2 bg-red-500/30 rounded-lg animate-pulse">
                  <AlertOctagon className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Chargebacks List - 3 columns */}
          <div className="xl:col-span-3 space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search by ID, order, or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-neutral-900 border-white/10 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-neutral-900 border-white/10 text-white">
                    <SelectValue placeholder="Bank" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10">
                    <SelectItem value="all">All Banks</SelectItem>
                    <SelectItem value="chase">Chase</SelectItem>
                    <SelectItem value="boa">Bank of America</SelectItem>
                    <SelectItem value="wells">Wells Fargo</SelectItem>
                    <SelectItem value="citi">Citibank</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-neutral-900 border-white/10 text-white">
                    <SelectValue placeholder="Reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10">
                    <SelectItem value="all">All Reasons</SelectItem>
                    <SelectItem value="not_received">Not Received</SelectItem>
                    <SelectItem value="not_as_described">Not As Described</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="duplicate">Duplicate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Cases", count: stats.total },
                { id: "pending", label: "Pending", count: stats.pending },
                { id: "fighting", label: "Fighting", count: stats.fighting },
                { id: "urgent", label: "Urgent", count: stats.urgentCount, highlight: true },
                { id: "overdue", label: "Overdue", count: stats.overdueCount, danger: true },
                { id: "won", label: "Won", count: stats.won },
                { id: "lost", label: "Lost", count: stats.lost },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? tab.danger
                        ? "bg-red-600 text-white"
                        : tab.highlight
                          ? "bg-amber-600 text-white"
                          : "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                      : tab.danger
                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        : tab.highlight
                          ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                      activeTab === tab.id ? "bg-white/20" : "bg-white/10"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Chargebacks List */}
            <div className="space-y-3">
              {filteredChargebacks.map((cb) => {
                const status = statusConfig[cb.status]
                const priority = priorityConfig[cb.priority]
                const isExpanded = expandedId === cb.id
                const StatusIcon = status.icon

                return (
                  <Card
                    key={cb.id}
                    className={`bg-neutral-900 border-white/10 overflow-hidden transition-all ${
                      cb.customer.fraudScore >= 80 ? "ring-2 ring-red-500/50" : ""
                    }`}
                  >
                    {/* Collapsed View */}
                    <div
                      className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : cb.id)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Priority & Status */}
                        <div className="flex flex-col items-center gap-1">
                          <Badge className={`${priority.color} text-xs`}>{priority.label}</Badge>
                          <Badge className={`${status.color} border text-xs`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-white font-medium">{cb.id}</span>
                            <span className="text-white/40">•</span>
                            <span className="text-white/60">{cb.orderId}</span>
                            {cb.customer.redFlags > 0 && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">
                                <Flag className="h-3 w-3 mr-1" />
                                {cb.customer.redFlags} Flags
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-white/80">{cb.customer.name}</span>
                            <span className="text-white/40">•</span>
                            <span className="text-white/60 text-sm">{cb.reason}</span>
                          </div>
                          <p className="text-white/50 text-sm mt-1 truncate">{cb.product}</p>
                        </div>

                        {/* Amount & Deadline */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">${cb.amount.toLocaleString()}</p>
                          <div
                            className={`flex items-center gap-1 text-sm mt-1 ${
                              cb.daysLeft < 0 ? "text-red-400" : cb.daysLeft <= 3 ? "text-amber-400" : "text-white/60"
                            }`}
                          >
                            <Clock className="h-3 w-3" />
                            {cb.daysLeft < 0
                              ? `${Math.abs(cb.daysLeft)} days overdue`
                              : cb.daysLeft === 0
                                ? "Due today!"
                                : `${cb.daysLeft} days left`}
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <div className="text-white/40">
                          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded View */}
                    {isExpanded && (
                      <div className="border-t border-white/10 p-4 bg-neutral-950/50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Customer Info */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <User className="h-4 w-4 text-blue-400" />
                              Customer Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/50">Name</span>
                                <span className="text-white">{cb.customer.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Email</span>
                                <span className="text-white">{cb.customer.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Phone</span>
                                <span className="text-white">{cb.customer.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Total Orders</span>
                                <span className="text-white">{cb.customer.totalOrders}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Previous Chargebacks</span>
                                <span
                                  className={cb.customer.previousChargebacks > 0 ? "text-red-400" : "text-emerald-400"}
                                >
                                  {cb.customer.previousChargebacks}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-white/50">Fraud Score</span>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-medium ${getFraudScoreColor(cb.customer.fraudScore)}`}
                                >
                                  {cb.customer.fraudScore}/100
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-white/10 text-white hover:bg-white/10 bg-transparent"
                              >
                                <Mail className="h-3 w-3 mr-1" /> Email
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-white/10 text-white hover:bg-white/10 bg-transparent"
                              >
                                <Phone className="h-3 w-3 mr-1" /> Call
                              </Button>
                            </div>
                          </div>

                          {/* Transaction Details */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-purple-400" />
                              Transaction Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/50">Bank</span>
                                <span className="text-white">{cb.bank}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Card</span>
                                <span className="text-white">
                                  {cb.cardType} •••• {cb.cardLast4}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Reason Code</span>
                                <span className="text-white">{cb.reasonCode}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Filed Date</span>
                                <span className="text-white">{cb.filedDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Deadline</span>
                                <span className={cb.daysLeft < 0 ? "text-red-400" : "text-white"}>
                                  {cb.responseDeadline}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Assigned To</span>
                                <span className="text-white">{cb.assignedTo}</span>
                              </div>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-white/50 text-xs mb-1">Notes</p>
                              <p className="text-white text-sm">{cb.notes}</p>
                            </div>
                          </div>

                          {/* Delivery & Documents */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <FileText className="h-4 w-4 text-emerald-400" />
                              Delivery & Documents
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/50">Tracking</span>
                                <span className="text-blue-400 font-mono text-xs">{cb.tracking}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/50">Status</span>
                                <Badge
                                  className={
                                    cb.deliveryStatus === "Delivered"
                                      ? "bg-emerald-500/20 text-emerald-400"
                                      : "bg-amber-500/20 text-amber-400"
                                  }
                                >
                                  {cb.deliveryStatus}
                                </Badge>
                              </div>
                              {cb.deliveryDate && (
                                <div className="flex justify-between">
                                  <span className="text-white/50">Delivered</span>
                                  <span className="text-white">{cb.deliveryDate}</span>
                                </div>
                              )}
                              {cb.signedBy && (
                                <div className="flex justify-between">
                                  <span className="text-white/50">Signed By</span>
                                  <span className="text-white">{cb.signedBy}</span>
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-white/50 text-xs mb-2">Documents Available</p>
                              <div className="flex flex-wrap gap-2">
                                {cb.documents.map((doc) => (
                                  <Badge
                                    key={doc}
                                    className="bg-white/10 text-white/80 border-white/20 border cursor-pointer hover:bg-white/20"
                                  >
                                    <FileCheck className="h-3 w-3 mr-1" />
                                    {doc.replace("_", " ")}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Dialog
                              open={uploadDialogOpen && selectedChargeback?.id === cb.id}
                              onOpenChange={setUploadDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  className="w-full bg-blue-600 hover:bg-blue-700"
                                  onClick={() => {
                                    setSelectedChargeback(cb)
                                    setUploadDialogOpen(true)
                                  }}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Evidence
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Submit Evidence to Bank</DialogTitle>
                                  <DialogDescription className="text-white/60">
                                    Upload documents to fight chargeback {cb.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-white/80">Invoice/Receipt</Label>
                                      <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer">
                                        <Upload className="h-6 w-6 mx-auto text-white/40 mb-2" />
                                        <p className="text-sm text-white/60">Click to upload</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-white/80">Delivery Proof</Label>
                                      <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer">
                                        <Upload className="h-6 w-6 mx-auto text-white/40 mb-2" />
                                        <p className="text-sm text-white/60">Click to upload</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-white/80">Tracking Information</Label>
                                      <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer">
                                        <Upload className="h-6 w-6 mx-auto text-white/40 mb-2" />
                                        <p className="text-sm text-white/60">Click to upload</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-white/80">Customer Communication</Label>
                                      <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer">
                                        <Upload className="h-6 w-6 mx-auto text-white/40 mb-2" />
                                        <p className="text-sm text-white/60">Click to upload</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-white/80">Response Letter</Label>
                                    <Textarea
                                      className="mt-2 bg-neutral-800 border-white/10 text-white min-h-[100px]"
                                      placeholder="Write your response to the bank explaining why this chargeback is invalid..."
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-white/80">Submit To</Label>
                                    <Select defaultValue="bank">
                                      <SelectTrigger className="mt-2 bg-neutral-800 border-white/10 text-white">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-neutral-900 border-white/10">
                                        <SelectItem value="bank">{cb.bank} - Dispute Portal</SelectItem>
                                        <SelectItem value="stripe">Stripe Dashboard</SelectItem>
                                        <SelectItem value="paypal">PayPal Resolution Center</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    className="border-white/10 text-white bg-transparent"
                                    onClick={() => setUploadDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button className="bg-gradient-to-r from-red-600 to-orange-600">
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit to Bank
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <CheckCircle className="h-4 w-4 mr-1" /> Mark Won
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <XCircle className="h-4 w-4 mr-1" /> Mark Lost
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/10 bg-transparent"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" /> Request Refund
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/10 bg-transparent"
                          >
                            <Ban className="h-4 w-4 mr-1" /> Block Customer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/10 bg-transparent"
                          >
                            <Printer className="h-4 w-4 mr-1" /> Print
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/10 bg-transparent"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" /> View Order
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar - Red Flagged Customers */}
          <div className="space-y-4">
            {/* Red Flagged Customers */}
            <Card className="bg-gradient-to-br from-red-950/50 to-neutral-900 border-red-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  Red Flagged Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {redFlaggedCustomers.map((customer, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      customer.status === "blocked"
                        ? "bg-red-500/10 border-red-500/30"
                        : customer.status === "flagged"
                          ? "bg-orange-500/10 border-orange-500/30"
                          : "bg-yellow-500/10 border-yellow-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white text-sm">{customer.name}</span>
                      <Badge
                        className={`text-xs ${
                          customer.status === "blocked"
                            ? "bg-red-600 text-white"
                            : customer.status === "flagged"
                              ? "bg-orange-600 text-white"
                              : "bg-yellow-600 text-black"
                        }`}
                      >
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/50">Fraud Score</span>
                      <span className={`font-bold ${getFraudScoreColor(customer.fraudScore)}`}>
                        {customer.fraudScore}/100
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/50">Chargebacks</span>
                      <span className="text-red-400 font-medium">{customer.chargebacks}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-white/50">Total Lost</span>
                      <span className="text-red-400 font-medium">${customer.totalLost.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {customer.flags.map((flag, fidx) => (
                        <Badge key={fidx} className="text-[10px] bg-white/10 text-white/70 border-white/20 border">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  View All Flagged
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-neutral-900 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-white/60 text-sm">Total Disputes</span>
                  <span className="text-white font-bold">24</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-emerald-500/10 rounded-lg">
                  <span className="text-emerald-400 text-sm">Won</span>
                  <span className="text-emerald-400 font-bold">18 ($12,450)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-500/10 rounded-lg">
                  <span className="text-red-400 text-sm">Lost</span>
                  <span className="text-red-400 font-bold">4 ($2,840)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-amber-500/10 rounded-lg">
                  <span className="text-amber-400 text-sm">Pending</span>
                  <span className="text-amber-400 font-bold">2 ($3,125)</span>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Win Rate</span>
                    <span className="text-2xl font-bold text-emerald-400">81.8%</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    +5.2% from last month
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-neutral-900 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/10 text-white hover:bg-white/10 bg-transparent"
                >
                  <FileText className="h-4 w-4 mr-2 text-blue-400" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/10 text-white hover:bg-white/10 bg-transparent"
                >
                  <Bell className="h-4 w-4 mr-2 text-amber-400" />
                  Set Deadline Alert
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/10 text-white hover:bg-white/10 bg-transparent"
                >
                  <Scale className="h-4 w-4 mr-2 text-purple-400" />
                  Dispute Templates
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/10 text-white hover:bg-white/10 bg-transparent"
                >
                  <Building className="h-4 w-4 mr-2 text-emerald-400" />
                  Bank Contacts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
