"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const category = getCategoryBySlug(slug)
  const products = getProductsByCategory(slug)

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Button onClick={() => router.push("/")} variant="outline" className="text-black">
          Return Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]"></div>
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
              <span className="text-white">Categories</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{category.name}</span>
            </div>
            <span className="font-bold">AUTOPARTS</span>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-12 mb-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-white/80 mb-6">{category.description}</p>
            <div className="flex flex-wrap gap-3">
              {category.subcategories?.map((sub) => (
                <div
                  key={sub}
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm"
                >
                  {sub}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{category.partCount.toLocaleString()} Parts Available</h2>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group">
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10">
                <div className="aspect-video relative bg-black/20">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium">
                    {product.mileageOptions[0].condition}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-sm text-white/50 mb-1">{product.brand}</p>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-white/50 mb-1">Starting at</div>
                      <div className="text-xl font-bold text-blue-400">${product.mileageOptions[0].price}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:bg-blue-600 hover:border-blue-600 hover:text-white bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/50 text-lg">No parts available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
