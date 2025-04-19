"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Briefcase,
  Building,
  Calendar,
  ChevronLeft,
  Clock,
  DollarSign,
  Globe,
  Heart,
  MapPin,
  Send,
  Share2,
} from "lucide-react"
import { jobListings } from "@/lib/data"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import JobApplicationForm from "@/components/job-application-form"

// Company logo mapping
const companyLogos: Record<string, string> = {
  Google:
    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Microsoft:
    "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Amazon:
    "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Apple:
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Facebook:
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Netflix:
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Tesla:
    "https://images.unsplash.com/photo-1617704548623-340376564e68?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Uber: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Airbnb:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Spotify:
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Twitter:
    "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  LinkedIn:
    "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Adobe:
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Salesforce:
    "https://images.unsplash.com/photo-1607443359670-fda2fe390416?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  IBM: "https://images.unsplash.com/photo-1569023356866-2e4ed97cac47?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Oracle: "https://images.unsplash.com/photo-1557683316-973673baf926?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Intel:
    "https://images.unsplash.com/photo-1603969072881-b0fc7f3d6d7e?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Samsung:
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  "Acme Inc":
    "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Globex: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Initech:
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
  Umbrella:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
}

// Default logo for companies not in the mapping
const defaultLogo =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [isApplyOpen, setIsApplyOpen] = useState(false)

  // Find the job by ID
  const job = jobListings.find((job) => job.id === params.id)

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <Button onClick={() => router.push("/")}>Back to Jobs</Button>
      </div>
    )
  }

  // Get company logo from mapping or use default
  const logoUrl = companyLogos[job.company] || defaultLogo

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Job removed from saved jobs" : "Job saved successfully",
      description: isSaved ? "You can always save it again later" : "You can view it in your saved jobs",
    })
  }

  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this job with others",
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden border">
                  <Image src={logoUrl || "/placeholder.svg"} alt={job.company} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground mt-1">
                    <span className="flex items-center">
                      <Building className="mr-1 h-4 w-4" /> {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> Posted {job.postedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> {job.type}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {job.experience}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> {job.salary}
                </Badge>
                {job.isRemote && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Remote
                  </Badge>
                )}
              </div>

              <div className="flex gap-3 mb-8">
                <Button className="flex-1 sm:flex-none" onClick={() => setIsApplyOpen(true)}>
                  <Send className="mr-2 h-4 w-4" /> Apply Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSaveJob}
                  className={isSaved ? "text-rose-500" : ""}
                >
                  <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShareJob}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="mb-4">{job.description}</p>

                  <h3 className="text-lg font-medium mt-6 mb-3">Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-medium mt-6 mb-3">Requirements:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-medium mt-6 mb-3">Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden border">
                  <Image src={logoUrl || "/placeholder.svg"} alt={job.company} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">{job.industry}</p>
                </div>
              </div>

              <p className="text-sm mb-6">{job.companyDescription}</p>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Company Size:</span>
                  <p className="text-sm text-muted-foreground">{job.companySize}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Founded:</span>
                  <p className="text-sm text-muted-foreground">{job.founded}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Website:</span>
                  <p className="text-sm text-muted-foreground">
                    <a href="#" className="text-primary hover:underline">
                      {job.website}
                    </a>
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {jobListings
                  .filter((j) => j.id !== job.id && j.industry === job.industry)
                  .slice(0, 3)
                  .map((similarJob) => (
                    <div
                      key={similarJob.id}
                      className="p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => router.push(`/jobs/${similarJob.id}`)}
                    >
                      <h3 className="font-medium">{similarJob.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Building className="mr-1 h-3 w-3" /> {similarJob.company}
                        <span className="mx-2">•</span>
                        <MapPin className="mr-1 h-3 w-3" /> {similarJob.location}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
          </DialogHeader>
          <JobApplicationForm jobId={job.id} onSuccess={() => setIsApplyOpen(false)} />
        </DialogContent>
      </Dialog>
    </main>
  )
}
