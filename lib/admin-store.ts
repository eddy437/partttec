import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AdminUser } from "./types"

interface AdminState {
  currentUser: AdminUser | null
  users: AdminUser[]
  setCurrentUser: (user: AdminUser | null) => void
  addUser: (user: AdminUser) => void
  updateUser: (id: string, updates: Partial<AdminUser>) => void
  deleteUser: (id: string) => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      currentUser: {
        id: "1",
        name: "Admin User",
        email: "admin@autoparts.world",
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
        lastActive: new Date().toISOString(),
        status: "active",
      },
      users: [
        {
          id: "1",
          name: "Admin User",
          email: "admin@autoparts.world",
          role: "admin",
          status: "active",
          lastActive: new Date().toISOString(),
        },
        {
          id: "2",
          name: "John Product",
          email: "john@autoparts.world",
          role: "product_manager",
          status: "active",
          lastActive: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Sarah Sales",
          email: "sarah@autoparts.world",
          role: "sales",
          status: "active",
          lastActive: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Mike Support",
          email: "mike@autoparts.world",
          role: "customer_support",
          status: "active",
          lastActive: new Date().toISOString(),
        },
      ],
      setCurrentUser: (user) => set({ currentUser: user }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...updates } : user)),
        })),
      deleteUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
    }),
    {
      name: "admin-storage",
    },
  ),
)
