"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface SuggestedReplyPopupProps {
  communication: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuggestedReplyPopup({ communication, open, onOpenChange }: SuggestedReplyPopupProps) {
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    setIsSending(true)
    // TODO: Implement send functionality
    console.log("[v0] Sending reply:", communication.suggested_reply)

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Reply functionality will be implemented in the next phase.")
    setIsSending(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (!communication) return null

  const suggestedReply = communication.suggested_reply || "No suggested reply available for this communication."

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Suggested Reply</span>
            <Badge variant="outline" className="text-xs">
              Comm ID: {communication.commId}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>
              <strong>Replying to:</strong> {communication.sourceId}
            </p>
            <p>
              <strong>Company:</strong> {communication.company}
            </p>
            <p>
              <strong>Original Message:</strong> {communication.aiSummary}
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-3">AI-Generated Reply:</h3>

            <ScrollArea className="h-[300px] w-full border rounded-md p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{suggestedReply}</div>
            </ScrollArea>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={isSending}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSend} disabled={isSending || !suggestedReply}>
              {isSending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
