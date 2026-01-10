"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Upload, Warehouse, Database } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function JunkYardRegisterPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white font-sans">
        <SiteHeader />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-black font-bold" />
          </div>
          <h1 className="text-4xl font-black mb-4">Partner Application Sent!</h1>
          <p className="text-xl text-neutral-400 max-w-lg mb-8">
            Your inventory integration request has been received. Our supply chain manager will contact you shortly to
            set up your data feed.
          </p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white h-12 px-8 text-lg font-bold">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <SiteHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-full mb-4">
              <Warehouse className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Sell Your <span className="text-blue-500">Inventory</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Join our nationwide network of salvage yards and recyclers. Upload your inventory and reach millions of
              buyers instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits Side */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" /> Platform Benefits
                </h3>
                <ul className="space-y-4 text-neutral-400">
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Instant access to nationwide buyer network</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Automated shipping label generation</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Bulk inventory upload tools (CSV/XML)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b border-neutral-800 pb-2 mb-4">Yard Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Yard Name</Label>
                        <Input
                          id="businessName"
                          placeholder="A1 Salvage"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="license">Dismantler License #</Label>
                        <Input
                          id="license"
                          placeholder="DL-XXXXX"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Physical Address</Label>
                    <Input
                      id="address"
                      placeholder="456 Industrial Pkwy"
                      className="bg-neutral-950 border-neutral-800"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" placeholder="90210" className="bg-neutral-950 border-neutral-800" required />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Los Angeles"
                        className="bg-neutral-950 border-neutral-800"
                        required
                      />
                    </div>
                    <div className="col-span-1 space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="CA" className="bg-neutral-950 border-neutral-800" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b border-neutral-800 pb-2 mb-4 mt-6">Contact Person</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Mike"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Smith"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mike@a1salvage.com"
                        className="bg-neutral-950 border-neutral-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 987-6543"
                        className="bg-neutral-950 border-neutral-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b border-neutral-800 pb-2 mb-4 mt-6">Inventory Data</h3>
                    <Label htmlFor="system">Current Inventory System</Label>
                    <Input
                      id="system"
                      placeholder="e.g. Hollander, Pinnacle, Checkmate..."
                      className="bg-neutral-950 border-neutral-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="block mb-2">Upload Sample Inventory File (Optional)</Label>
                    <div className="border-2 border-dashed border-neutral-800 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer bg-neutral-950">
                      <Upload className="mx-auto h-8 w-8 text-neutral-500 mb-2" />
                      <div className="text-sm text-neutral-400">Upload CSV or XML</div>
                      <div className="text-xs text-neutral-600 mt-1">Show us what you have available</div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 text-lg mt-4"
                  >
                    Submit Partner Application
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
