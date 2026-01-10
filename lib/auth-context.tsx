"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

interface Order {
  id: string
  orderNumber: string
  date: Date
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
  trackingNumber?: string
  estimatedDelivery?: Date
}

interface AuthContextType {
  user: User | null
  orders: Order[]
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      loadOrders(JSON.parse(savedUser).id)
    }
    setIsLoading(false)
  }, [])

  const loadOrders = (userId: string) => {
    // Mock orders - in production, fetch from API
    const mockOrders: Order[] = [
      {
        id: "1",
        orderNumber: "ORD-2024-001",
        date: new Date("2024-01-15"),
        status: "delivered",
        items: [
          {
            id: "1",
            name: "Premium Brake Pads - Front Set",
            quantity: 1,
            price: 89.99,
            image: "/brake-pads-close-up.png",
          },
        ],
        total: 89.99,
        trackingNumber: "1Z999AA10123456784",
        estimatedDelivery: new Date("2024-01-18"),
      },
      {
        id: "2",
        orderNumber: "ORD-2024-002",
        date: new Date("2024-01-20"),
        status: "shipped",
        items: [
          {
            id: "2",
            name: "LED Headlight Assembly",
            quantity: 2,
            price: 249.99,
            image: "/led-headlight.jpg",
          },
        ],
        total: 499.98,
        trackingNumber: "1Z999AA10123456785",
        estimatedDelivery: new Date("2024-01-25"),
      },
      {
        id: "3",
        orderNumber: "ORD-2024-003",
        date: new Date("2024-01-22"),
        status: "processing",
        items: [
          {
            id: "3",
            name: "Air Filter Element",
            quantity: 1,
            price: 34.99,
            image: "/air-filter.png",
          },
        ],
        total: 34.99,
      },
    ]
    setOrders(mockOrders)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Mock login - in production, call API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "user-123",
      email,
      name: email.split("@")[0],
      createdAt: new Date(),
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    loadOrders(mockUser.id)
    setIsLoading(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    // Mock signup - in production, call API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setOrders([])
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    setOrders([])
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, orders, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
