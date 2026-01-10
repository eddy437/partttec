import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Truck,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src="/auw-logo.png"
                  alt="AUW - All Used Auto Parts World Logo"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">ALL USED AUTO PARTS WORLD</h3>
                  <p className="text-red-400 text-xs font-semibold">AUW</p>
                </div>
              </div>
              <p className="text-red-400 text-sm font-semibold italic">
                Your Trusted Partner for Automotive Service & Solutions
              </p>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              Your trusted source for quality used auto parts. Instant search across thousands of engines,
              transmissions, and more.
            </p>
            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1-888-818-5001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@allusedautoparts.world</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Nationwide Service</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Fixed links to public pages */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Shop All Parts
                </Link>
              </li>
              <li>
                <Link href="/engines" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Engines
                </Link>
              </li>
              <li>
                <Link href="/transmissions" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Transmissions
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/find-mechanic" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Find Mechanic
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service - Added new pages */}
          <div>
            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tracking"
                  className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Truck className="h-3 w-3" /> Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Shield className="h-3 w-3" /> Warranty Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <FileText className="h-3 w-3" /> Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/fitment-guide"
                  className="text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="h-3 w-3" /> Fitment Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-zinc-400 hover:text-red-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social - Fixed links to public pages */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="flex gap-3">
              <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} ALL USED AUTO PARTS WORLD (AUW). All rights reserved. | Quality Used Auto
            Parts Nationwide
          </p>
        </div>
      </div>
    </footer>
  )
}

// export { SiteFooter }
