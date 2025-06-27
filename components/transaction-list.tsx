"use client"

import { useState } from "react"
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Coffee,
  Home,
  ShoppingBag,
  Utensils,
  Car,
  Film,
  Wifi,
  Smartphone,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample transaction data
const transactions = [
  {
    id: "t1",
    date: "2025-07-15",
    description: "Pagamento de Aluguel",
    amount: -1200,
    category: "Moradia",
    icon: Home,
  },
  {
    id: "t2",
    date: "2025-07-14",
    description: "Depósito de Salário",
    amount: 3500,
    category: "Receita",
    icon: Briefcase,
  },
  {
    id: "t3",
    date: "2025-07-13",
    description: "Supermercado",
    amount: -156.75,
    category: "Alimentação",
    icon: ShoppingBag,
  },
  {
    id: "t4",
    date: "2025-07-12",
    description: "Restaurante",
    amount: -85.5,
    category: "Alimentação",
    icon: Utensils,
  },
  {
    id: "t5",
    date: "2025-07-11",
    description: "Posto de Gasolina",
    amount: -120,
    category: "Transporte",
    icon: Car,
  },
  {
    id: "t6",
    date: "2025-07-10",
    description: "Ingressos de Cinema",
    amount: -45,
    category: "Entretenimento",
    icon: Film,
  },
  {
    id: "t7",
    date: "2025-07-09",
    description: "Conta de Internet",
    amount: -89.9,
    category: "Utilidades",
    icon: Wifi,
  },
  {
    id: "t8",
    date: "2025-07-08",
    description: "Cafeteria",
    amount: -12.5,
    category: "Alimentação",
    icon: Coffee,
  },
  {
    id: "t9",
    date: "2025-07-07",
    description: "Conta de Celular",
    amount: -65.9,
    category: "Utilidades",
    icon: Smartphone,
  },
  {
    id: "t10",
    date: "2025-07-06",
    description: "Pagamento Freelance",
    amount: 750,
    category: "Receita",
    icon: Briefcase,
  },
]

interface TransactionListProps {
  limit?: number
}

export function TransactionList({ limit }: TransactionListProps) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filter === "income") return transaction.amount > 0
      if (filter === "expense") return transaction.amount < 0
      return true
    })
    .slice(0, limit || transactions.length)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700" : ""}
        >
          Todos
        </Button>
        <Button
          variant={filter === "income" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("income")}
          className={
            filter === "income" ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" : ""
          }
        >
          Receitas
        </Button>
        <Button
          variant={filter === "expense" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("expense")}
          className={filter === "expense" ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700" : ""}
        >
          Despesas
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => {
            const isIncome = transaction.amount > 0
            const Icon = transaction.icon

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      isIncome ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isIncome ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400",
                      )}
                    />
                  </div>
                  <div>
                    <div className="font-medium dark:text-white">{transaction.description}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(transaction.date).toLocaleDateString("pt-BR")}</span>
                      <Badge variant="outline" className="rounded-sm dark:border-gray-700">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2 font-medium",
                    isIncome ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {isIncome ? <ArrowUpCircle className="h-4 w-4" /> : <ArrowDownCircle className="h-4 w-4" />}
                  <span>
                    {isIncome ? "+" : ""}
                    R$
                    {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed dark:border-gray-800">
            <p className="text-center text-gray-500 dark:text-gray-400">Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}
