"use client"

import { useState } from "react"
import { Bot, Save, Plus, Trash2, MessageSquare, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function ChatbotAdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState({
    enabled: true,
    model: "gpt-4o",
    systemPrompt:
      "You are a helpful automotive parts specialist assistant for AUTOPARTS. You help customers find used engines, transmissions, and other auto parts. You are knowledgeable, professional, and concise. Your goal is to help the user find the right part or answer questions about shipping, warranty, and returns.",
    welcomeMessage:
      "Hello! I'm your AUTOPARTS specialist. Need help finding an engine, transmission, or have questions about fitment? Ask me anything!",
    suggestions: [
      "Do you have engines for a 2015 Honda Civic?",
      "What is your warranty policy?",
      "How much is shipping to California?",
      "Do you sell transmissions?",
    ],
  })

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Chatbot configuration saved successfully")
    }, 1000)
  }

  const addSuggestion = () => {
    setConfig({
      ...config,
      suggestions: [...config.suggestions, ""],
    })
  }

  const updateSuggestion = (index: number, value: string) => {
    const newSuggestions = [...config.suggestions]
    newSuggestions[index] = value
    setConfig({ ...config, suggestions: newSuggestions })
  }

  const removeSuggestion = (index: number) => {
    const newSuggestions = config.suggestions.filter((_, i) => i !== index)
    setConfig({ ...config, suggestions: newSuggestions })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">AI Chatbot Configuration</h1>
          <p className="text-neutral-400">Manage your AI assistant's behavior, prompt, and suggested questions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-white border-white/10 hover:bg-white/5 bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
            {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-neutral-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-red-500" />
                Core Settings
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Configure the fundamental behavior of your AI assistant.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
                <div className="space-y-0.5">
                  <Label className="text-white">Enable Chatbot</Label>
                  <p className="text-sm text-neutral-400">Turn the AI assistant on or off for your customers.</p>
                </div>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={(c) => setConfig({ ...config, enabled: c })}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">System Prompt</Label>
                <p className="text-xs text-neutral-500 mb-2">
                  This is the "brain" of your AI. Instructions here determine how it behaves, what it knows, and how it
                  speaks.
                </p>
                <Textarea
                  value={config.systemPrompt}
                  onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                  className="min-h-[200px] bg-black/20 border-white/10 text-white font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Welcome Message</Label>
                <Input
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Guiding Suggestions
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Manage the suggested questions that appear when a user opens the chat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.suggestions.map((suggestion, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={suggestion}
                    onChange={(e) => updateSuggestion(index, e.target.value)}
                    className="bg-black/20 border-white/10 text-white"
                    placeholder="Enter a suggested question..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSuggestion(index)}
                    className="text-neutral-400 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addSuggestion}
                className="w-full border-dashed border-white/20 text-neutral-400 hover:text-white hover:bg-white/5 bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Suggestion
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview / Sidebar */}
        <div className="space-y-6">
          <Card className="bg-neutral-900 border-white/10 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Live Preview</CardTitle>
              <CardDescription className="text-neutral-400">See how your changes look in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-red-600 p-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="text-white text-xs font-bold">AUTOPARTS Assistant</div>
                </div>
                <div className="p-3 h-[300px] bg-neutral-900/50 flex flex-col gap-3 overflow-hidden relative">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-neutral-800 text-neutral-200 text-xs p-2 rounded-lg rounded-tl-none max-w-[85%]">
                      {config.welcomeMessage}
                    </div>
                  </div>

                  <div className="mt-auto space-y-2">
                    <div className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Suggested:</div>
                    <div className="flex flex-wrap gap-2">
                      {config.suggestions.map(
                        (s, i) =>
                          s && (
                            <button
                              key={i}
                              className="text-[10px] bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 rounded-full px-3 py-1 transition-colors text-left"
                            >
                              {s}
                            </button>
                          ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-neutral-800 bg-neutral-950">
                  <div className="h-8 bg-neutral-900 rounded border border-neutral-800 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
