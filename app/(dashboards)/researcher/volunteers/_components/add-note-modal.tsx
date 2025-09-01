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
import { FileText } from "lucide-react"

interface AddNoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  volunteer?: {
    id: string
    name: string
  }
}

export function AddNoteModal({ open, onOpenChange, volunteer }: AddNoteModalProps) {
  const [formData, setFormData] = useState({
    noteTitle: "",
    noteDetails: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Add note:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">Add screening note</DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Record important observations, eligibility decisions, or site instructions related to this volunteer's
            screening process.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="noteTitle" className="text-sm font-medium">
              Note Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.noteTitle}
              onChange={(e) => setFormData({ ...formData, noteTitle: e.target.value })}
              placeholder="Enter document name"
            />
          </div>

          <div>
            <Label htmlFor="noteDetails" className="text-sm font-medium">
              Note Details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.noteDetails}
              onChange={(e) => setFormData({ ...formData, noteDetails: e.target.value })}
              placeholder="Enter details for this note"
              rows={6}
            />
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Send Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
