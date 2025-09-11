"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface FloatChatWidgetProps {
  isOpen: boolean
  onToggle: () => void
}

export function FloatChatWidget({ isOpen, onToggle }: FloatChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm FloatChat-AI, your AI assistant for ocean data exploration. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand you're interested in ocean data. Let me help you explore the available datasets and visualizations.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          data-chat-button
          onClick={onToggle}
          className={cn(
            "fixed bottom-8 right-8 w-24 h-24 rounded-full shadow-2xl z-50",
            "bg-gradient-to-br from-primary via-accent to-chart-2 hover:from-primary/90 hover:via-accent/90 hover:to-chart-2/90",
            "text-white",
            "transition-all duration-300 hover:scale-110 hover:shadow-xl",
            "border-4 border-white/20 hover:border-white/40",
            "group relative overflow-hidden animate-pulse",
          )}
        >
          <MessageCircle className="w-10 h-10 group-hover:animate-bounce relative z-10" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-white/20 animate-shimmer" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-chart-2/30 animate-ripple opacity-0 group-hover:opacity-100" />
          <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white/80 animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed top-16 right-0 h-[calc(100vh-4rem)] w-[40%] min-w-[450px] bg-card/95 backdrop-blur-sm border-l border-border/50 shadow-2xl z-50 flex flex-col",
            "animate-in slide-in-from-right-full fade-in duration-700 ease-out",
            "transform-gpu will-change-transform",
          )}
          style={{
            animation: isOpen ? "slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary via-accent to-chart-2 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-shimmer" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-balance flex items-center gap-2">
                  <span className="text-lg">Chat with FloatChat-AI</span>
                  <Sparkles className="w-3 h-3 animate-pulse" />
                </h3>
                <p className="text-sm opacity-90">Ocean Data AI Assistant</p>
              </div>
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 h-8 w-8 p-0 relative z-10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background/50 to-card/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.sender === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-primary to-accent text-white"
                      : "bg-gradient-to-br from-chart-2 to-accent text-white",
                  )}
                >
                  {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <Card
                  className={cn(
                    "p-3 max-w-[80%] shadow-sm border-border/50",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-primary to-accent text-white border-primary/20"
                      : "bg-card/80 backdrop-blur-sm text-card-foreground border-border/30",
                  )}
                >
                  <p className="text-sm text-pretty leading-relaxed">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-2 opacity-70",
                      message.sender === "user" ? "text-white" : "text-muted-foreground",
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </Card>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about ocean data..."
                className="flex-1 bg-input/80 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-primary/20"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-3 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by FloatChat-AI • Ocean Data Explorer
            </p>
          </div>
        </div>
      )}
    </>
  )
}
