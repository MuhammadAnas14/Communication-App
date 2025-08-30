import { CompanyDetailsForm } from "@/components/company-details/company-details-form"

export default function CompanyDetailsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Company Details</h1>
        <p className="text-sm text-gray-500">Manage company information and settings</p>
      </div>

      <CompanyDetailsForm />
    </div>
  )
}
