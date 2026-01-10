"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  Phone,
  Mail,
  Truck,
  Package,
  DollarSign,
  Warehouse,
  MoreVertical,
  Filter,
  Download,
  Building2,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const vendors = [
  {
    id: 1,
    name: "AutoParts Supplier Co.",
    contact: "James Wilson",
    email: "james@autopartssupplier.com",
    phone: "(555) 123-4567",
    type: "Engines",
    rating: 4.8,
    orders: 156,
    totalSpent: 245000,
    status: "active",
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    name: "JY Motors Salvage",
    contact: "Maria Garcia",
    email: "maria@jymotors.com",
    phone: "(555) 234-5678",
    type: "Full Vehicle",
    rating: 4.6,
    orders: 89,
    totalSpent: 178000,
    status: "active",
    location: "Houston, TX",
  },
  {
    id: 3,
    name: "Premium Trans Inc.",
    contact: "Robert Chen",
    email: "rchen@premiumtrans.com",
    phone: "(555) 345-6789",
    type: "Transmissions",
    rating: 4.9,
    orders: 112,
    totalSpent: 198500,
    status: "active",
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "East Coast Auto Parts",
    contact: "Sarah Miller",
    email: "sarah@ecautoparts.com",
    phone: "(555) 456-7890",
    type: "Mixed",
    rating: 4.5,
    orders: 67,
    totalSpent: 134000,
    status: "pending",
    location: "Miami, FL",
  },
]

const purchaseOrders = [
  {
    id: "PO-2024-892",
    vendor: "AutoParts Supplier Co.",
    items: 15,
    total: 12500,
    status: "pending",
    created: "Nov 30, 2025",
    expected: "Dec 7, 2025",
  },
  {
    id: "PO-2024-891",
    vendor: "JY Motors Salvage",
    items: 8,
    total: 8900,
    status: "shipped",
    created: "Nov 28, 2025",
    expected: "Dec 3, 2025",
  },
  {
    id: "PO-2024-890",
    vendor: "Premium Trans Inc.",
    items: 12,
    total: 15600,
    status: "delivered",
    created: "Nov 25, 2025",
    expected: "Dec 1, 2025",
  },
  {
    id: "PO-2024-889",
    vendor: "East Coast Auto Parts",
    items: 20,
    total: 9800,
    status: "pending",
    created: "Nov 29, 2025",
    expected: "Dec 6, 2025",
  },
]

const inventoryNeeds = [
  { part: "Toyota Camry 2.5L Engine (2018-2022)", current: 2, needed: 10, priority: "high" },
  { part: "Honda Accord Transmission AT (2016-2020)", current: 3, needed: 8, priority: "high" },
  { part: "Ford F-150 Transfer Case (2015-2020)", current: 5, needed: 12, priority: "medium" },
  { part: "BMW X5 Headlight Assembly (2014-2018)", current: 8, needed: 15, priority: "low" },
  { part: "Chevy Silverado Tailgate (2019-2023)", current: 1, needed: 6, priority: "high" },
]

export default function BuyingCRM() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("vendors")

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Truck className="h-6 w-6 text-purple-400" />
            </div>
            Buying CRM
          </h1>
          <p className="text-white/60 mt-1">Manage vendors, purchase orders, and inventory sourcing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" /> New PO
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-xs text-white/60">Active Vendors</div>
              </div>
              <Building2 className="h-8 w-8 text-purple-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-white/60">Pending POs</div>
              </div>
              <FileText className="h-8 w-8 text-blue-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">8,500</div>
                <div className="text-xs text-white/60">Parts in Stock</div>
              </div>
              <Package className="h-8 w-8 text-emerald-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">$15.2K</div>
                <div className="text-xs text-white/60">Savings This Month</div>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="vendors" className="data-[state=active]:bg-purple-600">
              <Building2 className="h-4 w-4 mr-2" /> Vendors
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">
              <FileText className="h-4 w-4 mr-2" /> Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-purple-600">
              <Warehouse className="h-4 w-4 mr-2" /> Inventory Needs
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-white/5 border-white/10 text-white w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Vendor</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Type</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Rating</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Orders</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Total Spent</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Status</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold text-white">
                              {vendor.name
                                .split(" ")
                                .slice(0, 2)
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="font-medium text-white">{vendor.name}</div>
                              <div className="text-xs text-white/50">{vendor.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-white/20 text-white/70">
                            {vendor.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-white">{vendor.rating}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white">{vendor.orders}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-purple-400">
                            ${vendor.totalSpent.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              vendor.status === "active"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}
                          >
                            {vendor.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10">
                                <DropdownMenuItem className="text-white hover:bg-white/10">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-white/10">Create PO</DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-white/10">
                                  View History
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">PO Number</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Vendor</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Items</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Total</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Status</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Expected</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((po) => (
                      <tr key={po.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-mono text-sm text-purple-400">{po.id}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white">{po.vendor}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white">{po.items} items</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-purple-400">${po.total.toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              po.status === "delivered"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : po.status === "shipped"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}
                          >
                            {po.status === "delivered" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {po.status === "shipped" && <Truck className="h-3 w-3 mr-1" />}
                            {po.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                            {po.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white/70">{po.expected}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              View
                            </Button>
                            {po.status === "pending" && (
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                Send
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Needs Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Low Stock / High Demand Parts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inventoryNeeds.map((item, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-white">{item.part}</div>
                      <div className="text-sm text-white/50">
                        Current: {item.current} | Needed: {item.needed}
                      </div>
                    </div>
                    <Badge
                      className={`${
                        item.priority === "high"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : item.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {item.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={(item.current / item.needed) * 100} className="h-2 bg-white/10" />
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Source Part
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
