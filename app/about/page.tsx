import {
  CheckCircle,
  ShieldCheck,
  Truck,
  Clock,
  Users,
  Award,
  Globe,
  Headphones,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-900 via-red-800 to-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/auto-parts-warehouse.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About AUW</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            All Used Auto Parts World (AUW) - Your trusted source for quality used engines, transmissions, and auto
            parts since 2010.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">Who We Are</h2>
            <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
              <p>
                At <span className="text-red-500 font-bold">All Used Auto Parts World (AUW)</span>, we specialize in
                providing top-tier used auto parts to customers across the nation. Founded with a mission to make car
                repairs affordable and reliable, we have grown into one of the most trusted names in the industry.
              </p>
              <p>
                Our massive inventory includes over <span className="text-white font-bold">5 million</span> engines,
                transmissions, and auto parts for all makes and models. Every part we sell undergoes a rigorous
                inspection process to ensure it meets our strict quality standards.
              </p>
              <p>
                We believe in transparency, quality, and exceptional customer service. When you buy from AUW, you are
                buying with confidence backed by our industry-leading warranty.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/shop">Browse Parts</Link>
              </Button>
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-800 bg-transparent" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-zinc-800/50 border-zinc-700 text-center p-6">
              <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-white text-lg mb-1">Warranty Included</h3>
              <p className="text-sm text-zinc-400">Up to 5 years coverage</p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 text-center p-6">
              <Truck className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-white text-lg mb-1">Fast Shipping</h3>
              <p className="text-sm text-zinc-400">Nationwide delivery</p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 text-center p-6">
              <CheckCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-white text-lg mb-1">Quality Tested</h3>
              <p className="text-sm text-zinc-400">OEM standards</p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 text-center p-6">
              <Clock className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-white text-lg mb-1">24/7 Support</h3>
              <p className="text-sm text-zinc-400">Expert assistance</p>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-red-500 mb-2">5M+</p>
              <p className="text-zinc-400">Parts in Stock</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-red-500 mb-2">50K+</p>
              <p className="text-zinc-400">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-red-500 mb-2">14+</p>
              <p className="text-zinc-400">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-red-500 mb-2">98%</p>
              <p className="text-zinc-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose AUW?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <Award className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Industry Leading Warranty</h3>
              <p className="text-zinc-400">
                We stand behind every part we sell with up to 5-year warranty coverage. If something goes wrong, we make
                it right.
              </p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <Globe className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nationwide Network</h3>
              <p className="text-zinc-400">
                With warehouses and partners across the country, we can source and deliver parts faster than anyone
                else.
              </p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <Users className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Expert Team</h3>
              <p className="text-zinc-400">
                Our ASE-certified technicians verify every part and our sales team helps you find the perfect match for
                your vehicle.
              </p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <Headphones className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">24/7 Customer Support</h3>
              <p className="text-zinc-400">
                Questions? Our support team is available around the clock to help with orders, fitment, and technical
                questions.
              </p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <Star className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Trusted Reviews</h3>
              <p className="text-zinc-400">
                Rated 4.8/5 on Google and Trustpilot. Join thousands of satisfied customers who trust AUW for their auto
                parts needs.
              </p>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <Truck className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Free Shipping</h3>
              <p className="text-zinc-400">
                Enjoy free shipping on orders over $500. We ship to all 50 states with tracking and insurance included.
              </p>
            </Card>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-r from-red-900/50 to-zinc-900/50 border border-red-500/20 rounded-2xl p-8 mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            To provide affordable, high-quality auto parts while delivering exceptional customer service. We believe
            everyone deserves access to reliable parts at fair prices, whether you are a professional mechanic or a DIY
            enthusiast.
          </p>
        </div>

        {/* Contact CTA */}
        <Card className="bg-zinc-800/50 border-zinc-700 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-zinc-400 mb-6">
                Have questions about a part or need help with your order? Our team is here to help.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Phone className="w-5 h-5 text-red-500" />
                  <span>1-800-AUW-PARTS (1-800-289-7278)</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="w-5 h-5 text-red-500" />
                  <span>support@allusedautoparts.world</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>Houston, TX - Serving All 50 States</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button className="bg-red-600 hover:bg-red-700 h-14 text-lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                className="border-zinc-600 text-white hover:bg-zinc-800 bg-transparent h-14 text-lg"
                asChild
              >
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
