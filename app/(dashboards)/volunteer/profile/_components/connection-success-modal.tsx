"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield } from "lucide-react"

interface ConnectionSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onCompleteProfile: () => void
  onGoToDashboard: () => void
}

export function ConnectionSuccessModal({
  isOpen,
  onClose,
  onCompleteProfile,
  onGoToDashboard,
}: ConnectionSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Health Record Connected Successfully!</h2>
            <p className="text-gray-600">
              Your medical data has been securely imported. This will help us match you to the most suitable clinical
              trials.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCompleteProfile} className="flex-1 bg-transparent">
              Complete My Health Profile
            </Button>
            <Button onClick={onGoToDashboard} className="flex-1">
              My Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>Your data stays private and protected with HIPAA-compliant security.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
