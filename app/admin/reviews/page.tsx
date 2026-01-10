"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, ShieldCheck, MoreHorizontal } from "lucide-react"

export default function ReviewsManagementPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Review Management</h1>
          <p className="text-white/60">Monitor and respond to customer reviews from all sources.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              4.8
              <div className="flex text-yellow-400 text-lg">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-green-500 mt-1">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <p className="text-xs text-white/40 mt-1">Across Google and Website</p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-white/10 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white/60">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">94%</div>
            <p className="text-xs text-white/40 mt-1">Average response time: 4h</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-900 border-white/10 text-white">
        <CardHeader>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="pending">Pending Response (12)</TabsTrigger>
              <TabsTrigger value="google">Google Reviews</TabsTrigger>
              <TabsTrigger value="flagged" className="text-red-400">
                Flagged
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                          JD
                        </div>
                        <div>
                          <div className="font-bold">John Doe</div>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <span>Verified Purchase</span>
                            <span>•</span>
                            <span>2 days ago</span>
                            <span>•</span>
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="h-3 w-3 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                          <MessageSquare className="h-4 w-4 mr-2" /> Reply
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="pl-14">
                      <h4 className="font-bold text-sm mb-1">Excellent service and fast shipping!</h4>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        Part arrived exactly as described and was well packaged. The mileage was verified and the
                        condition was even better than expected. Will definitely shop here again for my BMW parts.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1 text-xs font-bold text-blue-400">
                          <ShieldCheck className="h-3 w-3" />
                          Admin Response
                        </div>
                        <p className="text-xs text-white/60">
                          Thank you so much for the kind words, John! We're glad to hear the part met your expectations.
                          Drive safe! - Sarah, Customer Support
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 font-bold">
                          MK
                        </div>
                        <div>
                          <div className="font-bold">Mike Kelly</div>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-[10px] font-bold">
                              NEEDS RESPONSE
                            </span>
                            <span>•</span>
                            <span>5 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="h-4 w-4 mr-2" /> Reply Now
                        </Button>
                      </div>
                    </div>
                    <div className="pl-14">
                      <h4 className="font-bold text-sm mb-1">Question about warranty coverage</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Does the 90-day warranty cover labor costs if the part is defective?
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="google" className="mt-6">
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Google Reviews Integration</h3>
                  <p className="text-white/60 mb-4">
                    Connect your Google Business Profile to import and respond to Google reviews directly from this
                    dashboard.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Connect Google Business</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flagged" className="mt-6">
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 font-bold">
                        AB
                      </div>
                      <div>
                        <div className="font-bold">Angry Buyer</div>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-[10px] font-bold">
                            FLAGGED
                          </span>
                          <span>•</span>
                          <span>1 day ago</span>
                          <span>•</span>
                          <div className="flex text-yellow-400">
                            <Star className="h-3 w-3 fill-yellow-400" />
                            <Star className="h-3 w-3 text-white/20" />
                            <Star className="h-3 w-3 text-white/20" />
                            <Star className="h-3 w-3 text-white/20" />
                            <Star className="h-3 w-3 text-white/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
                        Review
                      </Button>
                    </div>
                  </div>
                  <div className="pl-14">
                    <h4 className="font-bold text-sm mb-1 text-red-400">Part didn't fit my vehicle</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      This review has been flagged for containing potentially inaccurate fitment information.
                    </p>
                  </div>
                </div>
                <div className="text-center py-8 text-white/40">
                  <p>1 review flagged for moderation.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}
