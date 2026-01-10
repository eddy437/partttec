"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Settings, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { toast } from "sonner"

export default function EmailsPage() {
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUser, setSmtpUser] = useState("")
  const [smtpPassword, setSmtpPassword] = useState("")
  const [fromEmail, setFromEmail] = useState("invoice@allusedautoparts.world")
  const [fromName, setFromName] = useState("All Used Auto Parts")
  const [enableSsl, setEnableSsl] = useState(true)

  const [testEmail, setTestEmail] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("order-confirmation")

  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: "order-confirmation",
      name: "Order Confirmation",
      subject: "Your Order #{{order_id}} is Confirmed",
      body: "Thank you for your order! We have received your order #{{order_id}} totaling ${{total}}. We will send you a shipping confirmation once your items are on the way.",
      active: true,
    },
    {
      id: "shipping-notification",
      name: "Shipping Notification",
      subject: "Your Order #{{order_id}} Has Shipped",
      body: "Great news! Your order #{{order_id}} has been shipped. Track your package using tracking number: {{tracking_number}}",
      active: true,
    },
    {
      id: "password-reset",
      name: "Password Reset",
      subject: "Reset Your Password",
      body: "We received a request to reset your password. Click the link below to create a new password: {{reset_link}}",
      active: true,
    },
    {
      id: "welcome",
      name: "Welcome Email",
      subject: "Welcome to All Used Auto Parts!",
      body: "Welcome {{customer_name}}! Thank you for joining us. Browse our catalog and find the perfect parts for your vehicle.",
      active: true,
    },
  ])

  const [emailLogs] = useState([
    {
      id: 1,
      to: "john@example.com",
      subject: "Order #1234 Confirmed",
      template: "Order Confirmation",
      status: "sent",
      sentAt: "2025-01-15 10:30 AM",
    },
    {
      id: 2,
      to: "alice@example.com",
      subject: "Your Order Has Shipped",
      template: "Shipping Notification",
      status: "sent",
      sentAt: "2025-01-15 09:15 AM",
    },
    {
      id: 3,
      to: "bob@example.com",
      subject: "Reset Your Password",
      template: "Password Reset",
      status: "failed",
      sentAt: "2025-01-15 08:45 AM",
    },
    {
      id: 4,
      to: "sarah@example.com",
      subject: "Welcome to All Used Auto Parts",
      template: "Welcome Email",
      status: "pending",
      sentAt: "2025-01-15 08:00 AM",
    },
  ])

  const handleSaveSmtp = () => {
    toast.success("SMTP settings saved successfully")
  }

  const handleTestEmail = () => {
    if (!testEmail) {
      toast.error("Please enter a test email address")
      return
    }
    toast.success(`Test email sent to ${testEmail}`)
  }

  const handleSaveTemplate = () => {
    toast.success("Email template saved successfully")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Sent</Badge>
      case "failed":
        return <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Failed</Badge>
      case "pending":
        return <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">Pending</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Management</h1>
          <p className="text-white/60">Configure SMTP settings, templates, and view email logs.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Send className="h-4 w-4 mr-2" />
          Send Bulk Email
        </Button>
      </div>

      <Tabs defaultValue="smtp" className="space-y-6">
        <TabsList className="bg-neutral-900 border-neutral-800">
          <TabsTrigger value="smtp" className="data-[state=active]:bg-neutral-800">
            <Settings className="h-4 w-4 mr-2" />
            SMTP Configuration
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-neutral-800">
            <FileText className="h-4 w-4 mr-2" />
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-neutral-800">
            <Mail className="h-4 w-4 mr-2" />
            Email Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="smtp" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>SMTP Server Settings</CardTitle>
              <CardDescription className="text-white/40">
                Configure your email server settings to send emails from the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="smtp.gmail.com"
                    className="bg-neutral-950 border-neutral-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    placeholder="587"
                    className="bg-neutral-950 border-neutral-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="bg-neutral-950 border-neutral-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Password</Label>
                  <Input
                    type="password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-neutral-950 border-neutral-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="invoice@allusedautoparts.world"
                    className="bg-neutral-950 border-neutral-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Your Company Name"
                    className="bg-neutral-950 border-neutral-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg border border-neutral-800">
                <div className="space-y-0.5">
                  <Label>Enable SSL/TLS</Label>
                  <div className="text-xs text-white/40">Use secure connection for SMTP</div>
                </div>
                <Switch checked={enableSsl} onCheckedChange={setEnableSsl} />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent">
                  Test Connection
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveSmtp}>
                  Save SMTP Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Send Test Email</CardTitle>
              <CardDescription className="text-white/40">
                Test your SMTP configuration by sending a test email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Recipient Email</Label>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleTestEmail}>
                <Send className="h-4 w-4 mr-2" />
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription className="text-white/40">
                Customize email templates for various system notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="bg-neutral-950 border-neutral-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {emailTemplates
                .filter((t) => t.id === selectedTemplate)
                .map((template) => (
                  <div key={template.id} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Template Name</Label>
                      <Input
                        value={template.name}
                        className="bg-neutral-950 border-neutral-800"
                        onChange={(e) => {
                          const updated = emailTemplates.map((t) =>
                            t.id === template.id ? { ...t, name: e.target.value } : t,
                          )
                          setEmailTemplates(updated)
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email Subject</Label>
                      <Input
                        value={template.subject}
                        className="bg-neutral-950 border-neutral-800"
                        onChange={(e) => {
                          const updated = emailTemplates.map((t) =>
                            t.id === template.id ? { ...t, subject: e.target.value } : t,
                          )
                          setEmailTemplates(updated)
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email Body</Label>
                      <Textarea
                        value={template.body}
                        rows={8}
                        className="bg-neutral-950 border-neutral-800 font-mono text-sm"
                        onChange={(e) => {
                          const updated = emailTemplates.map((t) =>
                            t.id === template.id ? { ...t, body: e.target.value } : t,
                          )
                          setEmailTemplates(updated)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-neutral-950 rounded-lg border border-neutral-800">
                      <div className="space-y-0.5">
                        <Label>Active Template</Label>
                        <div className="text-xs text-white/40">Enable this template for use</div>
                      </div>
                      <Switch
                        checked={template.active}
                        onCheckedChange={(checked) => {
                          const updated = emailTemplates.map((t) =>
                            t.id === template.id ? { ...t, active: checked } : t,
                          )
                          setEmailTemplates(updated)
                        }}
                      />
                    </div>

                    <div className="p-4 bg-blue-950/30 border border-blue-800/30 rounded-lg">
                      <div className="text-sm font-medium mb-2 text-blue-300">Available Variables:</div>
                      <div className="text-xs text-white/60 space-y-1">
                        <div>
                          <code className="bg-neutral-950 px-2 py-1 rounded">{"{{customer_name}}"}</code> - Customer's
                          full name
                        </div>
                        <div>
                          <code className="bg-neutral-950 px-2 py-1 rounded">{"{{order_id}}"}</code> - Order number
                        </div>
                        <div>
                          <code className="bg-neutral-950 px-2 py-1 rounded">{"{{total}}"}</code> - Order total amount
                        </div>
                        <div>
                          <code className="bg-neutral-950 px-2 py-1 rounded">{"{{tracking_number}}"}</code> - Shipping
                          tracking number
                        </div>
                        <div>
                          <code className="bg-neutral-950 px-2 py-1 rounded">{"{{reset_link}}"}</code> - Password reset
                          link
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="p-4 bg-blue-950/30 border border-blue-800/30 rounded-lg">
                <div className="text-sm font-medium mb-2 text-blue-300">Official Email Addresses:</div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>
                    <code className="bg-neutral-950 px-2 py-1 rounded">supports@allusedautoparts.world</code> - Customer
                    support inquiries
                  </div>
                  <div>
                    <code className="bg-neutral-950 px-2 py-1 rounded">invoice@allusedautoparts.world</code> - Order
                    confirmations & billing
                  </div>
                  <div>
                    <code className="bg-neutral-950 px-2 py-1 rounded">admin@allusedautoparts.world</code> - System
                    notifications & alerts
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent">
                  Preview Template
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveTemplate}>
                  Save Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Email Activity Log</CardTitle>
              <CardDescription className="text-white/40">
                View all sent, pending, and failed emails from the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search by recipient or subject..."
                    className="bg-neutral-950 border-neutral-800"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-neutral-950 border-neutral-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-800">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border border-neutral-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-950">
                      <tr className="text-left text-xs text-white/60">
                        <th className="p-3 font-medium">Recipient</th>
                        <th className="p-3 font-medium">Subject</th>
                        <th className="p-3 font-medium">Template</th>
                        <th className="p-3 font-medium">Status</th>
                        <th className="p-3 font-medium">Sent At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-neutral-950/50 transition-colors">
                          <td className="p-3 text-sm">{log.to}</td>
                          <td className="p-3 text-sm">{log.subject}</td>
                          <td className="p-3 text-sm text-white/60">{log.template}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(log.status)}
                              {getStatusBadge(log.status)}
                            </div>
                          </td>
                          <td className="p-3 text-sm text-white/60">{log.sentAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
