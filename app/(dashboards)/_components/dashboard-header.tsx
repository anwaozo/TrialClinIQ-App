"use client";
import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const volunteerNavItems = [
    { href: "/volunteer/dashboard", label: "Dashboard" },
    { href: "/volunteer/trials", label: "Eligible Trials" },
    { href: "/volunteer/profile", label: "Health Profile" },
    { href: "/volunteer/help", label: "Help Center" },
  ];

  const researcherNavItems = [
    { href: "/researcher/dashboard", label: "Dashboard" },
    { href: "/researcher/volunteers", label: "Volunteers" },
    { href: "/researcher/trials", label: "Trials" },
    { href: "/researcher/appointments", label: "Appointments" },
    { href: "/researcher/sites", label: "Sites" },
    { href: "/researcher/help", label: "Help Center" },
  ];

  const navItems = pathname.startsWith("/volunteer/")
    ? volunteerNavItems
    : researcherNavItems;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                TrialCliniq
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "text-blue-600 font-medium  border-blue-600 "
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href={
                pathname.startsWith("/volunteer/")
                  ? "/volunteer/settings"
                  : "/researcher/settings"
              }
            >
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Link
              href={
                pathname.startsWith("/volunteer/")
                  ? "/volunteer/notification"
                  : "/researcher/notification"
              }
            >
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">AO</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
