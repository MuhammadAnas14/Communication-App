"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface SuggestedReplyPopupProps {
  communication: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuggestedReplyPopup({ communication, open, onOpenChange }: SuggestedReplyPopupProps) {
  const [suggestedReply, setSuggestedReply] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestedReply = async () => {
    if (!communication?.commId) return

    setLoading(true)
    setError(null)

    try {
      const EMAIL_SERVICE_URL = process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL || "http://localhost:5001"
      const isV0Environment =
      EMAIL_SERVICE_URL ||
        (typeof window !== "undefined" && window.location.hostname.includes("vercel.app"))

      if (isV0Environment) {
        // Sample suggested reply for v0 environment
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
        setSuggestedReply(`Dear ${communication.endPoint || "Customer"},

Thank you for your email regarding ${communication.aiSummary?.split(" | ")[1]?.toLowerCase() || "your inquiry"}.

Based on your message, I understand that you're interested in our services. I'd be happy to help you with this matter.

Here are the next steps I recommend:
1. Schedule a brief call to discuss your specific requirements
2. Review our available solutions that match your needs
3. Provide you with a customized proposal

Would you be available for a 15-minute call this week to discuss this further?

Best regards,
Customer Success Team`)
      } else {
        const response = await fetch(
          `${EMAIL_SERVICE_URL}/api/suggested-reply/${encodeURIComponent(communication.commId)}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch suggested reply: ${response.status}`)
        }

        const data = await response.json()
        setSuggestedReply(data.suggestedReply || "No suggested reply available.")
      }
    } catch (err) {
      console.error("[v0] Error fetching suggested reply:", err)
      setError("Failed to generate suggested reply. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open && communication) {
      fetchSuggestedReply()
    }
  }, [open, communication])

  const handleSend = () => {
    // TODO: Implement send functionality
    console.log("[v0] Sending reply:", suggestedReply)
    alert("Reply functionality will be implemented in the next phase.")
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (!communication) return null

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

            {loading ? (
              <div className="flex items-center justify-center h-[300px] border rounded-md">
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating suggested reply...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-[300px] border rounded-md">
                <div className="text-center text-red-500">
                  <p>{error}</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={fetchSuggestedReply}>
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-[300px] w-full border rounded-md p-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{suggestedReply}</div>
              </ScrollArea>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSend} disabled={loading || error || !suggestedReply}>
              Send Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
