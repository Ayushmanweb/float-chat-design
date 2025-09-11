"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Menu,
  X,
  Search,
  User,
  Settings,
  Waves,
  Home,
  BarChart3,
  Lightbulb,
  HelpCircle,
  Info,
  MessageCircle,
} from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "#", icon: Home },
    { name: "Explore Data", href: "#", icon: BarChart3 },
    { name: "Insights", href: "#", icon: Lightbulb },
    { name: "Help", href: "#", icon: HelpCircle },
    { name: "About", href: "#", icon: Info },
    {
      name: "AI Chat",
      href: "#chatbot",
      icon: MessageCircle,
      onClick: () => {
        const chatButton = document.querySelector("[data-chat-button]") as HTMLElement
        if (chatButton) chatButton.click()
      },
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-chart-2 via-accent to-chart-3 rounded-lg flex items-center justify-center shadow-lg">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-primary-foreground">FloatChat-AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 gap-2 px-3 py-2"
                onClick={link.onClick}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Button>
            ))}
          </div>

          {/* Search and Profile - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search ocean data..."
                className="pl-10 w-48 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-muted hover:text-muted-foreground"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-muted hover:text-muted-foreground"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/20 bg-primary/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="w-full justify-start text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 gap-3"
                  onClick={link.onClick}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Button>
              ))}

              {/* Mobile Search */}
              <div className="pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ocean data..."
                    className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
