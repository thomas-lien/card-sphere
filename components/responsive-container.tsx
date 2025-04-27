import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export default function ResponsiveContainer({ children, className, fullWidth = false }: ResponsiveContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 md:px-6", fullWidth ? "max-w-[1800px]" : "max-w-[1600px]", className)}>
      {children}
    </div>
  )
}