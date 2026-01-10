// Notification Service - Central hub for all notifications
// Handles email, SMS, and push notifications to customers

export type NotificationType = "email" | "sms" | "push" | "in-app"
export type NotificationTrigger =
  | "new_product"
  | "price_drop"
  | "back_in_stock"
  | "order_update"
  | "shipping_update"
  | "promotion"
  | "newsletter"

export interface Subscription {
  id: string
  customerId: string
  customerEmail: string
  customerPhone?: string
  customerName: string
  type: "brand" | "category" | "part" | "make" | "model"
  value: string // e.g., "Toyota", "Engine", "Transmission"
  channels: NotificationType[]
  createdAt: Date
  active: boolean
}

export interface Notification {
  id: string
  customerId: string
  type: NotificationTrigger
  title: string
  message: string
  channels: NotificationType[]
  status: "pending" | "sent" | "failed" | "read"
  productId?: string
  orderId?: string
  createdAt: Date
  sentAt?: Date
  readAt?: Date
}

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  make: string
  model: string
  year: string
  price: number
  condition: string
  image?: string
}

// In-memory store (replace with database in production)
const subscriptions: Subscription[] = []
const notifications: Notification[] = []
const notificationQueue: Notification[] = []

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// SUBSCRIPTION MANAGEMENT
export function addSubscription(sub: Omit<Subscription, "id" | "createdAt" | "active">): Subscription {
  const newSub: Subscription = {
    ...sub,
    id: generateId(),
    createdAt: new Date(),
    active: true,
  }
  subscriptions.push(newSub)
  return newSub
}

export function getSubscriptions(customerId?: string): Subscription[] {
  if (customerId) {
    return subscriptions.filter((s) => s.customerId === customerId && s.active)
  }
  return subscriptions.filter((s) => s.active)
}

export function removeSubscription(id: string): boolean {
  const index = subscriptions.findIndex((s) => s.id === id)
  if (index > -1) {
    subscriptions[index].active = false
    return true
  }
  return false
}

export function updateSubscription(id: string, updates: Partial<Subscription>): Subscription | null {
  const index = subscriptions.findIndex((s) => s.id === id)
  if (index > -1) {
    subscriptions[index] = { ...subscriptions[index], ...updates }
    return subscriptions[index]
  }
  return null
}

// NOTIFICATION MANAGEMENT
export function createNotification(notif: Omit<Notification, "id" | "createdAt" | "status">): Notification {
  const newNotif: Notification = {
    ...notif,
    id: generateId(),
    createdAt: new Date(),
    status: "pending",
  }
  notifications.push(newNotif)
  notificationQueue.push(newNotif)
  return newNotif
}

export function getNotifications(customerId?: string): Notification[] {
  if (customerId) {
    return notifications
      .filter((n) => n.customerId === customerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function markNotificationRead(id: string): boolean {
  const notif = notifications.find((n) => n.id === id)
  if (notif) {
    notif.status = "read"
    notif.readAt = new Date()
    return true
  }
  return false
}

export function getUnreadCount(customerId: string): number {
  return notifications.filter((n) => n.customerId === customerId && n.status !== "read").length
}

// FIND MATCHING SUBSCRIPTIONS FOR A PRODUCT
export function findMatchingSubscriptions(product: Product): Subscription[] {
  return subscriptions.filter((sub) => {
    if (!sub.active) return false

    switch (sub.type) {
      case "brand":
        return product.brand.toLowerCase() === sub.value.toLowerCase()
      case "category":
        return product.category.toLowerCase() === sub.value.toLowerCase()
      case "part":
        return product.name.toLowerCase().includes(sub.value.toLowerCase())
      case "make":
        return product.make.toLowerCase() === sub.value.toLowerCase()
      case "model":
        return product.model.toLowerCase() === sub.value.toLowerCase()
      default:
        return false
    }
  })
}

// NOTIFY CUSTOMERS WHEN NEW PRODUCT IS UPLOADED
export async function notifyNewProduct(product: Product): Promise<{
  notificationsSent: number
  emailsSent: number
  smsSent: number
  pushSent: number
  customers: string[]
}> {
  const matchingSubs = findMatchingSubscriptions(product)

  // Group subscriptions by customer to avoid duplicate notifications
  const customerMap = new Map<string, Subscription[]>()
  matchingSubs.forEach((sub) => {
    const existing = customerMap.get(sub.customerId) || []
    customerMap.set(sub.customerId, [...existing, sub])
  })

  let emailsSent = 0
  let smsSent = 0
  let pushSent = 0
  const notifiedCustomers: string[] = []

  for (const [customerId, subs] of customerMap) {
    const firstSub = subs[0]
    const channels = [...new Set(subs.flatMap((s) => s.channels))]

    // Create notification
    const notification = createNotification({
      customerId,
      type: "new_product",
      title: `New ${product.category} Available!`,
      message: `${product.name} for ${product.year} ${product.make} ${product.model} is now available at $${product.price}. ${product.condition} condition.`,
      channels,
      productId: product.id,
    })

    // Simulate sending through different channels
    if (channels.includes("email")) {
      await sendEmail(firstSub.customerEmail, notification.title, notification.message, product)
      emailsSent++
    }
    if (channels.includes("sms") && firstSub.customerPhone) {
      await sendSMS(firstSub.customerPhone, notification.message)
      smsSent++
    }
    if (channels.includes("push")) {
      await sendPush(customerId, notification.title, notification.message)
      pushSent++
    }

    // Mark as sent
    notification.status = "sent"
    notification.sentAt = new Date()
    notifiedCustomers.push(firstSub.customerName)
  }

  return {
    notificationsSent: customerMap.size,
    emailsSent,
    smsSent,
    pushSent,
    customers: notifiedCustomers,
  }
}

// SEND EMAIL (simulated - integrate with real email service like SendGrid, Resend, etc.)
async function sendEmail(to: string, subject: string, body: string, product?: Product): Promise<boolean> {
  console.log(`[EMAIL] Sending to ${to}:`, { subject, body, product })
  // In production, integrate with:
  // - SendGrid: await sendgrid.send({ to, from, subject, html })
  // - Resend: await resend.emails.send({ to, from, subject, html })
  // - AWS SES, Mailgun, etc.
  return true
}

// SEND SMS (simulated - integrate with Twilio, etc.)
async function sendSMS(to: string, message: string): Promise<boolean> {
  console.log(`[SMS] Sending to ${to}:`, message)
  // In production, integrate with:
  // - Twilio: await twilio.messages.create({ to, from, body: message })
  return true
}

// SEND PUSH NOTIFICATION (simulated)
async function sendPush(userId: string, title: string, body: string): Promise<boolean> {
  console.log(`[PUSH] Sending to user ${userId}:`, { title, body })
  // In production, integrate with:
  // - Firebase Cloud Messaging
  // - OneSignal
  // - Web Push API
  return true
}

// BULK NOTIFICATION (for promotions, newsletters, etc.)
export async function sendBulkNotification(
  type: NotificationTrigger,
  title: string,
  message: string,
  filters?: { brands?: string[]; categories?: string[]; makes?: string[] },
): Promise<{ sent: number; failed: number }> {
  let targetSubs = subscriptions.filter((s) => s.active)

  if (filters) {
    targetSubs = targetSubs.filter((sub) => {
      if (filters.brands && sub.type === "brand") {
        return filters.brands.includes(sub.value)
      }
      if (filters.categories && sub.type === "category") {
        return filters.categories.includes(sub.value)
      }
      if (filters.makes && sub.type === "make") {
        return filters.makes.includes(sub.value)
      }
      return true
    })
  }

  let sent = 0
  let failed = 0

  // Group by customer
  const customerMap = new Map<string, Subscription>()
  targetSubs.forEach((sub) => {
    if (!customerMap.has(sub.customerId)) {
      customerMap.set(sub.customerId, sub)
    }
  })

  for (const [customerId, sub] of customerMap) {
    try {
      createNotification({
        customerId,
        type,
        title,
        message,
        channels: sub.channels,
      })

      if (sub.channels.includes("email")) {
        await sendEmail(sub.customerEmail, title, message)
      }
      sent++
    } catch {
      failed++
    }
  }

  return { sent, failed }
}

// GET NOTIFICATION STATS
export function getNotificationStats() {
  const total = notifications.length
  const sent = notifications.filter((n) => n.status === "sent").length
  const pending = notifications.filter((n) => n.status === "pending").length
  const failed = notifications.filter((n) => n.status === "failed").length
  const read = notifications.filter((n) => n.status === "read").length

  const byType = {
    new_product: notifications.filter((n) => n.type === "new_product").length,
    price_drop: notifications.filter((n) => n.type === "price_drop").length,
    back_in_stock: notifications.filter((n) => n.type === "back_in_stock").length,
    order_update: notifications.filter((n) => n.type === "order_update").length,
    shipping_update: notifications.filter((n) => n.type === "shipping_update").length,
    promotion: notifications.filter((n) => n.type === "promotion").length,
    newsletter: notifications.filter((n) => n.type === "newsletter").length,
  }

  return {
    total,
    sent,
    pending,
    failed,
    read,
    byType,
    totalSubscriptions: subscriptions.filter((s) => s.active).length,
  }
}

// Initialize with some demo subscriptions
export function initDemoData() {
  if (subscriptions.length === 0) {
    // Demo subscriptions
    const demoSubs: Omit<Subscription, "id" | "createdAt" | "active">[] = [
      {
        customerId: "cust-1",
        customerEmail: "john@example.com",
        customerPhone: "+1234567890",
        customerName: "John Smith",
        type: "brand",
        value: "Toyota",
        channels: ["email", "push"],
      },
      {
        customerId: "cust-1",
        customerEmail: "john@example.com",
        customerPhone: "+1234567890",
        customerName: "John Smith",
        type: "category",
        value: "Engine",
        channels: ["email"],
      },
      {
        customerId: "cust-2",
        customerEmail: "sarah@example.com",
        customerPhone: "+1987654321",
        customerName: "Sarah Johnson",
        type: "make",
        value: "Honda",
        channels: ["email", "sms"],
      },
      {
        customerId: "cust-2",
        customerEmail: "sarah@example.com",
        customerPhone: "+1987654321",
        customerName: "Sarah Johnson",
        type: "category",
        value: "Transmission",
        channels: ["email", "sms", "push"],
      },
      {
        customerId: "cust-3",
        customerEmail: "mike@example.com",
        customerName: "Mike Williams",
        type: "brand",
        value: "Ford",
        channels: ["email"],
      },
      {
        customerId: "cust-4",
        customerEmail: "emma@example.com",
        customerPhone: "+1555555555",
        customerName: "Emma Davis",
        type: "make",
        value: "BMW",
        channels: ["email", "push"],
      },
      {
        customerId: "cust-5",
        customerEmail: "david@example.com",
        customerName: "David Brown",
        type: "category",
        value: "Brakes",
        channels: ["email"],
      },
    ]

    demoSubs.forEach((sub) => addSubscription(sub))
  }
}

// Call init on module load
initDemoData()
