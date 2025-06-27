"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import {
  ComposedChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Pie,
  Bar,
  Line,
} from "recharts"

// Export the recharts components
export const Chart = ComposedChart
export const ChartPie = Pie
export const ChartBar = Bar
export const ChartLine = Line
export const ChartContainer = ResponsiveContainer
export const ChartTooltip = RechartsTooltip
export const ChartLegend = RechartsLegend

interface ChartTooltipContentProps {
  className?: string
  content?: React.ReactNode
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChartTooltipContentProps
>(({ className, content, ...props }, ref) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div ref={ref} className={className} {...props}>
            {content}
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { content?: React.ReactNode }
>(({ className, content, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {content}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartTooltipContent, ChartLegendContent }
