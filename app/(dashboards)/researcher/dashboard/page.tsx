import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock } from "lucide-react";

export default function ResearcherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, Adam
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Trial Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Add or link a trial
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Connect an existing trial to your profile or register a
                      new one to start managing participants and matches.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Trials Managed
                      </p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Sites Managed
                      </p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trials Table */}
            <Card>
              <CardHeader>
                <CardTitle>Trial Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Trial Title
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Trial Status
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          Pre-screen Pass
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">
                          New Match
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-4 text-sm text-gray-900">
                          Agorain, New Treatment for Chronic Neu...
                        </td>
                        <td className="py-4">
                          <Badge className="bg-green-100 text-green-800">
                            Recruiting
                          </Badge>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          12
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          2
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-sm text-gray-900">
                          Investigating Non-Opioid Therapies for...
                        </td>
                        <td className="py-4">
                          <Badge className="bg-gray-100 text-gray-800">
                            Suspended
                          </Badge>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          12
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          4
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-sm text-gray-900">
                          Exploring Novel Interventions for Diabetic...
                        </td>
                        <td className="py-4">
                          <Badge className="bg-blue-100 text-blue-800">
                            Completed
                          </Badge>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          5
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">
                          1
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">View All Trials</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Pre-Screening Call with DG-0109
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>11:30 - 12:00</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Cottage Medicare Hospital, Houston 101245, Texas
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Pre-Screening Call with DG-0109
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>11:30 - 12:00</span>
                    </div>
                    <p className="text-sm text-gray-600">Online</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Pre-Screening Call with DG-0109
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Appointments
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newly Matched */}
            <Card>
              <CardHeader>
                <CardTitle>Newly Matched</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">DG-081</p>
                      <p className="text-sm text-gray-600">
                        Agorain, New Treatment for Chronic Neuropathy...
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">AG - 002</p>
                      <p className="text-sm text-gray-600">
                        Investigating Non-Opioid Therapies for Migraine...
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">MN-290</p>
                      <p className="text-sm text-gray-600">
                        Agorain, New Treatment for Chronic Neuropathy...
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">MN-290</p>
                      <p className="text-sm text-gray-600">
                        Exploring Novel Interventions for Diabetic Periph...
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Volunteers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
