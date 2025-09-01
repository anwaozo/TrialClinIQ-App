"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "lucide-react"

interface ScheduleAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  volunteer?: {
    id: string
    name: string
    email: string
  }
}

export function ScheduleAppointmentModal({ open, onOpenChange, volunteer }: ScheduleAppointmentModalProps) {
  const [formData, setFormData] = useState({
    screeningType: "",
    screeningDate: "",
    startTime: "",
    endTime: "",
    screeningLocation: "",
    meetingDetails: "",
    guestEmail: "",
    requirements: {
      medicalRecords: false,
      labResults: false,
      idVerification: false,
      previousMedicationHistory: false,
      physicalExamination: false,
      questionnaireCompletion: false,
      consentFormReview: false,
      eligibilityAssessment: false,
    },
    additionalNotes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Schedule appointment:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Schedule Appointment</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Set up a call, video consult, or physical visit to assess volunteer's eligibility for this trial.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="screeningType" className="text-sm font-medium">
              Screening Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.screeningType}
              onValueChange={(value) => setFormData({ ...formData, screeningType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="video">Video Consult</SelectItem>
                <SelectItem value="physical">Physical Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="screeningDate" className="text-sm font-medium">
              Screening Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={formData.screeningDate}
              onChange={(e) => setFormData({ ...formData, screeningDate: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="text-sm font-medium">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                placeholder="From"
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="text-sm font-medium">
                End Time <span className="text-red-500">*</span>
              </Label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                placeholder="To"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="screeningLocation" className="text-sm font-medium flex items-center gap-2">
              Screening Location <span className="text-red-500">*</span>
              <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                ?
              </div>
            </Label>
            <Select
              value={formData.screeningLocation}
              onValueChange={(value) => setFormData({ ...formData, screeningLocation: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Enter screening location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">Main Clinic</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="remote">Remote/Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="meetingDetails" className="text-sm font-medium flex items-center gap-2">
              Meeting Details <span className="text-red-500">*</span>
              <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                ?
              </div>
            </Label>
            <Input
              value={formData.meetingDetails}
              onChange={(e) => setFormData({ ...formData, meetingDetails: e.target.value })}
              placeholder="Meeting link/address"
            />
          </div>

          <div>
            <Label className="text-sm font-medium flex items-center gap-2">
              Guest <span className="text-red-500">*</span>
              <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                ?
              </div>
            </Label>
            <div className="text-sm text-gray-600 mb-2">debra.holt@example.com</div>
            <Input
              value={formData.guestEmail}
              onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
              placeholder="Add guest email"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Screening Requirements <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {Object.entries({
                medicalRecords: "Medical records",
                labResults: "Lab results",
                idVerification: "ID verification",
                previousMedicationHistory: "Previous medication history",
                physicalExamination: "Physical examination",
                questionnaireCompletion: "Questionnaire completion",
                consentFormReview: "Consent form review",
                eligibilityAssessment: "Eligibility assessment",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={formData.requirements[key as keyof typeof formData.requirements]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        requirements: {
                          ...formData.requirements,
                          [key]: checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor={key} className="text-sm">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
            <Button variant="link" className="text-blue-600 p-0 h-auto mt-2">
              Add another requirement
            </Button>
          </div>

          <div>
            <Label htmlFor="additionalNotes" className="text-sm font-medium">
              Additional Notes
            </Label>
            <Textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              placeholder="Enter information for participant"
              rows={4}
            />
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Schedule Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
