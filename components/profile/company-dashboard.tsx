"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CommunicationLogTable } from "@/components/communication-log/communication-log-table"
import { Phone, Mail, Globe, Settings, ChevronDown, User } from "lucide-react"

export function CompanyDashboard() {
  const [showCallNotification, setShowCallNotification] = useState(true)

  const engagementMetrics = [
    { title: "Web", value: "85%", color: "bg-red-500" },
    { title: "Phone", value: "92%", color: "bg-red-500" },
    { title: "Email", value: "78%", color: "bg-red-500" },
    { title: "Phone", value: "88%", color: "bg-red-500" },
  ]

  const businessMetrics = [
    { title: "Engagement Score", value: "8.5" },
    { title: "Transactions", value: "24" },
    { title: "Elasticity Score", value: "7.2" },
  ]

  return (
    <div className="flex gap-6 p-6 max-w-full">
      {/* Left Sidebar */}
      <div className="w-80 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Greenbuild Inc.</CardTitle>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Landscaping
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Horticulture
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Tools
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-600">
              <div>123 Pine St. Trimming P4N 6A2</div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4" />
                705-264-1111
                <Badge className="bg-orange-100 text-orange-800 text-xs">Primary</Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="h-4 w-4" />
                www.greenbuild.com
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                info@greenbuild.com
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Connections</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="bg-gray-50 p-2 rounded text-sm">
                <div className="font-medium">Sarah Lee</div>
                <div className="text-gray-600">Direct Line: 705-264-2111</div>
                <div className="text-gray-600">Cell # 705-264-3456</div>
                <div className="text-gray-600">Email: sarahlee@greenbuild.com</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-3">
              <label className="text-sm font-medium block mb-2">Description</label>
              <Textarea placeholder="Client description goes here..." className="text-sm" rows={3} />
            </div>

            <div className="flex gap-2">
              <Button variant="link" className="text-blue-600 p-0 h-auto">
                Transaction History
              </Button>
              <Button variant="link" className="text-blue-600 p-0 h-auto">
                Sentiment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Business Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full mb-2 bg-transparent">
              Behavioural Data
            </Button>
            <div className="space-y-2">
              <div className="h-8 bg-gray-100 rounded"></div>
              <div className="h-8 bg-gray-100 rounded"></div>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full bg-transparent">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm">
              <div className="font-medium mb-2">recommendations</div>
              <div className="text-gray-600">based on engagement what they are looking how can we close the deal</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center Content */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Engagement</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {engagementMetrics.map((metric, index) => (
              <Card key={index} className={`${metric.color} text-white`}>
                <CardContent className="p-4">
                  <div className="text-sm opacity-90">{metric.title}</div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {businessMetrics.map((metric, index) => (
              <Card key={index} className="bg-gray-100">
                <CardContent className="p-4 text-center">
                  <div className="text-sm text-gray-600">{metric.title}</div>
                  <div className="text-xl font-semibold">{metric.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">All Communication History</h2>
          <CommunicationLogTable />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80">
        {showCallNotification && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Sarah Lee is Calling...</div>
                <div className="font-semibold">Greenbuild Inc.</div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Answer</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Dismiss
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Transfer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
