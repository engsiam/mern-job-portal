"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"
import Link from "next/link"

export default function FeaturedCompanies() {
  // Mock data for featured companies
  const companies = [
    {
      id: "1",
      name: "Acme Inc",
      industry: "Technology",
      jobCount: 12,
      logo: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "A",
    },
    {
      id: "2",
      name: "Globex",
      industry: "Finance",
      jobCount: 8,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "G",
    },
    {
      id: "3",
      name: "Initech",
      industry: "Software",
      jobCount: 15,
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "I",
    },
    {
      id: "4",
      name: "Umbrella",
      industry: "Healthcare",
      jobCount: 6,
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&q=80&crop=entropy&cs=tinysrgb&fit=crop",
      fallback: "U",
    },
  ]

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Featured Companies</h2>
          <p className="text-muted-foreground">Discover top employers hiring now</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          View All Companies
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                    <AvatarFallback>{company.fallback}</AvatarFallback>
                  </Avatar>

                  <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{company.industry}</p>

                  <Badge variant="secondary" className="mb-4">
                    <Briefcase className="mr-1 h-3 w-3" /> {company.jobCount} open positions
                  </Badge>

                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/companies/${company.id}`}>View Jobs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
