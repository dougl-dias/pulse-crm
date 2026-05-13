"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Plus, Filter } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TicketStatus = "New" | "Triage" | "InProgress" | "Waiting" | "Resolved" | "Closed"

type Ticket = {
  id: string
  title: string
  requester: string
  category: string
  initials: string
  color: string
  status: TicketStatus
  priority: "Baixa" | "Media" | "Alta" | "Critica"
  sla: number
  assignee: string
  assigneeInitials: string
  assigneeColor: string
  createdAt: string
}

const tickets: Ticket[] = [
  { id: "TK-1048", title: "Falha no webhook de pagamento", requester: "Beatriz Rocha", category: "Integracao", initials: "BR", color: "bg-[oklch(0.55_0.22_25)]", status: "InProgress", priority: "Critica", sla: 92, assignee: "Ana Martins", assigneeInitials: "AM", assigneeColor: "bg-primary", createdAt: "Hoje" },
  { id: "TK-1047", title: "Erro ao acessar painel", requester: "Carlos Lima", category: "Login", initials: "CL", color: "bg-[oklch(0.62_0.21_264)]", status: "New", priority: "Alta", sla: 35, assignee: "Beatriz Rocha", assigneeInitials: "BR", assigneeColor: "bg-[oklch(0.72_0.18_84)]", createdAt: "Hoje" },
  { id: "TK-1042", title: "Boleto nao gerado", requester: "Mariana Costa", category: "Financeiro", initials: "MC", color: "bg-[oklch(0.68_0.16_162)]", status: "Triage", priority: "Media", sla: 48, assignee: "Carlos Lima", assigneeInitials: "CL", assigneeColor: "bg-[oklch(0.68_0.16_162)]", createdAt: "Ontem" },
  { id: "TK-1039", title: "Integracao API instavel", requester: "Pedro Alves", category: "API", initials: "PA", color: "bg-[oklch(0.72_0.18_84)]", status: "Waiting", priority: "Alta", sla: 76, assignee: "Rafael Mendes", assigneeInitials: "RM", assigneeColor: "bg-[oklch(0.66_0.19_300)]", createdAt: "2d atras" },
  { id: "TK-1031", title: "Permissao de usuario", requester: "Ana Souza", category: "Conta", initials: "AS", color: "bg-[oklch(0.66_0.19_300)]", status: "InProgress", priority: "Media", sla: 58, assignee: "Ana Martins", assigneeInitials: "AM", assigneeColor: "bg-primary", createdAt: "3d atras" },
  { id: "TK-1022", title: "Relatorio nao exporta", requester: "Joao Ferreira", category: "Relatorios", initials: "JF", color: "bg-[oklch(0.64_0.22_25)]", status: "Resolved", priority: "Baixa", sla: 100, assignee: "Carlos Lima", assigneeInitials: "CL", assigneeColor: "bg-[oklch(0.68_0.16_162)]", createdAt: "4d atras" },
]

const statusConfig: Record<TicketStatus, { label: string; color: string; bg: string }> = {
  New: { label: "Novo", color: "text-muted-foreground", bg: "bg-secondary" },
  Triage: { label: "Triagem", color: "text-[oklch(0.62_0.21_264)]", bg: "bg-[oklch(0.62_0.21_264/0.12)]" },
  InProgress: { label: "Em atendimento", color: "text-[oklch(0.72_0.18_84)]", bg: "bg-[oklch(0.72_0.18_84/0.12)]" },
  Waiting: { label: "Aguardando", color: "text-[oklch(0.66_0.19_300)]", bg: "bg-[oklch(0.66_0.19_300/0.12)]" },
  Resolved: { label: "Resolvido", color: "text-[oklch(0.68_0.16_162)]", bg: "bg-[oklch(0.68_0.16_162/0.12)]" },
  Closed: { label: "Fechado", color: "text-muted-foreground", bg: "bg-secondary" },
}

type StatusFilter = TicketStatus | "All"

export function DealsView() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")

  const filtered = statusFilter === "All" ? tickets : tickets.filter(t => t.status === statusFilter)
  const critical = tickets.filter(t => t.priority === "Critica").length
  const open = tickets.filter(t => !["Resolved", "Closed"].includes(t.status)).length
  const avgSla = Math.round(tickets.reduce((a, t) => a + t.sla, 0) / tickets.length)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total de Tickets", value: tickets.length.toString(), sub: "na fila atual" },
          { label: "Criticos", value: critical.toString(), sub: "precisam de atencao", highlight: true },
          { label: "Em Aberto", value: open.toString(), sub: "aguardando resolucao" },
          { label: "SLA Medio", value: `${avgSla}%`, sub: "cumprimento atual" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className={cn("text-2xl font-semibold tracking-tight", s.highlight ? "text-[oklch(0.55_0.22_25)]" : "text-foreground")}>{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-secondary rounded-[6px] p-0.5 flex-wrap">
          <button
            onClick={() => setStatusFilter("All")}
            className={cn("px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-all", statusFilter === "All" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            Todos
          </button>
          {(Object.keys(statusConfig) as TicketStatus[]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-all", statusFilter === s ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              {statusConfig[s].label}
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
            Novo ticket
          </button>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {["Ticket", "Solicitante", "Status", "Prioridade", "SLA", "Responsavel", "Criado", ""].map(h => (
                <th key={h} className={cn(
                  "px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                  h === "" && "w-10",
                  (h === "SLA" || h === "Responsavel") && "hidden lg:table-cell",
                  h === "Criado" && "hidden md:table-cell",
                )}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(ticket => {
              const status = statusConfig[ticket.status]
              return (
                <tr key={ticket.id} className="border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors group cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-7 h-7 rounded-[5px] text-[9px] font-bold text-white flex items-center justify-center shrink-0", ticket.color)}>
                        {ticket.initials}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground leading-tight">{ticket.title}</p>
                        <p className="text-[11px] text-muted-foreground">{ticket.id} · {ticket.category}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-[13px] text-foreground">{ticket.requester}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-[4px]", status.color, status.bg)}>
                      {status.label}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-[13px] font-semibold text-foreground">{ticket.priority}</span>
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", ticket.sla >= 80 ? "bg-[oklch(0.68_0.16_162)]" : ticket.sla >= 50 ? "bg-primary" : "bg-[oklch(0.55_0.22_25)]")}
                          style={{ width: `${ticket.sla}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{ticket.sla}%</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className={cn("text-[8px] font-bold text-white", ticket.assigneeColor)}>
                          {ticket.assigneeInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[12px] text-muted-foreground">{ticket.assignee.split(" ")[0]}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-[12px] text-muted-foreground">{ticket.createdAt}</span>
                  </td>

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
