"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, User, Loader2, Minimize2, Mic, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function AutomotiveChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AUW Auto Parts specialist. Need help finding an engine, transmission, or have questions about fitment? Ask me anything!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupported("speechSynthesis" in window && "webkitSpeechRecognition" in window)
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window && isVoiceEnabled) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()

    if (lowerMsg.includes("engine") || lowerMsg.includes("motor")) {
      return "We have a wide selection of quality used engines! Our engines come with a 90-day warranty standard, with options for extended coverage. What year, make, and model are you looking for? I can help you find the perfect match with guaranteed fitment."
    }
    if (lowerMsg.includes("transmission") || lowerMsg.includes("trans")) {
      return "Looking for a transmission? We carry automatic and manual transmissions for most makes and models. All our transmissions are tested and come with warranty. What vehicle do you need a transmission for?"
    }
    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
      return "Pricing varies based on part type, year, and mileage. Engines typically range from $800-$3,500 and transmissions from $600-$2,500. We offer three mileage tiers: Economy (80-100K), Standard (50-80K), and Premium (under 50K). Would you like a specific quote?"
    }
    if (lowerMsg.includes("warranty") || lowerMsg.includes("guarantee")) {
      return "All our parts come with warranty protection! Standard warranty is 90 days, with options for 6-month and 1-year extended coverage. Premium tier parts come with 6-month warranty included. We stand behind every part we sell."
    }
    if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
      return "We offer fast nationwide shipping! Standard shipping is 3-5 business days, express is 1-2 days. Free shipping on orders over $500. We also offer local pickup from our Houston warehouse. Need an exact shipping quote?"
    }
    if (lowerMsg.includes("fitment") || lowerMsg.includes("fit") || lowerMsg.includes("compatible")) {
      return "Fitment is guaranteed on all our parts! Just provide your VIN or Year/Make/Model and we'll verify compatibility before shipping. If a part doesn't fit, we'll make it right with free returns."
    }
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      return "Hello! Welcome to AUW - All Used Auto Parts World. I'm here to help you find quality used auto parts. What can I help you with today? Engines, transmissions, or something else?"
    }
    if (lowerMsg.includes("contact") || lowerMsg.includes("phone") || lowerMsg.includes("call")) {
      return "You can reach us at 1-800-528-9978 or email sales@allusedautoparts.world. Our team is available Monday-Saturday 8am-6pm CST. You can also use our Get Quote form for a fast response!"
    }

    return "Thanks for your question! For the best assistance, please provide your vehicle's Year, Make, and Model, and the specific part you need. I can help with engines, transmissions, transfer cases, differentials, and more. You can also call us at 1-800-528-9978 for immediate help."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 800))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateAIResponse(userMessage.content),
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)

    if (isVoiceEnabled) {
      speakText(aiResponse.content)
    }
  }

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) return

    const SpeechRecognition = (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }
    recognition.onerror = () => setIsListening(false)

    recognition.start()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 z-40 w-[380px] h-[500px] bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image src="/mechanic-chatbot-logo.png" alt="AUW" width={44} height={44} className="object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AUW Parts Assistant</h3>
            <p className="text-xs text-white/70">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {supported && (
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isVoiceEnabled ? "bg-white/20 text-white" : "text-white/60 hover:text-white",
              )}
              title={isVoiceEnabled ? "Disable voice" : "Enable voice"}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/mechanic-chatbot-logo.png" alt="AUW" width={32} height={32} className="object-cover" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  message.role === "user"
                    ? "bg-red-600 text-white rounded-br-md"
                    : "bg-zinc-800 text-zinc-100 rounded-bl-md",
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-zinc-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/mechanic-chatbot-logo.png" alt="AUW" width={32} height={32} className="object-cover" />
              </div>
              <div className="bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
        <div className="flex gap-2">
          {supported && (
            <button
              type="button"
              onClick={startListening}
              disabled={isListening}
              className={cn(
                "p-2.5 rounded-xl transition-colors",
                isListening ? "bg-red-600 text-white animate-pulse" : "bg-zinc-800 text-zinc-400 hover:text-white",
              )}
            >
              <Mic className="h-5 w-5" />
            </button>
          )}
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about parts, fitment, pricing..."
            className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
