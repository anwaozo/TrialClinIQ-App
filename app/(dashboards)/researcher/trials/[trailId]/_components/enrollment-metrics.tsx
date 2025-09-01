"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const enrollmentFunnelData = [
  { name: "Matched", value: 58, color: "#e5e7eb" },
  { name: "Contacted", value: 58, color: "#3b82f6" },
  { name: "Pre-screen pass", value: 12, color: "#1d4ed8" },
  { name: "Enrolled", value: 12, color: "#1e40af" },
]

const leadSourcesData = [
  { name: "Referral", value: 10, color: "#3b82f6" },
  { name: "Social Media", value: 20, color: "#1d4ed8" },
  { name: "Public Form", value: 30, color: "#e5e7eb" },
  { name: "EHR Import", value: 30, color: "#e5e7eb" },
  { name: "Others", value: 10, color: "#1e40af" },
]

const disqualifiersData = [
  { name: "Age not eligible", value: 25 },
  { name: "Medication conflict", value: 20 },
  { name: "Comorbidity exclusion", value: 18 },
  { name: "Pregnancy status", value: 5 },
  { name: "Travel restrictions", value: 15 },
  { name: "Substance abuse history", value: 3 },
  { name: "Incorrect or missing diagnosis", value: 8 },
]

const enrollmentFunnelConfig = {
  matched: {
    label: "Matched",
    color: "#e5e7eb",
  },
  contacted: {
    label: "Contacted",
    color: "#3b82f6",
  },
  preScreenPass: {
    label: "Pre-screen pass",
    color: "#1d4ed8",
  },
  enrolled: {
    label: "Enrolled",
    color: "#1e40af",
  },
} satisfies ChartConfig

const leadSourcesConfig = {
  referral: {
    label: "Referral",
    color: "#3b82f6",
  },
  socialMedia: {
    label: "Social Media",
    color: "#1d4ed8",
  },
  publicForm: {
    label: "Public Form",
    color: "#e5e7eb",
  },
  ehrImport: {
    label: "EHR Import",
    color: "#e5e7eb",
  },
  others: {
    label: "Others",
    color: "#1e40af",
  },
} satisfies ChartConfig

const disqualifiersConfig = {
  value: {
    label: "Count",
    color: "#3b82f6",
  },
} satisfies ChartConfig

interface EnrollmentMetricsProps {
  trialId: string
}

export function EnrollmentMetrics({ trialId }: EnrollmentMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">58</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Enrolled Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Drop-off Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">25%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Time to Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.5 hrs</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Funnel Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Enrollment Funnel Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={enrollmentFunnelConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enrollmentFunnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {enrollmentFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {enrollmentFunnelData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadSourcesConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {leadSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {leadSourcesData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Disqualifiers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Common Disqualifiers</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={disqualifiersConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={disqualifiersData}
                layout="horizontal"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={180} tick={{ fontSize: 12 }} />
                <Bar dataKey="value" fill="#3b82f6" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
