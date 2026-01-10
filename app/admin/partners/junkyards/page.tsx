"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Warehouse, Database, Truck, Pencil, Trash2, Upload, Download } from "lucide-react"

const INITIAL_YARDS = [
  {
    id: 1,
    name: "A1 Salvage & Recycling",
    contact: "Mike Smith",
    inventory: "12,450 parts",
    location: "Los Angeles, CA",
    system: "Hollander",
    status: "Connected",
    lastSync: "10 mins ago",
  },
  {
    id: 2,
    name: "City Auto Dismantlers",
    contact: "Sarah Jones",
    inventory: "8,200 parts",
    location: "San Diego, CA",
    system: "Pinnacle",
    status: "Syncing",
    lastSync: "Processing...",
  },
]

export default function AdminJunkYardsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("Junk Yard Partners")
  const [description, setDescription] = useState("Manage inventory feeds and yard integrations.")
  const [tempTitle, setTempTitle] = useState(title)
  const [tempDescription, setTempDescription] = useState(description)

  const [yards, setYards] = useState(INITIAL_YARDS)
  const [editingYard, setEditingYard] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleSave = () => {
    setTitle(tempTitle)
    setDescription(tempDescription)
    setIsEditing(false)
  }

  const handleEditYard = (yard: any) => {
    setEditingYard({ ...yard })
  }

  const handleSaveYard = () => {
    if (editingYard) {
      setYards(yards.map((y) => (y.id === editingYard.id ? editingYard : y)))
      setEditingYard(null)
    }
  }

  const handleDeleteYard = (id: number) => {
    setYards(yards.filter((y) => y.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const newYards = [
        ...yards,
        {
          id: yards.length + 1,
          name: "Imported Yard " + (yards.length + 1),
          contact: "Imported Contact",
          inventory: "0 parts",
          location: "Los Angeles, CA",
          system: "Generic",
          status: "Pending",
          lastSync: "Never",
        },
      ]
      setYards(newYards)
    }
  }

  const handleDownloadTemplate = () => {
    const csvContent =
      "Yard Name,Contact Name,Inventory Count,Location,System Type,Status\nSample Yard,John Doe,5000 parts,Los Angeles CA,Hollander,Connected"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "junkyard_template.csv"
    a.click()
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
            Integration Status
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Add Partner</Button>
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
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingYard} onOpenChange={() => setEditingYard(null)}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Junkyard Partner</DialogTitle>
          </DialogHeader>
          {editingYard && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Yard Name</Label>
                  <Input
                    value={editingYard.name}
                    onChange={(e) => setEditingYard({ ...editingYard, name: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    value={editingYard.contact}
                    onChange={(e) => setEditingYard({ ...editingYard, contact: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Inventory Size</Label>
                  <Input
                    value={editingYard.inventory}
                    onChange={(e) => setEditingYard({ ...editingYard, inventory: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editingYard.location}
                    onChange={(e) => setEditingYard({ ...editingYard, location: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>System Type</Label>
                  <Input
                    value={editingYard.system}
                    onChange={(e) => setEditingYard({ ...editingYard, system: e.target.value })}
                    className="bg-neutral-800 border-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    value={editingYard.status}
                    onChange={(e) => setEditingYard({ ...editingYard, status: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white"
                  >
                    <option value="Connected">Connected</option>
                    <option value="Syncing">Syncing</option>
                    <option value="Pending">Pending</option>
                    <option value="Disconnected">Disconnected</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingYard(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveYard} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-white/10">
          <TabsTrigger value="list">Yard List</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-xl border border-white/5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search yards by name, location, or system..."
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
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Yard Name</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Inventory Size</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">System</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Status</th>
                  <th className="h-12 px-4 text-left font-medium text-neutral-400">Last Sync</th>
                  <th className="h-12 px-4 text-right font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {yards.map((yard) => (
                  <tr key={yard.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold flex items-center gap-2">
                        <div className="bg-neutral-800 p-2 rounded-lg">
                          <Warehouse className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <div>{yard.name}</div>
                          <div className="text-xs text-neutral-500 font-normal">{yard.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 font-mono text-neutral-300">
                        <Database className="h-3 w-3" /> {yard.inventory}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-neutral-400">{yard.system}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          yard.status === "Connected"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {yard.status === "Connected" ? (
                          <Truck className="w-3 h-3 mr-1" />
                        ) : (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse" />
                        )}
                        {yard.status}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-400 text-xs">{yard.lastSync}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-white/10"
                          onClick={() => handleEditYard(yard)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-500/10 hover:text-blue-500"
                          onClick={() => handleDeleteYard(yard.id)}
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
              <h3 className="text-xl font-bold mb-2">Bulk Junkyard Upload</h3>
              <p className="text-neutral-400 text-sm">
                Upload a CSV file with junkyard partner data to add multiple yards at once.
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

              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-blue-500/50 transition-colors">
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="yard-upload" />
                <label htmlFor="yard-upload" className="cursor-pointer">
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
                    • <strong>Yard Name</strong>: Business name of the junkyard
                  </li>
                  <li>
                    • <strong>Contact Name</strong>: Primary contact person
                  </li>
                  <li>
                    • <strong>Inventory Count</strong>: Number of parts (e.g., "5000 parts")
                  </li>
                  <li>
                    • <strong>Location</strong>: City and state
                  </li>
                  <li>
                    • <strong>System Type</strong>: Hollander, Pinnacle, or Generic
                  </li>
                  <li>
                    • <strong>Status</strong>: Connected, Syncing, Pending, or Disconnected
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
