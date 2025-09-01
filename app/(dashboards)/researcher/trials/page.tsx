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
import { MoreHorizontal, Search } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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

const trialsData: Trial[] = [
  {
    id: "1",
    trialTitle: "Agorain, New Treatment for Chronic Neuropathy Pain",
    trialId: "NCT06084521",
    trialPhase: "Phase II",
    trialStatus: "Recruiting",
    sites: 2,
    matched: 16,
    preScreening: 5,
    preScreenPass: 7,
  },
  {
    id: "2",
    trialTitle: "Investigating Non-Opioid Pain Management Solutions",
    trialId: "NCT05872145",
    trialPhase: "Phase I",
    trialStatus: "Recruiting",
    sites: 2,
    matched: 20,
    preScreening: 5,
    preScreenPass: 13,
  },
  {
    id: "3",
    trialTitle: "Exploring Novel Interventions for Chronic Pain",
    trialId: "NCT05934022",
    trialPhase: "Phase IV",
    trialStatus: "Recruiting",
    sites: 1,
    matched: 5,
    preScreening: 5,
    preScreenPass: 11,
  },
  {
    id: "4",
    trialTitle: "A Randomized Study of Alternative Pain Therapies",
    trialId: "NCT06045987",
    trialPhase: "Phase I",
    trialStatus: "Recruiting",
    sites: 1,
    matched: 6,
    preScreening: 5,
    preScreenPass: 17,
  },
];

const columns: ColumnDef<Trial>[] = [
  {
    accessorKey: "trialTitle",
    header: "Trial Title",
    cell: ({ row }) => (
      <Link
        href={`/trials/${row.original.trialId}`}
        className="text-blue-600 hover:text-blue-800 font-medium"
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
  {
    id: "actions",
    cell: ({ row }) => {
      const trial = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/trials/${trial.trialId}`}>View Trial Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Trial</DropdownMenuItem>
            <DropdownMenuItem>View Volunteers</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TrialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Trials</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search trial title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Recruiting</SelectItem>
                <SelectItem value="recruiting">Recruiting</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Phase:</span>
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="phase1">Phase I</SelectItem>
                <SelectItem value="phase2">Phase II</SelectItem>
                <SelectItem value="phase3">Phase III</SelectItem>
                <SelectItem value="phase4">Phase IV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Trials Table */}
      <DashboardTable
        data={trialsData}
        columns={columns}
        totalItems={trialsData.length}
        currentPage={1}
        pageSize={10}
        hasPagination={true}
      />
    </main>
  );
}
