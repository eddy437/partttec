"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 4000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 min-w-[300px] animate-in slide-in-from-right ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
                ? "bg-red-600"
                : toast.type === "warning"
                  ? "bg-amber-600"
                  : "bg-slate-800"
          }`}
        >
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-white/70 hover:text-white">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    // Return a no-op if not in provider
    return {
      toast: (message: string, type?: ToastType) => console.log(`Toast: ${message}`),
      success: (message: string) => console.log(`Success: ${message}`),
      error: (message: string) => console.log(`Error: ${message}`),
      info: (message: string) => console.log(`Info: ${message}`),
      warning: (message: string) => console.log(`Warning: ${message}`),
    }
  }
  return {
    toast: (message: string, type?: ToastType) => context.addToast(message, type),
    success: (message: string) => context.addToast(message, "success"),
    error: (message: string) => context.addToast(message, "error"),
    info: (message: string) => context.addToast(message, "info"),
    warning: (message: string) => context.addToast(message, "warning"),
  }
}

// Simple toast function that works without context
let globalAddToast: ((message: string, type?: ToastType) => void) | null = null

export function setGlobalToast(fn: (message: string, type?: ToastType) => void) {
  globalAddToast = fn
}

export const toast = {
  success: (message: string) => globalAddToast?.(message, "success") ?? console.log(`Success: ${message}`),
  error: (message: string) => globalAddToast?.(message, "error") ?? console.log(`Error: ${message}`),
  info: (message: string) => globalAddToast?.(message, "info") ?? console.log(`Info: ${message}`),
  warning: (message: string) => globalAddToast?.(message, "warning") ?? console.log(`Warning: ${message}`),
  message: (message: string) => globalAddToast?.(message, "info") ?? console.log(`Toast: ${message}`),
}
