"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sparkles, Send, ArrowRight, TrendingUp, AlertCircle, Lightbulb } from "lucide-react"

interface AiAssistantProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AiAssistant({ open, onOpenChange }: AiAssistantProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente financeiro com IA. Como posso ajudar você hoje?",
    },
  ])

  const handleSendMessage = () => {
    if (!query.trim()) return

    // Add user message to conversation
    setConversation((prev) => [...prev, { role: "user", content: query }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (query.toLowerCase().includes("economizar") || query.toLowerCase().includes("poupar")) {
        response =
          "Com base na análise dos seus gastos, você poderia economizar cerca de R$350 por mês reduzindo despesas em restaurantes e serviços de streaming. Gostaria de ver um plano detalhado?"
      } else if (query.toLowerCase().includes("orçamento") || query.toLowerCase().includes("gastos")) {
        response =
          "Seu orçamento de alimentação está 6% acima do limite este mês. Recomendo reduzir gastos em restaurantes nos próximos 10 dias para compensar. Você também está gastando 15% menos em transporte comparado ao mês passado, o que é ótimo!"
      } else if (query.toLowerCase().includes("investir") || query.toLowerCase().includes("investimento")) {
        response =
          "Com base no seu perfil financeiro e objetivos, recomendo considerar um mix de 60% em renda fixa, 30% em fundos indexados e 10% em ações. Isso oferece um bom equilíbrio entre segurança e crescimento. Gostaria de explorar opções específicas?"
      } else if (query.toLowerCase().includes("meta") || query.toLowerCase().includes("objetivo")) {
        response =
          "Para sua meta de férias (R$5.000), no ritmo atual você alcançará o objetivo em aproximadamente 7 meses. Se aumentar sua contribuição mensal em R$200, você pode reduzir esse tempo para 5 meses."
      } else {
        response =
          "Analisei seus padrões financeiros recentes e tenho algumas observações: seu gasto com alimentação aumentou 12% nos últimos 3 meses, enquanto suas economias diminuíram 5%. Posso sugerir algumas estratégias para otimizar seu orçamento?"
      }

      setConversation((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
      setQuery("")
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestions = [
    "Como posso economizar mais este mês?",
    "Analise meus gastos recentes",
    "Sugestões para investir meu dinheiro",
    "Ajude-me a atingir minha meta de férias mais rápido",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col dark:border-gray-800 dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 dark:text-white">
            <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            Assistente Financeiro IA
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Análises personalizadas e recomendações para melhorar sua saúde financeira
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-teal-600 text-white dark:bg-teal-700"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {conversation.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-2 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => {
                  setQuery(suggestion)
                  setTimeout(() => handleSendMessage(), 100)
                }}
              >
                <div className="flex items-start gap-2">
                  {index === 0 && <TrendingUp className="h-4 w-4 mt-0.5 text-teal-600 dark:text-teal-400" />}
                  {index === 1 && <AlertCircle className="h-4 w-4 mt-0.5 text-teal-600 dark:text-teal-400" />}
                  {index === 2 && <Lightbulb className="h-4 w-4 mt-0.5 text-teal-600 dark:text-teal-400" />}
                  {index === 3 && <ArrowRight className="h-4 w-4 mt-0.5 text-teal-600 dark:text-teal-400" />}
                  <span>{suggestion}</span>
                </div>
              </Button>
            ))}
          </div>
        )}

        <DialogFooter className="flex-shrink-0">
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Digite sua pergunta..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <Button
              type="submit"
              size="icon"
              onClick={handleSendMessage}
              disabled={!query.trim() || isLoading}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensagem</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
