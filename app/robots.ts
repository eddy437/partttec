import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "http://localhost:3000" // Local development

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/account/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
