"use client"

import { useState, useEffect } from "react"
import { CreditCard, Wallet, Building2, Save, Plus, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

interface PaymentGateway {
  id: string
  name: string
  type: "credit_card" | "wallet" | "manual" | "bnpl"
  provider: string
  enabled: boolean
  testMode: boolean
  icon: any
  config: Record<string, string>
}

export default function PaymentSettingsPage() {
  const [activeTab, setActiveTab] = useState("gateways")
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: "stripe",
      name: "Stripe Payments",
      type: "credit_card",
      provider: "stripe",
      enabled: true,
      testMode: true,
      icon: CreditCard,
      config: {
        publishableKey: "pk_test_...",
        secretKey: "sk_test_...",
        webhookSecret: "whsec_...",
      },
    },
    {
      id: "paypal",
      name: "PayPal Checkout",
      type: "wallet",
      provider: "paypal",
      enabled: false,
      testMode: true,
      icon: Wallet,
      config: {
        clientId: "",
        clientSecret: "",
      },
    },
    {
      id: "bank_transfer",
      name: "Direct Bank Transfer",
      type: "manual",
      provider: "manual",
      enabled: true,
      testMode: false,
      icon: Building2,
      config: {
        bankName: "Chase Business",
        accountNumber: "123456789",
        routingNumber: "987654321",
        instructions: "Please include your Order ID in the wire transfer description.",
      },
    },
  ])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("admin_payment_gateways")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Re-attach icons which are lost in JSON
        const withIcons = parsed.map((g: any) => ({
          ...g,
          icon: g.provider === "stripe" ? CreditCard : g.provider === "paypal" ? Wallet : Building2,
        }))
        setGateways(withIcons)
      } catch (e) {
        console.error("Failed to load payment settings", e)
      }
    }
  }, [])

  const saveGateways = (updated: PaymentGateway[]) => {
    setGateways(updated)
    // Save to local storage (excluding icon components)
    const toSave = updated.map(({ icon, ...rest }) => rest)
    localStorage.setItem("admin_payment_gateways", JSON.stringify(toSave))
    toast({
      title: "Settings Saved",
      description: "Payment gateway configurations have been updated.",
    })
  }

  const toggleGateway = (id: string) => {
    const updated = gateways.map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g))
    saveGateways(updated)
  }

  const toggleTestMode = (id: string) => {
    const updated = gateways.map((g) => (g.id === id ? { ...g, testMode: !g.testMode } : g))
    saveGateways(updated)
  }

  const updateConfig = (id: string, key: string, value: string) => {
    const updated = gateways.map((g) => (g.id === id ? { ...g, config: { ...g.config, [key]: value } } : g))
    setGateways(updated) // Don't save to LS immediately on typing
  }

  const toggleSecretVisibility = (id: string, key: string) => {
    const comboKey = `${id}-${key}`
    setShowSecrets((prev) => ({ ...prev, [comboKey]: !prev[comboKey] }))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Payment Methods</h2>
          <p className="text-muted-foreground">Manage payment gateways, wallets, and payout settings.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => saveGateways(gateways)} className="bg-red-600 hover:bg-red-700">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="wallets">Digital Wallets</TabsTrigger>
          <TabsTrigger value="manual">Manual Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="gateways" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gateways
              .filter((g) => g.type === "credit_card")
              .map((gateway) => (
                <PaymentCard
                  key={gateway.id}
                  gateway={gateway}
                  onToggle={() => toggleGateway(gateway.id)}
                  onTestToggle={() => toggleTestMode(gateway.id)}
                  onConfigChange={updateConfig}
                  showSecrets={showSecrets}
                  onToggleSecret={toggleSecretVisibility}
                />
              ))}
            <Card className="bg-neutral-900 border-white/10 border-dashed flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:bg-white/5 transition-colors">
              <Plus className="h-12 w-12 text-neutral-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Add Gateway</h3>
              <p className="text-sm text-neutral-500 text-center px-4 mt-2">
                Connect a new payment provider like Authorize.net or Square
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gateways
              .filter((g) => g.type === "wallet")
              .map((gateway) => (
                <PaymentCard
                  key={gateway.id}
                  gateway={gateway}
                  onToggle={() => toggleGateway(gateway.id)}
                  onTestToggle={() => toggleTestMode(gateway.id)}
                  onConfigChange={updateConfig}
                  showSecrets={showSecrets}
                  onToggleSecret={toggleSecretVisibility}
                />
              ))}
            <Card className="bg-neutral-900 border-white/10 border-dashed flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:bg-white/5 transition-colors">
              <Plus className="h-12 w-12 text-neutral-500 mb-4" />
              <h3 className="text-lg font-medium text-white">Add Wallet</h3>
              <p className="text-sm text-neutral-500 text-center px-4 mt-2">
                Enable Apple Pay, Google Pay, or other digital wallets
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gateways
              .filter((g) => g.type === "manual")
              .map((gateway) => (
                <PaymentCard
                  key={gateway.id}
                  gateway={gateway}
                  onToggle={() => toggleGateway(gateway.id)}
                  onTestToggle={() => toggleTestMode(gateway.id)}
                  onConfigChange={updateConfig}
                  showSecrets={showSecrets}
                  onToggleSecret={toggleSecretVisibility}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PaymentCard({
  gateway,
  onToggle,
  onTestToggle,
  onConfigChange,
  showSecrets,
  onToggleSecret,
}: {
  gateway: PaymentGateway
  onToggle: () => void
  onTestToggle: () => void
  onConfigChange: (id: string, key: string, value: string) => void
  showSecrets: Record<string, boolean>
  onToggleSecret: (id: string, key: string) => void
}) {
  return (
    <Card className="bg-neutral-900 border-white/10 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <gateway.icon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-white">{gateway.name}</CardTitle>
            <CardDescription className="text-xs text-neutral-400 capitalize">
              {gateway.provider} Provider
            </CardDescription>
          </div>
        </div>
        <Switch checked={gateway.enabled} onCheckedChange={onToggle} className="data-[state=checked]:bg-green-600" />
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${gateway.enabled ? "bg-green-500" : "bg-neutral-500"}`} />
            <span className="text-sm font-medium text-white">{gateway.enabled ? "Active" : "Inactive"}</span>
          </div>
          {gateway.type !== "manual" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Test Mode</span>
              <Switch
                checked={gateway.testMode}
                onCheckedChange={onTestToggle}
                className="h-5 w-9 data-[state=checked]:bg-orange-500"
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          {Object.entries(gateway.config).map(([key, value]) => {
            const isSecret =
              key.toLowerCase().includes("secret") ||
              key.toLowerCase().includes("key") ||
              key.toLowerCase().includes("password")
            const isVisible = showSecrets[`${gateway.id}-${key}`]

            return (
              <div key={key} className="space-y-1">
                <Label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <div className="relative">
                  {gateway.type === "manual" && key === "instructions" ? (
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      value={value}
                      onChange={(e) => onConfigChange(gateway.id, key, e.target.value)}
                    />
                  ) : (
                    <div className="relative">
                      <Input
                        value={value}
                        onChange={(e) => onConfigChange(gateway.id, key, e.target.value)}
                        type={isSecret && !isVisible ? "password" : "text"}
                        className="bg-black/40 border-white/10 pr-10 h-9 font-mono text-sm"
                      />
                      {isSecret && (
                        <button
                          onClick={() => onToggleSecret(gateway.id, key)}
                          className="absolute right-3 top-2.5 text-neutral-500 hover:text-white transition-colors"
                        >
                          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
