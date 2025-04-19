"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Briefcase,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
  Calendar,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function CompanyProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [company, setCompany] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock company data - in a real app, you would fetch from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Find company by ID
      const foundCompany = mockCompanies.find((c) => c.id === params.id)
      setCompany(foundCompany || null)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mb-8"></div>
          <div className="h-64 bg-muted rounded-lg mb-6"></div>
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
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/companies")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Companies
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <Avatar className="h-24 w-24 rounded-md">
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                    <AvatarFallback className="rounded-md">{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{company.industry}</Badge>
                      {company.featured && (
                        <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center text-muted-foreground gap-x-4 gap-y-2">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {company.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {company.size}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {company.jobCount} open positions
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="culture">Culture</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="pt-4">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">About {company.name}</h2>
                      <p>{company.description}</p>
                      <p>{company.longDescription}</p>

                      <h3 className="text-lg font-semibold mt-6">Key Facts</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Founded</p>
                            <p className="text-muted-foreground">{company.founded}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Headquarters</p>
                            <p className="text-muted-foreground">{company.headquarters}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Users className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Company Size</p>
                            <p className="text-muted-foreground">{company.size}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Website</p>
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center"
                            >
                              {company.website} <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="culture" className="pt-4">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Our Culture</h2>
                      <p>{company.culture}</p>

                      <h3 className="text-lg font-semibold mt-6">Core Values</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {company.values.map((value: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-primary mt-0.5" />
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="pt-4">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Benefits & Perks</h2>
                      <p>
                        Working at {company.name} comes with many benefits designed to support your professional growth,
                        health, and work-life balance.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {company.benefits.map((benefit: any, index: number) => (
                          <Card key={index} className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-medium">{benefit.title}</h4>
                              <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                    <AvatarFallback className="rounded-md">{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                      {company.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${company.phone}`} className="text-primary hover:underline">
                      {company.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{company.address}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col gap-3">
                  <Button asChild>
                    <Link href={`/companies/${company.id}/jobs`}>
                      <Briefcase className="mr-2 h-4 w-4" /> View Open Positions
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" /> Visit Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {company.featuredJobs && company.featuredJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Featured Jobs</CardTitle>
                  <CardDescription>Popular open positions at {company.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {company.featuredJobs.map((job: any) => (
                    <div
                      key={job.id}
                      className="p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="mr-1 h-3 w-3" /> {job.location}
                        <span className="mx-2">•</span>
                        <Clock className="mr-1 h-3 w-3" /> {job.type}
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/companies/${company.id}/jobs`}>View All Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  )
}

// Mock data for companies - in a real app, this would come from an API or database
const mockCompanies = [
  {
    id: "1",
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    industry: "Technology",
    location: "San Francisco, CA",
    headquarters: "San Francisco, CA",
    size: "501-1000 employees",
    description:
      "TechCorp is a leading technology company specializing in innovative software solutions for businesses of all sizes.",
    longDescription:
      "Founded in 2010, TechCorp has been at the forefront of technological innovation, developing cutting-edge software solutions that help businesses streamline their operations and improve productivity. Our team of dedicated engineers and designers work tirelessly to create products that are not only powerful but also user-friendly and accessible.",
    jobCount: 12,
    featured: true,
    founded: "2010",
    website: "https://www.techcorp.com",
    email: "careers@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Avenue, San Francisco, CA 94105",
    culture:
      "At TechCorp, we believe in fostering a culture of innovation, collaboration, and continuous learning. We encourage our employees to think outside the box, take risks, and learn from failure. We value diversity and inclusion, and we strive to create a workplace where everyone feels welcome and respected.",
    values: [
      "Innovation and creativity",
      "Customer satisfaction",
      "Integrity and transparency",
      "Collaboration and teamwork",
      "Continuous learning and growth",
      "Work-life balance",
    ],
    benefits: [
      {
        title: "Health & Wellness",
        description: "Comprehensive health, dental, and vision insurance for you and your dependents.",
      },
      {
        title: "Flexible Work",
        description: "Remote work options and flexible scheduling to help you maintain work-life balance.",
      },
      {
        title: "Professional Development",
        description: "Continuous learning opportunities, including conferences, workshops, and courses.",
      },
      {
        title: "Competitive Compensation",
        description: "Competitive salary, equity packages, and performance-based bonuses.",
      },
    ],
    featuredJobs: [
      {
        id: "job1",
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        type: "Full-time",
      },
      {
        id: "job3",
        title: "Full Stack Developer",
        location: "Austin, TX",
        type: "Full-time",
      },
      {
        id: "job6",
        title: "DevOps Engineer",
        location: "Remote",
        type: "Full-time",
      },
    ],
  },
  {
    id: "2",
    name: "DesignHub",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    industry: "Design",
    location: "New York, NY",
    headquarters: "New York, NY",
    size: "51-200 employees",
    description:
      "DesignHub is a creative agency that specializes in digital product design and branding for startups and established companies.",
    longDescription:
      "DesignHub was founded in 2015 with a mission to bridge the gap between aesthetics and functionality in digital product design. We believe that great design should not only look beautiful but also solve real problems and enhance user experience. Our team of talented designers and strategists work closely with clients to understand their needs and create tailored solutions that help them achieve their goals.",
    jobCount: 8,
    featured: true,
    founded: "2015",
    website: "https://www.designhub.co",
    email: "hello@designhub.co",
    phone: "+1 (555) 987-6543",
    address: "456 Design Street, New York, NY 10001",
    culture:
      "DesignHub fosters a culture of creativity, collaboration, and continuous improvement. We believe that the best design solutions come from diverse perspectives and collaborative efforts. We encourage our team to experiment, take calculated risks, and push the boundaries of design to create innovative solutions for our clients.",
    values: [
      "User-centered design",
      "Creativity and innovation",
      "Attention to detail",
      "Collaborative problem-solving",
      "Continuous learning",
      "Design with purpose",
    ],
    benefits: [
      {
        title: "Health Coverage",
        description: "Comprehensive health insurance including dental and vision coverage.",
      },
      {
        title: "Creative Stipend",
        description: "Annual stipend for creative tools, books, and inspiration resources.",
      },
      {
        title: "Flexible Hours",
        description: "Flexible working hours to accommodate your creative flow and personal life.",
      },
      {
        title: "Professional Growth",
        description: "Budget for conferences, workshops, and courses to expand your design skills.",
      },
    ],
    featuredJobs: [
      {
        id: "job2",
        title: "UX/UI Designer",
        location: "New York, NY",
        type: "Full-time",
      },
      {
        id: "job12",
        title: "Content Writer",
        location: "Remote",
        type: "Part-time",
      },
    ],
  },
  {
    id: "5",
    name: "DataInsights",
    logo: "https://images.unsplash.com/photo-1607443359670-fda2fe390416?w=96&h=96&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    industry: "Data & Analytics",
    location: "Boston, MA",
    headquarters: "Boston, MA",
    size: "51-200 employees",
    description:
      "DataInsights is a data analytics company that helps businesses make data-driven decisions through advanced analytics and machine learning.",
    longDescription:
      "DataInsights was established in 2014 with the goal of democratizing data analytics and making it accessible to businesses of all sizes. We combine expertise in statistics, machine learning, and domain knowledge to transform raw data into actionable insights that drive business growth. Our solutions help companies understand their customers better, optimize their operations, and make more informed strategic decisions.",
    jobCount: 7,
    featured: true,
    founded: "2014",
    website: "https://www.datainsights.ai",
    email: "info@datainsights.ai",
    phone: "+1 (555) 456-7890",
    address: "789 Data Drive, Boston, MA 02108",
    culture:
      "At DataInsights, we believe in the power of data to transform businesses and improve lives. We foster a culture of intellectual curiosity, rigorous analysis, and innovative thinking. We encourage our team to ask difficult questions, challenge assumptions, and pursue creative solutions to complex problems. We value collaboration across disciplines and believe that diverse perspectives lead to better insights.",
    values: [
      "Data-driven decision making",
      "Intellectual curiosity",
      "Analytical rigor",
      "Ethical use of data",
      "Continuous learning",
      "Client success",
    ],
    benefits: [
      {
        title: "Comprehensive Benefits",
        description: "Health, dental, and vision insurance, 401(k) matching, and life insurance.",
      },
      {
        title: "Learning Budget",
        description: "Annual budget for books, courses, and conferences related to data science.",
      },
      {
        title: "Remote Work Options",
        description: "Flexible work arrangements including remote work opportunities.",
      },
      {
        title: "Wellness Program",
        description: "Gym memberships, wellness activities, and mental health resources.",
      },
    ],
    featuredJobs: [
      {
        id: "job5",
        title: "Data Scientist",
        location: "Boston, MA",
        type: "Full-time",
      },
    ],
  },
]
