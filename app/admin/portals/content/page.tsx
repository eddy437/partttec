import { Globe, MessageSquare, FileText, Star } from "lucide-react"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContentPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Content Management Portal</h1>
            <p className="text-white/60">Manage website content, reviews, and communication</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/content">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Globe className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Website Content</CardTitle>
                </div>
                <CardDescription className="text-white/60">Edit pages, sections, and content</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/reviews">
            <Card className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                    <Star className="h-6 w-6 text-amber-400" />
                  </div>
                  <CardTitle className="text-white">Reviews & QA</CardTitle>
                </div>
                <CardDescription className="text-white/60">Manage customer reviews and responses</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/chatbot">
            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <MessageSquare className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">AI Chatbot</CardTitle>
                </div>
                <CardDescription className="text-white/60">Configure chatbot prompts and responses</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/footer">
            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <FileText className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Footer Info</CardTitle>
                </div>
                <CardDescription className="text-white/60">Edit footer content and links</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
