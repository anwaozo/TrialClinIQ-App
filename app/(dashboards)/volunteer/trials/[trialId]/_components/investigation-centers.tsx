"use client"

import { Button } from "@/components/ui/button"

interface InvestigationCentersProps {
  trialId: string
  onContactClick: () => void
}

export function InvestigationCenters({ trialId, onContactClick }: InvestigationCentersProps) {
  const centers = [
    {
      name: "Amherst Clinical Research Unit",
      address: "2455 Sweet Home Road, Amherst, NY 14228",
      phone: "+1 (716) 555-1123",
    },
    {
      name: "Buffalo Clinical Research Center",
      address: "89 Elmwood Avenue, Buffalo, NY 14222",
      phone: "+1 (716) 555-0198",
    },
    {
      name: "Rochester Research Center",
      address: "316 East Avenue, Rochester, NY 14604",
      phone: "+1 (585) 555-7782",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="space-y-8">
        {centers.map((center, index) => (
          <div key={index} className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{center.name}</h3>
                <p className="text-gray-600 mb-1">{center.address}</p>
                <p className="text-gray-600">Site Contact: {center.phone}</p>
              </div>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                onClick={onContactClick}
              >
                Contact Center
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
