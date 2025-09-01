"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Plus, Unlink } from "lucide-react";
import DashboardTable from "../../../_components/dashboard-table";
import type { ColumnDef } from "@tanstack/react-table";
import { EHRConnectionModal } from "./ehr-connection-modal";
import { DisconnectModal } from "./disconnect-modal";
import { ConnectionSuccessModal } from "./connection-success-modal";

interface ConnectedProvider {
  id: string;
  name: string;
  location: string;
  dataImported: string;
  dateUploaded: string;
  status: "connected" | "syncing";
}

interface AvailableProvider {
  id: string;
  name: string;
  logo: string;
  portals: number;
  isNew?: boolean;
}

const connectedProviders: ConnectedProvider[] = [
  {
    id: "1",
    name: "Scott & White Clinic (Temple area)",
    location: "Temple, TX",
    dataImported: "Medications, Diagnoses, Lab Results, Vitals",
    dateUploaded: "Last synced: 1hr ago",
    status: "connected",
  },
  {
    id: "2",
    name: "Central Texas Oncology Clinic",
    location: "Killeen, TX",
    dataImported: "Medications, Diagnoses, Lab Results, Vitals",
    dateUploaded: "Last synced: 1hr ago",
    status: "connected",
  },
];

const availableProviders: AvailableProvider[] = [
  {
    id: "1",
    name: "Citizens Medical Center",
    logo: "MEDITECH EXPANSE",
    portals: 1,
    isNew: true,
  },
  {
    id: "2",
    name: "Texas Endovascular Associates",
    logo: "athenahealth",
    portals: 1,
    isNew: true,
  },
  {
    id: "3",
    name: "MD Anderson Cancer Center",
    logo: "Epic",
    portals: 2,
  },
  {
    id: "4",
    name: "Mount Sinai Health System",
    logo: "ORACLE",
    portals: 1,
  },
];

export function ConnectedEHRTab() {
  const [hasConnections] = useState(true); // Toggle this to show empty state
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProviders, setShowAllProviders] = useState(false);
  const [connectionModal, setConnectionModal] = useState<{
    isOpen: boolean;
    providerName?: string;
  }>({ isOpen: false });
  const [disconnectModal, setDisconnectModal] = useState<{
    isOpen: boolean;
    providerName?: string;
  }>({ isOpen: false });
  const [successModal, setSuccessModal] = useState(false);

  const columns: ColumnDef<ConnectedProvider>[] = [
    {
      accessorKey: "name",
      header: "Provider Name",
      cell: ({ row }) => {
        const provider = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-xs font-bold text-blue-600">
                {provider.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="font-medium">{provider.name}</div>
              <div className="text-sm text-gray-500">{provider.location}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "dataImported",
      header: "Data Imported",
      cell: ({ row }) => (
        <span className="text-gray-900">{row.getValue("dataImported")}</span>
      ),
    },
    {
      accessorKey: "dateUploaded",
      header: "Date Uploaded",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex items-center space-x-2">
            <span className="text-gray-900">
              {row.getValue("dateUploaded")}
            </span>
            <div
              className={`h-2 w-2 rounded-full ${
                status === "connected" ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setDisconnectModal({
              isOpen: true,
              providerName: row.original.name,
            })
          }
        >
          <Unlink className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      ),
    },
  ];

  const displayedProviders = showAllProviders
    ? availableProviders
    : availableProviders.slice(0, 4);

  const handleConnect = (providerId: string, location: string) => {
    setConnectionModal({ isOpen: false });
    setSuccessModal(true);
  };

  const handleDisconnect = () => {
    setDisconnectModal({ isOpen: false });
    // Handle disconnect logic here
  };

  const handleCompleteProfile = () => {
    setSuccessModal(false);
    // Navigate to health profile completion
  };

  const handleGoToDashboard = () => {
    setSuccessModal(false);
    // Navigate to dashboard
  };

  return (
    <div className="space-y-8">
      {/* Current Integrations */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Current Integrations</h3>
        <p className="text-gray-600 mb-6">
          Manage your linked electronic health records and control how
          TrialCliniq uses your medical data to match you with relevant clinical
          trials.
        </p>

        {hasConnections ? (
          <div className="bg-white rounded-lg border">
            <DashboardTable
              columns={columns}
              data={connectedProviders}
              totalItems={connectedProviders.length}
            />
            <div className="px-6 py-4 border-t"></div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mb-4">
                <div className="text-lg font-medium mb-2">
                  No connected health records yet.
                </div>
                <p className="text-gray-600 mb-6">
                  Connect your electronic health record to improve your trial
                  matches and save time filling out medical history forms.
                </p>
                <Button>Connect Now</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-4">
          <Shield className="h-4 w-4" />
          <span>
            Your connected health records are encrypted and securely stored in
            compliance with HIPAA standards. You can disconnect access at any
            time.
          </span>
        </div>
      </div>

      {/* Available EMR/EHRs */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Available EMR/EHRs</h3>
        <p className="text-gray-600 mb-6">
          Securely connect your health record to help TrialCliniq match you with
          the most relevant clinical trials
        </p>

        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search healthcare systems or providers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAllProviders(!showAllProviders)}
          >
            {showAllProviders ? "View less" : "View all"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {displayedProviders.map((provider) => (
            <Card key={provider.id} className="relative">
              <CardContent className="p-4">
                {provider.isNew && (
                  <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">
                    New
                  </Badge>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-blue-600">
                    {provider.logo}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setConnectionModal({
                        isOpen: true,
                        providerName: provider.name,
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mb-3">
                  <div className="font-medium text-sm">{provider.name}</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {provider.portals} portal{provider.portals !== 1 ? "s" : ""}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {!showAllProviders && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setShowAllProviders(true)}>
              Load more
            </Button>
          </div>
        )}

        <div className="flex items-center justify-end text-sm text-gray-500 mt-6">
          <span>Powered by</span>
          <div className="ml-2 font-medium">HEALTH GORILLA</div>
        </div>
      </div>

      {/* Modal components */}
      <EHRConnectionModal
        isOpen={connectionModal.isOpen}
        onClose={() => setConnectionModal({ isOpen: false })}
        onConnect={handleConnect}
        providerName={connectionModal.providerName}
      />

      <DisconnectModal
        isOpen={disconnectModal.isOpen}
        onClose={() => setDisconnectModal({ isOpen: false })}
        onConfirm={handleDisconnect}
        providerName={disconnectModal.providerName}
      />

      <ConnectionSuccessModal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        onCompleteProfile={handleCompleteProfile}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}
