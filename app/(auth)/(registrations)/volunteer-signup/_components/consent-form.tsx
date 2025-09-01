"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ConsentForm({ onNext }: { onNext: () => void }) {
  const [consents, setConsents] = useState({
    informationCollection: false,
    informationUsage: false,
    finalConsent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (consents.informationCollection && consents.informationUsage && consents.finalConsent) {
      onNext()
    }
  }

  const allConsentsGiven = consents.informationCollection && consents.informationUsage && consents.finalConsent

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">TrialCliniq eConsent Form</h1>
            <h2 className="text-lg text-gray-700">
              Consent to Collect, Use, and Store Personal Health Information for Clinical Trial Matching
            </h2>
          </CardHeader>

          <CardContent className="p-8">
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 mb-6">
                Thank you for choosing TrialCliniq. Before we continue, we need your permission to collect, process, and
                securely store your personal and medical information. This allows us to match you with clinical trials
                that fit your health profile now and in the future.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <Checkbox
                      id="informationCollection"
                      checked={consents.informationCollection}
                      onCheckedChange={(checked) =>
                        setConsents({ ...consents, informationCollection: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="informationCollection" className="text-sm font-medium text-gray-900">
                      I have read and understand the information above
                    </Label>
                  </div>

                  <div className="ml-6">
                    <h3 className="font-semibold text-gray-900 mb-3">What information will we collect?</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        • Basic personal details: name, date of birth, contact information, and language preferences.
                      </li>
                      <li>
                        • Medical information: including your health conditions, medications, lab results, medical
                        history, and documents you upload (e.g. MRI reports, lab results, or doctor's notes).
                      </li>
                      <li>• Electronic Health Records (EHR): if you choose to connect them.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <Checkbox
                      id="informationUsage"
                      checked={consents.informationUsage}
                      onCheckedChange={(checked) => setConsents({ ...consents, informationUsage: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="informationUsage" className="text-sm font-medium text-gray-900">
                      I have read and understand the information above
                    </Label>
                  </div>

                  <div className="ml-6">
                    <h3 className="font-semibold text-gray-900 mb-3">How will we use your Information?</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        • Our AI will securely review your information to find clinical trials you may qualify for.
                      </li>
                      <li>
                        • We will notify you about matching trials and, with your permission, share your interest with
                        the research sites conducting those studies.
                      </li>
                      <li>
                        • We will securely store your information to keep you updated about new clinical trials you
                        might be eligible for in the future.
                      </li>
                      <li>• You will have the option to manage your communication preferences at any time.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Your rights</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Review, update, or delete the information you share with us.</li>
                    <li>
                      • Withdraw from the platform and revoke your consent at any time, after which your data will be
                      securely deleted.
                    </li>
                    <li>
                      • Your data is encrypted and stored in compliance with HIPAA and other applicable privacy
                      regulations.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="finalConsent"
                      checked={consents.finalConsent}
                      onCheckedChange={(checked) => setConsents({ ...consents, finalConsent: checked as boolean })}
                      className="mt-1"
                    />
                    <Label htmlFor="finalConsent" className="text-sm text-gray-700">
                      <em>
                        I have read and understand this consent form. I agree for TrialCliniq to collect, process, and
                        securely store my personal and medical data to match me with current and future clinical trials
                        until I choose to withdraw my consent.
                      </em>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!allConsentsGiven}
              >
                Sign and Continue
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
