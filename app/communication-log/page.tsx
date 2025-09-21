"use client"

import { useState } from "react"
import { CommunicationLogTable } from "@/components/communication-log/communication-log-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CommunicationLogPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const handleFilterChange = (filter: string) => {
    console.log("[v0] Filter changed to:", filter)
    setActiveFilter(filter)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Communication Log</h1>
          <p className="text-sm text-gray-500">Recent updates to keep you informed and in control</p>
        </div>
      </div>

      <CommunicationLogTable
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange} // Pass the filter change handler
        onFilterUpdate={(callCount, emailCount) => {
          // Filter counts are handled within the table component
        }}
      />
    </div>
  )
}
