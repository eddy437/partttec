"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ChevronRight, HelpCircle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is AUTOPARTS?",
          a: "AUTOPARTS is an AI-powered search platform that helps you find auto parts from thousands of stores and suppliers. We aggregate product information, pricing, and availability to help you make informed purchasing decisions.",
        },
        {
          q: "Is AUTOPARTS free to use?",
          a: "Yes! We offer a free basic plan that includes up to 5 searches per day. For unlimited searches and advanced features, we offer affordable premium plans starting at $9/month.",
        },
        {
          q: "Do you sell parts directly?",
          a: "No, we don't sell parts directly. We connect you with trusted retailers and suppliers who have the parts you need. All transactions occur between you and the seller.",
        },
      ],
    },
    {
      category: "Ordering & Payment",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Affirm for financing options. All payments are processed securely through industry-leading payment processors.",
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use 256-bit SSL encryption and never store your complete payment information on our servers. All transactions are processed through PCI-compliant payment gateways.",
        },
        {
          q: "Can I cancel or modify my order?",
          a: "Orders can be modified or cancelled within 2 hours of placement, as long as they haven't been processed. Contact customer support immediately if you need to make changes.",
        },
        {
          q: "Do you offer bulk discounts?",
          a: "Yes! We offer special pricing for bulk orders and business accounts. Contact our sales team for more information about volume discounts.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 3-5 business days. We also offer Express (1-2 days) and Overnight shipping options. Orders placed before 2 PM EST ship the same day.",
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! Orders over $50 qualify for free standard shipping. We also offer local pickup at participating stores for no charge.",
        },
        {
          q: "Can I track my order?",
          a: "Yes. Once your order ships, you'll receive an email with tracking information. You can also track your order in real-time by logging into your account.",
        },
        {
          q: "What if my package is damaged or lost?",
          a: "Contact us within 48 hours of expected delivery if your package is damaged or missing. We'll work with the carrier to resolve the issue and ensure you get your parts.",
        },
      ],
    },
    {
      category: "Returns & Warranty",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day money-back guarantee on most items. Parts must be unused, in original packaging, and in resalable condition. Return shipping is free for defective items.",
        },
        {
          q: "How do I start a return?",
          a: "Log into your account, go to Order History, and select the item you want to return. Follow the prompts to print a return label and instructions.",
        },
        {
          q: "Do parts come with a warranty?",
          a: "Yes! Most parts come with a manufacturer's warranty ranging from 6 months to 2 years, depending on the part condition and mileage. Warranty details are listed on each product page.",
        },
        {
          q: "What if I receive the wrong part?",
          a: "We'll make it right immediately. Contact support with your order number and we'll arrange for a replacement at no additional cost and provide a prepaid return label.",
        },
      ],
    },
    {
      category: "Product Information",
      questions: [
        {
          q: "How do I know if a part fits my vehicle?",
          a: "Each product page lists compatible vehicles. We also have a fitment checker tool that verifies compatibility based on your vehicle's year, make, and model.",
        },
        {
          q: "What do the mileage options mean?",
          a: "We offer parts at different mileage levels: Excellent (low mileage, like-new condition), Good (moderate mileage, fully functional), and Fair (higher mileage, budget-friendly). Each option is tested and guaranteed.",
        },
        {
          q: "Are your parts OEM or aftermarket?",
          a: "We offer both! You can filter results to show only OEM (Original Equipment Manufacturer) parts or browse our selection of high-quality aftermarket alternatives.",
        },
        {
          q: "How accurate is your inventory information?",
          a: "Very accurate! Our system updates in real-time, syncing with seller inventories every few minutes. However, high-demand items can sell quickly, so we recommend adding items to your cart promptly.",
        },
      ],
    },
  ]

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
              <span className="text-white">FAQ</span>
            </div>
            <span className="font-bold">AUTOPARTS</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-purple-500/20">
                <HelpCircle className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
                <p className="text-white/60">Find answers to common questions</p>
              </div>
            </div>

            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-4 text-blue-400">{category.category}</h2>
                  <div className="space-y-3">
                    {category.questions.map((faq, questionIndex) => {
                      const globalIndex = categoryIndex * 100 + questionIndex
                      const isOpen = openIndex === globalIndex
                      return (
                        <div
                          key={questionIndex}
                          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/30"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full p-5 flex justify-between items-center text-left"
                          >
                            <span className="font-semibold pr-4">{faq.q}</span>
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 text-blue-400 flex-shrink-0 transition-transform duration-300",
                                isOpen ? "rotate-180" : "",
                              )}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-0">
                              <p className="text-white/70 leading-relaxed">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-white/70 mb-6">Our customer support team is here to help</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:support@autoparts.example.com"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                >
                  Email Support
                </Link>
                <Link
                  href="tel:1-800-AUTO-PARTS"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors border border-white/10"
                >
                  Call Us
                </Link>
              </div>
              <p className="text-white/50 text-sm mt-4">Available Monday-Friday, 8 AM - 8 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
