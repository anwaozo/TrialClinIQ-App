"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./_components/overview-tab"
import { DocumentsTab } from "./_components/documents-tab"
import { ConnectedEHRTab } from "./_components/connected-ehr-tab"

export default function HealthProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Profile</h1>
        <div className="text-gray-600">
          <div className="font-medium">Olivia Brian</div>
          <div className="text-sm">olivia.br@example.com</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="text-sm font-medium">
            Overview
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-sm font-medium">
            Documents
            <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">6</span>
          </TabsTrigger>
          <TabsTrigger value="connected-ehr" className="text-sm font-medium">
            Connected EHR/EMR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="connected-ehr" className="mt-0">
          <ConnectedEHRTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
