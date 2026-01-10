"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, FileText } from "lucide-react"

export default function TermsPage() {
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
              <span className="text-white">Terms of Service</span>
            </div>
            <span className="font-bold">All Used Auto Parts World</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-red-500/20">
                <FileText className="h-8 w-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-white/60">Last updated: December 1, 2025</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  By accessing and using All Used Auto Parts World ("AUW", "we", "us", or "the Service"), you accept and
                  agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the
                  above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  All Used Auto Parts World (AUW) is a direct seller of quality used, recycled, and remanufactured auto
                  parts. We source parts from certified salvage yards and suppliers across the United States to provide
                  you with reliable parts at competitive prices.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Unlike aggregators, we sell parts directly to you and stand behind every part with our warranty. We
                  handle the entire transaction including payment processing, shipping, and customer support.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Products & Pricing</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  All prices are displayed in US Dollars and are subject to change without notice. We strive to maintain
                  accurate pricing and inventory information, but errors may occur. In case of pricing errors, we
                  reserve the right to cancel orders at our discretion.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>All parts are inspected and tested before shipment</li>
                  <li>Mileage and condition are accurately represented</li>
                  <li>Parts come with applicable warranty as stated</li>
                  <li>Core charges may apply to certain parts (refundable upon core return)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. User Accounts</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  When you create an account with us, you must provide accurate, complete, and current information.
                  Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your
                  account.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  You are responsible for safeguarding your password and for all activities that occur under your
                  account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Payment & Security</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We accept major credit cards, debit cards, and PayPal. Payment is processed securely through encrypted
                  payment gateways. We do not store your complete payment information on our servers.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  All transactions are protected by SSL encryption and PCI-compliant payment processing.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Shipping & Delivery</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We ship to all 50 US states. Shipping times and costs vary based on part size, weight, and
                  destination. Free shipping is available on qualifying orders over $500. Tracking information is
                  provided for all shipments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Warranty & Returns</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  All parts come with a minimum 90-day warranty unless otherwise stated. Extended warranties are
                  available for engines and transmissions. Please refer to our Warranty page for complete terms. Returns
                  are accepted within 30 days for unused parts in original condition.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  AUW shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                  resulting from your use of or inability to use our services. Our total liability shall not exceed the
                  amount paid for the product in question.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Texas,
                  without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-bold mb-2">All Used Auto Parts World (AUW)</p>
                  <p className="text-white/70">Email: legal@allusedautoparts.world</p>
                  <p className="text-white/70">Phone: 1-800-528-9978</p>
                  <p className="text-white/70">Address: 1234 Auto Parts Blvd, Houston, TX 77001</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
