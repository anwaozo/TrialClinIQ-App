"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface Appointment {
  id: string;
  title: string;
  type: "screening" | "enrollment" | "pre-screening" | "consultation";
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  isVirtual: boolean;
  meetingLink?: string;
  guests: string[];
  volunteerIds: string[];
}

const appointmentData: Appointment[] = [
  {
    id: "1",
    title: "Pre-Screening Call with DG-0109",
    type: "pre-screening",
    startTime: "11:30",
    endTime: "12:00",
    date: "2025-07-12",
    location: "Virtual",
    isVirtual: true,
    meetingLink: "www.zoom.com/109864484...",
    guests: ["debra.holt@example.com", "alma.lawson@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "2",
    title: "Screening Visit",
    type: "screening",
    startTime: "11:00",
    endTime: "12:00",
    date: "2025-07-14",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com", "alma.lawson@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "3",
    title: "Pre-Screening Call with DG-0109",
    type: "pre-screening",
    startTime: "11:00",
    endTime: "12:00",
    date: "2025-07-15",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "4",
    title: "Enrollment Visit",
    type: "enrollment",
    startTime: "11:00",
    endTime: "12:00",
    date: "2025-07-10",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "5",
    title: "Pre-Screening Call with DG-0109",
    type: "pre-screening",
    startTime: "11:00",
    endTime: "12:00",
    date: "2025-07-11",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "6",
    title: "Screening Visit",
    type: "screening",
    startTime: "13:00",
    endTime: "14:00",
    date: "2025-07-13",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "7",
    title: "Pre-Screening Call with DG-0109",
    type: "pre-screening",
    startTime: "11:00",
    endTime: "12:00",
    date: "2025-07-16",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "8",
    title: "Consultation Call",
    type: "consultation",
    startTime: "09:00",
    endTime: "10:00",
    date: "2025-07-15",
    location: "Virtual",
    isVirtual: true,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
  {
    id: "9",
    title: "Screening Visit",
    type: "screening",
    startTime: "15:00",
    endTime: "16:00",
    date: "2025-07-16",
    location: "Cottage Medicare Hospital, Houston 101245, Texas",
    isVirtual: false,
    guests: ["debra.holt@example.com"],
    volunteerIds: ["DG-0109"],
  },
];

const getAppointmentColor = (type: string) => {
  switch (type) {
    case "pre-screening":
      return "bg-blue-100 border-blue-300 text-blue-800";
    case "screening":
      return "bg-red-100 border-red-300 text-red-800";
    case "enrollment":
      return "bg-green-100 border-green-300 text-green-800";
    case "consultation":
      return "bg-purple-100 border-purple-300 text-purple-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};

const timeSlots = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getWeekDates = (currentDate: Date) => {
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
  startOfWeek.setDate(diff);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

const getMonthDates = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  const endDate = new Date(lastDay);

  // Adjust to show full weeks
  const startDay = firstDay.getDay();
  startDate.setDate(firstDay.getDate() - (startDay === 0 ? 6 : startDay - 1));

  const endDay = lastDay.getDay();
  endDate.setDate(lastDay.getDate() + (endDay === 0 ? 0 : 7 - endDay));

  const dates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const getDayName = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const getMonthName = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [trialFilter, setTrialFilter] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 12)); // July 12, 2025
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 6, 12));
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");

  const calendarData = useMemo(() => {
    switch (viewMode) {
      case "day":
        return [selectedDate];
      case "week":
        return getWeekDates(currentDate);
      case "month":
        return getMonthDates(currentDate);
      default:
        return getWeekDates(currentDate);
    }
  }, [viewMode, currentDate, selectedDate]);

  const navigateCalendar = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const selectedAppointmentDetails = appointmentData.find(
    (apt) => apt.id === "1"
  );

  const getAppointmentsForDate = (date: Date) => {
    const dateString = formatDate(date);
    return appointmentData.filter((apt) => apt.date === dateString);
  };

  const getAppointmentPosition = (startTime: string, endTime: string) => {
    const startHour = Number.parseInt(startTime.split(":")[0]);
    const startMinute = Number.parseInt(startTime.split(":")[1]);
    const endHour = Number.parseInt(endTime.split(":")[0]);
    const endMinute = Number.parseInt(endTime.split(":")[1]);

    const startPosition = ((startHour - 8) * 60 + startMinute) * (60 / 60);
    const duration =
      ((endHour - startHour) * 60 + (endMinute - startMinute)) * (60 / 60);

    return { top: startPosition, height: Math.max(duration, 40) };
  };

  const renderCalendarView = () => {
    if (viewMode === "month") {
      return (
        <div className="border rounded-lg overflow-hidden">
          {/* Month Header */}
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-gray-700 border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7">
            {calendarData.map((date, index) => {
              const appointments = getAppointmentsForDate(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isSelected = formatDate(date) === formatDate(selectedDate);

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b last:border-r-0 cursor-pointer hover:bg-gray-50 ${
                    !isCurrentMonth ? "bg-gray-100 text-gray-400" : ""
                  } ${isSelected ? "bg-blue-50 border-blue-200" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isSelected ? "text-blue-600" : ""
                    }`}
                  >
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {appointments.slice(0, 3).map((apt) => (
                      <div
                        key={apt.id}
                        className={`text-xs p-1 rounded truncate cursor-pointer ${getAppointmentColor(
                          apt.type
                        )}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAppointment(apt);
                        }}
                      >
                        {apt.startTime} {apt.title}
                      </div>
                    ))}
                    {appointments.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{appointments.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (viewMode === "day") {
      const dayDate = selectedDate;
      const dayAppointments = getAppointmentsForDate(dayDate);

      return (
        <div className="border rounded-lg overflow-hidden">
          {/* Day Header */}
          <div className="grid grid-cols-2 bg-gray-50 border-b">
            <div className="p-3 text-sm font-medium text-gray-700"></div>
            <div className="p-3 text-center border-l">
              <div className="text-sm font-medium text-gray-700">
                {dayDate.getDate()} {getDayName(dayDate)}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="relative">
            {timeSlots.map((time, timeIndex) => (
              <div
                key={time}
                className="grid grid-cols-2 border-b"
                style={{ height: "60px" }}
              >
                <div className="p-3 text-sm text-gray-600 border-r bg-gray-50">
                  {time}
                </div>
                <div className="border-l relative">
                  {dayAppointments
                    .filter((apt) => {
                      const aptHour = Number.parseInt(
                        apt.startTime.split(":")[0]
                      );
                      const slotHour = Number.parseInt(time.split(":")[0]);
                      return aptHour === slotHour;
                    })
                    .map((appointment) => {
                      const position = getAppointmentPosition(
                        appointment.startTime,
                        appointment.endTime
                      );
                      return (
                        <div
                          key={appointment.id}
                          className={`absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium border cursor-pointer ${getAppointmentColor(
                            appointment.type
                          )}`}
                          style={{
                            top: `${position.top - timeIndex * 60}px`,
                            height: `${position.height}px`,
                            zIndex: 10,
                          }}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <div className="truncate">{appointment.title}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {appointment.startTime} - {appointment.endTime}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Week View (default)
    const weekDates = calendarData.slice(0, 5); // Show only weekdays

    return (
      <div className="border rounded-lg overflow-hidden">
        {/* Week Header */}
        <div className="grid grid-cols-6 bg-gray-50 border-b">
          <div className="p-3 text-sm font-medium text-gray-700"></div>
          {weekDates.map((date) => (
            <div key={formatDate(date)} className="p-3 text-center border-l">
              <div className="text-sm font-medium text-gray-700">
                {date.getDate()} {getDayName(date)}
              </div>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="relative">
          {timeSlots.map((time, timeIndex) => (
            <div
              key={time}
              className="grid grid-cols-6 border-b"
              style={{ height: "60px" }}
            >
              <div className="p-3 text-sm text-gray-600 border-r bg-gray-50">
                {time}
              </div>
              {weekDates.map((date) => (
                <div
                  key={`${time}-${formatDate(date)}`}
                  className="border-l relative"
                >
                  {getAppointmentsForDate(date)
                    .filter((apt) => {
                      const aptHour = Number.parseInt(
                        apt.startTime.split(":")[0]
                      );
                      const slotHour = Number.parseInt(time.split(":")[0]);
                      return aptHour === slotHour;
                    })
                    .map((appointment) => {
                      const position = getAppointmentPosition(
                        appointment.startTime,
                        appointment.endTime
                      );
                      return (
                        <div
                          key={appointment.id}
                          className={`absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium border cursor-pointer ${getAppointmentColor(
                            appointment.type
                          )}`}
                          style={{
                            top: `${position.top - timeIndex * 60}px`,
                            height: `${position.height}px`,
                            zIndex: 10,
                          }}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <div className="truncate">{appointment.title}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {appointment.startTime} - {appointment.endTime}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>

          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by Patient ID, confidence s..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={trialFilter} onValueChange={setTrialFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trial Title:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="agorain">Agorain</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mini Calendar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Appointment Calendar
                  </h3>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateCalendar("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateCalendar("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mini Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                  <div className="text-center font-medium text-gray-500 p-1">
                    Mo
                  </div>
                  <div className="text-center font-medium text-gray-500 p-1">
                    Tu
                  </div>
                  <div className="text-center font-medium text-gray-500 p-1">
                    We
                  </div>
                  <div className="text-center font-medium text-gray-500 p-1">
                    Th
                  </div>
                  <div className="text-center font-medium text-gray-500 p-1">
                    Fr
                  </div>
                  <div className="text-center font-medium text-gray-500 p-1">
                    Sa
                  </div>
                  <div className="text-center font-medium text-gray-500 p-1">
                    Su
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-sm">
                  {getMonthDates(currentDate)
                    .slice(0, 42)
                    .map((date, index) => {
                      const isCurrentMonth =
                        date.getMonth() === currentDate.getMonth();
                      const isSelected =
                        formatDate(date) === formatDate(selectedDate);
                      const hasAppointments =
                        getAppointmentsForDate(date).length > 0;

                      return (
                        <div
                          key={index}
                          className={`text-center p-1 cursor-pointer hover:bg-gray-100 rounded ${
                            !isCurrentMonth ? "text-gray-400" : ""
                          } ${
                            isSelected
                              ? "bg-blue-600 text-white rounded-full"
                              : ""
                          }`}
                          onClick={() => setSelectedDate(date)}
                        >
                          {date.getDate()}
                          {hasAppointments && !isSelected && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Appointment Details */}
            {selectedAppointmentDetails && (
              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      {selectedAppointmentDetails.startTime} -{" "}
                      {selectedAppointmentDetails.endTime} (30 min)
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {selectedAppointmentDetails.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Mon, 12 July 2025
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedAppointmentDetails.location}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 bg-transparent"
                    >
                      View details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 bg-transparent"
                    >
                      Edit appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {getMonthName(currentDate)}
                    </h2>
                    <Button variant="outline" size="sm" onClick={goToToday}>
                      Today
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateCalendar("prev")}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateCalendar("next")}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <Button
                        variant={viewMode === "day" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("day")}
                      >
                        Day
                      </Button>
                      <Button
                        variant={viewMode === "week" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("week")}
                      >
                        Week
                      </Button>
                      <Button
                        variant={viewMode === "month" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("month")}
                      >
                        Month
                      </Button>
                    </div>

                    <Select defaultValue="pst">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">PST</SelectItem>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="cst">CST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {renderCalendarView()}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Appointment Detail Modal */}
        <Dialog
          open={!!selectedAppointment}
          onOpenChange={() => setSelectedAppointment(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">
                  {selectedAppointment?.title}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <DialogDescription>
                Appointment details and meeting information
              </DialogDescription>
            </DialogHeader>

            {selectedAppointment && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {getDayName(new Date(selectedAppointment.date))},{" "}
                    {selectedAppointment.date.split("-").slice(1).join("-")} •{" "}
                    {selectedAppointment.startTime} -{" "}
                    {selectedAppointment.endTime}
                  </p>
                </div>

                {selectedAppointment.isVirtual &&
                  selectedAppointment.meetingLink && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Join by link
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-blue-600 truncate">
                          {selectedAppointment.meetingLink}
                        </p>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {selectedAppointment.guests.length} guests
                    </span>
                  </div>
                  <div className="space-y-1">
                    {selectedAppointment.guests.map((guest, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {guest}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
