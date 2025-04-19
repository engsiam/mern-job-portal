"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Newsletter subscription successful",
      description: "Thank you for subscribing to our newsletter!",
    })
    // Reset the form
    e.currentTarget.reset()
  }

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-bold text-xl">JobPortal</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Find your dream job or the perfect candidate with our AI-powered job matching platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dashboard/employer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/post-job"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/employers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest job listings and career advice delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none"
                  required
                  aria-label="Email address"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
