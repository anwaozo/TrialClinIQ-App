"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, MapPin } from "lucide-react";
import Link from "next/link";
import { TrialTabs } from "./_components/trial-tabs";
import { ContactModal } from "./_components/contact-modal";
import { SuccessModal } from "./_components/success-modal";

interface TrialDetailPageProps {
  params: Promise<{
    trialId: string;
  }>;
}

export default async function TrialDetailPage({
  params,
}: TrialDetailPageProps) {
  const trialId = (await params).trialId;
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleContactSuccess = () => {
    setShowContactModal(false);
    setShowSuccessModal(true);
  };

  // Mock data - in real app this would come from API
  const trial = {
    id: trialId,
    title: "Agorain, New Treatment for Chronic Neuropathy Pain",
    researchUnit: "Amherst Clinical Research Unit",
    phase: "Phase II",
    ageRequirement: ">18yrs",
    status: "Now Recruiting",
    aiScore: "80%",
    lastUpdated: "June 7, 2025",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link href="/volunteer/dashboard" className="hover:text-gray-700">
          Home
        </Link>
        <span>›</span>
        <Link href="/volunteer/eligible-trials" className="hover:text-gray-700">
          Search results
        </Link>
        <span>›</span>
        <span className="text-gray-400">{trial.title}</span>
      </nav>

      {/* Last Updated */}
      <p className="text-sm text-gray-500 mb-4">
        Updated on {trial.lastUpdated}
      </p>

      {/* Trial Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {trial.title}
          </h1>

          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-gray-700">{trial.researchUnit}</span>
            <Link
              href="#investigation-centers"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              See other centers
            </Link>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {trial.id}
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              {trial.phase}
            </Badge>
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              {trial.ageRequirement}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {trial.status}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">TC</span>
              </div>
              <span className="text-blue-700 font-medium">
                {trial.aiScore} TrialClinIQ AI Score
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white"
            onClick={() => setShowContactModal(true)}
          >
            Contact a study centre
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <TrialTabs
        trialId={trialId}
        onContactClick={() => setShowContactModal(true)}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSuccess={handleContactSuccess}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
