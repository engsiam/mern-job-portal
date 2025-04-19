"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, PlayCircle, User, MapPin, Search, X } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialSearchTerm = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || "all"

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [activeTab, setActiveTab] = useState("articles")
  const [category, setCategory] = useState(initialCategory)

  // Update search term when URL parameter changes
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "")
    setCategory(searchParams.get("category") || "all")
  }, [searchParams])

  // Filter resources based on search term and category
  const filteredArticles = articles.filter(
    (article) =>
      (searchTerm === "" ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "all" || article.category === category),
  )

  const filteredGuides = guides.filter(
    (guide) =>
      (searchTerm === "" ||
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "all" || guide.category === category),
  )

  const filteredVideos = videos.filter(
    (video) =>
      (searchTerm === "" || video.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "all" || video.category === category),
  )

  const filteredEvents = events.filter(
    (event) =>
      (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "all" || event.category === category),
  )

  // Update URL when search term changes
  const updateSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }

    if (category !== "all") {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    router.push(`/resources?${params.toString()}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader title="Career Resources" description="Helpful guides, tips, and tools to advance your career" />

      <div className="mt-8 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
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
                  router.push(`/resources?${params.toString()}`)
                }}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <Button type="submit" className="md:w-24">
            Search
          </Button>
        </form>
      </div>

      {searchTerm && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing results for: <span className="font-medium text-foreground">{searchTerm}</span>
          </p>
        </div>
      )}

      <Tabs defaultValue="articles" className="mt-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="articles">
            Articles {filteredArticles.length > 0 && `(${filteredArticles.length})`}
          </TabsTrigger>
          <TabsTrigger value="guides">Guides {filteredGuides.length > 0 && `(${filteredGuides.length})`}</TabsTrigger>
          <TabsTrigger value="videos">Videos {filteredVideos.length > 0 && `(${filteredVideos.length})`}</TabsTrigger>
          <TabsTrigger value="events">Events {filteredEvents.length > 0 && `(${filteredEvents.length})`}</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategory("all")
                  router.push("/resources")
                }}
              >
                Reset Search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="guides">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide, index) => (
                <GuideCard key={guide.id} guide={guide} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No guides found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategory("all")
                  router.push("/resources")
                }}
              >
                Reset Search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No videos found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategory("all")
                  router.push("/resources")
                }}
              >
                Reset Search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="events">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategory("all")
                  router.push("/resources")
                }}
              >
                Reset Search
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <section className="mt-16">
        <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need personalized career advice?</h2>
            <p className="text-muted-foreground mb-6">
              Our career experts can help you with resume reviews, interview preparation, and personalized career
              guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/resources/career-coaching">Book a Career Coach</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/resources/resume-review">Get Resume Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Mock data for articles
const articles = [
  {
    id: "1",
    title: "10 Tips for a Successful Job Interview",
    category: "Interview Tips",
    author: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "SJ",
    },
    date: "Apr 15, 2023",
    readTime: "5 min read",
    excerpt:
      "Master the art of job interviews with these essential tips that will help you stand out from other candidates and make a lasting impression.",
  },
  {
    id: "2",
    title: "How to Write a Resume That Gets Noticed",
    category: "Resume Writing",
    author: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "MC",
    },
    date: "Mar 28, 2023",
    readTime: "7 min read",
    excerpt:
      "Learn how to craft a compelling resume that highlights your skills and experience, and catches the attention of hiring managers.",
  },
  {
    id: "3",
    title: "Negotiating Your Salary: A Complete Guide",
    category: "Career Advice",
    author: {
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "AR",
    },
    date: "Apr 2, 2023",
    readTime: "8 min read",
    excerpt:
      "Discover effective strategies for negotiating your salary and benefits package to ensure you get the compensation you deserve.",
  },
  {
    id: "4",
    title: "Switching Careers: How to Make a Successful Transition",
    category: "Career Change",
    author: {
      name: "Emily Wong",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "EW",
    },
    date: "Apr 10, 2023",
    readTime: "6 min read",
    excerpt:
      "Planning to switch careers? This guide provides practical advice on how to make a smooth and successful career transition.",
  },
  {
    id: "5",
    title: "Building Your Personal Brand on LinkedIn",
    category: "Networking",
    author: {
      name: "David Smith",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "DS",
    },
    date: "Mar 15, 2023",
    readTime: "5 min read",
    excerpt:
      "Learn how to leverage LinkedIn to build a strong personal brand that attracts recruiters and opens up new career opportunities.",
  },
  {
    id: "6",
    title: "Remote Work: Tips for Staying Productive",
    category: "Remote Work",
    author: {
      name: "Jessica Lee",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "JL",
    },
    date: "Apr 5, 2023",
    readTime: "6 min read",
    excerpt:
      "Working remotely can be challenging. Discover practical tips for staying productive and maintaining work-life balance.",
  },
]

// Mock data for guides
const guides = [
  {
    id: "1",
    title: "The Complete Guide to Resume Writing",
    category: "Resume",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    pages: 25,
    excerpt:
      "Everything you need to know about creating a standout resume, from formatting to content, with examples and templates.",
  },
  {
    id: "2",
    title: "Mastering the Job Interview",
    category: "Interviews",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    pages: 32,
    excerpt:
      "Comprehensive guide to acing job interviews, including preparation, common questions, and follow-up strategies.",
  },
  {
    id: "3",
    title: "Networking for Career Success",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    pages: 18,
    excerpt:
      "Learn how to build and leverage your professional network to advance your career and find new opportunities.",
  },
  {
    id: "4",
    title: "Career Planning Workbook",
    category: "Career Planning",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    pages: 40,
    excerpt:
      "A step-by-step workbook to help you plan your career path, set goals, and take actionable steps towards your dream job.",
  },
  {
    id: "5",
    title: "Salary Negotiation Handbook",
    category: "Negotiation",
    image:
      "https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    pages: 22,
    excerpt: "Expert strategies and scripts for negotiating your salary and benefits package with confidence.",
  },
  {
    id: "6",
    title: "Remote Work Success Guide",
    category: "Remote Work",
    image:
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    pages: 28,
    excerpt: "Everything you need to know about finding, securing, and thriving in remote work positions.",
  },
]

// Mock data for videos
const videos = [
  {
    id: "1",
    title: "How to Answer the 'Tell Me About Yourself' Interview Question",
    category: "Interview Tips",
    duration: "12:45",
    thumbnail:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?w=640&h=360&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    views: "45K",
  },
  {
    id: "2",
    title: "Resume Makeover: Before and After",
    category: "Resume Tips",
    duration: "18:30",
    thumbnail:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=640&h=360&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    views: "32K",
  },
  {
    id: "3",
    title: "5 Body Language Tips for Job Interviews",
    category: "Interview Tips",
    duration: "8:15",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=640&h=360&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    views: "28K",
  },
  {
    id: "4",
    title: "How to Find Hidden Job Opportunities",
    category: "Job Search",
    duration: "15:20",
    thumbnail:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=640&h=360&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    views: "19K",
  },
  {
    id: "5",
    title: "LinkedIn Profile Optimization Tutorial",
    category: "Networking",
    duration: "22:10",
    thumbnail:
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=640&h=360&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    views: "37K",
  },
  {
    id: "6",
    title: "Negotiating Your Salary: Role Play Examples",
    category: "Negotiation",
    duration: "16:45",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019236-61f12a5cbbec?w=640&h=360&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    views: "25K",
  },
]

// Mock data for events
const events = [
  {
    id: "1",
    title: "Virtual Career Fair: Tech Industry",
    category: "Career Fair",
    date: "May 15, 2023",
    time: "10:00 AM - 4:00 PM EST",
    location: "Virtual",
    isFree: true,
  },
  {
    id: "2",
    title: "Resume Workshop with Industry Experts",
    category: "Workshop",
    date: "May 20, 2023",
    time: "2:00 PM - 4:00 PM EST",
    location: "Virtual",
    isFree: false,
  },
  {
    id: "3",
    title: "Networking Mixer for Marketing Professionals",
    category: "Networking",
    date: "May 25, 2023",
    time: "6:00 PM - 8:00 PM EST",
    location: "New York, NY",
    isFree: false,
  },
  {
    id: "4",
    title: "Interview Skills Bootcamp",
    category: "Workshop",
    date: "June 3, 2023",
    time: "9:00 AM - 12:00 PM EST",
    location: "Virtual",
    isFree: false,
  },
  {
    id: "5",
    title: "Career Change Panel Discussion",
    category: "Panel",
    date: "June 10, 2023",
    time: "1:00 PM - 2:30 PM EST",
    location: "Virtual",
    isFree: true,
  },
  {
    id: "6",
    title: "Job Search Strategy Webinar",
    category: "Webinar",
    date: "June 15, 2023",
    time: "11:00 AM - 12:00 PM EST",
    location: "Virtual",
    isFree: true,
  },
]

interface ArticleCardProps {
  article: {
    id: string
    title: string
    category: string
    author: {
      name: string
      avatar: string
      fallback: string
    }
    date: string
    readTime: string
    excerpt: string
  }
  index: number
}

function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{article.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {article.readTime}
            </div>
          </div>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
              <AvatarFallback>{article.author.fallback}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{article.author.name}</p>
              <p className="text-muted-foreground">{article.date}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/resources/articles/${article.id}`}>Read</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface GuideCardProps {
  guide: {
    id: string
    title: string
    category: string
    image: string
    pages: number
    excerpt: string
  }
  index: number
}

function GuideCard({ guide, index }: GuideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">{guide.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="mr-1 h-3 w-3" />
              {guide.pages} pages
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-md overflow-hidden">
              <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
            </div>
            <CardTitle className="text-xl">{guide.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">{guide.excerpt}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href={`/resources/guides/${guide.id}`}>Download Guide</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface VideoCardProps {
  video: {
    id: string
    title: string
    category: string
    duration: string
    thumbnail: string
    views: string
  }
  index: number
}

function VideoCard({ video, index }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative aspect-video bg-muted">
          <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 h-16 w-16 rounded-full flex items-center justify-center text-white">
              <PlayCircle className="h-8 w-8" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{video.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-1 h-3 w-3" />
              {video.views} views
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/resources/videos/${video.id}`}>Watch Video</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface EventCardProps {
  event: {
    id: string
    title: string
    category: string
    date: string
    time: string
    location: string
    isFree: boolean
  }
  index: number
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">{event.category}</Badge>
            {event.isFree ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Free
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                Paid
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start">
            <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{event.date}</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <p className="text-sm">{event.location}</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/resources/events/${event.id}`}>Details</Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href={`/resources/events/${event.id}/register`}>Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
