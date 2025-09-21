"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface ProfileContextType {
  isProfileOpen: boolean
  currentSourceId: string | null
  profileExists: boolean
  openProfile: (sourceId: string) => void
  closeProfile: () => void
  setProfileExists: (exists: boolean) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [currentSourceId, setCurrentSourceId] = useState<string | null>(null)
  const [profileExists, setProfileExists] = useState(false)

  useEffect(() => {
    console.log("[v0] ProfileProvider - currentSourceId:", currentSourceId, "profileExists:", profileExists)
  }, [currentSourceId, profileExists])


  useEffect(() => {
    const handleIncomingCall = (event: CustomEvent) => {
      const { sourceId } = event.detail
      if (sourceId) {
        openProfile(sourceId)
      }
    }

    window.addEventListener("incomingCall", handleIncomingCall as EventListener)
    return () => {
      window.removeEventListener("incomingCall", handleIncomingCall as EventListener)
    }
  }, [])

  const openProfile = async (sourceId: string) => {
    setCurrentSourceId(sourceId)

    try {
       const API_URL = "http://51.210.255.18:5000"
      const response = await fetch(`${API_URL}/api/profile/${sourceId}`)
      const exists = response.ok
      console.log("[v0] ProfileProvider - Profile exists:", exists)
      setProfileExists(exists)

      if (!exists) {
        console.log("[v0] ProfileProvider - No profile found, using sourceId from call data:", sourceId)
      }
    } catch (error) {
      console.log("[v0] Profile check failed, assuming new profile:", error)
      setProfileExists(false)
    }

    setIsProfileOpen(true)
  }

  const closeProfile = () => {
    setIsProfileOpen(false)
    setCurrentSourceId(null)
    setProfileExists(false)
  }

  return (
    <ProfileContext.Provider
      value={{
        isProfileOpen,
        currentSourceId,
        profileExists,
        openProfile,
        closeProfile,
        setProfileExists,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
