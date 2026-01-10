"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  Megaphone,
  AlertCircle,
  BarChart3,
  Eye,
} from "lucide-react"

interface NotificationStats {
  total: number
  sent: number
  pending: number
  failed: number
  read: number
  totalSubscriptions: number
  byType: {
    new_product: number
    price_drop: number
    back_in_stock: number
    order_update: number
    shipping_update: number
    promotion: number
    newsletter: number
  }
}

interface Subscription {
  id: string
  customerId: string
  customerEmail: string
  customerName: string
  type: string
  value: string
  channels: string[]
  active: boolean
}

interface Notification {
  id: string
  customerId: string
  type: string
  title: string
  message: string
  status: string
  createdAt: string
}

const brands = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi", "Nissan", "All Brands"]
const categories = ["Engine", "Transmission", "Brakes", "Suspension", "Electrical", "All Categories"]

export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState<NotificationStats | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  // Bulk notification form
  const [bulkType, setBulkType] = useState<string>("promotion")
  const [bulkTitle, setBulkTitle] = useState("")
  const [bulkMessage, setBulkMessage] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, subsRes, notifsRes] = await Promise.all([
        fetch("/api/notifications?stats=true"),
        fetch("/api/subscriptions"),
        fetch("/api/notifications"),
      ])

      setStats(await statsRes.json())
      setSubscriptions(await subsRes.json())
      setNotifications(await notifsRes.json())
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  const sendBulkNotification = async () => {
    if (!bulkTitle || !bulkMessage) {
      alert("Please fill in title and message")
      return
    }

    setSending(true)
    try {
      const filters: { brands?: string[]; categories?: string[] } = {}
      if (selectedBrands.length > 0 && !selectedBrands.includes("All Brands")) {
        filters.brands = selectedBrands
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes("All Categories")) {
        filters.categories = selectedCategories
      }

      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bulk",
          type: bulkType,
          title: bulkTitle,
          message: bulkMessage,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
        }),
      })

      const result = await res.json()
      alert(`Notifications sent: ${result.sent}, Failed: ${result.failed}`)

      // Reset form
      setBulkTitle("")
      setBulkMessage("")
      setSelectedBrands([])
      setSelectedCategories([])

      // Refresh data
      fetchData()
    } catch (error) {
      console.error("Error sending notifications:", error)
      alert("Failed to send notifications")
    }
    setSending(false)
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "subscriptions", label: "Subscriptions", icon: Users },
    { id: "history", label: "History", icon: Clock },
    { id: "broadcast", label: "Broadcast", icon: Megaphone },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-emerald-500/20 text-emerald-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      case "read":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-zinc-500/20 text-zinc-400"
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Notification Center</h1>
            <p className="text-zinc-400 mt-1">Manage customer notifications and subscriptions</p>
          </div>
          <Button
            onClick={fetchData}
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats?.totalSubscriptions || 0}</p>
                      <p className="text-xs text-zinc-400">Subscribers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Bell className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats?.total || 0}</p>
                      <p className="text-xs text-zinc-400">Total Sent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats?.sent || 0}</p>
                      <p className="text-xs text-zinc-400">Delivered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats?.pending || 0}</p>
                      <p className="text-xs text-zinc-400">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Eye className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats?.read || 0}</p>
                      <p className="text-xs text-zinc-400">Read</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats?.failed || 0}</p>
                      <p className="text-xs text-zinc-400">Failed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications by Type */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Notifications by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {stats &&
                    Object.entries(stats.byType).map(([type, count]) => (
                      <div key={type} className="text-center p-4 bg-zinc-800 rounded-lg">
                        <p className="text-2xl font-bold text-white">{count}</p>
                        <p className="text-xs text-zinc-400 capitalize">{type.replace("_", " ")}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-zinc-400" />
                        <div>
                          <p className="font-medium text-white">{notif.title}</p>
                          <p className="text-xs text-zinc-400">{notif.message.slice(0, 50)}...</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(notif.status)}>{notif.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">All Subscriptions ({subscriptions.length})</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                      placeholder="Search subscribers..."
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">Value</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">Channels</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub) => (
                        <tr key={sub.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/50">
                          <td className="py-3 px-4 text-white">{sub.customerName}</td>
                          <td className="py-3 px-4 text-zinc-400">{sub.customerEmail}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="capitalize border-zinc-700 text-zinc-300">
                              {sub.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-white font-medium">{sub.value}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              {sub.channels.includes("email") && <Mail className="h-4 w-4 text-blue-400" />}
                              {sub.channels.includes("sms") && <MessageSquare className="h-4 w-4 text-emerald-400" />}
                              {sub.channels.includes("push") && <Smartphone className="h-4 w-4 text-purple-400" />}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                sub.active ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                              }
                            >
                              {sub.active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Notification History</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="all" className="text-white">
                        All Status
                      </SelectItem>
                      <SelectItem value="sent" className="text-white">
                        Sent
                      </SelectItem>
                      <SelectItem value="pending" className="text-white">
                        Pending
                      </SelectItem>
                      <SelectItem value="failed" className="text-white">
                        Failed
                      </SelectItem>
                      <SelectItem value="read" className="text-white">
                        Read
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 bg-zinc-800 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{notif.title}</h3>
                            <Badge className={getStatusColor(notif.status)}>{notif.status}</Badge>
                            <Badge variant="outline" className="border-zinc-700 text-zinc-400 capitalize">
                              {notif.type.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-zinc-400 text-sm mt-1">{notif.message}</p>
                          <p className="text-zinc-500 text-xs mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Broadcast Tab */}
        {activeTab === "broadcast" && (
          <div className="max-w-3xl">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-red-500" />
                  Send Broadcast Notification
                </CardTitle>
                <CardDescription>Send notifications to all subscribers or filter by brand/category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Notification Type</Label>
                  <Select value={bulkType} onValueChange={setBulkType}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="promotion" className="text-white">
                        Promotion
                      </SelectItem>
                      <SelectItem value="newsletter" className="text-white">
                        Newsletter
                      </SelectItem>
                      <SelectItem value="price_drop" className="text-white">
                        Price Drop
                      </SelectItem>
                      <SelectItem value="back_in_stock" className="text-white">
                        Back in Stock
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Title</Label>
                  <Input
                    value={bulkTitle}
                    onChange={(e) => setBulkTitle(e.target.value)}
                    placeholder="Enter notification title..."
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Message</Label>
                  <Textarea
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    placeholder="Enter notification message..."
                    className="bg-zinc-800 border-zinc-700 text-white min-h-32"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-zinc-300">Filter by Brand (optional)</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-zinc-800 rounded-lg">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center gap-2">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand])
                              } else {
                                setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                              }
                            }}
                          />
                          <label htmlFor={`brand-${brand}`} className="text-sm text-white cursor-pointer">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-zinc-300">Filter by Category (optional)</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-zinc-800 rounded-lg">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center gap-2">
                          <Checkbox
                            id={`cat-${cat}`}
                            checked={selectedCategories.includes(cat)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, cat])
                              } else {
                                setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                              }
                            }}
                          />
                          <label htmlFor={`cat-${cat}`} className="text-sm text-white cursor-pointer">
                            {cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <p className="text-sm text-yellow-200">
                    This will send notifications to {subscriptions.length} subscribers.
                    {(selectedBrands.length > 0 || selectedCategories.length > 0) &&
                      " Filtered based on your selections."}
                  </p>
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={sendBulkNotification}
                  disabled={sending || !bulkTitle || !bulkMessage}
                >
                  {sending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Broadcast
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
