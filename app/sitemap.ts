import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  try {
    // Dynamically import data to avoid build-time issues
    const { brands, searchResults } = await import("@/lib/data")

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
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Return minimal sitemap on error
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
    ]
  }
}
