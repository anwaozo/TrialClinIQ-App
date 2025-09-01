"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardTable from "../../../../_components/dashboard-table";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

interface SiteTrialsProps {
  siteId: string;
}

interface Trial {
  id: string;
  trialTitle: string;
  trialId: string;
  trialPhase: string;
  trialStatus: string;
  sites: number;
  matched: number;
  preScreening: number;
  preScreenPass: number;
}

const trialsData = [
  {
    id: "NCT06084521",
    trialTitle: "Agorain, New Treatment for C",
    trialId: "NCT06084521",
    trialPhase: "Phase II",
    trialStatus: "Recruiting",
    sites: 2,
    matched: 16,
    preScreening: 5,
    preScreenPass: 7,
  },
  {
    id: "NCT05872145",
    trialTitle: "Investigating Non-Opioid...",
    trialId: "NCT05872145",
    trialPhase: "Phase I",
    trialStatus: "Recruiting",
    sites: 2,
    matched: 20,
    preScreening: 5,
    preScreenPass: 13,
  },
  {
    id: "NCT05934022",
    trialTitle: "Exploring Novel Interven...",
    trialId: "NCT05934022",
    trialPhase: "Phase IV",
    trialStatus: "Recruiting",
    sites: 1,
    matched: 5,
    preScreening: 5,
    preScreenPass: 11,
  },
];

const columns: ColumnDef<Trial>[] = [
  {
    accessorKey: "trialTitle",
    header: "Trial Title",
    cell: ({ row }) => (
      <Link
        href={`/trials/${row.original.trialId}`}
        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
      >
        {row.getValue("trialTitle")}
      </Link>
    ),
  },
  {
    accessorKey: "trialId",
    header: "Trial ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("trialId")}</div>
    ),
  },
  {
    accessorKey: "trialPhase",
    header: "Trial Phase",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("trialPhase")}</div>
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
    accessorKey: "sites",
    header: "Sites",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("sites")}</div>
    ),
  },
  {
    accessorKey: "matched",
    header: "Matched",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("matched")}</div>
    ),
  },
  {
    accessorKey: "preScreening",
    header: "Pre-screening",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("preScreening")}</div>
    ),
  },
  {
    accessorKey: "preScreenPass",
    header: "Pre-screen Pass",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("preScreenPass")}</div>
    ),
  },
];

export function SiteTrials({ siteId }: SiteTrialsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search trial title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="recruiting">Recruiting</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Phase:</span>
          <Select value={phaseFilter} onValueChange={setPhaseFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="phase-i">Phase I</SelectItem>
              <SelectItem value="phase-ii">Phase II</SelectItem>
              <SelectItem value="phase-iii">Phase III</SelectItem>
              <SelectItem value="phase-iv">Phase IV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DashboardTable
        data={trialsData}
        columns={columns}
        totalItems={trialsData.length}
        currentPage={1}
        pageSize={10}
        hasPagination={true}
      />
    </div>
  );
}
