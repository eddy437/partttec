"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Car, CheckCircle, AlertTriangle, HelpCircle, BookOpen, Wrench, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString())
const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Nissan", "Dodge", "Jeep", "Volkswagen"]
const models: Record<string, string[]> = {
  Toyota: ["Camry", "Corolla", "RAV4", "Tacoma", "Tundra", "Highlander", "4Runner"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Ranger"],
  Chevrolet: ["Silverado", "Camaro", "Equinox", "Tahoe", "Malibu", "Colorado"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "M3"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  Nissan: ["Altima", "Maxima", "Rogue", "Pathfinder", "Frontier"],
  Dodge: ["Charger", "Challenger", "Durango", "Ram 1500"],
  Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Gladiator"],
  Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf"],
}

const fitmentTips = [
  {
    title: "Check Your VIN",
    description:
      "Your Vehicle Identification Number is the most accurate way to verify fitment. Find it on your dashboard or driver's door jamb.",
  },
  {
    title: "OEM Part Numbers",
    description:
      "Cross-reference our part numbers with your vehicle's original part number for guaranteed compatibility.",
  },
  {
    title: "Engine Size Matters",
    description:
      "Many parts are engine-specific. Always verify your engine size (e.g., 3.5L V6) when ordering engine components.",
  },
  {
    title: "Year Range",
    description:
      "While a part may fit multiple years, slight variations exist. Always confirm your exact year is listed.",
  },
]

const faqs = [
  {
    question: "How do I know if a part fits my vehicle?",
    answer:
      "Use our fitment checker above or look for your vehicle in the compatibility list on each product page. When in doubt, contact our team with your VIN.",
  },
  {
    question: "What if the part doesn't fit?",
    answer:
      "We offer hassle-free returns within 30 days for parts that don't fit. Make sure to keep original packaging.",
  },
  {
    question: "Can I return an installed part?",
    answer:
      "Unfortunately, installed parts cannot be returned unless they are defective. Please verify fitment before installation.",
  },
  {
    question: "Where do I find my VIN?",
    answer:
      "Your VIN is located on your dashboard (visible through windshield), driver's door jamb, vehicle registration, or insurance card.",
  },
]

export default function FitmentGuidePage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [vin, setVin] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (selectedYear && selectedMake && selectedModel) {
      setIsSearching(true)
      router.push(`/shop?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}`)
    }
  }

  const handleVinLookup = () => {
    if (vin.length === 17) {
      setIsSearching(true)
      router.push(`/shop?vin=${vin}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-cyan-900 via-cyan-800 to-zinc-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <Car className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">Fitment Guide</h1>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Find the right part for your vehicle. Use our fitment checker or VIN lookup for guaranteed compatibility.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Fitment Checker */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Search className="h-6 w-6 text-cyan-500" />
              Vehicle Fitment Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedMake}
                onValueChange={(v) => {
                  setSelectedMake(v)
                  setSelectedModel("")
                }}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {(models[selectedMake] || []).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!selectedYear || !selectedMake || !selectedModel || isSearching}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  !selectedYear || !selectedMake || !selectedModel
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
              >
                <Search className="h-4 w-4" /> {isSearching ? "Searching..." : "Find Parts"}
              </button>
            </div>

            <div className="border-t border-zinc-700 pt-6">
              <p className="text-zinc-400 mb-4">Or search by VIN for exact fitment:</p>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter your 17-digit VIN..."
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  maxLength={17}
                  className="bg-zinc-900 border-zinc-700 text-white font-mono"
                />
                <button
                  type="button"
                  onClick={handleVinLookup}
                  disabled={vin.length !== 17 || isSearching}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    vin.length !== 17
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-700 text-white"
                  }`}
                >
                  {isSearching ? "Looking up..." : "Lookup VIN"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fitment Tips */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">Fitment Tips</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {fitmentTips.map((tip, i) => (
            <Card key={i} className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6 flex gap-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{tip.title}</h3>
                  <p className="text-zinc-400 text-sm">{tip.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-zinc-800/50 border-zinc-700 hover:border-cyan-500/50 transition-all">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Part Catalogs</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Browse our complete catalog organized by vehicle make and model.
              </p>
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent" asChild>
                <Link href="/shop">View Catalog</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-zinc-800/50 border-zinc-700 hover:border-cyan-500/50 transition-all">
            <CardContent className="p-6 text-center">
              <Wrench className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Installation Guides</h3>
              <p className="text-zinc-400 text-sm mb-4">Step-by-step guides for common part installations.</p>
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent" asChild>
                <Link href="/faq">View Guides</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-zinc-800/50 border-zinc-700 hover:border-cyan-500/50 transition-all">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Spec Sheets</h3>
              <p className="text-zinc-400 text-sm mb-4">Technical specifications and OEM part number references.</p>
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent" asChild>
                <Link href="/shop">Download Specs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-cyan-500" />
              Fitment FAQs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-zinc-700 pb-4 last:border-0 last:pb-0">
                <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                <p className="text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 border-0">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Still Not Sure About Fitment?</h2>
            <p className="text-cyan-100 mb-6">
              Our ASE-certified technicians can verify compatibility for your specific vehicle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-zinc-100" asChild>
                <Link href="/contact">Contact Expert</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/find-mechanic">Find a Mechanic</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
