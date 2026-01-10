"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, ShieldCheck } from "lucide-react"
import { toast } from "@/lib/toast"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock login - in production this would verify credentials
    setTimeout(() => {
      setLoading(false)
      if (email && password) {
        // Set a mock cookie or local storage
        localStorage.setItem("admin_auth", "true")
        localStorage.setItem("admin_role", "super_admin")
        toast.success("Welcome back, Administrator")
        router.push("/admin")
      } else {
        toast.error("Invalid credentials")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-neutral-400">Secure access for authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@allusedautoparts.world"
              className="bg-neutral-950 border-neutral-800 text-white focus:border-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="bg-neutral-950 border-neutral-800 text-white focus:border-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-12" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>256-bit SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  )
}
