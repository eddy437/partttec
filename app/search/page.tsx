"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Search, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { searchResults } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const part = searchParams.get("part")
  const year = searchParams.get("year")
  const make = searchParams.get("make")
  const model = searchParams.get("model")
  const brand = searchParams.get("brand") // Added brand param

  const isSearchActive = !!(part || year || make || model || brand) // Added brand to active check

  // Filter products based on search criteria
  // For this demo, we'll show all products if no specific filters match,
  // or filter roughly by text match since our mock data is limited
  const filteredProducts = searchResults.filter((product) => {
    if (
      part &&
      !product.category.toLowerCase().includes(part.toLowerCase()) &&
      !product.name.toLowerCase().includes(part.toLowerCase())
    )
      return false
    if (make && !product.fitment.some((f) => f.toLowerCase().includes(make.toLowerCase()))) return false
    if (brand && !product.brand.toLowerCase().includes(brand.toLowerCase())) return false // Added brand filtering logic
    // Year logic would be more complex in real app (range check), simplified here
    return true
  })

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : searchResults

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header/Nav */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{isSearchActive ? "Search Results" : "Full Catalog"}</span>
            </div>
            <span className="font-bold">AUTOPARTS</span>
          </div>
        </div>

        {/* Search Summary or Catalog Header */}
        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                {isSearchActive ? <Search className="text-red-600" /> : <Grid className="text-red-600" />}
                {isSearchActive ? "Search Results" : "Complete Parts Catalog"}
              </h1>
              {isSearchActive ? (
                <div className="flex flex-wrap gap-2 text-neutral-400">
                  {year && (
                    <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{year}</span>
                  )}
                  {make && (
                    <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{make}</span>
                  )}
                  {model && (
                    <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{model}</span>
                  )}
                  {part && (
                    <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{part}</span>
                  )}
                  {brand && (
                    <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{brand}</span>
                  )}
                </div>
              ) : (
                <p className="text-neutral-400">
                  Browsing all uploaded inventory. {displayProducts.length} products available.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px] bg-neutral-900 border-white/10 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                  <SelectItem value="newest">Newest Uploads</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isSearchActive && (
            <p className="mt-4 text-neutral-300">Showing {displayProducts.length} results matching your criteria.</p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group">
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:bg-white/10 h-full flex flex-col">
                <div className="aspect-video relative bg-neutral-900">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Brand Badge - Top Left */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-neutral-900 to-neutral-800 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/20 shadow-lg">
                    {product.brand}
                  </div>

                  {/* Condition Badge - Top Right */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg ${
                      product.mileageOptions?.[0]?.condition === "New" ||
                      product.mileageOptions?.[0]?.condition === "Excellent"
                        ? "bg-green-600 border border-green-500/50"
                        : product.mileageOptions?.[0]?.condition === "Remanufactured"
                          ? "bg-blue-600 border border-blue-500/50"
                          : "bg-amber-600 border border-amber-500/50"
                    }`}
                  >
                    {product.mileageOptions?.[0]?.condition === "Excellent"
                      ? "Used"
                      : product.mileageOptions?.[0]?.condition === "Good"
                        ? "Used"
                        : product.mileageOptions?.[0]?.condition === "Fair"
                          ? "Used"
                          : product.mileageOptions?.[0]?.condition || "Used"}
                  </div>

                  {/* Part Name Badge - Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg text-xs font-semibold text-white border border-white/10 truncate">
                    {product.name}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-auto">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-white/50 mb-2">
                      {product.brand} • {product.partNumber}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.fitment.slice(0, 2).map((fit, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-white/70"
                        >
                          {fit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-4 border-t border-white/10 mt-4">
                    <div>
                      <div className="text-xs text-white/50 mb-1">Starting at</div>
                      <div className="text-xl font-black text-white">${product.mileageOptions[0].price}</div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-800">
            <Search className="h-12 w-12 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No exact matches found</h3>
            <p className="text-neutral-500 mb-6">Try adjusting your search filters or browse our categories below.</p>
            <Button onClick={() => router.push("/")} className="bg-white text-black hover:bg-neutral-200">
              Return Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
