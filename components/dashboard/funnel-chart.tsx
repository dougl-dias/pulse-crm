"use client"

import { cn } from "@/lib/utils"

const stages = [
  { label: "Lead", count: 218, value: "R$ 3,2M", pct: 100, color: "bg-[oklch(0.62_0.21_264)]" },
  { label: "Qualificado", count: 142, value: "R$ 2,1M", pct: 65, color: "bg-[oklch(0.64_0.21_264)]" },
  { label: "Proposta", count: 87, value: "R$ 1,4M", pct: 40, color: "bg-[oklch(0.66_0.19_300)]" },
  { label: "Negociação", count: 48, value: "R$ 840k", pct: 22, color: "bg-[oklch(0.72_0.18_84)]" },
  { label: "Fechado", count: 24, value: "R$ 460k", pct: 11, color: "bg-[oklch(0.68_0.16_162)]" },
]

export function FunnelChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-semibold text-foreground">Funil de Conversão</h2>
        <p className="text-xs text-muted-foreground">Taxa geral: 11,0%</p>
      </div>
      <div className="flex flex-col gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground w-24">{s.label}</span>
                <span className="text-[11px] text-muted-foreground">{s.count} negócios</span>
              </div>
              <span className="text-xs font-semibold text-foreground">{s.value}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", s.color)}
                style={{ width: `${s.pct}%` }}
              />
            </div>
            {i < stages.length - 1 && (
              <div className="flex justify-end">
                <span className="text-[10px] text-muted-foreground">
                  {Math.round((stages[i + 1].count / s.count) * 100)}% convertidos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
