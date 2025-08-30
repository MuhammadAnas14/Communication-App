"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CompanyDetailsForm() {
  const [formData, setFormData] = useState({
    companyName: "Greenbuild Inc.",
    profileId: "",
    companyPhone: "705-264-1111",
    website: "www.greenbuild.com",
    emailAddress: "info@greenbuild.com",
    category: "",
    assignedTo: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Sidebar - Company Summary */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Greenbuild Inc.</h2>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>123 Pine St. Trimming 6A4</p>
                <p>705-264-1111</p>
                <p>info@greenbuild.com</p>
                <p>www.greenbuild.com</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Call Now
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
          </div>
        </div>
      </div>

      {/* Right Side - Profile Information */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>

          <div className="space-y-6">
            {/* Company Name and Profile ID */}
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

            {/* Company Phone and Website */}
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

            {/* Email Address and Category */}
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
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Assigned To */}
            <div className="space-y-2">
              <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700">
                Assigned To
              </Label>
              <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assigned user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Connections Section */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Connections</h4>
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-sm text-gray-700">
                SarahLee Loome Title 715-234-6754 705-264-1111 -3456 sarahlee@greenbuild.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
