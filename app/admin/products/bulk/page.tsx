"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function BulkUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (
      file.type === "text/csv" ||
      file.type.includes("spreadsheet") ||
      file.name.endsWith(".csv") ||
      file.name.endsWith(".xlsx")
    ) {
      setFile(file)
    } else {
      toast.error("Please upload a CSV or Excel file")
    }
  }

  const handleUpload = () => {
    if (!file) return
    setUploading(true)

    // Simulate upload progress
    let p = 0
    const interval = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setUploading(false)
        setCompleted(true)
        toast.success(`Successfully processed ${file.name}`)
      }
    }, 200)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bulk Product Import</h1>
          <p className="text-neutral-400">Upload CSV or Excel files to update inventory</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline" className="border-neutral-700 hover:bg-neutral-800 text-white bg-transparent">
            Cancel
          </Button>
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
        {!completed ? (
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-neutral-700 hover:border-neutral-600 bg-neutral-950"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Drag & Drop your file here</h3>
                  <p className="text-neutral-400 mb-6">Supported formats: .CSV, .XLSX</p>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleChange}
                      accept=".csv,.xlsx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors"
                    >
                      Browse Files
                    </label>
                  </div>
                  <p className="text-xs text-neutral-500 mt-6">
                    <a href="#" className="text-blue-400 hover:underline">
                      Download sample template
                    </a>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{file.name}</h3>
                  <p className="text-neutral-400 mb-6">{(file.size / 1024).toFixed(2)} KB</p>

                  {uploading ? (
                    <div className="w-full max-w-md">
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-neutral-400 text-center">Processing... {progress}%</p>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setFile(null)}
                        className="border-neutral-700 text-white hover:bg-neutral-800"
                      >
                        Remove
                      </Button>
                      <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
                        Start Import
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-4">
              <AlertCircle className="h-6 w-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-400 mb-1">Import Guidelines</h4>
                <ul className="text-sm text-blue-300/80 list-disc list-inside space-y-1">
                  <li>Ensure SKU column is unique for each product</li>
                  <li>Images must be public URLs or hosted paths</li>
                  <li>Price columns should be numeric values only</li>
                  <li>Maximum 5,000 rows per upload</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Import Successful!</h2>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto">
              We successfully processed <span className="text-white font-bold">{file?.name}</span>. 142 products have
              been created and 35 updated.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setCompleted(false)
                }}
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                Upload Another
              </Button>
              <Link href="/admin/products">
                <Button className="bg-blue-600 hover:bg-blue-700">View Inventory</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
