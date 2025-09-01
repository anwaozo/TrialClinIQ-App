"use client";

import { useState } from "react";

import DashboardTable from "../../_components/dashboard-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Download } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { ScheduleAppointmentModal } from "./_components/schedule-appointment-modal";
import { ConfirmPrescreenPassModal } from "./_components/confirm-prescreen-pass-modal";
import { ConfirmPrescreenFailModal } from "./_components/confirm-prescreen-fail-modal";
import { RequestDocumentModal } from "./_components/request-document-modal";
import { UploadDocumentModal } from "./_components/upload-document-modal";
import { AddNoteModal } from "./_components/add-note-modal";

type TabType =
  | "matched"
  | "pre-screening"
  | "pre-screen-pass"
  | "pre-screen-fail";

type ModalType =
  | "schedule-appointment"
  | "confirm-prescreen-pass"
  | "confirm-prescreen-fail"
  | "request-document"
  | "upload-document"
  | "add-note"
  | null;

interface Volunteer {
  id: string;
  primaryCondition: string;
  trialTitle: string;
  compatibilityScore: string;
  trialStatus: string;
  trialLocation: string;
  dateMatched: string;
}

const volunteerData: Record<TabType, Volunteer[]> = {
  matched: [
    {
      id: "DR-081",
      primaryCondition: "Chronic Pain",
      trialTitle: "Agorain, New Treatment...",
      compatibilityScore: "92%",
      trialStatus: "Recruiting",
      trialLocation: "Buffalo, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "MH-2988",
      primaryCondition: "Migraines",
      trialTitle: "Investigating Non-Opio...",
      compatibilityScore: "92%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "KLSY298270982",
      primaryCondition: "Neuropathic Pain",
      trialTitle: "Exploring Novel Interve...",
      compatibilityScore: "94%",
      trialStatus: "Recruiting",
      trialLocation: "Amherst, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "DR-411",
      primaryCondition: "Neuropathy",
      trialTitle: "A Randomized Study of...",
      compatibilityScore: "88%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
  ],
  "pre-screening": [
    {
      id: "DR-081",
      primaryCondition: "Chronic Pain",
      trialTitle: "Agorain, New Treatment...",
      compatibilityScore: "92%",
      trialStatus: "Recruiting",
      trialLocation: "Buffalo, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "MH-2988",
      primaryCondition: "Migraines",
      trialTitle: "Investigating Non-Opio...",
      compatibilityScore: "92%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "KLSY298270982",
      primaryCondition: "Neuropathic Pain",
      trialTitle: "Exploring Novel Interve...",
      compatibilityScore: "94%",
      trialStatus: "Recruiting",
      trialLocation: "Amherst, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "DR-411",
      primaryCondition: "Neuropathy",
      trialTitle: "A Randomized Study of...",
      compatibilityScore: "88%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
  ],
  "pre-screen-pass": [
    {
      id: "DR-081",
      primaryCondition: "Chronic Pain",
      trialTitle: "Agorain, New Treatment...",
      compatibilityScore: "92%",
      trialStatus: "Recruiting",
      trialLocation: "Buffalo, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "MH-2988",
      primaryCondition: "Migraines",
      trialTitle: "Investigating Non-Opio...",
      compatibilityScore: "92%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "KLSY298270982",
      primaryCondition: "Neuropathic Pain",
      trialTitle: "Exploring Novel Interve...",
      compatibilityScore: "94%",
      trialStatus: "Recruiting",
      trialLocation: "Amherst, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "DR-411",
      primaryCondition: "Neuropathy",
      trialTitle: "A Randomized Study of...",
      compatibilityScore: "88%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
  ],
  "pre-screen-fail": [
    {
      id: "DR-081",
      primaryCondition: "Chronic Pain",
      trialTitle: "Agorain, New Treatment...",
      compatibilityScore: "80%",
      trialStatus: "Recruiting",
      trialLocation: "Buffalo, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "MH-2988",
      primaryCondition: "Migraines",
      trialTitle: "Investigating Non-Opio...",
      compatibilityScore: "70%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "KLSY298270982",
      primaryCondition: "Neuropathic Pain",
      trialTitle: "Exploring Novel Interve...",
      compatibilityScore: "87%",
      trialStatus: "Recruiting",
      trialLocation: "Amherst, NY",
      dateMatched: "June 12, 2025",
    },
    {
      id: "DR-411",
      primaryCondition: "Neuropathy",
      trialTitle: "A Randomized Study of...",
      compatibilityScore: "88%",
      trialStatus: "Recruiting",
      trialLocation: "Niagara Falls, NY",
      dateMatched: "June 12, 2025",
    },
  ],
};

const getActionsForTab =
  (
    tab: TabType,
    openModal: (modalType: ModalType, volunteer: Volunteer) => void
  ) =>
  (
    volunteer: Volunteer
  ): { label: string; onClick: (row: Volunteer) => void }[] => {
    const baseActions = [
      {
        label: "View Volunteer Profile",
        onClick: (row: Volunteer) =>
          (window.location.href = `/researcher/volunteers/${row.id}`),
      },
    ];

    switch (tab) {
      case "matched":
        return [
          ...baseActions,
          {
            label: "View AI Match Report",
            onClick: (row: Volunteer) =>
              console.log("View AI report for", row.id),
          },
          {
            label: "View Disqualification Reason",
            onClick: (row: Volunteer) =>
              console.log("View disqualification for", row.id),
          },
          {
            label: "Upload Documents",
            onClick: (row: Volunteer) => openModal("upload-document", row),
          },
          {
            label: "Add Notes",
            onClick: (row: Volunteer) => openModal("add-note", row),
          },
        ];
      case "pre-screening":
        return [
          ...baseActions,
          {
            label: "Schedule Prescreening",
            onClick: (row: Volunteer) => openModal("schedule-appointment", row),
          },
          {
            label: "Request Additional Documents",
            onClick: (row: Volunteer) => openModal("request-document", row),
          },
          {
            label: "Add Notes",
            onClick: (row: Volunteer) => openModal("add-note", row),
          },
          {
            label: "Move to Prescreening",
            onClick: (row: Volunteer) =>
              console.log("Move to prescreening", row.id),
          },
          {
            label: "Mark as Pre-Screen Fail",
            onClick: (row: Volunteer) =>
              openModal("confirm-prescreen-fail", row),
          },
        ];
      case "pre-screen-pass":
        return [
          ...baseActions,
          {
            label: "Schedule Appointments",
            onClick: (row: Volunteer) => openModal("schedule-appointment", row),
          },
          {
            label: "Request Additional Documents",
            onClick: (row: Volunteer) => openModal("request-document", row),
          },
          {
            label: "Upload Documents",
            onClick: (row: Volunteer) => openModal("upload-document", row),
          },
          {
            label: "Add Notes",
            onClick: (row: Volunteer) => openModal("add-note", row),
          },
          {
            label: "Mark as Pre-Screen Pass",
            onClick: (row: Volunteer) =>
              openModal("confirm-prescreen-pass", row),
          },
          {
            label: "Mark as Pre-Screen Fail",
            onClick: (row: Volunteer) =>
              openModal("confirm-prescreen-fail", row),
          },
        ];
      case "pre-screen-fail":
        return [
          ...baseActions,
          {
            label: "Schedule Appointment",
            onClick: (row: Volunteer) => openModal("schedule-appointment", row),
          },
          {
            label: "Request Additional Documents",
            onClick: (row: Volunteer) => openModal("request-document", row),
          },
          {
            label: "Upload Documents",
            onClick: (row: Volunteer) => openModal("upload-document", row),
          },
          {
            label: "Add Notes",
            onClick: (row: Volunteer) => openModal("add-note", row),
          },
          {
            label: "Mark as Pre-Screen Fail",
            onClick: (row: Volunteer) =>
              openModal("confirm-prescreen-fail", row),
          },
        ];
      default:
        return baseActions;
    }
  };

export default function VolunteersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("matched");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [trialFilter, setTrialFilter] = useState("all");

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
    null
  );

  const openModal = (modalType: ModalType, volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedVolunteer(null);
  };

  const createColumns = (activeTab: TabType): ColumnDef<Volunteer>[] => [
    {
      accessorKey: "id",
      header: "Volunteer ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "primaryCondition",
      header: "Primary Condition",
    },
    {
      accessorKey: "trialTitle",
      header: "Trial Title",
    },
    {
      accessorKey: "compatibilityScore",
      header: "Compatibility Score",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("compatibilityScore")}</div>
      ),
    },
    {
      accessorKey: "trialStatus",
      header: "Trial Status",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          {row.getValue("trialStatus")}
        </Badge>
      ),
    },
    {
      accessorKey: "trialLocation",
      header: "Trial Location",
    },
    {
      accessorKey: "dateMatched",
      header: "Date Matched",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const volunteer = row.original;
        const actions = getActionsForTab(activeTab, openModal)(volunteer);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {actions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(volunteer)}
                >
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const tabs = [
    { id: "matched", label: "Matched" },
    { id: "pre-screening", label: "Pre-screening" },
    { id: "pre-screen-pass", label: "Pre-screen pass" },
    { id: "pre-screen-fail", label: "Pre-screen fail" },
  ];

  const currentVolunteers = volunteerData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteers</h1>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by Patient ID, confidence s..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Date:" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Select value={trialFilter} onValueChange={setTrialFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Trial Title:" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="agorain">Agorain</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="exploring">Exploring</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            Download List
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Table */}
        <DashboardTable
          data={currentVolunteers}
          columns={createColumns(activeTab)}
          totalItems={currentVolunteers.length}
          currentPage={1}
          pageSize={10}
          hasPagination={true}
        />
      </main>

      <ScheduleAppointmentModal
        open={activeModal === "schedule-appointment"}
        onOpenChange={(open) => !open && closeModal()}
        volunteer={
          selectedVolunteer
            ? {
                id: selectedVolunteer.id,
                name: selectedVolunteer.id,
                email: "volunteer@example.com",
              }
            : undefined
        }
      />

      <ConfirmPrescreenPassModal
        open={activeModal === "confirm-prescreen-pass"}
        onOpenChange={(open) => !open && closeModal()}
        volunteer={
          selectedVolunteer
            ? { id: selectedVolunteer.id, name: selectedVolunteer.id }
            : undefined
        }
      />

      <ConfirmPrescreenFailModal
        open={activeModal === "confirm-prescreen-fail"}
        onOpenChange={(open) => !open && closeModal()}
        volunteer={
          selectedVolunteer
            ? { id: selectedVolunteer.id, name: selectedVolunteer.id }
            : undefined
        }
      />

      <RequestDocumentModal
        open={activeModal === "request-document"}
        onOpenChange={(open) => !open && closeModal()}
        volunteer={
          selectedVolunteer
            ? { id: selectedVolunteer.id, name: selectedVolunteer.id }
            : undefined
        }
      />

      <UploadDocumentModal
        open={activeModal === "upload-document"}
        onOpenChange={(open) => !open && closeModal()}
        volunteer={
          selectedVolunteer
            ? { id: selectedVolunteer.id, name: selectedVolunteer.id }
            : undefined
        }
      />

      <AddNoteModal
        open={activeModal === "add-note"}
        onOpenChange={(open) => !open && closeModal()}
        volunteer={
          selectedVolunteer
            ? { id: selectedVolunteer.id, name: selectedVolunteer.id }
            : undefined
        }
      />
    </div>
  );
}
