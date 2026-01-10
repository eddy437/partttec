"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X, Plus, Minus, ShoppingBag, Truck, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
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

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 inline-flex p-6 rounded-full bg-white/5 border border-white/10">
              <ShoppingBag className="h-16 w-16 text-white/40" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-white/60 mb-8 text-lg">
              Looks like you haven't added any parts to your cart yet. Start shopping to find the perfect parts for your
              vehicle.
            </p>
            <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg">
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
            href="/"
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
              <span className="text-white">Shopping Cart</span>
            </div>
            <h1 className="text-2xl font-bold">Your Cart ({items.length} items)</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-black/20 border border-white/10 relative group">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/80 text-white text-xs font-medium border border-white/20">
                        {item.product.brand}
                      </div>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium border ${
                          item.mileageOption.condition === "New" || item.mileageOption.condition === "Excellent"
                            ? "bg-green-500/90 text-white border-green-400"
                            : item.mileageOption.condition === "Remanufactured"
                              ? "bg-blue-500/90 text-white border-blue-400"
                              : "bg-amber-500/90 text-white border-amber-400"
                        }`}
                      >
                        {item.mileageOption.condition}
                      </div>
                      {/* */}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-lg font-bold hover:text-blue-400 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-white/50 mt-1">{item.product.brand}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors border border-white/10"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                        {item.mileageOption.condition}
                      </div>
                      <div className="px-3 py-1 rounded-lg bg-white/5 text-white/70 text-xs border border-white/10">
                        {item.mileageOption.mileage.toLocaleString()} miles
                      </div>
                      <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                        {item.mileageOption.availability}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="w-16 text-center font-medium">{item.quantity}</div>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">
                          ${(item.mileageOption.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-white/50">${item.mileageOption.price.toFixed(2)} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span className={cn("font-medium", shipping === 0 ? "text-green-400" : "text-white")}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax (estimated)</span>
                    <span className="font-medium text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-blue-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm">
                    <p className="text-blue-400">
                      Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more to get FREE shipping!
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4">
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-white/10 hover:bg-white/5 text-white bg-transparent"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium">Secure Checkout</div>
                      <div className="text-white/50 text-xs">256-bit SSL encryption</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Truck className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">Fast Delivery</div>
                      <div className="text-white/50 text-xs">Ships within 24 hours</div>
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
