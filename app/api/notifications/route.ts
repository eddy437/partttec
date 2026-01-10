import { NextResponse } from "next/server"
import {
  getNotifications,
  createNotification,
  markNotificationRead,
  getNotificationStats,
  sendBulkNotification,
} from "@/lib/notifications"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")
  const stats = searchParams.get("stats")

  if (stats === "true") {
    return NextResponse.json(getNotificationStats())
  }

  const notifications = getNotifications(customerId || undefined)
  return NextResponse.json(notifications)
}

export async function POST(request: Request) {
  const body = await request.json()

  if (body.action === "mark_read") {
    const success = markNotificationRead(body.id)
    return NextResponse.json({ success })
  }

  if (body.action === "bulk") {
    const result = await sendBulkNotification(body.type, body.title, body.message, body.filters)
    return NextResponse.json(result)
  }

  const notification = createNotification(body)
  return NextResponse.json(notification)
}
