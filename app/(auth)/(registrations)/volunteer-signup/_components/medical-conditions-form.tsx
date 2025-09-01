"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, SearchIcon, UploadIcon, XIcon } from "lucide-react"
import { EHRConnectionModal } from "./ehr-connection-modal"

export function MedicalConditionsForm({ onNext }: { onNext: () => void }) {
  const [isEHRModalOpen, setIsEHRModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    primaryCondition: "",
    selectedConditions: ["Neuropathy"],
    conditionTags: ["Pain", "Chronic Pain"],
    isHealthyVolunteer: false,
    diagnosisYear: "2024",
    currentMedications: "",
    selectedMedications: ["Pregabalin", "Gabapentin"],
    documentTitle: "MRI Scan, June 2024",
    documentType: "Diagnostic Report",
    uploadedFile: "MRI Scan, June 2024",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleEHRComplete = () => {
    setIsEHRModalOpen(false)
    // Could trigger additional logic here like updating form state
  }

  const removeCondition = (condition: string) => {
    setFormData({
      ...formData,
      selectedConditions: formData.selectedConditions.filter((c) => c !== condition),
    })
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      conditionTags: formData.conditionTags.filter((t) => t !== tag),
    })
  }

  const removeMedication = (medication: string) => {
    setFormData({
      ...formData,
      selectedMedications: formData.selectedMedications.filter((m) => m !== medication),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect to clinical trials</h1>
          <p className="text-gray-600 mb-6">
            Tell us about any medical conditions you've been diagnosed with. This helps us find clinical trials that fit
            your health needs.
          </p>

          <Button variant="link" className="text-blue-600 flex items-center mx-auto mb-6">
            Why are we asking this?
            <InfoIcon className="ml-1 h-4 w-4" />
          </Button>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>

        {/* EHR Connection Card */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Match your Electronic Health Record (EHR) to trials</h3>
            <p className="text-gray-600 text-sm mb-4">
              Import your EHR to browse trials that fit your medical history and lab results with your consent.
            </p>
            <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => setIsEHRModalOpen(true)}>
              Connect to Trial Portal →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  Primary Condition(s)*
                  <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  You can add as many as apply. If you're unsure of the exact name, type what you know, we'll help match
                  it.
                </p>

                <div className="relative">
                  <Input
                    placeholder="Search medical condition or keyword"
                    value={formData.primaryCondition}
                    onChange={(e) => setFormData({ ...formData, primaryCondition: e.target.value })}
                    className="pl-10"
                  />
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>

                {/* Selected conditions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.selectedConditions.map((condition) => (
                    <Badge key={condition} variant="secondary" className="flex items-center gap-1">
                      {condition}
                      <XIcon className="h-3 w-3 cursor-pointer" onClick={() => removeCondition(condition)} />
                    </Badge>
                  ))}
                  {formData.conditionTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <XIcon className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="healthyVolunteer"
                    checked={formData.isHealthyVolunteer}
                    onCheckedChange={(checked) => setFormData({ ...formData, isHealthyVolunteer: checked as boolean })}
                  />
                  <Label htmlFor="healthyVolunteer" className="text-sm text-gray-600">
                    I am a healthy volunteer
                  </Label>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">When were you diagnosed?*</Label>
                <Select
                  value={formData.diagnosisYear}
                  onValueChange={(value) => setFormData({ ...formData, diagnosisYear: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  This can help us match you to trials requiring recent or long-term diagnoses.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  Your Current Medications*
                  <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  Include prescription, over-the-counter, or supplements you take regularly. Add as many as apply.
                </p>

                <div className="relative">
                  <Input
                    placeholder="Start typing a medication name (e.g. Metformin, Lis..."
                    value={formData.currentMedications}
                    onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                    className="pl-10"
                  />
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>

                {/* Selected medications */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.selectedMedications.map((medication) => (
                    <Badge key={medication} variant="secondary" className="flex items-center gap-1">
                      {medication}
                      <XIcon className="h-3 w-3 cursor-pointer" onClick={() => removeMedication(medication)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Upload file*</Label>
                <div className="mt-2">
                  <div>
                    <Label htmlFor="documentTitle" className="text-sm text-gray-600">
                      Document Title*
                    </Label>
                    <Input
                      id="documentTitle"
                      placeholder="Input your document title"
                      value={formData.documentTitle}
                      onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="text-sm text-gray-600">Select Document Type*</Label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(value) => setFormData({ ...formData, documentType: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Diagnostic Report">Diagnostic Report</SelectItem>
                        <SelectItem value="Lab Results">Lab Results</SelectItem>
                        <SelectItem value="Medical History">Medical History</SelectItem>
                        <SelectItem value="Prescription">Prescription</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <Label className="text-sm text-gray-600">Upload file*</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <UploadIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-blue-600">Click to upload or drag and drop PDF, CSV</p>
                    </div>

                    {formData.uploadedFile && (
                      <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">{formData.uploadedFile}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">3.0 MB</span>
                          <XIcon className="h-4 w-4 text-gray-400 cursor-pointer" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
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

      <EHRConnectionModal
        isOpen={isEHRModalOpen}
        onClose={() => setIsEHRModalOpen(false)}
        onComplete={handleEHRComplete}
      />
    </div>
  )
}
