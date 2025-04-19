"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </motion.div>
  )
}
