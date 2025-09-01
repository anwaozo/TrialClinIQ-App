"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Info } from "lucide-react"

interface TrialFormData {
  // Trial Details
  nctNumber: string
  trialTitle: string
  conditions: string[]
  trialPhase: string
  trialStatus: string
  trialType: string
  estimatedDuration: string
  communicationLanguage: string
  aboutStudy: string
  purposeOfStudy: string
  participationBenefits: string

  // Interventions
  interventions: Array<{
    name: string
    type: string
    dose: string
    frequency: string
    cycle: string
    administration: string
    mechanism: string
  }>

  // Eligibility
  minAge: string
  maxAge: string
  ageUnit: string
  genderEligibility: string
  raceEligibility: string

  // Criteria
  eligibilityCriteria: string
  inclusionCriteria: string
  exclusionCriteria: string

  // Site Locations
  siteLocations: Array<{
    country: string
    state: string
    address: string
    zipcode: string
  }>

  // Management
  sponsorName: string
  principalInvestigator: string
  investigatorSpecialty: string
  investigatorEmail: string
  investigatorPhone: string
  contactName: string
  contactTitle: string
  contactEmail: string
  contactPhone: string
  sameAsPrincipal: boolean
}

export default function TrialRegistrationForm() {
  const [formData, setFormData] = useState<TrialFormData>({
    nctNumber: "",
    trialTitle: "",
    conditions: [],
    trialPhase: "",
    trialStatus: "",
    trialType: "",
    estimatedDuration: "",
    communicationLanguage: "",
    aboutStudy: "",
    purposeOfStudy: "",
    participationBenefits: "",
    interventions: [
      {
        name: "",
        type: "",
        dose: "",
        frequency: "",
        cycle: "",
        administration: "",
        mechanism: "",
      },
    ],
    minAge: "",
    maxAge: "",
    ageUnit: "yrs",
    genderEligibility: "",
    raceEligibility: "",
    eligibilityCriteria: "",
    inclusionCriteria: "",
    exclusionCriteria: "",
    siteLocations: [
      {
        country: "",
        state: "",
        address: "",
        zipcode: "",
      },
    ],
    sponsorName: "",
    principalInvestigator: "",
    investigatorSpecialty: "",
    investigatorEmail: "",
    investigatorPhone: "",
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    sameAsPrincipal: false,
  })

  const [conditionInput, setConditionInput] = useState("")

  const addCondition = () => {
    if (conditionInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, conditionInput.trim()],
      }))
      setConditionInput("")
    }
  }

  const removeCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }))
  }

  const addIntervention = () => {
    setFormData((prev) => ({
      ...prev,
      interventions: [
        ...prev.interventions,
        {
          name: "",
          type: "",
          dose: "",
          frequency: "",
          cycle: "",
          administration: "",
          mechanism: "",
        },
      ],
    }))
  }

  const removeIntervention = (index: number) => {
    if (formData.interventions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        interventions: prev.interventions.filter((_, i) => i !== index),
      }))
    }
  }

  const addSiteLocation = () => {
    setFormData((prev) => ({
      ...prev,
      siteLocations: [
        ...prev.siteLocations,
        {
          country: "",
          state: "",
          address: "",
          zipcode: "",
        },
      ],
    }))
  }

  const removeSiteLocation = (index: number) => {
    if (formData.siteLocations.length > 1) {
      setFormData((prev) => ({
        ...prev,
        siteLocations: prev.siteLocations.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Trial registration data:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register a New Clinical Trial</h1>
          <p className="text-gray-600">
            Enter details of your active or upcoming clinical trial to list it on TrialCliniq and start receiving
            potential participant matches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trial Details */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-gray-900">Trial Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nctNumber">Trial ID/NCT Number*</Label>
                  <Input
                    id="nctNumber"
                    placeholder="Enter your trial NCT number"
                    value={formData.nctNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nctNumber: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="trialTitle">Trial Title*</Label>
                  <Input
                    id="trialTitle"
                    placeholder="Enter your trial title"
                    value={formData.trialTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, trialTitle: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>Condition(s) Studied*</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Info className="w-4 h-4" />
                    <span>
                      You can add as many as apply. If you're unsure of the exact name, type what you know, we'll help
                      match it.
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 mb-2">
                  <Input
                    placeholder="Search medical condition or keyword"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCondition())}
                  />
                  <Button type="button" onClick={addCondition} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.conditions.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{condition}</span>
                      <button
                        type="button"
                        onClick={() => removeCondition(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="trialPhase">Trial Phase*</Label>
                  <Select
                    value={formData.trialPhase}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, trialPhase: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select study phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase1">Phase 1</SelectItem>
                      <SelectItem value="phase2">Phase 2</SelectItem>
                      <SelectItem value="phase3">Phase 3</SelectItem>
                      <SelectItem value="phase4">Phase 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="trialStatus">Trial Status*</Label>
                  <Select
                    value={formData.trialStatus}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, trialStatus: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select current status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recruiting">Recruiting</SelectItem>
                      <SelectItem value="active">Active, not recruiting</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="trialType">Trial Type*</Label>
                  <Select
                    value={formData.trialType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, trialType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select study type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interventional">Interventional</SelectItem>
                      <SelectItem value="observational">Observational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estimatedDuration">Estimated Trial Duration*</Label>
                  <Select
                    value={formData.estimatedDuration}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, estimatedDuration: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select estimated duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3months">1-3 months</SelectItem>
                      <SelectItem value="3-6months">3-6 months</SelectItem>
                      <SelectItem value="6-12months">6-12 months</SelectItem>
                      <SelectItem value="1-2years">1-2 years</SelectItem>
                      <SelectItem value="2+years">2+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="communicationLanguage">Trial Communication Language*</Label>
                <Select
                  value={formData.communicationLanguage}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, communicationLanguage: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language for communication" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="aboutStudy">About this study*</Label>
                <Textarea
                  id="aboutStudy"
                  placeholder="What is this study about"
                  value={formData.aboutStudy}
                  onChange={(e) => setFormData((prev) => ({ ...prev, aboutStudy: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="purposeOfStudy">Purpose of Study*</Label>
                <Textarea
                  id="purposeOfStudy"
                  placeholder="What is this study purpose"
                  value={formData.purposeOfStudy}
                  onChange={(e) => setFormData((prev) => ({ ...prev, purposeOfStudy: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="participationBenefits">Participation Benefits*</Label>
                <Textarea
                  id="participationBenefits"
                  placeholder="What do volunteers gain from enrolling"
                  value={formData.participationBenefits}
                  onChange={(e) => setFormData((prev) => ({ ...prev, participationBenefits: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Intervention */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-gray-900">Intervention</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {formData.interventions.map((intervention, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  {formData.interventions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIntervention(index)}
                      className="absolute top-2 right-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Intervention Name*</Label>
                      <Input
                        placeholder="Enter your intervention name"
                        value={intervention.name}
                        onChange={(e) => {
                          const newInterventions = [...formData.interventions]
                          newInterventions[index].name = e.target.value
                          setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>Type of Intervention*</Label>
                      <Select
                        value={intervention.type}
                        onValueChange={(value) => {
                          const newInterventions = [...formData.interventions]
                          newInterventions[index].type = value
                          setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select intervention type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drug">Drug</SelectItem>
                          <SelectItem value="device">Device</SelectItem>
                          <SelectItem value="procedure">Procedure</SelectItem>
                          <SelectItem value="behavioral">Behavioral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Dose*</Label>
                      <Input
                        placeholder="e.g. 50mg"
                        value={intervention.dose}
                        onChange={(e) => {
                          const newInterventions = [...formData.interventions]
                          newInterventions[index].dose = e.target.value
                          setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>Dose Frequency*</Label>
                      <Select
                        value={intervention.frequency}
                        onValueChange={(value) => {
                          const newInterventions = [...formData.interventions]
                          newInterventions[index].frequency = value
                          setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select dose frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once-daily">Once daily</SelectItem>
                          <SelectItem value="twice-daily">Twice daily</SelectItem>
                          <SelectItem value="three-times-daily">Three times daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Estimated Dose Cycle*</Label>
                      <Input
                        placeholder="Enter estimated cycle"
                        value={intervention.cycle}
                        onChange={(e) => {
                          const newInterventions = [...formData.interventions]
                          newInterventions[index].cycle = e.target.value
                          setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>Route of Administration*</Label>
                      <Select
                        value={intervention.administration}
                        onValueChange={(value) => {
                          const newInterventions = [...formData.interventions]
                          newInterventions[index].administration = value
                          setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select route of administration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oral">Oral</SelectItem>
                          <SelectItem value="intravenous">Intravenous</SelectItem>
                          <SelectItem value="intramuscular">Intramuscular</SelectItem>
                          <SelectItem value="topical">Topical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Mechanism of Action*</Label>
                    <Textarea
                      placeholder="Type in intervention mechanism of action"
                      value={intervention.mechanism}
                      onChange={(e) => {
                        const newInterventions = [...formData.interventions]
                        newInterventions[index].mechanism = e.target.value
                        setFormData((prev) => ({ ...prev, interventions: newInterventions }))
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              ))}

              <Button type="button" onClick={addIntervention} variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add another intervention
              </Button>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-gray-900">Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label>Age Eligibility*</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <Input
                    placeholder="Enter minimum age"
                    value={formData.minAge}
                    onChange={(e) => setFormData((prev) => ({ ...prev, minAge: e.target.value }))}
                  />
                  <Select
                    value={formData.ageUnit}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, ageUnit: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yrs">yrs</SelectItem>
                      <SelectItem value="months">months</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Enter maximum age"
                    value={formData.maxAge}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maxAge: e.target.value }))}
                  />
                </div>
                <div className="mt-2">
                  <Checkbox id="anyAge" />
                  <Label htmlFor="anyAge" className="ml-2 text-sm">
                    Any age
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Gender Eligibility*</Label>
                  <Select
                    value={formData.genderEligibility}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, genderEligibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Race Eligibility*</Label>
                  <Select
                    value={formData.raceEligibility}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, raceEligibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select race eligibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All races</SelectItem>
                      <SelectItem value="specific">Specific races only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Criteria */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-gray-900">Criteria</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="eligibilityCriteria">Eligibility Criteria*</Label>
                <Textarea
                  id="eligibilityCriteria"
                  placeholder="Type in eligibility criteria"
                  value={formData.eligibilityCriteria}
                  onChange={(e) => setFormData((prev) => ({ ...prev, eligibilityCriteria: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="inclusionCriteria">Inclusion Criteria*</Label>
                <Textarea
                  id="inclusionCriteria"
                  placeholder="Type in inclusion criteria"
                  value={formData.inclusionCriteria}
                  onChange={(e) => setFormData((prev) => ({ ...prev, inclusionCriteria: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="exclusionCriteria">Exclusion Criteria*</Label>
                <Textarea
                  id="exclusionCriteria"
                  placeholder="Type in exclusion criteria"
                  value={formData.exclusionCriteria}
                  onChange={(e) => setFormData((prev) => ({ ...prev, exclusionCriteria: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Site Location */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-gray-900">Site Location</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {formData.siteLocations.map((location, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  {formData.siteLocations.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSiteLocation(index)}
                      className="absolute top-2 right-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Country*</Label>
                      <Select
                        value={location.country}
                        onValueChange={(value) => {
                          const newLocations = [...formData.siteLocations]
                          newLocations[index].country = value
                          setFormData((prev) => ({ ...prev, siteLocations: newLocations }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>State*</Label>
                      <Select
                        value={location.state}
                        onValueChange={(value) => {
                          const newLocations = [...formData.siteLocations]
                          newLocations[index].state = value
                          setFormData((prev) => ({ ...prev, siteLocations: newLocations }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Address*</Label>
                      <Input
                        placeholder="Enter your full address"
                        value={location.address}
                        onChange={(e) => {
                          const newLocations = [...formData.siteLocations]
                          newLocations[index].address = e.target.value
                          setFormData((prev) => ({ ...prev, siteLocations: newLocations }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>Zipcode*</Label>
                      <Input
                        placeholder="Enter zipcode"
                        value={location.zipcode}
                        onChange={(e) => {
                          const newLocations = [...formData.siteLocations]
                          newLocations[index].zipcode = e.target.value
                          setFormData((prev) => ({ ...prev, siteLocations: newLocations }))
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" onClick={addSiteLocation} variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add another site
              </Button>
            </CardContent>
          </Card>

          {/* Management */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg font-semibold text-gray-900">Management</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="sponsorName">Sponsor Name*</Label>
                <Input
                  id="sponsorName"
                  placeholder="Enter sponsor name"
                  value={formData.sponsorName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sponsorName: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="principalInvestigator">Principal Investigator*</Label>
                  <Input
                    id="principalInvestigator"
                    placeholder="Enter investigator name"
                    value={formData.principalInvestigator}
                    onChange={(e) => setFormData((prev) => ({ ...prev, principalInvestigator: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="investigatorSpecialty">Principal Investigator Specialty*</Label>
                  <Input
                    id="investigatorSpecialty"
                    placeholder="Enter specialty"
                    value={formData.investigatorSpecialty}
                    onChange={(e) => setFormData((prev) => ({ ...prev, investigatorSpecialty: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="investigatorEmail">Investigator Email*</Label>
                  <Input
                    id="investigatorEmail"
                    type="email"
                    placeholder="Enter investigator email"
                    value={formData.investigatorEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, investigatorEmail: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="investigatorPhone">Investigator Phone*</Label>
                  <Input
                    id="investigatorPhone"
                    placeholder="Enter investigator phone"
                    value={formData.investigatorPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, investigatorPhone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactName">Contact Name*</Label>
                  <Input
                    id="contactName"
                    placeholder="Enter contact name"
                    value={formData.contactName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                    disabled={formData.sameAsPrincipal}
                  />
                </div>
                <div>
                  <Label htmlFor="contactTitle">Contact Title*</Label>
                  <Input
                    id="contactTitle"
                    placeholder="Enter contact title (e.g. trial)"
                    value={formData.contactTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactTitle: e.target.value }))}
                    disabled={formData.sameAsPrincipal}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsPrincipal"
                  checked={formData.sameAsPrincipal}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, sameAsPrincipal: checked as boolean }))
                  }
                />
                <Label htmlFor="sameAsPrincipal" className="text-sm">
                  Same as Principal Investigator
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactEmail">Contact Email*</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="Enter contact email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    disabled={formData.sameAsPrincipal}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone*</Label>
                  <Input
                    id="contactPhone"
                    placeholder="Enter contact phone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    disabled={formData.sameAsPrincipal}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" className="px-8 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
              Save & Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
