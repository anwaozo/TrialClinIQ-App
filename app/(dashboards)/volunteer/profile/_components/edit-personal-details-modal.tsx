"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Shield } from "lucide-react"

interface EditPersonalDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditPersonalDetailsModal({ open, onOpenChange }: EditPersonalDetailsModalProps) {
  const [formData, setFormData] = useState({
    fullName: "Olivia Brian",
    phoneNumber: "+1 (168) 14116",
    email: "olivia.br@example.com",
    dateOfBirth: "24/01/1998",
    gender: "female",
    race: "black-african-american",
    language: "english",
    weight: "65",
    location: "3221 Sheridan Drive, Buffalo, NY 14226",
    travelDistance: "100-miles",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (agreedToTerms) {
      console.log("Saving personal details:", formData)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Edit Personal Details</DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Confirm your details so the research team can get in touch about your eligibility for this study.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full-name">
              Your Full Name (as on medical records)<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="full-name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <div className="flex space-x-2">
              <Select defaultValue="US">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="CA">CA</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob">
              Date of Birth<span className="text-red-500">*</span>
            </Label>
            <Input
              id="dob"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>
              Biological Gender<span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Race */}
          <div className="space-y-2">
            <Label>
              Race<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.race} onValueChange={(value) => handleInputChange("race", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black-african-american">Black / African American</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
                <SelectItem value="hispanic-latino">Hispanic / Latino</SelectItem>
                <SelectItem value="native-american">Native American</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Primary Language */}
          <div className="space-y-2">
            <Label>
              Primary Language<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label>
              Weight (kg)<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.weight} onValueChange={(value) => handleInputChange("weight", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="55">55</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="65">65</SelectItem>
                <SelectItem value="70">70</SelectItem>
                <SelectItem value="75">75</SelectItem>
                <SelectItem value="80">80</SelectItem>
                <SelectItem value="85">85</SelectItem>
                <SelectItem value="90">90</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Location<span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          {/* Travel Distance */}
          <div className="space-y-2">
            <Label>
              Travel Distance<span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.travelDistance}
              onValueChange={(value) => handleInputChange("travelDistance", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25-miles">25 miles</SelectItem>
                <SelectItem value="50-miles">50 miles</SelectItem>
                <SelectItem value="100-miles">100 miles</SelectItem>
                <SelectItem value="200-miles">200 miles</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent-personal"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="consent-personal" className="text-sm text-gray-600 leading-relaxed">
              I agree to the Terms & Conditions and consent for my personal information to be shared with the sponsor or
              research site of this study to help determine my eligibility.
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={!agreedToTerms}>
              Save Personal Details
            </Button>
          </div>

          {/* Privacy Notice */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
            <Shield className="h-4 w-4" />
            <span>Your information is securely shared only with this research site and never sold.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
