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

const getIcon = (type: string) => {
  const iconClass = "h-4 w-4"

  if (type === "Out") {
    return <Mail className={iconClass} />
  } else {
    return <Phone className={iconClass} />
  }
}

export function CommunicationLogTable() {
  const [selectedCommunication, setSelectedCommunication] = useState<any>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [callData, setCallData] = useState<CallData[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"api" | "sample">("sample")

  useEffect(() => {
    const fetchCalls = async () => {
      const API_URL = "http://127.0.0.1:5000"
      const isV0Environment =
        !API_URL || (typeof window !== "undefined" && window.location.hostname.includes("vercel.app"))

      if (isV0Environment) {
        setCallData(sampleCallData)
        setDataSource("sample")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/api/calls`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Fetched calls:", data.calls)
        setCallData(data.calls || [])
        setDataSource("api")
      } catch (err) {
        console.error("Error fetching calls:", err)
        setCallData(sampleCallData)
        setDataSource("sample")
      } finally {
        setLoading(false)
      }
    }

    fetchCalls()
  }, [])

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
              📋 Showing sample communication data - Connect Python backend to see real call logs
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
                      {getIcon(item.type)}
                      <span className="text-sm text-gray-900">{item.type}</span>
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
                      {item.aiSummary} | Summary
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
