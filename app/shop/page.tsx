"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, ShoppingBag, Filter, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPaginatedProducts } from "@/lib/data" // Using new pagination function
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function ShopContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 24
  const [customInventory, setCustomInventory] = useState<any[] | null>(null)

  useEffect(() => {
    const mode = localStorage.getItem("inventory_mode")
    if (mode === "custom") {
      try {
        const data = JSON.parse(localStorage.getItem("inventory_data") || "[]")
        setCustomInventory(data)
      } catch (e) {
        console.error("Failed to load shop inventory", e)
      }
    }
  }, [])

  let currentProducts, totalItems

  if (customInventory) {
    totalItems = customInventory.length
    const startIndex = (currentPage - 1) * itemsPerPage
    currentProducts = customInventory.slice(startIndex, startIndex + itemsPerPage)
  } else {
    const data = getPaginatedProducts(currentPage, itemsPerPage)
    currentProducts = data.products
    totalItems = data.total
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

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
        {/* Breadcrumb */}
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
              <span className="text-white">Shop</span>
            </div>
            <span className="font-bold">AUTOPARTS</span>
          </div>
        </div>

        {/* Shop Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <ShoppingBag className="text-red-600 h-8 w-8" />
              Shop All Parts
            </h1>
            <p className="text-neutral-400 max-w-2xl">
              Browse our complete inventory of over <span className="text-white font-bold">1 Million</span> high-quality
              auto parts. From brakes to engine components, find exactly what you need.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 bg-black text-white hover:bg-white/10">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-neutral-900/50 rounded-xl border border-white/10 p-6">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              {/* Placeholder for categories list */}
              {/* Categories list should be fetched dynamically */}
            </div>

            <div className="bg-neutral-900/50 rounded-xl border border-white/10 p-6">
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 w-2/3"></div>
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 text-sm text-neutral-400 flex items-center justify-between">
              <span>
                Showing {Math.min(startIndex + 1, totalItems)}-
                {Math.min(startIndex + itemsPerPage, totalItems).toLocaleString()} of{" "}
                <span className="text-white font-bold text-lg">{totalItems.toLocaleString()}</span> products
              </span>
            </div>

            {currentProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 border border-white/10 rounded-2xl bg-white/5">
                <p className="text-xl font-bold text-white mb-2">No products found</p>
                <p className="text-neutral-400">Try adjusting your filters or upload new inventory.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id} className="group">
                    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:bg-white/10 h-full flex flex-col">
                      <div className="aspect-video relative bg-neutral-900">
                        <Image
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-neutral-900 to-neutral-800 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/20 shadow-lg">
                          {product.brand}
                        </div>

                        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                          {/* Condition Badge */}
                          <div
                            className={`px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg ${
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
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg text-xs font-semibold text-white border border-white/10 truncate">
                          {product.name}
                        </div>
                        {/* </CHANGE> */}
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
                            <div className="text-xl font-black text-white">
                              ${product.mileageOptions?.[0]?.price || product.price}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalItems > 0 && (
              <div className="flex flex-col items-center justify-center mt-12 border-t border-white/10 pt-6 gap-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-white/10 bg-transparent text-white hover:bg-white/10 w-32"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2 px-4 font-mono text-sm">
                    Page{" "}
                    <input
                      type="number"
                      value={currentPage}
                      onChange={(e) => {
                        const val = Number.parseInt(e.target.value)
                        if (val > 0 && val <= totalPages) setCurrentPage(val)
                      }}
                      className="w-16 bg-neutral-900 border border-white/10 rounded px-2 py-1 text-center"
                    />{" "}
                    of {totalPages.toLocaleString()}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-white/10 bg-transparent text-white hover:bg-white/10 w-32"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  )
}
