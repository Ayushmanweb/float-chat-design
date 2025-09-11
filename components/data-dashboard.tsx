"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Waves, Thermometer, Eye, Activity, Database, Zap, Globe } from "lucide-react"
import dynamic from "next/dynamic"

const LineChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.LineChart })), { ssr: false })
const Line = dynamic(() => import("recharts").then((mod) => ({ default: mod.Line })), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.YAxis })), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => ({ default: mod.CartesianGrid })), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => ({ default: mod.Tooltip })), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })), {
  ssr: false,
})
const AreaChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.AreaChart })), { ssr: false })
const Area = dynamic(() => import("recharts").then((mod) => ({ default: mod.Area })), { ssr: false })
const BarChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.BarChart })), { ssr: false })
const Bar = dynamic(() => import("recharts").then((mod) => ({ default: mod.Bar })), { ssr: false })
const PieChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.PieChart })), { ssr: false })
const Pie = dynamic(() => import("recharts").then((mod) => ({ default: mod.Pie })), { ssr: false })
const Cell = dynamic(() => import("recharts").then((mod) => ({ default: mod.Cell })), { ssr: false })

export function DataDashboard() {
  const oceanMetrics = [
    {
      title: "Sea Surface Temperature",
      value: "24.3°C",
      change: "+0.8°C",
      trend: "up",
      icon: Thermometer,
      color: "text-chart-1",
      gradient: "from-chart-1 to-chart-2",
    },
    {
      title: "Wave Height",
      value: "2.1m",
      change: "-0.3m",
      trend: "down",
      icon: Waves,
      color: "text-chart-2",
      gradient: "from-chart-2 to-chart-3",
    },
    {
      title: "Visibility",
      value: "15.2km",
      change: "+2.1km",
      trend: "up",
      icon: Eye,
      color: "text-chart-3",
      gradient: "from-chart-3 to-chart-4",
    },
    {
      title: "Data Points",
      value: "1.2M",
      change: "+156K",
      trend: "up",
      icon: BarChart3,
      color: "text-chart-4",
      gradient: "from-chart-4 to-chart-5",
    },
  ]

  const recentDatasets = [
    { name: "Pacific Ocean Temperature Grid", status: "Active", lastUpdated: "2 min ago", size: "2.3 GB" },
    { name: "Atlantic Current Patterns", status: "Processing", lastUpdated: "15 min ago", size: "1.8 GB" },
    { name: "Coral Reef Health Monitoring", status: "Complete", lastUpdated: "1 hour ago", size: "945 MB" },
    { name: "Deep Sea Pressure Readings", status: "Active", lastUpdated: "5 min ago", size: "3.1 GB" },
  ]

  const temperatureData = [
    { month: "Jan", temp: 22.1, avg: 21.8 },
    { month: "Feb", temp: 23.2, avg: 22.5 },
    { month: "Mar", temp: 24.8, avg: 23.9 },
    { month: "Apr", temp: 26.1, avg: 25.2 },
    { month: "May", temp: 27.3, avg: 26.8 },
    { month: "Jun", temp: 28.9, avg: 28.1 },
  ]

  const currentData = [
    { region: "North Atlantic", speed: 2.3, direction: "NE" },
    { region: "Pacific", speed: 1.8, direction: "W" },
    { region: "Indian Ocean", speed: 2.1, direction: "SW" },
    { region: "Arctic", speed: 0.9, direction: "E" },
  ]

  const regionData = [
    { name: "Atlantic", value: 35, color: "#0ea5e9" },
    { name: "Pacific", value: 45, color: "#06b6d4" },
    { name: "Indian", value: 15, color: "#8b5cf6" },
    { name: "Arctic", value: 5, color: "#10b981" },
  ]

  const dailyActivity = [
    { hour: "00", sensors: 1200, alerts: 2 },
    { hour: "04", sensors: 1150, alerts: 1 },
    { hour: "08", sensors: 1300, alerts: 4 },
    { hour: "12", sensors: 1450, alerts: 3 },
    { hour: "16", sensors: 1380, alerts: 2 },
    { hour: "20", sensors: 1250, alerts: 1 },
  ]

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {oceanMetrics.map((metric, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm group overflow-hidden relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metric.gradient} p-1.5 shadow-sm`}>
                <metric.icon className="w-full h-full text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge
                  variant={metric.trend === "up" ? "default" : "secondary"}
                  className={
                    metric.trend === "up"
                      ? "bg-primary text-white border-0 shadow-sm"
                      : "bg-muted text-foreground border-border/50"
                  }
                >
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Data Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Ocean Temperature Trends
            </CardTitle>
            <CardDescription>Real-time temperature data across major ocean regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#06b6d4", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Ocean Coverage
            </CardTitle>
            <CardDescription>Data distribution by ocean region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {regionData.map((region, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-muted-foreground">{region.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Datasets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Daily Activity
            </CardTitle>
            <CardDescription>Sensor activity and alert patterns over 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <Bar dataKey="sensors" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="alerts" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Current Patterns
            </CardTitle>
            <CardDescription>Live ocean current flow and direction mapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="region" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="speed"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Datasets */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Recent Datasets
          </CardTitle>
          <CardDescription>Latest ocean data collections and processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDatasets.map((dataset, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-card/50 to-muted/20 hover:from-card/80 hover:to-muted/30 transition-all duration-300 border border-border/30 hover:border-border/50 group"
              >
                <div className="space-y-1">
                  <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {dataset.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {dataset.lastUpdated} • Size: {dataset.size}
                  </p>
                </div>
                <Badge
                  variant={
                    dataset.status === "Active" ? "default" : dataset.status === "Processing" ? "secondary" : "outline"
                  }
                  className={
                    dataset.status === "Active"
                      ? "bg-primary text-white border-0 shadow-sm"
                      : dataset.status === "Processing"
                        ? "bg-accent text-white border-0 shadow-sm"
                        : "bg-chart-4 text-white border-0 shadow-sm"
                  }
                >
                  {dataset.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
