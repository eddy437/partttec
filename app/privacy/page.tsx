"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, Shield } from "lucide-react"

export default function PrivacyPage() {
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
              <span className="text-white">Privacy Policy</span>
            </div>
            <span className="font-bold">All Used Auto Parts World</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-green-500/20">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-white/60">Last updated: December 1, 2025</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  All Used Auto Parts World ("AUW", "we", "us", or "our") respects your privacy and is committed to
                  protecting your personal data. This privacy policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website allusedautoparts.world or make a purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Name, email address, phone number, and shipping/billing address</li>
                  <li>Vehicle information (year, make, model) for fitment purposes</li>
                  <li>Account credentials and profile information</li>
                  <li>Order history and transaction details</li>
                  <li>Payment information (processed securely, not stored by us)</li>
                  <li>Communications with our customer support team</li>
                  <li>Reviews and feedback you submit</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-white/70 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations, shipping updates, and tracking information</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send warranty information and important product notices</li>
                  <li>Improve our website, products, and services</li>
                  <li>Personalize your shopping experience</li>
                  <li>Detect and prevent fraud</li>
                  <li>Send promotional emails (with your consent, you can opt-out anytime)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We do NOT sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Shipping carriers (FedEx, UPS, freight companies) to deliver your orders</li>
                  <li>Payment processors (Stripe, PayPal) to process transactions securely</li>
                  <li>Service providers who help us operate our business</li>
                  <li>Law enforcement when required by law or to protect our rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>256-bit SSL encryption for all data transmission</li>
                  <li>PCI-DSS compliant payment processing</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Secure data centers with restricted access</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Cookies & Tracking</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We use cookies and similar technologies to improve your experience, remember your preferences, and
                  analyze site traffic. You can control cookies through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                <p className="text-white/70 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-4">
                  To exercise these rights, contact us at privacy@allusedautoparts.world
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. California Privacy Rights (CCPA)</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  California residents have additional rights under the CCPA, including the right to know what personal
                  information we collect, the right to delete, and the right to opt-out of sale of personal information.
                  We do not sell personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-bold mb-2">All Used Auto Parts World (AUW)</p>
                  <p className="text-white/70">Privacy Officer Email: privacy@allusedautoparts.world</p>
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
