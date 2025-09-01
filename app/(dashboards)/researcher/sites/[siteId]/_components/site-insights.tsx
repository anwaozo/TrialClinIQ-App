"use client"

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SiteInsightsProps {
  siteId: string
}

const enrollmentFunnelData = [
  { name: "Matched", value: 58, color: "#e5e7eb" },
  { name: "Contacted", value: 58, color: "#3b82f6" },
  { name: "Pre-screen pass", value: 12, color: "#3b82f6" },
  { name: "Enrolled", value: 12, color: "#1e40af" },
]

const leadSourcesData = [
  { name: "Public Form", value: 30, color: "#e5e7eb" },
  { name: "Social Media", value: 30, color: "#3b82f6" },
  { name: "Referral", value: 20, color: "#3b82f6" },
  { name: "EHR Import", value: 10, color: "#e5e7eb" },
  { name: "Others", value: 10, color: "#1e40af" },
]

const disqualifiersData = [
  { name: "Age not eligible", value: 15 },
  { name: "Medication conflict", value: 12 },
  { name: "Comorbidity exclusion", value: 8 },
  { name: "Failed Inclusion Criteria", value: 3 },
  { name: "Travel restrictions", value: 12 },
  { name: "Declined Participation", value: 3 },
  { name: "No Contact Response", value: 7 },
]

const enrollmentProgressData = [
  { trial: "NCT06084521", preScreenPass: 80, matched: 70, target: 100 },
  { trial: "NCT05872145", preScreenPass: 85, matched: 75, target: 100 },
  { trial: "NCT05934022", preScreenPass: 80, matched: 85, target: 100 },
]

const enrollmentFunnelConfig = {
  matched: { label: "Matched", color: "#e5e7eb" },
  contacted: { label: "Contacted", color: "#3b82f6" },
  preScreenPass: { label: "Pre-screen pass", color: "#3b82f6" },
  enrolled: { label: "Enrolled", color: "#1e40af" },
}

const leadSourcesConfig = {
  publicForm: { label: "Public Form", color: "#e5e7eb" },
  socialMedia: { label: "Social Media", color: "#3b82f6" },
  referral: { label: "Referral", color: "#3b82f6" },
  ehrImport: { label: "EHR Import", color: "#e5e7eb" },
  others: { label: "Others", color: "#1e40af" },
}

const disqualifiersConfig = {
  value: { label: "Count", color: "#3b82f6" },
}

const enrollmentProgressConfig = {
  preScreenPass: { label: "Pre-screen Pass", color: "#3b82f6" },
  matched: { label: "Matched", color: "#1e40af" },
  target: { label: "Target", color: "#e5e7eb" },
}

export function SiteInsights({ siteId }: SiteInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">58</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Enrolled Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Drop-off Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">25%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Time to Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.5 hrs</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Funnel Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Enrollment Funnel Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={enrollmentFunnelConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enrollmentFunnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
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
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadSourcesConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
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
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Disqualifiers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Common Disqualifiers</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={disqualifiersConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={disqualifiersData}
                  layout="horizontal"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Enrollment Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Enrollment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={enrollmentProgressConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="trial" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="preScreenPass" fill="var(--color-preScreenPass)" />
                  <Bar dataKey="matched" fill="var(--color-matched)" />
                  <Bar dataKey="target" fill="var(--color-target)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
