"use client"

import { Search, Bell, Plus, SlidersHorizontal, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import type { NavPage } from "./sidebar"

const pageMeta: Record<NavPage, { title: string; description: string }> = {
  Dashboard: { title: "Visao geral", description: "Resumo operacional do suporte" },
  Customers: { title: "Solicitantes", description: "1.247 usuarios cadastrados" },
  Deals: { title: "Tickets", description: "24 chamados ativos · 7 criticos em aberto" },
  Pipeline: { title: "Quadro", description: "9 tickets em andamento" },
  Tasks: { title: "Tarefas", description: "8 acoes pendentes" },
  Team: { title: "Equipe", description: "12 atendentes ativos" },
  Reports: { title: "Relatorios", description: "Indicadores de suporte · Maio 2026" },
  Settings: { title: "Configuracoes", description: "Conta, equipe e workspace" },
}

interface TopNavbarProps {
  activePage: NavPage
}

export function TopNavbar({ activePage }: TopNavbarProps) {
  const [search, setSearch] = useState("")
  const meta = pageMeta[activePage]

  return (
    <header className="flex items-center h-[52px] px-5 border-b border-border bg-background shrink-0 gap-3">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-muted-foreground text-[13px]">TicketFlow</span>
        <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
        <span className="text-[13px] font-semibold text-foreground">{meta.title}</span>
      </div>

      <div className="w-px h-4 bg-border mx-1" />

      <span className="text-[12px] text-muted-foreground hidden md:block">{meta.description}</span>

      <div className="flex-1" />

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar ticket..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 h-8 pl-8 pr-8 bg-secondary border border-border rounded-[6px] text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-mono pointer-events-none">Ctrl K</span>
      </div>

      <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] text-muted-foreground border border-border rounded-[6px] hover:bg-secondary hover:text-foreground transition-all">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Filtrar</span>
      </button>

      <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] font-medium text-primary-foreground bg-primary rounded-[6px] hover:bg-primary/90 transition-all">
        <Plus className="w-3.5 h-3.5" />
        <span>Novo ticket</span>
      </button>

      <div className="w-px h-4 bg-border" />

      <button className="relative text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-[6px] hover:bg-secondary">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
      </button>

      <Avatar className="w-7 h-7 cursor-pointer">
        <AvatarFallback className="text-[10px] bg-primary text-primary-foreground font-bold">
          AM
        </AvatarFallback>
      </Avatar>
    </header>
  )
}
