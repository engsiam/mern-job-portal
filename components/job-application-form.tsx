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
import { toast } from "@/components/ui/use-toast"
import { FileUp, Loader2, Upload } from "lucide-react"

interface JobApplicationFormProps {
  jobId: string
  onSuccess: () => void
}

export default function JobApplicationForm({ jobId, onSuccess }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application submitted successfully",
        description: "We'll notify you when the employer responds.",
      })
      onSuccess()
    }, 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
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
            <Label htmlFor="resume">Resume/CV</Label>
            <div className="grid w-full gap-2">
              <Label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-32 rounded-md border border-dashed border-input bg-muted/20 px-6 py-4 text-center cursor-pointer hover:bg-muted/30 transition-colors"
              >
                {resumeFile ? (
                  <div className="flex flex-col items-center gap-1">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="font-medium">{resumeFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="font-medium">Upload your resume</p>
                    <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT (Max 5MB)</p>
                  </div>
                )}
              </Label>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Apply with</Label>
            <RadioGroup defaultValue="resume" className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resume" id="resume" />
                <Label htmlFor="resume" className="cursor-pointer">
                  Resume
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linkedin" id="linkedin" />
                <Label htmlFor="linkedin" className="cursor-pointer">
                  LinkedIn
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" required />
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
            <Label htmlFor="experience">Years of experience</Label>
            <RadioGroup defaultValue="1-3" className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0-1" id="0-1" />
                <Label htmlFor="0-1" className="cursor-pointer">
                  0-1 years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-3" id="1-3" />
                <Label htmlFor="1-3" className="cursor-pointer">
                  1-3 years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3-5" id="3-5" />
                <Label htmlFor="3-5" className="cursor-pointer">
                  3-5 years
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5+" id="5+" />
                <Label htmlFor="5+" className="cursor-pointer">
                  5+ years
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
            <Textarea
              id="cover-letter"
              placeholder="Tell us why you're a good fit for this position..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Information</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="available" />
                <label
                  htmlFor="available"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am available to start immediately
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="relocate" />
                <label
                  htmlFor="relocate"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am willing to relocate
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote" />
                <label
                  htmlFor="remote"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am open to remote work
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions and privacy policy
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </form>
  )
}
