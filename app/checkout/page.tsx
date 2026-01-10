"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CreditCard, Lock, ChevronRight, Check, MapPin, Package, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useCartStore } from "@/lib/cart-store"
import { cn } from "@/lib/utils"
import { toast } from "@/lib/toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "affirm">("card")
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No items in cart</h1>
          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
            Return to Shop
          </Button>
        </div>
      </div>
    )
  }

  const handlePlaceOrder = () => {
    if (!acceptedTerms) {
      toast.error("Please accept the Terms & Conditions to continue")
      return
    }

    const orderData = {
      id: `ORD-${Date.now()}`,
      orderNumber: `ORD-2024-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      status: "processing",
      items: items.map((item) => ({
        id: item.productId,
        name: item.product.name,
        quantity: item.quantity,
        price: item.mileageOption.price,
        image: item.product.images[0] || "/placeholder.svg",
        sku: item.product.sku,
      })),
      total: total,
      customer: {
        name: (document.getElementById("firstName") as HTMLInputElement)?.value || "",
        email: (document.getElementById("email") as HTMLInputElement)?.value || "",
        phone: (document.getElementById("phone") as HTMLInputElement)?.value || "",
        address: (document.getElementById("address") as HTMLInputElement)?.value || "",
      },
      shipping: {
        method: "standard",
        cost: shipping,
      },
      payment: {
        method: paymentMethod,
        status: "paid",
      },
      communications: [],
    }

    const existingOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
    existingOrders.unshift(orderData)
    localStorage.setItem("allOrders", JSON.stringify(existingOrders))

    toast.success("Order placed successfully!")
    clearCart()
    setTimeout(() => {
      router.push(`/account/order/${orderData.id}`)
    }, 1500)
  }

  const steps = [
    { number: 1, title: "Shipping", icon: MapPin },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Package },
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/cart" className="hover:text-white transition-colors">
                Cart
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">Checkout</span>
            </div>
            <h1 className="text-2xl font-bold">Secure Checkout</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                      currentStep >= step.number
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white/5 border-white/20 text-white/40",
                    )}
                  >
                    {currentStep > step.number ? <Check className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={cn(
                      "text-sm mt-2 font-medium",
                      currentStep >= step.number ? "text-white" : "text-white/40",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4 transition-colors",
                      currentStep > step.number ? "bg-blue-600" : "bg-white/10",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white/70 mb-2 block">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white/70 mb-2 block">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-white/70 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-white/70 mb-2 block">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-white/70 mb-2 block">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-white/70 mb-2 block">
                      State
                    </Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-white/70 mb-2 block">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white/70 mb-2 block">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} className="bg-blue-600 hover:bg-blue-700 px-8">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                  <div className="grid gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                        paymentMethod === "card"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === "card" ? "border-blue-500" : "border-white/30",
                        )}
                      >
                        {paymentMethod === "card" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                      </div>
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Credit / Debit Card</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                        paymentMethod === "paypal"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === "paypal" ? "border-blue-500" : "border-white/30",
                        )}
                      >
                        {paymentMethod === "paypal" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                      </div>
                      <div className="font-bold text-[#0070ba]">PayPal</div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("affirm")}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                        paymentMethod === "affirm"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === "affirm" ? "border-blue-500" : "border-white/30",
                        )}
                      >
                        {paymentMethod === "affirm" && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                      </div>
                      <div className="font-bold">Affirm</div>
                      <span className="text-sm text-white/50">Pay over time</span>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-white/70 mb-2 block">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-white/70 mb-2 block">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-white/70 mb-2 block">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard" className="text-white/70 mb-2 block">
                          Name on Card
                        </Label>
                        <Input
                          id="nameOnCard"
                          placeholder="John Doe"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 text-white px-8"
                  >
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="bg-blue-600 hover:bg-blue-700 px-8">
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Order Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.productId} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/20 relative flex-shrink-0">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-medium border border-white/20">
                            {item.product.brand}
                          </div>
                          <div
                            className={`absolute top-1 right-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border ${
                              item.mileageOption.condition === "New" || item.mileageOption.condition === "Excellent"
                                ? "bg-green-500/90 text-white border-green-400"
                                : item.mileageOption.condition === "Remanufactured"
                                  ? "bg-blue-500/90 text-white border-blue-400"
                                  : "bg-amber-500/90 text-white border-amber-400"
                            }`}
                          >
                            {item.mileageOption.condition}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold">{item.product.name}</div>
                          <div className="text-sm text-white/50">
                            {item.mileageOption.condition} • Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="font-bold text-blue-400">
                          ${(item.mileageOption.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 mb-6">
                    <ShieldCheck className="h-6 w-6 text-green-400" />
                    <div className="text-sm text-green-300">
                      Your order is protected by our 30-day money-back guarantee
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                        className="mt-1 border-yellow-500/50 data-[state=checked]:bg-yellow-600"
                      />
                      <label htmlFor="terms" className="text-sm text-white/90 leading-relaxed cursor-pointer">
                        I have read and agree to the{" "}
                        <Link href="/terms" target="_blank" className="text-yellow-400 hover:underline font-medium">
                          Terms & Conditions
                        </Link>
                        ,{" "}
                        <Link href="/privacy" target="_blank" className="text-yellow-400 hover:underline font-medium">
                          Privacy Policy
                        </Link>
                        , and{" "}
                        <Link href="/returns" target="_blank" className="text-yellow-400 hover:underline font-medium">
                          Return Policy
                        </Link>
                        . I understand that all sales are final unless the part is defective.
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 text-white px-8"
                  >
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} className="bg-blue-600 hover:bg-blue-700 px-8 gap-2">
                    <Lock className="h-4 w-4" />
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span className={cn("font-medium", shipping === 0 ? "text-green-400" : "text-white")}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax</span>
                    <span className="text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-base">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-blue-400">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="font-medium">Fast Shipping</div>
                      <div className="text-white/50 text-xs">Arrives in 2-5 business days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium">Secure Payment</div>
                      <div className="text-white/50 text-xs">256-bit encryption</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="font-medium">Quality Parts</div>
                      <div className="text-white/50 text-xs">Inspected & tested</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
