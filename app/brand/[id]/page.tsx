"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Filter, BookOpen, Grid, History, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBrandById, getProductsByBrand } from "@/lib/data"

export default function BrandPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const brand = getBrandById(id)
  const products = getProductsByBrand(id)

  if (!brand) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Brand not found</h1>
        <Button onClick={() => router.push("/")} variant="outline" className="text-black">
          Return Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Background elements */}
      {brand.banner ? (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          <Image
            src={brand.banner || "/placeholder.svg"}
            alt={`${brand.name} banner`}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-20"></div>
        </div>
      ) : (
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
      )}

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
              <span className="text-white">Brands</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{brand.name}</span>
            </div>
            <span className="font-bold">AUTOPARTS</span>
          </div>
        </div>

        {/* Brand Header */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-2xl bg-white p-4 flex items-center justify-center">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">{brand.name}</h1>
              <p className="text-xl text-white/70 mb-6">{brand.description}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">{brand.partCount.toLocaleString()}</div>
                  <div className="text-xs text-white/60">Available Parts</div>
                </div>
                <div className="px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">4.8</div>
                  <div className="text-xs text-white/60">Average Rating</div>
                </div>
                <div className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-400">OEM</div>
                  <div className="text-xs text-white/60">Quality Parts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs System */}
        <Tabs defaultValue="products" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-lg flex gap-2 items-center"
              >
                <Grid className="h-4 w-4" />
                All Products
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-lg flex gap-2 items-center"
              >
                <History className="h-4 w-4" />
                History & About
              </TabsTrigger>
              <TabsTrigger
                value="articles"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-2 rounded-lg flex gap-2 items-center"
              >
                <BookOpen className="h-4 w-4" />
                Articles & Guides
              </TabsTrigger>
            </TabsList>

            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
              <Filter className="h-4 w-4" />
              Filter Parts
            </Button>
          </div>

          <TabsContent value="products" className="mt-0">
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
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
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
                <p className="text-white/50 text-lg">No parts available for this brand yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="about" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6">Brand History</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/70 leading-relaxed text-lg">
                      {brand.history ||
                        `${brand.name} has a rich legacy of automotive excellence. Known for their commitment to quality and innovation, they have been a leader in the industry for decades.`}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {brand.foundedYear && (
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                          <div className="bg-blue-500/20 p-3 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm text-white/50">Founded</div>
                            <div className="font-bold text-lg">{brand.foundedYear}</div>
                          </div>
                        </div>
                      )}
                      {brand.headquarters && (
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                          <div className="bg-green-500/20 p-3 rounded-lg">
                            <MapPin className="h-6 w-6 text-green-400" />
                          </div>
                          <div>
                            <div className="text-sm text-white/50">Headquarters</div>
                            <div className="font-bold text-lg">{brand.headquarters}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-600 rounded-3xl p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Why Choose {brand.name}?</h3>
                  <ul className="text-left space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-white/20 p-1 rounded-full">
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </div>
                      <span>Precision engineering standards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-white/20 p-1 rounded-full">
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </div>
                      <span>Long-lasting durability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-white/20 p-1 rounded-full">
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </div>
                      <span>Wide availability of parts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              {brand.articles && brand.articles.length > 0 ? (
                brand.articles.map((article) => (
                  <div key={article.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                    <div className="aspect-[2/1] relative">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Article
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>By {article.author}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-white/60 mb-4 line-clamp-2">{article.excerpt}</p>
                      <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                        Read Article <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white/5 rounded-3xl border border-white/10">
                  <BookOpen className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No articles yet</h3>
                  <p className="text-white/50">Check back soon for guides and history about {brand.name}.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
