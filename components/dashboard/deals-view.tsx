"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Plus, TrendingUp, ArrowUpRight, Filter } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type DealStage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost"

type Deal = {
  id: string
  name: string
  company: string
  contact: string
  initials: string
  color: string
  stage: DealStage
  value: number
  probability: number
  closeDate: string
  owner: string
  ownerInitials: string
  ownerColor: string
  createdAt: string
}

const deals: Deal[] = [
  { id: "1", name: "Licença Global Enterprise", company: "Embraer", contact: "Fernanda Lima", initials: "EM", color: "bg-[oklch(0.62_0.21_264)]", stage: "Negotiation", value: 640000, probability: 70, closeDate: "31 Mai", owner: "Ana Martins", ownerInitials: "AM", ownerColor: "bg-primary", createdAt: "2 meses atrás" },
  { id: "2", name: "Analytics Pro — Suite", company: "Ambev", contact: "Lucas Barbosa", initials: "AB", color: "bg-[oklch(0.68_0.16_162)]", stage: "Won", value: 860000, probability: 100, closeDate: "8 Mai", owner: "Carlos Lima", ownerInitials: "CL", ownerColor: "bg-[oklch(0.68_0.16_162)]", createdAt: "3 meses atrás" },
  { id: "3", name: "Módulo ERP Integrado", company: "Totvs", contact: "Rafael Mendes", initials: "TV", color: "bg-[oklch(0.72_0.18_84)]", stage: "Proposal", value: 480000, probability: 55, closeDate: "15 Jun", owner: "Beatriz Rocha", ownerInitials: "BR", ownerColor: "bg-[oklch(0.72_0.18_84)]", createdAt: "6 semanas atrás" },
  { id: "4", name: "Plataforma SaaS Multi-tenant", company: "Magalu", contact: "Pedro Alves", initials: "ML", color: "bg-[oklch(0.66_0.19_300)]", stage: "Qualified", value: 320000, probability: 40, closeDate: "30 Jun", owner: "Ana Martins", ownerInitials: "AM", ownerColor: "bg-primary", createdAt: "1 mês atrás" },
  { id: "5", name: "Suite Completa — Enterprise", company: "Stone", contact: "Beatriz Rocha", initials: "ST", color: "bg-[oklch(0.64_0.22_25)]", stage: "Proposal", value: 215000, probability: 60, closeDate: "20 Jun", owner: "Rafael Mendes", ownerInitials: "RM", ownerColor: "bg-[oklch(0.66_0.19_300)]", createdAt: "5 semanas atrás" },
  { id: "6", name: "Migração Cloud — Infraestrutura", company: "Mercado Livre", contact: "Ana Souza", initials: "ME", color: "bg-[oklch(0.62_0.21_264)]", stage: "Qualified", value: 95000, probability: 35, closeDate: "15 Jul", owner: "Carlos Lima", ownerInitials: "CL", ownerColor: "bg-[oklch(0.68_0.16_162)]", createdAt: "3 semanas atrás" },
  { id: "7", name: "Enterprise CRM — Banco", company: "Nubank", contact: "Carlos Lima", initials: "NU", color: "bg-[oklch(0.62_0.21_264)]", stage: "Lead", value: 48000, probability: 20, closeDate: "31 Jul", owner: "Beatriz Rocha", ownerInitials: "BR", ownerColor: "bg-[oklch(0.72_0.18_84)]", createdAt: "2 semanas atrás" },
  { id: "8", name: "Integração API — Marketplace", company: "iFood", contact: "Mariana Costa", initials: "IF", color: "bg-[oklch(0.68_0.16_162)]", stage: "Lead", value: 120000, probability: 25, closeDate: "15 Ago", owner: "Ana Martins", ownerInitials: "AM", ownerColor: "bg-primary", createdAt: "1 semana atrás" },
  { id: "9", name: "Licença Anual — Analytics", company: "Vale", contact: "Sandra Oliveira", initials: "VA", color: "bg-[oklch(0.64_0.22_25)]", stage: "Won", value: 1200000, probability: 100, closeDate: "5 Abr", owner: "Rafael Mendes", ownerInitials: "RM", ownerColor: "bg-[oklch(0.66_0.19_300)]", createdAt: "4 meses atrás" },
]

const stageConfig: Record<DealStage, { label: string; color: string; bg: string }> = {
  Lead:        { label: "Lead",        color: "text-muted-foreground",              bg: "bg-secondary" },
  Qualified:   { label: "Qualificado", color: "text-[oklch(0.62_0.21_264)]",        bg: "bg-[oklch(0.62_0.21_264/0.12)]" },
  Proposal:    { label: "Proposta",    color: "text-[oklch(0.72_0.18_84)]",         bg: "bg-[oklch(0.72_0.18_84/0.12)]" },
  Negotiation: { label: "Negociação",  color: "text-[oklch(0.66_0.19_300)]",        bg: "bg-[oklch(0.66_0.19_300/0.12)]" },
  Won:         { label: "Ganho",       color: "text-[oklch(0.68_0.16_162)]",        bg: "bg-[oklch(0.68_0.16_162/0.12)]" },
  Lost:        { label: "Perdido",     color: "text-[oklch(0.64_0.22_25)]",         bg: "bg-[oklch(0.64_0.22_25/0.12)]" },
}

const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact", maximumFractionDigits: 1 }).format(v)

type StageFilter = DealStage | "All"

export function DealsView() {
  const [stageFilter, setStageFilter] = useState<StageFilter>("All")

  const filtered = stageFilter === "All" ? deals : deals.filter(d => d.stage === stageFilter)
  const totalValue = deals.reduce((a, d) => a + d.value, 0)
  const wonValue = deals.filter(d => d.stage === "Won").reduce((a, d) => a + d.value, 0)
  const openValue = deals.filter(d => !["Won", "Lost"].includes(d.stage)).reduce((a, d) => a + d.value, 0)
  const avgProbability = Math.round(deals.filter(d => !["Won", "Lost"].includes(d.stage)).reduce((a, d) => a + d.probability, 0) / deals.filter(d => !["Won", "Lost"].includes(d.stage)).length)

  return (
    <div className="flex flex-col gap-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total de Negócios", value: fmt(totalValue), sub: `${deals.length} negócios` },
          { label: "Receita Ganha", value: fmt(wonValue), sub: `${deals.filter(d => d.stage === "Won").length} fechados`, highlight: true },
          { label: "Em Aberto", value: fmt(openValue), sub: `${deals.filter(d => !["Won", "Lost"].includes(d.stage)).length} negócios ativos` },
          { label: "Prob. Média", value: `${avgProbability}%`, sub: "Negócios em pipeline" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className={cn("text-2xl font-semibold tracking-tight", s.highlight ? "text-[oklch(0.68_0.16_162)]" : "text-foreground")}>{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-secondary rounded-[6px] p-0.5 flex-wrap">
          <button
            onClick={() => setStageFilter("All")}
            className={cn("px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-all", stageFilter === "All" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            Todos
          </button>
          {(Object.keys(stageConfig) as DealStage[]).map(s => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={cn("px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-all", stageFilter === s ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              {stageConfig[s].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] text-muted-foreground border border-border rounded-[6px] hover:bg-secondary hover:text-foreground transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filtrar
          </button>
          <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] font-medium bg-primary text-primary-foreground rounded-[6px] hover:bg-primary/90 transition-all">
            <Plus className="w-3.5 h-3.5" />
            Novo Negócio
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {["Negócio", "Empresa", "Estágio", "Valor", "Probabilidade", "Proprietário", "Fechamento", ""].map(h => (
                <th key={h} className={cn(
                  "px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                  h === "" && "w-10",
                  (h === "Probabilidade" || h === "Proprietário") && "hidden lg:table-cell",
                  h === "Fechamento" && "hidden md:table-cell",
                )}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(deal => {
              const stage = stageConfig[deal.stage]
              return (
                <tr key={deal.id} className="border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors group cursor-pointer">
                  {/* Deal name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-7 h-7 rounded-[5px] text-[9px] font-bold text-white flex items-center justify-center shrink-0", deal.color)}>
                        {deal.initials}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground leading-tight">{deal.name}</p>
                        <p className="text-[11px] text-muted-foreground">{deal.contact}</p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-4 py-3">
                    <span className="text-[13px] text-foreground">{deal.company}</span>
                  </td>

                  {/* Stage */}
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-[4px]", stage.color, stage.bg)}>
                      {stage.label}
                    </span>
                  </td>

                  {/* Value */}
                  <td className="px-4 py-3">
                    <span className="text-[13px] font-semibold text-foreground">{fmt(deal.value)}</span>
                  </td>

                  {/* Probability */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", deal.probability >= 80 ? "bg-[oklch(0.68_0.16_162)]" : deal.probability >= 50 ? "bg-primary" : "bg-[oklch(0.72_0.18_84)]")}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{deal.probability}%</span>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className={cn("text-[8px] font-bold text-white", deal.ownerColor)}>
                          {deal.ownerInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[12px] text-muted-foreground">{deal.owner.split(" ")[0]}</span>
                    </div>
                  </td>

                  {/* Close date */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-[12px] text-muted-foreground">{deal.closeDate}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <button className="opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
