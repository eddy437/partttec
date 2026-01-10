"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Upload,
  Database,
  Pencil,
  Trash2,
  Plus,
  TrendingUp,
  Activity,
  CircleDot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [title, setTitle] = useState("Dashboard Overview")
  const [subtitle, setSubtitle] = useState("Welcome back, here's what's happening with your store today.")
  const [tempTitle, setTempTitle] = useState(title)
  const [tempSubtitle, setTempSubtitle] = useState(subtitle)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [stats, setStats] = useState([
    { id: 1, title: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: "dollar" },
    { id: 2, title: "Active Orders", value: "+573", change: "+12%", trend: "up", icon: "cart" },
    { id: 3, title: "Total Inventory", value: "106,529", change: "+106,524 new", trend: "up", icon: "database" },
    { id: 4, title: "Total Customers", value: "2,345", change: "-2%", trend: "down", icon: "users" },
    { id: 5, title: "Low Stock Items", value: "24", change: "Needs restocking", trend: "down", icon: "package" },
  ])
  const [editingStat, setEditingStat] = useState<any>(null)

  const [orders, setOrders] = useState([
    { id: 1, orderNum: "#2346", customer: "John Doe", amount: "$245.00", status: "Processing", time: "2 mins ago" },
    { id: 2, orderNum: "#2347", customer: "Jane Smith", amount: "$567.00", status: "Shipped", time: "15 mins ago" },
    { id: 3, orderNum: "#2348", customer: "Bob Wilson", amount: "$123.00", status: "Delivered", time: "1 hour ago" },
    { id: 4, orderNum: "#2349", customer: "Alice Brown", amount: "$890.00", status: "Processing", time: "2 hours ago" },
    { id: 5, orderNum: "#2350", customer: "Charlie Davis", amount: "$456.00", status: "Pending", time: "3 hours ago" },
  ])
  const [editingOrder, setEditingOrder] = useState<any>(null)

  const [systemStatus, setSystemStatus] = useState([
    { id: 1, name: "Database Connection", status: "HEALTHY", color: "green" },
    { id: 2, name: "Payment Gateway", status: "STRIPE_CONNECTED", color: "green" },
    { id: 3, name: "Google Merchant Center", status: "SYNCING...", color: "yellow" },
  ])
  const [editingStatus, setEditingStatus] = useState<any>(null)

  const handleSave = () => {
    setTitle(tempTitle)
    setSubtitle(tempSubtitle)
    setIsDialogOpen(false)
  }

  const handleSaveStat = () => {
    setStats(stats.map((s) => (s.id === editingStat.id ? editingStat : s)))
    setEditingStat(null)
  }

  const handleSaveOrder = () => {
    setOrders(orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)))
    setEditingOrder(null)
  }

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter((o) => o.id !== id))
  }

  const handleSaveStatus = () => {
    setSystemStatus(systemStatus.map((s) => (s.id === editingStatus.id ? editingStatus : s)))
    setEditingStatus(null)
  }

  const handleDeleteStatus = (id: number) => {
    setSystemStatus(systemStatus.filter((s) => s.id !== id))
  }

  const getIcon = (iconName: string) => {
    const iconMap: any = {
      dollar: DollarSign,
      cart: ShoppingCart,
      database: Database,
      users: Users,
      package: Package,
    }
    const Icon = iconMap[iconName] || Package
    return <Icon className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-blue-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1),transparent_50%)]" />

        <div className="relative p-8 pb-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-start gap-4 group">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setTempTitle(title)
                          setTempSubtitle(subtitle)
                        }}
                      >
                        <Pencil className="h-4 w-4 text-white/70 hover:text-white" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Dashboard Header</DialogTitle>
                        <DialogDescription>Customize the welcome message for your admin dashboard.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="subtitle">Subtitle</Label>
                          <Input id="subtitle" value={tempSubtitle} onChange={(e) => setTempSubtitle(e.target.value)} />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSave}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-white/50 text-lg mt-3 flex items-center gap-2">
                  <CircleDot className="h-4 w-4 text-green-500" />
                  {subtitle}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-white/5 backdrop-blur">
                <Clock className="mr-2 h-4 w-4" /> Last 24 Hours
              </Button>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/20">
                <TrendingUp className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 pb-8">
            {stats.slice(0, 4).map((stat, index) => (
              <Card
                key={stat.id}
                className="bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 border-white/10 text-white group relative hover:border-white/20 transition-all backdrop-blur-xl hover:shadow-xl hover:shadow-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-lg" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => setEditingStat({ ...stat })}
                >
                  <Pencil className="h-4 w-4 text-white/70" />
                </Button>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
                  <CardTitle className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      index === 0
                        ? "bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/20"
                        : index === 1
                          ? "bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/20"
                          : index === 2
                            ? "bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/20"
                            : "bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/20"
                    }`}
                  >
                    {getIcon(stat.icon)}
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div
                    className={`flex items-center text-sm font-semibold ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 pt-0 grid gap-6 lg:grid-cols-3">
        {/* Recent Orders - Spans 2 columns */}
        <Card className="lg:col-span-2 bg-neutral-900/50 border-white/10 text-white backdrop-blur-xl">
          <CardHeader className="border-b border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent">
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <span>Recent Orders</span>
              </div>
              <Link href="/admin/orders">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  View All →
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-white/10 group transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-sm border border-blue-500/20">
                      {order.orderNum.replace("#", "")}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-base">{order.customer}</div>
                      <div className="text-sm text-white/50 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {order.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="font-bold text-lg">{order.amount}</div>
                      <div
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-500/20 text-green-400 border border-green-500/20"
                            : order.status === "Shipped"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                              : order.status === "Processing"
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/20"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white/10"
                        onClick={() => setEditingOrder({ ...order })}
                      >
                        <Pencil className="h-4 w-4 text-white/70" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/10"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-neutral-900/50 border-white/10 text-white backdrop-blur-xl">
            <CardHeader className="border-b border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 pt-6">
              <Link href="/admin/products/new">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 border border-blue-500/20 h-14 text-base group">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-colors">
                    <Package className="h-5 w-5 text-blue-400" />
                  </div>
                  Add New Product
                </Button>
              </Link>
              <Link href="/admin/bulk-upload">
                <Button className="w-full justify-start bg-gradient-to-r from-green-600/20 to-green-700/20 hover:from-green-600/30 hover:to-green-700/30 border border-green-500/20 h-14 text-base group">
                  <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3 group-hover:bg-green-500/30 transition-colors">
                    <Upload className="h-5 w-5 text-green-400" />
                  </div>
                  Bulk Product Upload
                </Button>
              </Link>
              <Link href="/admin/users/invite">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 border border-purple-500/20 h-14 text-base group">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3 group-hover:bg-purple-500/30 transition-colors">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  Invite Team Member
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-neutral-900/50 border-white/10 text-white backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-green-400" />
                </div>
                System Status
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/10"
                onClick={() =>
                  setSystemStatus([
                    ...systemStatus,
                    {
                      id: Date.now(),
                      name: "New Service",
                      status: "CONNECTED",
                      color: "green",
                    },
                  ])
                }
              >
                <Plus className="h-5 w-5 text-white/70" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
              {systemStatus.map((status) => (
                <div
                  key={status.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 group hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        status.color === "green"
                          ? "bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"
                          : status.color === "yellow"
                            ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                            : "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"
                      }`}
                    />
                    <span className="text-base font-medium">{status.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-semibold px-3 py-1 rounded-full ${
                        status.color === "green"
                          ? "text-green-400 bg-green-500/10 border border-green-500/20"
                          : status.color === "yellow"
                            ? "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                            : "text-red-400 bg-red-500/10 border border-red-500/20"
                      }`}
                    >
                      {status.status}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-white/10"
                        onClick={() => setEditingStatus({ ...status })}
                      >
                        <Pencil className="h-3 w-3 text-white/70" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-500/10"
                        onClick={() => handleDeleteStatus(status.id)}
                      >
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs remain the same */}
      <Dialog open={!!editingStat} onOpenChange={() => setEditingStat(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Stat Card</DialogTitle>
            <DialogDescription>Update the values for this dashboard metric.</DialogDescription>
          </DialogHeader>
          {editingStat && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={editingStat.title}
                  onChange={(e) => setEditingStat({ ...editingStat, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Value</Label>
                <Input
                  value={editingStat.value}
                  onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Change Text</Label>
                <Input
                  value={editingStat.change}
                  onChange={(e) => setEditingStat({ ...editingStat, change: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Trend</Label>
                <Select value={editingStat.trend} onValueChange={(v) => setEditingStat({ ...editingStat, trend: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up">Up (Green)</SelectItem>
                    <SelectItem value="down">Down (Red)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveStat}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingOrder} onOpenChange={() => setEditingOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>Update order details.</DialogDescription>
          </DialogHeader>
          {editingOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Order Number</Label>
                <Input
                  value={editingOrder.orderNum}
                  onChange={(e) => setEditingOrder({ ...editingOrder, orderNum: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Customer Name</Label>
                <Input
                  value={editingOrder.customer}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Amount</Label>
                <Input
                  value={editingOrder.amount}
                  onChange={(e) => setEditingOrder({ ...editingOrder, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={editingOrder.status}
                  onValueChange={(v) => setEditingOrder({ ...editingOrder, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Time</Label>
                <Input
                  value={editingOrder.time}
                  onChange={(e) => setEditingOrder({ ...editingOrder, time: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveOrder}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingStatus} onOpenChange={() => setEditingStatus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit System Status</DialogTitle>
            <DialogDescription>Update system service status.</DialogDescription>
          </DialogHeader>
          {editingStatus && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Service Name</Label>
                <Input
                  value={editingStatus.name}
                  onChange={(e) => setEditingStatus({ ...editingStatus, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Status Text</Label>
                <Input
                  value={editingStatus.status}
                  onChange={(e) => setEditingStatus({ ...editingStatus, status: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Status Color</Label>
                <Select
                  value={editingStatus.color}
                  onValueChange={(v) => setEditingStatus({ ...editingStatus, color: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Green (Healthy)</SelectItem>
                    <SelectItem value="yellow">Yellow (Warning)</SelectItem>
                    <SelectItem value="red">Red (Error)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveStatus}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
