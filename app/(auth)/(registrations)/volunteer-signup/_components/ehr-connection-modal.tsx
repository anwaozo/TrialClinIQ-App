"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SearchIcon, ArrowLeftIcon, CheckIcon, MapPinIcon, PlusIcon } from "lucide-react"

interface EHRConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface Provider {
  id: string
  name: string
  logo: string
  portals: number
  isNew?: boolean
  locations?: { name: string; city: string }[]
}

const providers: Provider[] = [
  {
    id: "citizens",
    name: "Citizens Medical Center",
    logo: "MEDITECH EXPANSE",
    portals: 1,
    isNew: true,
    locations: [
      { name: "MD Anderson Cancer Center", city: "Sugar Land, TX" },
      { name: "MD Anderson Cancer Center", city: "Houston, TX" },
    ],
  },
  {
    id: "texas-endo",
    name: "Texas Endovascular Associates",
    logo: "athenahealth",
    portals: 1,
    isNew: true,
  },
  {
    id: "md-anderson",
    name: "MD Anderson Cancer Center",
    logo: "Epic",
    portals: 2,
  },
  {
    id: "mount-sinai",
    name: "Mount Sinai Health System",
    logo: "ORACLE",
    portals: 1,
  },
]

export function EHRConnectionModal({ isOpen, onClose, onComplete }: EHRConnectionModalProps) {
  const [step, setStep] = useState<"selection" | "provider" | "success">("selection")
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider)
    setStep("provider")
  }

  const handleConnect = () => {
    setStep("success")
  }

  const handleComplete = () => {
    onComplete()
    onClose()
    setStep("selection")
  }

  const renderProviderSelection = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Available EMR/EHRs</DialogTitle>
        <p className="text-gray-600 text-sm">
          Securely connect your health record to help TrialCliniq match you with the most relevant clinical trials
        </p>
      </DialogHeader>

      <div className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search healthcare systems or providers"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-sm font-medium text-gray-600">{provider.logo}</div>
                  <div className="flex items-center gap-2">
                    {provider.isNew && (
                      <Badge variant="destructive" className="text-xs">
                        New
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0 bg-transparent"
                      onClick={() => handleProviderSelect(provider)}
                    >
                      <PlusIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{provider.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {provider.portals} portal{provider.portals > 1 ? "s" : ""}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost" className="text-gray-600">
            Load more ⋯
          </Button>
        </div>

        <div className="text-right text-xs text-gray-500">
          Powered by <span className="font-medium">HEALTH GORILLA</span>
        </div>
      </div>
    </>
  )

  const renderProviderConnection = () => (
    <>
      <DialogHeader>
        <Button variant="ghost" size="sm" onClick={() => setStep("selection")} className="w-fit p-0 h-auto mb-2">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          {selectedProvider?.name}
        </Button>
      </DialogHeader>

      <div className="space-y-6">
        <p className="text-gray-600 text-sm">
          Connect your medical records securely with Health Gorilla to help TrialCliniq match you to the right clinical
          trials. Your data stays encrypted and HIPAA-compliant.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold text-xs">TC</span>
            </div>
            <span className="text-xs text-gray-600">TrialCliniq</span>
          </div>

          <div className="flex-1 border-t border-dashed border-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-2">
                <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-gray-600 font-bold text-xs">HG</span>
            </div>
            <span className="text-xs text-gray-600">HEALTH GORILLA</span>
          </div>

          <div className="flex-1 border-t border-dashed border-gray-300 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-2">
                <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-green-600 font-bold text-xs">ME</span>
            </div>
            <span className="text-xs text-gray-600">MEDITECH EXPANSE</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 text-xs">👥</span>
            </div>
            <p className="text-sm text-gray-600">
              Your personal information is never sold, and it's only accessed with your permission to help match you to
              the right clinical trials.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Connect your records by logging into your patient portal</p>
        </div>

        {selectedProvider?.locations && (
          <div className="space-y-3">
            {selectedProvider.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{location.name}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {location.city}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleConnect}>
                  Connect to Meditech expanse
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="text-right text-xs text-gray-500">
          Powered by <span className="font-medium">HEALTH GORILLA</span>
        </div>
      </div>
    </>
  )

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <CheckIcon className="h-8 w-8 text-blue-600" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Health Record Connected Successfully!</h2>
        <p className="text-gray-600">
          Your medical data has been securely imported. This will help us match you to the most suitable clinical
          trials.
        </p>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          Complete My Health Profile
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleComplete}>
          My Dashboard
        </Button>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-lg">👍</span>
          <span className="font-medium text-gray-900">You're a good match for these trials</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Agorain, New Treatment for Chronic Neuropathy Pain</h3>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPinIcon className="h-3 w-3 mr-1" />
                Amherst, NY - Multiple locations
              </div>
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                View trial
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Mindfulness-Based Therapy for Chronic Pain Relief</h3>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPinIcon className="h-3 w-3 mr-1" />
                Niagara Falls, NY
              </div>
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                View trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span>Your data stays private and protected with HIPAA-compliant security.</span>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {step === "selection" && renderProviderSelection()}
        {step === "provider" && renderProviderConnection()}
        {step === "success" && renderSuccess()}
      </DialogContent>
    </Dialog>
  )
}
