"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Wrench, Mail, MapPin, Pencil, Upload, Download, Trash2 } from "lucide-react"

const INITIAL_MECHANICS = [
  {
    id: 1,
    name: "Elite Auto Repair",
    contact: "John Smith",
    email: "john@eliteauto.com",
    phone: "(310) 555-0123",
    location: "Beverly Hills, CA",
    status: "Active",
    rating: 4.9,
    joined: "Oct 2024",
  },
  {
    id: 2,
    name: "Joe's Master Mechanics",
    contact: "Joe Miller",
    email: "joe@joesgarage.com",
    phone: "(310) 555-0199",
    location: "Beverly Hills, CA",
    status: "Pending",
    rating: 4.7,
    joined: "Nov 2024",
  },
]

export default function AdminMechanicsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("Mechanic Partners")
  const [description, setDescription] = useState("Manage registered mechanics and verification status.")
  const [tempTitle, setTempTitle] = useState(title)
  const [tempDescription, setTempDescription] = useState(description)
  const [mechanics, setMechanics] = useState(INITIAL_MECHANICS)
  const [editingMechanic, setEditingMechanic] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate parsing CSV and adding mechanics
      const newMechanics = [
        ...mechanics,
        {
          id: mechanics.length + 1,
          name: "Imported Shop " + (mechanics.length + 1),
          contact: "Imported Contact",
          email: "imported@example.com",
          phone: "(555) 555-5555",
          location: "Los Angeles, CA",
          status: "Pending",
          rating: 0,
          joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        },
      ]
      setMechanics(newMechanics)
    }
  }

  const handleDownloadTemplate = () => {
    const csvContent =
      "Shop Name,Contact Name,Email,Phone,Location,Status\nSample Shop,John Doe,john@example.com,(555) 555-5555,Los Angeles CA,Active"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mechanic_template.csv"
    a.click()
  }

  const handleEditMechanic = (mechanic: any) => {
    setEditingMechanic({ ...mechanic })
  }

  const handleSaveMechanic = () => {
    if (editingMechanic) {
      setMechanics(mechanics.map((m) => (m.id === editingMechanic.id ? editingMechanic : m)))
      setEditingMechanic(null)
    }
  }

  const handleDeleteMechanic = (id: number) => {
    setMechanics(mechanics.filter((m) => m.id !== id))
  }

  const handleSave = () => {
    setTitle(tempTitle)
    setDescription(tempDescription)
    setIsEditing(false)
  }

  return (
    <div className="p-8 space-y-8 bg-neutral-950 min-h-screen text-white">
      <div className="flex items-center justify-between">
        <div className="group relative pr-10">
          <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 text-white/60" />
            </Button>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">{title}</h1>
          <p className="text-neutral-400">{description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-neutral-800 text-white hover:bg-neutral-900 bg-transparent">
            Export List
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">Invite Mechanic</Button>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit Page Header</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingMechanic} onOpenChange={() => setEditingMechanic(null)}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Mechanic Partner</DialogTitle>
          </DialogHeader>
          {editingMechanic && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Shop Name</Label>
                  <Input
                    value={editingMechanic.name}
                    onChange={(e) => setEditingMechanic({ ...editingMechanic, name: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    value={editingMechanic.contact}
                    onChange={(e) => setEditingMechanic({ ...editingMechanic, contact: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={editingMechanic.email}
                    onChange={(e) => setEditingMechanic({ ...editingMechanic, email: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={editingMechanic.phone}
                    onChange={(e) => setEditingMechanic({ ...editingMechanic, phone: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editingMechanic.location}
                    onChange={(e) => setEditingMechanic({ ...editingMechanic, location: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    value={editingMechanic.status}
                    onChange={(e) => setEditingMechanic({ ...editingMechanic, status: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingMechanic(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMechanic} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-white/10">
          <TabsTrigger value="list">Mechanic List</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-xl border border-white/5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search mechanics by name, email, or location..."
                className="pl-9 bg-neutral-900 border-neutral-800 text-white"
              />
            </div>
            <Button
              variant="outline"
              className="border-neutral-800 text-neutral-400 gap-2 hover:text-white bg-transparent"
            >
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="border border-white/10 rounded-xl overflow-hidden bg-neutral-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Shop Name</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Contact</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Location</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Status</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Rating</th>
                  <th className="h-12 px-4 text-right font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map((mechanic) => (
                  <tr key={mechanic.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold flex items-center gap-2">
                        <div className="bg-neutral-800 p-2 rounded-lg">
                          <Wrench className="h-4 w-4 text-red-500" />
                        </div>
                        {mechanic.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{mechanic.contact}</div>
                      <div className="text-xs text-neutral-500 flex items-center gap-2 mt-1">
                        <Mail className="h-3 w-3" /> {mechanic.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-neutral-300">
                        <MapPin className="h-3 w-3" /> {mechanic.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          mechanic.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {mechanic.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold">{mechanic.rating}/5.0</div>
                      <div className="text-xs text-neutral-500">Since {mechanic.joined}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-white/10"
                          onClick={() => handleEditMechanic(mechanic)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-500/10 hover:text-red-500"
                          onClick={() => handleDeleteMechanic(mechanic.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <div className="border border-white/10 rounded-xl bg-neutral-900 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Bulk Mechanic Upload</h3>
              <p className="text-neutral-400 text-sm">
                Upload a CSV file with mechanic partner data to add multiple shops at once.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-neutral-800 text-white hover:bg-neutral-800 bg-transparent gap-2"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="h-4 w-4" />
                  Download CSV Template
                </Button>
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-red-500/50 transition-colors">
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="mechanic-upload" />
                <label htmlFor="mechanic-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-neutral-500" />
                  <p className="text-white font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-neutral-500 text-sm">CSV files only (MAX. 10MB)</p>
                  {uploadedFile && <p className="text-green-500 text-sm mt-4">Uploaded: {uploadedFile.name}</p>}
                </label>
              </div>

              <div className="bg-neutral-800/50 p-6 rounded-xl space-y-3">
                <h4 className="font-bold text-sm">CSV Format Requirements:</h4>
                <ul className="text-sm text-neutral-400 space-y-2">
                  <li>
                    • <strong>Shop Name</strong>: Business name of the mechanic shop
                  </li>
                  <li>
                    • <strong>Contact Name</strong>: Primary contact person
                  </li>
                  <li>
                    • <strong>Email</strong>: Business email address
                  </li>
                  <li>
                    • <strong>Phone</strong>: Contact phone number
                  </li>
                  <li>
                    • <strong>Location</strong>: City and state
                  </li>
                  <li>
                    • <strong>Status</strong>: Active, Pending, or Suspended
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
