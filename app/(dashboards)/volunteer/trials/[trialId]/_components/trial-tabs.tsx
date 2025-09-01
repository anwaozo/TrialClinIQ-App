"use client"

import { useState } from "react"
import { TrialDescription } from "./trial-description"
import { TrialCriteria } from "./trial-criteria"
import { TrialInterventions } from "./trial-interventions"
import { InvestigationCenters } from "./investigation-centers"
import { AIMatchReport } from "./ai-match-report"

interface TrialTabsProps {
  trialId: string
  onContactClick: () => void
}

export function TrialTabs({ trialId, onContactClick }: TrialTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description", count: null },
    { id: "criteria", label: "Criteria", count: 2 },
    { id: "interventions", label: "Interventions", count: 2 },
    { id: "investigation-centers", label: "Investigation centers", count: 3 },
    { id: "ai-match-report", label: "AI Match Report", count: null },
  ]

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "description" && <TrialDescription trialId={trialId} />}
        {activeTab === "criteria" && <TrialCriteria trialId={trialId} />}
        {activeTab === "interventions" && <TrialInterventions trialId={trialId} />}
        {activeTab === "investigation-centers" && (
          <InvestigationCenters trialId={trialId} onContactClick={onContactClick} />
        )}
        {activeTab === "ai-match-report" && <AIMatchReport trialId={trialId} />}
      </div>
    </div>
  )
}
