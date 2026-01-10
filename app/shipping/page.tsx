"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, Truck, Clock, ShoppingBag, ChevronRightIcon, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">Shipping Info</span>
            </div>
            <span className="font-bold">All Used Auto Parts World</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-red-500/20">
                <Truck className="h-8 w-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Shipping Information</h1>
                <p className="text-white/60">Fast, reliable delivery from AUW to your door</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <Truck className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold">Free Shipping</h3>
                </div>
                <p className="text-white/70 mb-4">On orders over $500</p>
                <p className="text-sm text-white/50">Standard delivery in 3-7 business days</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Same-Day Processing</h3>
                </div>
                <p className="text-white/70 mb-4">Orders before 2 PM CST</p>
                <p className="text-sm text-white/50">Ships the same business day</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Shipping Methods & Rates</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">Standard Ground Shipping</h3>
                      <span className="text-green-400 font-medium">FREE over $500</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">Delivery: 3-7 business days</p>
                    <p className="text-white/50 text-sm">$49.99 flat rate for orders under $500</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">Expedited Shipping</h3>
                      <span className="text-blue-400 font-medium">$79.99+</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">Delivery: 2-3 business days</p>
                    <p className="text-white/50 text-sm">Price varies by weight and location</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">Freight Shipping (Large Parts)</h3>
                      <span className="text-amber-400 font-medium">Quote Based</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">Delivery: 5-10 business days</p>
                    <p className="text-white/50 text-sm">For engines, transmissions, and large assemblies</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold">Local Pickup</h3>
                      <span className="text-green-400 font-medium">FREE</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">Houston, TX warehouse</p>
                    <p className="text-white/50 text-sm">Ready in 2-4 hours after order confirmation</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Shipping Coverage</h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">We Ship to All 50 US States</h4>
                      <p className="text-white/60 text-sm">
                        Including Alaska and Hawaii (additional shipping time may apply)
                      </p>
                    </div>
                  </div>
                  <p className="text-white/70">
                    AUW partners with major carriers including FedEx, UPS, and freight companies to ensure your parts
                    arrive safely and on time.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Processing Time</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Orders are typically processed within 24 hours of placement. Orders placed before 2 PM CST on business
                  days are processed the same day. Orders placed after 2 PM CST or on weekends/holidays will be
                  processed the next business day.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-300 text-sm font-medium">
                    Large items (engines, transmissions) may require 1-2 additional business days for preparation and
                    crating.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tracking Your Order</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Once your order ships, you'll receive a confirmation email with tracking information. You can also
                  track your order anytime by logging into your account.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/account">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Package className="h-4 w-4 mr-2" /> Track My Order
                    </Button>
                  </Link>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Damaged or Lost Packages</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  If your package arrives damaged or goes missing during transit, please contact us within 48 hours of
                  the expected delivery date. We'll work with the shipping carrier to resolve the issue.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
                  <p className="text-white/70 text-sm mb-2">
                    <strong>What to do if your package is damaged:</strong>
                  </p>
                  <ol className="list-decimal list-inside text-white/60 space-y-1 text-sm ml-2">
                    <li>Take photos of the damaged package and contents</li>
                    <li>Keep all packaging materials</li>
                    <li>Contact AUW support immediately at 1-800-528-9978</li>
                    <li>We'll arrange for a replacement or refund</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact Shipping Support</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Have questions about shipping? Our team is here to help:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-bold mb-2">All Used Auto Parts World (AUW)</p>
                  <p className="text-white/70">Email: shipping@allusedautoparts.world</p>
                  <p className="text-white/70">Phone: 1-800-528-9978</p>
                  <p className="text-white/70">Hours: Monday-Friday, 8 AM - 6 PM CST</p>
                </div>
              </section>
            </div>
          </div>

          {/* Browse Catalog CTA */}
          <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-600/20 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ready to Order?</h3>
                <p className="text-white/60">Browse our inventory of 5M+ quality used auto parts.</p>
              </div>
            </div>
            <Link href="/shop">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6">
                Shop Now <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
