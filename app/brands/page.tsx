"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { brands } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter brands based on search
  const filteredBrands = brands
    .filter((brand) => brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))

  // Group brands by first letter
  const groupedBrands = filteredBrands.reduce(
    (acc, brand) => {
      const letter = brand.name[0].toUpperCase()
      if (!acc[letter]) acc[letter] = []
      acc[letter].push(brand)
      return acc
    },
    {} as Record<string, typeof brands>,
  )

  const letters = Object.keys(groupedBrands).sort()

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <SiteHeader />

      <div className="relative py-16 bg-neutral-950 border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <Badge variant="outline" className="mb-4 border-red-600/50 text-red-500 bg-red-600/10">
              CATALOG
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              BROWSE BY <span className="text-red-600">BRAND</span>
            </h1>
            <p className="text-neutral-400 text-lg mb-8">
              Find premium used auto parts for your specific vehicle make. Select a brand to view available models and
              parts.
            </p>

            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-500" />
              </div>
              <Input
                type="text"
                placeholder="Search for a brand (e.g. BMW, Ford)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-neutral-900 border-neutral-800 text-white focus:ring-red-600 focus:border-red-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {letters.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-neutral-900/50 inline-flex p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No brands found</h3>
            <p className="text-neutral-400">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {letters.map((letter) => (
              <div key={letter} className="scroll-mt-24" id={`section-${letter}`}>
                <div className="flex items-center gap-4 mb-6 border-b border-neutral-800 pb-2">
                  <h2 className="text-3xl font-black text-neutral-700">{letter}</h2>
                  <div className="h-px flex-1 bg-neutral-800/50"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {groupedBrands[letter].map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brand/${brand.id}`}
                      className="group flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-red-600/50 hover:bg-neutral-900 transition-all"
                    >
                      <div className="w-10 h-10 relative flex-shrink-0 bg-white p-1 rounded-md overflow-hidden">
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white truncate group-hover:text-red-500 transition-colors">
                          {brand.name}
                        </h3>
                        <div className="flex items-center text-xs text-neutral-500">
                          <span>{brand.partCount?.toLocaleString() || 0} parts</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-neutral-700 group-hover:text-red-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
