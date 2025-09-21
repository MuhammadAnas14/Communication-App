"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { SuggestedReplyPopup } from "./suggested-reply-popup"

interface TranscriptPopupProps {
  communication: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TranscriptPopup({ communication, open, onOpenChange }: TranscriptPopupProps) {
  const [suggestedReplyOpen, setSuggestedReplyOpen] = useState(false)

  if (!communication) return null

  const isIncoming = communication.type === "In"
  const isEmail = communication.communicationType === "email"

  const handleViewSuggestedReply = () => {
    setSuggestedReplyOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] w-[90vw] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{isEmail ? "Email" : "Call"} Transcript</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {isEmail ? "EMAIL" : isIncoming ? "INCOMING CALL" : "OUTGOING CALL"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Comm ID: {communication.commId}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            <div className="flex-shrink-0 flex justify-between items-start text-sm text-gray-600">
              <div>
                <p>
                  <strong>Date:</strong> {communication.date}
                </p>
                <p>
                  <strong>Source ID:</strong> {communication.sourceId}
                </p>
              </div>
              <div className="text-right">
                <p>
                  <strong>Company:</strong> {communication.company}
                </p>
                <p>
                  <strong>{isEmail ? "Type" : "Duration"}:</strong>{" "}
                  {isEmail ? "Email" : communication.duration || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 border-t pt-4">
  <h3 className="text-sm font-medium mb-3 flex-shrink-0">
    Full {isEmail ? "Email" : "Transcript"}:
  </h3>
  <div className="flex-1 min-h-0 border rounded-md bg-gray-50">
    <div className="h-full max-h-[400px] overflow-y-auto">
      <div className="p-4">
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {communication.transcript ||
            `No ${isEmail ? "email content" : "transcript"} available for this communication.`}
        </div>
      </div>
    </div>
  </div>
</div>


            <div className="flex-shrink-0 flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              {isEmail && (
                <Button size="sm" onClick={handleViewSuggestedReply}>
                  Suggested Reply
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isEmail && (
        <SuggestedReplyPopup
          communication={communication}
          open={suggestedReplyOpen}
          onOpenChange={setSuggestedReplyOpen}
        />
      )}
    </>
  )
}
