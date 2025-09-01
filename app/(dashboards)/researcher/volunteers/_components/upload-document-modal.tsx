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
import { FileText, Upload } from "lucide-react"

interface UploadDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  volunteer?: {
    id: string
    name: string
  }
}

export function UploadDocumentModal({ open, onOpenChange, volunteer }: UploadDocumentModalProps) {
  const [formData, setFormData] = useState({
    documentTitle: "",
    documentType: "",
    uploadedFile: null as File | null,
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Upload document:", formData)
    onOpenChange(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, uploadedFile: file })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Upload Document to Volunteer Profile</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Add documents collected during screening or site visits to maintain a complete volunteer record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="documentTitle" className="text-sm font-medium">
              Document Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.documentTitle}
              onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })}
              placeholder="Input your document title"
            />
          </div>

          <div>
            <Label htmlFor="documentType" className="text-sm font-medium">
              Select Document Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.documentType}
              onValueChange={(value) => setFormData({ ...formData, documentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical-records">Medical Records</SelectItem>
                <SelectItem value="lab-results">Lab Results</SelectItem>
                <SelectItem value="consent-forms">Consent Forms</SelectItem>
                <SelectItem value="screening-notes">Screening Notes</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">
              Upload file <span className="text-red-500">*</span>
            </Label>
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

          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Reason for including this document in the screening process..."
              rows={4}
            />
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Upload Document
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
