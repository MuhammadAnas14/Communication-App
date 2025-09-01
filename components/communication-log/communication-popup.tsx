"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TranscriptPopup } from "./transcipt-popup"

interface CommunicationPopupProps {
  communication: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommunicationPopup({ communication, open, onOpenChange }: CommunicationPopupProps) {
  const [transcriptOpen, setTranscriptOpen] = useState(false)

  if (!communication) return null

  const isIncoming = communication.type === "In"
  const isEmail = communication.icon === "email"

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Sample Summary (POP UP)</span>
              <Badge variant="outline" className="text-xs">
                {isIncoming ? "INCOMING CALL" : "OUTGOING EMAIL"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">AI Summary:</p>
                <p className="text-xs text-gray-500">{communication.date}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Comm ID - {communication.id}</p>
                <p>Category: {communication.category || "Sales"}</p>
                <p>Sub-Category: {communication.subCategory || (isIncoming ? "Inquiry/Demo" : "Book/Demo")}</p>
                {communication.company && <p>Company: {communication.company}</p>}
                {communication.sourceId && <p>Source ID: {communication.sourceId}</p>}
                {communication.urgency && (
                  <Badge
                    variant="outline"
                    className={`text-xs mt-1 ${
                      communication.urgency === "High"
                        ? "border-red-500 text-red-500"
                        : communication.urgency === "Medium"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-green-500 text-green-500"
                    }`}
                  >
                    {communication.urgency} Priority
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Summary:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{communication.aiSummary || communication.summary || "No summary available"}</p>

                {communication.tasks && communication.tasks.length > 0 && (
                  <div className="mt-3">
                    {communication.tasks.map((task: string, index: number) => (
                      <p key={index} className="font-medium">
                        {index + 1}st Task: {task}
                      </p>
                    ))}
                  </div>
                )}

                {isEmail && communication.emailDetails && (
                  <div className="space-y-2">
                    {communication.emailDetails.subject && (
                      <p>
                        <strong>Subject Line:</strong> {communication.emailDetails.subject}
                      </p>
                    )}
                    {communication.emailDetails.body && (
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <p>{communication.emailDetails.body}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {communication.disposition && (
              <div className="border-t pt-3">
                <p className="text-sm font-medium">
                  Disposition: <span className="font-normal">{communication.disposition}</span>
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button size="sm" onClick={() => setTranscriptOpen(true)}>
                View Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TranscriptPopup communication={communication} open={transcriptOpen} onOpenChange={setTranscriptOpen} />
    </>
  )
}
