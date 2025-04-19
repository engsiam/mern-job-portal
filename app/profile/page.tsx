"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  Briefcase,
  Building,
  Calendar,
  Edit,
  FileText,
  GraduationCap,
  Languages,
  MapPin,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
  User,
} from "lucide-react"
import PageHeader from "@/components/page-header"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader title="My Profile" description="Manage your personal information and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
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
                  <AvatarImage src="/placeholder.svg?height=96&width=96&text=AIJD" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">UI/UX Designer</p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  San Francisco, CA
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-3 w-3" /> Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-3 w-3" /> Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Profile Completion</p>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">85% Complete</p>
                </div>

                <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Profile Sections</p>
                  <nav className="space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "personal" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("personal")}
                    >
                      <User className="mr-2 h-4 w-4" /> Personal Information
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "experience" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("experience")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" /> Experience
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "education" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("education")}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" /> Education
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "skills" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("skills")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Skills & Resume
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === "preferences" ? "bg-accent" : ""}`}
                      onClick={() => setActiveTab("preferences")}
                    >
                      <Settings className="mr-2 h-4 w-4" /> Preferences
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
          {activeTab === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" defaultValue="UI/UX Designer" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Experienced UI/UX designer with a passion for creating intuitive and engaging user experiences. Skilled in user research, wireframing, prototyping, and visual design."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" type="url" defaultValue="https://johndoe.com" />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                        <p className="mt-1">John Doe</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p className="mt-1">john.doe@example.com</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                        <p className="mt-1">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                        <p className="mt-1">San Francisco, CA</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Professional Title</h3>
                        <p className="mt-1">UI/UX Designer</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Website</h3>
                        <p className="mt-1">
                          <a
                            href="https://johndoe.com"
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            johndoe.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                      <p className="mt-1">
                        Experienced UI/UX designer with a passion for creating intuitive and engaging user experiences.
                        Skilled in user research, wireframing, prototyping, and visual design.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "experience" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Add your work history and professional experience</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {/* Experience Item 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=AID" alt="DesignCo" />
                        <AvatarFallback className="rounded-md">D</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold">Senior UI/UX Designer</h3>
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <Building className="mr-1 h-4 w-4" /> DesignCo Inc.
                        </div>
                        <span className="hidden sm:inline mx-2">•</span>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" /> San Francisco, CA
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Calendar className="mr-1 h-4 w-4" /> Jan 2020 - Present
                      </div>
                      <p className="text-sm">
                        Led the UI/UX design team in creating user-centered designs for web and mobile applications.
                        Conducted user research, created wireframes and prototypes, and collaborated with developers to
                        implement designs.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Experience Item 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=AIC" alt="CreativeLabs" />
                        <AvatarFallback className="rounded-md">C</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold">UI Designer</h3>
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <Building className="mr-1 h-4 w-4" /> CreativeLabs
                        </div>
                        <span className="hidden sm:inline mx-2">•</span>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" /> New York, NY
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Calendar className="mr-1 h-4 w-4" /> Mar 2017 - Dec 2019
                      </div>
                      <p className="text-sm">
                        Designed user interfaces for web and mobile applications. Created wireframes, mockups, and
                        prototypes. Collaborated with product managers and developers to implement designs.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "education" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Add your educational background and qualifications</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {/* Education Item 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=AIS" alt="Stanford University" />
                        <AvatarFallback className="rounded-md">S</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold">Master of Fine Arts in Design</h3>
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <GraduationCap className="mr-1 h-4 w-4" /> Stanford University
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Calendar className="mr-1 h-4 w-4" /> 2015 - 2017
                      </div>
                      <p className="text-sm">
                        Specialized in User Experience Design with a focus on human-computer interaction and design
                        thinking methodologies.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Education Item 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src="/placeholder.svg?height=48&width=48&text=AIU" alt="UCLA" />
                        <AvatarFallback className="rounded-md">U</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold">Bachelor of Arts in Graphic Design</h3>
                        <div className="flex items-center gap-2 mt-1 sm:mt-0">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <GraduationCap className="mr-1 h-4 w-4" /> University of California, Los Angeles
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Calendar className="mr-1 h-4 w-4" /> 2011 - 2015
                      </div>
                      <p className="text-sm">
                        Studied visual communication, typography, and digital design. Graduated with honors and received
                        the Outstanding Design Student Award.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "skills" && (
            <Card>
              <CardHeader>
                <CardTitle>Skills & Resume</CardTitle>
                <CardDescription>Showcase your skills and upload your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>UI/UX Design</Badge>
                    <Badge>Figma</Badge>
                    <Badge>Adobe XD</Badge>
                    <Badge>Sketch</Badge>
                    <Badge>Prototyping</Badge>
                    <Badge>User Research</Badge>
                    <Badge>Wireframing</Badge>
                    <Badge>HTML/CSS</Badge>
                    <Badge>JavaScript</Badge>
                    <Badge>React</Badge>
                  </div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input placeholder="Add a skill" />
                      <Button>Add</Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-3 w-3" /> Edit Skills
                    </Button>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Languages</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>English</span>
                      </div>
                      <Badge variant="outline">Native</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Spanish</span>
                      </div>
                      <Badge variant="outline">Fluent</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>French</span>
                      </div>
                      <Badge variant="outline">Basic</Badge>
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-3">
                      <Plus className="mr-2 h-3 w-3" /> Add Language
                    </Button>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Resume/CV</h3>
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
                        <Upload className="mr-2 h-3 w-3" /> Replace
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>Set your job search preferences and notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Job Preferences</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-type">Job Type</Label>
                        <Select defaultValue="full-time">
                          <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location-preference">Location Preference</Label>
                        <Select defaultValue="remote">
                          <SelectTrigger id="location-preference">
                            <SelectValue placeholder="Select location preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="on-site">On-site</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary-expectation">Salary Expectation</Label>
                        <Select defaultValue="100k-130k">
                          <SelectTrigger id="salary-expectation">
                            <SelectValue placeholder="Select salary range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50k-80k">$50,000 - $80,000</SelectItem>
                            <SelectItem value="80k-100k">$80,000 - $100,000</SelectItem>
                            <SelectItem value="100k-130k">$100,000 - $130,000</SelectItem>
                            <SelectItem value="130k-160k">$130,000 - $160,000</SelectItem>
                            <SelectItem value="160k+">$160,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience-level">Experience Level</Label>
                        <Select defaultValue="senior">
                          <SelectTrigger id="experience-level">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="executive">Executive Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred-industries">Preferred Industries</Label>
                      <Textarea
                        id="preferred-industries"
                        placeholder="e.g. Technology, Healthcare, Finance"
                        defaultValue="Technology, Design, Media"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred-locations">Preferred Locations</Label>
                      <Textarea
                        id="preferred-locations"
                        placeholder="e.g. San Francisco, New York, Remote"
                        defaultValue="San Francisco, Seattle, Remote"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="job-alerts">Job Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications about new job postings</p>
                      </div>
                      <Switch id="job-alerts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="application-updates">Application Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your job applications
                        </p>
                      </div>
                      <Switch id="application-updates" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="profile-views">Profile Views</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when employers view your profile
                        </p>
                      </div>
                      <Switch id="profile-views" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">Receive our weekly newsletter and career tips</p>
                      </div>
                      <Switch id="newsletter" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </main>
  )
}
