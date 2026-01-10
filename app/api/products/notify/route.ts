import { NextResponse } from "next/server"
import { notifyNewProduct, type Product } from "@/lib/notifications"

export async function POST(request: Request) {
  const product: Product = await request.json()

  try {
    const result = await notifyNewProduct(product)
    return NextResponse.json({
      success: true,
      message: `Notified ${result.notificationsSent} customers`,
      ...result,
    })
  } catch (error) {
    console.error("Notification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send notifications",
      },
      { status: 500 },
    )
  }
}
