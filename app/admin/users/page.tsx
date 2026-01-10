"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Shield, MoreHorizontal, XCircle, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"

// Mock data
const initialUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@allusedautoparts.world",
    role: "super_admin",
    department: "Management",
    status: "active",
    lastActive: "Now",
  },
  {
    id: "2",
    name: "Sarah Sales",
    email: "sarah@allusedautoparts.world",
    role: "sales",
    department: "Sales Team",
    status: "active",
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Mike Support",
    email: "mike@allusedautoparts.world",
    role: "customer_support",
    department: "Customer Service",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Dave Content",
    email: "dave@allusedautoparts.world",
    role: "content_manager",
    department: "Content",
    status: "offline",
    lastActive: "2 days ago",
  },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // New user form state
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", department: "" })

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast.error("Please fill in all required fields")
      return
    }

    setUsers([...users, { ...newUser, id: (users.length + 1).toString(), status: "active", lastActive: "Now" }])
    setIsDialogOpen(false)
    setNewUser({ name: "", email: "", role: "", department: "" })
    toast.success("User added successfully")
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
    toast.success("User removed")
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-white/60">Manage team access, roles, and permissions.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card className="bg-neutral-900 border-white/10 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search users..."
                className="pl-9 bg-white/5 border-white/10 text-white focus:border-red-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
                Filter by Role
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
                Status
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white/60">User</TableHead>
                <TableHead className="text-white/60">Role</TableHead>
                <TableHead className="text-white/60">Department</TableHead>
                <TableHead className="text-white/60">Status</TableHead>
                <TableHead className="text-white/60">Last Active</TableHead>
                <TableHead className="text-right text-white/60">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((user) => (
                  <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold border border-white/10">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-white/40">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20 capitalize">
                        {user.role.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-gray-500"}`}
                        />
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/60">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10 text-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                            <User className="mr-2 h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" /> Edit Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            className="hover:bg-red-500/20 text-red-500 cursor-pointer"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog for adding new user */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 hidden"
        style={{ display: isDialogOpen ? "flex" : "none" }}
      >
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Add New User</h2>
            <Button
              variant="ghost"
              className="text-white hover:text-neutral-400 p-0 h-auto"
              onClick={() => setIsDialogOpen(false)}
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white/80">
                Full Name
              </label>
              <Input
                id="name"
                className="bg-neutral-950 border-neutral-800 text-white focus:border-red-600"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                className="bg-neutral-950 border-neutral-800 text-white focus:border-red-600"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Department</label>
                <select
                  className="w-full h-10 px-3 rounded-md bg-neutral-950 border border-neutral-800 text-white focus:border-red-600 focus:outline-none"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                >
                  <option value="">Select Dept</option>
                  <option value="Sales">Sales</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Page Management">Page Management</option>
                  <option value="Buying">Buying</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">Role</label>
                <select
                  className="w-full h-10 px-3 rounded-md bg-neutral-950 border border-neutral-800 text-white focus:border-red-600 focus:outline-none"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-800 bg-transparent"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleAddUser}>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
