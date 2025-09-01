"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, FileText, Shield } from "lucide-react"

interface UploadDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDocumentModal({ open, onOpenChange }: UploadDocumentModalProps) {
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentType, setDocumentType] = useState("diagnostic-report")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    if (!documentTitle) {
      setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleSubmit = () => {
    if (documentTitle && documentType && uploadedFile && agreedToTerms) {
      // Handle form submission
      console.log("Uploading document:", { documentTitle, documentType, uploadedFile })
      onOpenChange(false)
      // Reset form
      setDocumentTitle("")
      setDocumentType("diagnostic-report")
      setUploadedFile(null)
      setAgreedToTerms(false)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Upload Document</DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Let us know about any allergies you have. This helps us match you with trials safely.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Document Title */}
          <div className="space-y-2">
            <Label htmlFor="document-title">
              Document Title<span className="text-red-500">*</span>
            </Label>
            <Input
              id="document-title"
              placeholder="Input your document title"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
          </div>

          {/* Document Type */}
          <div className="space-y-2">
            <Label htmlFor="document-type">
              Select Document Type<span className="text-red-500">*</span>
            </Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diagnostic-report">Diagnostic Report</SelectItem>
                <SelectItem value="lab-report">Lab Report</SelectItem>
                <SelectItem value="medical-history">Medical History</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>
              Upload file<span className="text-red-500">*</span>
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : uploadedFile
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!uploadedFile ? (
                <>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Click to upload
                    </button>
                    <span className="text-gray-600"> or drag</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">and drop PDF, CSV</div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.csv,.doc,.docx"
                    onChange={handleFileSelect}
                  />
                </>
              ) : (
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{uploadedFile.name}</span>
                    <span className="text-xs text-gray-500">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            {uploadedFile && <div className="text-sm text-green-600">1 file added</div>}
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
              I agree to the Terms & Conditions and consent for my personal information to be shared with the sponsor or
              research site of this study to help determine my eligibility.
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!documentTitle || !documentType || !uploadedFile || !agreedToTerms}
            >
              Upload Document
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
