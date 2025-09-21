"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CommunicationFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  callCount: number
  emailCount: number
}

const filterTabs = [
  { id: "all", label: "All", count: null },
  { id: "email", label: "Email", count: 0 }, // Will be updated dynamically
  { id: "sms", label: "SMS", count: 0 }, // No data available
  { id: "voice", label: "Voice", count: 0 }, // Will be updated dynamically
  { id: "web", label: "Web", count: 0 }, // No data available
  { id: "facebook", label: "Facebook", count: 0 }, // No data available
  { id: "linkedin", label: "LinkedIn", count: 0 }, // No data available
]

export function CommunicationFilters({
  activeFilter,
  onFilterChange,
  callCount,
  emailCount,
}: CommunicationFiltersProps) {
  const updatedFilterTabs = filterTabs.map((tab) => {
    if (tab.id === "voice") return { ...tab, count: callCount }
    if (tab.id === "email") return { ...tab, count: emailCount }
    if (tab.id === "all") return { ...tab, count: callCount + emailCount }
    return tab
  })

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
      {updatedFilterTabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeFilter === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(tab.id)}
          className={cn(
            "h-8 px-3 text-sm",
            activeFilter === tab.id
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
          )}
        >
          {tab.label}
          {tab.count !== null && tab.count > 0 && (
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
