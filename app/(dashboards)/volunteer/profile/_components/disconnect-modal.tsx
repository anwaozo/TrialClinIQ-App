"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"

interface DisconnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  providerName?: string
}

export function DisconnectModal({
  isOpen,
  onClose,
  onConfirm,
  providerName = "this health record source",
}: DisconnectModalProps) {
  const consequences = [
    "You may stop receiving new clinical trial matches based on your most current health information.",
    "Your existing trial suggestions and compatibility scores may become outdated.",
    "You might miss trial opportunities that require ongoing health record updates.",
    "Any future AI-powered matching will only use the information you manually entered.",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <span>Are you sure you want to disconnect {providerName}?</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-gray-600">
            If you disconnect, TrialCliniq will no longer have access to your latest health data from this provider.
            This means:
          </p>

          <div className="space-y-3">
            {consequences.map((consequence, index) => (
              <div key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{consequence}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              You can reconnect this source at any time from your health profile.
            </p>
            <p className="text-sm text-gray-700">
              Your existing personal data will remain secure and stored in accordance with HIPAA regulations until you
              choose to delete your account or revoke consent for future trial updates.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Keep Connected
            </Button>
            <Button variant="destructive" onClick={onConfirm} className="flex-1">
              Yes, Disconnect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
