"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Pencil, DollarSign, Package, Send, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [pageTitle, setPageTitle] = useState("Orders")
  const [pageSubtitle, setPageSubtitle] = useState("Manage and track customer orders.")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState("")
  const [tempSubtitle, setTempSubtitle] = useState("")
  const [orders, setOrders] = useState<any[]>([])
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [isEditingOrder, setIsEditingOrder] = useState(false)
  const [quoteRequests, setQuoteRequests] = useState<any[]>([])

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]")
    setOrders(allOrders.filter((o: any) => o.payment?.status === "paid"))

    const quotes = JSON.parse(localStorage.getItem("quoteRequests") || "[]")
    setQuoteRequests(quotes)
  }, [])

  const calculateProcessingTime = (orderDate: string, status: string) => {
    const created = new Date(orderDate)
    const now = new Date()
    const diffMs = now.getTime() - created.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (status === "delivered" || status === "Completed") {
      return "Completed"
    }

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours % 24}h`
    }
    return `${diffHours}h`
  }

  const handleTitleSave = () => {
    setPageTitle(tempTitle)
    setPageSubtitle(tempSubtitle)
    setIsEditingTitle(false)
    toast.success("Page header updated")
  }

  const handleEditOrder = (order: any) => {
    setEditingOrder({ ...order })
    setIsEditingOrder(true)
  }

  const handleSaveOrder = () => {
    setOrders(orders.map((o) => (o.id === editingOrder.id ? editingOrder : o)))
    setIsEditingOrder(false)
    toast.success("Order updated")
  }

  const handleGeneratePaymentLink = (quote: any) => {
    const paymentLink = `https://pay.allusedautoparts.world/invoice/${Date.now()}`
    navigator.clipboard.writeText(paymentLink)
    toast.success(`Payment link copied: ${paymentLink}`)
  }

  const handleSendQuote = (quote: any) => {
    toast.success(`Quote sent to ${quote.email} with payment link attached`)
  }

  const handleViewOrderDetails = (order: any) => {
    window.location.href = `/admin/orders/${order.id}`
  }

  return (
    <div className="p-8 space-y-8">
      <div className="group relative">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          {pageTitle}
          <Dialog open={isEditingTitle} onOpenChange={setIsEditingTitle}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setTempTitle(pageTitle)
                  setTempSubtitle(pageSubtitle)
                }}
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </DialogTrigger>
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
                    className="bg-white/5 border-white/10 text-white focus:border-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    value={tempSubtitle}
                    onChange={(e) => setTempSubtitle(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus:border-red-600"
                  />
                </div>
                <Button onClick={handleTitleSave} className="w-full bg-red-600 hover:bg-red-700">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </h1>
        <p className="text-white/60">{pageSubtitle}</p>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="orders" className="data-[state=active]:bg-red-600">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="quotes" className="data-[state=active]:bg-green-600">
            <DollarSign className="h-4 w-4 mr-2" />
            Quote Requests
            {quoteRequests.length > 0 && <Badge className="ml-2 bg-green-500 text-white">{quoteRequests.length}</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-9 bg-white/5 border-white/10 text-white focus:border-red-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/60">Order Number</TableHead>
                    <TableHead className="text-white/60">Customer Name</TableHead>
                    <TableHead className="text-white/60">Amount</TableHead>
                    <TableHead className="text-white/60">Status</TableHead>
                    <TableHead className="text-white/60">Processing Time</TableHead>
                    <TableHead className="text-right text-white/60">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders
                    .filter(
                      (order) =>
                        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (order.orderNumber && order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())),
                    )
                    .map((order) => (
                      <TableRow key={order.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">{order.orderNumber || order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {typeof order.customer === "string" ? order.customer : order.customer?.name}
                            </div>
                            <div className="text-xs text-white/40">
                              {typeof order.customer === "string" ? order.email : order.customer?.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">${order.total?.toFixed(2) || order.total}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              order.status === "Completed" || order.status === "delivered"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : order.status === "Processing" || order.status === "processing"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : order.status === "shipped"
                                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-white/20 text-white/70">
                            {calculateProcessingTime(order.date || order.createdAt, order.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-white/10 text-white/60 hover:text-white"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-white/10 text-white/60 hover:text-white"
                              onClick={() => handleEditOrder(order)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="mt-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Quote Requests</CardTitle>
              <p className="text-sm text-white/60">Manage customer quote requests and generate payment links</p>
            </CardHeader>
            <CardContent>
              {quoteRequests.length === 0 ? (
                <div className="text-center py-12">
                  <DollarSign className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No quote requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteRequests.map((quote, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">
                            {quote.firstName} {quote.lastName}
                          </h3>
                          <p className="text-sm text-white/60">
                            {quote.email} • {quote.phone}
                          </p>
                          <p className="text-xs text-white/40 mt-1">{new Date(quote.timestamp).toLocaleString()}</p>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2">Requested Part</h4>
                        <p className="text-white/80">{quote.product?.name || "N/A"}</p>
                        <p className="text-sm text-white/60">Quantity: {quote.quantity || 1}</p>
                        {quote.message && (
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <p className="text-sm text-white/70">{quote.message}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleGeneratePaymentLink(quote)}
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Generate Payment Link
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 hover:bg-white/5 bg-transparent"
                          onClick={() => handleSendQuote(quote)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Quote Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditingOrder} onOpenChange={setIsEditingOrder}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Order {editingOrder?.orderNumber || editingOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {editingOrder?.items && editingOrder.items.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base font-semibold">Order Parts</Label>
                <div className="bg-white/5 border border-white/10 rounded-lg divide-y divide-white/10">
                  {editingOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-xs text-white/60">
                          Qty: {item.quantity} • SKU: {item.id}
                        </p>
                      </div>
                      <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="p-3 flex justify-between items-center bg-white/5">
                    <p className="font-bold text-white">Total Amount</p>
                    <p className="font-bold text-lg text-red-500">${editingOrder.total?.toFixed(2) || "0.00"}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
                value={editingOrder?.status || ""}
                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Payment Status</Label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
                value={editingOrder?.payment || ""}
                onChange={(e) => setEditingOrder({ ...editingOrder, payment: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditingOrder(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveOrder} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrdersPage
