"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Globe,
  Eye,
  MousePointer,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function AnalyticsPage() {
  const [liveVisitors] = useState([
    { id: 1, location: "New York, USA", page: "/shop", device: "Desktop", time: "Just now" },
    { id: 2, location: "London, UK", page: "/product/1234", device: "Mobile", time: "2 min ago" },
    { id: 3, location: "Tokyo, Japan", page: "/brands", device: "Tablet", time: "3 min ago" },
    { id: 4, location: "Sydney, Australia", page: "/search", device: "Desktop", time: "5 min ago" },
    { id: 5, location: "Toronto, Canada", page: "/shop", device: "Mobile", time: "7 min ago" },
  ])

  const [geoData] = useState([
    { country: "United States", visitors: 12450, percentage: 42 },
    { country: "United Kingdom", visitors: 5230, percentage: 18 },
    { country: "Canada", visitors: 3890, percentage: 13 },
    { country: "Australia", visitors: 2760, percentage: 9 },
    { country: "Germany", visitors: 2100, percentage: 7 },
    { country: "Others", visitors: 3170, percentage: 11 },
  ])

  const [topPages] = useState([
    { path: "/shop", views: 45678, uniqueVisitors: 32450, avgTime: "3:24" },
    { path: "/product/1234", views: 23456, uniqueVisitors: 18920, avgTime: "2:15" },
    { path: "/", views: 18934, uniqueVisitors: 15670, avgTime: "1:45" },
    { path: "/brands", views: 12345, uniqueVisitors: 9870, avgTime: "2:30" },
    { path: "/search", views: 10234, uniqueVisitors: 8450, avgTime: "4:12" },
  ])

  const [trafficSources] = useState([
    { source: "Google Search", visitors: 15600, percentage: 52 },
    { source: "Direct", visitors: 7200, percentage: 24 },
    { source: "Facebook", visitors: 3900, percentage: 13 },
    { source: "Instagram", visitors: 2100, percentage: 7 },
    { source: "Other", visitors: 1200, percentage: 4 },
  ])

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-white/60">Performance metrics and insights.</p>
      </div>

      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2 w-fit">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-500 font-medium">124 visitors online now</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-blue-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-orange-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/60">Conversion Rate</CardTitle>
            <BarChart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-neutral-900 border border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="live">Live Tracking</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="pages">Page Views</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-neutral-900 border-white/10 text-white h-96">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full pb-12">
                <div className="text-white/40">Chart visualization would go here</div>
              </CardContent>
            </Card>
            <Card className="bg-neutral-900 border-white/10 text-white h-96">
              <CardHeader>
                <CardTitle>Top Selling Categories</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full pb-12">
                <div className="text-white/40">Pie chart visualization would go here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                Live Visitor Activity
              </CardTitle>
              <p className="text-sm text-white/60">Real-time tracking of customer browsing</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveVisitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{visitor.location}</p>
                        <p className="text-sm text-white/60">{visitor.page}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="border-white/20">
                        {visitor.device === "Desktop" && <Monitor className="h-3 w-3 mr-1" />}
                        {visitor.device === "Mobile" && <Smartphone className="h-3 w-3 mr-1" />}
                        {visitor.device}
                      </Badge>
                      <span className="text-sm text-white/60">{visitor.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Customer Geographic Distribution
              </CardTitle>
              <p className="text-sm text-white/60">Where your customers are located</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geoData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/60">{item.visitors.toLocaleString()} visitors</span>
                        <span className="font-semibold text-blue-500">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                Most Viewed Pages
              </CardTitle>
              <p className="text-sm text-white/60">Track which pages customers visit most</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-800/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-purple-400 font-mono text-sm">{page.path}</code>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">#{index + 1}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Page Views</p>
                          <p className="font-semibold">{page.views.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Unique Visitors</p>
                          <p className="font-semibold">{page.uniqueVisitors.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Avg. Time</p>
                          <p className="font-semibold">{page.avgTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-orange-500" />
                Traffic Sources
              </CardTitle>
              <p className="text-sm text-white/60">How customers find your website</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/60">{source.visitors.toLocaleString()} visitors</span>
                        <span className="font-semibold text-orange-500">{source.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
