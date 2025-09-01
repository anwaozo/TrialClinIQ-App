"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";

interface InvestigatorInfoFormProps {
  onNext: () => void;
}

export function InvestigatorInfoForm({ onNext }: InvestigatorInfoFormProps) {
  const [formData, setFormData] = useState({
    investigatorName: "",
    useMyName: false,
    organizationName: "",
    sameAsSponsoring: false,
    investigatorPhone: "",
    useMyPhone: false,
    investigatorEmail: "",
    useMyEmail: false,
    regulatoryAuthority: "",
    regulatoryAddress: "",
    consentData: false,
    consentCommunication: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Investigator Information
          </h1>
          <p className="text-gray-600">
            Enter your site's contact and location details for trial
            coordination
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="investigatorName">Investigator Name*</Label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <Input
                  id="investigatorName"
                  placeholder="Enter full name of the site investigator"
                  value={formData.investigatorName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investigatorName: e.target.value,
                    })
                  }
                  required
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="useMyName"
                    checked={formData.useMyName}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        useMyName: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="useMyName" className="text-sm text-gray-600">
                    Use my name as investigator
                  </Label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="organizationName">
                    Affiliated Organization Name*
                  </Label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <Input
                  id="organizationName"
                  placeholder="Enter the affiliated organization name"
                  value={formData.organizationName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organizationName: e.target.value,
                    })
                  }
                  required
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="sameAsSponsoring"
                    checked={formData.sameAsSponsoring}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        sameAsSponsoring: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="sameAsSponsoring"
                    className="text-sm text-gray-600"
                  >
                    Same as sponsoring organization
                  </Label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="investigatorPhone">Investigator Phone*</Label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <Input
                  id="investigatorPhone"
                  placeholder="Enter the primary phone number for the investigator"
                  value={formData.investigatorPhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investigatorPhone: e.target.value,
                    })
                  }
                  required
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="useMyPhone"
                    checked={formData.useMyPhone}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        useMyPhone: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="useMyPhone" className="text-sm text-gray-600">
                    Use my phone number
                  </Label>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="investigatorEmail">Investigator Email*</Label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <Input
                  id="investigatorEmail"
                  type="email"
                  placeholder="Enter the primary email address for the investigator"
                  value={formData.investigatorEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investigatorEmail: e.target.value,
                    })
                  }
                  required
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="useMyEmail"
                    checked={formData.useMyEmail}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        useMyEmail: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="useMyEmail" className="text-sm text-gray-600">
                    Use my email address
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="regulatoryAuthority">
                  Regulatory Authority
                </Label>
                <Input
                  id="regulatoryAuthority"
                  placeholder="Enter the regulatory authority overseeing the trials"
                  value={formData.regulatoryAuthority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      regulatoryAuthority: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="regulatoryAddress">
                  Regulatory Authority Address
                </Label>
                <Input
                  id="regulatoryAddress"
                  placeholder="Enter the full mailing address of the regulatory authority"
                  value={formData.regulatoryAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      regulatoryAddress: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  By registering, you consent to receive trial match leads and
                  communication updates from TrialCliniq. Your site,
                  investigator and admin data will be securely stored in
                  compliance with HIPAA standards and will be used solely for
                  trial matching and engagement services within this platform.
                </p>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentData"
                    checked={formData.consentData}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        consentData: checked as boolean,
                      })
                    }
                    required
                  />
                  <Label
                    htmlFor="consentData"
                    className="text-sm text-gray-700"
                  >
                    I consent to the use of my professional and site data as
                    described.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentCommunication"
                    checked={formData.consentCommunication}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        consentCommunication: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="consentCommunication"
                    className="text-sm text-gray-700"
                  >
                    I agree to receive email and SMS notifications for trial
                    match leads and platform updates.
                  </Label>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Info className="w-4 h-4" />
                  <span>You may revoke consent at any time in Settings</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Create Account
              </Button>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <span>
                  Your data stays private and protected with HIPAA-compliant
                  security.
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
