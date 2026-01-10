"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Wrench, Car, Shield, DollarSign } from "lucide-react"

const blogArticles = [
  {
    id: "brake-noise-1",
    title: "How to Fix Noisy Brakes",
    excerpt:
      "Common causes of brake squeal and how to solve them. Learn when it's a simple fix and when to seek professional help.",
    image: "/brake-repair-mechanic.jpg",
    date: "2024-11-15",
    author: "AUW Technical Team",
    readTime: "5 min read",
    category: "Maintenance",
    tags: ["Brakes", "DIY", "Troubleshooting"],
  },
  {
    id: "engine-swap-guide",
    title: "Complete Engine Swap Guide",
    excerpt:
      "Everything you need to know about swapping an engine, from selecting the right motor to installation tips.",
    image: "/engine-swap-garage.jpg",
    date: "2024-11-10",
    author: "AUW Technical Team",
    readTime: "12 min read",
    category: "Installation",
    tags: ["Engines", "Installation", "Performance"],
  },
  {
    id: "transmission-problems",
    title: "5 Signs Your Transmission Needs Attention",
    excerpt: "Recognize early warning signs of transmission trouble before it becomes a costly repair.",
    image: "/transmission-repair.jpg",
    date: "2024-11-05",
    author: "AUW Technical Team",
    readTime: "4 min read",
    category: "Troubleshooting",
    tags: ["Transmission", "Diagnostics", "Maintenance"],
  },
  {
    id: "used-parts-buying",
    title: "How to Buy Used Auto Parts Safely",
    excerpt: "Tips for finding quality used parts, what to look for, and how to avoid scams when buying online.",
    image: "/auto-parts-warehouse.jpg",
    date: "2024-10-28",
    author: "AUW Sales Team",
    readTime: "6 min read",
    category: "Buying Guide",
    tags: ["Buying Tips", "Quality", "Warranty"],
  },
  {
    id: "oem-vs-aftermarket",
    title: "OEM vs Aftermarket Parts: Which is Better?",
    excerpt: "Understanding the differences between OEM and aftermarket parts to make informed purchasing decisions.",
    image: "/car-parts-comparison.jpg",
    date: "2024-10-20",
    author: "AUW Technical Team",
    readTime: "7 min read",
    category: "Buying Guide",
    tags: ["OEM", "Aftermarket", "Quality"],
  },
  {
    id: "winter-car-prep",
    title: "Preparing Your Car for Winter",
    excerpt: "Essential maintenance tips to keep your vehicle running smoothly through the cold months.",
    image: "/car-winter-snow.jpg",
    date: "2024-10-15",
    author: "AUW Technical Team",
    readTime: "5 min read",
    category: "Seasonal",
    tags: ["Winter", "Maintenance", "Safety"],
  },
]

const categories = ["All", "Maintenance", "Installation", "Troubleshooting", "Buying Guide", "Seasonal"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = blogArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AUW <span className="text-red-500">Knowledge Center</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert guides, tips, and tutorials to help you maintain your vehicle and make informed parts decisions.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-zinc-900 text-white/70 hover:bg-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <Link href={`/blog/${filteredArticles[0].id}`}>
            <Card className="bg-zinc-900 border-zinc-800 mb-8 overflow-hidden group hover:border-red-500/50 transition-colors">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={filteredArticles[0].image || "/placeholder.svg"}
                    alt={filteredArticles[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-600">Featured</Badge>
                </div>
                <CardContent className="p-6 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-3 border-white/20 text-white/60">
                    {filteredArticles[0].category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-white/60 mb-4">{filteredArticles[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" /> {filteredArticles[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {filteredArticles[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {filteredArticles[0].readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-red-500 font-medium">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.slice(1).map((article) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-red-500/50 transition-colors h-full">
                <div className="relative h-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-3 border-white/20 text-white/60 text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-red-500/50 transition-colors">
            <Wrench className="h-8 w-8 text-red-500 mb-3" />
            <h4 className="font-bold mb-1">Installation Guides</h4>
            <p className="text-sm text-white/60">Step-by-step instructions</p>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-red-500/50 transition-colors">
            <Car className="h-8 w-8 text-red-500 mb-3" />
            <h4 className="font-bold mb-1">Vehicle Specific</h4>
            <p className="text-sm text-white/60">Find guides for your car</p>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-red-500/50 transition-colors">
            <Shield className="h-8 w-8 text-red-500 mb-3" />
            <h4 className="font-bold mb-1">Warranty Info</h4>
            <p className="text-sm text-white/60">Coverage details</p>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-red-500/50 transition-colors">
            <DollarSign className="h-8 w-8 text-red-500 mb-3" />
            <h4 className="font-bold mb-1">Buying Guides</h4>
            <p className="text-sm text-white/60">Smart shopping tips</p>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
