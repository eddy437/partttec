import { ArrowLeft, Printer, Download, CheckCircle, Clock, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function QuotePage({ params }: { params: { id: string } }) {
  // Mock data for the quote
  const quote = {
    id: params.id || "Q-2024-001",
    date: "2024-03-20",
    expiryDate: "2024-04-19",
    status: "Pending",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 (555) 123-4567",
    },
    items: [
      {
        id: "1",
        name: "Brembo Brake Pads - Front Set",
        sku: "P06046",
        condition: "Excellent (15k miles)",
        quantity: 1,
        price: 89.99,
        total: 89.99,
      },
      {
        id: "2",
        name: "BMW OEM Air Filter",
        sku: "AF-9921",
        condition: "New",
        quantity: 2,
        price: 24.5,
        total: 49.0,
      },
    ],
    subtotal: 138.99,
    shipping: 15.0,
    tax: 11.12,
    total: 165.11,
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8 no-print">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-white/50">Back to Store</span>
        </div>

        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm relative">
          {/* Status Banner */}
          <div className="bg-blue-600/10 border-b border-blue-500/20 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-blue-400">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Quote Status: {quote.status}</span>
            </div>
            <div className="text-sm text-white/60">Expires on {quote.expiryDate}</div>
          </div>

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white">P</span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight">AUTOPARTS</span>
                </div>
                <div className="text-white space-y-1">
                  123 Auto Parts Blvd
                  <br />
                  Detroit, MI 48201
                  <br />
                  sales@allusedautoparts.world
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-bold text-white mb-2">QUOTE</h1>
                <div className="text-xl text-white/50">#{quote.id}</div>
                <div className="text-sm text-white/40 mt-1">Date: {quote.date}</div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Bill To</h3>
                <div className="text-white space-y-1">
                  <p className="font-bold text-lg">{quote.customer.name}</p>
                  <p className="text-white/70">{quote.customer.address}</p>
                  <p className="text-white/70">{quote.customer.email}</p>
                  <p className="text-white/70">{quote.customer.phone}</p>
                </div>
              </div>
              <div className="md:text-right">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Ship To</h3>
                <div className="text-white space-y-1">
                  <p className="font-bold text-lg">{quote.customer.name}</p>
                  <p className="text-white/70">{quote.customer.address}</p>
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                    <CheckCircle className="h-3 w-3" /> Verified Address
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider">Item Description</th>
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider text-center">Qty</th>
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider text-right">Price</th>
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {quote.items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-sm text-white/50">
                          SKU: {item.sku} • {item.condition}
                        </div>
                      </td>
                      <td className="p-4 text-center text-white/70">{item.quantity}</td>
                      <td className="p-4 text-right text-white/70">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-right font-medium text-white">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
              <div className="w-full md:w-1/3 space-y-3">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${quote.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>${quote.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax</span>
                  <span>${quote.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="font-bold text-xl text-white">Total</span>
                  <span className="font-bold text-2xl text-blue-500">${quote.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Terms & Actions */}
            <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div className="space-y-4">
                <h4 className="font-bold text-white mb-2">Terms & Conditions</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  This quote is valid for 30 days. Prices are subject to change after expiration. Shipping times are
                  estimates. Returns accepted within 30 days of delivery with restocking fee.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-blue-400 mt-4">
                  <Link href="/terms" className="hover:underline hover:text-blue-300">
                    Terms of Service
                  </Link>
                  <Link href="/shipping" className="hover:underline hover:text-blue-300">
                    Shipping Policy
                  </Link>
                  <Link href="/privacy" className="hover:underline hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center md:items-end">
                <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
                  Accept Quote & Checkout
                </Button>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-white/40 text-xs mt-2 justify-center md:justify-end w-full">
                  <CreditCard className="h-3 w-3" />
                  <span>Secure Payment via Stripe / PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
