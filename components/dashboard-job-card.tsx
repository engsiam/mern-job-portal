"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, Clock, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import type { JobListing } from "@/lib/types"

interface DashboardJobCardProps {
  job: JobListing
}

export default function DashboardJobCard({ job }: DashboardJobCardProps) {
  const router = useRouter()

  return (
    <div
      className="p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
      onClick={() => router.push(`/jobs/${job.id}`)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">{job.title}</h3>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-1">
            <span className="flex items-center mr-3">
              <Building className="mr-1 h-3 w-3" /> {job.company}
            </span>
            <span className="flex items-center mr-3">
              <MapPin className="mr-1 h-3 w-3" /> {job.location}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" /> {job.type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Calendar className="mr-1 h-3 w-3" /> {job.postedDate}
          </Badge>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>
      </div>
    </div>
  )
}
