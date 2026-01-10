"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Phone, Mail, Check, Truck, Shield, Cog, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"

const transmissions = [
  {
    id: "trans-1",
    name: "6-Speed Automatic Transmission",
    brand: "Toyota",
    model: "Camry, RAV4, Highlander",
    year: "2018-2023",
    price: 1899,
    condition: "Used",
    mileage: "48,000",
    image: "/automatic-transmission.jpg",
    type: "Automatic",
    speeds: "6-Speed",
    warranty: "90 Days",
    sku: "TOY-AT-6SPD-2018",
    description:
      "OEM Toyota 6-speed automatic transmission. Fully tested with smooth shifting. Complete with torque converter.",
  },
  {
    id: "trans-2",
    name: "10-Speed Automatic",
    brand: "Ford",
    model: "F-150, Mustang, Expedition",
    year: "2019-2024",
    price: 2499,
    condition: "Remanufactured",
    mileage: "0",
    image: "/10-speed-transmission.jpg",
    type: "Automatic",
    speeds: "10-Speed",
    warranty: "1 Year",
    sku: "FRD-AT-10SPD-10R80",
    description:
      "Remanufactured Ford 10R80 10-speed automatic transmission. All new clutches, seals, and solenoids. Dyno tested.",
  },
  {
    id: "trans-3",
    name: "6-Speed Manual Transmission",
    brand: "Honda",
    model: "Civic Si, Accord Sport",
    year: "2020-2024",
    price: 1299,
    condition: "Used",
    mileage: "35,000",
    image: "/manual-transmission.jpg",
    type: "Manual",
    speeds: "6-Speed",
    warranty: "90 Days",
    sku: "HON-MT-6SPD-2020",
    description: "Honda 6-speed manual transmission. Smooth engagement, no grinding. Perfect for enthusiast builds.",
  },
  {
    id: "trans-4",
    name: "CVT Transmission",
    brand: "Nissan",
    model: "Altima, Rogue, Sentra",
    year: "2017-2022",
    price: 1599,
    condition: "Remanufactured",
    mileage: "0",
    image: "/cvt-transmission.jpg",
    type: "CVT",
    speeds: "CVT",
    warranty: "1 Year",
    sku: "NIS-CVT-JF015E",
    description:
      "Remanufactured Nissan CVT transmission. New belt, pulleys, and valve body. Extended warranty available.",
  },
  {
    id: "trans-5",
    name: "8-Speed ZF Automatic",
    brand: "BMW",
    model: "3 Series, 5 Series, X3, X5",
    year: "2019-2024",
    price: 3299,
    condition: "Used",
    mileage: "28,000",
    image: "/bmw-zf-transmission.jpg",
    type: "Automatic",
    speeds: "8-Speed",
    warranty: "90 Days",
    sku: "BMW-AT-ZF8HP",
    description:
      "BMW ZF 8HP 8-speed automatic transmission. World-renowned for smooth, quick shifts. Low mileage unit.",
  },
  {
    id: "trans-6",
    name: "Tremec 6-Speed Manual",
    brand: "Chevrolet",
    model: "Camaro SS, Corvette",
    year: "2018-2023",
    price: 2199,
    condition: "Used",
    mileage: "22,000",
    image: "/tremec-manual-transmission.jpg",
    type: "Manual",
    speeds: "6-Speed",
    warranty: "90 Days",
    sku: "CHV-MT-TR6060",
    description:
      "Tremec TR6060 6-speed manual transmission. Heavy duty for high horsepower applications. Track proven.",
  },
  {
    id: "trans-7",
    name: "4WD Transfer Case & Trans",
    brand: "Jeep",
    model: "Wrangler, Grand Cherokee",
    year: "2019-2024",
    price: 2899,
    condition: "Used",
    mileage: "41,000",
    image: "/jeep-transfer-case.jpg",
    type: "4WD/AWD",
    speeds: "8-Speed",
    warranty: "90 Days",
    sku: "JEP-4WD-850RE",
    description:
      "Jeep 850RE 8-speed transmission with transfer case. Complete 4WD drivetrain solution. Off-road tested.",
  },
  {
    id: "trans-8",
    name: "Dual Clutch 7-Speed DCT",
    brand: "Volkswagen",
    model: "Golf GTI, Golf R, Jetta GLI",
    year: "2020-2024",
    price: 2699,
    condition: "Remanufactured",
    mileage: "0",
    image: "/vw-dct-transmission.jpg",
    type: "DCT",
    speeds: "7-Speed",
    warranty: "1 Year",
    sku: "VW-DCT-DQ381",
    description:
      "Remanufactured VW DQ381 7-speed dual clutch transmission. Lightning fast shifts. New mechatronic unit.",
  },
]

export default function TransmissionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  const transmission = transmissions.find((t) => t.id === id)

  if (!transmission) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Transmission Not Found</h1>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/transmissions">Back to Transmissions</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: transmission.id,
      name: transmission.name,
      price: transmission.price,
      image: transmission.image,
      quantity: quantity,
      condition: transmission.condition,
      warranty: transmission.warranty,
    })
    toast.success("Added to cart!", {
      description: `${transmission.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Transmissions
            </Button>
            <div className="flex items-center gap-4">
              <a href="tel:1-800-528-9978" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                <Phone className="h-4 w-4" /> 1-800-528-9978
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-800">
              <Image
                src={transmission.image || "/placeholder.svg"}
                alt={transmission.name}
                fill
                className="object-cover"
              />
              <Badge
                className={`absolute top-4 right-4 text-lg px-4 py-2 ${
                  transmission.condition === "Remanufactured" ? "bg-blue-600" : "bg-amber-500"
                }`}
              >
                {transmission.condition}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-zinc-800 border-2 border-zinc-700 hover:border-blue-500 cursor-pointer"
                >
                  <Image
                    src={transmission.image || "/placeholder.svg"}
                    alt=""
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <Badge className="bg-blue-600 mb-4">{transmission.brand}</Badge>
            <h1 className="text-3xl font-bold text-white mb-2">{transmission.name}</h1>
            <p className="text-zinc-400 mb-4">SKU: {transmission.sku}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Cog className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Type</p>
                    <p className="text-white font-semibold">{transmission.type}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Gauge className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Speeds</p>
                    <p className="text-white font-semibold">{transmission.speeds}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Warranty</p>
                    <p className="text-white font-semibold">{transmission.warranty}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Truck className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Shipping</p>
                    <p className="text-white font-semibold">Free $500+</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vehicle Fitment */}
            <Card className="bg-zinc-800/50 border-zinc-700 mb-6">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2">Fits Vehicles</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                    Year: {transmission.year}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                    Make: {transmission.brand}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                    Models: {transmission.model}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mileage */}
            {transmission.mileage !== "0" && (
              <div className="flex items-center gap-2 mb-6 text-zinc-400">
                <span>Mileage:</span>
                <span className="text-white font-semibold">{transmission.mileage} miles</span>
              </div>
            )}

            {/* Price & Add to Cart */}
            <div className="bg-zinc-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-zinc-400 text-sm">Price</p>
                  <p className="text-4xl font-bold text-blue-500">${transmission.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                  >
                    -
                  </button>
                  <span className="text-white w-10 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-300">
                <Check className="h-5 w-5 text-green-500" />
                <span>Tested & Quality Verified</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Truck className="h-5 w-5 text-green-500" />
                <span>Free Shipping on Orders $500+</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Shield className="h-5 w-5 text-green-500" />
                <span>{transmission.warranty} Warranty Included</span>
              </div>
            </div>

            {/* Description */}
            <Card className="bg-zinc-800/50 border-zinc-700 mt-6">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-zinc-400">{transmission.description}</p>
              </CardContent>
            </Card>

            {/* Contact */}
            <div className="mt-6 flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                asChild
              >
                <a href="tel:1-800-528-9978">
                  <Phone className="h-4 w-4 mr-2" /> Call Us
                </a>
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                asChild
              >
                <a href="mailto:sales@allusedautoparts.world">
                  <Mail className="h-4 w-4 mr-2" /> Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
