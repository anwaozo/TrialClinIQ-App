"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Pill, Shield } from "lucide-react"

interface AddMedicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMedicationModal({ open, onOpenChange }: AddMedicationModalProps) {
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    chronicPain: "yes",
    currentlyTaking: "yes",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (formData.medicationName && agreedToTerms) {
      console.log("Adding medication:", formData)
      onOpenChange(false)
      // Reset form
      setFormData({
        medicationName: "",
        dosage: "",
        frequency: "",
        startDate: "",
        chronicPain: "yes",
        currentlyTaking: "yes",
      })
      setAgreedToTerms(false)
    }
  }

  const clearEntry = () => {
    setFormData({
      medicationName: "",
      dosage: "",
      frequency: "",
      startDate: "",
      chronicPain: "yes",
      currentlyTaking: "yes",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <Pill className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Update Medication List</DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Add or edit the medications you're currently taking. This helps us find trials you may qualify for.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Medication Name */}
          <div className="space-y-2">
            <Label htmlFor="medication-name">
              Medication Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="medication-name"
              placeholder="Pregabalin"
              value={formData.medicationName}
              onChange={(e) => handleInputChange("medicationName", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Dosage */}
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g. 10mg"
                value={formData.dosage}
                onChange={(e) => handleInputChange("dosage", e.target.value)}
              />
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => handleInputChange("frequency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once-daily">Once daily</SelectItem>
                  <SelectItem value="twice-daily">Twice daily</SelectItem>
                  <SelectItem value="three-times-daily">Three times daily</SelectItem>
                  <SelectItem value="four-times-daily">Four times daily</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date">When you started this medication</Label>
              <Input
                id="start-date"
                placeholder="Select date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            {/* Chronic Pain */}
            <div className="space-y-2">
              <Label>Is this medication for chronic pain?</Label>
              <Select value={formData.chronicPain} onValueChange={(value) => handleInputChange("chronicPain", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Currently Taking */}
          <div className="space-y-2">
            <Label>
              Are you currently taking this medication<span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.currentlyTaking}
              onValueChange={(value) => handleInputChange("currentlyTaking", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="taking-yes" />
                <Label htmlFor="taking-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="taking-no" />
                <Label htmlFor="taking-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Clear Entry Button */}
          <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={clearEntry}>
            Clear Entry
          </Button>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent-medication"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="consent-medication" className="text-sm text-gray-600 leading-relaxed">
              I agree to the Terms & Conditions and consent for my personal information to be shared with the sponsor or
              research site of this study to help determine my eligibility.
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={!formData.medicationName || !agreedToTerms}>
              Save Medication
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
