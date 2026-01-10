"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Eye, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const truckBrands = [
  "All",
  "Ford F-Series",
  "Chevrolet Silverado",
  "RAM",
  "GMC Sierra",
  "Toyota Tundra",
  "Nissan Titan",
]
const partCategories = [
  "All Parts",
  "Engine",
  "Transmission",
  "Suspension",
  "Bed Accessories",
  "Towing",
  "Brakes",
  "Electrical",
]

const truckParts = [
  {
    id: 601,
    name: "F-150 5.0L V8 Engine",
    brand: "Ford F-Series",
    year: "2018-2023",
    price: 4299,
    condition: "Used",
    mileage: "48,000",
    image: "/placeholder.svg?height=200&width=200",
    category: "Engine",
  },
  {
    id: 602,
    name: "Silverado 10-Speed Transmission",
    brand: "Chevrolet Silverado",
    year: "2019-2024",
    price: 2499,
    condition: "Remanufactured",
    mileage: "0",
    image: "/placeholder.svg?height=200&width=200",
    category: "Transmission",
  },
  {
    id: 603,
    name: "RAM 1500 Air Suspension Kit",
    brand: "RAM",
    year: "2019-2024",
    price: 1899,
    condition: "New",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Suspension",
  },
  {
    id: 604,
    name: "Sierra HD Towing Package",
    brand: "GMC Sierra",
    year: "2020-2024",
    price: 899,
    condition: "Used",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Towing",
  },
  {
    id: 605,
    name: "Tundra TRD Pro Suspension",
    brand: "Toyota Tundra",
    year: "2018-2023",
    price: 1599,
    condition: "Used",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Suspension",
  },
  {
    id: 606,
    name: "Titan V8 Engine Assembly",
    brand: "Nissan Titan",
    year: "2017-2023",
    price: 3899,
    condition: "Remanufactured",
    mileage: "0",
    image: "/placeholder.svg?height=200&width=200",
    category: "Engine",
  },
  {
    id: 607,
    name: "F-250 Super Duty Brakes",
    brand: "Ford F-Series",
    year: "2019-2024",
    price: 699,
    condition: "New",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Brakes",
  },
  {
    id: 608,
    name: "Silverado Bed Liner Insert",
    brand: "Chevrolet Silverado",
    year: "2018-2024",
    price: 349,
    condition: "New",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Bed Accessories",
  },
  {
    id: 609,
    name: "RAM 2500 Cummins Engine",
    brand: "RAM",
    year: "2019-2024",
    price: 7999,
    condition: "Used",
    mileage: "62,000",
    image: "/placeholder.svg?height=200&width=200",
    category: "Engine",
  },
  {
    id: 610,
    name: "Sierra Denali LED Headlights",
    brand: "GMC Sierra",
    year: "2019-2024",
    price: 899,
    condition: "Used",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Electrical",
  },
  {
    id: 611,
    name: "Tundra Tow Hitch Assembly",
    brand: "Toyota Tundra",
    year: "2018-2024",
    price: 449,
    condition: "New",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Towing",
  },
  {
    id: 612,
    name: "F-150 Raptor Suspension",
    brand: "Ford F-Series",
    year: "2019-2024",
    price: 2899,
    condition: "Used",
    mileage: "N/A",
    image: "/placeholder.svg?height=200&width=200",
    category: "Suspension",
  },
]

export default function TruckPartsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All Parts")
  const [selectedCondition, setSelectedCondition] = useState("all")

  const filteredParts = truckParts.filter((part) => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "All" || part.brand === selectedBrand
    const matchesCategory = selectedCategory === "All Parts" || part.category === selectedCategory
    const matchesCondition = selectedCondition === "all" || part.condition.toLowerCase() === selectedCondition
    return matchesSearch && matchesBrand && matchesCategory && matchesCondition
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-900 via-orange-800 to-zinc-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/placeholder.svg?height=600&width=1200" alt="" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Truck className="h-14 w-14 text-orange-400" />
            <h1 className="text-5xl font-bold text-white">Truck Parts</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-2xl">
            Heavy-duty parts for America's best-selling trucks. F-150, Silverado, RAM, Tundra & more.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">1,500+</p>
              <p className="text-orange-200">Truck Parts</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">HD</p>
              <p className="text-orange-200">Quality</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">Fast</p>
              <p className="text-orange-200">Shipping</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">1-Year</p>
              <p className="text-orange-200">Warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Truck Brands */}
      <div className="bg-zinc-800/50 py-8 border-b border-zinc-700">
        <div className="container mx-auto px-4">
          <h2 className="text-white font-semibold mb-4">Shop by Truck</h2>
          <div className="flex flex-wrap gap-3">
            {truckBrands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => setSelectedBrand(brand)}
                className={
                  selectedBrand === brand
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                }
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  placeholder="Search truck parts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-700 text-white"
                />
              </div>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-full md:w-48 bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="remanufactured">Remanufactured</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Part Category Tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
              {partCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  }
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-zinc-400 mb-6">{filteredParts.length} truck parts found</p>

        {/* Parts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <Card
              key={part.id}
              className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-orange-500/50 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={part.image || "/placeholder.svg"}
                  alt={part.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    part.condition === "New"
                      ? "bg-green-500"
                      : part.condition === "Remanufactured"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                >
                  {part.condition}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-zinc-900/80">{part.brand.split(" ")[0]}</Badge>
                <Badge className="absolute bottom-3 left-3 bg-orange-600">{part.category}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{part.name}</h3>
                <p className="text-zinc-400 text-sm mb-2">Fits: {part.year}</p>
                {part.mileage !== "N/A" && <p className="text-zinc-500 text-sm mb-3">Mileage: {part.mileage} mi</p>}

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-orange-500">${part.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-zinc-600 hover:bg-zinc-700 bg-transparent"
                      asChild
                    >
                      <Link href={`/product/${part.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="icon" className="bg-orange-600 hover:bg-orange-700">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
