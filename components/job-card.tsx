"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Building, Clock, DollarSign, Heart, MapPin } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import type { JobListing } from "@/lib/types"

// Company logo mapping
const companyLogos: Record<string, string> = {
  Google:
    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Microsoft:
    "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Amazon:
    "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Apple:
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Facebook:
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Netflix:
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Tesla:
    "https://images.unsplash.com/photo-1617704548623-340376564e68?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Uber: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Airbnb:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Spotify:
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Twitter:
    "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  LinkedIn:
    "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Adobe:
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Salesforce:
    "https://images.unsplash.com/photo-1607443359670-fda2fe390416?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  IBM: "https://images.unsplash.com/photo-1569023356866-2e4ed97cac47?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Oracle: "https://images.unsplash.com/photo-1557683316-973673baf926?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Intel:
    "https://images.unsplash.com/photo-1603969072881-b0fc7f3d6d7e?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Samsung:
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  "Acme Inc":
    "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Globex: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Initech:
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Umbrella:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
}

// Default logo for companies not in the mapping
const defaultLogo =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop"

interface JobCardProps {
  job: JobListing
  index: number
}

export default function JobCard({ job, index }: JobCardProps) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveJob = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Job removed from saved jobs" : "Job saved successfully",
      description: isSaved ? "You can always save it again later" : "You can view it in your saved jobs",
    })
  }

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`)
  }

  // Get company logo from mapping or use default
  const logoUrl = companyLogos[job.company] || defaultLogo

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full cursor-pointer hover:shadow-md transition-shadow" onClick={handleCardClick}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src={logoUrl || "/placeholder.svg"} alt={job.company} />
              <AvatarFallback className="rounded-md">{job.company.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className={isSaved ? "text-rose-500" : "text-muted-foreground"}
              onClick={handleSaveJob}
            >
              <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Building className="mr-1 h-4 w-4" />
                <span className="line-clamp-1">{job.company}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {job.isFeatured && (
                <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                  Featured
                </Badge>
              )}
              {job.isRecent && (
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900"
                >
                  New
                </Badge>
              )}
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center mr-4">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock className="mr-1 h-4 w-4" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-1 h-4 w-4" />
                <span>{job.salary}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{job.shortDescription}</p>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Posted {job.postedDate}</span>
              <Button variant="ghost" size="sm" className="text-primary">
                View Job
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
