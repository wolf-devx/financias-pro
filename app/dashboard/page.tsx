"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Calendar,
  CreditCard,
  DollarSign,
  Home,
  LogOut,
  Menu,
  PiggyBank,
  Plus,
  Settings,
  Sparkles,
  Target,
  User,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ExpenseChart } from "@/components/expense-chart"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { AiAssistant } from "@/components/ai-assistant"

export default function DashboardPage() {
  const isMobile = useMobile()
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showAiAssistant, setShowAiAssistant] = useState(false)

  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-950">
      <header className="sticky top-0 z-30 border-b bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 lg:gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-16 items-center border-b px-6 dark:border-gray-800">
                    <Link href="/" className="flex items-center gap-2">
                      <PiggyBank className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      <span className="font-bold dark:text-white">FinançasPro</span>
                    </Link>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <nav className="grid gap-1 p-2">
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/transactions">
                      <Button variant="ghost" className="w-full justify-start">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Transações
                      </Button>
                    </Link>
                    <Link href="/dashboard/budget">
                      <Button variant="ghost" className="w-full justify-start">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Orçamento
                      </Button>
                    </Link>
                    <Link href="/dashboard/goals">
                      <Button variant="ghost" className="w-full justify-start">
                        <Target className="mr-2 h-4 w-4" />
                        Metas
                      </Button>
                    </Link>
                    <Link href="/dashboard/reports">
                      <Button variant="ghost" className="w-full justify-start">
                        <BarChart className="mr-2 h-4 w-4" />
                        Relatórios
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            <Link href="/" className="flex items-center gap-2">
              <PiggyBank className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              <span className="font-bold hidden md:inline-block dark:text-white">FinançasPro</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowAddTransaction(true)}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700"
              aria-label="Adicionar transação"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline-block">Adicionar Transação</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAiAssistant(true)}
              className="relative"
              aria-label="Assistente IA"
            >
              <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <span className="sr-only">Assistente IA</span>
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Calendário">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Calendário</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Configurações">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuário" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="hidden w-64 flex-col border-r bg-gray-50 lg:flex dark:border-gray-800 dark:bg-gray-900">
            <nav className="grid gap-1 p-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/transactions">
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Transações
                </Button>
              </Link>
              <Link href="/dashboard/budget">
                <Button variant="ghost" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Orçamento
                </Button>
              </Link>
              <Link href="/dashboard/goals">
                <Button variant="ghost" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Metas
                </Button>
              </Link>
              <Link href="/dashboard/reports">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Relatórios
                </Button>
              </Link>
              <div className="mt-auto">
                <Link href="/dashboard/profile">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Button>
                </Link>
                <Link href="/logout">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </Link>
              </div>
            </nav>
          </aside>
        )}
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Bem-vindo de volta, João!</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="dark:border-gray-800 dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Saldo Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">R$4.550,25</div>
                  <p className="text-xs text-green-500 dark:text-green-400">+5,2% do mês passado</p>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800 dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Receitas</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">R$6.250,00</div>
                  <p className="text-xs text-green-500 dark:text-green-400">+2,5% do mês passado</p>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800 dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Despesas</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">R$3.850,75</div>
                  <p className="text-xs text-red-500 dark:text-red-400">+8,1% do mês passado</p>
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800 dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">Economias</CardTitle>
                  <PiggyBank className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">R$2.399,25</div>
                  <p className="text-xs text-green-500 dark:text-green-400">+12,5% do mês passado</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="dark:bg-gray-800">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="transactions">Transações</TabsTrigger>
                <TabsTrigger value="budget">Orçamento</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4 dark:border-gray-800 dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle className="dark:text-white">Análise de Despesas</CardTitle>
                      <CardDescription className="dark:text-gray-400">
                        Seus gastos por categoria para Julho 2025
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ExpenseChart />
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3 dark:border-gray-800 dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle className="dark:text-white">Status do Orçamento</CardTitle>
                      <CardDescription className="dark:text-gray-400">
                        Seu uso do orçamento para este mês
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium dark:text-white">Moradia</div>
                            <div className="text-gray-500 dark:text-gray-400">R$1.200 / R$1.500</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[80%] rounded-full bg-teal-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium dark:text-white">Alimentação</div>
                            <div className="text-gray-500 dark:text-gray-400">R$850 / R$800</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[106%] rounded-full bg-red-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium dark:text-white">Transporte</div>
                            <div className="text-gray-500 dark:text-gray-400">R$350 / R$500</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[70%] rounded-full bg-teal-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium dark:text-white">Entretenimento</div>
                            <div className="text-gray-500 dark:text-gray-400">R$420 / R$400</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[105%] rounded-full bg-red-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="font-medium dark:text-white">Utilidades</div>
                            <div className="text-gray-500 dark:text-gray-400">R$280 / R$350</div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[80%] rounded-full bg-teal-500" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="transactions">
                <Card className="dark:border-gray-800 dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Transações Recentes</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Suas últimas atividades financeiras
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionList />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="budget">
                <Card className="dark:border-gray-800 dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Orçamento Mensal</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Sua alocação de orçamento para Julho 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold dark:text-white">Orçamento Total</h3>
                          <span className="font-bold dark:text-white">R$4.500,00</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="h-full w-[85%] rounded-full bg-teal-500" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">R$3.825,00 gastos</span>
                          <span className="text-gray-500 dark:text-gray-400">R$675,00 restantes</span>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Moradia</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$1.200 / R$1.500</span>
                            <span className="text-teal-600 dark:text-teal-400">80%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[80%] rounded-full bg-teal-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Alimentação</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$850 / R$800</span>
                            <span className="text-red-600 dark:text-red-400">106%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[106%] rounded-full bg-red-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Transporte</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$350 / R$500</span>
                            <span className="text-teal-600 dark:text-teal-400">70%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[70%] rounded-full bg-teal-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Entretenimento</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$420 / R$400</span>
                            <span className="text-red-600 dark:text-red-400">105%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[105%] rounded-full bg-red-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Utilidades</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$280 / R$350</span>
                            <span className="text-teal-600 dark:text-teal-400">80%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[80%] rounded-full bg-teal-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Compras</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$425 / R$450</span>
                            <span className="text-teal-600 dark:text-teal-400">94%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[94%] rounded-full bg-teal-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Saúde</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$150 / R$300</span>
                            <span className="text-teal-600 dark:text-teal-400">50%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[50%] rounded-full bg-teal-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium dark:text-white">Educação</h4>
                          <div className="flex items-center justify-between text-sm">
                            <span className="dark:text-gray-300">R$150 / R$200</span>
                            <span className="text-teal-600 dark:text-teal-400">75%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full w-[75%] rounded-full bg-teal-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="dark:text-white">Transações Recentes</CardTitle>
                  <CardDescription className="dark:text-gray-400">Suas últimas atividades financeiras</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList limit={5} />
                </CardContent>
              </Card>
              <Card className="dark:border-gray-800 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="dark:text-white">Metas Financeiras</CardTitle>
                  <CardDescription className="dark:text-gray-400">Acompanhe seu progresso de economia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium dark:text-white">Fundo de Emergência</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">75%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className="h-full w-[75%] rounded-full bg-teal-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="dark:text-gray-300">R$15.000 / R$20.000</span>
                        <span className="text-teal-600 dark:text-teal-400">Faltam R$5.000</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium dark:text-white">Férias</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">40%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className="h-full w-[40%] rounded-full bg-teal-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="dark:text-gray-300">R$2.000 / R$5.000</span>
                        <span className="text-teal-600 dark:text-teal-400">Faltam R$3.000</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium dark:text-white">Novo Notebook</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">60%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className="h-full w-[60%] rounded-full bg-teal-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="dark:text-gray-300">R$3.000 / R$5.000</span>
                        <span className="text-teal-600 dark:text-teal-400">Faltam R$2.000</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Nova Meta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} />
      <AiAssistant open={showAiAssistant} onOpenChange={setShowAiAssistant} />
    </div>
  )
}
