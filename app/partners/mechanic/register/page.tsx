"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, Upload, Wrench, ShieldCheck } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function MechanicRegisterPage() {
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
          <h1 className="text-4xl font-black mb-4">Application Received!</h1>
          <p className="text-xl text-neutral-400 max-w-lg mb-8">
            Thank you for applying to join our Mechanic Network. Our administrator team will review your profile and
            contact you within 24 hours.
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
            <div className="inline-flex items-center justify-center p-3 bg-red-600/20 rounded-full mb-4">
              <Wrench className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Join Mechanic <span className="text-red-600">Network</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Grow your business by connecting with customers looking for verified mechanics in your area.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits Side */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-500" /> Why Join Us?
                </h3>
                <ul className="space-y-4 text-neutral-400">
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Get qualified leads from customers needing installation</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Exclusive discounts on auto parts for your shop</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Verified "Trusted Partner" badge for your profile</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b border-neutral-800 pb-2 mb-4">Shop Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          placeholder="Joe's Garage"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">Tax ID / EIN</Label>
                        <Input
                          id="taxId"
                          placeholder="XX-XXXXXXX"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Shop Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
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
                        placeholder="Beverly Hills"
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
                    <h3 className="text-xl font-bold border-b border-neutral-800 pb-2 mb-4 mt-6">Contact Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="bg-neutral-950 border-neutral-800"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-neutral-950 border-neutral-800" required />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-neutral-950 border-neutral-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="bg-neutral-950 border-neutral-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold border-b border-neutral-800 pb-2 mb-4 mt-6">
                      Profile & Certifications
                    </h3>
                    <Label htmlFor="description">Shop Description & Specialties</Label>
                    <Textarea
                      id="description"
                      placeholder="We specialize in European imports and transmission rebuilds..."
                      className="bg-neutral-950 border-neutral-800 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="block mb-2">Shop Logo / Photo</Label>
                      <div className="border-2 border-dashed border-neutral-800 rounded-xl p-6 text-center hover:border-red-500/50 transition-colors cursor-pointer bg-neutral-950">
                        <Upload className="mx-auto h-8 w-8 text-neutral-500 mb-2" />
                        <div className="text-sm text-neutral-400">Click to upload</div>
                        <div className="text-xs text-neutral-600 mt-1">JPG, PNG (Max 5MB)</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="block mb-2">ASE Certifications</Label>
                      <div className="border-2 border-dashed border-neutral-800 rounded-xl p-6 text-center hover:border-red-500/50 transition-colors cursor-pointer bg-neutral-950">
                        <ShieldCheck className="mx-auto h-8 w-8 text-neutral-500 mb-2" />
                        <div className="text-sm text-neutral-400">Upload Certificates</div>
                        <div className="text-xs text-neutral-600 mt-1">PDF, JPG</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-14 text-lg mt-4"
                  >
                    Submit Application
                  </Button>
                  <p className="text-center text-xs text-neutral-500">
                    By submitting, you agree to our Partner Terms and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
