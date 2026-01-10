"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Upload,
  Star,
  ExternalLink,
  Clock,
  MapPin,
  CreditCard,
  FileText,
  AlertCircle,
  Copy,
  Printer,
  Share2,
  RefreshCw,
  HelpCircle,
  ShoppingBag,
} from "lucide-react"
import { toast } from "sonner"

export default function OrderTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params?.id as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("status")
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  useEffect(() => {
    const loadOrder = () => {
      try {
        const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
        const foundOrder = allOrders.find((o: any) => o.id === orderId)

        if (foundOrder) {
          setOrder(foundOrder)
          if (foundOrder.review) {
            setRating(foundOrder.review.rating)
            setReviewText(foundOrder.review.text)
          }
        } else {
          // Create demo order for preview
          const demoOrder = {
            id: orderId,
            date: new Date().toISOString(),
            status: "processing",
            items: [
              {
                id: "1",
                name: "Toyota Camry 2.5L Engine Assembly",
                price: 1899.99,
                quantity: 1,
                image: "/toyota-engine.jpg",
                sku: "TOY-CAM-ENG-25L",
                year: "2018-2022",
                condition: "Grade A - 45K Miles",
              },
            ],
            subtotal: 1899.99,
            shipping: 149.99,
            tax: 152.0,
            total: 2201.98,
            customer: {
              name: "Demo Customer",
              email: "demo@example.com",
              phone: "(555) 123-4567",
              address: "123 Main St, Los Angeles, CA 90001",
            },
            shipping: {
              method: "Express Freight",
              cost: 149.99,
              carrier: "FedEx Freight",
              tracking: "794644790132",
              estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            },
            payment: {
              method: "Credit Card",
              last4: "4242",
              status: "paid",
            },
            communications: [
              {
                id: "1",
                type: "system",
                message: "Order confirmed and payment received",
                sender: "system",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              },
              {
                id: "2",
                type: "system",
                message: "Order is being prepared for shipping",
                sender: "system",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              },
            ],
            timeline: [
              {
                status: "Order Placed",
                date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                completed: true,
              },
              {
                status: "Payment Confirmed",
                date: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
                completed: true,
              },
              { status: "Processing", date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), completed: true },
              { status: "Shipped", date: null, completed: false },
              { status: "Delivered", date: null, completed: false },
            ],
          }
          setOrder(demoOrder)
        }
      } catch (error) {
        console.error("Error loading order:", error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const handleSendMessage = (type: "email" | "sms" | "call") => {
    if (!message.trim()) {
      toast.error("Please enter a message")
      return
    }

    const communication = {
      id: Date.now().toString(),
      type,
      message,
      sender: "customer",
      timestamp: new Date().toISOString(),
    }

    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
    const updatedOrders = allOrders.map((o: any) => {
      if (o.id === orderId) {
        return {
          ...o,
          communications: [...(o.communications || []), communication],
        }
      }
      return o
    })

    localStorage.setItem("allOrders", JSON.stringify(updatedOrders))
    setOrder({ ...order, communications: [...(order.communications || []), communication] })
    setMessage("")
    toast.success(`Message sent via ${type}`)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      toast.success("Image uploaded successfully")
    }
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a star rating")
      return
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review")
      return
    }

    const review = {
      rating,
      text: reviewText,
      timestamp: new Date().toISOString(),
      platform: "internal",
    }

    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
    const updatedOrders = allOrders.map((o: any) => {
      if (o.id === orderId) {
        return { ...o, review }
      }
      return o
    })

    localStorage.setItem("allOrders", JSON.stringify(updatedOrders))
    setOrder({ ...order, review })
    toast.success("Review submitted successfully!")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (notFound || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Order Not Found</h1>
          <p className="text-white/60 mb-6">We couldn't find an order with ID: {orderId}</p>
          <div className="flex gap-3 justify-center">
            <Link href="/account">
              <Button className="bg-red-600 hover:bg-red-700">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View All Orders
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "shipped":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-white/10 text-white/60 border-white/20"
    }
  }

  const getStatusStep = () => {
    switch (order.status?.toLowerCase()) {
      case "delivered":
        return 4
      case "shipped":
        return 3
      case "processing":
        return 2
      case "confirmed":
        return 1
      default:
        return 0
    }
  }

  const tabs = [
    { id: "status", label: "Order Status", icon: Package },
    { id: "tracking", label: "Tracking", icon: Truck },
    { id: "details", label: "Details", icon: FileText },
    { id: "contact", label: "Contact Us", icon: MessageSquare },
    { id: "review", label: "Review", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/account">
                <button
                  type="button"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-white">Order {order.id}</h1>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-white/50">
                  Placed on{" "}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(order.id)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Order Progress</h2>
            <button type="button" className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-white/10 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                style={{ width: `${(getStatusStep() / 4) * 100}%` }}
              ></div>
            </div>
            <div className="relative flex justify-between">
              {["Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"].map((step, idx) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      idx <= getStatusStep()
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-black border-white/20 text-white/40"
                    }`}
                  >
                    {idx < getStatusStep() ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : idx === 0 ? (
                      <Package className="w-4 h-4" />
                    ) : idx === 1 ? (
                      <Clock className="w-4 h-4" />
                    ) : idx === 2 ? (
                      <Truck className="w-4 h-4" />
                    ) : idx === 3 ? (
                      <MapPin className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${idx <= getStatusStep() ? "text-white" : "text-white/40"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/10 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-red-500/10 text-red-400 border-b-2 border-red-500"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Status Tab */}
                {activeTab === "status" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {order.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="w-20 h-20 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg?height=80&width=80&query=auto part"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white truncate">{item.name}</h4>
                              <p className="text-sm text-white/50">SKU: {item.sku || "N/A"}</p>
                              <p className="text-sm text-white/50">Condition: {item.condition || "Grade A"}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-white/60">Qty: {item.quantity}</span>
                                <span className="font-semibold text-red-400">${item.price?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Order Timeline</h3>
                      <div className="space-y-4">
                        {(order.timeline || order.communications || []).map((event: any, idx: number) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-3 h-3 rounded-full ${event.completed !== false ? "bg-red-500" : "bg-white/20"}`}
                              ></div>
                              {idx < (order.timeline || order.communications || []).length - 1 && (
                                <div className="w-0.5 h-full bg-white/10 my-1"></div>
                              )}
                            </div>
                            <div className="pb-4">
                              <p className="text-white font-medium">{event.status || event.message}</p>
                              <p className="text-sm text-white/50">
                                {event.date || event.timestamp
                                  ? new Date(event.date || event.timestamp).toLocaleString()
                                  : "Pending"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tracking Tab */}
                {activeTab === "tracking" && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-white/60">Carrier</p>
                          <p className="text-lg font-semibold text-white">
                            {order.shipping?.carrier || "FedEx Freight"}
                          </p>
                        </div>
                        <Truck className="w-10 h-10 text-blue-400" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-white/60">Tracking Number</p>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-mono">{order.shipping?.tracking || "794644790132"}</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(order.shipping?.tracking || "794644790132")}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Copy className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Estimated Delivery</p>
                          <p className="text-white">
                            {order.shipping?.estimatedDelivery
                              ? new Date(order.shipping.estimatedDelivery).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "3-5 Business Days"}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://www.fedex.com/fedextrack/?trknbr=${order.shipping?.tracking || "794644790132"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        Track on Carrier Site
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-red-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-white">{order.customer?.name}</p>
                            <p className="text-white/60">{order.customer?.address}</p>
                            <p className="text-white/60">{order.customer?.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-white/60" />
                            <div>
                              <p className="text-sm text-white/60">Payment Method</p>
                              <p className="text-white">
                                {order.payment?.method} •••• {order.payment?.last4 || "4242"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <span className="text-white/60">Status</span>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {order.payment?.status || "Paid"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Billing Address</h3>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <p className="font-medium text-white">{order.customer?.name}</p>
                          <p className="text-white/60">{order.customer?.address}</p>
                          <p className="text-white/60">{order.customer?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-white/60">
                          <span>Subtotal</span>
                          <span>${order.subtotal?.toLocaleString() || "0.00"}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>Shipping</span>
                          <span>${order.shipping?.cost?.toLocaleString() || "0.00"}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>Tax</span>
                          <span>${order.tax?.toLocaleString() || "0.00"}</span>
                        </div>
                        <div className="flex justify-between text-white font-semibold pt-2 border-t border-white/10">
                          <span>Total</span>
                          <span className="text-red-400">${order.total?.toLocaleString() || "0.00"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <a
                        href="tel:1-800-555-0123"
                        className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-white">Call Us</p>
                          <p className="text-sm text-white/60">1-800-555-0123</p>
                        </div>
                      </a>
                      <a
                        href="mailto:support@auw.com"
                        className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-white">Email Us</p>
                          <p className="text-sm text-white/60">support@auw.com</p>
                        </div>
                      </a>
                      <button
                        type="button"
                        className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-white">Live Chat</p>
                          <p className="text-sm text-white/60">Available 24/7</p>
                        </div>
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Send a Message</h3>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
                        />
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-white/70">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Attach Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          </label>
                          <div className="flex-1"></div>
                          <button
                            type="button"
                            onClick={() => handleSendMessage("email")}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <Send className="w-4 h-4" />
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>

                    {order.communications?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Message History</h3>
                        <div className="space-y-3">
                          {order.communications.map((comm: any) => (
                            <div
                              key={comm.id}
                              className={`p-4 rounded-xl ${
                                comm.sender === "customer"
                                  ? "bg-red-500/10 border border-red-500/20 ml-8"
                                  : "bg-white/5 border border-white/10 mr-8"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-white">
                                  {comm.sender === "customer" ? "You" : "Support Team"}
                                </span>
                                <span className="text-xs text-white/50">
                                  {new Date(comm.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-white/80">{comm.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Review Tab */}
                {activeTab === "review" && (
                  <div className="space-y-6">
                    {order.review ? (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Thank You for Your Review!</h3>
                        <div className="flex justify-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-6 h-6 ${star <= order.review.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
                            />
                          ))}
                        </div>
                        <p className="text-white/70">"{order.review.text}"</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Leave a Review</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-white/60 mb-2">Your Rating</p>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  className="p-1 hover:scale-110 transition-transform"
                                >
                                  <Star
                                    className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-white/20 hover:text-white/40"}`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-white/60 mb-2">Your Review</p>
                            <Textarea
                              placeholder="Share your experience with this order..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSubmitReview}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                          >
                            Submit Review
                          </button>
                        </div>

                        <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                          <h4 className="font-medium text-white mb-3">Share on Social Media</h4>
                          <div className="flex gap-3">
                            <a
                              href="https://www.google.com/maps"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Google
                            </a>
                            <a
                              href="https://www.facebook.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Facebook
                            </a>
                            <a
                              href="https://www.yelp.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Yelp
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${order.subtotal?.toLocaleString() || "0.00"}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>${order.shipping?.cost?.toLocaleString() || "0.00"}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax</span>
                  <span>${order.tax?.toLocaleString() || "0.00"}</span>
                </div>
                <div className="flex justify-between text-white font-semibold pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-red-400">${order.total?.toLocaleString() || "0.00"}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
                >
                  <FileText className="w-5 h-5 text-white/60" />
                  Download Invoice
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-white/60" />
                  Request Return
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-white/60" />
                  Get Help
                </button>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-sm text-white/60 mb-4">Our support team is available 24/7 to assist you.</p>
              <a href="tel:1-800-555-0123">
                <button
                  type="button"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Call 1-800-555-0123
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
