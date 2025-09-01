"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TranscriptPopupProps {
  communication: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TranscriptPopup({ communication, open, onOpenChange }: TranscriptPopupProps) {
  if (!communication) return null

  const isIncoming = communication.type === "In"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Call Transcript</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {isIncoming ? "INCOMING CALL" : "OUTGOING CALL"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Comm ID: {communication.id}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-start text-sm text-gray-600">
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
                <strong>Duration:</strong> {communication.duration || "N/A"}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-3">Full Transcript:</h3>
            <ScrollArea className="h-[400px] w-full border rounded-md p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {communication.transcript || "No transcript available for this communication."}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
