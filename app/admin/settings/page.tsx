"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/lib/toast"

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("AUTOPARTS")
  const [supportEmail, setSupportEmail] = useState("supports@allusedautoparts.world")
  const [storeDescription, setStoreDescription] = useState("Your one-stop shop for quality used auto parts.")
  const [adminEmail, setAdminEmail] = useState("admin@allusedautoparts.world")
  const [newOrderAlerts, setNewOrderAlerts] = useState(true)
  const [lowStockWarnings, setLowStockWarnings] = useState(true)

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  const handleDiscard = () => {
    setStoreName("AUTOPARTS")
    setSupportEmail("supports@allusedautoparts.world")
    setStoreDescription("Your one-stop shop for quality used auto parts.")
    setAdminEmail("admin@allusedautoparts.world")
    setNewOrderAlerts(true)
    setLowStockWarnings(true)
    toast.info("Changes discarded")
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-white/60">Configure general system preferences.</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader>
            <CardTitle>General Configuration</CardTitle>
            <CardDescription className="text-white/40">Basic settings for the storefront.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Store Description</Label>
                <Input
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Admin Email</Label>
                <Input
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@allusedautoparts.world"
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription className="text-white/40">Manage system alerts and emails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Order Alerts</Label>
                <div className="text-xs text-white/40">Receive emails when new orders are placed</div>
              </div>
              <Switch checked={newOrderAlerts} onCheckedChange={setNewOrderAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Warnings</Label>
                <div className="text-xs text-white/40">Notify when inventory falls below threshold</div>
              </div>
              <Switch checked={lowStockWarnings} onCheckedChange={setLowStockWarnings} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
            onClick={handleDiscard}
          >
            Discard Changes
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
