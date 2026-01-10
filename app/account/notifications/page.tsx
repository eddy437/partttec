"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Plus,
  Trash2,
  Check,
  Car,
  Settings,
  Tag,
  Package,
  ChevronRight,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface Subscription {
  id: string
  type: "brand" | "category" | "part" | "make" | "model"
  value: string
  channels: ("email" | "sms" | "push")[]
  createdAt: string
  active: boolean
}

interface Notification {
  id: string
  type: string
  title: string
  message: string
  status: string
  productId?: string
  createdAt: string
  readAt?: string
}

const brands = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes",
  "Audi",
  "Nissan",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Subaru",
]
const categories = [
  "Engine",
  "Transmission",
  "Brakes",
  "Suspension",
  "Electrical",
  "Body Parts",
  "Interior",
  "Exhaust",
  "Cooling",
  "Steering",
]
const makes = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Nissan",
  "Hyundai",
  "Kia",
  "Dodge",
  "Jeep",
  "Ram",
  "GMC",
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("subscriptions")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  // New subscription form
  const [newSubType, setNewSubType] = useState<"brand" | "category" | "make">("brand")
  const [newSubValue, setNewSubValue] = useState("")
  const [newSubEmail, setNewSubEmail] = useState(true)
  const [newSubSms, setNewSubSms] = useState(false)
  const [newSubPush, setNewSubPush] = useState(true)

  // Global preferences
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Demo customer ID - in production, get from auth
      const customerId = "cust-1"

      const [subsRes, notifsRes] = await Promise.all([
        fetch(`/api/subscriptions?customerId=${customerId}`),
        fetch(`/api/notifications?customerId=${customerId}`),
      ])

      const subs = await subsRes.json()
      const notifs = await notifsRes.json()

      setSubscriptions(subs)
      setNotifications(notifs)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  const addSubscription = async () => {
    if (!newSubValue) return

    const channels: ("email" | "sms" | "push")[] = []
    if (newSubEmail) channels.push("email")
    if (newSubSms) channels.push("sms")
    if (newSubPush) channels.push("push")

    if (channels.length === 0) {
      alert("Please select at least one notification channel")
      return
    }

    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: "cust-1",
          customerEmail: "demo@example.com",
          customerPhone: "+1234567890",
          customerName: "Demo User",
          type: newSubType,
          value: newSubValue,
          channels,
        }),
      })

      const newSub = await res.json()
      setSubscriptions([...subscriptions, newSub])
      setNewSubValue("")
    } catch (error) {
      console.error("Error adding subscription:", error)
    }
  }

  const removeSubscription = async (id: string) => {
    try {
      await fetch(`/api/subscriptions?id=${id}`, { method: "DELETE" })
      setSubscriptions(subscriptions.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Error removing subscription:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_read", id }),
      })
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, status: "read", readAt: new Date().toISOString() } : n)),
      )
    } catch (error) {
      console.error("Error marking as read:", error)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "brand":
        return <Tag className="h-4 w-4" />
      case "category":
        return <Package className="h-4 w-4" />
      case "make":
        return <Car className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "brand":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "category":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "make":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    }
  }

  const unreadCount = notifications.filter((n) => n.status !== "read").length

  const tabs = [
    { id: "subscriptions", label: "My Subscriptions", count: subscriptions.length },
    { id: "notifications", label: "Notifications", count: unreadCount },
    { id: "preferences", label: "Preferences", count: null },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
          <Link href="/account" className="hover:text-white">
            Account
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">Notification Center</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notification Center</h1>
            <p className="text-zinc-400 mt-1">
              Subscribe to brands, categories, and parts to get notified when new products arrive
            </p>
          </div>
          {unreadCount > 0 && <Badge className="bg-red-600 text-white px-3 py-1 text-sm">{unreadCount} Unread</Badge>}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-800 pb-4">
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
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20" : "bg-zinc-700"}`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "subscriptions" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Add Subscription Form */}
            <Card className="bg-zinc-900 border-zinc-800 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus className="h-5 w-5 text-red-500" />
                  Add Subscription
                </CardTitle>
                <CardDescription>Get notified when matching products are added</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Subscription Type</Label>
                  <div className="flex gap-2">
                    {(["brand", "category", "make"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setNewSubType(type)
                          setNewSubValue("")
                        }}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                          newSubType === type ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Select {newSubType}</Label>
                  <Select value={newSubValue} onValueChange={setNewSubValue}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder={`Choose ${newSubType}...`} />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {(newSubType === "brand" ? brands : newSubType === "category" ? categories : makes).map(
                        (item) => (
                          <SelectItem key={item} value={item} className="text-white hover:bg-zinc-700">
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="text-zinc-300">Notify me via</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-white">Email</span>
                      </div>
                      <Switch checked={newSubEmail} onCheckedChange={setNewSubEmail} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-emerald-400" />
                        <span className="text-sm text-white">SMS</span>
                      </div>
                      <Switch checked={newSubSms} onCheckedChange={setNewSubSms} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-white">Push</span>
                      </div>
                      <Switch checked={newSubPush} onCheckedChange={setNewSubPush} />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
                  onClick={addSubscription}
                  disabled={!newSubValue}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Active Subscriptions */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Active Subscriptions</h2>
                <span className="text-sm text-zinc-400">{subscriptions.length} subscriptions</span>
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-zinc-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : subscriptions.length === 0 ? (
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-zinc-600 mb-4" />
                    <p className="text-zinc-400 text-center">
                      No subscriptions yet. Add one to get notified about new products!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {subscriptions.map((sub) => (
                    <Card key={sub.id} className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${getTypeColor(sub.type)}`}>{getTypeIcon(sub.type)}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">{sub.value}</span>
                                <Badge variant="outline" className={`text-xs ${getTypeColor(sub.type)}`}>
                                  {sub.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                {sub.channels.includes("email") && (
                                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                                    <Mail className="h-3 w-3" /> Email
                                  </span>
                                )}
                                {sub.channels.includes("sms") && (
                                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                                    <MessageSquare className="h-3 w-3" /> SMS
                                  </span>
                                )}
                                {sub.channels.includes("push") && (
                                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                                    <Smartphone className="h-3 w-3" /> Push
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-400 hover:text-red-500 hover:bg-red-500/10"
                            onClick={() => removeSubscription(sub.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-zinc-800 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Bell className="h-16 w-16 text-zinc-600 mb-4" />
                  <p className="text-zinc-400 text-center text-lg">No notifications yet</p>
                  <p className="text-zinc-500 text-sm mt-1">Subscribe to brands and categories to receive updates</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notif) => (
                <Card
                  key={notif.id}
                  className={`bg-zinc-900 border-zinc-800 transition-all ${
                    notif.status !== "read" ? "border-l-4 border-l-red-500" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-lg ${
                            notif.type === "new_product"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : notif.type === "price_drop"
                                ? "bg-blue-500/20 text-blue-400"
                                : notif.type === "back_in_stock"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          {notif.type === "new_product" ? (
                            <Package className="h-5 w-5" />
                          ) : notif.type === "price_drop" ? (
                            <Tag className="h-5 w-5" />
                          ) : (
                            <Bell className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{notif.title}</h3>
                            {notif.status !== "read" && <Badge className="bg-red-600 text-white text-xs">New</Badge>}
                          </div>
                          <p className="text-zinc-400 text-sm mt-1">{notif.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                            {notif.productId && (
                              <Link
                                href={`/product/${notif.productId}`}
                                className="text-xs text-red-400 hover:text-red-300"
                              >
                                View Product
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      {notif.status !== "read" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-400 hover:text-white"
                          onClick={() => markAsRead(notif.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="max-w-2xl">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-red-500" />
                  Global Notification Preferences
                </CardTitle>
                <CardDescription>Control how you receive notifications across all subscriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Notification Channels</h3>

                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Email Notifications</p>
                        <p className="text-sm text-zinc-400">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">SMS Notifications</p>
                        <p className="text-sm text-zinc-400">Receive text messages for urgent updates</p>
                      </div>
                    </div>
                    <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Smartphone className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Push Notifications</p>
                        <p className="text-sm text-zinc-400">Browser and mobile push alerts</p>
                      </div>
                    </div>
                    <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-6 space-y-4">
                  <h3 className="font-semibold text-white">Marketing & Promotions</h3>

                  <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Marketing Communications</p>
                      <p className="text-sm text-zinc-400">Receive special offers, promotions, and newsletters</p>
                    </div>
                    <Switch checked={marketingEnabled} onCheckedChange={setMarketingEnabled} />
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
