"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Eye, Cog } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const transmissionTypes = ["All", "Automatic", "Manual", "CVT", "DCT", "4WD/AWD"]

const transmissions = [
  {
    id: "trans-1",
    name: "6-Speed Automatic Transmission",
    brand: "Toyota",
    year: "2018-2023",
    price: 1899,
    condition: "Used",
    mileage: "48,000",
    image: "/automatic-transmission.jpg",
    type: "Automatic",
    speeds: "6-Speed",
  },
  {
    id: "trans-2",
    name: "10-Speed Automatic",
    brand: "Ford",
    year: "2019-2024",
    price: 2499,
    condition: "Remanufactured",
    mileage: "0",
    image: "/10-speed-transmission.jpg",
    type: "Automatic",
    speeds: "10-Speed",
  },
  {
    id: "trans-3",
    name: "6-Speed Manual Transmission",
    brand: "Honda",
    year: "2020-2024",
    price: 1299,
    condition: "Used",
    mileage: "35,000",
    image: "/manual-transmission.jpg",
    type: "Manual",
    speeds: "6-Speed",
  },
  {
    id: "trans-4",
    name: "CVT Transmission",
    brand: "Nissan",
    year: "2017-2022",
    price: 1599,
    condition: "Remanufactured",
    mileage: "0",
    image: "/cvt-transmission.jpg",
    type: "CVT",
    speeds: "CVT",
  },
  {
    id: "trans-5",
    name: "8-Speed ZF Automatic",
    brand: "BMW",
    year: "2019-2024",
    price: 3299,
    condition: "Used",
    mileage: "28,000",
    image: "/bmw-zf-transmission.jpg",
    type: "Automatic",
    speeds: "8-Speed",
  },
  {
    id: "trans-6",
    name: "Tremec 6-Speed Manual",
    brand: "Chevrolet",
    year: "2018-2023",
    price: 2199,
    condition: "Used",
    mileage: "22,000",
    image: "/tremec-manual-transmission.jpg",
    type: "Manual",
    speeds: "6-Speed",
  },
  {
    id: "trans-7",
    name: "4WD Transfer Case & Trans",
    brand: "Jeep",
    year: "2019-2024",
    price: 2899,
    condition: "Used",
    mileage: "41,000",
    image: "/jeep-transfer-case.jpg",
    type: "4WD/AWD",
    speeds: "8-Speed",
  },
  {
    id: "trans-8",
    name: "Dual Clutch 7-Speed DCT",
    brand: "Volkswagen",
    year: "2020-2024",
    price: 2699,
    condition: "Remanufactured",
    mileage: "0",
    image: "/vw-dct-transmission.jpg",
    type: "DCT",
    speeds: "7-Speed",
  },
]

export { transmissions }

export default function TransmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("all")

  const filteredTransmissions = transmissions.filter((trans) => {
    const matchesSearch =
      trans.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trans.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || trans.type === selectedType
    const matchesCondition = selectedCondition === "all" || trans.condition.toLowerCase() === selectedCondition
    return matchesSearch && matchesType && matchesCondition
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-zinc-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/transmission-hero.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Cog className="h-12 w-12 text-blue-400" />
            <h1 className="text-5xl font-bold text-white">Transmissions</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Automatic, manual, CVT and specialty transmissions. All tested with warranty included.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">350+</p>
              <p className="text-blue-200">Transmissions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">6-Month</p>
              <p className="text-blue-200">Warranty</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">Tested</p>
              <p className="text-blue-200">& Verified</p>
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
                  placeholder="Search transmissions..."
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

            <div className="mt-4 flex flex-wrap gap-2">
              {transmissionTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedType === type
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <p className="text-zinc-400 mb-6">{filteredTransmissions.length} transmissions found</p>

        {/* Transmission Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTransmissions.map((trans) => (
            <Card
              key={trans.id}
              className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={trans.image || "/placeholder.svg"}
                  alt={trans.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    trans.condition === "New"
                      ? "bg-green-500"
                      : trans.condition === "Remanufactured"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                >
                  {trans.condition}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-zinc-900/80">{trans.brand}</Badge>
                <Badge className="absolute bottom-3 left-3 bg-blue-600">{trans.type}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{trans.name}</h3>
                <p className="text-zinc-400 text-sm mb-2">Fits: {trans.year}</p>
                <p className="text-zinc-500 text-sm mb-3">{trans.speeds}</p>

                {trans.mileage !== "0" && <p className="text-zinc-500 text-sm mb-3">Mileage: {trans.mileage} mi</p>}

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-blue-500">${trans.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-zinc-600 hover:bg-zinc-700 bg-transparent"
                      asChild
                    >
                      <Link href={`/transmissions/${trans.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
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
