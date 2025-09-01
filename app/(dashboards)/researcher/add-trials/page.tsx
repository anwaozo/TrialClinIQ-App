"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Settings, Bell, User } from "lucide-react";
import Link from "next/link";

export default function ResearcherDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trials, setTrials] = useState([
    {
      id: 1,
      title: "Agorain Study for Neuropathic Pain",
      nctNumber: "NCT03456789",
      status: "Recruiting",
    },
    {
      id: 2,
      title: "Agorain Study for Neuropathic Pain",
      nctNumber: "NCT03456789",
      status: "Suspended",
    },
  ]);

  const [searchResults, setSearchResults] = useState([
    "Agorain Study for Neuropathic Pain",
    "Investigating Non-Opioid Therapies for Migraine Management",
    "Exploring Novel Interventions for Diabetic Peripheral Neuropathy",
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Active Clinical Trials
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Link your ongoing trials to TrialCliniq for faster patient match
              opportunities. You can search existing trials from
              ClinicalTrials.gov or add them manually.
            </p>
          </div>

          {/* Register Trial Card */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Register a Clinical Trial
              </h2>
              <p className="text-gray-600 mb-4">
                If your trial isn't available via search, you can manually
                register it here to connect with eligible participants.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                asChild
              >
                <Link href="/researcher/add-trials/register">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trial Manually
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Existing Trials Table */}
          {trials.length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium text-gray-900">
                          Trial Title
                        </th>
                        <th className="text-left py-3 font-medium text-gray-900">
                          NCT Number
                        </th>
                        <th className="text-left py-3 font-medium text-gray-900">
                          Status
                        </th>
                        <th className="text-right py-3 font-medium text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trials.map((trial) => (
                        <tr key={trial.id} className="border-b">
                          <td className="py-4 text-gray-900">{trial.title}</td>
                          <td className="py-4 text-gray-600">
                            {trial.nctNumber}
                          </td>
                          <td className="py-4">
                            <Badge
                              variant={
                                trial.status === "Recruiting"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                trial.status === "Recruiting"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {trial.status}
                            </Badge>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search from ClinicalTrials.gov */}
          <Card>
            <CardHeader>
              <CardTitle>Search from ClinicalTrials.gov</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Enter Trial NCT Number or Keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {searchQuery && (
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-900">{result}</span>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <span>
                  Your data stays private and protected with HIPAA-compliant
                  security.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
