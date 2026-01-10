"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Phone,
  Mail,
  Headphones,
  Clock,
  MoreVertical,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Filter,
  Download,
  User,
  RefreshCcw,
  Send,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const tickets = [
  {
    id: "TKT-4521",
    subject: "Order not received - 7 days late",
    customer: "John Smith",
    email: "john@email.com",
    priority: "high",
    status: "open",
    category: "Shipping",
    assignee: "Sarah M.",
    created: "2 hours ago",
    lastReply: "30 min ago",
  },
  {
    id: "TKT-4520",
    subject: "Wrong part received - Need exchange",
    customer: "Emily Brown",
    email: "emily.b@email.com",
    priority: "medium",
    status: "in-progress",
    category: "Returns",
    assignee: "Mike T.",
    created: "5 hours ago",
    lastReply: "1 hour ago",
  },
  {
    id: "TKT-4519",
    subject: "Refund request - Part didn't fit",
    customer: "Robert Wilson",
    email: "rwilson@email.com",
    priority: "medium",
    status: "pending",
    category: "Refunds",
    assignee: "Sarah M.",
    created: "1 day ago",
    lastReply: "3 hours ago",
  },
  {
    id: "TKT-4518",
    subject: "Question about warranty coverage",
    customer: "Lisa Johnson",
    email: "lisa.j@email.com",
    priority: "low",
    status: "resolved",
    category: "Warranty",
    assignee: "John K.",
    created: "2 days ago",
    lastReply: "1 day ago",
  },
  {
    id: "TKT-4517",
    subject: "Damaged part on arrival",
    customer: "Mike Davis",
    email: "mdavis@email.com",
    priority: "high",
    status: "open",
    category: "Returns",
    assignee: "Mike T.",
    created: "3 hours ago",
    lastReply: "45 min ago",
  },
]

const liveChats = [
  { id: 1, customer: "James K.", message: "Hi, I need help with my order...", time: "Now", status: "active" },
  { id: 2, customer: "Anna L.", message: "Is this part compatible with...", time: "2 min", status: "waiting" },
  { id: 3, customer: "Tom R.", message: "Thank you for your help!", time: "5 min", status: "closing" },
]

const supportTeam = [
  { name: "Sarah Miller", role: "Team Lead", tickets: 156, resolved: 142, rating: 4.9, avatar: "SM", status: "online" },
  {
    name: "Mike Thompson",
    role: "Support Agent",
    tickets: 98,
    resolved: 89,
    rating: 4.7,
    avatar: "MT",
    status: "online",
  },
  { name: "John Kim", role: "Support Agent", tickets: 87, resolved: 82, rating: 4.8, avatar: "JK", status: "away" },
  { name: "Amy Chen", role: "Junior Agent", tickets: 45, resolved: 38, rating: 4.5, avatar: "AC", status: "offline" },
]

export default function SupportCRM() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("tickets")
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Headphones className="h-6 w-6 text-blue-400" />
            </div>
            Support CRM
          </h1>
          <p className="text-white/60 mt-1">Manage tickets, live chat, and customer support</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" /> New Ticket
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-600/20 to-red-900/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">23</div>
                <div className="text-xs text-white/60">Open Tickets</div>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-white/60">In Progress</div>
              </div>
              <RefreshCcw className="h-8 w-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">145</div>
                <div className="text-xs text-white/60">Resolved Today</div>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">2.4h</div>
                <div className="text-xs text-white/60">Avg Response</div>
              </div>
              <Clock className="h-8 w-8 text-blue-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Tab Buttons */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setSelectedTab("tickets")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === "tickets"
                  ? "bg-blue-600 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <MessageSquare className="h-4 w-4" /> Tickets
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("live-chat")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === "live-chat"
                  ? "bg-blue-600 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Headphones className="h-4 w-4" /> Live Chat
              <Badge className="ml-1 bg-red-500 text-white text-xs">3</Badge>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("team")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === "team" ? "bg-blue-600 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <User className="h-4 w-4" /> Team
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search tickets..."
                className="pl-10 bg-white/5 border-white/10 text-white w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tickets Tab */}
        {selectedTab === "tickets" && (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Ticket</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Customer</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Category</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Priority</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Status</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Assignee</th>
                      <th className="text-left p-4 text-xs font-medium text-white/60 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <td className="p-4">
                          <div className="font-mono text-sm text-blue-400">{ticket.id}</div>
                          <div className="text-sm text-white mt-1">{ticket.subject}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white">{ticket.customer}</div>
                          <div className="text-xs text-white/50">{ticket.email}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-white/20 text-white/70">
                            {ticket.category}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              ticket.priority === "high"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : ticket.priority === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`${
                              ticket.status === "open"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : ticket.status === "in-progress"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : ticket.status === "pending"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            }`}
                          >
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white">{ticket.assignee}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10">
                                <DropdownMenuItem className="text-white hover:bg-white/10">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-white/10">Assign</DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-white/10">
                                  Mark Resolved
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">Close</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Chat Tab */}
        {selectedTab === "live-chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Active Chats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {liveChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      chat.status === "active"
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                          {chat.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-white">{chat.customer}</span>
                      </div>
                      <span className="text-xs text-white/50">{chat.time}</span>
                    </div>
                    <p className="text-sm text-white/70 truncate">{chat.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="bg-white/5 border-white/10 lg:col-span-2">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center font-bold text-white">
                      JK
                    </div>
                    <div>
                      <div className="font-medium text-white">James K.</div>
                      <div className="text-xs text-emerald-400">Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Transfer
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-64 overflow-y-auto space-y-4 mb-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      JK
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 max-w-md">
                      <p className="text-sm text-white">
                        Hi, I need help with my order. It says shipped but I haven't received any tracking.
                      </p>
                      <span className="text-xs text-white/50 mt-1 block">10:32 AM</span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-blue-600 rounded-lg p-3 max-w-md">
                      <p className="text-sm text-white">
                        Hello James! I'd be happy to help you with that. Can you please provide your order number?
                      </p>
                      <span className="text-xs text-white/70 mt-1 block">10:33 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="bg-white/5 border-white/10 text-white resize-none"
                    rows={2}
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Team Tab */}
        {selectedTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportTeam.map((member, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-lg font-bold text-white">
                        {member.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-neutral-900 ${
                          member.status === "online"
                            ? "bg-emerald-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-neutral-500"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-xs text-white/50">{member.role}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Tickets</span>
                      <span className="text-white">{member.tickets}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Resolved</span>
                      <span className="text-emerald-400">{member.resolved}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Rating</span>
                      <span className="text-yellow-400">{member.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
