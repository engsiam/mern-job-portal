"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, Calendar, Clock, Share2, ThumbsUp, Bookmark } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  // Fetch article data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Find article by ID
      const foundArticle = mockArticles.find((a) => a.id === params.id)
      setArticle(foundArticle || null)
      setLikesCount(foundArticle?.likes || 0)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this article with others",
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Article removed from bookmarks" : "Article bookmarked",
      description: isBookmarked
        ? "Article has been removed from your reading list"
        : "Article has been added to your reading list",
    })
  }

  const handleLike = () => {
    setLikesCount(likesCount + 1)
    toast({
      title: "Article liked",
      description: "Thanks for your feedback!",
    })
  }

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

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/resources")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
        </Button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/resources")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
      </Button>

      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {article.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=AI${article.author.avatar}`} />
                      <AvatarFallback>{article.author.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{article.author.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={handleBookmark}>
                      <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="prose dark:prose-invert max-w-none">
                {article.content.map((section: any, index: number) => (
                  <div key={index} className="mb-6">
                    {section.type === "heading" && <h2 className="text-xl font-bold mt-8 mb-4">{section.text}</h2>}
                    {section.type === "paragraph" && <p className="mb-4">{section.text}</p>}
                    {section.type === "list" && (
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        {section.items.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.type === "quote" && (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{section.text}</blockquote>
                    )}
                    {section.type === "resource" && (
                      <div className="my-6 p-4 rounded-lg border bg-muted/30">
                        <h3 className="font-medium mb-2">{section.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                        <Button asChild size="sm">
                          <a href={section.url} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="mr-2 h-4 w-4" /> {section.linkText}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">Did you find this article helpful?</h3>
                  <p className="text-sm text-muted-foreground">Help others by sharing your thoughts</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleLike}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> Helpful ({likesCount})
                  </Button>
                  <Button onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Share Article
                  </Button>
                </div>
              </div>

              {article.relatedArticles && article.relatedArticles.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {article.relatedArticles.map((related: any) => (
                        <Card key={related.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <Link href={`/resources/articles/${related.id}`} className="hover:underline">
                              <h4 className="font-medium mb-1">{related.title}</h4>
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-2">
                              <Clock className="mr-1 h-3 w-3" /> {related.readTime}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}

// Mock data for articles - in a real app, this would come from an API or database
const mockArticles = [
  {
    id: "1",
    title: "10 Tips for a Successful Job Interview",
    category: "Interview Tips",
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
    },
    date: "Apr 15, 2023",
    readTime: "5 min read",
    excerpt:
      "Master the art of job interviews with these essential tips that will help you stand out from other candidates and make a lasting impression.",
    likes: 45,
    content: [
      {
        type: "paragraph",
        text: "Job interviews can be nerve-wracking, but with the right preparation, you can approach them with confidence and increase your chances of success. Whether you're a seasoned professional or a recent graduate, these ten tips will help you navigate the interview process and make a positive impression on potential employers.",
      },
      {
        type: "heading",
        text: "1. Research the Company",
      },
      {
        type: "paragraph",
        text: "Before your interview, take the time to thoroughly research the company. Understand their products or services, mission, values, and recent achievements. This knowledge will not only help you tailor your answers but also demonstrate your genuine interest in the organization.",
      },
      {
        type: "resource",
        title: "Company Research Guide",
        description: "A comprehensive guide on how to research companies effectively before interviews",
        url: "https://www.indeed.com/career-advice/interviewing/how-to-research-a-company",
        linkText: "Access Guide",
      },
      {
        type: "heading",
        text: "2. Practice Common Interview Questions",
      },
      {
        type: "paragraph",
        text: "While you can't predict every question, practicing responses to common interview questions will help you feel more prepared and confident. Focus on clear, concise answers that highlight your skills and experiences relevant to the position.",
      },
      {
        type: "list",
        items: [
          "Tell me about yourself",
          "Why are you interested in this position?",
          "What are your greatest strengths and weaknesses?",
          "Describe a challenging situation at work and how you handled it",
          "Where do you see yourself in five years?",
        ],
      },
      {
        type: "heading",
        text: "3. Prepare Your Own Questions",
      },
      {
        type: "paragraph",
        text: "Asking thoughtful questions shows your interest in the role and helps you determine if the company is a good fit for your career goals. Prepare at least three to five questions about the position, team, company culture, or growth opportunities.",
      },
      {
        type: "quote",
        text: "The quality of your questions often reveals more about you than your answers to the interviewer's questions.",
      },
      {
        type: "heading",
        text: "4. Dress Appropriately",
      },
      {
        type: "paragraph",
        text: "First impressions matter, so dress professionally and appropriately for the company culture. When in doubt, it's better to be slightly overdressed than underdressed. Ensure your clothes are clean, pressed, and comfortable.",
      },
      {
        type: "heading",
        text: "5. Arrive Early",
      },
      {
        type: "paragraph",
        text: "Plan to arrive 10-15 minutes before your scheduled interview time. This allows you to compose yourself, review your notes, and complete any paperwork. For virtual interviews, test your technology in advance and log in a few minutes early.",
      },
      {
        type: "resource",
        title: "Virtual Interview Preparation Checklist",
        description: "Essential tips to prepare for virtual interviews and make a great impression",
        url: "https://www.linkedin.com/business/talent/blog/talent-acquisition/tips-for-conducting-seamless-virtual-interviews",
        linkText: "View Checklist",
      },
    ],
    relatedArticles: [
      {
        id: "2",
        title: "How to Write a Resume That Gets Noticed",
        excerpt:
          "Learn how to craft a compelling resume that highlights your skills and experience, and catches the attention of hiring managers.",
        readTime: "7 min read",
      },
      {
        id: "3",
        title: "Negotiating Your Salary: A Complete Guide",
        excerpt:
          "Discover effective strategies for negotiating your salary and benefits package to ensure you get the compensation you deserve.",
        readTime: "8 min read",
      },
    ],
  },
  {
    id: "2",
    title: "How to Write a Resume That Gets Noticed",
    category: "Resume Writing",
    author: {
      name: "Michael Chen",
      avatar: "MC",
    },
    date: "Mar 28, 2023",
    readTime: "7 min read",
    excerpt:
      "Learn how to craft a compelling resume that highlights your skills and experience, and catches the attention of hiring managers.",
    likes: 38,
    content: [
      {
        type: "paragraph",
        text: "Your resume is often the first impression a potential employer has of you. In today's competitive job market, crafting a resume that stands out is more important than ever. This guide will walk you through the essential elements of a compelling resume that gets noticed by hiring managers and applicant tracking systems alike.",
      },
      {
        type: "heading",
        text: "Start with a Strong Summary",
      },
      {
        type: "paragraph",
        text: "Begin your resume with a concise professional summary that highlights your most relevant skills, experiences, and achievements. Think of this as your elevator pitch - you have just a few seconds to capture the reader's attention and convince them to keep reading.",
      },
      {
        type: "resource",
        title: "Resume Templates Collection",
        description: "A collection of professional resume templates for different industries and experience levels",
        url: "https://www.resume.com/resume-templates",
        linkText: "Download Templates",
      },
    ],
    relatedArticles: [
      {
        id: "1",
        title: "10 Tips for a Successful Job Interview",
        excerpt:
          "Master the art of job interviews with these essential tips that will help you stand out from other candidates and make a lasting impression.",
        readTime: "5 min read",
      },
    ],
  },
]
