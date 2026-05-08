"use client"

import { cn } from "@/lib/utils"
import { MoreHorizontal, Plus } from "lucide-react"

type Deal = {
  id: string
  company: string
  contact: string
  value: string
  days: number
  avatar: string
  tag?: string
  tagColor?: string
}

const columns: { id: string; label: string; color: string; deals: Deal[] }[] = [
  {
    id: "lead",
    label: "Lead",
    color: "text-muted-foreground",
    deals: [
      { id: "1", company: "Nubank", contact: "Carlos Lima", value: "R$ 48k", days: 2, avatar: "NB", tag: "Inbound", tagColor: "bg-[oklch(0.62_0.21_264/0.15)] text-[oklch(0.62_0.21_264)]" },
      { id: "2", company: "iFood", contact: "Mariana Costa", value: "R$ 120k", days: 5, avatar: "IF" },
    ],
  },
  {
    id: "qualified",
    label: "Qualificado",
    color: "text-[oklch(0.62_0.21_264)]",
    deals: [
      { id: "3", company: "Magazine Luiza", contact: "Pedro Alves", value: "R$ 320k", days: 8, avatar: "ML", tag: "Enterprise", tagColor: "bg-[oklch(0.72_0.18_84/0.15)] text-[oklch(0.72_0.18_84)]" },
      { id: "4", company: "Mercado Livre", contact: "Ana Souza", value: "R$ 95k", days: 3, avatar: "ML" },
      { id: "5", company: "Creditas", contact: "João Ferreira", value: "R$ 67k", days: 12, avatar: "CR" },
    ],
  },
  {
    id: "proposal",
    label: "Proposta",
    color: "text-[oklch(0.72_0.18_84)]",
    deals: [
      { id: "6", company: "Stone", contact: "Beatriz Rocha", value: "R$ 215k", days: 6, avatar: "ST", tag: "Urgente", tagColor: "bg-[oklch(0.55_0.22_25/0.15)] text-[oklch(0.55_0.22_25)]" },
      { id: "7", company: "Totvs", contact: "Rafael Mendes", value: "R$ 480k", days: 14, avatar: "TV" },
    ],
  },
  {
    id: "negotiation",
    label: "Negociação",
    color: "text-[oklch(0.66_0.19_300)]",
    deals: [
      { id: "8", company: "Embraer", contact: "Fernanda Lima", value: "R$ 640k", days: 20, avatar: "EM", tag: "Prioritário", tagColor: "bg-[oklch(0.66_0.19_300/0.15)] text-[oklch(0.66_0.19_300)]" },
    ],
  },
  {
    id: "won",
    label: "Ganho",
    color: "text-[oklch(0.68_0.16_162)]",
    deals: [
      { id: "9", company: "Ambev", contact: "Lucas Barbosa", value: "R$ 860k", days: 30, avatar: "AB", tag: "Ganho", tagColor: "bg-[oklch(0.68_0.16_162/0.15)] text-[oklch(0.68_0.16_162)]" },
      { id: "10", company: "Vale", contact: "Sandra Oliveira", value: "R$ 1,2M", days: 45, avatar: "VL", tag: "Ganho", tagColor: "bg-[oklch(0.68_0.16_162/0.15)] text-[oklch(0.68_0.16_162)]" },
    ],
  },
]

function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="bg-background border border-border rounded-lg p-3 flex flex-col gap-2.5 hover:border-primary/40 cursor-pointer transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-secondary text-[9px] font-bold text-muted-foreground flex items-center justify-center shrink-0">
            {deal.avatar}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground leading-tight">{deal.company}</span>
            <span className="text-[10px] text-muted-foreground">{deal.contact}</span>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{deal.value}</span>
        {deal.tag && (
          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded", deal.tagColor)}>
            {deal.tag}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/60 rounded-full"
            style={{ width: `${Math.min((deal.days / 45) * 100, 100)}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{deal.days}d</span>
      </div>
    </div>
  )
}

export function PipelineBoard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Pipeline de Vendas</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">9 negócios · R$ 3,7M total</span>
          <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded px-2 py-1 hover:bg-secondary hover:text-foreground transition-all">
            <Plus className="w-3 h-3" /> Negócio
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-2 min-w-[200px] w-[200px]">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-2">
                <span className={cn("text-[11px] font-semibold uppercase tracking-wider", col.color)}>
                  {col.label}
                </span>
                <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded font-medium">
                  {col.deals.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {col.deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
              <button className="flex items-center justify-center h-8 border border-dashed border-border rounded-lg text-muted-foreground text-xs hover:border-primary/50 hover:text-foreground transition-all gap-1">
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
