interface TrialDescriptionProps {
  trial: {
    id: string;
    title: string;
    trialId: string;
    phase: string;
    ageRequirement: string;
    status: string;
  };
}

export function TrialDescription({ trial }: TrialDescriptionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="space-y-8">
        {/* About this study */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            About this study
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>
              This clinical trial is evaluating the safety and effectiveness of
              Agorain, an investigational oral medication, for the treatment of
              chronic neuropathic pain in adults. Chronic neuropathic pain is a
              long-term condition caused by nerve damage or dysfunction, leading
              to persistent discomfort or pain.
            </p>
            <p>
              If you've been diagnosed with chronic nerve-related pain, you may
              be eligible to participate in this research study and help advance
              new treatment options for others living with the same condition.
            </p>
          </div>
        </div>

        {/* Gender */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">Gender</h4>
          <p className="text-gray-700">Open to both males and females</p>
        </div>

        {/* Purpose of Study */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">
            Purpose of Study
          </h4>
          <p className="text-gray-700 mb-3">The purpose of this study is to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              Assess whether Agorain reduces pain intensity in individuals with
              chronic neuropathy pain
            </li>
            <li>
              Evaluate the safety and tolerability of different doses of Agorain
            </li>
            <li>Monitor changes in quality of life and daily functioning</li>
          </ul>
        </div>

        {/* Participation Benefits */}
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-2">
            Participation Benefits
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Study-related care at no cost</li>
            <li>
              Potential access to an investigational treatment before it's
              widely available
            </li>
            <li>Travel compensation may be available</li>
            <li>
              Contribution to advancing medical knowledge in neuropathic pain
              treatment
            </li>
          </ul>
        </div>

        {/* Study Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Sponsored By
            </h4>
            <p className="text-gray-700">NeuroVance Therapeutics, Inc.</p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Interventions
            </h4>
            <p className="text-gray-700">
              Agorain 50mg / 100mg daily vs. placebo (Oral investigational
              medication)
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Principal Investigator
            </h4>
            <div className="text-gray-700">
              <p className="font-medium">Dr. Hannah Greene, MD</p>
              <p className="text-sm">
                Neurology & Pain Management Specialist, Buffalo Clinical
                Research Center
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Contact Info
            </h4>
            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <span className="font-medium">Name:</span> Sarah Lawson, Study
                Coordinator
              </p>
              <p>
                <span className="font-medium">Phone:</span> +1 (716) 555-0198
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                trials@neurovance.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
