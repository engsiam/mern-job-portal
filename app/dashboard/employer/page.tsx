"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Briefcase,
  Building,
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  FileText,
  Loader2,
  MapPin,
  Plus,
  Users,
} from "lucide-react"
import { jobListings } from "@/lib/data"
import EmployerStats from "@/components/employer-stats"
import PostJobForm from "@/components/post-job-form"
import { useStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isPostJobOpen, setIsPostJobOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get state and actions from Zustand store
  const {
    user,
    postedJobs,
    candidates,
    profile: employerProfile,
    fetchPostedJobs,
    fetchCandidates,
    updateCandidateStatus,
    closeJob,
  } = useStore()

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        await Promise.all([fetchPostedJobs(), fetchCandidates()])
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadData()
  }, [fetchPostedJobs, fetchCandidates])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "reviewing":
        return "bg-purple-500"
      case "interview":
        return "bg-amber-500"
      case "shortlisted":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const handlePostJobSuccess = () => {
    setIsPostJobOpen(false)
    fetchPostedJobs()
    toast({
      title: "Job posted successfully",
      description: "Your job is now live and visible to candidates.",
    })
  }

  const handleCloseJob = async (jobId: string) => {
    try {
      await closeJob(jobId)
      toast({
        title: "Job closed",
        description: "The job posting has been closed and is no longer accepting applications.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to close job. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCandidateStatus = async (candidateId: string, status: string) => {
    try {
      await updateCandidateStatus(candidateId, status as any)
      toast({
        title: "Status updated",
        description: `Candidate status has been updated to ${status}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update candidate status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and applications</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Button onClick={() => setIsPostJobOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Post a Job
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg?height=96&width=96&text=AIAC"}
                      alt={user?.name || "Company"}
                    />
                    <AvatarFallback>{user?.name?.charAt(0) || "C"}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user?.name || employerProfile.companyName}</h2>
                  <p className="text-muted-foreground">{employerProfile.industry}</p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/profile">
                      <Edit className="mr-2 h-3 w-3" /> Edit Company
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-sm font-medium mb-2">Quick Links</p>
                  <nav className="space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "overview" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("overview")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" /> Overview
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "jobs" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("jobs")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" /> Posted Jobs
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "applications" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("applications")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Applications
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "company" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("company")}
                    >
                      <Building className="mr-2 h-4 w-4" /> Company Profile
                    </Button>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <EmployerStats
                  activeJobs={postedJobs.length}
                  totalApplications={candidates.length}
                  profileViews={1.2}
                  candidatesHired={18}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest candidates who applied to your jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidates.slice(0, 3).map((candidate) => {
                        const job = jobListings.find((job) => job.id === candidate.jobId)
                        if (!job) return null

                        return (
                          <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage
                                  src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop`}
                                  alt={candidate.candidateName}
                                />
                                <AvatarFallback>{candidate.candidateName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{candidate.candidateName}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Briefcase className="mr-1 h-3 w-3" /> {job.title}
                                  <span className="mx-2">•</span>
                                  <Calendar className="mr-1 h-3 w-3" /> {candidate.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={`${getStatusColor(candidate.status)} text-white`}>
                                {getStatusText(candidate.status)}
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {candidates.length > 0 ? (
                      <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("applications")}>
                        View All Applications
                      </Button>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You haven't received any applications yet</p>
                        <Button onClick={() => setIsPostJobOpen(true)}>Post a Job</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Job Postings</CardTitle>
                    <CardDescription>Manage your active job listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {postedJobs.slice(0, 3).map((jobId) => {
                        const job = jobListings.find((job) => job.id === jobId)
                        if (!job) return null

                        const applicationsCount = candidates.filter((app) => app.jobId === jobId).length

                        return (
                          <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border">
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" /> {job.location}
                                <span className="mx-2">•</span>
                                <Clock className="mr-1 h-3 w-3" /> {job.type}
                                <span className="mx-2">•</span>
                                <Users className="mr-1 h-3 w-3" /> {applicationsCount} applications
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/jobs/${job.id}`}>View</Link>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {postedJobs.length > 0 ? (
                      <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("jobs")}>
                        View All Jobs
                      </Button>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You haven't posted any jobs yet</p>
                        <Button onClick={() => setIsPostJobOpen(true)}>Post a Job</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "jobs" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Posted Jobs</CardTitle>
                    <CardDescription>Manage all your job listings</CardDescription>
                  </div>
                  <Button onClick={() => setIsPostJobOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Post a Job
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="active">
                    <TabsList className="mb-4">
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="draft">Draft</TabsTrigger>
                      <TabsTrigger value="closed">Closed</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active">
                      <div className="space-y-4">
                        {postedJobs.length > 0 ? (
                          postedJobs.map((jobId) => {
                            const job = jobListings.find((job) => job.id === jobId)
                            if (!job) return null

                            const applicationsCount = candidates.filter((app) => app.jobId === jobId).length

                            return (
                              <div
                                key={job.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
                              >
                                <div>
                                  <h3 className="font-medium">{job.title}</h3>
                                  <div className="flex flex-wrap items-center text-sm text-muted-foreground">
                                    <span className="flex items-center mr-3">
                                      <MapPin className="mr-1 h-3 w-3" /> {job.location}
                                    </span>
                                    <span className="flex items-center mr-3">
                                      <Clock className="mr-1 h-3 w-3" /> {job.type}
                                    </span>
                                    <span className="flex items-center mr-3">
                                      <Calendar className="mr-1 h-3 w-3" /> Posted {job.postedDate}
                                    </span>
                                    <span className="flex items-center">
                                      <Users className="mr-1 h-3 w-3" /> {applicationsCount} applications
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/jobs/${job.id}`}>View</Link>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => handleCloseJob(job.id)}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-muted-foreground mb-4">You haven't posted any jobs yet</p>
                            <Button onClick={() => setIsPostJobOpen(true)}>Post a Job</Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Other tab contents would be similar */}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "applications" && (
              <Card>
                <CardHeader>
                  <CardTitle>All Applications</CardTitle>
                  <CardDescription>Review and manage candidate applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="new">New</TabsTrigger>
                      <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
                      <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                      <TabsTrigger value="interview">Interview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                      <div className="space-y-4">
                        {candidates.length > 0 ? (
                          candidates.map((candidate) => {
                            const job = jobListings.find((job) => job.id === candidate.jobId)
                            if (!job) return null

                            return (
                              <div
                                key={candidate.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
                              >
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarImage
                                      src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop`}
                                      alt={candidate.candidateName}
                                    />
                                    <AvatarFallback>{candidate.candidateName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">{candidate.candidateName}</h3>
                                    <div className="flex flex-wrap items-center text-sm text-muted-foreground">
                                      <span className="flex items-center mr-3">
                                        <Briefcase className="mr-1 h-3 w-3" /> {job.title}
                                      </span>
                                      <span className="flex items-center">
                                        <Calendar className="mr-1 h-3 w-3" /> Applied on {candidate.date}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                  <Badge variant="outline" className={`${getStatusColor(candidate.status)} text-white`}>
                                    {getStatusText(candidate.status)}
                                  </Badge>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      View Resume
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        // In a real app, this would open a dropdown or dialog to select status
                                        const nextStatus =
                                          candidate.status === "new"
                                            ? "reviewing"
                                            : candidate.status === "reviewing"
                                              ? "interview"
                                              : candidate.status === "interview"
                                                ? "shortlisted"
                                                : "new"
                                        handleUpdateCandidateStatus(candidate.id, nextStatus)
                                      }}
                                    >
                                      Change Status
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-muted-foreground mb-4">You haven't received any applications yet</p>
                            <Button onClick={() => setIsPostJobOpen(true)}>Post a Job</Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Other tab contents would be similar but filtered by status */}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "company" && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Company Name</p>
                          <p className="text-muted-foreground">{employerProfile.companyName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Industry</p>
                          <p className="text-muted-foreground">{employerProfile.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Company Size</p>
                          <p className="text-muted-foreground">{employerProfile.companySize}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Founded</p>
                          <p className="text-muted-foreground">{employerProfile.founded}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-muted-foreground">
                            <a href={`https://${employerProfile.website}`} className="text-primary hover:underline">
                              {employerProfile.website}
                            </a>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-muted-foreground">{employerProfile.location}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/profile">
                          <Edit className="mr-2 h-3 w-3" /> Edit Information
                        </Link>
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Company Description</h3>
                      <p className="text-muted-foreground">{employerProfile.description}</p>
                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/profile">
                          <Edit className="mr-2 h-3 w-3" /> Edit Description
                        </Link>
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Company Logo</h3>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={user?.avatar || "/placeholder.svg?height=80&width=80&text=AIAC"}
                            alt={employerProfile.companyName}
                          />
                          <AvatarFallback>{employerProfile.companyName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/profile">
                            <Edit className="mr-2 h-3 w-3" /> Change Logo
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
            </DialogHeader>
            <PostJobForm onSuccess={handlePostJobSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
