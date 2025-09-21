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
  const isEmail = communication.communicationType === "email"
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Communication Summary</span>
              <Badge variant="outline" className="text-xs">
                {isEmail ? "EMAIL" : isIncoming ? "INCOMING CALL" : "OUTGOING CALL"}
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
                <p>Comm ID - {communication.commId}</p>
                <p>Category: {communication.aiSummary?.split(" | ")[0] || "General"}</p>
                <p>Sub-Category: {communication.subcategory || communication.aiSummary?.split(" | ")[1] || "N/A"}</p>
                {communication.company && <p>Company: {communication.company}</p>}
                {communication.sourceId && <p>Source ID: {communication.sourceId}</p>}
                {communication.urgency && (
                  <Badge
                    variant="outline"
                    className={`text-xs mt-1 ${
                      communication.urgency >= 4
                        ? "border-red-500 text-red-500"
                        : communication.urgency >= 3
                          ? "border-blue-500 text-blue-500"
                          : "border-green-500 text-green-500"
                    }`}
                  >
                    Level {communication.urgency} Priority
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Summary:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{communication.summary || communication.aiSummary || "No summary available"}</p>

                {communication.tasks && communication.tasks.length > 0 && (
                  <div className="mt-3">
                    {communication.tasks.map((task: string, index: number) => (
                      <p key={index} className="font-medium">
                        {index + 1}st Task: {task}
                      </p>
                    ))}
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
