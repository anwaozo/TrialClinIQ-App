import { Badge } from "@/components/ui/badge"

interface TrialInterventionsProps {
  trialId: string
}

export function TrialInterventions({ trialId }: TrialInterventionsProps) {
  const interventions = [
    {
      name: "Agorain 50mg oral tablet (once daily)",
      duration: "Minimum of six cycles",
      route: "Oral",
      mechanism: "N/A",
    },
    {
      name: "Agorain 100mg oral tablet (once daily)",
      duration: "Minimum of six cycles",
      route: "Oral",
      mechanism: "N/A",
    },
    {
      name: "Placebo tablet (once daily)",
      duration: "Minimum of six cycles",
      route: "Oral",
      mechanism: "N/A",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="space-y-8">
        {interventions.map((intervention, index) => (
          <div key={index} className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
            <h3 className="font-semibold text-gray-900 mb-2">{intervention.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{intervention.duration}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Route of Administration</h4>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {intervention.route}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Mechanism of Action</h4>
                <p className="text-gray-600">{intervention.mechanism}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
