"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  requiredRole?: "job-seeker" | "employer" | null
}

export default function AuthLayout({ children, requiredRole = null }: AuthLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading } = useStore()

  useEffect(() => {
    // Skip auth check for public routes
    if (
      pathname === "/" ||
      pathname.startsWith("/jobs") ||
      pathname.startsWith("/companies") ||
      pathname.startsWith("/resources")
    ) {
      return
    }

    // Skip auth check for auth routes
    if (pathname.startsWith("/auth/")) {
      if (isAuthenticated) {
        // Redirect to appropriate dashboard if already logged in
        if (user?.role === "employer") {
          router.push("/dashboard/employer")
        } else {
          router.push("/dashboard")
        }
      }
      return
    }

    // Handle protected routes
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
      return
    }

    // Handle role-specific routes
    if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      if (user?.role === "employer") {
        router.push("/dashboard/employer")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isLoading, pathname, requiredRole, router, user?.role])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
