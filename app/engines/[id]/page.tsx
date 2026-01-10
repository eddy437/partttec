"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Phone, Mail, Check, Truck, Shield, Fuel, Gauge, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"

const engines = [
  {
    id: "engine-1",
    name: "3.5L V6 Engine Assembly",
    brand: "Toyota",
    model: "Camry, Highlander, Avalon",
    year: "2018-2023",
    price: 2499,
    condition: "Used",
    mileage: "45,000",
    image: "/toyota-v6-engine.jpg",
    fuel: "Gasoline",
    hp: "301 HP",
    type: "V6",
    warranty: "90 Days",
    sku: "TOY-V6-35L-2018",
    description:
      "OEM Toyota 3.5L V6 engine assembly. Complete with all accessories, tested and verified. Low mileage unit from accident-free vehicle.",
  },
  {
    id: "engine-2",
    name: "5.0L V8 Coyote Engine",
    brand: "Ford",
    model: "Mustang GT, F-150",
    year: "2019-2024",
    price: 4999,
    condition: "Remanufactured",
    mileage: "0",
    image: "/ford-v8-coyote-engine.jpg",
    fuel: "Gasoline",
    hp: "460 HP",
    type: "V8",
    warranty: "1 Year",
    sku: "FRD-V8-50L-COYOTE",
    description:
      "Remanufactured Ford 5.0L Coyote V8 engine. All new bearings, seals, and gaskets. Dyno tested for quality assurance.",
  },
  {
    id: "engine-3",
    name: "2.0L Turbo 4-Cylinder",
    brand: "Honda",
    model: "Accord, Civic Type R",
    year: "2020-2024",
    price: 1899,
    condition: "Used",
    mileage: "32,000",
    image: "/honda-turbo-engine.jpg",
    fuel: "Gasoline",
    hp: "252 HP",
    type: "4-Cylinder",
    warranty: "90 Days",
    sku: "HON-4CYL-20T-2020",
    description:
      "Honda 2.0L turbocharged 4-cylinder engine. High performance unit with low miles. Perfect for Accord Sport or Civic Type R.",
  },
  {
    id: "engine-4",
    name: "6.7L Power Stroke Diesel",
    brand: "Ford",
    model: "F-250, F-350 Super Duty",
    year: "2017-2022",
    price: 7999,
    condition: "Remanufactured",
    mileage: "0",
    image: "/ford-diesel-engine.jpg",
    fuel: "Diesel",
    hp: "475 HP",
    type: "Diesel",
    warranty: "2 Years",
    sku: "FRD-DSL-67L-PWR",
    description:
      "Remanufactured Ford 6.7L Power Stroke diesel engine. Complete overhaul with new injectors, turbo rebuilt. Heavy duty ready.",
  },
  {
    id: "engine-5",
    name: "3.0L Inline-6 Turbo",
    brand: "BMW",
    model: "3 Series, 5 Series, X3, X5",
    year: "2019-2024",
    price: 5499,
    condition: "Used",
    mileage: "28,000",
    image: "/bmw-inline-6-engine.jpg",
    fuel: "Gasoline",
    hp: "382 HP",
    type: "6-Cylinder",
    warranty: "90 Days",
    sku: "BMW-I6-30T-B58",
    description:
      "BMW B58 3.0L inline-6 turbocharged engine. Silky smooth power delivery. Low mileage from well-maintained vehicle.",
  },
  {
    id: "engine-6",
    name: "5.7L HEMI V8",
    brand: "Dodge",
    model: "Challenger, Charger, RAM 1500",
    year: "2018-2023",
    price: 3999,
    condition: "Used",
    mileage: "52,000",
    image: "/dodge-hemi-engine.jpg",
    fuel: "Gasoline",
    hp: "395 HP",
    type: "V8",
    warranty: "90 Days",
    sku: "DOD-V8-57L-HEMI",
    description: "Dodge 5.7L HEMI V8 engine with MDS (Multi-Displacement System). Tested and ready for installation.",
  },
  {
    id: "engine-7",
    name: "2.5L Hybrid Engine",
    brand: "Toyota",
    model: "Camry Hybrid, RAV4 Hybrid",
    year: "2020-2024",
    price: 3299,
    condition: "Used",
    mileage: "18,000",
    image: "/toyota-hybrid-engine.jpg",
    fuel: "Hybrid",
    hp: "203 HP",
    type: "Hybrid",
    warranty: "6 Months",
    sku: "TOY-HYB-25L-2020",
    description:
      "Toyota 2.5L hybrid engine assembly. Includes hybrid transaxle. Excellent fuel economy. Very low mileage unit.",
  },
  {
    id: "engine-8",
    name: "6.2L Supercharged V8",
    brand: "Chevrolet",
    model: "Camaro ZL1, Corvette Z06",
    year: "2019-2024",
    price: 8999,
    condition: "Remanufactured",
    mileage: "0",
    image: "/chevrolet-supercharged-engine.jpg",
    fuel: "Gasoline",
    hp: "650 HP",
    type: "V8",
    warranty: "1 Year",
    sku: "CHV-V8-62L-SC",
    description:
      "Chevrolet LT4 6.2L supercharged V8 engine. Remanufactured with new supercharger rebuild. Track-ready performance.",
  },
]

export default function EngineDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  const engine = engines.find((e) => e.id === id)

  if (!engine) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Engine Not Found</h1>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/engines">Back to Engines</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: engine.id,
      name: engine.name,
      price: engine.price,
      image: engine.image,
      quantity: quantity,
      condition: engine.condition,
      warranty: engine.warranty,
    })
    toast.success("Added to cart!", {
      description: `${engine.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Engines
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
              <Image src={engine.image || "/placeholder.svg"} alt={engine.name} fill className="object-cover" />
              <Badge
                className={`absolute top-4 right-4 text-lg px-4 py-2 ${
                  engine.condition === "Remanufactured" ? "bg-blue-600" : "bg-amber-500"
                }`}
              >
                {engine.condition}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-zinc-800 border-2 border-zinc-700 hover:border-red-500 cursor-pointer"
                >
                  <Image
                    src={engine.image || "/placeholder.svg"}
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
            <Badge className="bg-red-600 mb-4">{engine.brand}</Badge>
            <h1 className="text-3xl font-bold text-white mb-2">{engine.name}</h1>
            <p className="text-zinc-400 mb-4">SKU: {engine.sku}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Settings className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Type</p>
                    <p className="text-white font-semibold">{engine.type}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Gauge className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Power</p>
                    <p className="text-white font-semibold">{engine.hp}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Fuel className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Fuel Type</p>
                    <p className="text-white font-semibold">{engine.fuel}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-4 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-zinc-400 text-sm">Warranty</p>
                    <p className="text-white font-semibold">{engine.warranty}</p>
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
                    Year: {engine.year}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                    Make: {engine.brand}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                    Models: {engine.model}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mileage */}
            {engine.mileage !== "0" && (
              <div className="flex items-center gap-2 mb-6 text-zinc-400">
                <span>Mileage:</span>
                <span className="text-white font-semibold">{engine.mileage} miles</span>
              </div>
            )}

            {/* Price & Add to Cart */}
            <div className="bg-zinc-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-zinc-400 text-sm">Price</p>
                  <p className="text-4xl font-bold text-red-500">${engine.price.toLocaleString()}</p>
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
              <Button className="w-full bg-red-600 hover:bg-red-700 h-14 text-lg" onClick={handleAddToCart}>
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
                <span>{engine.warranty} Warranty Included</span>
              </div>
            </div>

            {/* Description */}
            <Card className="bg-zinc-800/50 border-zinc-700 mt-6">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-zinc-400">{engine.description}</p>
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
