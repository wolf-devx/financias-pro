"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface AddTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTransactionDialog({ open, onOpenChange }: AddTransactionDialogProps) {
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense")
  const [date, setDate] = useState<Date>(new Date())
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    account: "checking",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Process the form data
    const transaction = {
      ...formData,
      amount: transactionType === "expense" ? -Number.parseFloat(formData.amount) : Number.parseFloat(formData.amount),
      date: date.toISOString().split("T")[0],
    }

    console.log("Nova transação:", transaction)

    // Reset form and close dialog
    setFormData({
      description: "",
      amount: "",
      category: "",
      account: "checking",
    })
    setTransactionType("expense")
    setDate(new Date())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] dark:border-gray-800 dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Adicionar Transação</DialogTitle>
          <DialogDescription className="dark:text-gray-400">Registre uma nova receita ou despesa.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <RadioGroup
              value={transactionType}
              onValueChange={(value) => setTransactionType(value as "expense" | "income")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="expense" id="expense" className="peer sr-only" />
                <Label
                  htmlFor="expense"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 [&:has([data-state=checked])]:border-red-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="dark:text-white">Despesa</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="income" id="income" className="peer sr-only" />
                <Label
                  htmlFor="income"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 [&:has([data-state=checked])]:border-green-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="dark:text-white">Receita</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="grid gap-2">
              <Label htmlFor="description" className="dark:text-gray-300">
                Descrição
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Para que foi esta transação?"
                required
                className="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount" className="dark:text-gray-300">
                Valor (R$)
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0,00"
                required
                className="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date" className="dark:text-gray-300">
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal dark:border-gray-700 dark:bg-gray-800 dark:text-white",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:border-gray-700 dark:bg-gray-800">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                    locale={ptBR}
                    className="dark:bg-gray-800"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category" className="dark:text-gray-300">
                Categoria
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category" className="dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="dark:border-gray-700 dark:bg-gray-800">
                  {transactionType === "expense" ? (
                    <>
                      <SelectItem value="housing">Moradia</SelectItem>
                      <SelectItem value="food">Alimentação</SelectItem>
                      <SelectItem value="transportation">Transporte</SelectItem>
                      <SelectItem value="entertainment">Entretenimento</SelectItem>
                      <SelectItem value="utilities">Utilidades</SelectItem>
                      <SelectItem value="shopping">Compras</SelectItem>
                      <SelectItem value="healthcare">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="salary">Salário</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="investments">Investimentos</SelectItem>
                      <SelectItem value="gifts">Presentes</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="account" className="dark:text-gray-300">
                Conta
              </Label>
              <Select value={formData.account} onValueChange={(value) => handleSelectChange("account", value)}>
                <SelectTrigger id="account" className="dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <SelectValue placeholder="Selecione uma conta" />
                </SelectTrigger>
                <SelectContent className="dark:border-gray-700 dark:bg-gray-800">
                  <SelectItem value="checking">Conta Corrente</SelectItem>
                  <SelectItem value="savings">Conta Poupança</SelectItem>
                  <SelectItem value="credit">Cartão de Crédito</SelectItem>
                  <SelectItem value="cash">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={cn(
                transactionType === "expense"
                  ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700",
              )}
            >
              Salvar Transação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
