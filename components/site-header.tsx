"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Phone, ShoppingCart, Menu, MapPin, Clock, Wrench, Warehouse, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cartStore } from "@/lib/cart-store"

export function SiteHeader() {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    // Initialize from storage
    cartStore.init()
    setCartItemCount(cartStore.getItemCount())

    // Subscribe to changes
    const unsubscribe = cartStore.subscribe(() => {
      setCartItemCount(cartStore.getItemCount())
    })

    return unsubscribe
  }, [])

  return (
    <>
      {/* Top Header - Black with Red Accent */}
      <div className="bg-black border-b border-neutral-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium text-neutral-400 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-600" /> Mon - Fri: 9:00AM - 6:00PM EST
              </span>
              <span className="flex items-center gap-1 hidden sm:flex">
                <MapPin className="w-3 h-3 text-red-600" /> USA Shipping Available
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/find-mechanic"
                className="hover:text-red-500 transition-colors flex items-center gap-1 font-bold text-red-500"
              >
                <Wrench className="w-3 h-3" /> Find Mechanic
              </Link>
              <Link
                href="/partners/mechanic/register"
                className="hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Wrench className="w-3 h-3" /> Mechanic Sign Up
              </Link>
              <Link
                href="/partners/junkyard/register"
                className="hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Warehouse className="w-3 h-3" /> Junk Yard Partner
              </Link>
              <div className="h-3 w-px bg-neutral-800 hidden sm:block"></div>
              <a href="tel:+1-888-818-5001" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3 h-3 text-red-600" /> +1-888-818-5001
              </a>
              <Link href="/login" className="hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Dark Gray */}
      <div className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src="/auw-logo.png" alt="AUW Logo" className="w-10 h-10 object-contain rounded-lg" />
              <div className="hidden sm:block">
                <h1 className="text-sm font-black text-white leading-tight">ALL USED AUTO PARTS WORLD</h1>
                <p className="text-[10px] text-red-500 font-semibold">AUW</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/shop" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Shop All
              </Link>
              <Link href="/engines" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Engines
              </Link>
              <Link
                href="/transmissions"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                Transmissions
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                  More Parts <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
                  <DropdownMenuItem asChild>
                    <Link href="/shop?category=transfer-case">Transfer Cases</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/shop?category=axle">Axle Assemblies</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/shop?category=ac-compressor">AC Compressors</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/brands" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Brands
              </Link>
              <Link href="/quote" className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">
                Get Quote
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-neutral-300 hover:text-white transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-neutral-300">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-neutral-900 border-neutral-800 w-80">
                  <SheetHeader>
                    <SheetTitle className="text-white">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/shop"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      Shop All Parts
                    </Link>
                    <Link
                      href="/engines"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      Engines
                    </Link>
                    <Link
                      href="/transmissions"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      Transmissions
                    </Link>
                    <Link
                      href="/brands"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      Brands
                    </Link>
                    <Link
                      href="/find-mechanic"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      Find Mechanic
                    </Link>
                    <Link
                      href="/quote"
                      className="text-lg font-medium text-red-500 hover:text-red-400 transition-colors"
                    >
                      Get Quote
                    </Link>
                    <hr className="border-neutral-800" />
                    <Link
                      href="/account"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/tracking"
                      className="text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                    >
                      Track Order
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
