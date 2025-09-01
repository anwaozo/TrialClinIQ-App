"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Upload,
  Eye,
  Download,
  Edit,
  Trash2,
  FileText,
} from "lucide-react";
import DashboardTable from "../../../_components/dashboard-table";
import type { ColumnDef } from "@tanstack/react-table";
import { UploadDocumentModal } from "./upload-document-modal";

interface Document {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  dateUploaded: string;
  type: "diagnostic" | "lab" | "other";
}

const documents: Document[] = [
  {
    id: "1",
    name: "MRI Scan, June 2024",
    size: "3.0 MB",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    type: "diagnostic",
  },
  {
    id: "2",
    name: "Electromyography (EMG)",
    size: "3.0 MB",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    type: "diagnostic",
  },
  {
    id: "3",
    name: "CT Scan",
    size: "3.0 MB",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    type: "diagnostic",
  },
  {
    id: "4",
    name: "MRI Scan, June 2024",
    size: "3.0 MB",
    uploadedBy: "Olivia Brian",
    dateUploaded: "4/6/2024",
    type: "diagnostic",
  },
];

export function DocumentsTab() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "name",
      header: "Document Name",
      cell: ({ row }) => {
        const doc = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                doc.type === "diagnostic" ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <FileText
                className={`h-4 w-4 ${
                  doc.type === "diagnostic" ? "text-red-600" : "text-green-600"
                }`}
              />
            </div>
            <div>
              <div className="font-medium">{doc.name}</div>
              <div className="text-sm text-gray-500">{doc.size}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "uploadedBy",
      header: "Uploaded By",
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue("uploadedBy")}</span>
      ),
    },
    {
      accessorKey: "dateUploaded",
      header: "Date Uploaded",
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue("dateUploaded")}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Document Type Filters */}
      <div className="flex items-center space-x-4">
        <Badge variant="outline" className="bg-white">
          Diagnostic Reports
          <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            4
          </span>
        </Badge>
        <Badge variant="outline" className="bg-white">
          Lab Reports
          <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            2
          </span>
        </Badge>
      </div>

      {/* Search and Upload */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload document
        </Button>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg border">
        <DashboardTable
          columns={columns}
          data={filteredDocuments}
          totalItems={filteredDocuments.length}
        />
      </div>

      <UploadDocumentModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
      />
    </div>
  );
}
