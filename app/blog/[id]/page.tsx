"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
} from "lucide-react"

const articles: Record<string, any> = {
  "brake-noise-1": {
    id: "brake-noise-1",
    title: "How to Fix Noisy Brakes",
    excerpt: "Common causes of brake squeal and how to solve them.",
    image: "/brake-repair-mechanic-working.jpg",
    date: "2024-11-15",
    author: "AUW Technical Team",
    readTime: "5 min read",
    category: "Maintenance",
    tags: ["Brakes", "DIY", "Troubleshooting"],
    content: `
Brake noise is one of the most common complaints among vehicle owners. Whether it's a high-pitched squeal, grinding sound, or clicking noise, understanding the cause can help you determine the right solution.

## Common Causes of Brake Noise

### 1. Worn Brake Pads

The most common cause of brake squeal is worn brake pads. Most modern brake pads have wear indicators - small metal tabs that contact the rotor when pads are low, creating a squealing sound to alert you it's time for replacement.

**Solution:** Replace brake pads when thickness is below 3mm or when wear indicators are audible.

### 2. Glazed Rotors or Pads

When brakes overheat from aggressive braking or riding the brakes downhill, the friction material can glaze over, creating a smooth, hardened surface that squeals.

**Solution:** Resurface or replace rotors, and replace glazed pads. Break in new pads properly with gradual stops.

### 3. Dust and Debris

Brake dust buildup between the pad and rotor can cause squealing, especially after the vehicle sits overnight.

**Solution:** Clean brakes with brake cleaner spray. This noise usually goes away after a few stops.

### 4. Low-Quality Brake Pads

Cheap brake pads often contain metal flakes that can cause squealing when they contact the rotor surface.

**Solution:** Invest in quality brake pads from reputable brands like Brembo, Ferodo, or Textar.

### 5. Missing or Worn Anti-Squeal Shims

Brake shims are thin layers of rubber or metal that dampen vibrations between the pad and caliper.

**Solution:** Always install new shims when replacing pads, and apply brake grease to the back of pads.

## When to Seek Professional Help

Contact a mechanic immediately if you experience:

- **Grinding noise** - Metal-on-metal contact indicates completely worn pads
- **Brake pedal vibration** - Could indicate warped rotors
- **Vehicle pulling** - May indicate caliper issues or uneven pad wear
- **Brake warning light** - System has detected a problem
- **Soft or spongy pedal** - Could be air in lines or fluid leak

## Prevention Tips

1. **Use quality brake components** - Premium pads last longer and perform better
2. **Avoid aggressive braking** - Hard stops generate excessive heat
3. **Don't ride the brakes** - Especially on long descents
4. **Regular inspections** - Check brakes every 12,000 miles
5. **Replace brake fluid** - Every 2 years or 30,000 miles

## Quality Brake Parts at AUW

At AUW Auto Parts, we carry premium brake components from trusted manufacturers including Brembo, Ferodo, Textar, and more. All our parts come with:

- **Warranty coverage** - Up to 2 years on brake components
- **Expert fitment guidance** - Our team ensures you get the right parts
- **Competitive pricing** - Quality parts at fair prices
- **Fast shipping** - Most orders ship same day
    `,
    relatedArticles: [
      { id: "engine-swap-guide", title: "Complete Engine Swap Guide", image: "/engine-swap.jpg" },
      {
        id: "transmission-problems",
        title: "5 Signs Your Transmission Needs Attention",
        image: "/transmission-mechanism.png",
      },
    ],
    relatedProducts: [
      { id: "1", name: "Brembo Brake Pads - Premium", price: 89.99, image: "/brake-pads-close-up.png" },
      { id: "2", name: "Ferodo Racing Brake Pads", price: 129.99, image: "/ferodo-brakes.jpg" },
    ],
  },
  "engine-swap-guide": {
    id: "engine-swap-guide",
    title: "Complete Engine Swap Guide",
    excerpt: "Everything you need to know about swapping an engine.",
    image: "/engine-swap-garage.jpg",
    date: "2024-11-10",
    author: "AUW Technical Team",
    readTime: "12 min read",
    category: "Installation",
    tags: ["Engines", "Installation", "Performance"],
    content: `
An engine swap is one of the most ambitious projects a car enthusiast can undertake. Whether you're replacing a worn-out motor or upgrading for more power, this guide covers everything you need to know.

## Planning Your Engine Swap

### 1. Choose the Right Engine

Consider these factors when selecting an engine:

- **Compatibility** - Will it physically fit in your engine bay?
- **Transmission** - Does your current trans bolt up, or do you need a new one?
- **Electronics** - ECU, wiring harness, and sensor compatibility
- **Budget** - Include all supporting modifications in your cost estimate

### 2. Gather Parts and Tools

Essential items for most swaps:

- Engine and transmission (if needed)
- Motor mounts (often custom)
- Wiring harness adapter or custom harness
- ECU (may need tuning)
- Exhaust manifold/headers
- Cooling system components
- Fuel system upgrades (if needed)

### 3. Common Swap Combinations

Popular engine swaps with good aftermarket support:

- **LS swap** - GM's LS series fits almost anything
- **2JZ swap** - Toyota's legendary inline-6
- **K-series swap** - Honda's modern performance engine
- **Coyote swap** - Ford's 5.0L DOHC V8

## The Swap Process

### Step 1: Document Everything

Before removing anything, take photos and label all connections. You'll thank yourself later.

### Step 2: Remove the Old Engine

1. Drain all fluids
2. Disconnect battery
3. Remove hood for access
4. Disconnect all electrical, fuel, coolant, and vacuum lines
5. Unbolt exhaust
6. Support transmission
7. Unbolt motor mounts
8. Lift engine out with hoist

### Step 3: Prepare the Engine Bay

- Clean and inspect for damage
- Install new motor mounts
- Run new wiring if needed
- Modify firewall/tunnel if necessary

### Step 4: Install New Engine

1. Lower engine carefully into position
2. Bolt motor mounts
3. Connect transmission
4. Install exhaust
5. Connect all lines and wiring
6. Fill fluids

### Step 5: Initial Startup

- Double-check all connections
- Prime fuel system
- Check for leaks
- Start engine and monitor temps/pressure
- Break in properly

## AUW Has Your Engine

We stock quality used engines for all major makes and models. Every engine includes:

- Compression test results
- Mileage verification
- Warranty coverage
- Technical support
    `,
    relatedArticles: [
      { id: "brake-noise-1", title: "How to Fix Noisy Brakes", image: "/brakes.jpg" },
      {
        id: "transmission-problems",
        title: "5 Signs Your Transmission Needs Attention",
        image: "/transmission-mechanism.png",
      },
    ],
    relatedProducts: [
      { id: "engine-1", name: "Toyota 2GR-FE V6 Engine", price: 2499.99, image: "/toyota-engine.jpg" },
      { id: "engine-2", name: "Ford 5.0 Coyote Engine", price: 4999.99, image: "/coyote-engine.jpg" },
    ],
  },
  "transmission-problems": {
    id: "transmission-problems",
    title: "5 Signs Your Transmission Needs Attention",
    excerpt: "Recognize early warning signs of transmission trouble.",
    image: "/transmission-repair.jpg",
    date: "2024-11-05",
    author: "AUW Technical Team",
    readTime: "4 min read",
    category: "Troubleshooting",
    tags: ["Transmission", "Diagnostics", "Maintenance"],
    content: `
Your transmission is one of the most complex and expensive components in your vehicle. Catching problems early can save thousands in repair costs.

## Warning Signs

### 1. Slipping Gears

If your transmission unexpectedly changes gears or feels like it's in neutral when it should be in drive, you have a slipping transmission.

**Causes:**
- Low fluid level
- Worn clutch plates
- Faulty solenoids
- Worn bands

### 2. Rough or Delayed Shifting

Hesitation when shifting, harsh engagement, or jerking between gears indicates internal problems.

**Causes:**
- Dirty or low fluid
- Worn synchronizers (manual)
- Valve body issues (automatic)
- Failing clutches

### 3. Unusual Noises

Whining, humming, or clunking sounds from the transmission area shouldn't be ignored.

**What they mean:**
- **Whining** - Low fluid or pump issues
- **Humming** - Bearing wear
- **Clunking** - Worn mounts or internal damage

### 4. Fluid Leaks

Transmission fluid is typically red (new) or brown (old). Any leak should be addressed immediately.

**Common leak points:**
- Pan gasket
- Output shaft seal
- Input shaft seal
- Cooler lines

### 5. Check Engine Light

Modern transmissions are electronically controlled. The check engine light may indicate transmission issues even if you don't notice symptoms yet.

## Maintenance Tips

1. **Check fluid regularly** - Monthly for older vehicles
2. **Change fluid on schedule** - Every 30,000-60,000 miles
3. **Use correct fluid type** - Check owner's manual
4. **Let engine warm up** - Before driving aggressively
5. **Come to complete stops** - Before shifting from R to D

## Need a Replacement?

AUW stocks quality used transmissions for all major vehicles. Our transmissions are:

- Tested for proper operation
- Cleaned and inspected
- Covered by warranty
- Shipped fast
    `,
    relatedArticles: [
      { id: "brake-noise-1", title: "How to Fix Noisy Brakes", image: "/brakes.jpg" },
      { id: "engine-swap-guide", title: "Complete Engine Swap Guide", image: "/detailed-engine.png" },
    ],
    relatedProducts: [
      { id: "trans-1", name: "Toyota A750F Transmission", price: 1899.99, image: "/toyota-transmission.jpg" },
      { id: "trans-2", name: "ZF 8HP Transmission", price: 2499.99, image: "/zf-transmission.jpg" },
    ],
  },
}

export default function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const article = articles[id]

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-white/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n")
    const elements: JSX.Element[] = []
    let currentList: string[] = []
    let listType: "ul" | "ol" | null = null

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        const ListTag = listType
        elements.push(
          <ListTag
            key={elements.length}
            className={`${listType === "ul" ? "list-disc" : "list-decimal"} pl-6 mb-4 space-y-2 text-white/80`}
          >
            {currentList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ListTag>,
        )
        currentList = []
        listType = null
      }
    }

    lines.forEach((line, i) => {
      const trimmed = line.trim()

      if (trimmed.startsWith("## ")) {
        flushList()
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">
            {trimmed.slice(3)}
          </h2>,
        )
      } else if (trimmed.startsWith("### ")) {
        flushList()
        elements.push(
          <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">
            {trimmed.slice(4)}
          </h3>,
        )
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        flushList()
        elements.push(
          <p key={i} className="font-bold text-white mb-2">
            {trimmed.slice(2, -2)}
          </p>,
        )
      } else if (trimmed.startsWith("- **")) {
        if (listType !== "ul") flushList()
        listType = "ul"
        currentList.push(trimmed.slice(2).replace(/\*\*/g, ""))
      } else if (trimmed.startsWith("- ")) {
        if (listType !== "ul") flushList()
        listType = "ul"
        currentList.push(trimmed.slice(2))
      } else if (/^\d+\.\s/.test(trimmed)) {
        if (listType !== "ol") flushList()
        listType = "ol"
        currentList.push(trimmed.replace(/^\d+\.\s/, ""))
      } else if (trimmed === "") {
        flushList()
      } else {
        flushList()
        elements.push(
          <p key={i} className="text-white/80 mb-4 leading-relaxed">
            {trimmed}
          </p>,
        )
      }
    })

    flushList()
    return elements
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">{article.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-red-600">{article.category}</Badge>
            </div>

            {/* Article Header */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6 pb-6 border-b border-zinc-800">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {article.readTime}
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-white/60">Share:</span>
              <button type="button" className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
                <Facebook className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
                <Twitter className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
                <Linkedin className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="ml-auto p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 flex items-center gap-2"
              >
                <Bookmark className="h-4 w-4" /> Save
              </button>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">{renderContent(article.content)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-800">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="border-white/20 text-white/60">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Feedback */}
            <div className="flex items-center gap-4 mt-8 p-4 bg-zinc-900 rounded-xl">
              <span className="text-white/60">Was this article helpful?</span>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
              >
                <ThumbsUp className="h-4 w-4" /> Yes
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
              >
                <MessageSquare className="h-4 w-4" /> Leave Comment
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related Products */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-5">
                <h3 className="font-bold mb-4">Related Products</h3>
                <div className="space-y-3">
                  {article.relatedProducts?.map((product: any) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800"
                    >
                      <div className="relative w-16 h-16 rounded bg-zinc-800 overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                        <p className="text-red-500 font-bold">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/shop" className="block mt-4 text-center text-sm text-red-500 hover:text-red-400">
                  View All Products
                </Link>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-5">
                <h3 className="font-bold mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {article.relatedArticles?.map((related: any) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800"
                    >
                      <div className="relative w-20 h-14 rounded bg-zinc-800 overflow-hidden">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium line-clamp-2">{related.title}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Need Help CTA */}
            <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0">
              <CardContent className="p-5 text-center">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-white/80 text-sm mb-4">Our experts are ready to assist you</p>
                <Link
                  href="tel:1-800-528-9978"
                  className="block w-full bg-white text-red-600 font-bold py-2 rounded-lg hover:bg-white/90"
                >
                  Call 1-800-528-9978
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
