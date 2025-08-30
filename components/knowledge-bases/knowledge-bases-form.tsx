"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadSectionProps {
  title: string
  description: string
  onFileUpload: (files: FileList) => void
}

function FileUploadSection({ title, description, onFileUpload }: FileUploadSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileUpload(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files)
    }
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-200">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{description}</p>

        <div
          className={`border-2 border-dashed rounded-lg p-12 transition-colors ${
            isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop files here</p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Upload files
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function KnowledgeBasesForm() {
  const handleGeneralUpload = (files: FileList) => {
    console.log(
      "[v0] General knowledge files uploaded:",
      Array.from(files).map((f) => f.name),
    )
    // Handle general knowledge file upload
  }

  const handleSpecificUpload = (files: FileList) => {
    console.log(
      "[v0] Specific knowledge files uploaded:",
      Array.from(files).map((f) => f.name),
    )
    // Handle specific knowledge file upload
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <FileUploadSection
        title="General Knowledge"
        description="Shared across clients"
        onFileUpload={handleGeneralUpload}
      />
      <FileUploadSection
        title="Specific Knowledge"
        description="Client-or sector-specific"
        onFileUpload={handleSpecificUpload}
      />
    </div>
  )
}
