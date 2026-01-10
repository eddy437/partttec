"use client"

import { SheetTrigger } from "@/components/ui/sheet"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Plus,
  Upload,
  Download,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertCircle,
  DollarSign,
  Grid3X3,
  List,
  Check,
  Edit,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const brands = [
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Chevrolet",
  "Nissan",
  "Hyundai",
  "Kia",
  "Audi",
  "Volkswagen",
  "Subaru",
  "Mazda",
  "Lexus",
  "Acura",
  "Infiniti",
  "Porsche",
  "Jeep",
  "Dodge",
  "Ram",
]
const categories = [
  "Engine",
  "Transmission",
  "Brakes",
  "Suspension",
  "Electrical",
  "Body Parts",
  "Interior",
  "Exhaust",
  "Cooling",
  "Fuel System",
  "Steering",
  "Drivetrain",
  "Lighting",
  "HVAC",
  "Wheels & Tires",
]
const conditions = ["New", "Used", "Remanufactured"]
const partNames = [
  "Engine Assembly",
  "Transmission",
  "Cylinder Head",
  "Crankshaft",
  "Camshaft",
  "Alternator",
  "Starter Motor",
  "Water Pump",
  "Fuel Pump",
  "Oil Pump",
  "Power Steering Pump",
  "AC Compressor",
  "Radiator",
  "Condenser",
  "Brake Caliper",
  "Brake Rotor",
  "Brake Pads",
  "Control Arm",
  "Ball Joint",
  "Tie Rod End",
  "Shock Absorber",
  "Strut Assembly",
  "Coil Spring",
  "Sway Bar Link",
  "CV Axle",
  "Drive Shaft",
  "Differential",
  "Transfer Case",
  "Turbocharger",
  "Supercharger",
  "Intercooler",
  "Throttle Body",
  "Intake Manifold",
  "Exhaust Manifold",
  "Catalytic Converter",
  "Muffler",
  "O2 Sensor",
  "MAF Sensor",
  "MAP Sensor",
  "Ignition Coil",
  "Spark Plugs",
  "Fuel Injector",
  "Fuel Rail",
  "EGR Valve",
  "PCV Valve",
  "Timing Belt Kit",
  "Timing Chain Kit",
  "Head Gasket Set",
  "Valve Cover Gasket",
  "Oil Pan Gasket",
  "Rear Main Seal",
  "Front Bumper",
  "Rear Bumper",
  "Hood",
  "Fender",
  "Door Assembly",
  "Tailgate",
  "Headlight Assembly",
  "Tail Light Assembly",
  "Mirror Assembly",
  "Grille",
  "Dashboard",
  "Steering Wheel",
  "Seat Assembly",
  "Console",
  "Door Panel",
  "Carpet",
  "Headliner",
]

const generateProducts = (count: number) => {
  const products = []
  for (let i = 1; i <= count; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const partName = partNames[Math.floor(Math.random() * partNames.length)]
    const year = 2015 + Math.floor(Math.random() * 10)
    const stock = Math.random() > 0.2 ? Math.floor(Math.random() * 100) + 1 : 0
    const basePrice = Math.floor(Math.random() * 2000) + 50
    const price =
      condition === "New"
        ? basePrice
        : condition === "Remanufactured"
          ? Math.floor(basePrice * 0.7)
          : Math.floor(basePrice * 0.5)

    products.push({
      id: String(i),
      name: `${year} ${brand} ${partName}`,
      sku: `AUW-${String(i).padStart(6, "0")}`,
      brand,
      category,
      condition,
      stock,
      price,
      status: stock > 0 ? "active" : "out_of_stock",
      createdAt: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      image: `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(`${brand} ${partName} auto part`)}`,
    })
  }
  return products
}

const initialProducts = generateProducts(1000)

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState<string>("name")
  const [activeTab, setActiveTab] = useState("all")

  const [itemsPerPage, setItemsPerPage] = useState(100)
  const itemsPerPageOptions = [50, 100, 250, 500, 1000]

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [stockFilter, setStockFilter] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [bulkDeleteType, setBulkDeleteType] = useState<"selected" | "old" | "out_of_stock" | null>(null)

  useEffect(() => {
    const loadInventory = () => {
      const mode = localStorage.getItem("inventory_mode")
      if (mode === "custom") {
        try {
          const data = JSON.parse(localStorage.getItem("inventory_data") || "[]")
          if (data.length > 0) {
            setProducts(data)
          }
        } catch (e) {
          console.error("Failed to load inventory", e)
        }
      }
    }
    loadInventory()
    window.addEventListener("inventory_updated", loadInventory)
    return () => window.removeEventListener("inventory_updated", loadInventory)
  }, [])

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Tab filters
        if (activeTab === "in_stock" && product.stock === 0) return false
        if (activeTab === "out_of_stock" && product.stock > 0) return false
        if (activeTab === "new" && product.condition !== "New") return false
        if (activeTab === "used" && product.condition !== "Used") return false
        if (activeTab === "remanufactured" && product.condition !== "Remanufactured") return false

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false

        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false

        // Price filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false

        // Stock filter
        if (stockFilter === "in_stock" && product.stock === 0) return false
        if (stockFilter === "out_of_stock" && product.stock > 0) return false
        if (stockFilter === "low_stock" && (product.stock === 0 || product.stock > 10)) return false

        // Search filter
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name)
        if (sortBy === "price") return b.price - a.price
        if (sortBy === "stock") return b.stock - a.stock
        if (sortBy === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        return 0
      })
  }, [products, activeTab, selectedBrands, selectedCategories, priceRange, stockFilter, searchTerm, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const activeFiltersCount =
    selectedBrands.length +
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0) +
    (stockFilter !== "all" ? 1 : 0)

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 5000])
    setStockFilter("all")
    setSearchTerm("")
    setActiveTab("all")
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(paginatedProducts.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id])
    } else {
      setSelectedProducts(selectedProducts.filter((pId) => pId !== id))
    }
  }

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id)
    setBulkDeleteType(null)
    setDeleteDialogOpen(true)
  }

  const handleBulkDeleteClick = (type: "selected" | "old" | "out_of_stock") => {
    setBulkDeleteType(type)
    setProductToDelete(null)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    let newProducts = [...products]
    if (productToDelete) {
      newProducts = products.filter((p) => p.id !== productToDelete)
      toast.success("Product deleted successfully")
    } else if (bulkDeleteType === "selected") {
      newProducts = products.filter((p) => !selectedProducts.includes(p.id))
      setSelectedProducts([])
      toast.success(`${selectedProducts.length} products deleted successfully`)
    } else if (bulkDeleteType === "out_of_stock") {
      const outOfStockCount = products.filter((p) => p.stock === 0).length
      newProducts = products.filter((p) => p.stock > 0)
      toast.success(`${outOfStockCount} out of stock products deleted`)
    } else if (bulkDeleteType === "old") {
      const oldProductsCount = products.filter((p) => p.createdAt < "2024-01-01").length
      newProducts = products.filter((p) => p.createdAt >= "2024-01-01")
      toast.success(`${oldProductsCount} old inventory items deleted`)
    }

    setProducts(newProducts)

    if (localStorage.getItem("inventory_mode") === "custom") {
      localStorage.setItem("inventory_data", JSON.stringify(newProducts))
    }

    setDeleteDialogOpen(false)
    setProductToDelete(null)
    setBulkDeleteType(null)
  }

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > 0).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
    newCount: products.filter((p) => p.condition === "New").length,
    usedCount: products.filter((p) => p.condition === "Used").length,
    remanCount: products.filter((p) => p.condition === "Remanufactured").length,
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 7
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push(-1) // ellipsis
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push(-1)
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push(-1)
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push(-2)
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Product Management</h1>
            <p className="text-neutral-400">
              Manage your auto parts inventory - {products.length.toLocaleString()} products
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/upload-by-brand">
              <Button variant="outline" className="border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800">
                <Upload className="mr-2 h-4 w-4" /> Upload by Brand
              </Button>
            </Link>
            <Link href="/admin/bulk-upload">
              <Button variant="outline" className="border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800">
                <Upload className="mr-2 h-4 w-4" /> Bulk Upload
              </Button>
            </Link>
            <Link href="/admin/products/new">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-white">{stats.total.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm">In Stock</p>
                  <p className="text-2xl font-bold text-green-400">{stats.inStock.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-400">{stats.outOfStock.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm">Inventory Value</p>
                  <p className="text-2xl font-bold text-amber-400">${Math.floor(stats.totalValue).toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-1 flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab("all")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              All Products ({stats.total.toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("in_stock")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "in_stock"
                  ? "bg-green-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              In Stock ({stats.inStock.toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("out_of_stock")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "out_of_stock"
                  ? "bg-red-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              Out of Stock ({stats.outOfStock.toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("new")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "new"
                  ? "bg-emerald-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              New ({stats.newCount.toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("used")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "used"
                  ? "bg-amber-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              Used ({stats.usedCount.toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("remanufactured")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "remanufactured"
                  ? "bg-blue-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              Remanufactured ({stats.remanCount.toLocaleString()})
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search products by name, brand, SKU, or category..."
                className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 relative"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                    {activeFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-neutral-900 border-neutral-800 w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filter Products</SheetTitle>
                    <SheetDescription className="text-neutral-400">
                      Apply filters to narrow down your product list
                    </SheetDescription>
                  </SheetHeader>

                  <div className="py-6 space-y-6">
                    {/* Brand Filter */}
                    <div>
                      <Label className="text-white mb-3 block">Brands ({selectedBrands.length} selected)</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-neutral-800 rounded-lg">
                        {brands.map((brand) => (
                          <label
                            key={brand}
                            className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer hover:text-white"
                          >
                            <Checkbox
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedBrands([...selectedBrands, brand])
                                } else {
                                  setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                                }
                              }}
                            />
                            {brand}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <Label className="text-white mb-3 block">Categories ({selectedCategories.length} selected)</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-neutral-800 rounded-lg">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer hover:text-white"
                          >
                            <Checkbox
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, category])
                                } else {
                                  setSelectedCategories(selectedCategories.filter((c) => c !== category))
                                }
                              }}
                            />
                            {category}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <Label className="text-white mb-3 block">
                        Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                      </Label>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          min={0}
                          max={5000}
                          step={50}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-neutral-500 mt-2">
                        <span>$0</span>
                        <span>$5,000+</span>
                      </div>
                    </div>

                    {/* Stock Filter */}
                    <div>
                      <Label className="text-white mb-3 block">Stock Status</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: "all", label: "All" },
                          { value: "in_stock", label: "In Stock" },
                          { value: "low_stock", label: "Low Stock (≤10)" },
                          { value: "out_of_stock", label: "Out of Stock" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setStockFilter(option.value as typeof stockFilter)}
                            className={
                              stockFilter === option.value
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700"
                            }
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <SheetFooter className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearAllFilters}
                      className="flex-1 bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
                    >
                      Clear All
                    </Button>
                    <SheetClose asChild>
                      <Button type="button" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                        Apply Filters
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
                  >
                    Brand <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-neutral-800 max-h-64 overflow-y-auto">
                  <DropdownMenuLabel className="text-neutral-400">Select Brands</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  {brands.map((brand) => (
                    <DropdownMenuCheckboxItem
                      key={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand])
                        } else {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                        }
                      }}
                      className="text-white"
                    >
                      {brand}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
                  >
                    Category <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-neutral-800 max-h-64 overflow-y-auto">
                  <DropdownMenuLabel className="text-neutral-400">Select Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category))
                        }
                      }}
                      className="text-white"
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Buttons */}
              <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-1">
                {["name", "price", "stock", "date"].map((sort) => (
                  <Button
                    key={sort}
                    size="sm"
                    type="button"
                    variant={sortBy === sort ? "default" : "ghost"}
                    onClick={() => setSortBy(sort)}
                    className={
                      sortBy === sort ? "bg-red-600 hover:bg-red-700 text-white" : "text-neutral-400 hover:text-white"
                    }
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </Button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden">
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none ${viewMode === "list" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
                  >
                    {itemsPerPage}/page <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
                  <DropdownMenuLabel className="text-neutral-400">Items per page</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  {itemsPerPageOptions.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => {
                        setItemsPerPage(option)
                        setCurrentPage(1)
                      }}
                      className={`text-white cursor-pointer ${itemsPerPage === option ? "bg-red-600" : ""}`}
                    >
                      {option.toLocaleString()} products
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedProducts.length > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkDeleteClick("selected")}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({selectedProducts.length})
                </Button>
              )}

              <Button variant="outline" className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-neutral-400 text-sm">Active filters:</span>
              {selectedBrands.map((brand) => (
                <Badge
                  key={brand}
                  variant="outline"
                  className="bg-blue-500/20 text-blue-400 border-blue-500/50 cursor-pointer hover:bg-blue-500/30"
                  onClick={() => setSelectedBrands(selectedBrands.filter((b) => b !== brand))}
                >
                  {brand} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="bg-purple-500/20 text-purple-400 border-purple-500/50 cursor-pointer hover:bg-purple-500/30"
                  onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                >
                  {category} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                <Badge
                  variant="outline"
                  className="bg-green-500/20 text-green-400 border-green-500/50 cursor-pointer hover:bg-green-500/30"
                  onClick={() => setPriceRange([0, 5000])}
                >
                  ${priceRange[0]} - ${priceRange[1]} <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              {stockFilter !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-amber-500/20 text-amber-400 border-amber-500/50 cursor-pointer hover:bg-amber-500/30"
                  onClick={() => setStockFilter("all")}
                >
                  {stockFilter.replace("_", " ")} <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
            <span>
              Showing {paginatedProducts.length.toLocaleString()} of {filteredProducts.length.toLocaleString()} products
              (Page {currentPage} of {totalPages.toLocaleString()})
            </span>
            {selectedProducts.length > 0 && (
              <button type="button" onClick={() => setSelectedProducts([])} className="text-red-400 hover:text-red-300">
                Clear selection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              className={`bg-neutral-900 border-neutral-800 overflow-hidden group hover:border-neutral-700 transition-all ${
                selectedProducts.includes(product.id) ? "ring-2 ring-red-500" : ""
              }`}
            >
              <Link href={`/admin/products/${product.id}`}>
                <div className="relative aspect-[4/3] bg-neutral-800">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-neutral-900/80 text-white text-xs">{product.brand}</Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={`text-xs ${
                        product.condition === "New"
                          ? "bg-green-500/90 text-white"
                          : product.condition === "Remanufactured"
                            ? "bg-blue-500/90 text-white"
                            : "bg-amber-500/90 text-black"
                      }`}
                    >
                      {product.condition}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        product.stock > 0
                          ? "border-green-500/50 bg-green-500/20 text-green-400"
                          : "border-red-500/50 bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-white font-medium text-sm line-clamp-2 mb-1">{product.name}</p>
                  <p className="text-xs text-neutral-500 mb-2">SKU: {product.sku}</p>
                  <p className="text-lg font-bold text-green-400">${product.price.toLocaleString()}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-800">
              <tr>
                <th className="p-3 text-left">
                  <Checkbox
                    checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">Product</th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">SKU</th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">Brand</th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">Condition</th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">Stock</th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">Price</th>
                <th className="p-3 text-left text-neutral-400 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-t border-neutral-800 hover:bg-neutral-800/50">
                  <td className="p-3">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span className="text-white text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-neutral-400 text-sm">{product.sku}</td>
                  <td className="p-3 text-neutral-400 text-sm">{product.brand}</td>
                  <td className="p-3">
                    <Badge
                      className={`text-xs ${
                        product.condition === "New"
                          ? "bg-green-500/20 text-green-400"
                          : product.condition === "Remanufactured"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {product.condition}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>{product.stock}</span>
                  </td>
                  <td className="p-3 text-green-400 font-medium">${product.price.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/product/${product.id}`} target="_blank">
                        <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteClick(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page, idx) =>
          page < 0 ? (
            <span key={`ellipsis-${idx}`} className="text-neutral-500 px-2">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800"
              }
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-neutral-900 border-neutral-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              {productToDelete
                ? "Are you sure you want to delete this product? This action cannot be undone."
                : bulkDeleteType === "selected"
                  ? `Are you sure you want to delete ${selectedProducts.length} selected products?`
                  : bulkDeleteType === "out_of_stock"
                    ? "Are you sure you want to delete all out of stock products?"
                    : "Are you sure you want to delete all old inventory items?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
