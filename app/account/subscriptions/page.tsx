"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, Crown, Calendar, CheckCircle2, AlertCircle, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Subscription {
  id: string
  plan: "Basic" | "Pro" | "Enterprise"
  status: "active" | "expired" | "cancelled"
  startDate: Date
  endDate: Date
  price: number
  features: string[]
}

export default function SubscriptionsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user) {
      // Load subscriptions from localStorage
      const saved = localStorage.getItem("customerSubscriptions")
      if (saved) {
        const parsed = JSON.parse(saved)
        setSubscriptions(
          parsed.map((sub: any) => ({
            ...sub,
            startDate: new Date(sub.startDate),
            endDate: new Date(sub.endDate),
          })),
        )
      }
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "cancelled":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-white/5 text-white/60 border-white/10"
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "Basic":
        return <CheckCircle2 className="w-5 h-5 text-blue-400" />
      case "Pro":
        return <Zap className="w-5 h-5 text-purple-400" />
      case "Enterprise":
        return <Crown className="w-5 h-5 text-yellow-400" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-white/40" />
    }
  }

  const basicSubs = subscriptions.filter((s) => s.plan === "Basic")
  const proSubs = subscriptions.filter((s) => s.plan === "Pro")
  const enterpriseSubs = subscriptions.filter((s) => s.plan === "Enterprise")

  const daysRemaining = (endDate: Date) => {
    const diff = endDate.getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const renderSubscriptionCard = (subscription: Subscription) => (
    <div
      key={subscription.id}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getPlanIcon(subscription.plan)}
          <div>
            <h3 className="text-xl font-semibold text-white">{subscription.plan} Plan</h3>
            <p className="text-white/60 text-sm">Subscription ID: {subscription.id}</p>
          </div>
        </div>
        <Badge className={getStatusColor(subscription.status)}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/60 text-sm mb-1">Start Date</p>
          <p className="text-white font-medium">
            {subscription.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/60 text-sm mb-1">End Date</p>
          <p className="text-white font-medium">
            {subscription.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      {subscription.status === "active" && (
        <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-green-400" />
            <p className="text-green-400 font-medium">{daysRemaining(subscription.endDate)} days remaining</p>
          </div>
          <p className="text-white/60 text-sm">Your subscription is active and running</p>
        </div>
      )}

      {subscription.status === "expired" && (
        <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-red-400 font-medium">Subscription Expired</p>
          </div>
          <p className="text-white/60 text-sm">Renew to continue enjoying premium features</p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-white/60 text-sm mb-2">Plan Features:</p>
        <ul className="space-y-1">
          {subscription.features.map((feature, idx) => (
            <li key={idx} className="text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <p className="text-white/60">Monthly Price</p>
        <p className="text-2xl font-bold text-white">${subscription.price.toFixed(2)}</p>
      </div>

      <div className="flex gap-3 mt-4">
        {subscription.status === "active" && (
          <>
            <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 bg-transparent">
              Manage Plan
            </Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700">Cancel Subscription</Button>
          </>
        )}
        {subscription.status === "expired" && (
          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Renew Now
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <Link href="/account">
          <Button variant="ghost" className="mb-6 text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account
          </Button>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Subscription Management</h1>
          <p className="text-white/60">View and manage your subscription plans</p>
        </div>

        {subscriptions.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <Crown className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No active subscriptions</h3>
            <p className="text-white/60 mb-6">Choose a plan to unlock premium features</p>
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                View Plans
              </Button>
            </Link>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/10">
                All Plans
              </TabsTrigger>
              <TabsTrigger value="basic" className="data-[state=active]:bg-white/10">
                Basic ({basicSubs.length})
              </TabsTrigger>
              <TabsTrigger value="pro" className="data-[state=active]:bg-white/10">
                Pro ({proSubs.length})
              </TabsTrigger>
              <TabsTrigger value="enterprise" className="data-[state=active]:bg-white/10">
                Enterprise ({enterpriseSubs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {subscriptions.map((sub) => renderSubscriptionCard(sub))}
            </TabsContent>

            <TabsContent value="basic" className="space-y-4">
              {basicSubs.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <p className="text-white/60">No Basic subscriptions found</p>
                </div>
              ) : (
                basicSubs.map((sub) => renderSubscriptionCard(sub))
              )}
            </TabsContent>

            <TabsContent value="pro" className="space-y-4">
              {proSubs.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <p className="text-white/60">No Pro subscriptions found</p>
                </div>
              ) : (
                proSubs.map((sub) => renderSubscriptionCard(sub))
              )}
            </TabsContent>

            <TabsContent value="enterprise" className="space-y-4">
              {enterpriseSubs.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <p className="text-white/60">No Enterprise subscriptions found</p>
                </div>
              ) : (
                enterpriseSubs.map((sub) => renderSubscriptionCard(sub))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
