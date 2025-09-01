"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Info } from "lucide-react"

interface SiteInfoFormProps {
  onNext: () => void
}

export function SiteInfoForm({ onNext }: SiteInfoFormProps) {
  const [formData, setFormData] = useState({
    organizationType: "",
    organizationAbbreviation: "",
    parentOrganization: "",
    siteName: "",
    country: "",
    state: "",
    address: "",
    zipcode: "",
    facilityType: "",
    fundingOrganization: "",
    sameAsSponsoring: false,
    conditionsSearch: "",
    languageSearch: "",
  })

  const [conditions, setConditions] = useState(["Pain", "Chronic Pain"])
  const [languages, setLanguages] = useState(["English"])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const removeCondition = (condition: string) => {
    setConditions(conditions.filter((c) => c !== condition))
  }

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((l) => l !== language))
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Information</h1>
          <p className="text-gray-600">Enter your site's contact and location details for trial coordination</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="organizationType">Sponsoring Organization Type*</Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Medical Center</SelectItem>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="clinic">Private Clinic</SelectItem>
                    <SelectItem value="cro">Contract Research Organization</SelectItem>
                    <SelectItem value="pharma">Pharmaceutical Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="organizationAbbreviation">Sponsoring Organization Abbreviations</Label>
                <Input
                  id="organizationAbbreviation"
                  placeholder="Enter your organization acronym or abbreviation"
                  value={formData.organizationAbbreviation}
                  onChange={(e) => setFormData({ ...formData, organizationAbbreviation: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="parentOrganization">Parent Organizations</Label>
                <Input
                  id="parentOrganization"
                  placeholder="Enter your parent organization if applicable"
                  value={formData.parentOrganization}
                  onChange={(e) => setFormData({ ...formData, parentOrganization: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="siteName">Site Name*</Label>
                <Input
                  id="siteName"
                  placeholder="Enter your site name"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country*</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
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
                  <Label htmlFor="state">State*</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    placeholder="Enter site full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipcode">Zipcode*</Label>
                  <Input
                    id="zipcode"
                    placeholder="Enter zipcode"
                    value={formData.zipcode}
                    onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="facilityType">Facility Type*</Label>
                <Select
                  value={formData.facilityType}
                  onValueChange={(value) => setFormData({ ...formData, facilityType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select site type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="research">Research Center</SelectItem>
                    <SelectItem value="academic">Academic Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fundingOrganization">Funding Organization*</Label>
                <Select
                  value={formData.fundingOrganization}
                  onValueChange={(value) => setFormData({ ...formData, fundingOrganization: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="nonprofit">Non-profit</SelectItem>
                    <SelectItem value="industry">Industry</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="sameAsSponsoring"
                    checked={formData.sameAsSponsoring}
                    onCheckedChange={(checked) => setFormData({ ...formData, sameAsSponsoring: checked as boolean })}
                  />
                  <Label htmlFor="sameAsSponsoring" className="text-sm text-gray-600">
                    Same as sponsoring organization
                  </Label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label>Conditions Your Site Accepts*</Label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  You can add as many as apply. If you're unsure of the exact name, type what you know, we'll help match
                  it.
                </p>
                <Input
                  placeholder="Search medical condition or keyword"
                  value={formData.conditionsSearch}
                  onChange={(e) => setFormData({ ...formData, conditionsSearch: e.target.value })}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {conditions.map((condition) => (
                    <Badge key={condition} variant="secondary" className="flex items-center gap-1">
                      {condition}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeCondition(condition)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label>Languages spoken at site*</Label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  You can add as many as apply. If you're unsure of the exact name, type what you know, we'll help match
                  it.
                </p>
                <Input
                  placeholder="Search your preferred language (s) for trial communication."
                  value={formData.languageSearch}
                  onChange={(e) => setFormData({ ...formData, languageSearch: e.target.value })}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {languages.map((language) => (
                    <Badge key={language} variant="secondary" className="flex items-center gap-1">
                      {language}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeLanguage(language)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Continue
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <span>Your data stays private and protected with HIPAA-compliant security.</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
