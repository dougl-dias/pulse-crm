"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { useState } from "react"
import { cn } from "@/lib/utils"

const data = [
  { month: "Jan", resolvidos: 180, meta: 200 },
  { month: "Fev", resolvidos: 220, meta: 200 },
  { month: "Mar", resolvidos: 195, meta: 210 },
  { month: "Abr", resolvidos: 260, meta: 220 },
  { month: "Mai", resolvidos: 240, meta: 230 },
  { month: "Jun", resolvidos: 310, meta: 250 },
  { month: "Jul", resolvidos: 285, meta: 260 },
  { month: "Ago", resolvidos: 340, meta: 270 },
  { month: "Set", resolvidos: 380, meta: 290 },
  { month: "Out", resolvidos: 420, meta: 300 },
  { month: "Nov", resolvidos: 390, meta: 320 },
  { month: "Dez", resolvidos: 460, meta: 350 },
]

const periods = ["12M", "6M", "3M", "1M"]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs font-semibold" style={{ color: p.fill || p.color }}>
            {p.name}: {p.value} tickets
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  const [period, setPeriod] = useState("12M")
  const [hovered, setHovered] = useState<number | null>(null)

  const filtered = period === "12M" ? data : period === "6M" ? data.slice(6) : period === "3M" ? data.slice(9) : data.slice(11)

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-foreground">Tickets Resolvidos</h2>
          <p className="text-xs text-muted-foreground">Resolvidos vs. meta operacional</p>
        </div>
        <div className="flex items-center gap-0.5 bg-secondary rounded-md p-0.5">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-medium transition-all",
                period === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[oklch(0.62_0.21_264)]" />
          <span className="text-[11px] text-muted-foreground">Resolvidos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[oklch(0.62_0.21_264/0.25)]" />
          <span className="text-[11px] text-muted-foreground">Meta</span>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filtered}
            barGap={3}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            onMouseLeave={() => setHovered(null)}
          >
            <CartesianGrid vertical={false} stroke="oklch(0.2 0.006 264)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: "oklch(0.52 0.008 264)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(0.52 0.008 264)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.2 0.006 264 / 0.5)" }} />
            <Bar
              dataKey="meta"
              name="Meta"
              radius={[3, 3, 0, 0]}
              maxBarSize={20}
              onMouseEnter={(_, i) => setHovered(i)}
            >
              {filtered.map((_, i) => (
                <Cell
                  key={i}
                  fill={hovered === i ? "oklch(0.62 0.21 264 / 0.4)" : "oklch(0.62 0.21 264 / 0.2)"}
                />
              ))}
            </Bar>
            <Bar
              dataKey="resolvidos"
              name="Resolvidos"
              radius={[3, 3, 0, 0]}
              maxBarSize={20}
              onMouseEnter={(_, i) => setHovered(i)}
            >
              {filtered.map((_, i) => (
                <Cell
                  key={i}
                  fill={hovered === i ? "oklch(0.72 0.21 264)" : "oklch(0.62 0.21 264)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
