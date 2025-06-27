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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Edit2, Plus, Target, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample goals data
const initialGoals = [
  {
    id: "g1",
    name: "Emergency Fund",
    targetAmount: 20000,
    currentAmount: 15000,
    targetDate: new Date("2024-12-31"),
    category: "savings",
    color: "teal",
  },
  {
    id: "g2",
    name: "Vacation",
    targetAmount: 5000,
    currentAmount: 2000,
    targetDate: new Date("2024-10-15"),
    category: "travel",
    color: "blue",
  },
  {
    id: "g3",
    name: "New Laptop",
    targetAmount: 5000,
    currentAmount: 3000,
    targetDate: new Date("2024-09-30"),
    category: "electronics",
    color: "purple",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: new Date(),
    category: "",
    color: "teal",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewGoal((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewGoal((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddGoal = () => {
    const goal = {
      id: `g${goals.length + 1}`,
      name: newGoal.name,
      targetAmount: Number.parseFloat(newGoal.targetAmount),
      currentAmount: Number.parseFloat(newGoal.currentAmount || "0"),
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      color: newGoal.color,
    }

    setGoals((prev) => [...prev, goal])
    setNewGoal({
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: new Date(),
      category: "",
      color: "teal",
    })
    setShowAddGoal(false)
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "teal":
        return "bg-teal-500"
      case "blue":
        return "bg-blue-500"
      case "purple":
        return "bg-purple-500"
      case "green":
        return "bg-green-500"
      case "red":
        return "bg-red-500"
      case "orange":
        return "bg-orange-500"
      default:
        return "bg-teal-500"
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Financial Goals</h1>
          <p className="text-gray-500">Track and manage your savings goals</p>
        </div>
        <Button onClick={() => setShowAddGoal(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount)
          const colorClass = getColorClass(goal.color)

          return (
            <Card key={goal.id} className="overflow-hidden">
              <div className={cn("h-2", colorClass)} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{goal.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Target date: {format(goal.targetDate, "PPP")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Current</div>
                    <div className="text-xl font-bold">R${goal.currentAmount.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Target</div>
                    <div className="text-xl font-bold">R${goal.targetAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      R${(goal.targetAmount - goal.currentAmount).toLocaleString()} to go
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Progress
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>Create a new financial goal to track your progress.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                name="name"
                value={newGoal.name}
                onChange={handleInputChange}
                placeholder="e.g., New Car, Vacation, etc."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="targetAmount">Target Amount (R$)</Label>
              <Input
                id="targetAmount"
                name="targetAmount"
                type="number"
                min="0"
                value={newGoal.targetAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currentAmount">Current Amount (R$)</Label>
              <Input
                id="currentAmount"
                name="currentAmount"
                type="number"
                min="0"
                value={newGoal.currentAmount}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newGoal.targetDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newGoal.targetDate ? format(newGoal.targetDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newGoal.targetDate}
                    onSelect={(date) => date && setNewGoal((prev) => ({ ...prev, targetDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newGoal.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Select value={newGoal.color} onValueChange={(value) => handleSelectChange("color", value)}>
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teal">Teal</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddGoal(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddGoal} className="bg-teal-600 hover:bg-teal-700">
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
