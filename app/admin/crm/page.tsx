"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Users, TrendingUp, DollarSign, Headphones, Truck, Clock, ArrowRight, Target, BarChart3 } from "lucide-react"

const teamStats = {
  sales: {
    leads: 156,
    quotes: 89,
    conversions: 34,
    revenue: 124500,
    target: 150000,
  },
  support: {
    openTickets: 23,
    resolved: 145,
    avgResponse: "2.4h",
    satisfaction: 94,
  },
  buying: {
    vendors: 45,
    pendingOrders: 12,
    inventory: 8500,
    savings: 15200,
  },
}

const recentActivities = [
  { team: "Sales", action: "New lead from Toyota Camry inquiry", time: "5 min ago", type: "lead" },
  { team: "Support", action: "Ticket #4521 resolved - Shipping delay", time: "12 min ago", type: "resolved" },
  { team: "Buying", action: "PO #892 sent to AutoParts Supplier", time: "25 min ago", type: "order" },
  { team: "Sales", action: "Quote sent to John D. - $2,450", time: "1 hour ago", type: "quote" },
  { team: "Support", action: "New ticket - Return request #4525", time: "1 hour ago", type: "ticket" },
  { team: "Buying", action: "Inventory received from JY Motors", time: "2 hours ago", type: "inventory" },
]

export default function CRMDashboard() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">CRM Dashboard</h1>
          <p className="text-white/60 mt-1">Manage sales, support, and buying teams</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          {(["today", "week", "month"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                period === p ? "bg-red-600 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales Team */}
        <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 border-emerald-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Sales Team
              </CardTitle>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{teamStats.sales.leads}</div>
                <div className="text-xs text-white/60">New Leads</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{teamStats.sales.quotes}</div>
                <div className="text-xs text-white/60">Quotes Sent</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">Revenue Target</span>
                <span className="text-emerald-400 font-medium">
                  ${teamStats.sales.revenue.toLocaleString()} / ${teamStats.sales.target.toLocaleString()}
                </span>
              </div>
              <Progress value={(teamStats.sales.revenue / teamStats.sales.target) * 100} className="h-2 bg-white/10" />
            </div>
            <Link href="/admin/crm/sales">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Open Sales CRM <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Support Team */}
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Headphones className="h-5 w-5 text-blue-400" />
                Support Team
              </CardTitle>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">24/7</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{teamStats.support.openTickets}</div>
                <div className="text-xs text-white/60">Open Tickets</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{teamStats.support.avgResponse}</div>
                <div className="text-xs text-white/60">Avg Response</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">Customer Satisfaction</span>
                <span className="text-blue-400 font-medium">{teamStats.support.satisfaction}%</span>
              </div>
              <Progress value={teamStats.support.satisfaction} className="h-2 bg-white/10" />
            </div>
            <Link href="/admin/crm/support">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Open Support CRM <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Buying Team */}
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-purple-500/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-400" />
                Buying Team
              </CardTitle>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Sourcing</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{teamStats.buying.vendors}</div>
                <div className="text-xs text-white/60">Active Vendors</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-white">{teamStats.buying.pendingOrders}</div>
                <div className="text-xs text-white/60">Pending POs</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">Total Savings</span>
                <span className="text-purple-400 font-medium">${teamStats.buying.savings.toLocaleString()}</span>
              </div>
              <Progress value={75} className="h-2 bg-white/10" />
            </div>
            <Link href="/admin/crm/buying">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Open Buying CRM <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Target className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">89%</div>
              <div className="text-xs text-white/60">Target Achievement</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$45.2K</div>
              <div className="text-xs text-white/60">Today's Revenue</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">234</div>
              <div className="text-xs text-white/60">Active Customers</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1.8h</div>
              <div className="text-xs text-white/60">Avg. Lead Response</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-red-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.team === "Sales"
                      ? "bg-emerald-500/20"
                      : activity.team === "Support"
                        ? "bg-blue-500/20"
                        : "bg-purple-500/20"
                  }`}
                >
                  {activity.team === "Sales" ? (
                    <TrendingUp className={`h-4 w-4 text-emerald-400`} />
                  ) : activity.team === "Support" ? (
                    <Headphones className={`h-4 w-4 text-blue-400`} />
                  ) : (
                    <Truck className={`h-4 w-4 text-purple-400`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">{activity.action}</div>
                  <div className="text-xs text-white/50">{activity.time}</div>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    activity.type === "lead" || activity.type === "quote"
                      ? "border-emerald-500/30 text-emerald-400"
                      : activity.type === "resolved" || activity.type === "ticket"
                        ? "border-blue-500/30 text-blue-400"
                        : "border-purple-500/30 text-purple-400"
                  }`}
                >
                  {activity.team}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
