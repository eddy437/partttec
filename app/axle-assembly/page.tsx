"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Eye, Circle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const axleTypes = ["All", "Front Axle", "Rear Axle", "CV Axle", "Drive Shaft", "Differential"]

const axles = [
  {
    id: 301,
    name: "Front CV Axle Assembly",
    brand: "Toyota",
    year: "2018-2023",
    price: 249,
    condition: "New",
    side: "Driver Side",
    image: "/placeholder.svg?height=200&width=200",
    type: "CV Axle",
  },
  {
    id: 302,
    name: "Rear Axle Assembly Complete",
    brand: "Ford",
    year: "2019-2024",
    price: 899,
    condition: "Used",
    side: "Complete",
    image: "/placeholder.svg?height=200&width=200",
    type: "Rear Axle",
  },
  {
    id: 303,
    name: "Front Axle Shaft",
    brand: "Jeep",
    year: "2017-2023",
    price: 349,
    condition: "Remanufactured",
    side: "Passenger Side",
    image: "/placeholder.svg?height=200&width=200",
    type: "Front Axle",
  },
  {
    id: 304,
    name: "Drive Shaft Assembly",
    brand: "Chevrolet",
    year: "2018-2024",
    price: 449,
    condition: "Used",
    side: "Front",
    image: "/placeholder.svg?height=200&width=200",
    type: "Drive Shaft",
  },
  {
    id: 305,
    name: "Rear Differential",
    brand: "BMW",
    year: "2019-2024",
    price: 1299,
    condition: "Remanufactured",
    side: "Rear",
    image: "/placeholder.svg?height=200&width=200",
    type: "Differential",
  },
  {
    id: 306,
    name: "CV Axle Pair",
    brand: "Honda",
    year: "2020-2024",
    price: 399,
    condition: "New",
    side: "Pair",
    image: "/placeholder.svg?height=200&width=200",
    type: "CV Axle",
  },
  {
    id: 307,
    name: "Dana 44 Front Axle",
    brand: "Jeep",
    year: "2018-2023",
    price: 1599,
    condition: "Used",
    side: "Complete",
    image: "/placeholder.svg?height=200&width=200",
    type: "Front Axle",
  },
  {
    id: 308,
    name: "Limited Slip Differential",
    brand: "Ford",
    year: "2019-2024",
    price: 799,
    condition: "Remanufactured",
    side: "Rear",
    image: "/placeholder.svg?height=200&width=200",
    type: "Differential",
  },
]

export default function AxleAssemblyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("all")

  const filteredAxles = axles.filter((axle) => {
    const matchesSearch =
      axle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      axle.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || axle.type === selectedType
    const matchesCondition = selectedCondition === "all" || axle.condition.toLowerCase() === selectedCondition
    return matchesSearch && matchesType && matchesCondition
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-zinc-900 py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Circle className="h-12 w-12 text-emerald-400" />
            <h1 className="text-5xl font-bold text-white">Axle Assembly</h1>
          </div>
          <p className="text-xl text-emerald-100 max-w-2xl">
            CV axles, drive shafts, differentials and complete axle assemblies. Quality parts for all vehicles.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">400+</p>
              <p className="text-emerald-200">Axle Parts</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">1-Year</p>
              <p className="text-emerald-200">Warranty</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">OEM</p>
              <p className="text-emerald-200">Specs</p>
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
                  placeholder="Search axle parts..."
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

            <div className="flex flex-wrap gap-2 mt-4">
              {axleTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={
                    selectedType === type
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
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

        <p className="text-zinc-400 mb-6">{filteredAxles.length} parts found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAxles.map((axle) => (
            <Card
              key={axle.id}
              className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-emerald-500/50 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={axle.image || "/placeholder.svg"}
                  alt={axle.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    axle.condition === "New"
                      ? "bg-green-500"
                      : axle.condition === "Remanufactured"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                >
                  {axle.condition}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-zinc-900/80">{axle.brand}</Badge>
                <Badge className="absolute bottom-3 left-3 bg-emerald-600">{axle.type}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{axle.name}</h3>
                <p className="text-zinc-400 text-sm mb-2">Fits: {axle.year}</p>
                <p className="text-zinc-500 text-sm mb-3">{axle.side}</p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-emerald-500">${axle.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-zinc-600 hover:bg-zinc-700 bg-transparent"
                      asChild
                    >
                      <Link href={`/product/${axle.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700">
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
