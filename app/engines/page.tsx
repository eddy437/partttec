"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Inline SVG Icons to avoid lucide-react import errors
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)
const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const FuelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" x2="15" y1="22" y2="22" />
    <line x1="4" x2="14" y1="9" y2="9" />
    <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
    <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
  </svg>
)
const GaugeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </svg>
)
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)
const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
)
const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
)

// Engine type categories with icons
const engineCategories = [
  { id: "all", name: "All Engines", icon: "🔧", count: 24 },
  { id: "v8", name: "V8 Engines", icon: "💪", count: 8 },
  { id: "v6", name: "V6 Engines", icon: "⚡", count: 6 },
  { id: "4cyl", name: "4-Cylinder", icon: "🔋", count: 5 },
  { id: "diesel", name: "Diesel", icon: "⛽", count: 3 },
  { id: "hybrid", name: "Hybrid", icon: "🌿", count: 2 },
]

// Engine data with 3 mileage tiers
const engines = [
  {
    id: "engine-1",
    name: "3.5L V6 Engine Assembly",
    brand: "Toyota",
    models: ["Camry", "Highlander", "Avalon", "Sienna"],
    years: "2018-2023",
    type: "v6",
    fuel: "Gasoline",
    hp: "301 HP",
    torque: "267 lb-ft",
    image: "/toyota-3-5l-v6-engine-assembly-clean.jpg",
    rating: 4.9,
    reviews: 127,
    sold: 89,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 1899, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 2499, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 3199, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-2",
    name: "5.0L V8 Coyote Engine",
    brand: "Ford",
    models: ["Mustang GT", "F-150"],
    years: "2018-2024",
    type: "v8",
    fuel: "Gasoline",
    hp: "460 HP",
    torque: "420 lb-ft",
    image: "/ford-5-0l-coyote-v8-engine-muscle-car.jpg",
    rating: 4.8,
    reviews: 203,
    sold: 156,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 3999, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 4999, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 6499, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-3",
    name: "2.0L Turbo VTEC Engine",
    brand: "Honda",
    models: ["Civic Type R", "Accord"],
    years: "2019-2024",
    type: "4cyl",
    fuel: "Gasoline",
    hp: "306 HP",
    torque: "295 lb-ft",
    image: "/honda-2-0l-turbo-vtec-engine-red-valve-cover.jpg",
    rating: 4.9,
    reviews: 89,
    sold: 67,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 2299, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 2899, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 3599, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-4",
    name: "6.7L Power Stroke Diesel",
    brand: "Ford",
    models: ["F-250", "F-350", "F-450"],
    years: "2017-2023",
    type: "diesel",
    fuel: "Diesel",
    hp: "475 HP",
    torque: "1050 lb-ft",
    image: "/ford-6-7l-power-stroke-diesel-engine-turbo.jpg",
    rating: 4.7,
    reviews: 145,
    sold: 98,
    tiers: [
      { label: "Economy", mileage: "120K-150K", price: 5999, warranty: "60 Days" },
      { label: "Standard", mileage: "80K-120K", price: 7499, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 80K", price: 9499, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-5",
    name: "5.7L HEMI V8 Engine",
    brand: "Dodge",
    models: ["Challenger", "Charger", "Ram 1500"],
    years: "2016-2023",
    type: "v8",
    fuel: "Gasoline",
    hp: "395 HP",
    torque: "410 lb-ft",
    image: "/dodge-5-7l-hemi-v8-engine-orange-headers.jpg",
    rating: 4.8,
    reviews: 312,
    sold: 245,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 2999, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 3799, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 4699, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-6",
    name: "3.0L B58 Inline-6 Turbo",
    brand: "BMW",
    models: ["M340i", "X3 M40i", "Z4 M40i"],
    years: "2019-2024",
    type: "v6",
    fuel: "Gasoline",
    hp: "382 HP",
    torque: "369 lb-ft",
    image: "/bmw-b58-3-0l-inline-6-turbo-engine.jpg",
    rating: 4.6,
    reviews: 67,
    sold: 43,
    tiers: [
      { label: "Economy", mileage: "60K-80K", price: 4499, warranty: "60 Days" },
      { label: "Standard", mileage: "40K-60K", price: 5499, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 40K", price: 6999, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-7",
    name: "6.2L LT4 Supercharged V8",
    brand: "Chevrolet",
    models: ["Corvette Z06", "Camaro ZL1"],
    years: "2017-2023",
    type: "v8",
    fuel: "Gasoline",
    hp: "650 HP",
    torque: "650 lb-ft",
    image: "/chevrolet-lt4-6-2l-supercharged-v8-engine.jpg",
    rating: 4.9,
    reviews: 56,
    sold: 34,
    tiers: [
      { label: "Economy", mileage: "40K-60K", price: 8999, warranty: "60 Days" },
      { label: "Standard", mileage: "20K-40K", price: 10999, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 20K", price: 13999, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-8",
    name: "2.5L Hybrid Synergy Drive",
    brand: "Toyota",
    models: ["Camry Hybrid", "RAV4 Hybrid"],
    years: "2019-2024",
    type: "hybrid",
    fuel: "Hybrid",
    hp: "208 HP",
    torque: "163 lb-ft",
    image: "/toyota-2-5l-hybrid-engine-with-electric-motor.jpg",
    rating: 4.8,
    reviews: 78,
    sold: 52,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 2799, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 3499, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 4299, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-9",
    name: "3.5L EcoBoost V6 Twin Turbo",
    brand: "Ford",
    models: ["F-150", "Expedition", "Lincoln Navigator"],
    years: "2017-2023",
    type: "v6",
    fuel: "Gasoline",
    hp: "400 HP",
    torque: "500 lb-ft",
    image: "/ford-3-5l-ecoboost-v6-twin-turbo-engine.jpg",
    rating: 4.7,
    reviews: 189,
    sold: 134,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 2699, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 3399, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 4199, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-10",
    name: "6.6L Duramax Diesel V8",
    brand: "Chevrolet",
    models: ["Silverado 2500HD", "Silverado 3500HD"],
    years: "2020-2024",
    type: "diesel",
    fuel: "Diesel",
    hp: "445 HP",
    torque: "910 lb-ft",
    image: "/chevrolet-6-6l-duramax-diesel-v8-engine.jpg",
    rating: 4.8,
    reviews: 98,
    sold: 67,
    tiers: [
      { label: "Economy", mileage: "120K-150K", price: 6499, warranty: "60 Days" },
      { label: "Standard", mileage: "80K-120K", price: 7999, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 80K", price: 9999, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-11",
    name: "2.3L EcoBoost 4-Cylinder",
    brand: "Ford",
    models: ["Mustang EcoBoost", "Ranger", "Explorer"],
    years: "2018-2024",
    type: "4cyl",
    fuel: "Gasoline",
    hp: "310 HP",
    torque: "350 lb-ft",
    image: "/ford-2-3l-ecoboost-4-cylinder-turbo-engine.jpg",
    rating: 4.6,
    reviews: 134,
    sold: 89,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 1799, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 2299, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 2899, warranty: "1 Year" },
    ],
  },
  {
    id: "engine-12",
    name: "3.6L Pentastar V6",
    brand: "Jeep",
    models: ["Wrangler", "Grand Cherokee", "Gladiator"],
    years: "2016-2023",
    type: "v6",
    fuel: "Gasoline",
    hp: "285 HP",
    torque: "260 lb-ft",
    image: "/jeep-3-6l-pentastar-v6-engine.jpg",
    rating: 4.7,
    reviews: 245,
    sold: 178,
    tiers: [
      { label: "Economy", mileage: "80K-100K", price: 1999, warranty: "60 Days" },
      { label: "Standard", mileage: "50K-80K", price: 2599, warranty: "6 Months" },
      { label: "Premium", mileage: "Under 50K", price: 3299, warranty: "1 Year" },
    ],
  },
]

export default function EnginesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedTier, setSelectedTier] = useState<{ [key: string]: number }>({})
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter engines by category and search
  const filteredEngines = engines.filter((engine) => {
    const matchesCategory = activeCategory === "all" || engine.type === activeCategory
    const matchesSearch =
      engine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engine.models.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Sort engines
  const sortedEngines = [...filteredEngines].sort((a, b) => {
    if (sortBy === "popular") return b.sold - a.sold
    if (sortBy === "price-low") return a.tiers[0].price - b.tiers[0].price
    if (sortBy === "price-high") return b.tiers[2].price - a.tiers[2].price
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "hp") return Number.parseInt(b.hp) - Number.parseInt(a.hp)
    return 0
  })

  const getTierIndex = (engineId: string) => selectedTier[engineId] ?? 1 // Default to Standard

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/auw-logo.png" alt="AUW" width={50} height={50} className="rounded" />
              <div>
                <span className="text-xl font-bold">AUW AUTO PARTS</span>
                <p className="text-xs text-zinc-400">Quality Used Engines</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-zinc-400 hover:text-white transition">
                Home
              </Link>
              <Link href="/engines" className="text-red-500 font-semibold">
                Engines
              </Link>
              <Link href="/transmissions" className="text-zinc-400 hover:text-white transition">
                Transmissions
              </Link>
              <Link href="/parts" className="text-zinc-400 hover:text-white transition">
                Parts
              </Link>
              <Link href="/contact" className="text-zinc-400 hover:text-white transition">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative p-2 hover:bg-zinc-800 rounded-full">
                <ShoppingCartIcon />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-900/50 to-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Quality Used & Remanufactured Engines</h1>
          <p className="text-zinc-400 max-w-2xl">
            Browse our extensive inventory of tested engines with 3 mileage-based pricing tiers. Every engine comes with
            warranty and free shipping on orders over $500.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 sticky top-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FilterIcon />
                Filter by Type
              </h3>
              <div className="space-y-2">
                {engineCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                      activeCategory === cat.id
                        ? "bg-red-600 text-white"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-sm bg-zinc-700 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Price Tier</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-zinc-800 border-zinc-600" defaultChecked />
                    <span>Economy (60-Day Warranty)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-zinc-800 border-zinc-600" defaultChecked />
                    <span>Standard (6-Month Warranty)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-zinc-800 border-zinc-600" defaultChecked />
                    <span>Premium (1-Year Warranty)</span>
                  </label>
                </div>
              </div>

              {/* Brands */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Brands</h4>
                <div className="space-y-2 text-sm">
                  {["Toyota", "Ford", "Honda", "Chevrolet", "Dodge", "BMW", "Jeep"].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded bg-zinc-800 border-zinc-600" defaultChecked />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search & Sort Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search engines by name, brand, or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="hp">Horsepower</option>
                </select>
                <div className="flex border border-zinc-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 ${viewMode === "grid" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
                  >
                    <GridIcon />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 ${viewMode === "list" ? "bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"}`}
                  >
                    <ListIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-zinc-400 mb-4">
              Showing <span className="text-white font-semibold">{sortedEngines.length}</span> engines
            </p>

            {/* Engine Grid */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedEngines.map((engine) => {
                const tierIdx = getTierIndex(engine.id)
                const currentTier = engine.tiers[tierIdx]

                return (
                  <div
                    key={engine.id}
                    className={`bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-red-500/50 transition group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                      <Image
                        src={engine.image || "/placeholder.svg"}
                        alt={engine.name}
                        width={400}
                        height={300}
                        className={`object-cover ${viewMode === "list" ? "h-full" : "w-full h-48"}`}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {engine.brand}
                        </span>
                        <span className="bg-zinc-800/90 text-white text-xs px-2 py-1 rounded">{engine.years}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-zinc-800/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <EyeIcon />
                        {engine.sold} sold
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-red-400 transition">{engine.name}</h3>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-3 text-sm text-zinc-400 mb-3">
                        <span className="flex items-center gap-1">
                          <GaugeIcon />
                          {engine.hp}
                        </span>
                        <span className="flex items-center gap-1">
                          <SettingsIcon />
                          {engine.torque}
                        </span>
                        <span className="flex items-center gap-1">
                          <FuelIcon />
                          {engine.fuel}
                        </span>
                      </div>

                      {/* Fits */}
                      <p className="text-xs text-zinc-500 mb-3">Fits: {engine.models.join(", ")}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < Math.floor(engine.rating)} />
                          ))}
                        </div>
                        <span className="text-sm text-zinc-400">
                          {engine.rating} ({engine.reviews} reviews)
                        </span>
                      </div>

                      {/* 3 Tier Pricing */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {engine.tiers.map((tier, idx) => (
                          <button
                            key={tier.label}
                            onClick={() => setSelectedTier({ ...selectedTier, [engine.id]: idx })}
                            className={`text-center p-2 rounded-lg border transition ${
                              tierIdx === idx ? "border-red-500 bg-red-500/20" : "border-zinc-700 hover:border-zinc-500"
                            }`}
                          >
                            <div className="text-xs text-zinc-400">{tier.label}</div>
                            <div className="font-bold text-lg">${tier.price.toLocaleString()}</div>
                            <div className="text-xs text-zinc-500">{tier.mileage}</div>
                          </button>
                        ))}
                      </div>

                      {/* Warranty Badge */}
                      <div className="flex items-center gap-2 text-sm text-green-400 mb-4">
                        <CheckIcon />
                        <span>{currentTier.warranty} Warranty Included</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/engines/${engine.id}`}
                          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-center py-2 rounded-lg transition"
                        >
                          View Details
                        </Link>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
                          <ShoppingCartIcon />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-400">
          <p>&copy; 2025 AUW Auto Parts World. All rights reserved.</p>
          <p className="text-sm mt-2">Quality Used Engines with Warranty - Free Shipping Over $500</p>
        </div>
      </footer>
    </div>
  )
}
