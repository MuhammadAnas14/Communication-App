"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const filterTabs = [
  { id: "all", label: "All", count: null },
  { id: "email", label: "Email", count: null },
  { id: "sms", label: "SMS", count: null },
  { id: "voice", label: "Voice", count: null },
  { id: "web", label: "Web", count: null },
  { id: "facebook", label: "Facebook", count: null },
  { id: "linkedin", label: "LinkedIn", count: null },
]

export function CommunicationFilters() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
      {filterTabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeFilter === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveFilter(tab.id)}
          className={cn(
            "h-8 px-3 text-sm",
            activeFilter === tab.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
          )}
        >
          {tab.label}
          {tab.count && (
            <span
              className={cn(
                "ml-2 px-1.5 py-0.5 text-xs rounded-full",
                activeFilter === tab.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600",
              )}
            >
              {tab.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  )
}
