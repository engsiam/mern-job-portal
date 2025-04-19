"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Sliders } from "lucide-react"
import JobCard from "@/components/job-card"
import { jobListings } from "@/lib/data"
import FeaturedCompanies from "@/components/featured-companies"
import HeroSection from "@/components/hero-section"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("all")

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = jobType === "all" || job.type === jobType
    return matchesSearch && matchesType
  })

  return (
    <main className="flex flex-col">
      <HeroSection />

      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-6">Find Your Dream Job</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
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

              <Button variant="outline" size="icon">
                <Sliders className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="remote">Remote</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs
                .filter((job) => job.isRecent)
                .map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs
                .filter((job) => job.isFeatured)
                .map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="remote" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs
                .filter((job) => job.type === "remote")
                .map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <FeaturedCompanies />
      </section>
    </main>
  )
}
