"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout, Edit, Eye, Plus, FileText, ImageIcon, Map, Layers } from "lucide-react"
import Link from "next/link"

export default function ContentManagementPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Website Content</h1>
          <p className="text-white/60">Manage pages, banners, and marketing content.</p>
        </div>
        <Link href="/admin/content/new">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" /> Create New Page
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-white/10 p-1">
          <TabsTrigger value="pages" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Pages
          </TabsTrigger>
          <TabsTrigger value="sections" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Page Sections
          </TabsTrigger>
          <TabsTrigger value="banners" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Banners & Ads
          </TabsTrigger>
          <TabsTrigger value="blog" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Blog Posts
          </TabsTrigger>
          <TabsTrigger value="navigation" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Navigation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Core Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "home", name: "Home Page", path: "/", lastEdited: "2 hours ago", status: "Published" },
                  { id: "shop", name: "Shop / Catalog", path: "/shop", lastEdited: "Just now", status: "Published" },
                  {
                    id: "search",
                    name: "Search Results",
                    path: "/search",
                    lastEdited: "1 day ago",
                    status: "Published",
                  },
                  {
                    id: "product-detail",
                    name: "Product Detail Template",
                    path: "/product/[id]",
                    lastEdited: "3 days ago",
                    status: "Published",
                  },
                  {
                    id: "uploaded-products",
                    name: "Uploaded Product Pages",
                    path: "/product/1001...",
                    lastEdited: "Auto-generated",
                    status: "Live",
                  },
                  { id: "cart", name: "Shopping Cart", path: "/cart", lastEdited: "1 week ago", status: "Published" },
                  {
                    id: "checkout",
                    name: "Checkout",
                    path: "/checkout",
                    lastEdited: "1 week ago",
                    status: "Published",
                  },
                  {
                    id: "brands",
                    name: "Brands List",
                    path: "/brands",
                    lastEdited: "2 weeks ago",
                    status: "Published",
                  },
                  {
                    id: "brand-detail",
                    name: "Brand Detail Template",
                    path: "/brands/[id]",
                    lastEdited: "2 weeks ago",
                    status: "Published",
                  },
                  { id: "about", name: "About Us", path: "/about", lastEdited: "1 month ago", status: "Published" },
                  { id: "contact", name: "Contact", path: "/contact", lastEdited: "1 month ago", status: "Published" },
                  {
                    id: "terms",
                    name: "Terms of Service",
                    path: "/terms",
                    lastEdited: "3 months ago",
                    status: "Published",
                  },
                ].map((page, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Layout className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold">{page.name}</div>
                        <div className="text-xs text-white/40">
                          {page.path} • Last edited {page.lastEdited}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        {page.status}
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link href={`/admin/content/${page.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Homepage Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "why-choose-us",
                    name: "Why Choose Us Tabs",
                    type: "Tabbed Content",
                    lastEdited: "Just now",
                    status: "Active",
                  },
                  {
                    id: "hero-slider",
                    name: "Hero Slider",
                    type: "Carousel",
                    lastEdited: "1 day ago",
                    status: "Active",
                  },
                  {
                    id: "featured-brands",
                    name: "Featured Brands Grid",
                    type: "Grid",
                    lastEdited: "3 days ago",
                    status: "Active",
                  },
                ].map((section, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Layers className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-bold">{section.name}</div>
                        <div className="text-xs text-white/40">
                          {section.type} • Last edited {section.lastEdited}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        {section.status}
                      </span>
                      <Link href={`/admin/content/${section.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banners">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Banners & Promotional Ads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-bold">Black Friday Banner</div>
                      <div className="text-xs text-white/40">Homepage Top • Last edited 2 days ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-bold">DIY Brake Replacement Guide</div>
                      <div className="text-xs text-white/40">Guides • Last edited 1 week ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Menu Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Map className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold">Main Header Menu</div>
                      <div className="text-xs text-white/40">Header • Last edited 1 month ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
