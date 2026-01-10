"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Eye, Box } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const transferCaseTypes = ["All", "Part-Time 4WD", "Full-Time 4WD", "AWD", "Electronic", "Manual Shift"]

const transferCases = [
  {
    id: 401,
    name: "NP231 Transfer Case",
    brand: "Jeep",
    year: "2018-2023",
    price: 899,
    condition: "Remanufactured",
    driveType: "Part-Time 4WD",
    image: "/placeholder.svg?height=200&width=200",
    type: "Part-Time 4WD",
  },
  {
    id: 402,
    name: "BW4406 Transfer Case",
    brand: "Ford",
    year: "2019-2024",
    price: 1299,
    condition: "Used",
    driveType: "Electronic Shift",
    image: "/placeholder.svg?height=200&width=200",
    type: "Electronic",
  },
  {
    id: 403,
    name: "NP246 AutoTrac",
    brand: "Chevrolet",
    year: "2017-2023",
    price: 1099,
    condition: "Remanufactured",
    driveType: "Full-Time 4WD",
    image: "/placeholder.svg?height=200&width=200",
    type: "Full-Time 4WD",
  },
  {
    id: 404,
    name: "MP3010 Transfer Case",
    brand: "BMW",
    year: "2019-2024",
    price: 1899,
    condition: "Used",
    driveType: "AWD",
    image: "/placeholder.svg?height=200&width=200",
    type: "AWD",
  },
  {
    id: 405,
    name: "NP241 Rock-Trac",
    brand: "Jeep",
    year: "2018-2024",
    price: 1499,
    condition: "Remanufactured",
    driveType: "Part-Time 4WD",
    image: "/placeholder.svg?height=200&width=200",
    type: "Part-Time 4WD",
  },
  {
    id: 406,
    name: "MP1626 Transfer Case",
    brand: "Chevrolet",
    year: "2020-2024",
    price: 1199,
    condition: "Used",
    driveType: "AWD",
    image: "/placeholder.svg?height=200&width=200",
    type: "AWD",
  },
  {
    id: 407,
    name: "BW4411 Transfer Case",
    brand: "Ford",
    year: "2018-2023",
    price: 999,
    condition: "Remanufactured",
    driveType: "Electronic",
    image: "/placeholder.svg?height=200&width=200",
    type: "Electronic",
  },
  {
    id: 408,
    name: "NP271 Manual Shift",
    brand: "Dodge",
    year: "2017-2024",
    price: 1399,
    condition: "Used",
    driveType: "Manual Shift",
    image: "/placeholder.svg?height=200&width=200",
    type: "Manual Shift",
  },
]

export default function TransferCasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("all")

  const filteredCases = transferCases.filter((tc) => {
    const matchesSearch =
      tc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tc.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || tc.type === selectedType
    const matchesCondition = selectedCondition === "all" || tc.condition.toLowerCase() === selectedCondition
    return matchesSearch && matchesType && matchesCondition
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-zinc-900 py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Box className="h-12 w-12 text-purple-400" />
            <h1 className="text-5xl font-bold text-white">Transfer Cases</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-2xl">
            4WD and AWD transfer cases for trucks and SUVs. Tested, inspected, and ready to install.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">200+</p>
              <p className="text-purple-200">Transfer Cases</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">Dyno</p>
              <p className="text-purple-200">Tested</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">6-Month</p>
              <p className="text-purple-200">Warranty</p>
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
                  placeholder="Search transfer cases..."
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
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="remanufactured">Remanufactured</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {transferCaseTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={
                    selectedType === type
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
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

        <p className="text-zinc-400 mb-6">{filteredCases.length} transfer cases found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCases.map((tc) => (
            <Card
              key={tc.id}
              className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-purple-500/50 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={tc.image || "/placeholder.svg"}
                  alt={tc.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    tc.condition === "Remanufactured" ? "bg-blue-500" : "bg-amber-500"
                  }`}
                >
                  {tc.condition}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-zinc-900/80">{tc.brand}</Badge>
                <Badge className="absolute bottom-3 left-3 bg-purple-600">{tc.type}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{tc.name}</h3>
                <p className="text-zinc-400 text-sm mb-2">Fits: {tc.year}</p>
                <p className="text-zinc-500 text-sm mb-3">{tc.driveType}</p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-purple-500">${tc.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-zinc-600 hover:bg-zinc-700 bg-transparent"
                      asChild
                    >
                      <Link href={`/product/${tc.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
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
