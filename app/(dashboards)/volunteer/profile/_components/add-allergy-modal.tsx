"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Shield } from "lucide-react"

interface AddAllergyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAllergyModal({ open, onOpenChange }: AddAllergyModalProps) {
  const [formData, setFormData] = useState({
    allergyName: "",
    allergyType: "",
    severity: "",
    reactionExperienced: "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (formData.allergyName && agreedToTerms) {
      console.log("Adding allergy:", formData)
      onOpenChange(false)
      // Reset form
      setFormData({
        allergyName: "",
        allergyType: "",
        severity: "",
        reactionExperienced: "",
      })
      setAgreedToTerms(false)
    }
  }

  const clearEntry = () => {
    setFormData({
      allergyName: "",
      allergyType: "",
      severity: "",
      reactionExperienced: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Your Allergy Details</DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Let us know about any allergies you have. This helps us match you with trials safely.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Allergy Name */}
          <div className="space-y-2">
            <Label htmlFor="allergy-name">
              Allergy Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="allergy-name"
              placeholder="Caffeine"
              value={formData.allergyName}
              onChange={(e) => handleInputChange("allergyName", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Allergy Type */}
            <div className="space-y-2">
              <Label>Allergy Type</Label>
              <Select value={formData.allergyType} onValueChange={(value) => handleInputChange("allergyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select allergy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label>Severity</Label>
              <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select allergy severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                  <SelectItem value="life-threatening">Life-threatening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reaction Experienced */}
          <div className="space-y-2">
            <Label htmlFor="reaction">Reaction Experienced</Label>
            <Textarea
              id="reaction"
              placeholder="e.g. Rash, Difficulty breathing."
              value={formData.reactionExperienced}
              onChange={(e) => handleInputChange("reactionExperienced", e.target.value)}
              rows={3}
            />
          </div>

          {/* Clear Entry Button */}
          <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={clearEntry}>
            Clear Entry
          </Button>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent-allergy"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="consent-allergy" className="text-sm text-gray-600 leading-relaxed">
              I agree to the Terms & Conditions and consent for my personal information to be shared with the sponsor or
              research site of this study to help determine my eligibility.
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={!formData.allergyName || !agreedToTerms}>
              Save Allergy
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
