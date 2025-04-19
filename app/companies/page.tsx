"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Building, MapPin, Search, Users, X } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export default function CompaniesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialSearchTerm = searchParams.get("search") || ""
  const initialIndustry = searchParams.get("industry") || "all"

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [industry, setIndustry] = useState(initialIndustry)
  const [activeTab, setActiveTab] = useState("all")

  // Update search term when URL parameter changes
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "")
    setIndustry(searchParams.get("industry") || "all")
  }, [searchParams])

  // Mock data for companies
  const companies = [
    {
      id: "1",
      name: "TechCorp",
      logo: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Technology",
      location: "San Francisco, CA",
      size: "501-1000 employees",
      description:
        "TechCorp is a leading technology company specializing in innovative software solutions for businesses of all sizes.",
      jobCount: 12,
      featured: true,
    },
    {
      id: "2",
      name: "DesignHub",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Design",
      location: "New York, NY",
      size: "51-200 employees",
      description:
        "DesignHub is a creative agency that specializes in digital product design and branding for startups and established companies.",
      jobCount: 8,
      featured: true,
    },
    {
      id: "3",
      name: "WebSolutions",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Technology",
      location: "Austin, TX",
      size: "51-200 employees",
      description:
        "WebSolutions is a web development agency that specializes in building custom web applications for businesses across various industries.",
      jobCount: 15,
      featured: false,
    },
    {
      id: "4",
      name: "InnovateCo",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Technology",
      location: "Seattle, WA",
      size: "201-500 employees",
      description:
        "InnovateCo is a leading SaaS company that provides innovative solutions for businesses to streamline their operations and improve productivity.",
      jobCount: 10,
      featured: false,
    },
    {
      id: "5",
      name: "DataInsights",
      logo: "https://images.unsplash.com/photo-1607443359670-fda2fe390416?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Data & Analytics",
      location: "Boston, MA",
      size: "51-200 employees",
      description:
        "DataInsights is a data analytics company that helps businesses make data-driven decisions through advanced analytics and machine learning.",
      jobCount: 7,
      featured: true,
    },
    {
      id: "6",
      name: "CloudTech",
      logo: "https://images.unsplash.com/photo-1603969072881-b0fc7f3d6d7e?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Technology",
      location: "Remote",
      size: "51-200 employees",
      description:
        "CloudTech is a cloud infrastructure company that helps businesses migrate to the cloud and optimize their cloud operations.",
      jobCount: 9,
      featured: false,
    },
    {
      id: "7",
      name: "GrowthLabs",
      logo: "https://images.unsplash.com/photo-1557683316-973673baf926?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Marketing",
      location: "Chicago, IL",
      size: "51-200 employees",
      description:
        "GrowthLabs is a marketing agency that helps businesses grow through innovative marketing strategies and data-driven campaigns.",
      jobCount: 6,
      featured: false,
    },
    {
      id: "8",
      name: "AppWorks",
      logo: "https://images.unsplash.com/photo-1569023356866-2e4ed97cac47?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      industry: "Technology",
      location: "Los Angeles, CA",
      size: "51-200 employees",
      description:
        "AppWorks is a mobile app development company that specializes in creating innovative and user-friendly applications for iOS and Android platforms.",
      jobCount: 11,
      featured: true,
    },
  ]

  // Filter companies based on search term, industry, and active tab
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIndustry = industry === "all" || company.industry === industry

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && company.featured) ||
      (activeTab === "hiring" && company.jobCount > 5)

    return matchesSearch && matchesIndustry && matchesTab
  })

  // Update URL when search term or industry changes
  const updateSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }

    if (industry !== "all") {
      params.set("industry", industry)
    } else {
      params.delete("industry")
    }

    router.push(`/companies?${params.toString()}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams()
  }

  const handleIndustryChange = (value: string) => {
    setIndustry(value)

    // Update URL immediately when industry changes
    const params = new URLSearchParams(searchParams.toString())

    if (value !== "all") {
      params.set("industry", value)
    } else {
      params.delete("industry")
    }

    if (searchTerm) {
      params.set("search", searchTerm)
    }

    router.push(`/companies?${params.toString()}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader title="Explore Top Companies" description="Discover great places to work and advance your career" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 mt-8"
      >
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setSearchTerm("")
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete("search")
                  router.push(`/companies?${params.toString()}`)
                }}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <Select value={industry} onValueChange={handleIndustryChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="hidden md:flex">
              Search
            </Button>
          </div>
        </form>

        <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Companies</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="hiring">Actively Hiring</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <CompanyCard key={company.id} company={company} index={index} />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No companies found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setIndustry("all")
                      router.push("/companies")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredCompanies.filter((company) => company.featured).length > 0 ? (
                filteredCompanies
                  .filter((company) => company.featured)
                  .map((company, index) => <CompanyCard key={company.id} company={company} index={index} />)
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No featured companies found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setIndustry("all")
                      router.push("/companies")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="hiring">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredCompanies.filter((company) => company.jobCount > 5).length > 0 ? (
                filteredCompanies
                  .filter((company) => company.jobCount > 5)
                  .map((company, index) => <CompanyCard key={company.id} company={company} index={index} />)
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No actively hiring companies found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setIndustry("all")
                      router.push("/companies")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  )
}

interface CompanyCardProps {
  company: {
    id: string
    name: string
    logo: string
    industry: string
    location: string
    size: string
    description: string
    jobCount: number
    featured: boolean
  }
  index: number
}

function CompanyCard({ company, index }: CompanyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <Avatar className="h-14 w-14 rounded-md">
                <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                <AvatarFallback className="rounded-md">{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {company.featured && (
                <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Building className="mr-1 h-4 w-4" />
                <span>{company.industry}</span>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4 shrink-0" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-1 h-4 w-4 shrink-0" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="mr-1 h-4 w-4 shrink-0" />
                  <span>{company.jobCount} open positions</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{company.description}</p>
            </div>

            <div className="flex gap-2 mt-auto pt-4">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/companies/${company.id}`}>View Profile</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/companies/${company.id}/jobs`}>View Jobs</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
