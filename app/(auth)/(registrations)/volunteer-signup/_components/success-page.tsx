"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, MapPinIcon } from "lucide-react"

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">You're in!</h1>
            <p className="text-gray-600 mb-8">
              Your TrialCliniq account is ready. Let's help you discover clinical trials tailored to your medical
              profile.
            </p>

            <div className="flex space-x-4 mb-12">
              <Button variant="outline" className="flex-1 bg-transparent">
                Complete My Health Profile
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">My Dashboard</Button>
            </div>

            <div className="text-left">
              <div className="flex items-center justify-center mb-6">
                <span className="text-lg">👍</span>
                <h2 className="text-lg font-semibold text-gray-900 ml-2">You're a good match for these trials</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Agorain, New Treatment for Chronic Neuropathy Pain
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      Amherst, NY - Multiple locations
                    </div>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                      View trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Mindfulness-Based Therapy for Chronic Pain Relief
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      Niagara Falls, NY
                    </div>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                      View trial
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Your data stays private and protected with HIPAA-compliant security.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
