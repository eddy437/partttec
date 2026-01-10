"use client"

import { useState } from "react"
import { Search, MapPin, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const MECHANICS_DATABASE = [
  {
    name: "Precision Tune Auto Care",
    city: "Mobile",
    state: "AL",
    zip: "35401",
    address: "2852 Government Blvd",
    phone: "(251) 351-7065",
  },
  {
    name: "Crowell Automotive",
    city: "Mobile",
    state: "AL",
    zip: "35802",
    address: "1530 W I-65 Service Rd",
    phone: "(251) 655-1498",
  },
  {
    name: "Phoenix Auto Repair",
    city: "Phoenix",
    state: "AZ",
    zip: "85001",
    address: "Phoenix Area",
    phone: "Contact shop",
  },
  {
    name: "Tucson Auto Service",
    city: "Tucson",
    state: "AZ",
    zip: "85701",
    address: "Tucson Area",
    phone: "Contact shop",
  },
  {
    name: "Little Rock Auto Care",
    city: "Little Rock",
    state: "AR",
    zip: "72201",
    address: "Little Rock Area",
    phone: "Contact shop",
  },
  {
    name: "LA Auto Repair",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    address: "Los Angeles Area",
    phone: "Contact shop",
  },
  {
    name: "San Diego Automotive",
    city: "San Diego",
    state: "CA",
    zip: "92101",
    address: "San Diego Area",
    phone: "Contact shop",
  },
  {
    name: "San Francisco Auto",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    address: "San Francisco Area",
    phone: "Contact shop",
  },
  {
    name: "Denver Auto Service",
    city: "Denver",
    state: "CO",
    zip: "80201",
    address: "Denver Area",
    phone: "Contact shop",
  },
  {
    name: "Colorado Springs Auto",
    city: "Colorado Springs",
    state: "CO",
    zip: "80901",
    address: "Colorado Springs Area",
    phone: "Contact shop",
  },
  {
    name: "Hartford Auto Repair",
    city: "Hartford",
    state: "CT",
    zip: "06101",
    address: "Hartford Area",
    phone: "Contact shop",
  },
  {
    name: "Wilmington Auto Care",
    city: "Wilmington",
    state: "DE",
    zip: "19801",
    address: "Wilmington Area",
    phone: "Contact shop",
  },
  {
    name: "Jacksonville Auto",
    city: "Jacksonville",
    state: "FL",
    zip: "32099",
    address: "Jacksonville Area",
    phone: "Contact shop",
  },
  {
    name: "Miami Auto Service",
    city: "Miami",
    state: "FL",
    zip: "33101",
    address: "Miami Area",
    phone: "Contact shop",
  },
  { name: "Tampa Auto Repair", city: "Tampa", state: "FL", zip: "33601", address: "Tampa Area", phone: "Contact shop" },
  {
    name: "Orlando Auto Care",
    city: "Orlando",
    state: "FL",
    zip: "32801",
    address: "Orlando Area",
    phone: "Contact shop",
  },
  {
    name: "Atlanta Auto Service",
    city: "Atlanta",
    state: "GA",
    zip: "30301",
    address: "Atlanta Area",
    phone: "Contact shop",
  },
  {
    name: "Honolulu Auto Repair",
    city: "Honolulu",
    state: "HI",
    zip: "96801",
    address: "Honolulu Area",
    phone: "Contact shop",
  },
  { name: "Boise Auto Care", city: "Boise", state: "ID", zip: "83701", address: "Boise Area", phone: "Contact shop" },
  {
    name: "Chicago Auto Service",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    address: "Chicago Area",
    phone: "Contact shop",
  },
  {
    name: "Indianapolis Auto",
    city: "Indianapolis",
    state: "IN",
    zip: "46201",
    address: "Indianapolis Area",
    phone: "Contact shop",
  },
  {
    name: "Des Moines Auto Repair",
    city: "Des Moines",
    state: "IA",
    zip: "50301",
    address: "Des Moines Area",
    phone: "Contact shop",
  },
  {
    name: "Wichita Auto Service",
    city: "Wichita",
    state: "KS",
    zip: "67201",
    address: "Wichita Area",
    phone: "Contact shop",
  },
  {
    name: "Louisville Auto Care",
    city: "Louisville",
    state: "KY",
    zip: "40201",
    address: "Louisville Area",
    phone: "Contact shop",
  },
  {
    name: "New Orleans Auto",
    city: "New Orleans",
    state: "LA",
    zip: "70112",
    address: "New Orleans Area",
    phone: "Contact shop",
  },
  {
    name: "Portland Auto Repair",
    city: "Portland",
    state: "ME",
    zip: "04101",
    address: "Portland Area",
    phone: "Contact shop",
  },
  {
    name: "Baltimore Auto Service",
    city: "Baltimore",
    state: "MD",
    zip: "21201",
    address: "Baltimore Area",
    phone: "Contact shop",
  },
  {
    name: "Boston Auto Care",
    city: "Boston",
    state: "MA",
    zip: "02101",
    address: "Boston Area",
    phone: "Contact shop",
  },
  {
    name: "Detroit Auto Repair",
    city: "Detroit",
    state: "MI",
    zip: "48201",
    address: "Detroit Area",
    phone: "Contact shop",
  },
  {
    name: "Minneapolis Auto",
    city: "Minneapolis",
    state: "MN",
    zip: "55401",
    address: "Minneapolis Area",
    phone: "Contact shop",
  },
  {
    name: "Jackson Auto Service",
    city: "Jackson",
    state: "MS",
    zip: "39201",
    address: "Jackson Area",
    phone: "Contact shop",
  },
  {
    name: "Kansas City Auto",
    city: "Kansas City",
    state: "MO",
    zip: "64101",
    address: "Kansas City Area",
    phone: "Contact shop",
  },
  {
    name: "Billings Auto Repair",
    city: "Billings",
    state: "MT",
    zip: "59101",
    address: "Billings Area",
    phone: "Contact shop",
  },
  { name: "Omaha Auto Care", city: "Omaha", state: "NE", zip: "68101", address: "Omaha Area", phone: "Contact shop" },
  {
    name: "Las Vegas Auto",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    address: "Las Vegas Area",
    phone: "Contact shop",
  },
  {
    name: "Manchester Auto Service",
    city: "Manchester",
    state: "NH",
    zip: "03101",
    address: "Manchester Area",
    phone: "Contact shop",
  },
  {
    name: "Newark Auto Repair",
    city: "Newark",
    state: "NJ",
    zip: "07101",
    address: "Newark Area",
    phone: "Contact shop",
  },
  {
    name: "Albuquerque Auto",
    city: "Albuquerque",
    state: "NM",
    zip: "87101",
    address: "Albuquerque Area",
    phone: "Contact shop",
  },
  {
    name: "New York Auto Service",
    city: "New York",
    state: "NY",
    zip: "10001",
    address: "New York Area",
    phone: "Contact shop",
  },
  {
    name: "Charlotte Auto Care",
    city: "Charlotte",
    state: "NC",
    zip: "28201",
    address: "Charlotte Area",
    phone: "Contact shop",
  },
  { name: "Fargo Auto Repair", city: "Fargo", state: "ND", zip: "58102", address: "Fargo Area", phone: "Contact shop" },
  {
    name: "Columbus Auto Service",
    city: "Columbus",
    state: "OH",
    zip: "43201",
    address: "Columbus Area",
    phone: "Contact shop",
  },
  {
    name: "Oklahoma City Auto",
    city: "Oklahoma City",
    state: "OK",
    zip: "73101",
    address: "Oklahoma City Area",
    phone: "Contact shop",
  },
  {
    name: "Portland Auto Repair",
    city: "Portland",
    state: "OR",
    zip: "97201",
    address: "Portland Area",
    phone: "Contact shop",
  },
  {
    name: "Philadelphia Auto",
    city: "Philadelphia",
    state: "PA",
    zip: "19101",
    address: "Philadelphia Area",
    phone: "Contact shop",
  },
  {
    name: "Providence Auto Service",
    city: "Providence",
    state: "RI",
    zip: "02901",
    address: "Providence Area",
    phone: "Contact shop",
  },
  {
    name: "Charleston Auto Care",
    city: "Charleston",
    state: "SC",
    zip: "29401",
    address: "Charleston Area",
    phone: "Contact shop",
  },
  {
    name: "Sioux Falls Auto",
    city: "Sioux Falls",
    state: "SD",
    zip: "57101",
    address: "Sioux Falls Area",
    phone: "Contact shop",
  },
  {
    name: "Nashville Auto Repair",
    city: "Nashville",
    state: "TN",
    zip: "37201",
    address: "Nashville Area",
    phone: "Contact shop",
  },
  {
    name: "Houston Auto Service",
    city: "Houston",
    state: "TX",
    zip: "77001",
    address: "Houston Area",
    phone: "Contact shop",
  },
  {
    name: "Dallas Auto Care",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    address: "Dallas Area",
    phone: "Contact shop",
  },
  {
    name: "Austin Auto Repair",
    city: "Austin",
    state: "TX",
    zip: "78701",
    address: "Austin Area",
    phone: "Contact shop",
  },
  {
    name: "Salt Lake City Auto",
    city: "Salt Lake City",
    state: "UT",
    zip: "84101",
    address: "Salt Lake City Area",
    phone: "Contact shop",
  },
  {
    name: "Burlington Auto Service",
    city: "Burlington",
    state: "VT",
    zip: "05401",
    address: "Burlington Area",
    phone: "Contact shop",
  },
  {
    name: "Virginia Beach Auto",
    city: "Virginia Beach",
    state: "VA",
    zip: "23451",
    address: "Virginia Beach Area",
    phone: "Contact shop",
  },
  {
    name: "Seattle Auto Repair",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    address: "Seattle Area",
    phone: "Contact shop",
  },
  {
    name: "Charleston Auto Care",
    city: "Charleston",
    state: "WV",
    zip: "25301",
    address: "Charleston Area",
    phone: "Contact shop",
  },
  {
    name: "Milwaukee Auto Service",
    city: "Milwaukee",
    state: "WI",
    zip: "53201",
    address: "Milwaukee Area",
    phone: "Contact shop",
  },
  {
    name: "Cheyenne Auto Repair",
    city: "Cheyenne",
    state: "WY",
    zip: "82001",
    address: "Cheyenne Area",
    phone: "Contact shop",
  },
]

export default function FindMechanicPage() {
  const [zipCode, setZipCode] = useState("")
  const [results, setResults] = useState<typeof MECHANICS_DATABASE>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!zipCode || zipCode.length < 3) {
      alert("Please enter a valid ZIP code")
      return
    }

    const zipPrefix = zipCode.substring(0, 3)
    const filtered = MECHANICS_DATABASE.filter((m) => m.zip === zipCode || m.zip.substring(0, 3) === zipPrefix).slice(
      0,
      20,
    )

    setResults(filtered)
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-4">Find Mechanics Near You</h1>
          <p className="text-xl text-red-100">Certified installers for your auto parts</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="bg-neutral-900 border-white/10">
          <CardContent className="p-8">
            <div className="flex gap-4 items-center max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <Input
                  type="text"
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  maxLength={5}
                  className="pl-12 h-14 text-lg bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="bg-red-600 hover:bg-red-700 h-14 px-8">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {hasSearched && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              {results.length > 0 ? `Found ${results.length} mechanics` : "No mechanics found"}
            </h2>
            {results.length > 0 && <p className="text-neutral-400 mt-1">Near ZIP code {zipCode}</p>}
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid gap-4">
            {results.map((mechanic, index) => (
              <Card key={index} className="bg-neutral-900 border-white/10 hover:border-red-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{mechanic.name}</h3>
                      <div className="space-y-2 text-neutral-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>
                            {mechanic.address}, {mechanic.city}, {mechanic.state} {mechanic.zip}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-red-500" />
                          <span>{mechanic.phone}</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 gap-2">
                      <a
                        href={`/shop?mechanic=${mechanic.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Parts <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hasSearched ? (
          <Card className="bg-neutral-900 border-white/10">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-bold text-white mb-2">No mechanics found in this area</h3>
              <p className="text-neutral-400">Try searching with a different ZIP code</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
