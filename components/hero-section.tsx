"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find Your Dream Job Today
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover thousands of job opportunities with all the information you need. Your future career starts here.
          </motion.p>

          <motion.div
            className="bg-background rounded-lg shadow-lg p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Job title, keywords, or company" className="pl-10" />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                </SelectContent>
              </Select>

              <Button className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search Jobs
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-muted-foreground">Popular:</span>
              <Link href="#" className="text-sm text-primary hover:underline">
                Remote
              </Link>
              <Link href="#" className="text-sm text-primary hover:underline">
                Full-time
              </Link>
              <Link href="#" className="text-sm text-primary hover:underline">
                Software Engineer
              </Link>
              <Link href="#" className="text-sm text-primary hover:underline">
                Marketing
              </Link>
              <Link href="#" className="text-sm text-primary hover:underline">
                Design
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-3">Trusted by over 10,000+ companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="relative h-8 w-24">
              <Image
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=96&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                alt="Google"
                fill
                className="object-contain opacity-70"
              />
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=96&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                alt="Microsoft"
                fill
                className="object-contain opacity-70"
              />
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=96&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                alt="Amazon"
                fill
                className="object-contain opacity-70"
              />
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="https://images.unsplash.com/photo-1611162618479-ee4a1f8d5be3?w=96&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                alt="Apple"
                fill
                className="object-contain opacity-70"
              />
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="https://images.unsplash.com/photo-1611162616475-b1a91bd5c39b?w=96&h=32&q=80&crop=entropy&cs=tinysrgb&fit=crop"
                alt="Facebook"
                fill
                className="object-contain opacity-70"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
