"use client"

import { TabsContent } from "@/components/ui/tabs"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import PageHeader from "@/components/page-header"
import Link from "next/link"

export default function CareerCoachingPage() {
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(0)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Booking Confirmed",
      description: "Your career coaching session has been booked successfully. Check your email for details.",
    })
    setFormStep(0)
    setSelectedCoach(null)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader
        title="Career Coaching"
        description="Get personalized guidance from experienced career professionals"
      />

      <div className="mt-8">
        <Tabs defaultValue="coaches" className="mb-8">
          <TabsList>
            <TabsTrigger value="coaches">Our Coaches</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {selectedCoach ? (
              <BookingForm
                coach={coaches.find((c) => c.id === selectedCoach)!}
                step={formStep}
                onStepChange={setFormStep}
                onCancel={() => {
                  setSelectedCoach(null)
                  setFormStep(0)
                }}
                onSubmit={handleBooking}
              />
            ) : (
              <>
                <TabsContent value="coaches">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coaches.map((coach, index) => (
                      <CoachCard
                        key={coach.id}
                        coach={coach}
                        index={index}
                        onSelect={() => setSelectedCoach(coach.id)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="services">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="testimonials">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                  </div>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>

      <section className="mt-16">
        <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure which service is right for you?</h2>
            <p className="text-muted-foreground mb-6">
              Schedule a free 15-minute consultation to discuss your career goals and find the best coaching option for
              your needs.
            </p>
            <Button size="lg" asChild>
              <Link href="/resources/career-coaching/consultation">Schedule Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

// Mock data for coaches
const coaches = [
  {
    id: "1",
    name: "Dr. Emily Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "EC",
    title: "Career Strategist",
    specialties: ["Career Transitions", "Executive Coaching", "Leadership Development"],
    experience: "15+ years",
    rating: 4.9,
    reviewCount: 127,
    bio: "Dr. Chen specializes in helping professionals navigate career transitions and develop leadership skills. With a Ph.D. in Organizational Psychology and experience working with Fortune 500 companies, she provides strategic guidance for career advancement.",
    availability: ["Mon", "Wed", "Fri"],
    price: "$150/hour",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "MJ",
    title: "Interview Coach",
    specialties: ["Interview Preparation", "Salary Negotiation", "Personal Branding"],
    experience: "10+ years",
    rating: 4.8,
    reviewCount: 98,
    bio: "Marcus is a former tech recruiter turned career coach who specializes in interview preparation and salary negotiation. He has helped hundreds of clients land jobs at top tech companies and negotiate competitive compensation packages.",
    availability: ["Tue", "Thu", "Sat"],
    price: "$125/hour",
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=128&h=128&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "SR",
    title: "Resume Expert",
    specialties: ["Resume Writing", "LinkedIn Optimization", "Job Search Strategy"],
    experience: "8+ years",
    rating: 4.7,
    reviewCount: 85,
    bio: "Sophia is a certified resume writer and job search strategist who helps clients create compelling application materials that get results. She specializes in optimizing resumes for ATS systems and crafting powerful LinkedIn profiles.",
    availability: ["Mon", "Tue", "Thu", "Fri"],
    price: "$100/hour",
  },
]

// Mock data for services
const services = [
  {
    id: "1",
    title: "Career Path Planning",
    description: "Develop a strategic career plan aligned with your values, skills, and long-term goals.",
    duration: "90 minutes",
    price: "$175",
    includes: [
      "Career values assessment",
      "Skills and strengths analysis",
      "Industry and role exploration",
      "Customized career roadmap",
      "30-day follow-up session",
    ],
  },
  {
    id: "2",
    title: "Interview Preparation",
    description: "Comprehensive interview coaching to help you confidently navigate any interview scenario.",
    duration: "60 minutes",
    price: "$125",
    includes: [
      "Mock interview with feedback",
      "Common question preparation",
      "Behavioral interview techniques",
      "Storytelling framework",
      "Post-interview follow-up strategies",
    ],
  },
  {
    id: "3",
    title: "Resume & LinkedIn Makeover",
    description: "Transform your resume and LinkedIn profile to attract recruiters and hiring managers.",
    duration: "75 minutes",
    price: "$150",
    includes: [
      "Resume review and optimization",
      "LinkedIn profile enhancement",
      "ATS-friendly formatting",
      "Achievement-focused content",
      "Keyword optimization",
    ],
  },
  {
    id: "4",
    title: "Salary Negotiation Coaching",
    description: "Learn effective strategies to negotiate the compensation package you deserve.",
    duration: "60 minutes",
    price: "$125",
    includes: [
      "Market value assessment",
      "Negotiation script development",
      "Counter-offer strategies",
      "Role-play practice session",
      "Benefits negotiation tactics",
    ],
  },
  {
    id: "5",
    title: "Career Transition Strategy",
    description: "Navigate a successful career change with a structured approach and action plan.",
    duration: "2 hours",
    price: "$200",
    includes: [
      "Transferable skills analysis",
      "Industry research guidance",
      "Networking strategy",
      "Customized transition timeline",
      "Skill development plan",
    ],
  },
  {
    id: "6",
    title: "Executive Presence Coaching",
    description: "Develop the communication skills and presence needed for leadership roles.",
    duration: "90 minutes",
    price: "$175",
    includes: [
      "Communication style assessment",
      "Presentation skills coaching",
      "Body language optimization",
      "Confidence-building techniques",
      "Leadership presence development",
    ],
  },
]

// Mock data for testimonials
const testimonials = [
  {
    name: "Alex Thompson",
    position: "Software Engineer",
    company: "TechCorp",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "AT",
    content:
      "Working with Dr. Chen was transformative for my career. Her strategic guidance helped me transition from a mid-level engineer to a leadership role. The investment in coaching paid off within months with a 30% salary increase.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    position: "Marketing Director",
    company: "GrowthLabs",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "PP",
    content:
      "Marcus's interview coaching was exactly what I needed. After three failed interviews, I worked with him to refine my approach. The very next interview resulted in a job offer! His salary negotiation advice alone was worth the investment.",
    rating: 5,
  },
  {
    name: "David Wilson",
    position: "Product Manager",
    company: "InnovateCo",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "DW",
    content:
      "Sophia completely transformed my resume and LinkedIn profile. Within weeks of working with her, I started getting calls from recruiters at companies I'd only dreamed of working for. Her insights into personal branding were invaluable.",
    rating: 4,
  },
  {
    name: "Jennifer Lee",
    position: "HR Specialist",
    company: "PeopleFirst",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
    fallback: "JL",
    content:
      "The career transition strategy session helped me pivot from HR to People Operations leadership. The structured approach and accountability made all the difference. I'm now in a role that aligns perfectly with my long-term goals.",
    rating: 5,
  },
]

interface CoachCardProps {
  coach: (typeof coaches)[0]
  index: number
  onSelect: () => void
}

function CoachCard({ coach, index, onSelect }: CoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
              <AvatarFallback>{coach.fallback}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{coach.name}</CardTitle>
              <CardDescription>{coach.title}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="ml-1 font-medium">{coach.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({coach.reviewCount} reviews)</span>
            <Badge variant="outline" className="ml-auto">
              {coach.experience}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-3">{coach.bio}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {coach.specialties.map((specialty, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{coach.availability.join(", ")}</span>
            </div>
            <span className="font-medium">{coach.price}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onSelect}>
            Book Session
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface ServiceCardProps {
  service: (typeof services)[0]
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{service.title}</CardTitle>
            <Badge variant="secondary">{service.price}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{service.duration}</span>
          </div>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="text-sm font-medium mb-2">Includes:</h4>
          <ul className="space-y-1">
            {service.includes.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2 text-primary">•</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/resources/career-coaching?service={service.id}">Select Service</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0]
  index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
              <AvatarFallback>{testimonial.fallback}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.position} at {testimonial.company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface BookingFormProps {
  coach: (typeof coaches)[0]
  step: number
  onStepChange: (step: number) => void
  onCancel: () => void
  onSubmit: (e: React.FormEvent) => void
}

function BookingForm({ coach, step, onStepChange, onCancel, onSubmit }: BookingFormProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Book a Session with {coach.name}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <CardDescription>Complete the following steps to schedule your coaching session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Service</span>
            </div>
            <Separator className="w-12" />
            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Schedule</span>
            </div>
            <Separator className="w-12" />
            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="ml-2 font-medium">Details</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
                  <AvatarFallback>{coach.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{coach.name}</h3>
                  <p className="text-sm text-muted-foreground">{coach.title}</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Select Service</Label>
                <RadioGroup defaultValue="1" className="space-y-3">
                  {services.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value={service.id} id={`service-${service.id}`} />
                      <Label htmlFor={`service-${service.id}`} className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span className="font-medium">{service.title}</span>
                          <span>{service.price}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="button" onClick={() => onStepChange(1)}>
                  Continue to Schedule
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Select Date</Label>
                <Select defaultValue="2023-06-15">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-06-15">Thursday, June 15, 2023</SelectItem>
                    <SelectItem value="2023-06-16">Friday, June 16, 2023</SelectItem>
                    <SelectItem value="2023-06-19">Monday, June 19, 2023</SelectItem>
                    <SelectItem value="2023-06-20">Tuesday, June 20, 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Select Time</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"].map((time) => (
                    <Button key={time} type="button" variant="outline" className="justify-center">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Session Format</Label>
                <RadioGroup defaultValue="video" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video">Video Call</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone">Phone Call</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => onStepChange(0)}>
                  Back
                </Button>
                <Button type="button" onClick={() => onStepChange(2)}>
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>

              <div>
                <Label htmlFor="goals">What are your goals for this session?</Label>
                <Textarea
                  id="goals"
                  placeholder="Briefly describe what you hope to achieve..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => onStepChange(1)}>
                  Back
                </Button>
                <Button type="submit">Confirm Booking</Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
