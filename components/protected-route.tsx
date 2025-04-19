"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Loader2 } from "lucide-react"
import type { UserRole } from "@/lib/store/userSlice"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, user } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    // Check if user has the required role
    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      if (user.role === "employer") {
        router.push("/dashboard/employer")
      } else {
        router.push("/dashboard")
      }
      return
    }

    setIsLoading(false)
  }, [isAuthenticated, user, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
