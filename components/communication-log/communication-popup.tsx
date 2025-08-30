"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CommunicationPopupProps {
  communication: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommunicationPopup({ communication, open, onOpenChange }: CommunicationPopupProps) {
  if (!communication) return null

  const isIncoming = communication.type === "In"
  const isEmail = communication.icon === "email"

  return (
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
              <p className="text-xs text-gray-500">06-01-25 | 02:12:03</p>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>Comm ID - {communication.id}</p>
              <p>Category: {communication.category}</p>
              <p>Sub-Category: {communication.subCategory}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Summary:</p>
            {isEmail ? (
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <p>
                    <strong>Email Address:</strong> sarahlee@gmail.com
                  </p>
                  <p>
                    <strong>Subject Line:</strong> Demo Link and Appointment time
                  </p>
                  <p>
                    <strong>Body:</strong>
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p>Hello Sarah,</p>
                  <p>
                    As per our conversation see demo link and as we discuss I will book a appointment at 10am at the
                    office.
                  </p>
                  <p className="text-blue-600 underline">https://company.com/crm/book</p>
                  <p className="mt-2">Looking forward to see you</p>
                  <p>If you have any question just fire me a shout</p>
                </div>
                <p className="text-sm">
                  <strong>Task:</strong> AI has to update the CRM & Engagement Score
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Sarah Lee called regarding the new AI-powered roofing estimator. Mark explained the features and
                  offered to send a demo link and will send a appointment time to early Friday morning.
                </p>

                <div className="mt-3">
                  <p className="font-medium">1st Task: Check Mark's Schedule for opening Friday morning</p>
                  <p className="font-medium">2nd Task: Book appointment</p>
                  <p className="font-medium">3rd Task: Send email demo link and appointment time</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
