import { KnowledgeBasesForm } from "@/components/knowledge-bases/knowledge-bases-form"

export default function KnowledgeBasesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Knowledge Bases</h1>
      </div>
      <KnowledgeBasesForm />
    </div>
  )
}
