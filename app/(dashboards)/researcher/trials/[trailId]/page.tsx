"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { TrialAppointments } from "./_components/trial-appointments";
import { EnrollmentMetrics } from "./_components/enrollment-metrics";
import { TrialDescription } from "./_components/trial-description";

interface TrialDetailPageProps {
  params: {
    trialId: string;
  };
}

type TabType = "description" | "appointments" | "enrollment-metrics";

export default function TrialDetailPage({ params }: TrialDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  // Mock trial data - in real app this would come from API
  const trial = {
    id: params.trialId,
    title: "Agorain, New Treatment for Chronic Neuropathy Pain",
    trialId: params.trialId,
    phase: "Phase II",
    ageRequirement: ">18yrs",
    status: "Now Recruiting",
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "appointments", label: "Appointments" },
    { id: "enrollment-metrics", label: "Enrollment Metrics" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return <TrialDescription trial={trial} />;
      case "appointments":
        return <TrialAppointments trialId={params.trialId} />;
      case "enrollment-metrics":
        return <EnrollmentMetrics trialId={params.trialId} />;
      default:
        return <TrialDescription trial={trial} />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>›</span>
        <Link href="/trials" className="hover:text-gray-700">
          All Trials
        </Link>
        <span>›</span>
        <span className="text-gray-400">{trial.title}</span>
      </nav>

      {/* Trial Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {trial.title}
          </h1>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {trial.trialId}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              {trial.phase}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700">
              {trial.ageRequirement}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {trial.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-gray-900 hover:bg-gray-800">
            View Volunteers
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </main>
  );
}
