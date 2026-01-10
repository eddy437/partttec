"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock, MapPin, Search, Phone, Mail } from "lucide-react"
import Image from "next/image"

interface TrackingStep {
  status: string
  location: string
  date: string
  time: string
  completed: boolean
  current: boolean
}

interface TrackingResult {
  orderNumber: string
  status: string
  estimatedDelivery: string
  carrier: string
  trackingNumber: string
  origin: string
  destination: string
  items: { name: string; quantity: number; image: string }[]
  steps: TrackingStep[]
}

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrack = () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number")
      return
    }

    setLoading(true)
    setError("")

    // Simulate tracking lookup
    setTimeout(() => {
      setTrackingResult({
        orderNumber: orderNumber.toUpperCase(),
        status: "In Transit",
        estimatedDelivery: "December 3, 2025",
        carrier: "FedEx",
        trackingNumber: "7489573948573948",
        origin: "Houston, TX",
        destination: "Los Angeles, CA",
        items: [
          { name: "Engine Assembly - V6 3.5L", quantity: 1, image: "/detailed-engine.png" },
          { name: "Oil Filter Set", quantity: 2, image: "/oil-filter.png" },
        ],
        steps: [
          {
            status: "Order Placed",
            location: "Online",
            date: "Nov 28, 2025",
            time: "10:30 AM",
            completed: true,
            current: false,
          },
          {
            status: "Payment Confirmed",
            location: "Online",
            date: "Nov 28, 2025",
            time: "10:35 AM",
            completed: true,
            current: false,
          },
          {
            status: "Processing",
            location: "Houston, TX",
            date: "Nov 28, 2025",
            time: "2:00 PM",
            completed: true,
            current: false,
          },
          {
            status: "Shipped",
            location: "Houston, TX",
            date: "Nov 29, 2025",
            time: "9:00 AM",
            completed: true,
            current: false,
          },
          {
            status: "In Transit",
            location: "Phoenix, AZ",
            date: "Nov 30, 2025",
            time: "3:45 PM",
            completed: true,
            current: true,
          },
          {
            status: "Out for Delivery",
            location: "Los Angeles, CA",
            date: "Dec 3, 2025",
            time: "Pending",
            completed: false,
            current: false,
          },
          {
            status: "Delivered",
            location: "Los Angeles, CA",
            date: "Dec 3, 2025",
            time: "Pending",
            completed: false,
            current: false,
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image src="/auw-logo-light.png" alt="AUW" width={60} height={60} className="drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-white">Track Your Order</h1>
          </div>
          <p className="text-red-100 text-lg">Enter your order number to see real-time shipping updates</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Box */}
        <Card className="max-w-2xl mx-auto mb-12 bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-red-500" />
              Order Tracking
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your order number or tracking number below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="e.g., ORD-12345 or tracking number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              <Button onClick={handleTrack} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-8">
                {loading ? "Tracking..." : "Track"}
              </Button>
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </CardContent>
        </Card>

        {/* Tracking Result */}
        {trackingResult && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Status Overview */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-zinc-400 text-sm">Order Number</p>
                    <p className="text-2xl font-bold text-white">{trackingResult.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Status</p>
                    <Badge className="bg-amber-500/20 text-amber-400 text-lg px-4 py-1">
                      <Truck className="h-4 w-4 mr-2" />
                      {trackingResult.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Estimated Delivery</p>
                    <p className="text-xl font-semibold text-green-400">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Shipping Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Carrier</span>
                    <span className="text-white font-medium">{trackingResult.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tracking #</span>
                    <span className="text-white font-medium font-mono">{trackingResult.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Origin</span>
                    <span className="text-white font-medium">{trackingResult.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Destination</span>
                    <span className="text-white font-medium">{trackingResult.destination}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Items in Shipment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trackingResult.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded bg-zinc-700"
                      />
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-zinc-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Tracking Timeline */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Tracking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {trackingResult.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 pb-8 last:pb-0">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.current
                              ? "bg-amber-500 text-black"
                              : step.completed
                                ? "bg-green-500 text-white"
                                : "bg-zinc-700 text-zinc-400"
                          }`}
                        >
                          {step.completed ? (
                            step.current ? (
                              <Truck className="h-5 w-5" />
                            ) : (
                              <CheckCircle className="h-5 w-5" />
                            )
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        {index < trackingResult.steps.length - 1 && (
                          <div className={`w-0.5 flex-1 mt-2 ${step.completed ? "bg-green-500" : "bg-zinc-700"}`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <p
                            className={`font-semibold ${step.current ? "text-amber-400" : step.completed ? "text-white" : "text-zinc-500"}`}
                          >
                            {step.status}
                          </p>
                          <p className="text-zinc-400 text-sm">
                            {step.date} at {step.time}
                          </p>
                        </div>
                        <p className="text-zinc-400 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {step.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Need Help with Your Order?</h3>
                    <p className="text-zinc-400">Our support team is here to assist you</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" /> Call Us
                    </Button>
                    <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent">
                      <Mail className="h-4 w-4 mr-2" /> Email Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        {!trackingResult && (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card className="bg-zinc-800/50 border-zinc-700 text-center">
              <CardContent className="p-6">
                <Package className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-zinc-400 text-sm">Get instant updates on your shipment status</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 text-center">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Multiple Carriers</h3>
                <p className="text-zinc-400 text-sm">Track orders from FedEx, UPS, USPS & more</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 text-center">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Delivery Alerts</h3>
                <p className="text-zinc-400 text-sm">Receive notifications when your order arrives</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
