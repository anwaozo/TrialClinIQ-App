"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface ResearcherSuccessPageProps {
  onNext?: () => void;
}

export function ResearcherSuccessPage({ onNext }: ResearcherSuccessPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">You're in!</h1>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Welcome to TrialCliniq for Research Sites. Start managing your
            trials, review participant matches, and optimize your site's
            enrollment performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/researcher/add-trails/register">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 py-3 bg-transparent"
              >
                Add New Trial Listing
              </Button>
            </Link>
            <Link href="/researcher/dashboard">
              <Button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                My Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
            <span>
              Your data stays private and protected with HIPAA-compliant
              security.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
