import { NextResponse } from "next/server"
import { getSubscriptions, addSubscription, removeSubscription, updateSubscription } from "@/lib/notifications"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")

  const subscriptions = getSubscriptions(customerId || undefined)
  return NextResponse.json(subscriptions)
}

export async function POST(request: Request) {
  const body = await request.json()
  const subscription = addSubscription(body)
  return NextResponse.json(subscription)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  const success = removeSubscription(id)
  return NextResponse.json({ success })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  const subscription = updateSubscription(id, updates)
  return NextResponse.json(subscription)
}
