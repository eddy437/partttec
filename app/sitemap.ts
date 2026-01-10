import type { MetadataRoute } from "next"
import { brands, searchResults } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000" // Local development

  // Static pages
  const routes = ["", "/search", "/shop", "/cart", "/checkout", "/brands", "/contact", "/faq", "/login", "/signup"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    }),
  )

  // Dynamic Product Pages
  const productRoutes = searchResults.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Dynamic Brand Pages
  const brandRoutes = brands.map((brand) => ({
    url: `${baseUrl}/brand/${brand.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...routes, ...productRoutes, ...brandRoutes]
}
