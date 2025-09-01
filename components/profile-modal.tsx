"use client"

import { useProfile } from "../app/contexts/profile-contexts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CompanyDashboard } from "@/components/profile/company-dashboard"
import { ProfileForm } from "@/components/profile/profile-form"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function ProfileModal() {
  const { isProfileOpen, profileExists, closeProfile } = useProfile()

  return (
    <Dialog open={isProfileOpen} onOpenChange={closeProfile}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>{profileExists ? "Company Profile Dashboard" : "Create New Profile"}</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        {profileExists ? (
          <CompanyDashboard />
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Profile</h2>
            <ProfileForm />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
