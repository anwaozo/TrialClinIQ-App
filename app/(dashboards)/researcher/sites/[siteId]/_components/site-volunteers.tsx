"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardTable from "../../../../_components/dashboard-table";

import type { ColumnDef } from "@tanstack/react-table";

interface SiteVolunteersProps {
  siteId: string;
}

interface Volunteer {
  volunteerId: string;
  primaryCondition: string;
  trialTitle: string;
  compatibility: string;
  trialStatus: string;
  trialLocation: string;
  dateMatched: string;
}

const volunteersData = [
  {
    volunteerId: "DR-081",
    primaryCondition: "Chronic Pain",
    trialTitle: "Agorain, New Treatmen...",
    compatibility: "92%",
    trialStatus: "Recruiting",
    trialLocation: "Buffalo, NY",
    dateMatched: "June 12, 2025",
  },
  {
    volunteerId: "MH-2988",
    primaryCondition: "Migraines",
    trialTitle: "Investigating Non-Opio...",
    compatibility: "92%",
    trialStatus: "Recruiting",
    trialLocation: "Niagara Falls, NY",
    dateMatched: "June 12, 2025",
  },
  {
    volunteerId: "KLSY298270982",
    primaryCondition: "Neuropathic Pain",
    trialTitle: "Exploring Novel Interve...",
    compatibility: "94%",
    trialStatus: "Recruiting",
    trialLocation: "Amherst, NY",
    dateMatched: "June 12, 2025",
  },
  {
    volunteerId: "DR-411",
    primaryCondition: "Neuropathy",
    trialTitle: "A Randomized Study of...",
    compatibility: "88%",
    trialStatus: "Recruiting",
    trialLocation: "Niagara Falls, NY",
    dateMatched: "June 12, 2025",
  },
];

const columns: ColumnDef<Volunteer>[] = [
  {
    accessorKey: "volunteerId",
    header: "Volunteer ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("volunteerId")}</div>
    ),
  },
  {
    accessorKey: "primaryCondition",
    header: "Primary Condition",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("primaryCondition")}</div>
    ),
  },
  {
    accessorKey: "trialTitle",
    header: "Trial Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("trialTitle")}</div>
    ),
  },
  {
    accessorKey: "compatibility",
    header: "Compatibility",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("compatibility")}
      </div>
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
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("trialLocation")}</div>
    ),
  },
  {
    accessorKey: "dateMatched",
    header: "Date Matched",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("dateMatched")}</div>
    ),
  },
];

export function SiteVolunteers({ siteId }: SiteVolunteersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [trialFilter, setTrialFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by Patient ID, confidence s..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Trial Title:</span>
          <Select value={trialFilter} onValueChange={setTrialFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="agorain">Agorain</SelectItem>
              <SelectItem value="non-opioid">Non-Opioid</SelectItem>
              <SelectItem value="novel">Novel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <Download className="h-4 w-4" />
          Download List
        </Button>
      </div>

      <DashboardTable
        data={volunteersData}
        columns={columns}
        totalItems={volunteersData.length}
        currentPage={1}
        pageSize={10}
        hasPagination={true}
      />
    </div>
  );
}
