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
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, Upload } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import PageHeader from "@/components/page-header"
import Link from "next/link"

export default function ResumeReviewPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Resume Submitted",
      description:
        "Your resume has been submitted for review. We'll get back to you within the timeframe of your selected plan.",
    })
    setFormStep(0)
    setSelectedPlan(null)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader
        title="Resume Review Service"
        description="Get expert feedback to make your resume stand out to employers"
      />

      <div className="mt-8">
        <Tabs defaultValue="plans" className="mb-8">
          <TabsList>
            <TabsTrigger value="plans">Review Plans</TabsTrigger>
            <TabsTrigger value="process">How It Works</TabsTrigger>
            <TabsTrigger value="samples">Sample Reviews</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {selectedPlan ? (
              <SubmissionForm
                plan={plans.find((p) => p.id === selectedPlan)!}
                step={formStep}
                onStepChange={setFormStep}
                onCancel={() => {
                  setSelectedPlan(null)
                  setFormStep(0)
                }}
                onSubmit={handleSubmit}
              />
            ) : (
              <>
                <TabsContent value="plans">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                      <PlanCard key={plan.id} plan={plan} index={index} onSelect={() => setSelectedPlan(plan.id)} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="process">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">1. Submit Your Resume</h3>
                          <p className="text-sm text-muted-foreground">
                            Upload your current resume and provide information about your target roles and industries.
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">2. Expert Review</h3>
                          <p className="text-sm text-muted-foreground">
                            Our certified resume experts analyze your resume for content, format, and ATS optimization.
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">3. Receive Feedback</h3>
                          <p className="text-sm text-muted-foreground">
                            Get detailed feedback and suggestions to improve your resume's effectiveness and impact.
                          </p>
                        </div>
                      </div>

                      <Separator className="my-8" />

                      <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-xl font-medium mb-4">What Our Review Covers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="bg-muted p-3 rounded-md">Content & Messaging</div>
                          <div className="bg-muted p-3 rounded-md">Format & Design</div>
                          <div className="bg-muted p-3 rounded-md">ATS Optimization</div>
                          <div className="bg-muted p-3 rounded-md">Industry Alignment</div>
                          <div className="bg-muted p-3 rounded-md">Achievement Highlighting</div>
                          <div className="bg-muted p-3 rounded-md">Grammar & Clarity</div>
                          <div className="bg-muted p-3 rounded-md">Keyword Analysis</div>
                          <div className="bg-muted p-3 rounded-md">Overall Impact</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="samples">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Before & After Examples</h3>
                          <div className="space-y-6">
                            <div className="border rounded-md overflow-hidden">
                              <div className="bg-muted p-3 font-medium">Software Engineer Resume</div>
                              <div className="p-4 grid grid-cols-2 gap-4">
                                <div>
                                  <Badge variant="outline" className="mb-2">
                                    Before
                                  </Badge>
                                  <div className="text-sm text-muted-foreground">
                                    <p>Worked on web applications using React</p>
                                    <p>Fixed bugs and implemented features</p>
                                    <p>Participated in code reviews</p>
                                  </div>
                                </div>
                                <div>
                                  <Badge variant="outline" className="mb-2 border-green-500 text-green-600">
                                    After
                                  </Badge>
                                  <div className="text-sm text-muted-foreground">
                                    <p>
                                      Developed responsive web applications using React, Redux, and TypeScript,
                                      improving user engagement by 35%
                                    </p>
                                    <p>
                                      Resolved 40+ critical bugs and implemented 15 new features, reducing customer
                                      support tickets by 25%
                                    </p>
                                    <p>
                                      Led bi-weekly code reviews that improved code quality and reduced technical debt
                                      by 20%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border rounded-md overflow-hidden">
                              <div className="bg-muted p-3 font-medium">Marketing Manager Resume</div>
                              <div className="p-4 grid grid-cols-2 gap-4">
                                <div>
                                  <Badge variant="outline" className="mb-2">
                                    Before
                                  </Badge>
                                  <div className="text-sm text-muted-foreground">
                                    <p>Managed social media accounts</p>
                                    <p>Created marketing campaigns</p>
                                    <p>Worked with design team on materials</p>
                                  </div>
                                </div>
                                <div>
                                  <Badge variant="outline" className="mb-2 border-green-500 text-green-600">
                                    After
                                  </Badge>
                                  <div className="text-sm text-muted-foreground">
                                    <p>
                                      Grew social media following by 150% across platforms, resulting in 45% increase in
                                      website traffic
                                    </p>
                                    <p>
                                      Developed and executed 12 integrated marketing campaigns that generated $1.2M in
                                      revenue
                                    </p>
                                    <p>
                                      Collaborated with design team to create award-winning marketing materials that
                                      increased brand recognition by 30%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">Sample Feedback</h3>
                          <div className="border rounded-md p-4 space-y-4">
                            <div>
                              <h4 className="font-medium text-sm">Content & Messaging</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your resume focuses too much on responsibilities rather than achievements. Try
                                quantifying your impact with metrics and specific outcomes. For example, instead of
                                "Managed a team," try "Led a team of 5 that delivered projects 15% ahead of schedule."
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm">Format & Design</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                The current two-column format makes it difficult for ATS systems to parse your
                                information correctly. Consider switching to a single-column format with clear section
                                headings. Also, your font size varies throughout the document, creating an inconsistent
                                look.
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm">ATS Optimization</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your resume is missing key industry keywords that would help it pass ATS filters. Based
                                on your target role, consider incorporating terms like "project management," "agile
                                methodology," and "stakeholder communication" where relevant.
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm">Overall Recommendations</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                1. Restructure your experience section to highlight achievements first
                                <br />
                                2. Add a strong professional summary that positions you for your target role
                                <br />
                                3. Incorporate more industry-specific keywords throughout
                                <br />
                                4. Simplify the design for better ATS compatibility
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>

      <section className="mt-16">
        <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need more comprehensive career help?</h2>
            <p className="text-muted-foreground mb-6">
              Our career coaches can provide personalized guidance on your resume, interview skills, and overall career
              strategy.
            </p>
            <Button size="lg" asChild>
              <Link href="/resources/career-coaching">Book a Career Coach</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

// Mock data for resume review plans
const plans = [
  {
    id: "basic",
    name: "Basic Review",
    price: "$49",
    turnaround: "3-5 business days",
    description: "Essential resume feedback for job seekers on a budget",
    features: [
      "Written feedback document",
      "Content & structure review",
      "ATS compatibility check",
      "Improvement suggestions",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional Review",
    price: "$89",
    turnaround: "2 business days",
    description: "Comprehensive review with detailed feedback and suggestions",
    features: [
      "Everything in Basic Review",
      "Industry-specific optimization",
      "Achievement enhancement",
      "Keyword optimization",
      "Follow-up questions via email",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Review",
    price: "$149",
    turnaround: "1 business day",
    description: "In-depth review with personalized consultation",
    features: [
      "Everything in Professional Review",
      "30-minute video consultation",
      "Before & after comparison",
      "LinkedIn profile review",
      "2 rounds of revisions",
      "Priority support",
    ],
    popular: false,
  },
]

interface PlanCardProps {
  plan: (typeof plans)[0]
  index: number
  onSelect: () => void
}

function PlanCard({ plan, index, onSelect }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={`h-full hover:shadow-md transition-shadow ${plan.popular ? "border-primary" : ""}`}>
        {plan.popular && (
          <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">Most Popular</div>
        )}
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground mb-1">one-time</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{plan.turnaround}</span>
          </div>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="text-sm font-medium mb-2">What's included:</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant={plan.popular ? "default" : "outline"} onClick={onSelect}>
            Select Plan
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface SubmissionFormProps {
  plan: (typeof plans)[0]
  step: number
  onStepChange: (step: number) => void
  onCancel: () => void
  onSubmit: (e: React.FormEvent) => void
}

function SubmissionForm({ plan, step, onStepChange, onCancel, onSubmit }: SubmissionFormProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Submit Resume for {plan.name}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <CardDescription>Complete the following steps to submit your resume for review</CardDescription>
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
              <span className="ml-2 font-medium">Upload</span>
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
              <span className="ml-2 font-medium">Details</span>
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
              <span className="ml-2 font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          {step === 0 && (
            <div className="space-y-4">
              <div className="p-4 border-2 border-dashed rounded-md text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Upload your resume</p>
                <p className="text-xs text-muted-foreground mb-4">PDF, DOCX, or RTF format (Max 5MB)</p>
                <Button type="button" size="sm">
                  Select File
                </Button>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="button" onClick={() => onStepChange(1)}>
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
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
                <Label htmlFor="industry">Industry</Label>
                <Select defaultValue="technology">
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetRole">Target Role</Label>
                <Input id="targetRole" placeholder="E.g., Software Engineer, Marketing Manager" />
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any specific areas you'd like us to focus on in the review?"
                  className="min-h-[100px]"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => onStepChange(0)}>
                  Back
                </Button>
                <Button type="button" onClick={() => onStepChange(2)}>
                  Continue to Confirm
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>{plan.name}</span>
                  <span>{plan.price}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Turnaround time: {plan.turnaround}</span>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{plan.price}</span>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Payment Method</Label>
                <RadioGroup defaultValue="card" className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => onStepChange(1)}>
                  Back
                </Button>
                <Button type="submit">Submit and Pay</Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
