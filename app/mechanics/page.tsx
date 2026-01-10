"use client"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { MapPin, Star, Phone, ShieldCheck, Wrench, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock Data
const MECHANICS = [
  {
    id: 1,
    name: "Elite Auto Repair",
    address: "123 Main St, Beverly Hills, CA 90210",
    distance: "0.8 miles",
    rating: 4.9,
    reviews: 124,
    specialties: ["European Imports", "Engine Swaps", "Transmissions"],
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 2,
    name: "Joe's Master Mechanics",
    address: "456 Oak Blvd, Beverly Hills, CA 90210",
    distance: "1.2 miles",
    rating: 4.7,
    reviews: 89,
    specialties: ["General Repair", "Brakes", "Suspension"],
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 3,
    name: "Prestige Performance",
    address: "789 Wilshire Blvd, Beverly Hills, CA 90211",
    distance: "2.5 miles",
    rating: 5.0,
    reviews: 210,
    specialties: ["Performance Tuning", "Exhaust", "Custom Work"],
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
]

export default function MechanicsSearchPage() {
  const searchParams = useSearchParams()
  const initialZip = searchParams?.get("zip") || ""
  const [zip, setZip] = useState(initialZip)

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <SiteHeader />

      {/* Search Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-6 uppercase">
            Find a Verified <span className="text-red-600">Mechanic</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-8 text-lg">
            Connect with trusted local shops to install your used engines and transmissions. All partners are vetted for
            quality and reliability.
          </p>

          <div className="flex max-w-lg mx-auto gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-neutral-500" />
              <Input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter Zip Code"
                className="pl-10 h-12 bg-black border-neutral-700 text-white text-lg"
              />
            </div>
            <Button className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold text-lg">Search</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block space-y-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-2 font-bold mb-4 text-lg">
              <Filter className="w-5 h-5" /> Filters
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-neutral-500 uppercase mb-3 block">Distance</label>
                <div className="space-y-2">
                  {["5 miles", "10 miles", "25 miles", "50 miles"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-4 h-4 rounded-full border border-neutral-600 group-hover:border-red-500"></div>
                      <span className="text-neutral-300 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-neutral-500 uppercase mb-3 block">Specialty</label>
                <div className="space-y-2">
                  {["Engine Installation", "Transmission Swap", "General Repair", "European Imports"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-neutral-600 group-hover:border-red-500"></div>
                      <span className="text-neutral-300 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/20 rounded-xl p-6 text-center">
            <Wrench className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Are you a Mechanic?</h3>
            <p className="text-sm text-neutral-400 mb-4">Join our network and get more customers for your shop.</p>
            <Link href="/partners/mechanic/register">
              <Button
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              >
                Join Network
              </Button>
            </Link>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Showing {MECHANICS.length} Results near "{zip || "90210"}"
            </h2>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              Sort by: <span className="text-white font-bold cursor-pointer">Recommended</span>
            </div>
          </div>

          {MECHANICS.map((mechanic) => (
            <div
              key={mechanic.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-red-500/50 transition-all group"
            >
              <div className="w-full md:w-48 h-32 bg-black rounded-lg relative overflow-hidden shrink-0">
                <img
                  src={mechanic.image || "/placeholder.svg"}
                  alt={mechanic.name}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-red-500 transition-colors flex items-center gap-2">
                      {mechanic.name}
                      {mechanic.verified && <ShieldCheck className="w-5 h-5 text-green-500" />}
                    </h3>
                    <div className="text-neutral-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" /> {mechanic.address}
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                    <div className="text-yellow-400 font-bold flex items-center justify-end gap-1">
                      <Star className="w-4 h-4 fill-current" /> {mechanic.rating}
                    </div>
                    <div className="text-xs text-neutral-500">{mechanic.reviews} reviews</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 my-4">
                  {mechanic.specialties.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-800 text-xs rounded text-neutral-300 border border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                  <div className="text-sm font-bold text-neutral-400">{mechanic.distance} away</div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-neutral-600 hover:bg-white hover:text-black bg-transparent"
                    >
                      View Profile
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                      <Phone className="w-4 h-4" /> Call Shop
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
