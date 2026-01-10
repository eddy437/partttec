"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import { Search, Truck, ShieldCheck, ArrowRight, Star, MapPin, Globe, Wrench } from "lucide-react"

const years = Array.from({ length: 35 }, (_, i) => (new Date().getFullYear() + 1 - i).toString())

const makes = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jeep",
  "Kia",
  "Lexus",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Ram",
  "Subaru",
  "Toyota",
  "Volkswagen",
  "Volvo",
]

const modelsByMake: Record<string, string[]> = {
  Toyota: ["4Runner", "Camry", "Corolla", "Highlander", "RAV4", "Tacoma", "Tundra"],
  Honda: ["Accord", "Civic", "CR-V", "Odyssey", "Pilot", "Ridgeline"],
  Ford: ["Bronco", "Edge", "Escape", "Explorer", "F-150", "F-250", "Mustang", "Ranger"],
  Chevrolet: ["Camaro", "Colorado", "Equinox", "Silverado 1500", "Suburban", "Tahoe"],
  Dodge: ["Challenger", "Charger", "Durango", "Ram 1500"],
  BMW: ["3 Series", "5 Series", "X3", "X5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE"],
  Jeep: ["Cherokee", "Grand Cherokee", "Wrangler"],
  Nissan: ["Altima", "Frontier", "Maxima", "Pathfinder", "Rogue", "Titan"],
  Hyundai: ["Elantra", "Santa Fe", "Sonata", "Tucson"],
}

const parts = [
  "Engine",
  "Transmission",
  "Transfer Case",
  "Axle Assembly",
  "AC Compressor",
  "Alternator",
  "Starter Motor",
  "Radiator",
  "Headlight Assembly",
  "Tail Light Assembly",
]

export default function SimpleAutoPartsSearch() {
  const router = useRouter()
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [partName, setPartName] = useState("")

  const availableModels = make ? modelsByMake[make] || [] : []

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (partName) params.append("part", partName)
    if (year) params.append("year", year)
    if (make) params.append("make", make)
    if (model) params.append("model", model)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-neutral-950 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black opacity-80 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Search Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-1 shadow-2xl">
                <div className="bg-black/50 rounded-lg p-6 sm:p-8 border border-neutral-800">
                  <h2 className="text-2xl font-black text-white uppercase mb-2 flex items-center gap-2">
                    <Search className="w-6 h-6 text-red-600" />
                    Quick Part Search
                  </h2>
                  <p className="text-neutral-400 mb-6 text-sm">Find compatible parts for your vehicle instantly.</p>

                  <div className="space-y-4">
                    {/* Year, Make, Model */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Year</label>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full bg-neutral-800 border border-neutral-700 text-white h-11 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                          <option value="">Select</option>
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Make</label>
                        <select
                          value={make}
                          onChange={(e) => {
                            setMake(e.target.value)
                            setModel("")
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 text-white h-11 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                          <option value="">Select</option>
                          {makes.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Model</label>
                        <select
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          disabled={!make}
                          className="w-full bg-neutral-800 border border-neutral-700 text-white h-11 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                        >
                          <option value="">Select</option>
                          {availableModels.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Part Selection */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        Part Needed
                      </label>
                      <select
                        value={partName}
                        onChange={(e) => setPartName(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 text-white h-11 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Select Part</option>
                        {parts.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Button */}
                    <Button
                      onClick={handleSearch}
                      className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-lg"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search Parts
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Nationwide Shipping</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight mb-6">
                Quality Used
                <br />
                <span className="text-red-600">Auto Parts</span>
                <br />
                Guaranteed
              </h1>
              <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Search thousands of engines, transmissions, and more from trusted suppliers. All parts include warranty
                coverage.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">90-Day Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Fast Shipping</span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-black border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">50K+</div>
              <div className="text-neutral-500 text-sm uppercase tracking-wider">Parts in Stock</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">15K+</div>
              <div className="text-neutral-500 text-sm uppercase tracking-wider">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">500+</div>
              <div className="text-neutral-500 text-sm uppercase tracking-wider">Partner Yards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">98%</div>
              <div className="text-neutral-500 text-sm uppercase tracking-wider">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-white uppercase mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Engines", href: "/engines", count: "5,000+" },
              { name: "Transmissions", href: "/transmissions", count: "3,500+" },
              { name: "Transfer Cases", href: "/shop?category=transfer-case", count: "1,200+" },
              { name: "Axle Assemblies", href: "/shop?category=axle", count: "2,800+" },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center hover:border-red-600 transition-colors group cursor-pointer">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-500 text-sm">{cat.count} parts</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-white uppercase mb-8 text-center">Shop by Brand</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {["Toyota", "Honda", "Ford", "Chevrolet", "Dodge", "BMW"].map((brand) => (
              <Link key={brand} href={`/brands/${brand.toLowerCase()}`}>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center hover:border-red-600 transition-colors group cursor-pointer">
                  <h3 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">{brand}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/brands">
              <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent">
                View All Brands <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Mechanic Section */}
      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-black text-white uppercase mb-4 flex items-center gap-3">
                  <Wrench className="w-8 h-8 text-red-600" />
                  Need Installation Help?
                </h2>
                <p className="text-neutral-400 mb-6">
                  We've partnered with over 5,000 certified mechanics nationwide. Find a trusted professional near you
                  to install your parts.
                </p>
                <Link href="/find-mechanic">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase">
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Local Mechanics
                  </Button>
                </Link>
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-neutral-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-32 h-32 text-neutral-700" strokeWidth={0.5} />
                  <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-red-600 rounded-full animate-ping" />
                  <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-600 rounded-full animate-ping delay-300" />
                  <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-red-600 rounded-full animate-ping delay-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Ready to Find Your Part?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Search our inventory of over 50,000 quality used auto parts with warranty coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-red-600 hover:bg-neutral-100 font-bold uppercase">
                Browse All Parts
              </Button>
            </Link>
            <Link href="/quote">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold uppercase bg-transparent"
              >
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
