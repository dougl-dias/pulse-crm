"use client"

import { TrendingUp, TrendingDown, DollarSign, Kanban, Users, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const sparkData = [
  [4, 7, 5, 9, 6, 10, 8, 12, 9, 14],
  [10, 8, 11, 7, 9, 12, 8, 6, 9, 11],
  [3, 5, 4, 7, 6, 8, 7, 9, 8, 11],
  [8, 9, 7, 10, 11, 9, 12, 13, 11, 14],
].map((d) => d.map((v, i) => ({ x: i, v })))

const kpis = [
  {
    label: "Receita Total",
    value: "R$ 2,4M",
    change: "+18,3%",
    up: true,
    sub: "vs. mês anterior",
    icon: DollarSign,
    color: "text-[oklch(0.62_0.21_264)]",
    chartColor: "oklch(0.62_0.21_264)",
    data: sparkData[0],
  },
  {
    label: "Negócios Ativos",
    value: "142",
    change: "+7",
    up: true,
    sub: "novos esta semana",
    icon: Kanban,
    color: "text-[oklch(0.68_0.16_162)]",
    chartColor: "oklch(0.68_0.16_162)",
    data: sparkData[3],
  },
  {
    label: "Taxa de Conversão",
    value: "24,7%",
    change: "-1,2%",
    up: false,
    sub: "vs. trimestre",
    icon: Target,
    color: "text-[oklch(0.72_0.18_84)]",
    chartColor: "oklch(0.72_0.18_84)",
    data: sparkData[1],
  },
  {
    label: "Novos Contatos",
    value: "1.087",
    change: "+23,5%",
    up: true,
    sub: "vs. mês anterior",
    icon: Users,
    color: "text-[oklch(0.62_0.21_264)]",
    chartColor: "oklch(0.62_0.21_264)",
    data: sparkData[2],
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground font-medium">{kpi.label}</span>
              <span className="text-2xl font-semibold text-foreground tracking-tight">{kpi.value}</span>
            </div>
            <div className={cn("p-1.5 rounded-md bg-secondary", kpi.color)}>
              <kpi.icon className="w-4 h-4" strokeWidth={1.8} />
            </div>
          </div>

          {/* Sparkline */}
          <div className="h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpi.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`grad-${kpi.label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={kpi.chartColor} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={kpi.chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip content={() => null} />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={kpi.chartColor}
                  strokeWidth={1.5}
                  fill={`url(#grad-${kpi.label})`}
                  dot={false}
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-1.5">
            {kpi.up ? (
              <TrendingUp className="w-3.5 h-3.5 text-[oklch(0.68_0.16_162)]" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[oklch(0.55_0.22_25)]" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                kpi.up ? "text-[oklch(0.68_0.16_162)]" : "text-[oklch(0.55_0.22_25)]"
              )}
            >
              {kpi.change}
            </span>
            <span className="text-xs text-muted-foreground">{kpi.sub}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
