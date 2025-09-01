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
import { XCircle, Upload } from "lucide-react"

interface ConfirmPrescreenFailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  volunteer?: {
    id: string
    name: string
  }
}

export function ConfirmPrescreenFailModal({ open, onOpenChange, volunteer }: ConfirmPrescreenFailModalProps) {
  const [formData, setFormData] = useState({
    reasonForFail: "",
    details: "",
    screeningCompletionDate: "",
    supportingDocument: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Confirm pre-screen fail:", formData)
    onOpenChange(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, supportingDocument: file })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Confirm Pre-Screen Fail</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Mark volunteer as ineligible based on prescreen findings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="reasonForFail" className="text-sm font-medium">
              Reason for Fail <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.reasonForFail}
              onValueChange={(value) => setFormData({ ...formData, reasonForFail: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical-history">Medical History Exclusion</SelectItem>
                <SelectItem value="age-criteria">Age Criteria Not Met</SelectItem>
                <SelectItem value="medication-conflict">Medication Conflict</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="details" className="text-sm font-medium">
              Details / Notes
            </Label>
            <Textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Briefly describe the reason since it doesn't fit the listed options..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="screeningCompletionDate" className="text-sm font-medium">
              Screening Completion Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={formData.screeningCompletionDate}
              onChange={(e) => setFormData({ ...formData, screeningCompletionDate: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Upload Supporting Document</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-sm">
                <button type="button" className="text-blue-600 hover:underline">
                  Click to upload or drag
                </button>
                <span className="text-gray-500"> and drop PDF, CSV</span>
              </div>
              <input type="file" accept=".pdf,.csv" onChange={handleFileUpload} className="hidden" />
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Confirm Pre-Screen Fail
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
