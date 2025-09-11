"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Thermometer, Waves, Wind, Eye, Layers, ZoomIn, ZoomOut, RotateCcw, Filter, Info } from "lucide-react"

interface DataPoint {
  id: string
  lat: number
  lng: number
  temperature: number
  waveHeight: number
  windSpeed: number
  visibility: number
  type: "buoy" | "satellite" | "ship"
}

export function OceanMap() {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null)
  const [mapLayer, setMapLayer] = useState<"temperature" | "waves" | "currents">("temperature")
  const [zoom, setZoom] = useState(6)

  const dataPoints: DataPoint[] = [
    {
      id: "1",
      lat: 35.5,
      lng: -75.2,
      temperature: 24.3,
      waveHeight: 2.1,
      windSpeed: 15.2,
      visibility: 12.5,
      type: "buoy",
    },
    {
      id: "2",
      lat: 36.8,
      lng: -76.1,
      temperature: 23.8,
      waveHeight: 1.8,
      windSpeed: 12.8,
      visibility: 15.2,
      type: "satellite",
    },
    {
      id: "3",
      lat: 34.2,
      lng: -77.5,
      temperature: 25.1,
      waveHeight: 2.4,
      windSpeed: 18.5,
      visibility: 10.8,
      type: "ship",
    },
    {
      id: "4",
      lat: 37.1,
      lng: -74.8,
      temperature: 22.9,
      waveHeight: 1.5,
      windSpeed: 14.2,
      visibility: 16.1,
      type: "buoy",
    },
  ]

  const getPointColor = (point: DataPoint) => {
    switch (mapLayer) {
      case "temperature":
        return point.temperature > 24
          ? "bg-gradient-to-r from-red-500 to-orange-500"
          : point.temperature > 22
            ? "bg-gradient-to-r from-yellow-400 to-orange-400"
            : "bg-gradient-to-r from-blue-400 to-cyan-400"
      case "waves":
        return point.waveHeight > 2
          ? "bg-gradient-to-r from-indigo-600 to-purple-600"
          : point.waveHeight > 1.5
            ? "bg-gradient-to-r from-blue-500 to-indigo-500"
            : "bg-gradient-to-r from-cyan-400 to-blue-400"
      case "currents":
        return point.windSpeed > 15
          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
          : point.windSpeed > 12
            ? "bg-gradient-to-r from-green-400 to-emerald-400"
            : "bg-gradient-to-r from-teal-300 to-cyan-300"
      default:
        return "bg-primary"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "buoy":
        return "🟦"
      case "satellite":
        return "🛰️"
      case "ship":
        return "🚢"
      default:
        return "📍"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Map Controls */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {[
                { key: "temperature", label: "Temperature", icon: Thermometer, color: "text-orange-500" },
                { key: "waves", label: "Wave Height", icon: Waves, color: "text-blue-500" },
                { key: "currents", label: "Wind Speed", icon: Wind, color: "text-emerald-500" },
              ].map(({ key, label, icon: Icon, color }) => (
                <Button
                  key={key}
                  variant={mapLayer === key ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => setMapLayer(key as any)}
                >
                  <Icon className={`w-4 h-4 ${mapLayer === key ? "text-white" : color}`} />
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 1, 10))} className="flex-1">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 1, 1))} className="flex-1">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoom(6)} className="flex-1">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Zoom Level: {zoom}</div>
          </CardContent>
        </Card>

        {/* Data Point Info */}
        {selectedPoint && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Data Point Details
              </CardTitle>
              <CardDescription>
                {getTypeIcon(selectedPoint.type)}{" "}
                {selectedPoint.type.charAt(0).toUpperCase() + selectedPoint.type.slice(1)} Station
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span>{selectedPoint.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                  <Waves className="w-4 h-4 text-blue-500" />
                  <span>{selectedPoint.waveHeight}m</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                  <Wind className="w-4 h-4 text-emerald-500" />
                  <span>{selectedPoint.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  <Eye className="w-4 h-4 text-cyan-500" />
                  <span>{selectedPoint.visibility} km</span>
                </div>
              </div>
              <Badge variant="outline" className="w-full justify-center">
                Lat: {selectedPoint.lat}°, Lng: {selectedPoint.lng}°
              </Badge>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Interactive Map */}
      <div className="lg:col-span-3">
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Ocean Data Map
                </CardTitle>
                <CardDescription>
                  Interactive visualization of {mapLayer} data across the Atlantic Ocean
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {dataPoints.length} Active Stations
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-80px)]">
            {/* Simulated Map Container */}
            <div
              className="relative w-full h-full bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 overflow-hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 40% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 60% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 10% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
                `,
              }}
            >
              {/* Ocean Current Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="waves" patternUnits="userSpaceOnUse" width="100" height="20">
                    <path
                      d="M0 10 Q25 0 50 10 T100 10"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      className="text-primary"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#waves)" />
              </svg>

              {/* Data Points */}
              {dataPoints.map((point) => (
                <div
                  key={point.id}
                  className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-150 ${getPointColor(point)} ${
                    selectedPoint?.id === point.id ? "ring-4 ring-primary/50 scale-125" : ""
                  }`}
                  style={{
                    left: `${((point.lng + 80) / 10) * 100}%`,
                    top: `${((40 - point.lat) / 10) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedPoint(point)}
                >
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping" />

                  {/* Data Point Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-popover text-popover-foreground text-xs rounded-lg px-2 py-1 shadow-lg border whitespace-nowrap">
                      <div className="font-medium">
                        {getTypeIcon(point.type)} {point.type}
                      </div>
                      <div>Temp: {point.temperature}°C</div>
                      <div>Waves: {point.waveHeight}m</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                <div className="text-sm font-medium mb-2 text-card-foreground">
                  {mapLayer.charAt(0).toUpperCase() + mapLayer.slice(1)} Scale
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
                    <span>Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                    <span>High</span>
                  </div>
                </div>
              </div>

              {/* Coordinates Display */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border/50 text-xs text-card-foreground">
                Atlantic Ocean Region
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
