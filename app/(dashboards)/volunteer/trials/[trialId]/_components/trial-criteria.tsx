import { AlertCircle } from "lucide-react"

interface TrialCriteriaProps {
  trialId: string
}

export function TrialCriteria({ trialId }: TrialCriteriaProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inclusion Criteria</h3>
          <p className="text-gray-700 mb-4">You may qualify if:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Are 30 to 75 years old</li>
            <li>Have been diagnosed with chronic neuropathic pain for 6 months or more</li>
            <li>Pain intensity ≥4 on 0–10 scale</li>
            <li>Stable pain medication regimen for 4 weeks prior</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exclusion Criteria</h3>
          <p className="text-gray-700 mb-4">You may not qualify if you:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Have a history of seizure disorders</li>
            <li>Are currently dependent on opioid medications</li>
            <li>Are pregnant or breastfeeding</li>
            <li>Have severe cardiac, liver, or kidney diseases</li>
            <li>Are participating in another clinical trial</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-blue-800 text-sm">This trial does not accept healthy participants</p>
        </div>
      </div>
    </div>
  )
}
