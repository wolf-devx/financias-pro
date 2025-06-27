import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, PiggyBank, Wallet, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            <span className="text-xl font-bold">FinançasPro</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm dark:text-teal-300">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Novo em 2025: Análise Preditiva com IA</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                  Assuma o controle das suas finanças pessoais
                </h1>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Acompanhe despesas, defina orçamentos e alcance seus objetivos financeiros com nossa plataforma
                  intuitiva potencializada por IA.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700">
                      Começar Agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="overflow-hidden rounded-lg border bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium dark:text-white">Visão Financeira</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Julho 2025</span>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Receitas</div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">R$4.250</div>
                          </div>
                          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Despesas</div>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">R$2.830</div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Saldo</div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$1.420</div>
                        </div>
                        <div className="h-40 w-full bg-gray-100 rounded-lg flex items-center justify-center dark:bg-gray-800">
                          <BarChart3 className="h-24 w-24 text-gray-300 dark:text-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                  Recursos projetados para seu sucesso financeiro
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para gerenciar seu dinheiro de forma eficaz em um só lugar.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
                <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                  <Wallet className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">Controle de Despesas</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Registre e categorize facilmente suas despesas e receitas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
                <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                  <BarChart3 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">Planejamento de Orçamento</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Defina orçamentos mensais por categoria e acompanhe seus gastos.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
                <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                  <PiggyBank className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">Metas Financeiras</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Crie e acompanhe o progresso em direção às suas metas de economia.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="inline-flex items-center rounded-lg bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm dark:text-teal-300">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Novidade 2025</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                Assistente Financeiro com IA
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nossa IA analisa seus padrões de gastos e oferece recomendações personalizadas para melhorar sua saúde
                financeira.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="rounded-lg border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900/30">
                      <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">Análise Preditiva</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        "Com base nos seus padrões de gastos, você provavelmente excederá seu orçamento de alimentação
                        em R$120 este mês. Considere reduzir gastos em restaurantes nos próximos 10 dias."
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900/30">
                      <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">Otimização de Economia</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        "Identificamos que você pode economizar R$250 por mês transferindo seu saldo de cartão de
                        crédito para uma opção com taxa de juros mais baixa. Quer ver opções recomendadas?"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-teal-100 p-2 dark:bg-teal-900/30">
                      <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">Detecção de Anomalias</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        "Notamos uma cobrança incomum de R$89,90 na sua conta de streaming. Você assinou um novo serviço
                        ou isso pode ser uma cobrança incorreta?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold dark:text-white">Como a IA trabalha para você</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-teal-100 p-1 dark:bg-teal-900/30">
                      <span className="flex h-5 w-5 items-center justify-center font-medium text-teal-600 dark:text-teal-400">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold dark:text-white">Análise de Padrões</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        Nossa IA analisa seus padrões de gastos e hábitos financeiros ao longo do tempo.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-teal-100 p-1 dark:bg-teal-900/30">
                      <span className="flex h-5 w-5 items-center justify-center font-medium text-teal-600 dark:text-teal-400">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold dark:text-white">Previsões Personalizadas</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        Gera previsões sobre gastos futuros e identifica áreas de potencial economia.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-teal-100 p-1 dark:bg-teal-900/30">
                      <span className="flex h-5 w-5 items-center justify-center font-medium text-teal-600 dark:text-teal-400">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold dark:text-white">Recomendações Inteligentes</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        Oferece sugestões práticas para melhorar sua saúde financeira e atingir suas metas mais
                        rapidamente.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-teal-100 p-1 dark:bg-teal-900/30">
                      <span className="flex h-5 w-5 items-center justify-center font-medium text-teal-600 dark:text-teal-400">
                        4
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold dark:text-white">Aprendizado Contínuo</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        A IA melhora com o tempo, adaptando-se às suas preferências e objetivos financeiros.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700">
                    Experimentar o Assistente IA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4 md:px-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <span className="text-lg font-semibold dark:text-white">FinançasPro</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Gestão financeira pessoal simples e intuitiva para ajudar você a alcançar seus objetivos financeiros.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="space-y-2">
              <h4 className="font-medium dark:text-white">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Preços
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium dark:text-white">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium dark:text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <div className="container">© 2025 FinançasPro. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
