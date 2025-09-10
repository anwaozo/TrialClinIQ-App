import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Upload, Search, MoreHorizontal, ChevronRight } from "lucide-react";

export default function VolunteerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, Olivia
        </h1>
        <div className="grid grid-cols-1 gap-8">
          {/* Left Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Health Profile Card */}
            <Card className="bg-green-50 border-green-200 h-[200px]">
              <CardContent className="p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Complete your health profile for better trial matches
              </h3>
              <Progress value={95} className="w-full h-2 mb-4" />
            </div>
            <span className="text-2xl font-bold text-gray-900">95%</span>
          </div>
          <Button
            variant="outline"
            className="text-gray-700 bg-transparent mt-auto"
          >
            Complete now <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
              </CardContent>
            </Card>

            {/* Upload Medical Record */}
            <div>
              <Card className="h-[200px]">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-full flex items-center justify-center p-2">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
            Upload New Medical Record
                </h3>
                <p className="text-gray-600 text-sm">
            You can quickly upload newly acquired medical records to
            make trial matches more specific
                </p>
              </div>
            </div>
          </CardContent>
              </Card>
            </div>
          
            <div className="space-y-4">
              {/* Consent Status */}
             <Card className="h-[200px]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Consent Status</CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-semibold text-[#05603A]">
                      Active
                    </span>
                    <div className="w-8 h-8 bg-green-500 rounded"></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Last updated: 17 Jun, 2025
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Trial Matches */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trial Matches</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search" className="pl-10 w-64" />
              </div>
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
                        Trial ID
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Trial Status
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Trial Phase
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Compatibility Score
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        Interventions
                      </th>
                      <th className="text-right py-3 text-sm font-medium text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-4 text-sm text-gray-900">
                        Agorain, New Treatment for
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        NCT06084521
                      </td>
                      <td className="py-4">
                        <Badge className="bg-green-100 text-green-800">
                          Recruiting
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Phase II
                        </Badge>
                      </td>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        90%
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        Agorain 50mg / 1...
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">
                          Contact centre{" "}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-sm text-gray-900">
                        Investigating Non-Opi...
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        NCT05872145
                      </td>
                      <td className="py-4">
                        <Badge className="bg-green-100 text-green-800">
                          Recruiting
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Phase I
                        </Badge>
                      </td>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        90%
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        Agorain 50mg / 1...
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">
                          Contact centre{" "}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-sm text-gray-900">
                        Exploring Novel Interv...
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        NCT059340...
                      </td>
                      <td className="py-4">
                        <Badge className="bg-green-100 text-green-800">
                          Recruiting
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Phase IV
                        </Badge>
                      </td>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        90%
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        Agorain 50mg / 1...
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">
                          Contact centre{" "}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-sm text-gray-900">
                        A Randomized Study o...
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        NCT060459...
                      </td>
                      <td className="py-4">
                        <Badge className="bg-green-100 text-green-800">
                          Recruiting
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Phase I
                        </Badge>
                      </td>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        90%
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        Agorain 50mg / 1...
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">
                          Contact centre{" "}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">
                  View All Trials <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
