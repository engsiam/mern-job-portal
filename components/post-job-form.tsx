"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useStore } from "@/lib/store"

interface PostJobFormProps {
  onSuccess: () => void
}

export default function PostJobForm({ onSuccess }: PostJobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const { postJob } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement)
      const jobData = {
        title: formData.get("job-title") as string,
        type: formData.get("job-type") as string,
        experience: formData.get("experience-level") as string,
        location: formData.get("location") as string,
        salary: formData.get("salary-range") as string,
        workType: formData.get("work-type") as string,
        shortDescription: formData.get("short-description") as string,
        description: formData.get("full-description") as string,
        responsibilities: (formData.get("responsibilities") as string).split("\n"),
        requirements: (formData.get("requirements") as string).split("\n"),
        benefits: (formData.get("benefits") as string).split("\n"),
        isFeatured: formData.get("featured") === "on",
        isRecent: true,
        postedDate: new Date().toISOString().split("T")[0],
      }

      // Post job using Zustand store
      await postJob(jobData)

      setIsSubmitting(false)
      onSuccess()
    } catch (error) {
      console.error("Error posting job:", error)
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input id="job-title" name="job-title" placeholder="e.g. Senior Frontend Developer" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-type">Job Type</Label>
              <Select defaultValue="full-time" name="job-type">
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
              <Label htmlFor="experience-level">Experience Level</Label>
              <Select defaultValue="mid" name="experience-level">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g. San Francisco, CA" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary-range">Salary Range</Label>
              <Input id="salary-range" name="salary-range" placeholder="e.g. $80,000 - $120,000" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Work Type</Label>
            <RadioGroup defaultValue="on-site" name="work-type" className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on-site" id="on-site" />
                <Label htmlFor="on-site" className="cursor-pointer">
                  On-site
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="cursor-pointer">
                  Hybrid
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote" className="cursor-pointer">
                  Remote
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="short-description">Short Description</Label>
              <span className="text-xs text-muted-foreground">Max 200 characters</span>
            </div>
            <Textarea
              id="short-description"
              name="short-description"
              placeholder="Brief overview of the position..."
              maxLength={200}
              required
            />
          </div>

          <Button type="button" className="w-full" onClick={() => setStep(2)}>
            Continue
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="full-description">Full Job Description</Label>
            <Textarea
              id="full-description"
              name="full-description"
              placeholder="Detailed description of the role, responsibilities, and requirements..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Key Responsibilities</Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="List the main responsibilities for this role..."
              className="min-h-[120px]"
              required
            />
            <p className="text-xs text-muted-foreground">Tip: Use bullet points for better readability</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="List the skills, qualifications, and experience required..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea
              id="benefits"
              name="benefits"
              placeholder="List the benefits and perks offered with this position..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Job Visibility Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" name="featured" />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Feature this job (additional fee applies)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="urgent" name="urgent" />
                <label
                  htmlFor="urgent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as urgent hiring
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="company-name" name="company-name" defaultChecked />
                <label
                  htmlFor="company-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Display company name
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting Job...
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </form>
  )
}
