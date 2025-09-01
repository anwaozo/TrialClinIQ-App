"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardTable from "../../_components/dashboard-table";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

interface Site {
  id: string;
  siteName: string;
  location: string;
  activeTrials: number;
  volunteers: number;
  enrolled: number;
  trialStatus: string;
  dateMatched: string;
}

const sitesData: Site[] = [
  {
    id: "buffalo-neuro-institute",
    siteName: "Buffalo Neuro Institute",
    location: "Buffalo, NY",
    activeTrials: 3,
    volunteers: 57,
    enrolled: 9,
    trialStatus: "Recruiting",
    dateMatched: "June 12, 2025",
  },
  {
    id: "maplewood-study-facility",
    siteName: "Maplewood Study Facility",
    location: "Syracuse, NY",
    activeTrials: 5,
    volunteers: 31,
    enrolled: 5,
    trialStatus: "Recruiting",
    dateMatched: "June 12, 2025",
  },
  {
    id: "amherst-research-center",
    siteName: "Amherst Research Center",
    location: "Amherst, NY",
    activeTrials: 1,
    volunteers: 20,
    enrolled: 1,
    trialStatus: "Recruiting",
    dateMatched: "June 12, 2025",
  },
];

const columns: ColumnDef<Site>[] = [
  {
    accessorKey: "siteName",
    header: "Site Name",
    cell: ({ row }) => (
      <Link
        href={`/sites/${row.original.id}`}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        {row.getValue("siteName")}
      </Link>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "activeTrials",
    header: "Active Trials",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("activeTrials")}</div>
    ),
  },
  {
    accessorKey: "volunteers",
    header: "Volunteers",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("volunteers")}</div>
    ),
  },
  {
    accessorKey: "enrolled",
    header: "Enrolled",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("enrolled")}</div>
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
    accessorKey: "dateMatched",
    header: "Date Matched",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("dateMatched")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const site = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/researcher/sites/${site.id}`}>
                View Site Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Site</DropdownMenuItem>
            <DropdownMenuItem>View Volunteers</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function SitesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Sites</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Site
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by site name, location, num..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <DashboardTable
        data={sitesData}
        columns={columns}
        totalItems={sitesData.length}
        currentPage={1}
        pageSize={10}
        hasPagination={true}
      />
    </main>
  );
}
