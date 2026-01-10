"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  LogOut,
  User,
  MapPin,
  CreditCard,
  Settings,
  ArrowLeft,
  Crown,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  ExternalLink,
  Heart,
  Users,
  Star,
  Gift,
  Bell,
  Shield,
  Headphones,
  FileText,
  ChevronRight,
  TrendingUp,
  Wallet,
  Award,
  Zap,
  BarChart3,
  RefreshCw,
  Edit,
  Camera,
  Phone,
  Mail,
  Sparkles,
  Target,
  ShoppingBag,
  ThumbsUp,
  MessageSquare,
  Play,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const socialMediaLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/allusedautopartsworld",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-600",
    followers: "125K",
    label: "Follow us for deals & updates",
    handle: "@allusedautopartsworld",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/auw_autoparts",
    color: "from-pink-500 via-purple-500 to-orange-400",
    bgColor: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400",
    followers: "89K",
    label: "See our latest parts & stories",
    handle: "@auw_autoparts",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@allusedautoparts",
    color: "from-red-600 to-red-700",
    bgColor: "bg-red-600",
    followers: "45K",
    label: "Watch install guides & reviews",
    handle: "@allusedautoparts",
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    url: "https://twitter.com/auw_autoparts",
    color: "from-slate-700 to-slate-800",
    bgColor: "bg-slate-800",
    followers: "32K",
    label: "Get real-time updates",
    handle: "@auw_autoparts",
  },
  {
    name: "TikTok",
    icon: MessageCircle,
    url: "https://tiktok.com/@auw_autoparts",
    color: "from-slate-900 to-slate-950",
    bgColor: "bg-black",
    followers: "67K",
    label: "Fun auto content & tips",
    handle: "@auw_autoparts",
  },
]

export default function AccountPage() {
  const { user, orders, logout, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [followedAccounts, setFollowedAccounts] = useState<string[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
    const saved = localStorage.getItem("followedSocials")
    if (saved) setFollowedAccounts(JSON.parse(saved))
  }, [user, isLoading, router])

  const handleFollow = (name: string, url: string) => {
    window.open(url, "_blank")
    if (!followedAccounts.includes(name)) {
      const updated = [...followedAccounts, name]
      setFollowedAccounts(updated)
      localStorage.setItem("followedSocials", JSON.stringify(updated))
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60">Loading your account...</p>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-400" />
      case "processing":
        return <Package className="w-5 h-5 text-yellow-400" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Package className="w-5 h-5 text-white/40" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-white/5 text-white/60 border-white/10"
    }
  }

  // Mock data for dashboard
  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
    rewardsPoints: 2450,
    savedParts: 12,
  }

  const recentActivity = [
    { type: "order", message: "Order #ORD-2024-001 shipped", time: "2 hours ago", icon: Truck },
    { type: "reward", message: "Earned 150 reward points", time: "1 day ago", icon: Award },
    { type: "saved", message: "Saved Honda Accord Engine", time: "2 days ago", icon: Heart },
    { type: "review", message: "Your review was published", time: "3 days ago", icon: Star },
  ]

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "orders", label: "My Orders", icon: Package, badge: orders.length },
    { id: "tracking", label: "Track Orders", icon: Truck },
    { id: "rewards", label: "Rewards", icon: Award, badge: "2,450 pts" },
    { id: "saved", label: "Saved Parts", icon: Heart, badge: 12 },
    { id: "social", label: "Follow Us", icon: Users, badge: `${followedAccounts.length}/${socialMediaLinks.length}` },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
    { id: "profile", label: "My Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "support", label: "Get Support", icon: Headphones },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top Header Bar */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Shop</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm hidden sm:inline">Welcome back,</span>
              <span className="text-white font-semibold">{user.name.split(" ")[0]}</span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="relative p-2 text-white/60 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                type="button"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="p-2 text-white/60 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden sticky top-24">
              {/* Profile Card */}
              <div className="p-6 bg-gradient-to-br from-red-600/20 to-orange-600/20 border-b border-white/10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white ring-4 ring-white/10">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 w-7 h-7 bg-slate-800 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h2 className="text-white font-bold text-lg">{user.name}</h2>
                  <p className="text-white/60 text-sm">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      <Crown className="w-3 h-3 mr-1" />
                      Gold Member
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-3 space-y-1 max-h-[calc(100vh-400px)] overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            activeTab === item.id ? "bg-red-500/30 text-red-300" : "bg-white/10 text-white/60"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* Quick Help */}
              <div className="p-4 border-t border-white/10">
                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-blue-500/20">
                  <Headphones className="w-8 h-8 text-blue-400 mb-2" />
                  <h4 className="text-white font-semibold text-sm mb-1">Need Help?</h4>
                  <p className="text-white/60 text-xs mb-3">Our support team is here 24/7</p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <>
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-red-600/30 via-orange-600/20 to-amber-600/30 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl" />
                  <div className="relative">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
                    <p className="text-white/70">Here's what's happening with your account today.</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-400" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
                    <p className="text-white/60 text-sm">Total Orders</p>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-green-400" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">${stats.totalSpent.toLocaleString()}</p>
                    <p className="text-white/60 text-sm">Total Spent</p>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-amber-400" />
                      </div>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.rewardsPoints.toLocaleString()}</p>
                    <p className="text-white/60 text-sm">Reward Points</p>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-red-400" />
                      </div>
                      <span className="text-xs text-white/40">+3 new</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.savedParts}</p>
                    <p className="text-white/60 text-sm">Saved Parts</p>
                  </div>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab("orders")}
                        className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                      >
                        <Package className="w-6 h-6 text-blue-400" />
                        <span className="text-white text-sm">View Orders</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("tracking")}
                        className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                      >
                        <Truck className="w-6 h-6 text-green-400" />
                        <span className="text-white text-sm">Track Package</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("support")}
                        className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                      >
                        <Headphones className="w-6 h-6 text-purple-400" />
                        <span className="text-white text-sm">Get Support</span>
                      </button>
                      <Link
                        href="/"
                        className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                      >
                        <ShoppingBag className="w-6 h-6 text-red-400" />
                        <span className="text-white text-sm">Shop Parts</span>
                      </Link>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity, idx) => {
                        const Icon = activity.icon
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-white/60" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm truncate">{activity.message}</p>
                              <p className="text-white/40 text-xs">{activity.time}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Social Media Follow Section in Dashboard */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Connect With Us</h3>
                      <p className="text-white/60 text-sm">Follow for exclusive deals & updates</p>
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      <Gift className="w-3 h-3 mr-1" />
                      5% off when you follow all
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {socialMediaLinks.map((social) => {
                      const Icon = social.icon
                      const isFollowed = followedAccounts.includes(social.name)
                      return (
                        <button
                          key={social.name}
                          type="button"
                          onClick={() => handleFollow(social.name, social.url)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                            isFollowed
                              ? "bg-green-500/20 border-green-500/30 text-green-400"
                              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{social.name}</span>
                          {isFollowed && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">My Orders</h1>
                      <p className="text-white/60">Track and manage your orders</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-white bg-transparent hover:bg-white/5"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                    <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                    <p className="text-white/60 mb-6">Start shopping to see your orders here</p>
                    <Link href="/">
                      <Button className="bg-red-600 hover:bg-red-700">Browse Parts</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                      >
                        {/* Order Header */}
                        <div className="p-5 border-b border-white/10 bg-white/5">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                                <Package className="w-6 h-6 text-red-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white">{order.orderNumber}</h3>
                                <p className="text-white/60 text-sm">
                                  {order.date.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>
                                <span className="flex items-center gap-2">
                                  {getStatusIcon(order.status)}
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </Badge>
                              <p className="text-xl font-bold text-white">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Tracking Info */}
                        {order.trackingNumber && (
                          <div className="px-5 py-3 bg-blue-500/10 border-b border-blue-500/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-blue-400" />
                                <div>
                                  <p className="text-white text-sm font-medium">Tracking: {order.trackingNumber}</p>
                                  {order.estimatedDelivery && (
                                    <p className="text-blue-300/70 text-xs">
                                      Est. delivery:{" "}
                                      {order.estimatedDelivery.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              >
                                Track
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Order Items */}
                        <div className="p-5">
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                                <img
                                  src={item.image || "/placeholder.svg?height=60&width=60&query=auto part"}
                                  alt={item.name}
                                  className="w-14 h-14 rounded-lg object-cover bg-white/5"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white font-medium truncate">{item.name}</h4>
                                  <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-white font-semibold">${item.price.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
                            <Link href={`/account/order/${order.orderNumber}`} className="flex-1 min-w-[140px]">
                              <Button
                                variant="outline"
                                className="w-full border-white/10 text-white hover:bg-white/5 bg-transparent"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </Link>
                            {order.status === "shipped" && (
                              <Link href={`/tracking?order=${order.orderNumber}`} className="flex-1 min-w-[140px]">
                                <Button className="w-full bg-red-600 hover:bg-red-700">
                                  <Truck className="w-4 h-4 mr-2" />
                                  Track Package
                                </Button>
                              </Link>
                            )}
                            {order.status === "delivered" && (
                              <Button
                                variant="outline"
                                className="flex-1 min-w-[140px] border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                              >
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                Leave Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Tracking Tab */}
            {activeTab === "tracking" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">Track Orders</h1>
                  <p className="text-white/60">Real-time tracking for your shipments</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex gap-3 mb-6">
                    <input
                      type="text"
                      placeholder="Enter order number or tracking ID..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50"
                    />
                    <Button className="bg-red-600 hover:bg-red-700 px-6">Track</Button>
                  </div>

                  {orders.filter((o) => o.status === "shipped").length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Active Shipments</h3>
                      {orders
                        .filter((o) => o.status === "shipped")
                        .map((order) => (
                          <div key={order.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-white font-semibold">{order.orderNumber}</p>
                                <p className="text-white/60 text-sm">{order.trackingNumber}</p>
                              </div>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Transit</Badge>
                            </div>
                            <Progress value={65} className="h-2 bg-white/10" />
                            <div className="flex justify-between mt-2 text-xs text-white/60">
                              <span>Shipped</span>
                              <span>In Transit</span>
                              <span>Out for Delivery</span>
                              <span>Delivered</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Truck className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/60">No active shipments to track</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Rewards Tab */}
            {activeTab === "rewards" && (
              <>
                <div className="bg-gradient-to-r from-amber-600/30 via-yellow-600/20 to-orange-600/30 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">My Rewards</h1>
                      <p className="text-amber-200/70">Earn points on every purchase</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-white">{stats.rewardsPoints.toLocaleString()}</p>
                      <p className="text-amber-200/70 text-sm">Available Points</p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">+850</p>
                    <p className="text-white/60 text-sm">Earned This Month</p>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                      <Gift className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">$24.50</p>
                    <p className="text-white/60 text-sm">Points Value</p>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">550</p>
                    <p className="text-white/60 text-sm">To Next Tier</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Redeem Points</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/30 transition-colors cursor-pointer">
                      <p className="text-white font-semibold">$10 Off Your Order</p>
                      <p className="text-white/60 text-sm mb-2">1,000 points</p>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Redeem
                      </Button>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/30 transition-colors cursor-pointer">
                      <p className="text-white font-semibold">Free Shipping</p>
                      <p className="text-white/60 text-sm mb-2">500 points</p>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Redeem
                      </Button>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/30 transition-colors cursor-pointer">
                      <p className="text-white font-semibold">$25 Off Your Order</p>
                      <p className="text-white/60 text-sm mb-2">2,000 points</p>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Redeem
                      </Button>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/30 transition-colors cursor-pointer">
                      <p className="text-white font-semibold">Extended Warranty</p>
                      <p className="text-white/60 text-sm mb-2">3,000 points</p>
                      <Button size="sm" variant="outline" className="border-white/20 text-white bg-transparent">
                        750 more needed
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Saved Parts Tab */}
            {activeTab === "saved" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">Saved Parts</h1>
                  <p className="text-white/60">Parts you've saved for later</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-red-500/30 transition-colors"
                    >
                      <div className="aspect-video bg-white/5 relative">
                        <img
                          src={`/assorted-auto-parts.png?height=200&width=300&query=auto part ${i}`}
                          alt={`Saved part ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                        >
                          <Heart className="w-4 h-4 text-white fill-white" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-semibold mb-1">Engine Assembly V6</h4>
                        <p className="text-white/60 text-sm mb-2">Toyota Camry 2018-2022</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-white">$1,299</p>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Social Media Tab */}
            {activeTab === "social" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">Follow Us</h1>
                      <p className="text-white/60">Connect with AUW on social media</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">
                        {followedAccounts.length}/{socialMediaLinks.length}
                      </p>
                      <p className="text-white/60 text-sm">Followed</p>
                    </div>
                  </div>
                </div>

                {/* Rewards Banner */}
                <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">Follow All & Get 5% Off!</h3>
                      <p className="text-amber-200/80 text-sm">
                        Follow all our social accounts to unlock your discount
                      </p>
                    </div>
                    {followedAccounts.length === socialMediaLinks.length ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Unlocked!
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-4 py-2">
                        {socialMediaLinks.length - followedAccounts.length} left
                      </Badge>
                    )}
                  </div>
                  <Progress
                    value={(followedAccounts.length / socialMediaLinks.length) * 100}
                    className="mt-4 h-2 bg-amber-900/30"
                  />
                </div>

                {/* Social Media Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {socialMediaLinks.map((social) => {
                    const isFollowed = followedAccounts.includes(social.name)
                    const Icon = social.icon
                    return (
                      <div
                        key={social.name}
                        className={`bg-slate-900/50 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 ${
                          isFollowed ? "border-green-500/30 bg-green-500/5" : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-14 h-14 rounded-xl ${social.bgColor} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-white">{social.name}</h3>
                              {isFollowed && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                            </div>
                            <p className="text-white/40 text-sm mb-1">{social.handle}</p>
                            <p className="text-white/60 text-sm mb-3">{social.label}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-white/40" />
                                <span className="text-white/60 text-sm">{social.followers} followers</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleFollow(social.name, social.url)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                  isFollowed
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : `bg-gradient-to-r ${social.color} text-white hover:opacity-90`
                                }`}
                              >
                                {isFollowed ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Following
                                  </>
                                ) : (
                                  <>
                                    <ExternalLink className="w-4 h-4" />
                                    Follow
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Benefits Section */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Why Follow Us?</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">Flash Sales</h4>
                        <p className="text-white/60 text-xs">Exclusive deals announced first on social</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Play className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">Install Guides</h4>
                        <p className="text-white/60 text-xs">Video tutorials for DIY installations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">Direct Support</h4>
                        <p className="text-white/60 text-xs">Quick responses via DM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">Notifications</h1>
                  <p className="text-white/60">Stay updated on your orders and deals</p>
                </div>

                <Link href="/account/notifications">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Bell className="w-4 h-4 mr-2" />
                    Manage Notification Preferences
                  </Button>
                </Link>
              </>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">My Profile</h1>
                  <p className="text-white/60">Manage your personal information</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/10">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-slate-800 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{user.name}</h2>
                      <p className="text-white/60">{user.email}</p>
                      <Badge className="mt-2 bg-amber-500/20 text-amber-400 border-amber-500/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Gold Member
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">Date of Birth</label>
                        <input
                          type="date"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">My Addresses</h1>
                      <p className="text-white/60">Manage your shipping addresses</p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Default</Badge>
                      <button type="button" className="text-white/60 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-white font-semibold mb-1">Home</h4>
                    <p className="text-white/60 text-sm">123 Main Street, Apt 4B</p>
                    <p className="text-white/60 text-sm">Los Angeles, CA 90001</p>
                    <p className="text-white/60 text-sm">United States</p>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-white/10 text-white/60 border-white/10">Work</Badge>
                      <button type="button" className="text-white/60 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-white font-semibold mb-1">Office</h4>
                    <p className="text-white/60 text-sm">456 Business Ave, Suite 100</p>
                    <p className="text-white/60 text-sm">Los Angeles, CA 90015</p>
                    <p className="text-white/60 text-sm">United States</p>
                  </div>
                </div>
              </>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payments" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">Payment Methods</h1>
                      <p className="text-white/60">Manage your saved payment methods</p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Card
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">•••• •••• •••• 4242</p>
                          <p className="text-white/60 text-sm">Expires 12/26</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Default</Badge>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MC</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">•••• •••• •••• 8888</p>
                          <p className="text-white/60 text-sm">Expires 08/25</p>
                        </div>
                      </div>
                      <button type="button" className="text-white/60 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Support Tab */}
            {activeTab === "support" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">Get Support</h1>
                  <p className="text-white/60">We're here to help 24/7</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <a
                    href="tel:+18001234567"
                    className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:border-green-500/30 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-7 h-7 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-1">Call Us</h4>
                    <p className="text-white/60 text-sm">1-800-123-4567</p>
                  </a>
                  <a
                    href="mailto:support@auw.com"
                    className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-7 h-7 text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                    <p className="text-white/60 text-sm">support@auw.com</p>
                  </a>
                  <button
                    type="button"
                    className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-7 h-7 text-purple-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-1">Live Chat</h4>
                    <p className="text-white/60 text-sm">Chat with an agent</p>
                  </button>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link
                      href="/returns"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5 text-white/60" />
                      <span className="text-white">Returns & Refunds</span>
                    </Link>
                    <Link
                      href="/warranty"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <Shield className="w-5 h-5 text-white/60" />
                      <span className="text-white">Warranty Info</span>
                    </Link>
                    <Link
                      href="/fitment-guide"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <FileText className="w-5 h-5 text-white/60" />
                      <span className="text-white">Fitment Guide</span>
                    </Link>
                    <Link
                      href="/tracking"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <Truck className="w-5 h-5 text-white/60" />
                      <span className="text-white">Track Order</span>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <>
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
                  <p className="text-white/60">Manage your account settings</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl divide-y divide-white/10">
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Email Notifications</h4>
                      <p className="text-white/60 text-sm">Receive order updates via email</p>
                    </div>
                    <button type="button" className="w-12 h-6 bg-red-600 rounded-full relative">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">SMS Notifications</h4>
                      <p className="text-white/60 text-sm">Receive shipping updates via SMS</p>
                    </div>
                    <button type="button" className="w-12 h-6 bg-white/20 rounded-full relative">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Marketing Emails</h4>
                      <p className="text-white/60 text-sm">Receive deals and promotions</p>
                    </div>
                    <button type="button" className="w-12 h-6 bg-red-600 rounded-full relative">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Two-Factor Authentication</h4>
                      <p className="text-white/60 text-sm">Add extra security to your account</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white bg-transparent hover:bg-white/5"
                    >
                      Enable
                    </Button>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Change Password</h4>
                      <p className="text-white/60 text-sm">Update your account password</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white bg-transparent hover:bg-white/5"
                    >
                      Change
                    </Button>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-red-400 font-semibold">Delete Account</h4>
                      <p className="text-white/60 text-sm">Permanently delete your account and data</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
