import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Truck, Award, Clock, Users, CheckCircle, Star, Phone, ThumbsUp, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const benefits = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "Every part is inspected, tested, and verified before shipping. We stand behind every product we sell.",
  },
  {
    icon: Truck,
    title: "Fast Nationwide Shipping",
    description: "Free shipping on orders over $99. Most orders ship within 24 hours and arrive in 2-5 business days.",
  },
  {
    icon: Award,
    title: "Industry-Leading Warranty",
    description: "Up to 1-year warranty on all parts. We cover defects and ensure your satisfaction.",
  },
  {
    icon: Clock,
    title: "Same-Day Processing",
    description: "Orders placed before 2 PM EST ship the same day. Get your parts when you need them.",
  },
  {
    icon: Users,
    title: "Expert Support Team",
    description: "Our ASE-certified technicians are available to help you find the right part for your vehicle.",
  },
  {
    icon: CheckCircle,
    title: "Hassle-Free Returns",
    description: "30-day return policy with no restocking fees. We make returns easy and stress-free.",
  },
]

const stats = [
  { value: "1M+", label: "Parts in Stock" },
  { value: "50K+", label: "Happy Customers" },
  { value: "99%", label: "Positive Reviews" },
  { value: "24/7", label: "Customer Support" },
]

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-900 via-red-800 to-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/placeholder.svg?height=600&width=1200" alt="" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-red-500/20 text-red-300 mb-4">TRUSTED BY THOUSANDS</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Why Choose AUW?</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            For over 15 years, ALL USED AUTO PARTS WORLD has been the trusted source for quality used and remanufactured
            auto parts at unbeatable prices.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-zinc-800/50 py-12 border-b border-zinc-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-red-500">{stat.value}</p>
                <p className="text-zinc-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <Card key={i} className="bg-zinc-800/50 border-zinc-700 hover:border-red-500/50 transition-all">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-zinc-800/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Trusted & Certified</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-10 w-10 text-green-500" />
              </div>
              <p className="text-white font-medium">SSL Secured</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-10 w-10 text-amber-500" />
              </div>
              <p className="text-white font-medium">5-Star Rated</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <ThumbsUp className="h-10 w-10 text-blue-500" />
              </div>
              <p className="text-white font-medium">BBB Accredited</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wrench className="h-10 w-10 text-red-500" />
              </div>
              <p className="text-white font-medium">ASE Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Part?</h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust AUW for quality auto parts at the best prices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-zinc-100" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/contact">
                  <Phone className="h-4 w-4 mr-2" /> Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
