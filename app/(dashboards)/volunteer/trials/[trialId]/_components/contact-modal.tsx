"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Shield } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  siteName?: string
}

export function ContactModal({ isOpen, onClose, onSuccess }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    travelDistance: "",
    consent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      onSuccess()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <Phone className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Contact This Research Site</DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Confirm your details so the research team can get in touch about your eligibility for this study.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Your Full Name (as on medical records)*</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Olivia Brian"
              required
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number*</Label>
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
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="flex-1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location*</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="3221 Sheridan Drive, Buffalo, NY 14226"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="travelDistance">Travel Distance*</Label>
            <Select
              value={formData.travelDistance}
              onValueChange={(value) => setFormData({ ...formData, travelDistance: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
                <SelectItem value="100">100 miles</SelectItem>
                <SelectItem value="200">200 miles</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              required
            />
            <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
              I agree to the Terms & Conditions and consent for my personal information to be shared with the sponsor or
              research site of this study to help determine my eligibility.
            </Label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={!formData.consent}>
              Send My Details
            </Button>
          </div>

          <div className="flex items-center justify-center text-xs text-gray-500 pt-2">
            <Shield className="h-3 w-3 mr-1" />
            Your information is securely shared only with this research site and never sold.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
