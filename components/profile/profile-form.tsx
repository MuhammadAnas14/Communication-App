"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail } from "lucide-react"

export function ProfileForm() {
  const [formData, setFormData] = useState({
    companyName: "Greenbuild Inc.",
    profileId: "12345",
    companyPhone: "(555) 123-4567",
    website: "www.greenbuild.com",
    emailAddress: "info@greenbuild.com",
    category: "construction",
    assignedTo: "john-doe",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Sidebar - Company Information */}
      <div className="lg:col-span-1">
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Company Name</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Street Address</p>
              <p className="text-sm text-gray-600">City</p>
              <p className="text-sm text-gray-600">Prov/State Country</p>
              <p className="text-sm text-gray-600">Phone #</p>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-sm text-gray-600">website</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Now
              </Button>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-800 text-sm justify-start">
                Transaction History
              </Button>
              <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-800 text-sm justify-start">
                Last Transaction
              </Button>
              <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-800 text-sm justify-start">
                Last Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Profile Information Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profileId" className="text-sm font-medium text-gray-700">
                  Profile ID #
                </Label>
                <Input
                  id="profileId"
                  value={formData.profileId}
                  onChange={(e) => handleInputChange("profileId", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyPhone" className="text-sm font-medium text-gray-700">
                  Company Phone #
                </Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emailAddress" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700">
                  Assigned To
                </Label>
                <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div></div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <span className="text-sm font-medium text-gray-900">John Doe</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Add New Contact
              </Button>
            </div>

            <div className="pt-6 border-t mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
