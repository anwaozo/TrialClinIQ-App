"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Shield } from "lucide-react"

interface EditHealthDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditHealthDetailsModal({ open, onOpenChange }: EditHealthDetailsModalProps) {
  const [formData, setFormData] = useState({
    bloodGroup: "o-positive",
    genotype: "aa",
    hearingImpaired: "no",
    visionImpaired: "no",
    primaryCondition: "Neuropathy",
    dateDiagnosed: "24/01/2024",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (agreedToTerms) {
      console.log("Saving health details:", formData)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <Heart className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Edit Health Profile</DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Provide these essential health details to help us find suitable clinical trials for you
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Blood Group */}
          <div className="space-y-2">
            <Label>
              Blood Group<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="o-positive">O+</SelectItem>
                <SelectItem value="o-negative">O-</SelectItem>
                <SelectItem value="a-positive">A+</SelectItem>
                <SelectItem value="a-negative">A-</SelectItem>
                <SelectItem value="b-positive">B+</SelectItem>
                <SelectItem value="b-negative">B-</SelectItem>
                <SelectItem value="ab-positive">AB+</SelectItem>
                <SelectItem value="ab-negative">AB-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Genotype */}
          <div className="space-y-2">
            <Label>
              Genotype<span className="text-red-500">*</span>
            </Label>
            <Select value={formData.genotype} onValueChange={(value) => handleInputChange("genotype", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aa">AA</SelectItem>
                <SelectItem value="as">AS</SelectItem>
                <SelectItem value="ac">AC</SelectItem>
                <SelectItem value="ss">SS</SelectItem>
                <SelectItem value="sc">SC</SelectItem>
                <SelectItem value="cc">CC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hearing Impaired */}
          <div className="space-y-2">
            <Label>
              Hearing Impaired<span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.hearingImpaired}
              onValueChange={(value) => handleInputChange("hearingImpaired", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="hearing-yes" />
                <Label htmlFor="hearing-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="hearing-no" />
                <Label htmlFor="hearing-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Vision Impaired */}
          <div className="space-y-2">
            <Label>
              Vision Impaired<span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.visionImpaired}
              onValueChange={(value) => handleInputChange("visionImpaired", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="vision-yes" />
                <Label htmlFor="vision-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="vision-no" />
                <Label htmlFor="vision-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Primary Condition */}
          <div className="space-y-2">
            <Label htmlFor="primary-condition">
              Primary Condition<span className="text-red-500">*</span>
            </Label>
            <Input
              id="primary-condition"
              value={formData.primaryCondition}
              onChange={(e) => handleInputChange("primaryCondition", e.target.value)}
            />
          </div>

          {/* Date Diagnosed */}
          <div className="space-y-2">
            <Label htmlFor="date-diagnosed">
              Date Diagnosed<span className="text-red-500">*</span>
            </Label>
            <Input
              id="date-diagnosed"
              value={formData.dateDiagnosed}
              onChange={(e) => handleInputChange("dateDiagnosed", e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent-health"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="consent-health" className="text-sm text-gray-600 leading-relaxed">
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
              Save Health Profile
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
