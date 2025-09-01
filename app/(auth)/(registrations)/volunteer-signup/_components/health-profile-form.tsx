"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, InfoIcon } from "lucide-react"

export function HealthProfileForm({ onNext }: { onNext: () => void }) {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    location: "",
    travelDistance: "within-10-miles",
    biologicalGender: "female",
    race: "",
    primaryLanguage: "",
    consentToEnroll: false,
    consentToShare: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Let's get your basic health profile</h1>
          <p className="text-gray-600 mb-6">
            We need some necessary information including your medical details in order to properly sign you up
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>

        {/* EHR Connection Card */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Match your Electronic Health Record (EHR) to trials</h3>
            <p className="text-gray-600 text-sm mb-4">
              Import your EHR to browse trials that fit your medical history and lab results with your consent.
            </p>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              Connect to Trial Portal →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                  Date of Birth*
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="pl-10"
                    required
                  />
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This helps us to connect you with trials study centers that are closest to you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    Location*
                    <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      placeholder="Search with zipcode"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10"
                      required
                    />
                    <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    Travel Distance*
                    <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                  </Label>
                  <Select
                    value={formData.travelDistance}
                    onValueChange={(value) => setFormData({ ...formData, travelDistance: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="within-10-miles">Within 10 miles</SelectItem>
                      <SelectItem value="within-25-miles">Within 25 miles</SelectItem>
                      <SelectItem value="within-50-miles">Within 50 miles</SelectItem>
                      <SelectItem value="within-100-miles">Within 100 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Biological Gender*</Label>
                <div className="flex space-x-4 mt-2">
                  <Button
                    type="button"
                    variant={formData.biologicalGender === "male" ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, biologicalGender: "male" })}
                  >
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant={formData.biologicalGender === "female" ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, biologicalGender: "female" })}
                  >
                    Female
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Race*</Label>
                <Select value={formData.race} onValueChange={(value) => setFormData({ ...formData, race: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                    <SelectItem value="native-american">Native American</SelectItem>
                    <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Primary Language Spoken*</Label>
                <Input
                  placeholder="Search your preferred language (s) for trial communication."
                  value={formData.primaryLanguage}
                  onChange={(e) => setFormData({ ...formData, primaryLanguage: e.target.value })}
                  className="mt-1"
                  required
                />
                <div className="flex space-x-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    English ×
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    French ×
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentToEnroll"
                    checked={formData.consentToEnroll}
                    onCheckedChange={(checked) => setFormData({ ...formData, consentToEnroll: checked as boolean })}
                    className="mt-1"
                  />
                  <Label htmlFor="consentToEnroll" className="text-sm text-gray-700">
                    I have read and agree to the Consent to Enroll and Privacy Policy.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentToShare"
                    checked={formData.consentToShare}
                    onCheckedChange={(checked) => setFormData({ ...formData, consentToShare: checked as boolean })}
                    className="mt-1"
                  />
                  <Label htmlFor="consentToShare" className="text-sm text-gray-700">
                    I consent to share my (or the volunteer's) health data for clinical trial matching under
                    HIPAA-compliant protocols.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <InfoIcon className="h-4 w-4 text-gray-400 mt-1" />
                  <p className="text-sm text-gray-500">You may revoke consent at any time in Settings</p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!formData.consentToEnroll || !formData.consentToShare}
              >
                Create Volunteer Account
              </Button>

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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
