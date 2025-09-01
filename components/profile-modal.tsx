"use client"

import { useProfile } from "../app/contexts/profile-contexts"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CompanyDashboard } from "@/components/profile/company-dashboard"
import { ProfileForm } from "@/components/profile/profile-form"

export function ProfileModal() {
  const { isProfileOpen, profileExists, closeProfile } = useProfile()

  return (
    <Dialog open={isProfileOpen} onOpenChange={closeProfile}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
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
