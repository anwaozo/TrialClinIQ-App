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
import { FileText } from "lucide-react"

interface RequestDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  volunteer?: {
    id: string
    name: string
  }
}

export function RequestDocumentModal({ open, onOpenChange, volunteer }: RequestDocumentModalProps) {
  const [formData, setFormData] = useState({
    documentType: "",
    documentName: "",
    reasonForRequest: "",
    preferredSubmissionDeadline: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Request document:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Request Document from Volunteer</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Send a request for any missing or required medical documents needed to complete this volunteer's screening
            process.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="documentType" className="text-sm font-medium">
              Document Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.documentType}
              onValueChange={(value) => setFormData({ ...formData, documentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diagnostic-reports">Diagnostic Reports</SelectItem>
                <SelectItem value="lab-results">Lab Results</SelectItem>
                <SelectItem value="medical-history">Medical History</SelectItem>
                <SelectItem value="insurance-card">Insurance Card</SelectItem>
                <SelectItem value="id-verification">ID Verification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="documentName" className="text-sm font-medium">
              Document Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.documentName}
              onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
              placeholder="Enter document name"
            />
          </div>

          <div>
            <Label htmlFor="reasonForRequest" className="text-sm font-medium">
              Reason for Request <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.reasonForRequest}
              onChange={(e) => setFormData({ ...formData, reasonForRequest: e.target.value })}
              placeholder="State why this document is required for the trial screening process..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="preferredSubmissionDeadline" className="text-sm font-medium">
              Preferred Submission Deadline <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={formData.preferredSubmissionDeadline}
              onChange={(e) => setFormData({ ...formData, preferredSubmissionDeadline: e.target.value })}
              className="w-full"
            />
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Send Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
