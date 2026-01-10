"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Mail, Phone, Pencil, Trash2, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

const customers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    spent: "$4,523.00",
    lastOrder: "Oct 24, 2023",
    subscription: "Pro",
  },
  {
    id: "CUST-002",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "+1 (555) 987-6543",
    orders: 5,
    spent: "$892.50",
    lastOrder: "Oct 24, 2023",
    subscription: "Basic",
  },
  {
    id: "CUST-003",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    spent: "$1,250.00",
    lastOrder: "Oct 20, 2023",
    subscription: "None",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("Customers")
  const [description, setDescription] = useState("Manage customer relationships and data.")
  const [tempTitle, setTempTitle] = useState(title)
  const [tempDescription, setTempDescription] = useState(description)
  const [customerList, setCustomerList] = useState(customers)
  const [editingCustomer, setEditingCustomer] = useState<any>(null)
  const [isEditingCustomer, setIsEditingCustomer] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailDraft, setEmailDraft] = useState({ subject: "", body: "" })

  const handleSave = () => {
    setTitle(tempTitle)
    setDescription(tempDescription)
    setIsEditing(false)
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomerList(customerList.filter((c) => c.id !== id))
  }

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer({ ...customer })
    setIsEditingCustomer(true)
  }

  const handleSaveCustomer = () => {
    setCustomerList(customerList.map((c) => (c.id === editingCustomer.id ? editingCustomer : c)))
    setIsEditingCustomer(false)
  }

  const handleOpenEmail = (customer: any) => {
    setEditingCustomer(customer)
    setIsSendingEmail(true)
  }

  const handleSendEmail = () => {
    toast.success(`Email sent to ${editingCustomer.email}`)
    setIsSendingEmail(false)
    setEmailDraft({ subject: "", body: "" })
  }

  return (
    <div className="p-8 space-y-8">
      <div className="group relative w-fit">
        <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 text-white/60" />
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-white/60">{description}</p>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit Page Header</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditingCustomer} onOpenChange={setIsEditingCustomer}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={editingCustomer?.name || ""}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={editingCustomer?.email || ""}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={editingCustomer?.phone || ""}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Subscription</Label>
              <Input
                value={editingCustomer?.subscription || ""}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, subscription: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditingCustomer(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomer} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSendingEmail} onOpenChange={setIsSendingEmail}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Email to {editingCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>To</Label>
              <Input value={editingCustomer?.email || ""} disabled className="bg-white/5 border-white/10 opacity-50" />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Email Subject"
                value={emailDraft.subject}
                onChange={(e) => setEmailDraft({ ...emailDraft, subject: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Type your message here..."
                rows={6}
                value={emailDraft.body}
                onChange={(e) => setEmailDraft({ ...emailDraft, body: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsSendingEmail(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} className="bg-red-600 hover:bg-red-700">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="bg-neutral-900 border-white/10 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search customers..."
                className="pl-9 bg-white/5 border-white/10 text-white focus:border-red-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white/60">Customer</TableHead>
                <TableHead className="text-white/60">Contact</TableHead>
                <TableHead className="text-white/60">Subscription</TableHead>
                <TableHead className="text-center text-white/60">Orders</TableHead>
                <TableHead className="text-right text-white/60">Total Spent</TableHead>
                <TableHead className="text-white/60">Last Order</TableHead>
                <TableHead className="text-right text-white/60">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerList
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.email.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((customer) => (
                  <TableRow key={customer.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="font-medium">{customer.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Phone className="h-3 w-3" /> {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.subscription === "None" ? (
                        <span className="text-white/40 text-sm">No Plan</span>
                      ) : (
                        <Badge
                          className={
                            customer.subscription === "Pro"
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : customer.subscription === "Enterprise"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          }
                        >
                          {customer.subscription}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{customer.orders}</TableCell>
                    <TableCell className="text-right font-medium text-green-400">{customer.spent}</TableCell>
                    <TableCell className="text-white/60">{customer.lastOrder}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
                          onClick={() => handleOpenEmail(customer)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-white/10 text-white/60 hover:text-white"
                          onClick={() => handleEditCustomer(customer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
