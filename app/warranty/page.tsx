import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Clock, AlertCircle, Phone, Mail } from "lucide-react"

const warrantyTiers = [
  {
    name: "Standard Warranty",
    duration: "90 Days",
    coverage: ["Manufacturing defects", "Part failure under normal use", "Free replacement or refund"],
    applies: "All used parts",
    color: "amber",
  },
  {
    name: "Extended Warranty",
    duration: "6 Months",
    coverage: [
      "All standard coverage",
      "Labor reimbursement up to $50/hr",
      "Nationwide coverage",
      "Transferable to new owner",
    ],
    applies: "Engines, Transmissions",
    color: "blue",
  },
  {
    name: "Premium Warranty",
    duration: "1 Year",
    coverage: [
      "All extended coverage",
      "Full labor reimbursement",
      "Towing reimbursement up to $100",
      "24/7 roadside assistance",
    ],
    applies: "Remanufactured parts",
    color: "green",
  },
]

const exclusions = [
  "Damage from improper installation",
  "Normal wear and tear items (filters, gaskets, seals)",
  "Damage from accidents or collisions",
  "Parts modified after purchase",
  "Commercial or racing use",
  "Damage from lack of maintenance",
  "Electrical parts that have been plugged in (if not defective)",
  "Parts installed on wrong vehicle",
]

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900 via-green-800 to-zinc-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">AUW Warranty Program</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            All Used Auto Parts World stands behind every part we sell. Our comprehensive warranty program ensures your
            complete peace of mind.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Warranty Tiers */}
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Warranty Programs</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {warrantyTiers.map((tier, i) => (
            <Card
              key={i}
              className={`bg-zinc-800/50 border-zinc-700 hover:border-${tier.color}-500/50 transition-all relative overflow-hidden`}
            >
              {tier.name === "Premium Warranty" && (
                <Badge className="absolute top-4 right-4 bg-green-500">BEST VALUE</Badge>
              )}
              <CardHeader>
                <div className={`w-14 h-14 bg-${tier.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                  <Shield className={`h-7 w-7 text-${tier.color}-500`} />
                </div>
                <CardTitle className="text-white text-xl">{tier.name}</CardTitle>
                <p className={`text-3xl font-bold text-${tier.color}-500`}>{tier.duration}</p>
                <p className="text-zinc-400 text-sm">Applies to: {tier.applies}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.coverage.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Claim */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-500" />
              How to File a Warranty Claim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-white font-semibold mb-2">Contact Us</h3>
                <p className="text-zinc-400 text-sm">
                  Call 1-800-528-9978 or email warranty@allusedautoparts.world with your order number
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-white font-semibold mb-2">Describe Issue</h3>
                <p className="text-zinc-400 text-sm">Provide details about the problem and photos/videos if possible</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-white font-semibold mb-2">Get Approval</h3>
                <p className="text-zinc-400 text-sm">Receive RMA number and shipping instructions within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                  4
                </div>
                <h3 className="text-white font-semibold mb-2">Resolution</h3>
                <p className="text-zinc-400 text-sm">Receive replacement part or refund within 5-7 business days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exclusions */}
        <Card className="bg-zinc-800/50 border-zinc-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-amber-500" />
              Warranty Exclusions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {exclusions.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Have Warranty Questions?</h2>
            <p className="text-red-100 mb-6">Our warranty team is here to help you Monday-Friday, 8 AM - 6 PM CST.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-zinc-100">
                <Phone className="h-4 w-4 mr-2" /> 1-800-528-9978
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Mail className="h-4 w-4 mr-2" /> warranty@allusedautoparts.world
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
