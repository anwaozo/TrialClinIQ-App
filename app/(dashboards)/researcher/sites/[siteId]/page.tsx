import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SiteInformation } from "./_components/site-information";
import { SiteTrials } from "./_components/site-trials";
import { SiteVolunteers } from "./_components/site-volunteers";
import { SiteInsights } from "./_components/site-insights";

const siteData = {
  "buffalo-neuro-institute": {
    id: "buffalo-neuro-institute",
    name: "Buffalo Neuro Institute",
    type: "Teaching Hospital",
    address: "425 Michigan Avenue, Buffalo, NY 14203, United States",
    network: "Clinical Research Network",
  },
};

interface SitePageProps {
  params: {
    siteId: string;
  };
}

export default function SitePage({ params }: SitePageProps) {
  const site = siteData[params.siteId as keyof typeof siteData];

  if (!site) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/sites">All Sites</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-500">
              {site.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {site.name}
            </h1>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {site.type}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{site.address}</span>
          </div>

          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {site.network}
          </Badge>
        </div>

        <Button className="bg-gray-900 hover:bg-gray-800 text-white">
          Edit Site Info
        </Button>
      </div>

      <Tabs defaultValue="information" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="trials">Trials</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="insights">Performance & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="information">
          <SiteInformation siteId={site.id} />
        </TabsContent>

        <TabsContent value="trials">
          <SiteTrials siteId={site.id} />
        </TabsContent>

        <TabsContent value="volunteers">
          <SiteVolunteers siteId={site.id} />
        </TabsContent>

        <TabsContent value="insights">
          <SiteInsights siteId={site.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
