"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Search,
  User,
  Calendar,
  Phone,
  Globe,
  Eye,
  FileText,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import DashboardTable from "../../../_components/dashboard-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TabType =
  | "overview"
  | "documents"
  | "connected-ehr"
  | "ai-match-report"
  | "appointments"
  | "notes";

interface Document {
  name: string;
  uploadedBy: string;
  dateUploaded: string;
  size: string;
  type: "diagnostic" | "lab" | "site";
}

interface Appointment {
  screeningType: string;
  date: string;
  time: string;
  location: string;
  meetingDetails: string;
  status: string;
}

interface Note {
  title: string;
  content: string;
  date: string;
}

const mockVolunteerData = {
  id: "DR-081",
  status: "Pre-Screening",
  trialName: "Agorain, New Treatment for Chronic Neuropathy Pain",
  demographics: {
    name: "Olivia Brian",
    email: "olivia.br@example.com",
    dateOfBirth: "27/03/1998",
    weight: "67kg",
    phoneNumber: "+1168141116",
    gender: "Female",
    race: "Black / African American",
    languagePreference: "English",
  },
  medications: [
    { name: "Pregabalin", dosage: "" },
    { name: "Gabapentin 75mg", dosage: "Twice Daily" },
  ],
  healthProfile: {
    bloodGroup: "O+",
    genotype: "AA",
    hearingImpaired: "No",
    visionImpaired: "No",
    primaryCondition: "Chronic Pain",
    diagnosed: "2024",
  },
  allergies: [
    { name: "Pollen", description: "Itchy nose and watery eyes" },
    { name: "Caffeine", description: "Sore throat" },
    { name: "Lactose intolerant", description: "Diarrhea and bloating" },
  ],
  compatibilityScore: {
    score: 80,
    totalCriteria: 7,
    passedCriteria: 6,
    passed: [
      "Condition match",
      "Location match",
      "Age requirement",
      "Gender requirement",
      "Race requirement",
      "Language requirement",
    ],
    failed: ["Date of diagnosis"],
  },
};

const mockDocuments: Document[] = [
  {
    name: "MRI Scan, June 2024",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    size: "3.0 MB",
    type: "diagnostic",
  },
  {
    name: "Electromyography (EMG)",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    size: "3.0 MB",
    type: "diagnostic",
  },
  {
    name: "CT Scan",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    size: "3.0 MB",
    type: "lab",
  },
  {
    name: "MRI Scan, June 2024",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    size: "3.0 MB",
    type: "lab",
  },
];

const mockAppointments: Appointment[] = [
  {
    screeningType: "Screening Visit",
    date: "Wed, June 12 2025",
    time: "11:00am",
    location: "Physical",
    meetingDetails: "Main Research Site",
    status: "Scheduled",
  },
  {
    screeningType: "Pre-Screening Call",
    date: "Mon, 12 July 2025",
    time: "12:00pm",
    location: "Virtual",
    meetingDetails: "www.zoom.com/aj...",
    status: "Completed",
  },
];

const mockNotes: Note[] = [
  {
    title: "Pre-screen Call Summary",
    content:
      "Volunteer confirmed eligibility based on age and primary diagnosis. Awaiting recent lab results to finalize pre-screen outcome. Participant expressed interest in participating if eligible.",
    date: "June 30, 2025",
  },
  {
    title: "Eligibility Concern",
    content:
      "Volunteer's MRI report missing from uploaded documents. Request sent for document submission. Screening visit on hold until document is received.",
    date: "June 30, 2025",
  },
];

export default function VolunteerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const volunteerId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [documentFilter, setDocumentFilter] = useState<
    "all" | "diagnostic" | "lab" | "site"
  >("all");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents", count: 6 },
    { id: "connected-ehr", label: "Connected EHR/EMR" },
    { id: "ai-match-report", label: "AI Match Report" },
    { id: "appointments", label: "Appointments" },
    { id: "notes", label: "Notes" },
  ];

  const documentColumns: ColumnDef<Document>[] = [
    {
      accessorKey: "name",
      header: "Document Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-red-500" />
          <div>
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="text-sm text-gray-500">{row.original.size}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "uploadedBy",
      header: "Uploaded By",
    },
    {
      accessorKey: "dateUploaded",
      header: "Date Uploaded",
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const appointmentColumns: ColumnDef<Appointment>[] = [
    {
      accessorKey: "screeningType",
      header: "Screening Type",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "time",
      header: "Time",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "meetingDetails",
      header: "Meeting Details",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={
            row.getValue("status") === "Completed"
              ? "bg-gray-100 text-gray-800"
              : "bg-green-100 text-green-800"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => router.push("/researcher/appointments")}
              className="cursor-pointer"
            >
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Edit appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredDocuments = mockDocuments.filter(
    (doc) => documentFilter === "all" || doc.type === documentFilter
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
      case "connected-ehr":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Demographics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Demographics</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">
                        {activeTab === "overview"
                          ? "Volunteer Name"
                          : "Patient Name"}
                      </div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.name}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Date of Birth</div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.dateOfBirth}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="text-sm text-gray-500">Weight</div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.weight}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Phone Number</div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.phoneNumber}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="text-sm text-gray-500">Gender</div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.gender}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Race</div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.race}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="text-sm text-gray-500">
                        Language Preference
                      </div>
                      <div className="font-medium">
                        {mockVolunteerData.demographics.languagePreference}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Allergies</h3>
                <div className="space-y-4">
                  {mockVolunteerData.allergies.map((allergy, index) => (
                    <div key={index}>
                      <div className="font-medium">{allergy.name}</div>
                      <div className="text-sm text-gray-500">
                        {allergy.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medications and Health Profile */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Medications</h3>
                  <div className="space-y-2">
                    {mockVolunteerData.medications.map((med, index) => (
                      <div key={index}>
                        <div className="font-medium">{med.name}</div>
                        {med.dosage && (
                          <div className="text-sm text-gray-500">
                            {med.dosage}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Health Profile</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Blood Group</div>
                      <div className="font-medium">
                        {mockVolunteerData.healthProfile.bloodGroup}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Genotype</div>
                      <div className="font-medium">
                        {mockVolunteerData.healthProfile.genotype}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Hearing Impaired</div>
                      <div className="font-medium">
                        {mockVolunteerData.healthProfile.hearingImpaired}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Vision Impaired</div>
                      <div className="font-medium">
                        {mockVolunteerData.healthProfile.visionImpaired}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Primary Condition</div>
                      <div className="font-medium">
                        {mockVolunteerData.healthProfile.primaryCondition}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Diagnosed</div>
                      <div className="font-medium">
                        {mockVolunteerData.healthProfile.diagnosed}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={documentFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDocumentFilter("all")}
                >
                  Diagnostic Reports{" "}
                  <Badge variant="secondary" className="ml-1">
                    4
                  </Badge>
                </Button>
                <Button
                  variant={documentFilter === "lab" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDocumentFilter("lab")}
                >
                  Lab Reports{" "}
                  <Badge variant="secondary" className="ml-1">
                    2
                  </Badge>
                </Button>
                <Button
                  variant={documentFilter === "site" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDocumentFilter("site")}
                >
                  Site Uploaded{" "}
                  <Badge variant="secondary" className="ml-1">
                    2
                  </Badge>
                </Button>
              </div>
              <div className="ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
            <DashboardTable
              data={filteredDocuments}
              columns={documentColumns}
              totalItems={filteredDocuments.length}
              currentPage={1}
              pageSize={10}
              hasPagination={true}
            />
          </div>
        );

      case "ai-match-report":
        return (
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Strong Match! This participant may qualify for your study.
                </h3>
                <p className="text-gray-600">
                  Based on their medical profile, this participant meets{" "}
                  {mockVolunteerData.compatibilityScore.passedCriteria} out of{" "}
                  {mockVolunteerData.compatibilityScore.totalCriteria}{" "}
                  eligibility criteria. Review match details and screening
                  options below.
                </p>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg
                      className="w-32 h-32 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${
                          mockVolunteerData.compatibilityScore.score * 2.51
                        } 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {mockVolunteerData.compatibilityScore.score}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Criteria passed{" "}
                          {mockVolunteerData.compatibilityScore.passedCriteria}/
                          {mockVolunteerData.compatibilityScore.totalCriteria}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    COMPATIBILITY SCORE
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">
                      Passed Criteria
                    </h4>
                    <div className="space-y-2">
                      {mockVolunteerData.compatibilityScore.passed.map(
                        (criteria, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm">{criteria}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">
                      Failed Criteria
                    </h4>
                    <div className="space-y-2">
                      {mockVolunteerData.compatibilityScore.failed.map(
                        (criteria, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm">{criteria}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "appointments":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by Patient ID, confidence s..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                + New Appointment
              </Button>
            </div>
            <DashboardTable
              data={mockAppointments}
              columns={appointmentColumns}
              totalItems={mockAppointments.length}
              currentPage={1}
              pageSize={10}
              hasPagination={true}
            />
          </div>
        );

      case "notes":
        return (
          <div className="space-y-4">
            {mockNotes.map((note, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{note.title}</h4>
                      <p className="text-gray-600 mb-2">{note.content}</p>
                      <div className="text-sm text-gray-500">{note.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>Dashboard</span>
          <span>›</span>
          <span>All Trials</span>
          <span>›</span>
          <span>{mockVolunteerData.trialName}</span>
          <span>›</span>
          <span className="text-gray-900">{mockVolunteerData.id}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mockVolunteerData.id}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Status:</span>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                {mockVolunteerData.status}
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count && (
                  <Badge variant="secondary" className="text-xs">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
