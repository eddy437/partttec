"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, CheckCircle, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString())
const makes = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Nissan",
  "Dodge",
  "Jeep",
  "Volkswagen",
  "Other",
]
const partTypes = [
  "Engine",
  "Transmission",
  "Transfer Case",
  "Rear Axle",
  "Front Axle",
  "Cylinder Head",
  "Turbo",
  "Other",
]

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    partType: "",
    vin: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save quote request to localStorage
    const quotes = JSON.parse(localStorage.getItem("quoteRequests") || "[]")
    quotes.push({
      ...formData,
      id: `QR-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "pending",
    })
    localStorage.setItem("quoteRequests", JSON.stringify(quotes))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center p-4">
        <Card className="bg-zinc-800/50 border-zinc-700 max-w-md w-full text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Quote Request Submitted!</h2>
          <p className="text-zinc-400 mb-6">
            Thank you for your request. Our team will review it and get back to you within 24 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-800 bg-transparent" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-zinc-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <MessageSquare className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Get a Free Quote</h1>
          <p className="text-green-100 max-w-2xl mx-auto">
            Fill out the form below and our team will provide you with a personalized quote within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Request Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-zinc-300">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-zinc-300">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-zinc-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-zinc-300">
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-zinc-300">Year *</Label>
                      <Select value={formData.year} onValueChange={(v) => setFormData({ ...formData, year: v })}>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white mt-1">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-zinc-300">Make *</Label>
                      <Select value={formData.make} onValueChange={(v) => setFormData({ ...formData, make: v })}>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white mt-1">
                          <SelectValue placeholder="Select Make" />
                        </SelectTrigger>
                        <SelectContent>
                          {makes.map((make) => (
                            <SelectItem key={make} value={make}>
                              {make}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="model" className="text-zinc-300">
                        Model *
                      </Label>
                      <Input
                        id="model"
                        required
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-white mt-1"
                        placeholder="e.g. Camry, F-150"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-zinc-300">Part Type *</Label>
                      <Select
                        value={formData.partType}
                        onValueChange={(v) => setFormData({ ...formData, partType: v })}
                      >
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white mt-1">
                          <SelectValue placeholder="Select Part" />
                        </SelectTrigger>
                        <SelectContent>
                          {partTypes.map((part) => (
                            <SelectItem key={part} value={part}>
                              {part}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="vin" className="text-zinc-300">
                        VIN (Optional)
                      </Label>
                      <Input
                        id="vin"
                        value={formData.vin}
                        onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                        maxLength={17}
                        className="bg-zinc-900 border-zinc-700 text-white mt-1 font-mono"
                        placeholder="17-digit VIN"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-zinc-300">
                      Additional Details
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-zinc-900 border-zinc-700 text-white mt-1 min-h-[120px]"
                      placeholder="Any specific requirements, engine size, transmission type, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all"
                  >
                    Submit Quote Request
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-4">Why Request a Quote?</h3>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Personalized pricing for your specific vehicle</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Expert fitment verification before purchase</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Bulk or wholesale pricing available</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Special sourcing for hard-to-find parts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-zinc-900 border-green-500/20">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-4">Need Immediate Help?</h3>
                <div className="space-y-4">
                  <a
                    href="tel:1-800-289-7278"
                    className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5 text-green-500" />
                    <span>1-800-AUW-PARTS</span>
                  </a>
                  <a
                    href="mailto:quotes@allusedautoparts.world"
                    className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5 text-green-500" />
                    <span>quotes@allusedautoparts.world</span>
                  </a>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
