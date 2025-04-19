"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Building, Search } from "lucide-react"
import JobCard from "@/components/job-card"
import { jobListings } from "@/lib/data"
import type { JobListing } from "@/lib/types"
import Link from "next/link"

export default function CompanyJobsPage() {
  const params = useParams()
  const router = useRouter()
  const [company, setCompany] = useState<any>(null)
  const [companyJobs, setCompanyJobs] = useState<JobListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("all")

  // Fetch company data and filter jobs
  useEffect(() => {
    // Simulating API call to get company data
    setTimeout(() => {
      // Find company by ID
      const mockCompanies = [
        {
          id: "1",
          name: "TechCorp",
          logo: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
          industry: "Technology",
        },
        {
          id: "2",
          name: "DesignHub",
          logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
          industry: "Design",
        },
        {
          id: "3",
          name: "WebSolutions",
          logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
          industry: "Technology",
        },
        {
          id: "4",
          name: "InnovateCo",
          logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
          industry: "Technology",
        },
        {
          id: "5",
          name: "DataInsights",
          logo: "https://images.unsplash.com/photo-1607443359670-fda2fe390416?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
          industry: "Data & Analytics",
        },
      ]

      const foundCompany = mockCompanies.find((c) => c.id === params.id)
      setCompany(foundCompany || null)

      // Filter jobs by company ID (simulating jobs associated with this company)
      // In a real app, you'd fetch this data from an API
      const filteredJobs = jobListings.filter(
        (job) => job.company === foundCompany?.name || ["job1", "job3", "job6"].includes(job.id), // This is just for demo purposes
      )

      setCompanyJobs(filteredJobs)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  // Apply search and filters
  const filteredJobs = companyJobs.filter((job) => {
    const matchesSearch = searchTerm === "" || job.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = jobType === "all" || job.type === jobType
    return matchesSearch && matchesType
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Company not found</h1>
        <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/companies")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Companies
        </Button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
              <AvatarFallback className="rounded-md">{company.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-bold mb-1">{company.name}</h1>
              <div className="flex items-center text-muted-foreground">
                <Building className="mr-1 h-4 w-4" />
                <span>{company.industry}</span>
                <span className="mx-2">•</span>
                <Link href={`/companies/${company.id}`} className="text-primary hover:underline">
                  View Company Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Badge variant="outline" className="ml-16 md:ml-0 text-lg px-4 py-2">
          {filteredJobs.length} Jobs Available
        </Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search job titles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground mb-4">
            There are no jobs matching your search criteria at {company.name}.
          </p>
          {searchTerm || jobType !== "all" ? (
            <Button
              onClick={() => {
                setSearchTerm("")
                setJobType("all")
              }}
            >
              Clear Filters
            </Button>
          ) : (
            <Button onClick={() => router.push("/jobs")}>Browse All Jobs</Button>
          )}
        </div>
      )}
    </main>
  )
}
