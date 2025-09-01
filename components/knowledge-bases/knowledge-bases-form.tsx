"use client"

import type React from "react"
import { useState } from "react"
import { Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FileUploadSectionProps {
  title: string
  description: string
  onFileUpload: (files: FileList) => void
}

interface ProcessingStep {
  name: string
  description: string
  completed: boolean
  progress?: number
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

function ProcessingModal({
  isOpen,
  onClose,
  fileName,
  steps,
}: {
  isOpen: boolean
  onClose: () => void
  fileName: string
  steps: ProcessingStep[]
}) {
  const completedSteps = steps.filter((step) => step.completed).length
  const totalSteps = steps.length
  const overallProgress = (completedSteps / totalSteps) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Processing (auto-chunking)
            <div className="text-sm text-gray-500">Progress</div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Progress value={overallProgress} className="w-full" />

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${step.completed ? "bg-blue-500" : "bg-gray-300"}`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{step.name}</div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-sm font-medium">Enable Semantic Re-Chunking</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SuccessModal({
  isOpen,
  onClose,
  fileName,
}: {
  isOpen: boolean
  onClose: () => void
  fileName: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <div className="text-center py-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Successful!</h3>
          <p className="text-gray-600 mb-4">Your file "{fileName}" has been uploaded and processed successfully.</p>
          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function KnowledgeBasesForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentFileName, setCurrentFileName] = useState("")
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([])
  const [chunkProgress, setChunkProgress] = useState({ current: 0, total: 48 })

  const uploadToBackend = async (file: File, type: "general" | "specific") => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/kb_sync`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Upload error:", error)
      throw error
    }
  }

  const simulateProcessing = () => {
    const steps: ProcessingStep[] = [
      { name: "Auto-Chunking", description: "0 of 48 chunks completed", completed: false },
      { name: "Content Extraction", description: "Extracting tables, images, headings", completed: false },
      { name: "Entity Recognition", description: "Identifying key entities, dates, locations", completed: false },
      { name: "Indexing for Search", description: "Indexing completed", completed: false },
    ]

    setProcessingSteps(steps)
    setChunkProgress({ current: 0, total: 48 })

    const chunkInterval = setInterval(() => {
      setChunkProgress((prev) => {
        const newCurrent = Math.min(prev.current + 1, prev.total)

        setProcessingSteps((currentSteps) =>
          currentSteps.map((step, index) =>
            index === 0 ? { ...step, description: `${newCurrent} of ${prev.total} chunks completed` } : step,
          ),
        )

        if (newCurrent >= prev.total) {
          clearInterval(chunkInterval)
        }

        return { ...prev, current: newCurrent }
      })
    }, 10000 / 48)

    steps.forEach((_, index) => {
      setTimeout(
        () => {
          setProcessingSteps((prev) => prev.map((step, i) => (i <= index ? { ...step, completed: true } : step)))

          if (index === steps.length - 1) {
            setTimeout(() => {
              setIsProcessing(false)
              setShowSuccess(true)
            }, 2000)
          }
        },
        (index + 1) * 10000,
      )
    })
  }

  const handleGeneralUpload = async (files: FileList) => {
    const file = files[0]
    setCurrentFileName(file.name)
    setIsProcessing(true)

    try {
      simulateProcessing()
      await uploadToBackend(file, "general")
      console.log("[v0] General knowledge file uploaded:", file.name)
    } catch (error) {
      console.error("[v0] Upload failed:", error)
      setIsProcessing(false)
    }
  }

  const handleSpecificUpload = async (files: FileList) => {
    const file = files[0]
    setCurrentFileName(file.name)
    setIsProcessing(true)

    try {
      simulateProcessing()
      await uploadToBackend(file, "specific")
      console.log("[v0] Specific knowledge file uploaded:", file.name)
    } catch (error) {
      console.error("[v0] Upload failed:", error)
      setIsProcessing(false)
    }
  }

  return (
    <>
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

      <ProcessingModal isOpen={isProcessing} onClose={() => {}} fileName={currentFileName} steps={processingSteps} />

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} fileName={currentFileName} />
    </>
  )
}
