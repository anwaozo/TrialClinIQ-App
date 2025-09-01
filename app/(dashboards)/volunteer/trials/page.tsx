"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardTable from "../../_components/dashboard-table";
import type { ColumnDef } from "@tanstack/react-table";

interface EligibleTrial {
  trialTitle: string;
  trialId: string;
  trialStatus: string;
  trialPhase: string;
  interventions: string;
  compatibilityScore: string;
}

const columns: ColumnDef<EligibleTrial>[] = [
  {
    accessorKey: "trialTitle",
    header: "Trial Title",
    cell: ({ row }) => (
      <Link
        href={`/volunteer/trials/${row.getValue("trialId")}`}
        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
      >
        {row.getValue("trialTitle")}
      </Link>
    ),
  },
  {
    accessorKey: "trialId",
    header: "Trial ID",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.getValue("trialId")}</span>
    ),
  },
  {
    accessorKey: "trialStatus",
    header: "Trial Status",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        {row.getValue("trialStatus")}
      </Badge>
    ),
  },
  {
    accessorKey: "trialPhase",
    header: "Trial Phase",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-blue-50 text-blue-700 border-blue-200"
      >
        {row.getValue("trialPhase")}
      </Badge>
    ),
  },
  {
    accessorKey: "interventions",
    header: "Interventions",
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm">
        {row.getValue("interventions")}
      </span>
    ),
  },
  {
    accessorKey: "compatibilityScore",
    header: "Compatibility Score",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="font-semibold text-gray-900">
          {row.getValue("compatibilityScore")}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`/volunteer/eligible-trials/${row.getValue("trialId")}`}>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
        >
          View →
        </Button>
      </Link>
    ),
  },
];

const mockTrials: EligibleTrial[] = [
  {
    trialTitle: "Agorain, New Treatment for Chronic Neuropathy Pain",
    trialId: "NCT06084521",
    trialStatus: "Recruiting",
    trialPhase: "Phase II",
    interventions: "Agorain 50mg / 100mg daily vs. placebo",
    compatibilityScore: "90%",
  },
  {
    trialTitle: "Investigating Non-Opioid Pain Management",
    trialId: "NCT05872145",
    trialStatus: "Recruiting",
    trialPhase: "Phase I",
    interventions: "Agorain 50mg / 100mg daily vs. placebo",
    compatibilityScore: "90%",
  },
  {
    trialTitle: "Exploring Novel Interventions for Chronic Pain",
    trialId: "NCT05934022",
    trialStatus: "Recruiting",
    trialPhase: "Phase IV",
    interventions: "Agorain 50mg / 100mg daily vs. placebo",
    compatibilityScore: "90%",
  },
  {
    trialTitle: "A Randomized Study of Alternative Pain Treatments",
    trialId: "NCT06045987",
    trialStatus: "Recruiting",
    trialPhase: "Phase I",
    interventions: "Agorain 50mg / 100mg daily vs. placebo",
    compatibilityScore: "90%",
  },
];

export default function EligibleTrialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Eligible Trials</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search" className="pl-10 w-80" />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <DashboardTable
          columns={columns}
          data={mockTrials}
          totalItems={mockTrials.length}
        />
        <div className="px-6 py-4 border-t border-gray-200"></div>
      </div>
    </div>
  );
}
