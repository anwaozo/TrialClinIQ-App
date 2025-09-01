import { Card, CardContent } from "@/components/ui/card"

interface SiteInformationProps {
  siteId: string
}

export function SiteInformation({ siteId }: SiteInformationProps) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Conditions Your Site Accepts</h3>
              <div className="space-y-1">
                <p className="text-gray-900">Pain</p>
                <p className="text-gray-900">Chronic Neuropathic Pain</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Principal Investigator</h3>
              <div className="space-y-1">
                <p className="text-gray-900 font-medium">Dr. Hannah Greene, MD</p>
                <p className="text-gray-600">
                  Neurology & Pain Management Specialist, Buffalo Clinical Research Center
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Investigator Phone</h3>
              <p className="text-gray-900">Phone: +1 (716) 555-0198</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Investigator Email</h3>
              <p className="text-gray-900">trials@neurovance.com</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Languages spoken at site</h3>
              <div className="space-y-1">
                <p className="text-gray-900">English</p>
                <p className="text-gray-900">French</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Info</h3>
              <div className="space-y-1">
                <p className="text-gray-900">Name: Sarah Lawson, Study Coordinator</p>
                <p className="text-gray-900">Phone: +1 (716) 555-0198</p>
                <p className="text-gray-900">Email: trials@neurovance.com</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Sponsored By</h3>
            <p className="text-gray-900">NeuroVance Therapeutics, Inc. (NVTI)</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Regulatory Authority</h3>
            <div className="space-y-1">
              <p className="text-gray-900">U.S. Food and Drug Administration (FDA)</p>
              <p className="text-gray-600">10903 New Hampshire Avenue, Silver Spring, MD 20993, United States</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
