"use client"

import { useState } from "react"
import { FloatChatWidget } from "@/components/float-chat-widget"
import { DataDashboard } from "@/components/data-dashboard"
import { OceanMap } from "@/components/ocean-map"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Map, BarChart3, Waves } from "lucide-react"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeView, setActiveView] = useState<"dashboard" | "map">("dashboard")

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-16">
      <Navbar />

      {/* Enhanced background ocean pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent to-chart-2 rounded-full blur-2xl animate-wave"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-chart-2 to-primary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-28 h-28 bg-gradient-to-br from-chart-3 to-accent rounded-full blur-2xl animate-wave"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 pt-8 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent mb-4">
            FloatChat-AI Ocean Data Explorer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Dive deep into ocean analytics with AI-powered insights and real-time data visualization
          </p>
        </div>
      </div>

      <div className="relative z-10 px-6 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex gap-2 bg-card/80 backdrop-blur-sm rounded-lg p-1 border border-border/50 shadow-lg">
            <Button
              variant={activeView === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("dashboard")}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              variant={activeView === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("map")}
              className="gap-2"
            >
              <Map className="w-4 h-4" />
              Map View
            </Button>
          </div>

          <Badge variant="secondary" className="bg-primary text-white border-primary/20 shadow-lg">
            <Waves className="w-3 h-3 mr-1" />
            Live Data Active
          </Badge>
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${isChatOpen ? "mr-[35%]" : "mr-0"} px-6`}>
        <div className="max-w-6xl mx-auto">{activeView === "dashboard" ? <DataDashboard /> : <OceanMap />}</div>
      </div>

      <FloatChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  )
}
