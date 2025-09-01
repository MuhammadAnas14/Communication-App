"use client"

import { useEffect } from "react"
import { useProfile } from "../app/contexts/profile-contexts"   

export function CallListener() {
  const { openProfile } = useProfile()

  useEffect(() => {
    const API_URL = "http://51.210.255.18:5000"
    const eventSource = new EventSource(`${apiUrl}/api/events`)

    eventSource.addEventListener("incoming_call", (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log("[v0] Incoming call detected:", data)

        // Trigger profile modal to open
        if (data.sourceId) {
          openProfile(data.sourceId)
        }
      } catch (error) {
        console.error("[v0] Error parsing incoming call event:", error)
      }
    })

    eventSource.addEventListener("call_ended", (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log("[v0] Call ended:", data)
      } catch (error) {
        console.error("[v0] Error parsing call ended event:", error)
      }
    })

    eventSource.onerror = (error) => {
      console.log("[v0] SSE connection error, will retry automatically:", error)
    }

    return () => {
      eventSource.close()
    }
  }, [openProfile])

  return null // This component doesn't render anything
}
