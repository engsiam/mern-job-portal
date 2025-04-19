"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, CheckCircle, Clock, FileText } from "lucide-react"

interface DashboardStatsProps {
  applications: number
  interviews: number
  offers: number
  savedJobs: number
}

export default function DashboardStats({ applications, interviews, offers, savedJobs }: DashboardStatsProps) {
  // Stats data with dynamic values
  const stats = [
    {
      title: "Applications",
      value: applications,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Interviews",
      value: interviews,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      title: "Offers",
      value: offers,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      title: "Saved Jobs",
      value: savedJobs,
      icon: Briefcase,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
