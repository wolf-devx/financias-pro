"use client"
import { Chart, ChartContainer, ChartPie, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// Sample data for the expense chart
const data = [
  { name: "Moradia", value: 1200, color: "#14b8a6" },
  { name: "Alimentação", value: 850, color: "#0ea5e9" },
  { name: "Transporte", value: 350, color: "#8b5cf6" },
  { name: "Entretenimento", value: 420, color: "#f59e0b" },
  { name: "Utilidades", value: 280, color: "#ec4899" },
  { name: "Compras", value: 425, color: "#f43f5e" },
  { name: "Saúde", value: 150, color: "#10b981" },
  { name: "Educação", value: 150, color: "#6366f1" },
]

export function ExpenseChart() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Carregando gráfico...</div>
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="w-full aspect-[4/3]">
      <ChartContainer>
        <Chart>
          <ChartPie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            cornerRadius={4}
            colors={data.map((item) => item.color)}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div
                    className={`rounded-lg border p-2 shadow-sm ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                      <span className={`font-medium ${isDark ? "text-white" : ""}`}>{data.name}</span>
                    </div>
                    <div className={`mt-1 font-bold ${isDark ? "text-white" : ""}`}>
                      R${data.value.toLocaleString()}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <ChartLegend layout="horizontal" verticalAlign="bottom" align="center" className="mt-8">
            {({ payload }) => {
              return (
                <div className="flex flex-wrap justify-center gap-4">
                  {payload?.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className={`text-sm ${isDark ? "text-gray-300" : ""}`}>{entry.value}</span>
                    </div>
                  ))}
                </div>
              )
            }}
          </ChartLegend>
        </Chart>
      </ChartContainer>
    </div>
  )
}
