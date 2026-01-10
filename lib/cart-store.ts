"use client"

import { useState, useEffect } from "react"

export interface CartItem {
  productId: string
  product: {
    id: string
    name: string
    price: number
    image?: string
    make?: string
    model?: string
    year?: string
  }
  mileageOption: {
    label: string
    price: number
    miles: string
    warranty: string
  }
  quantity: number
}

// Global cart state
let cartItems: CartItem[] = []
const listeners: Set<() => void> = new Set()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

function saveToStorage() {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart-storage", JSON.stringify({ state: { items: cartItems } }))
  }
}

function loadFromStorage() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cart-storage")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        cartItems = parsed.state?.items || []
      } catch {
        cartItems = []
      }
    }
  }
}

// Initialize on load
loadFromStorage()

function getState() {
  return {
    items: cartItems,

    addItem: (product: any, mileageOption: any, quantity = 1) => {
      const existingIndex = cartItems.findIndex((item) => item.productId === product.id)
      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += quantity
      } else {
        cartItems.push({ productId: product.id, product, mileageOption, quantity })
      }
      cartItems = [...cartItems]
      saveToStorage()
      notifyListeners()
    },

    removeItem: (productId: string) => {
      cartItems = cartItems.filter((item) => item.productId !== productId)
      saveToStorage()
      notifyListeners()
    },

    updateQuantity: (productId: string, quantity: number) => {
      const item = cartItems.find((item) => item.productId === productId)
      if (item) {
        item.quantity = quantity
        cartItems = [...cartItems]
        saveToStorage()
        notifyListeners()
      }
    },

    clearCart: () => {
      cartItems = []
      saveToStorage()
      notifyListeners()
    },

    getTotal: () => cartItems.reduce((total, item) => total + item.mileageOption.price * item.quantity, 0),

    getItemCount: () => cartItems.reduce((count, item) => count + item.quantity, 0),
  }
}

export function useCartStore<T>(selector: (state: ReturnType<typeof getState>) => T): T {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    // Load from storage on mount
    loadFromStorage()
    forceUpdate((n) => n + 1)

    // Subscribe to changes
    const unsubscribe = listeners.add(() => forceUpdate((n) => n + 1))
    return () => {
      listeners.delete(() => forceUpdate((n) => n + 1))
    }
  }, [])

  return selector(getState())
}

// Also export the store directly for non-hook usage
export const cartStore = {
  init: () => {
    loadFromStorage()
  },
  getItems: () => cartItems,
  addItem: getState().addItem,
  removeItem: getState().removeItem,
  updateQuantity: getState().updateQuantity,
  clearCart: getState().clearCart,
  getTotal: getState().getTotal,
  getItemCount: getState().getItemCount,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}
