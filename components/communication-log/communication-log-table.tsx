"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Phone, Mail, ArrowRight } from "lucide-react"
import { CommunicationPopup } from "./communication-popup"

interface CallData {
  id: string
  date: string
  type: string
  sourceId: string
  endPoint: string
  company: string
  disposition: string
  urgency: number
  aiSummary: string
  commId: string
  transcript: string
  subcategory: string
  communicationType?: "call" | "email" // Added to distinguish between calls and emails
}

interface CommunicationLogTableProps {
  sourceId?: string | null
}

const sampleCallData: CallData[] = [
  {
    id: "COMM-001234",
    date: "06-01 09:33PM",
    type: "In",
    sourceId: "+1 (705) 998-6135",
    endPoint: "AI Agent",
    company: "Greenbuild Inc.",
    disposition: "AI Resolved",
    urgency: 4,
    aiSummary: "Sales | Inquiry",
    commId: "COMM-001234",
    transcript:
      "Customer called asking about roofing services and pricing for a new construction project. Discussed timeline and provided initial quote.",
    subcategory: "Inquiry/Demo",
    communicationType: "call" as const,
  },
  {
    id: "COMM-002456",
    date: "06-02 11:15AM",
    type: "Out",
    sourceId: "sarah@greenbuild.com",
    endPoint: "Sarah Lee",
    company: "Greenbuild Inc.",
    disposition: "Delivered",
    urgency: 3,
    aiSummary: "Sales | Follow-up",
    commId: "COMM-002456",
    transcript: "Follow-up email sent with detailed pricing information and project timeline for the roofing project.",
    subcategory: "Follow-up",
    communicationType: "email" as const,
  },
  {
    id: "COMM-003789",
    date: "06-03 02:30PM",
    type: "In",
    sourceId: "+1 (416) 555-0123",
    endPoint: "AI Agent",
    company: "BuildCore Ltd.",
    disposition: "Transfer + VM",
    urgency: 5,
    aiSummary: "Support | Technical Issue",
    commId: "COMM-003789",
    transcript:
      "Customer reported issues with recent installation and requested immediate assistance. Transferred to technical support team.",
    subcategory: "Technical Issue",
    communicationType: "call" as const,
  },
  {
    id: "COMM-004567",
    date: "06-04 09:45AM",
    type: "In",
    sourceId: "Emily Cruz",
    endPoint: "AI Agent",
    company: "EcoHomes Ltd.",
    disposition: "Msg & Route",
    urgency: 2,
    aiSummary: "Sales | Pricing",
    commId: "COMM-004567",
    transcript: "Inquiry about eco-friendly building materials and sustainable construction options.",
    subcategory: "Pricing/Demo",
    communicationType: "call" as const,
  },
  {
    id: "COMM-005678",
    date: "06-05 03:20PM",
    type: "In",
    sourceId: "Daniel Kwan",
    endPoint: "AI Agent",
    company: "PureBuild Inc.",
    disposition: "AI Resolved",
    urgency: 3,
    aiSummary: "Sales | Deliver",
    commId: "COMM-005678",
    transcript: "Customer satisfied with service delivery and provided positive feedback on recent project completion.",
    subcategory: "Deliver/Demo",
    communicationType: "call" as const,
  },
  {
    id: "COMM-006789",
    date: "06-06 11:30AM",
    type: "Out",
    sourceId: "info@greenbuild.com",
    endPoint: "Patrick Lee",
    company: "NovaConstruct",
    disposition: "Delivered",
    urgency: 4,
    aiSummary: "Sales | Deposit",
    commId: "COMM-006789",
    transcript: "Deposit request email sent for upcoming construction project with payment terms and schedule.",
    subcategory: "Deposit/Demo",
    communicationType: "email" as const,
  },
  {
    id: "COMM-007890",
    date: "06-07 04:15PM",
    type: "In",
    sourceId: "(587) 444-8899",
    endPoint: "AI Agent",
    company: "",
    disposition: "Hung Up",
    urgency: 2,
    aiSummary: "Sales | Referral",
    commId: "COMM-007890",
    transcript: "Brief call, customer hung up after initial greeting. Possible wrong number or cold call.",
    subcategory: "Referral/Demo",
    communicationType: "call" as const,
  },
  {
    id: "COMM-008901",
    date: "06-08 10:00AM",
    type: "In",
    sourceId: "Carla Santos",
    endPoint: "Bobby deck",
    company: "EcoHomes Ltd.",
    disposition: "Transfer + VM",
    urgency: 3,
    aiSummary: "Sales | Book",
    commId: "COMM-008901",
    transcript: "Customer wants to book consultation for green building project. Transferred to booking specialist.",
    subcategory: "Book/Demo",
    communicationType: "call" as const,
  },
]

const sampleEmailData: CallData[] = [
  {
    id: "EMAIL-001",
    date: "06-01 08:15AM",
    type: "Email",
    sourceId: "john.doe@techcorp.com",
    endPoint: "John Doe",
    company: "TechCorp Inc.",
    disposition: "Delivered",
    urgency: 3,
    aiSummary: "Sales | Inquiry",
    commId: "EMAIL-001",
    transcript: "Inquiry about our enterprise software solutions and pricing for 100+ users.",
    subcategory: "Inquiry",
    communicationType: "email" as const,
  },
  {
    id: "EMAIL-002",
    date: "06-02 02:30PM",
    type: "Email",
    sourceId: "support@buildtech.com",
    endPoint: "BuildTech Support",
    company: "BuildTech Solutions",
    disposition: "Delivered",
    urgency: 4,
    aiSummary: "Support | Technical Issue",
    commId: "EMAIL-002",
    transcript: "Urgent technical issue with API integration causing service disruption.",
    subcategory: "Technical Issue",
    communicationType: "email" as const,
  },
  {
    id: "EMAIL-003",
    date: "06-03 11:45AM",
    type: "Email",
    sourceId: "mary.smith@greenbuild.com",
    endPoint: "Mary Smith",
    company: "Greenbuild Inc.",
    disposition: "Delivered",
    urgency: 2,
    aiSummary: "Sales | Follow-up",
    commId: "EMAIL-003",
    transcript: "Thank you for the demo yesterday. We'd like to proceed with the implementation.",
    subcategory: "Follow-up",
    communicationType: "email" as const,
  },
]

const getUrgencyColor = (urgency: number) => {
  if (urgency >= 4) return "bg-red-500"
  if (urgency >= 3) return "bg-blue-500"
  if (urgency >= 2) return "bg-green-500"
  return "bg-gray-500"
}

const getUrgencyLevel = (urgency: number) => {
  return `Level ${urgency}`
}

const getIcon = (type: string, communicationType?: "call" | "email") => {
  const iconClass = "h-4 w-4"

  if (communicationType === "email" || type === "Email") {
    return <Mail className={iconClass} />
  } else if (type === "Out") {
    return <Mail className={iconClass} />
  } else {
    return <Phone className={iconClass} />
  }
}

export function CommunicationLogTable({ sourceId }: CommunicationLogTableProps) {
  const [selectedCommunication, setSelectedCommunication] = useState<any>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [callData, setCallData] = useState<CallData[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"api" | "sample">("sample")

  console.log("[v0] CommunicationLogTable - received sourceId prop:", sourceId)

  const normalizeSourceId = (id: string): string => {
    // Remove all non-alphanumeric characters and convert to lowercase
    return id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  }

  const sourceIdsMatch = (id1: string, id2: string): boolean => {
    const normalized1 = normalizeSourceId(id1)
    const normalized2 = normalizeSourceId(id2)

    // Check exact match first
    if (normalized1 === normalized2) return true

    // Check if one contains the other (for partial matches)
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true

    return false
  }

  const fetchEmails = async (sourceId?: string | null): Promise<CallData[]> => {
    const EMAIL_SERVICE_URL = "http://51.210.255.18:5001"
    const isV0Environment =
    EMAIL_SERVICE_URL ||
      (typeof window !== "undefined" && window.location.hostname.includes("vercel.app"))

    if (!isV0Environment) {
      console.log("[v0] Using sample email data - email service not configured")
      const filteredEmails = sourceId
        ? sampleEmailData.filter((email) => {
            const matches = sourceIdsMatch(email.sourceId, sourceId)
            console.log("[v0] Email comparing:", email.sourceId, "with", sourceId, "matches:", matches)
            return matches
          })
        : sampleEmailData

      console.log("[v0] Filtered sample email data count:", filteredEmails.length)
      return filteredEmails
    }

    try {
      const endpoint = sourceId ? `/api/emails/${encodeURIComponent(sourceId)}` : "/api/emails"
      console.log("[v0] Fetching emails from:", `${EMAIL_SERVICE_URL}${endpoint}`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout for email service

      const response = await fetch(`${EMAIL_SERVICE_URL}${endpoint}`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.log("[v0] Email API response not ok:", response.status, response.statusText)
        throw new Error(`Email service error: ${response.status}`)
      }

      const emailData = await response.json()
      console.log("[v0] Email data received:", emailData)

      // Transform email data to match CallData interface
      return emailData.map((email: any) => ({
        id: email.commId || `COMM-${String(email.id).padStart(6, "0")}`,
        date: email.timestamp || "Unknown Date",
        type: "In",
        sourceId: email.phone || email.sourceId || email.email,
        endPoint: email.person_name || "Email System",
        company: email.companyName || "",
        disposition: email.status || "Delivered",
        urgency: email.urgency_gpt || email.urgency || 1,
        aiSummary: `${email.category_gpt || email.category || "General"} | ${email.subcat_gpt || email.subcategory || "Email"}`,
        summary: email.summary,
        commId: email.commId || `COMM-${String(email.id).padStart(6, "0")}`,
        transcript: email.transcript || email.body || email.subject || "",
        subcategory: email.subcat_gpt || email.subcategory || "Email",
        communicationType: "email" as const,
      }))
    } catch (error) {
      console.error("[v0] Error fetching emails:", error)
      console.log("[v0] Falling back to sample email data")

      const filteredEmails = sourceId
        ? sampleEmailData.filter((email) => sourceIdsMatch(email.sourceId, sourceId))
        : sampleEmailData

      console.log("[v0] Using sample email fallback, filtered count:", filteredEmails.length)
      return filteredEmails
    }
  }

  const fetchCalls = async (sourceId?: string | null): Promise<CallData[]> => {
    const API_URL = "http://51.210.255.18:5000"
    const isV0Environment =
      !API_URL || (typeof window !== "undefined" && window.location.hostname.includes("vercel.app"))

    if (isV0Environment) {
      const filteredData = sourceId
        ? sampleCallData.filter((call) => {
            const matches = sourceIdsMatch(call.sourceId, sourceId)
            console.log("[v0] Comparing:", call.sourceId, "with", sourceId, "matches:", matches)
            return matches
          })
        : sampleCallData

      console.log("[v0] Filtered call data count:", filteredData.length)
      return filteredData.map((call) => ({ ...call, communicationType: "call" as const }))
    }

    try {
      const endpoint = sourceId ? `/api/calls/${encodeURIComponent(sourceId)}` : "/api/calls"
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      console.log("[v0] Fetching calls from:", `${API_URL}${endpoint}`)

      const response = await fetch(`${API_URL}${endpoint}`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.log("[v0] Call API response not ok:", response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Call API data received:", data)
      return (data.calls || []).map((call: any) => ({ ...call, communicationType: "call" as const }))
    } catch (err) {
      console.error("[v0] Error fetching calls:", err)
      const filteredData = sourceId
        ? sampleCallData.filter((call) => sourceIdsMatch(call.sourceId, sourceId))
        : sampleCallData
      console.log("[v0] Using sample call data fallback, filtered count:", filteredData.length)
      return filteredData.map((call) => ({ ...call, communicationType: "call" as const }))
    }
  }

  useEffect(() => {
    console.log("[v0] CommunicationLogTable useEffect triggered with sourceId:", sourceId)

    const fetchAllCommunications = async () => {
      setLoading(true)

      try {
        const [calls, emails] = await Promise.all([fetchCalls(sourceId), fetchEmails(sourceId)])

        console.log("[v0] Fetched calls:", calls.length)
        console.log("[v0] Fetched emails:", emails.length)

        const allCommunications = [...calls, ...emails].sort((a, b) => {
          // Convert date strings to comparable format for sorting
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return dateB - dateA // Most recent first
        })

        console.log("[v0] Combined communications count:", allCommunications.length)
        setCallData(allCommunications)

        const hasRealCallData = calls.some((call) => !sampleCallData.includes(call))
        const hasRealEmailData = emails.some((email) => !sampleEmailData.includes(email))
        const hasRealData = hasRealCallData || hasRealEmailData
        setDataSource(hasRealData ? "api" : "sample")
      } catch (error) {
        console.error("[v0] Error fetching communications:", error)
        // Fallback to sample data
        const filteredData = sourceId
          ? sampleCallData.filter((call) => sourceIdsMatch(call.sourceId, sourceId))
          : sampleCallData
        setCallData(filteredData.map((call) => ({ ...call, communicationType: "call" as const })))
        setDataSource("sample")
      } finally {
        setLoading(false)
      }
    }

    fetchAllCommunications()
  }, [sourceId]) // Ensure sourceId is in dependency array

  const handleSummaryClick = (communication: any) => {
    setSelectedCommunication(communication)
    setPopupOpen(true)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-gray-500">Loading communication logs...</div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {dataSource === "sample" && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
            <div className="text-blue-800 text-sm">
              📋 Showing {sourceId ? `filtered sample data for ${sourceId}` : "sample communication data"} - Connect
              Python backend (port 5000) and email service (port 5001) to see real communication logs
              {sourceId && (
                <span className="ml-2 text-xs">
                  (Debug: sourceId="{sourceId}", matches={callData.length})
                </span>
              )}
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Point
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">(1)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">(2)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disposition
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Summary
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comm ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {callData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getIcon(item.type, item.communicationType)}
                      <span className="text-sm text-gray-900">
                        {item.communicationType === "email" ? "Email" : item.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.sourceId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      {item.endPoint}
                      {item.endPoint.includes("→") && <ArrowRight className="h-3 w-3" />}
                    </div>
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.company}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.disposition}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", getUrgencyColor(item.urgency))}></div>
                      <span className="text-xs text-gray-500">{getUrgencyLevel(item.urgency)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => handleSummaryClick(item)}
                    >
                      Summary
                    </Button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.commId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CommunicationPopup communication={selectedCommunication} open={popupOpen} onOpenChange={setPopupOpen} />
    </>
  )
}
