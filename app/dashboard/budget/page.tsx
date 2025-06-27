"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit2, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample budget data
const initialBudgets = [
  {
    id: "b1",
    category: "Housing",
    budgetAmount: 1500,
    spentAmount: 1200,
  },
  {
    id: "b2",
    category: "Food",
    budgetAmount: 800,
    spentAmount: 850,
  },
  {
    id: "b3",
    category: "Transportation",
    budgetAmount: 500,
    spentAmount: 350,
  },
  {
    id: "b4",
    category: "Entertainment",
    budgetAmount: 400,
    spentAmount: 420,
  },
  {
    id: "b5",
    category: "Utilities",
    budgetAmount: 350,
    spentAmount: 280,
  },
  {
    id: "b6",
    category: "Shopping",
    budgetAmount: 450,
    spentAmount: 425,
  },
  {
    id: "b7",
    category: "Healthcare",
    budgetAmount: 300,
    spentAmount: 150,
  },
  {
    id: "b8",
    category: "Education",
    budgetAmount: 200,
    spentAmount: 150,
  },
]

export default function BudgetPage() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgetAmount: "",
  })
  const [editingBudget, setEditingBudget] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBudget((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewBudget((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddBudget = () => {
    const budget = {
      id: `b${budgets.length + 1}`,
      category: newBudget.category,
      budgetAmount: Number.parseFloat(newBudget.budgetAmount),
      spentAmount: 0,
    }

    setBudgets((prev) => [...prev, budget])
    setNewBudget({
      category: "",
      budgetAmount: "",
    })
    setShowAddBudget(false)
  }

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.round((spent / budget) * 100)
  }

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = getProgressPercentage(spent, budget)
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 80) return "bg-orange-500"
    return "bg-teal-500"
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0)
  const totalPercentage = getProgressPercentage(totalSpent, totalBudget)

  return (
    <div className="container p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Budget Planning</h1>
          <p className="text-gray-500">Manage your monthly budget allocations</p>
        </div>
        <Button onClick={() => setShowAddBudget(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Budget</CardTitle>
              <CardDescription>Your overall budget for this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">R${totalBudget.toLocaleString()}</span>
                <span className="text-xl font-medium">{totalPercentage}% used</span>
              </div>
              <div className="h-4 w-full rounded-full bg-gray-100">
                <div
                  className={cn("h-full rounded-full", totalPercentage >= 100 ? "bg-red-500" : "bg-teal-500")}
                  style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>R${totalSpent.toLocaleString()} spent</span>
                <span>R${(totalBudget - totalSpent).toLocaleString()} remaining</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => {
              const percentage = getProgressPercentage(budget.spentAmount, budget.budgetAmount)
              const colorClass = getProgressColor(budget.spentAmount, budget.budgetAmount)

              return (
                <Card key={budget.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        R${budget.spentAmount.toLocaleString()} / R${budget.budgetAmount.toLocaleString()}
                      </span>
                      <span className={cn(percentage >= 100 ? "text-red-600" : "text-teal-600")}>{percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className={cn("h-full rounded-full", colorClass)}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      {budget.spentAmount > budget.budgetAmount ? (
                        <span className="text-red-500">
                          Over budget by R${(budget.spentAmount - budget.budgetAmount).toLocaleString()}
                        </span>
                      ) : (
                        <span>R${(budget.budgetAmount - budget.spentAmount).toLocaleString()} remaining</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Manage your budget categories and allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.map((budget) => {
                  const percentage = getProgressPercentage(budget.spentAmount, budget.budgetAmount)
                  const colorClass = getProgressColor(budget.spentAmount, budget.budgetAmount)

                  return (
                    <div key={budget.id} className="flex items-center space-x-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{budget.category}</span>
                          <span className="text-sm">
                            R${budget.spentAmount.toLocaleString()} / R${budget.budgetAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div
                            className={cn("h-full rounded-full", colorClass)}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setShowAddBudget(true)} className="w-full bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Budget Category
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddBudget} onOpenChange={setShowAddBudget}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Budget Category</DialogTitle>
            <DialogDescription>Create a new budget category and set your monthly limit.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newBudget.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budgetAmount">Monthly Budget (R$)</Label>
              <Input
                id="budgetAmount"
                name="budgetAmount"
                type="number"
                min="0"
                value={newBudget.budgetAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddBudget(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddBudget} className="bg-teal-600 hover:bg-teal-700">
              Add Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
