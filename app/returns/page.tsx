import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCcw, CheckCircle, Clock, Package, AlertCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

const returnSteps = [
  {
    step: 1,
    title: "Request Return",
    description: "Log into your account or call us at 1-800-528-9978 with your order number.",
    icon: RotateCcw,
  },
  {
    step: 2,
    title: "Get RMA Number",
    description: "Receive your Return Merchandise Authorization number within 24 hours.",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Ship the Part",
    description: "Pack the item securely in original packaging and ship with tracking.",
    icon: Package,
  },
  {
    step: 4,
    title: "Receive Refund",
    description: "Once inspected, refund is processed within 3-5 business days.",
    icon: Clock,
  },
]

const eligibility = [
  { eligible: true, text: "Unused parts in original packaging" },
  { eligible: true, text: "Parts returned within 30 days of delivery" },
  { eligible: true, text: "Parts with all original components included" },
  { eligible: true, text: "Defective or damaged parts (warranty claim)" },
  { eligible: true, text: "Wrong part sent by AUW (free return shipping)" },
  { eligible: false, text: "Installed or used parts (unless defective)" },
  { eligible: false, text: "Electrical parts that have been plugged in" },
  { eligible: false, text: "Parts without original packaging" },
  { eligible: false, text: "Special order or custom parts" },
  { eligible: false, text: "Parts returned after 30 days" },
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-zinc-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <RotateCcw className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">AUW Returns & Refunds</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            30-day hassle-free returns. No restocking fees on most items. We make it easy to return parts that don't
            work for you.
          </p>
          <Badge className="mt-6 bg-blue-500/20 text-blue-300 text-lg px-4 py-2">30-Day Money Back Guarantee</Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Return Process */}
        <h2 className="text-3xl font-bold text-white text-center mb-12">How Returns Work</h2>
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {returnSteps.map((item) => (
            <Card key={item.step} className="bg-zinc-800/50 border-zinc-700 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-red-500" />
                </div>
                <Badge className="bg-red-600 mb-3">Step {item.step}</Badge>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Eligibility */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Return Eligibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-green-500 font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" /> Eligible for Return
                </h3>
                <ul className="space-y-3">
                  {eligibility
                    .filter((e) => e.eligible)
                    .map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {item.text}
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="text-red-500 font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" /> Not Eligible
                </h3>
                <ul className="space-y-3">
                  {eligibility
                    .filter((e) => !e.eligible)
                    .map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        {item.text}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Info */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Refund Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-white font-semibold">Processing Time</h4>
                <p className="text-zinc-400">
                  Refunds are processed within 3-5 business days after we receive and inspect your return.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg">
              <Package className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-white font-semibold">Return Shipping</h4>
                <p className="text-zinc-400">
                  Return shipping is FREE if we sent the wrong part or it's defective. For other returns, customer pays
                  return shipping.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg">
              <RotateCcw className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-white font-semibold">Exchanges</h4>
                <p className="text-zinc-400">Need a different part? We offer free exchanges for the correct item.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Returns */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Core Returns (Refundable Deposits)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 mb-4">
              Some parts like engines, transmissions, and alternators have a core charge. Return your old part to get
              your core deposit refunded.
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Core must be returned within 30 days
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Core must be rebuildable (not cracked, broken, or damaged)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                We provide prepaid shipping labels for core returns
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need to Start a Return?</h2>
            <p className="text-red-100 mb-6">
              Contact our returns department or log into your account to initiate a return.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-zinc-100" asChild>
                <Link href="/account">My Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Phone className="h-4 w-4 mr-2" /> 1-800-528-9978
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Mail className="h-4 w-4 mr-2" /> returns@allusedautoparts.world
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
