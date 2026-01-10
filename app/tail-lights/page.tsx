"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Eye, CircleDot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const tailLightTypes = ["All", "LED", "Halogen", "Sequential", "Smoked", "Clear", "Assembly"]

const tailLights = [
  {
    id: 501,
    name: "LED Tail Light Assembly",
    brand: "Toyota",
    year: "2018-2023",
    price: 299,
    condition: "New",
    side: "Driver Side",
    image: "/placeholder.svg?height=200&width=200",
    type: "LED",
  },
  {
    id: 502,
    name: "Sequential LED Tail Lights",
    brand: "Ford",
    year: "2019-2024",
    price: 449,
    condition: "New",
    side: "Pair",
    image: "/placeholder.svg?height=200&width=200",
    type: "Sequential",
  },
  {
    id: 503,
    name: "OEM Tail Light",
    brand: "Honda",
    year: "2020-2024",
    price: 149,
    condition: "Used",
    side: "Passenger Side",
    image: "/placeholder.svg?height=200&width=200",
    type: "Assembly",
  },
  {
    id: 504,
    name: "Smoked LED Tail Lights",
    brand: "Chevrolet",
    year: "2018-2023",
    price: 349,
    condition: "New",
    side: "Pair",
    image: "/placeholder.svg?height=200&width=200",
    type: "Smoked",
  },
  {
    id: 505,
    name: "Clear Lens Tail Lights",
    brand: "BMW",
    year: "2019-2024",
    price: 399,
    condition: "New",
    side: "Pair",
    image: "/placeholder.svg?height=200&width=200",
    type: "Clear",
  },
  {
    id: 506,
    name: "Halogen Tail Light Assembly",
    brand: "Nissan",
    year: "2017-2022",
    price: 99,
    condition: "Used",
    side: "Driver Side",
    image: "/placeholder.svg?height=200&width=200",
    type: "Halogen",
  },
  {
    id: 507,
    name: "OLED Tail Light Set",
    brand: "Audi",
    year: "2020-2024",
    price: 899,
    condition: "Used",
    side: "Pair",
    image: "/placeholder.svg?height=200&width=200",
    type: "LED",
  },
  {
    id: 508,
    name: "Third Brake Light LED",
    brand: "Dodge",
    year: "2018-2024",
    price: 79,
    condition: "New",
    side: "Center",
    image: "/placeholder.svg?height=200&width=200",
    type: "LED",
  },
]

export default function TailLightsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("all")

  const filteredLights = tailLights.filter((light) => {
    const matchesSearch =
      light.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      light.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || light.type === selectedType
    const matchesCondition = selectedCondition === "all" || light.condition.toLowerCase() === selectedCondition
    return matchesSearch && matchesType && matchesCondition
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-900 via-rose-800 to-zinc-900 py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <CircleDot className="h-12 w-12 text-rose-400" />
            <h1 className="text-5xl font-bold text-white">Tail Lights</h1>
          </div>
          <p className="text-xl text-rose-100 max-w-2xl">
            LED, halogen, and specialty tail lights. OEM and aftermarket options available.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">600+</p>
              <p className="text-rose-200">Tail Lights</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">DOT</p>
              <p className="text-rose-200">Compliant</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">Easy</p>
              <p className="text-rose-200">Install</p>
            </div>
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
                  placeholder="Search tail lights..."
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
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tailLightTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={
                    selectedType === type
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                  }
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-zinc-400 mb-6">{filteredLights.length} tail lights found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLights.map((light) => (
            <Card
              key={light.id}
              className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-rose-500/50 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={light.image || "/placeholder.svg"}
                  alt={light.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <Badge
                  className={`absolute top-3 right-3 ${light.condition === "New" ? "bg-green-500" : "bg-amber-500"}`}
                >
                  {light.condition}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-zinc-900/80">{light.brand}</Badge>
                <Badge className="absolute bottom-3 left-3 bg-rose-600">{light.type}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{light.name}</h3>
                <p className="text-zinc-400 text-sm mb-2">Fits: {light.year}</p>
                <p className="text-zinc-500 text-sm mb-3">{light.side}</p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-rose-500">${light.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-zinc-600 hover:bg-zinc-700 bg-transparent"
                      asChild
                    >
                      <Link href={`/product/${light.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="icon" className="bg-rose-600 hover:bg-rose-700">
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
