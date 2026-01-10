import { type CoreMessage, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    // This manually constructs a stream chunk compatible with the AI SDK client
    // 0: indicates a text part
    const errorMessage =
      "System Notification: The OpenAI API Key is missing. Please add it in the Vars section sidebar."
    return new Response(`0:${JSON.stringify(errorMessage)}\n`, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Vercel-AI-Data-Stream": "v1" },
    })
  }

  try {
    const result = await streamText({
      model: openai("gpt-4o"),
      system:
        "You are a helpful automotive parts specialist assistant for AUTOPARTS. You help customers find used engines, transmissions, and other auto parts. You are knowledgeable, professional, and concise. Your goal is to help the user find the right part or answer questions about shipping, warranty, and returns. If you don't know the answer, ask them to contact support at support@allusedautoparts.world.",
      messages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(`0:${JSON.stringify("An error occurred while connecting to the AI service.")}\n`, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Vercel-AI-Data-Stream": "v1" },
    })
  }
}
