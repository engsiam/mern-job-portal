"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Briefcase, Menu, Search, User, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { jobListings } from "@/lib/data"
import { useStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/resources", label: "Resources" },
  ]

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
      setSearchQuery("")
    }
  }

  // Filter jobs based on search query
  const filteredJobs = searchQuery
    ? jobListings
        .filter(
          (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5)
    : []

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-background",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6">
            <Briefcase className="h-6 w-6 mr-2" />
            <span className="font-bold text-xl">JobPortal</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              // Special handling for Companies link to match both /companies and /companies/[id]
              if (link.href === "/companies") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === "/companies" || pathname.startsWith("/companies/")
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                )
              }

              // Regular links
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative w-60">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(e.target.value.length > 0)
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                onBlur={() => {
                  // Delay hiding results to allow for clicking
                  setTimeout(() => setShowSearchResults(false), 200)
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    setSearchQuery("")
                    setShowSearchResults(false)
                  }}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </form>

            {/* Search results dropdown */}
            {showSearchResults && filteredJobs.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-auto">
                <div className="p-2">
                  <p className="text-xs text-muted-foreground mb-2">Search Results</p>
                  {filteredJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block p-2 hover:bg-muted rounded-md"
                      onClick={() => setShowSearchResults(false)}
                    >
                      <div className="font-medium text-sm">{job.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <span>{job.company}</span>
                        <span className="mx-1">•</span>
                        <span>{job.location}</span>
                      </div>
                    </Link>
                  ))}
                  <div className="mt-2 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-primary"
                      onClick={() => {
                        router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`)
                        setShowSearchResults(false)
                      }}
                    >
                      View all results
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {showSearchResults && filteredJobs.length === 0 && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50">
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-primary"
                    onClick={() => {
                      router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`)
                      setShowSearchResults(false)
                    }}
                  >
                    View all jobs
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ModeToggle />

          <AnimatePresence mode="wait">
            {isAuthenticated ? (
              <motion.div
                key="logged-in"
                className="flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/employer">Employer Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout()
                        router.push("/")
                        toast({
                          title: "Logged out successfully",
                          description: "You have been logged out of your account.",
                        })
                      }}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ) : (
              <motion.div
                key="logged-out"
                className="flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/login?tab=signup">Sign up</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <Briefcase className="h-6 w-6 mr-2" />
                    <span className="font-bold text-xl">JobPortal</span>
                  </Link>
                  <ModeToggle />
                </div>

                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </form>

                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="grid gap-2">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                            alt="User"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard">
                          <User className="mr-2 h-4 w-4" /> Dashboard
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          logout()
                          router.push("/")
                          toast({
                            title: "Logged out successfully",
                            description: "You have been logged out of your account.",
                          })
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/auth/login">Log in</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/auth/login?tab=signup">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
