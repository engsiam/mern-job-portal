"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Building, Calendar, ChevronRight, Edit, FileText, Loader2, MapPin, Plus, User } from "lucide-react"
import { jobListings } from "@/lib/data"
import Link from "next/link"
import DashboardJobCard from "@/components/dashboard-job-card"
import DashboardStats from "@/components/dashboard-stats"
import { useStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  // Get state and actions from Zustand store
  const { user, applications, savedJobs, profile, fetchApplications, fetchSavedJobs, withdrawApplication, unsaveJob } =
    useStore()

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        await Promise.all([fetchApplications(), fetchSavedJobs()])
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
  }, [fetchApplications, fetchSavedJobs])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-500"
      case "interview":
        return "bg-amber-500"
      case "rejected":
        return "bg-red-500"
      case "offer":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "interview":
        return "Interview"
      case "rejected":
        return "Rejected"
      case "offer":
        return "Offer"
      default:
        return status
    }
  }

  const handleWithdrawApplication = async (applicationId: string) => {
    try {
      await withdrawApplication(applicationId)
      toast({
        title: "Application withdrawn",
        description: "Your application has been successfully withdrawn.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to withdraw application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUnsaveJob = async (jobId: string) => {
    try {
      unsaveJob(jobId)
      toast({
        title: "Job removed",
        description: "The job has been removed from your saved jobs.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove job. Please try again.",
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
    <ProtectedRoute allowedRoles={["job-seeker"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold">Job Seeker Dashboard</h1>
            <p className="text-muted-foreground">Manage your job applications and profile</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Button asChild>
              <Link href="/jobs">
                <Plus className="mr-2 h-4 w-4" /> Browse Jobs
              </Link>
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
                      src={user?.avatar || "/placeholder.svg?height=96&width=96&text=AIJD"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
                  <p className="text-muted-foreground">UI/UX Designer</p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/profile">
                      <Edit className="mr-2 h-3 w-3" /> Edit Profile
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Profile Completion</p>
                    <Progress value={profile.profileCompleteness} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{profile.profileCompleteness}% Complete</p>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm font-medium mb-2">Quick Links</p>
                    <nav className="space-y-1">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeTab === "overview" ? "bg-accent" : ""}`}
                        onClick={() => setActiveTab("overview")}
                      >
                        <User className="mr-2 h-4 w-4" /> Overview
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
                        className={`w-full justify-start ${activeTab === "saved" ? "bg-accent" : ""}`}
                        onClick={() => setActiveTab("saved")}
                      >
                        <Briefcase className="mr-2 h-4 w-4" /> Saved Jobs
                      </Button>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeTab === "profile" ? "bg-accent" : ""}`}
                        onClick={() => setActiveTab("profile")}
                      >
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Button>
                    </nav>
                  </div>
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
                <DashboardStats
                  applications={applications.length}
                  interviews={applications.filter((app) => app.status === "interview").length}
                  offers={applications.filter((app) => app.status === "offer").length}
                  savedJobs={savedJobs.length}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your most recent job applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((application) => {
                        const job = jobListings.find((job) => job.id === application.jobId)
                        if (!job) return null

                        return (
                          <div key={application.id} className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                              <div className="relative h-10 w-10 rounded-md overflow-hidden border">
                                <Avatar>
                                  <AvatarImage
                                    src={`https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&h=100&auto=format&fit=crop`}
                                    alt={job.company}
                                  />
                                  <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>
                                <h3 className="font-medium">{job.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Building className="mr-1 h-3 w-3" /> {job.company}
                                  <span className="mx-2">•</span>
                                  <MapPin className="mr-1 h-3 w-3" /> {job.location}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={`${getStatusColor(application.status)} text-white`}>
                                {getStatusText(application.status)}
                              </Badge>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/jobs/${job.id}`}>
                                  <ChevronRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {applications.length > 0 ? (
                      <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("applications")}>
                        View All Applications
                      </Button>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet</p>
                        <Button asChild>
                          <Link href="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                    <CardDescription>Jobs you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedJobs.slice(0, 3).map((jobId) => {
                        const job = jobListings.find((job) => job.id === jobId)
                        if (!job) return null

                        return <DashboardJobCard key={job.id} job={job} />
                      })}
                    </div>

                    {savedJobs.length > 0 ? (
                      <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("saved")}>
                        View All Saved Jobs
                      </Button>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You haven't saved any jobs yet</p>
                        <Button asChild>
                          <Link href="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "applications" && (
              <Card>
                <CardHeader>
                  <CardTitle>All Applications</CardTitle>
                  <CardDescription>Track all your job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="applied">Applied</TabsTrigger>
                      <TabsTrigger value="interview">Interview</TabsTrigger>
                      <TabsTrigger value="offer">Offer</TabsTrigger>
                      <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                      <div className="space-y-4">
                        {applications.length > 0 ? (
                          applications.map((application) => {
                            const job = jobListings.find((job) => job.id === application.jobId)
                            if (!job) return null

                            return (
                              <div
                                key={application.id}
                                className="flex items-center justify-between p-4 rounded-lg border"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="relative h-10 w-10 rounded-md overflow-hidden border">
                                    <Avatar>
                                      <AvatarImage
                                        src={`https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&h=100&auto=format&fit=crop`}
                                        alt={job.company}
                                      />
                                      <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{job.title}</h3>
                                    <div className="flex flex-wrap items-center text-sm text-muted-foreground">
                                      <span className="flex items-center">
                                        <Building className="mr-1 h-3 w-3" /> {job.company}
                                      </span>
                                      <span className="mx-2">•</span>
                                      <span className="flex items-center">
                                        <MapPin className="mr-1 h-3 w-3" /> {job.location}
                                      </span>
                                      <span className="mx-2">•</span>
                                      <span className="flex items-center">
                                        <Calendar className="mr-1 h-3 w-3" /> Applied on {application.date}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="outline"
                                    className={`${getStatusColor(application.status)} text-white`}
                                  >
                                    {getStatusText(application.status)}
                                  </Badge>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleWithdrawApplication(application.id)}
                                  >
                                    Withdraw
                                  </Button>
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/jobs/${job.id}`}>
                                      <ChevronRight className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet</p>
                            <Button asChild>
                              <Link href="/jobs">Browse Jobs</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Other tab contents would be similar but filtered by status */}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "saved" && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>Jobs you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedJobs.length > 0 ? (
                      savedJobs.map((jobId) => {
                        const job = jobListings.find((job) => job.id === jobId)
                        if (!job) return null

                        return (
                          <div key={job.id} className="relative">
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2 z-10"
                              onClick={() => handleUnsaveJob(job.id)}
                            >
                              Remove
                            </Button>
                            <DashboardJobCard job={job} />
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You haven't saved any jobs yet</p>
                        <Button asChild>
                          <Link href="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your personal information and resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Full Name</p>
                          <p className="text-muted-foreground">{user?.name || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-muted-foreground">{user?.email || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-muted-foreground">San Francisco, CA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/profile">
                          <Edit className="mr-2 h-3 w-3" /> Edit Information
                        </Link>
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Resume</h3>
                      <div className="p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">John_Doe_Resume.pdf</p>
                            <p className="text-sm text-muted-foreground">Uploaded on April 5, 2023</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Replace
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index}>{skill}</Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="/profile">
                          <Edit className="mr-2 h-3 w-3" /> Edit Skills
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
