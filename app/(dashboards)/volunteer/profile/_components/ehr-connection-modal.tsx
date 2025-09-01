"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"

interface EHRConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (providerId: string, location: string) => void
  providerName?: string
}

export function EHRConnectionModal({
  isOpen,
  onClose,
  onConnect,
  providerName = "Citizens Medical Center",
}: EHRConnectionModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const locations = [
    {
      id: "sugar-land",
      name: "MD Anderson Cancer Center",
      location: "Sugar Land, TX",
      action: "Connect to Meditech expanse",
    },
    {
      id: "houston",
      name: "MD Anderson Cancer Center",
      location: "Houston, TX",
      action: "Connect to Meditech expanse",
    },
  ]

  const handleConnect = () => {
    if (selectedLocation) {
      const location = locations.find((l) => l.id === selectedLocation)
      if (location) {
        onConnect(selectedLocation, location.location)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-lg font-semibold">{providerName}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Connect your medical records securely with Health Gorilla to help TrialCliniq match you to the right
              clinical trials. Your data stays encrypted and HIPAA-compliant.
            </p>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-bold text-lg">TC</span>
                </div>
                <span className="text-sm text-gray-600">TrialCliniq</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <Shield className="h-5 w-5 text-gray-400" />
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-gray-600 font-bold text-xs">HG</span>
                </div>
                <span className="text-sm text-gray-600">HEALTH GORILLA</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <Shield className="h-5 w-5 text-gray-400" />
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-green-600 font-bold text-xs">ME</span>
                </div>
                <span className="text-sm text-gray-600">MEDITECH EXPANSE</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Shield className="h-4 w-4" />
              <span>
                Your personal information is never sold, and it's only accessed with your permission to help match you
                to the right clinical trials.
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 mb-4">
              Connect your records by logging into your patient portal
            </p>

            <div className="space-y-3">
              {locations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-colors ${selectedLocation === location.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{location.name}</div>
                        <div className="text-sm text-gray-600">{location.location}</div>
                      </div>
                      <div className="text-sm text-blue-600">{location.action}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Powered by HEALTH GORILLA</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
