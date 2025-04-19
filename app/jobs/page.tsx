"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Sliders, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { jobListings } from "@/lib/data"
import JobCard from "@/components/job-card"
import PageHeader from "@/components/page-header"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialSearchTerm = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [jobType, setJobType] = useState("all")
  const [experienceLevel, setExperienceLevel] = useState("all")
  const [salaryRange, setSalaryRange] = useState([0, 200])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  // Add this at the beginning of the component to manage filtered jobs state
  const [filteredJobs, setFilteredJobs] = useState<typeof jobListings>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Update search term when URL parameter changes
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "")
  }, [searchParams])

  // Update the handleSearchSubmit function to also apply other filters
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchTerm)}`)
      setShowSearchResults(false)
      setSearchQuery("")
    }
  }

  // Add these functions to handle filter changes and ensure they trigger re-filtering
  const handleJobTypeChange = (value: string) => {
    setJobType(value)
    // Force re-filtering of jobs
    const newFilteredJobs = jobListings.filter((job) => {
      const matchesSearch = searchTerm
        ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
        : true

      const matchesType = value === "all" || job.type === value
      const matchesExperience = experienceLevel === "all" || job.experience.includes(experienceLevel)
      const matchesRemote = !remoteOnly || job.isRemote
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "recent" && job.isRecent) ||
        (activeTab === "featured" && job.isFeatured) ||
        (activeTab === "remote" && job.isRemote)

      return matchesSearch && matchesType && matchesExperience && matchesRemote && matchesTab
    })
  }

  const handleExperienceLevelChange = (value: string) => {
    setExperienceLevel(value)
    // Re-filter jobs with new experience level
  }

  const handleRemoteOnlyChange = (checked: boolean) => {
    setRemoteOnly(checked)
    // Re-filter jobs with new remote setting
  }

  const resetFilters = () => {
    setJobType("all")
    setExperienceLevel("all")
    setSalaryRange([0, 200])
    setRemoteOnly(false)
  }

  // Update URL when search term changes
  const updateSearchParam = (term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    router.push(`/jobs?${params.toString()}`)
  }

  useEffect(() => {
    // Filter jobs based on all criteria
    const newFilteredJobs = jobListings.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = jobType === "all" || job.type === jobType
      const matchesExperience = experienceLevel === "all" || job.experience.includes(experienceLevel)
      const matchesRemote = !remoteOnly || job.isRemote
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "recent" && job.isRecent) ||
        (activeTab === "featured" && job.isFeatured) ||
        (activeTab === "remote" && job.isRemote)

      return matchesSearch && matchesType && matchesExperience && matchesRemote && matchesTab
    })

    setFilteredJobs(newFilteredJobs)
  }, [searchTerm, jobType, experienceLevel, remoteOnly, activeTab])

  // Initialize filteredJobs in useEffect
  useEffect(() => {
    setFilteredJobs(jobListings)
  }, [])

  // Update the salary range handler
  const handleSalaryRangeChange = (values: number[]) => {
    setSalaryRange(values)
    // Re-filtering will happen in the useEffect
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader
        title="Find Your Perfect Job"
        description="Browse thousands of job opportunities tailored to your skills and preferences"
      />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Desktop Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-64 lg:w-72 hidden md:block"
        >
          <div className="bg-card rounded-lg border p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Job Type</Label>
                <Select value={jobType} onValueChange={handleJobTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
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

              <div>
                <Label className="text-sm font-medium mb-2 block">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={handleExperienceLevelChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="0-1">Entry Level (0-1 years)</SelectItem>
                    <SelectItem value="1-3">Junior (1-3 years)</SelectItem>
                    <SelectItem value="3-5">Mid-Level (3-5 years)</SelectItem>
                    <SelectItem value="5+">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Salary Range (K)</Label>
                <div className="pt-4 px-2">
                  <Slider value={salaryRange} min={0} max={200} step={5} onValueChange={handleSalaryRangeChange} />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${salaryRange[0]}k</span>
                    <span>${salaryRange[1]}k</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remote" checked={remoteOnly} onCheckedChange={handleRemoteOnlyChange} />
                <label
                  htmlFor="remote"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remote only
                </label>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-2 block">Location</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Industry</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Job title, company, or keywords"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="hidden md:flex">
                  Search
                </Button>

                <Select value={jobType} onValueChange={handleJobTypeChange} className="md:hidden">
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

                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Sliders className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Job Type</Label>
                        <Select value={jobType} onValueChange={handleJobTypeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
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

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Experience Level</Label>
                        <Select value={experienceLevel} onValueChange={handleExperienceLevelChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="0-1">Entry Level (0-1 years)</SelectItem>
                            <SelectItem value="1-3">Junior (1-3 years)</SelectItem>
                            <SelectItem value="3-5">Mid-Level (3-5 years)</SelectItem>
                            <SelectItem value="5+">Senior (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Salary Range (K)</Label>
                        <div className="pt-4 px-2">
                          <Slider value={salaryRange} min={0} max={200} step={5} onValueChange={setSalaryRange} />
                          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                            <span>${salaryRange[0]}k</span>
                            <span>${salaryRange[1]}k</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="remote-mobile" checked={remoteOnly} onCheckedChange={handleRemoteOnlyChange} />
                        <label
                          htmlFor="remote-mobile"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remote only
                        </label>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Location</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={resetFilters}>
                          Reset Filters
                        </Button>
                        <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </form>

            {searchTerm && (
              <div className="flex items-center mb-4">
                <span className="text-sm text-muted-foreground mr-2">Search results for:</span>
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center">
                  {searchTerm}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => {
                      setSearchTerm("")
                      updateSearchParam("")
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="remote">Remote</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => <JobCard key={job.id} job={job} index={index} />)
            ) : (
              <div className="col-span-2 py-12 text-center">
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>

          {filteredJobs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More Jobs</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
