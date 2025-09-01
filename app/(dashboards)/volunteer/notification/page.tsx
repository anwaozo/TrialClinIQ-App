"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertTriangle, Calendar, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "trial-match" | "reminder" | "profile-incomplete" | "ai-improvement" | "trial-found"
  title: string
  message: string
  date: string
  time: string
  isRead: boolean
  actionLink?: string
  actionText?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "trial-match",
    title: "New Trial Match Alert",
    message:
      "Agorain Neuropathy Study you matched with is no longer recruiting. We'll notify you about new opportunities soon.",
    date: "Jun 10",
    time: "Today",
    isRead: false,
    actionLink: "/volunteer/eligible-trials/agorain-study",
    actionText: "Agorain Neuropathy Study",
  },
  {
    id: "2",
    type: "reminder",
    title: "Reminder",
    message: "Your pre-screening appointment for the Chronic Migraine Relief Study is tomorrow at 10:00 AM.",
    date: "Jun 10",
    time: "Today",
    isRead: false,
    actionLink: "/volunteer/appointments",
    actionText: "pre-screening appointment",
  },
  {
    id: "3",
    type: "profile-incomplete",
    title: "Profile Incomplete Reminder",
    message:
      "Updating your health profile can help us find better-matching trials for you. Take a moment to review your details.",
    date: "Jun 10",
    time: "Today",
    isRead: false,
    actionLink: "/volunteer/health-profile",
    actionText: "health profile",
  },
  {
    id: "4",
    type: "ai-improvement",
    title: "AI Match Score Improvement",
    message:
      "Good news! Based on your updated medical details, your eligibility score for the NeuroCare Study improved to 92%.",
    date: "Jun 5",
    time: "Yesterday",
    isRead: true,
    actionLink: "/volunteer/eligible-trials/neurocare-study",
    actionText: "eligibility score",
  },
  {
    id: "5",
    type: "trial-found",
    title: "New Trial Match Found",
    message: "You've been matched with a new clinical trial for Chronic Neuropathy Pain. Read the details.",
    date: "Jun 5",
    time: "Yesterday",
    isRead: true,
    actionLink: "/volunteer/eligible-trials/chronic-neuropathy",
    actionText: "Read the details",
  },
  {
    id: "6",
    type: "trial-found",
    title: "New Trial Match Found",
    message: "You've been matched with a new clinical trial for Chronic Neuropathy Pain. Read the details.",
    date: "Jun 5",
    time: "Yesterday",
    isRead: true,
    actionLink: "/volunteer/eligible-trials/chronic-neuropathy-2",
    actionText: "Read the details",
  },
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "trial-match":
      return <AlertTriangle className="h-4 w-4" />
    case "reminder":
      return <Calendar className="h-4 w-4" />
    case "profile-incomplete":
      return <FileText className="h-4 w-4" />
    case "ai-improvement":
      return <TrendingUp className="h-4 w-4" />
    case "trial-found":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "trial-match":
      return "bg-blue-100 text-blue-600"
    case "reminder":
      return "bg-green-100 text-green-600"
    case "profile-incomplete":
      return "bg-orange-100 text-orange-600"
    case "ai-improvement":
      return "bg-purple-100 text-purple-600"
    case "trial-found":
      return "bg-blue-100 text-blue-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [showEmpty, setShowEmpty] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const groupedNotifications = notifications.reduce(
    (groups, notification) => {
      const group = notification.time
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(notification)
      return groups
    },
    {} as Record<string, Notification[]>,
  )

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const renderMessage = (notification: Notification) => {
    if (!notification.actionLink || !notification.actionText) {
      return notification.message
    }

    const parts = notification.message.split(notification.actionText)
    if (parts.length !== 2) {
      return notification.message
    }

    return (
      <>
        {parts[0]}
        <Button variant="link" className="p-0 h-auto text-blue-600 underline font-normal">
          {notification.actionText}
        </Button>
        {parts[1]}
      </>
    )
  }

  if (showEmpty || notifications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            <Button variant="ghost" className="text-gray-500" onClick={() => setShowEmpty(false)}>
              Mark all as read
            </Button>
          </div>

          <Card className="p-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">0</span>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">It's quiet for now.</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Your notifications will appear here once there's something new to review.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button variant="ghost" className="text-gray-500" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedNotifications).map(([timeGroup, groupNotifications]) => (
            <div key={timeGroup}>
              <h2 className="text-sm font-medium text-gray-500 mb-4">{timeGroup}</h2>
              <div className="space-y-4">
                {groupNotifications.map((notification) => (
                  <Card key={notification.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {notification.title}
                          </Badge>
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        </div>
                        <p className="text-gray-900 text-sm leading-relaxed">{renderMessage(notification)}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{notification.date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
