"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Chrome, Badge as Edge, Smartphone } from "lucide-react";

type SettingsTab = "consent" | "notifications" | "security";

interface Session {
  id: string;
  browser: string;
  device: string;
  location: string;
  lastSeen: string;
  isCurrent: boolean;
  icon: React.ReactNode;
}

const mockSessions: Session[] = [
  {
    id: "1",
    browser: "Chrome on macOS",
    device: "Current session",
    location: "Houston, TX",
    lastSeen: "",
    isCurrent: true,
    icon: <Chrome className="h-5 w-5" />,
  },
  {
    id: "2",
    browser: "Microsoft Edge on Windows",
    device: "Last seen 2 days ago",
    location: "Houston, TX",
    lastSeen: "2 days ago",
    isCurrent: false,
    icon: <Edge className="h-5 w-5" />,
  },
  {
    id: "3",
    browser: "Arc on Windows",
    device: "Last seen 24 days ago",
    location: "Houston, TX",
    lastSeen: "24 days ago",
    isCurrent: false,
    icon: <Smartphone className="h-5 w-5" />,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("consent");
  const [consentChecks, setConsentChecks] = useState({
    understand1: false,
    understand2: false,
    understand3: false,
    finalConsent: false,
  });
  const [notifications, setNotifications] = useState({
    communicationEmails: true,
    newTrialMatches: true,
    aiMatchImprovements: true,
    screeningReminders: true,
    trialStatusUpdates: true,
    healthProfileReminders: false,
    trialMatchExpiry: false,
    announcements: true,
  });
  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
  });

  const tabs = [
    { id: "consent" as const, label: "Consent" },
    { id: "notifications" as const, label: "Notifications" },
    { id: "security" as const, label: "Security" },
  ];

  const renderConsentTab = () => (
    <Card className="p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Consent to Collect, Use, and Store Personal Health Information for
            Clinical Trial Matching
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing TrialCliniq. Before we continue, we need your
            permission to collect, process, and securely store your personal and
            medical information. This allows us to match you with clinical
            trials that fit your health profile now and in the future.
          </p>

          <div className="flex items-start gap-3 mb-6">
            <Checkbox
              id="understand1"
              checked={consentChecks.understand1}
              onCheckedChange={(checked) =>
                setConsentChecks((prev) => ({
                  ...prev,
                  understand1: checked as boolean,
                }))
              }
            />
            <label
              htmlFor="understand1"
              className="text-sm text-gray-600 italic"
            >
              I have read and understand the information above
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">
            What information will we collect?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li>
              - Basic personal details: name, date of birth, contact
              information, and language preferences.
            </li>
            <li>
              - Medical information: including your health conditions,
              medications, lab results, medical history, and documents you
              upload (e.g. MRI reports, lab results, or doctor's notes).
            </li>
            <li>
              - Electronic Health Records (EHR): if you choose to connect them.
            </li>
          </ul>

          <div className="flex items-start gap-3 mb-6">
            <Checkbox
              id="understand2"
              checked={consentChecks.understand2}
              onCheckedChange={(checked) =>
                setConsentChecks((prev) => ({
                  ...prev,
                  understand2: checked as boolean,
                }))
              }
            />
            <label
              htmlFor="understand2"
              className="text-sm text-gray-600 italic"
            >
              I have read and understand the information above
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">
            How will we use your information?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li>
              - Our AI will securely review your information to find clinical
              trials you may qualify for.
            </li>
            <li>
              - We will notify you about matching trials and, with your
              permission, share your interest with the research sites conducting
              those studies.
            </li>
            <li>
              - We will securely store your information to keep you updated
              about new clinical trials you might be eligible for in the future.
            </li>
            <li>
              - You will have the option to manage your communication
              preferences at any time.
            </li>
          </ul>

          <div className="flex items-start gap-3 mb-6">
            <Checkbox
              id="understand3"
              checked={consentChecks.understand3}
              onCheckedChange={(checked) =>
                setConsentChecks((prev) => ({
                  ...prev,
                  understand3: checked as boolean,
                }))
              }
            />
            <label
              htmlFor="understand3"
              className="text-sm text-gray-600 italic"
            >
              I have read and understand the information above
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Your rights</h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li>
              - Review, update, or delete the information you share with us.
            </li>
            <li>
              - Withdraw from the platform and revoke your consent at any time,
              after which your data will be securely deleted.
            </li>
            <li>
              - Your data is encrypted and stored in compliance with HIPAA and
              other applicable privacy regulations.
            </li>
          </ul>

          <div className="flex items-start gap-3 mb-8">
            <Checkbox
              id="finalConsent"
              checked={consentChecks.finalConsent}
              onCheckedChange={(checked) =>
                setConsentChecks((prev) => ({
                  ...prev,
                  finalConsent: checked as boolean,
                }))
              }
            />
            <label
              htmlFor="finalConsent"
              className="text-sm text-gray-600 italic"
            >
              I have read and understand this consent form. I agree for
              TrialCliniq to collect, process, and securely store my personal
              and medical data to match me with current and future clinical
              trials until I choose to withdraw my consent.
            </label>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderNotificationsTab = () => (
    <Card className="p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Email Notifications
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                Communication Emails
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="newTrialMatches"
                      checked={notifications.newTrialMatches}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          newTrialMatches: checked as boolean,
                        }))
                      }
                    />
                    <label
                      htmlFor="newTrialMatches"
                      className="text-sm text-gray-700"
                    >
                      New Clinical Trial Matches
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="aiMatchImprovements"
                      checked={notifications.aiMatchImprovements}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          aiMatchImprovements: checked as boolean,
                        }))
                      }
                    />
                    <label
                      htmlFor="aiMatchImprovements"
                      className="text-sm text-gray-700"
                    >
                      New AI Match Score Improvements
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="screeningReminders"
                      checked={notifications.screeningReminders}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          screeningReminders: checked as boolean,
                        }))
                      }
                    />
                    <label
                      htmlFor="screeningReminders"
                      className="text-sm text-gray-700"
                    >
                      Screening Appointment Reminders
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="trialStatusUpdates"
                      checked={notifications.trialStatusUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          trialStatusUpdates: checked as boolean,
                        }))
                      }
                    />
                    <label
                      htmlFor="trialStatusUpdates"
                      className="text-sm text-gray-700"
                    >
                      Trial Status Updates (e.g. closed, eligibility changes)
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="healthProfileReminders"
                      checked={notifications.healthProfileReminders}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          healthProfileReminders: checked as boolean,
                        }))
                      }
                    />
                    <label
                      htmlFor="healthProfileReminders"
                      className="text-sm text-gray-700"
                    >
                      Health Profile Update Reminders
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="trialMatchExpiry"
                      checked={notifications.trialMatchExpiry}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          trialMatchExpiry: checked as boolean,
                        }))
                      }
                    />
                    <label
                      htmlFor="trialMatchExpiry"
                      className="text-sm text-gray-700"
                    >
                      Trial Match Expiry Warnings (when a trial is closing
                      enrollment)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Switch
              checked={notifications.communicationEmails}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  communicationEmails: checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                Announcements & Updates
              </h3>
              <p className="text-sm text-gray-600">
                Receive email about product updates, improvements, etc.
              </p>
            </div>
            <Switch
              checked={notifications.announcements}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  announcements: checked,
                }))
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );

  const renderSecurityTab = () => (
    <Card className="p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Set up measures for better account protection
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Password</h3>
              <p className="text-sm text-gray-600">
                Set a password to protect your account
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">Very secure</span>
              </div>
              <Button variant="link" className="text-blue-600">
                Change Password
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <h3 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                Two-step verification
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 text-xs"
                >
                  Enabled
                </Badge>
              </h3>
              <p className="text-sm text-gray-600">
                We recommend requiring a verification code in addition to your
                password
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={security.twoFactorEnabled}
                onCheckedChange={(checked) =>
                  setSecurity((prev) => ({
                    ...prev,
                    twoFactorEnabled: checked,
                  }))
                }
              />
              <Button variant="link" className="text-blue-600">
                Change Method
              </Button>
            </div>
          </div>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Sessions</h3>
                <p className="text-sm text-gray-600">
                  These browsers and devices are currently signed in to your
                  account. Remove any unauthorized devices.
                </p>
              </div>
              <Button variant="outline">Sign out all other sessions</Button>
            </div>

            <div className="space-y-4">
              {mockSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {session.icon}
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {session.browser}
                        {session.isCurrent && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 text-xs"
                          >
                            Current session
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {session.device} • {session.location}
                      </div>
                    </div>
                  </div>
                  <Button variant="link" className="text-blue-600">
                    Sign out
                  </Button>
                </div>
              ))}

              <div className="text-sm text-gray-600">2 other sessions</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>

        <div className="flex border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "consent" && renderConsentTab()}
        {activeTab === "notifications" && renderNotificationsTab()}
        {activeTab === "security" && renderSecurityTab()}
      </div>
    </div>
  );
}
