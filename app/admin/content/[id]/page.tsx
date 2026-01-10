"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContentEditor() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const isNew = id === "new"
  const isTabsEditor = id === "why-choose-us"

  const getInitialData = (pageId: string) => {
    if (pageId === "about") {
      return {
        title: "About Us",
        slug: "/about",
        content: "<h1>About AutoParts</h1><p>We are the leading provider...</p>",
      }
    }
    if (pageId === "contact") {
      return {
        title: "Contact Us",
        slug: "/contact",
        content: "<h1>Contact Us</h1><p>Email: support@example.com</p>",
      }
    }
    if (pageId === "terms") {
      return {
        title: "Terms of Service",
        slug: "/terms",
        content: "<h1>Terms of Service</h1><p>Last updated: 2024</p>",
      }
    }
    if (pageId === "why-choose-us") {
      return {
        title: "Why Choose Us Tabs",
        slug: "homepage-tabs",
        content: JSON.stringify(
          {
            tabs: [
              { id: "quality", label: "Quality Assurance", content: "We stand behind every part..." },
              { id: "service", label: "Warranty & Service", content: "90-day warranty on all parts..." },
              { id: "trust", label: "Reviews & Trust", content: "4.8/5 Average Rating..." },
              { id: "installers", label: "Find Mechanic", content: "Locate a Trusted Pro..." },
            ],
          },
          null,
          2,
        ),
      }
    }
    return {
      title: "Home Page",
      slug: "/",
      content: "<!-- Page content goes here -->",
    }
  }

  const initialData = isNew ? { title: "", slug: "", content: "" } : getInitialData(id)

  const [formData, setFormData] = useState({
    title: initialData.title,
    slug: initialData.slug,
    status: "published",
    content: initialData.content,
    metaTitle: "AutoParts - Premium Car Parts",
    metaDescription: "Find the best deals on auto parts...",
  })

  const handleSave = () => {
    toast.success("Page content saved successfully")
    setTimeout(() => router.push("/admin/content"), 1000)
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/content">
            <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{isNew ? "Create New Page" : `Edit ${formData.title}`}</h1>
            <p className="text-white/60">Manage page content, SEO, and layout.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent text-white">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>{isTabsEditor ? "Tabs Configuration" : "Page Content"}</CardTitle>
              <CardDescription>
                {isTabsEditor ? "Manage tab structure and content JSON." : "Main content editor."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{isTabsEditor ? "Section Name" : "Page Title"}</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>{isTabsEditor ? "Tabs Data (JSON)" : "HTML Content"}</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-white/5 border-white/10 min-h-[400px] font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={formData.status}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10 text-white">
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-white/40 text-sm">/</span>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Template</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10 text-white">
                    <SelectItem value="default">Default Layout</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
