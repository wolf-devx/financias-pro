"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartContainer, ChartBar, ChartLine, ChartPie, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import { Download, FileText } from "lucide-react"

// Sample data for charts
const monthlyData = [
  { month: "Jan", income: 3800, expenses: 3200 },
  { month: "Feb", income: 4200, expenses: 3500 },
  { month: "Mar", income: 3900, expenses: 3300 },
  { month: "Apr", income: 4100, expenses: 3600 },
  { month: "May", income: 4500, expenses: 3800 },
  { month: "Jun", income: 4300, expenses: 3700 },
  { month: "Jul", income: 6250, expenses: 3850 },
]

const categoryData = [
  { name: "Housing", value: 1200, color: "#14b8a6" },
  { name: "Food", value: 850, color: "#0ea5e9" },
  { name: "Transportation", value: 350, color: "#8b5cf6" },
  { name: "Entertainment", value: 420, color: "#f59e0b" },
  { name: "Utilities", value: 280, color: "#ec4899" },
  { name: "Shopping", value: 425, color: "#f43f5e" },
  { name: "Healthcare", value: 150, color: "#10b981" },
  { name: "Education", value: 150, color: "#6366f1" },
]

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState("Jul")
  const [selectedYear, setSelectedYear] = useState("2024")

  return (
    <div className="container p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-gray-500">Analyze your financial data and trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jan">January</SelectItem>
                <SelectItem value="Feb">February</SelectItem>
                <SelectItem value="Mar">March</SelectItem>
                <SelectItem value="Apr">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="Jun">June</SelectItem>
                <SelectItem value="Jul">July</SelectItem>
                <SelectItem value="Aug">August</SelectItem>
                <SelectItem value="Sep">September</SelectItem>
                <SelectItem value="Oct">October</SelectItem>
                <SelectItem value="Nov">November</SelectItem>
                <SelectItem value="Dec">December</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$6,250.00</div>
                <p className="text-xs text-green-500">+45.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$3,850.75</div>
                <p className="text-xs text-red-500">+4.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$2,399.25</div>
                <p className="text-xs text-green-500">+38.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38.4%</div>
                <p className="text-xs text-green-500">+12.7% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly comparison for 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ChartBar data={monthlyData} dataKey="month" barSize={30} barGap={8}>
                        <ChartBar name="Income" dataKey="income" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                        <ChartBar name="Expenses" dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Income</span>
                                      <span className="font-bold text-green-600">R${payload[0].value}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Expenses</span>
                                      <span className="font-bold text-red-600">R${payload[1].value}</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <ChartLegend />
                      </ChartBar>
                    </Chart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                  By category for {selectedMonth} {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ChartPie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={2}
                        cornerRadius={4}
                        colors={categoryData.map((item) => item.color)}
                      >
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">{data.name}</span>
                                    <span className="font-bold" style={{ color: data.color }}>
                                      R${data.value}
                                    </span>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <ChartLegend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          iconType="circle"
                          iconSize={10}
                        />
                      </ChartPie>
                    </Chart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Savings Trend</CardTitle>
              <CardDescription>Net savings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <Chart>
                    <ChartLine
                      data={monthlyData.map((item) => ({
                        month: item.month,
                        savings: item.income - item.expenses,
                      }))}
                      dataKey="month"
                    >
                      <ChartLine
                        name="Savings"
                        dataKey="savings"
                        stroke="#14b8a6"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#14b8a6" }}
                        activeDot={{ r: 6, fill: "#14b8a6" }}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Savings</span>
                                  <span className="font-bold text-teal-600">R${payload[0].value}</span>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </ChartLine>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Income by Source</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Salary</div>
                          <div className="text-sm text-gray-500">Primary employment</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">R$3,500.00</div>
                          <div className="text-sm text-gray-500">56%</div>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[56%] rounded-full bg-teal-500" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Freelance</div>
                          <div className="text-sm text-gray-500">Contract work</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">R$2,000.00</div>
                          <div className="text-sm text-gray-500">32%</div>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[32%] rounded-full bg-blue-500" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Investments</div>
                          <div className="text-sm text-gray-500">Dividends & interest</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">R$750.00</div>
                          <div className="text-sm text-gray-500">12%</div>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[12%] rounded-full bg-purple-500" />
                      </div>
                    </div>
                  </div>

                  <div className="h-64">
                    <ChartContainer>
                      <Chart>
                        <ChartPie
                          data={[
                            { name: "Salary", value: 3500, color: "#14b8a6" },
                            { name: "Freelance", value: 2000, color: "#0ea5e9" },
                            { name: "Investments", value: 750, color: "#8b5cf6" },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          colors={["#14b8a6", "#0ea5e9", "#8b5cf6"]}
                        >
                          <ChartTooltip />
                          <ChartLegend />
                        </ChartPie>
                      </Chart>
                    </ChartContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Income History</h3>
                  <div className="h-64">
                    <ChartContainer>
                      <Chart>
                        <ChartBar data={monthlyData} dataKey="month" barSize={40}>
                          <ChartBar name="Income" dataKey="income" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                          <ChartTooltip />
                        </ChartBar>
                      </Chart>
                    </ChartContainer>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Generate Income Report</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-64">
                    <ChartContainer>
                      <Chart>
                        <ChartPie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          colors={categoryData.map((item) => item.color)}
                        >
                          <ChartTooltip />
                          <ChartLegend />
                        </ChartPie>
                      </Chart>
                    </ChartContainer>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Top Expense Categories</h3>
                    <div className="space-y-4">
                      {categoryData.slice(0, 5).map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                            <span>{category.name}</span>
                          </div>
                          <div className="font-medium">R${category.value.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Monthly Expense Trend</h3>
                  <div className="h-64">
                    <ChartContainer>
                      <Chart>
                        <ChartLine data={monthlyData} dataKey="month">
                          <ChartLine
                            name="Expenses"
                            dataKey="expenses"
                            stroke="#f43f5e"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#f43f5e" }}
                            activeDot={{ r: 6, fill: "#f43f5e" }}
                          />
                          <ChartTooltip />
                        </ChartLine>
                      </Chart>
                    </ChartContainer>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Generate Expense Report</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Financial Comparison</CardTitle>
              <CardDescription>Compare your finances across different periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Month-to-Month Comparison</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Income</span>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span>R$6,250.00</span>
                            <span className="text-sm text-green-500">+45.3%</span>
                          </div>
                          <div className="text-sm text-gray-500">vs. R$4,300.00 last month</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Expenses</span>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span>R$3,850.75</span>
                            <span className="text-sm text-red-500">+4.1%</span>
                          </div>
                          <div className="text-sm text-gray-500">vs. R$3,700.00 last month</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Savings</span>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span>R$2,399.25</span>
                            <span className="text-sm text-green-500">+299.9%</span>
                          </div>
                          <div className="text-sm text-gray-500">vs. R$600.00 last month</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Savings Rate</span>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span>38.4%</span>
                            <span className="text-sm text-green-500">+24.7%</span>
                          </div>
                          <div className="text-sm text-gray-500">vs. 13.7% last month</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Year-to-Date Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Income</span>
                        <span className="font-bold">R$31,050.00</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Expenses</span>
                        <span className="font-bold">R$24,950.00</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Net Savings</span>
                        <span className="font-bold">R$6,100.00</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Average Monthly Savings</span>
                        <span className="font-bold">R$871.43</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Average Savings Rate</span>
                        <span className="font-bold">19.6%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Category Comparison (vs. Previous Month)</h3>
                  <div className="h-80">
                    <ChartContainer>
                      <Chart>
                        <ChartBar
                          data={[
                            { category: "Housing", current: 1200, previous: 1200 },
                            { category: "Food", current: 850, previous: 800 },
                            { category: "Transport", current: 350, previous: 400 },
                            { category: "Entertain", current: 420, previous: 350 },
                            { category: "Utilities", current: 280, previous: 300 },
                            { category: "Shopping", current: 425, previous: 350 },
                            { category: "Healthcare", current: 150, previous: 100 },
                            { category: "Education", current: 150, previous: 200 },
                          ]}
                          dataKey="category"
                          barSize={30}
                          barGap={8}
                        >
                          <ChartBar name="Current Month" dataKey="current" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                          <ChartBar name="Previous Month" dataKey="previous" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                          <ChartTooltip />
                          <ChartLegend />
                        </ChartBar>
                      </Chart>
                    </ChartContainer>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Monthly Comparison Report</span>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
