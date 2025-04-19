"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Linkedin, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { useStore } from "@/lib/store"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "login"

  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState<"job-seeker" | "employer">("job-seeker")

  const { login, signup, isAuthenticated, user } = useStore()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "employer") {
        router.push("/dashboard/employer")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      await login(email, password)

      toast({
        title: "Login successful",
        description: "Welcome back to JobPortal!",
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const firstName = formData.get("first-name") as string
      const lastName = formData.get("last-name") as string
      const email = formData.get("signup-email") as string
      const password = formData.get("signup-password") as string

      await signup(`${firstName} ${lastName}`, email, password, accountType)

      toast({
        title: "Account created successfully",
        description: "Welcome to JobPortal!",
      })
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome to JobPortal</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800">
                <TabsTrigger value="login" className="data-[state=active]:bg-gray-700">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-gray-700">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-300">
                        Password
                      </Label>
                      <Link href="/auth/reset-password" className="text-xs text-blue-400 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      name="remember"
                      className="border-slate-700 data-[state=checked]:bg-blue-600"
                    />
                    <label htmlFor="remember" className="text-sm font-medium leading-none text-slate-300">
                      Remember me
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-slate-300">
                        First name
                      </Label>
                      <Input
                        id="first-name"
                        name="first-name"
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-slate-300">
                        Last name
                      </Label>
                      <Input
                        id="last-name"
                        name="last-name"
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">I am a</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={accountType === "job-seeker" ? "default" : "outline"}
                        className={
                          accountType === "job-seeker"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        }
                        onClick={() => setAccountType("job-seeker")}
                      >
                        Job Seeker
                      </Button>
                      <Button
                        type="button"
                        variant={accountType === "employer" ? "default" : "outline"}
                        className={
                          accountType === "employer"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        }
                        onClick={() => setAccountType("employer")}
                      >
                        Employer
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      name="terms"
                      required
                      className="border-slate-700 data-[state=checked]:bg-blue-600"
                    />
                    <label htmlFor="terms" className="text-sm font-medium leading-none text-slate-300">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-400 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-400 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
