"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Globe,
  Lock,
  LogOut,
  Moon,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  User,
} from "lucide-react"
import { useTheme } from "next-themes"
import PageHeader from "@/components/page-header"

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "We've sent you an email to confirm your account deletion.",
      variant: "destructive",
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader title="Settings" description="Manage your account settings and preferences" />

      <Tabs defaultValue="account" className="mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-64"
          >
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger
                value="account"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <User className="mr-2 h-4 w-4" /> Account
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Moon className="mr-2 h-4 w-4" /> Appearance
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Lock className="mr-2 h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <CreditCard className="mr-2 h-4 w-4" /> Billing
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <TabsContent value="account" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="johndoe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="pst">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                            <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                            <SelectItem value="cst">Central Time (CST)</SelectItem>
                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                            <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Danger Zone</h3>
                    <div className="rounded-lg border border-destructive/20 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-destructive">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all of your data
                          </p>
                        </div>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the appearance of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {mounted && (
                        <>
                          <div
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer hover:border-primary ${
                              theme === "light" ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => setTheme("light")}
                          >
                            <div className="h-20 w-20 rounded-full bg-white border shadow-sm flex items-center justify-center mb-2">
                              <Sun className="h-10 w-10 text-amber-500" />
                            </div>
                            <span className="font-medium">Light</span>
                          </div>
                          <div
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer hover:border-primary ${
                              theme === "dark" ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => setTheme("dark")}
                          >
                            <div className="h-20 w-20 rounded-full bg-gray-900 border shadow-sm flex items-center justify-center mb-2">
                              <Moon className="h-10 w-10 text-blue-400" />
                            </div>
                            <span className="font-medium">Dark</span>
                          </div>
                          <div
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer hover:border-primary ${
                              theme === "system" ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => setTheme("system")}
                          >
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-white to-gray-900 border shadow-sm flex items-center justify-center mb-2">
                              <Globe className="h-10 w-10 text-primary" />
                            </div>
                            <span className="font-medium">System</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accessibility</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reduce-motion">Reduce Motion</Label>
                          <p className="text-sm text-muted-foreground">
                            Reduce the amount of animations in the interface
                          </p>
                        </div>
                        <Switch id="reduce-motion" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-contrast">High Contrast</Label>
                          <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        <Switch id="high-contrast" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="job-alerts">Job Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about new job postings
                          </p>
                        </div>
                        <Switch id="job-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="application-updates">Application Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about your job applications
                          </p>
                        </div>
                        <Switch id="application-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="profile-views">Profile Views</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications when employers view your profile
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

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-job-alerts">Job Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about new job postings
                          </p>
                        </div>
                        <Switch id="push-job-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-application-updates">Application Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about your job applications
                          </p>
                        </div>
                        <Switch id="push-application-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-messages">Messages</Label>
                          <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                        </div>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Frequency</h3>
                    <div className="space-y-2">
                      <Label htmlFor="notification-frequency">Email Digest Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="notification-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input id="new-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Shield className="h-10 w-10 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account by requiring a verification code in
                              addition to your password.
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login Sessions</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <Smartphone className="h-10 w-10 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">Current Session</h4>
                              <p className="text-sm text-muted-foreground">
                                Chrome on macOS • San Francisco, CA • Active now
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          >
                            Current
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <Smartphone className="h-10 w-10 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">iPhone 13</h4>
                              <p className="text-sm text-muted-foreground">
                                Safari on iOS • New York, NY • Last active 2 days ago
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" /> Log Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Settings</CardTitle>
                  <CardDescription>Manage your billing information and subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="font-medium">Free Plan</h4>
                          <p className="text-sm text-muted-foreground">Basic features for job seekers</p>
                        </div>
                        <Button>Upgrade Plan</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <CreditCard className="h-10 w-10 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">No payment method added</h4>
                            <p className="text-sm text-muted-foreground">Add a payment method to upgrade your plan</p>
                          </div>
                        </div>
                        <Button variant="outline">Add Payment Method</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <div className="rounded-lg border p-4 text-center">
                      <p className="text-muted-foreground">No billing history available</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </div>
      </Tabs>
    </main>
  )
}
