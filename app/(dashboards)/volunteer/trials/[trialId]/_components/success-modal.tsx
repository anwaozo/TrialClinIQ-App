"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const router = useRouter()

  const handleBackToTrials = () => {
    onClose()
    router.push("/volunteer/eligible-trials")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center py-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
            <Check className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">Details Sent Successfully!</h2>

          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Your information has been securely sent to Niagara Health Research Site. A representative may contact you
            shortly to discuss your eligibility.
          </p>

          <Button onClick={handleBackToTrials} className="w-full bg-blue-600 hover:bg-blue-700">
            Back to Eligible Trials
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
