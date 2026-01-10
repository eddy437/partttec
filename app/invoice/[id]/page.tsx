import { ArrowLeft, Printer, Download, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InvoicePage({ params }: { params: { id: string } }) {
  // Mock data for the invoice
  const invoice = {
    id: params.id || "INV-2024-882",
    date: "2024-03-22",
    dueDate: "2024-03-22",
    status: "Unpaid",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "456 Auto Lane, Austin, TX 78701",
      phone: "+1 (555) 987-6543",
    },
    items: [
      {
        id: "1",
        name: "Toyota Camry Alternator",
        sku: "ALT-TY-2015",
        condition: "Good (45k miles)",
        quantity: 1,
        price: 125.0,
        total: 125.0,
      },
    ],
    subtotal: 125.0,
    shipping: 20.0,
    tax: 10.0,
    total: 155.0,
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8 no-print">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-white/50">Back to Dashboard</span>
        </div>

        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm relative">
          {/* Status Banner */}
          <div className="bg-red-500/10 border-b border-red-500/20 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-red-400">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Payment Status: {invoice.status}</span>
            </div>
            <div className="text-sm text-white/60">Due on {invoice.dueDate}</div>
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
                <h1 className="text-4xl font-bold text-white mb-2">INVOICE</h1>
                <div className="text-xl text-white/50">#{invoice.id}</div>
                <div className="text-sm text-white/40 mt-1">Date: {invoice.date}</div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Bill To</h3>
                <div className="text-white space-y-1">
                  <p className="font-bold text-lg">{invoice.customer.name}</p>
                  <p className="text-white/70">{invoice.customer.address}</p>
                  <p className="text-white/70">{invoice.customer.email}</p>
                  <p className="text-white/70">{invoice.customer.phone}</p>
                </div>
              </div>
              <div className="md:text-right">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Payment Method</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-end text-white">
                    <CreditCard className="h-4 w-4 text-blue-400" />
                    <span>Credit Card / Debit Card</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end text-white/60 text-sm">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Secure SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider">Item Details</th>
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider text-center">Qty</th>
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider text-right">Price</th>
                    <th className="p-4 text-sm font-bold text-white/50 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoice.items.map((item) => (
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
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span>${invoice.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Tax</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="font-bold text-xl text-white">Amount Due</span>
                  <span className="font-bold text-2xl text-green-500">${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Terms & Actions */}
            <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div className="space-y-4">
                <h4 className="font-bold text-white mb-2">Payment Information</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  Please make checks payable to AUTOPARTS Inc. <br />
                  For bank transfer details, please contact sales@allusedautoparts.world.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-blue-400 mt-4">
                  <Link href="/terms" className="hover:underline hover:text-blue-300">
                    Terms
                  </Link>
                  <Link href="/shipping" className="hover:underline hover:text-blue-300">
                    Shipping
                  </Link>
                  <Link href="/payment-methods" className="hover:underline hover:text-blue-300">
                    Payment Methods
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center md:items-end">
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white h-12 px-8 shadow-lg shadow-green-900/20"
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Pay Invoice Now
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
                    <Download className="mr-2 h-4 w-4" /> PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
