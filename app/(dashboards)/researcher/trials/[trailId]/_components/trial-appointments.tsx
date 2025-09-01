"use client";

import { useState } from "react";
import DashboardTable from "../../../../_components/dashboard-table";
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
import { MoreHorizontal, Search, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

interface Appointment {
  id: string;
  volunteerId: string;
  screeningType: string;
  date: string;
  time: string;
  location: string;
  meetingDetails: string;
  status: string;
}

const appointmentsData: Appointment[] = [
  {
    id: "1",
    volunteerId: "DR-081",
    screeningType: "Screening Visit",
    date: "Wed, June 12 2025",
    time: "11:00am",
    location: "Physical",
    meetingDetails: "Main Research Center",
    status: "Scheduled",
  },
  {
    id: "2",
    volunteerId: "DR-830",
    screeningType: "Pre-Screening Call",
    date: "Mon, 12 July 2025",
    time: "12:00pm",
    location: "Virtual",
    meetingDetails: "www.zoom.com/...",
    status: "Scheduled",
  },
  {
    id: "3",
    volunteerId: "DR-383",
    screeningType: "Screening Visit",
    date: "Wed, June 12 2025",
    time: "1:00pm",
    location: "Virtual",
    meetingDetails: "www.zoom.com/...",
    status: "Scheduled",
  },
  {
    id: "4",
    volunteerId: "DR-411",
    screeningType: "Pre-Screening Call",
    date: "Mon, 12 July 2025",
    time: "4:00pm",
    location: "Virtual",
    meetingDetails: "www.zoom.com/...",
    status: "Completed",
  },
];

const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "volunteerId",
    header: "Volunteer ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("volunteerId")}</div>
    ),
  },
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
    cell: ({ row }) => {
      const details = row.getValue("meetingDetails") as string;
      if (details.startsWith("www.")) {
        return (
          <a
            href={`https://${details}`}
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {details}
          </a>
        );
      }
      return <span>{details}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="secondary"
          className={
            status === "Completed"
              ? "bg-gray-100 text-gray-800"
              : "bg-green-100 text-green-800"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface TrialAppointmentsProps {
  trialId: string;
}

export function TrialAppointments({ trialId }: TrialAppointmentsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by Patient ID, confidence s..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Date:</span>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Location:</span>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Appointments Table */}
      <DashboardTable
        data={appointmentsData}
        columns={columns}
        totalItems={appointmentsData.length}
        currentPage={1}
        pageSize={10}
        hasPagination={true}
      />
    </div>
  );
}
