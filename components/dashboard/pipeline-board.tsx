"use client"

import { cn } from "@/lib/utils"
import { MoreHorizontal, Plus } from "lucide-react"

type Ticket = {
  id: string
  title: string
  requester: string
  priority: string
  days: number
  avatar: string
  tag?: string
  tagColor?: string
}

const columns: { id: string; label: string; color: string; tickets: Ticket[] }[] = [
  {
    id: "new",
    label: "Novo",
    color: "text-muted-foreground",
    tickets: [
      { id: "1", title: "Erro ao acessar painel", requester: "Carlos Lima", priority: "Alta", days: 1, avatar: "CL", tag: "Login", tagColor: "bg-[oklch(0.62_0.21_264/0.15)] text-[oklch(0.62_0.21_264)]" },
      { id: "2", title: "Boleto nao gerado", requester: "Mariana Costa", priority: "Media", days: 2, avatar: "MC" },
    ],
  },
  {
    id: "triage",
    label: "Triagem",
    color: "text-[oklch(0.62_0.21_264)]",
    tickets: [
      { id: "3", title: "Integracao API instavel", requester: "Pedro Alves", priority: "Alta", days: 3, avatar: "PA", tag: "API", tagColor: "bg-[oklch(0.72_0.18_84/0.15)] text-[oklch(0.72_0.18_84)]" },
      { id: "4", title: "Divergencia no cadastro", requester: "Ana Souza", priority: "Baixa", days: 4, avatar: "AS" },
      { id: "5", title: "Relatorio nao exporta", requester: "Joao Ferreira", priority: "Media", days: 5, avatar: "JF" },
    ],
  },
  {
    id: "progress",
    label: "Em atendimento",
    color: "text-[oklch(0.72_0.18_84)]",
    tickets: [
      { id: "6", title: "Falha no webhook", requester: "Beatriz Rocha", priority: "Critica", days: 1, avatar: "BR", tag: "Urgente", tagColor: "bg-[oklch(0.55_0.22_25/0.15)] text-[oklch(0.55_0.22_25)]" },
      { id: "7", title: "Permissao de usuario", requester: "Rafael Mendes", priority: "Media", days: 6, avatar: "RM" },
    ],
  },
  {
    id: "waiting",
    label: "Aguardando",
    color: "text-[oklch(0.66_0.19_300)]",
    tickets: [
      { id: "8", title: "Validar anexo enviado", requester: "Fernanda Lima", priority: "Alta", days: 8, avatar: "FL", tag: "Cliente", tagColor: "bg-[oklch(0.66_0.19_300/0.15)] text-[oklch(0.66_0.19_300)]" },
    ],
  },
  {
    id: "resolved",
    label: "Resolvido",
    color: "text-[oklch(0.68_0.16_162)]",
    tickets: [
      { id: "9", title: "Senha redefinida", requester: "Lucas Barbosa", priority: "Baixa", days: 1, avatar: "LB", tag: "Resolvido", tagColor: "bg-[oklch(0.68_0.16_162/0.15)] text-[oklch(0.68_0.16_162)]" },
      { id: "10", title: "Atualizacao de plano", requester: "Sandra Oliveira", priority: "Media", days: 2, avatar: "SO", tag: "Resolvido", tagColor: "bg-[oklch(0.68_0.16_162/0.15)] text-[oklch(0.68_0.16_162)]" },
    ],
  },
]

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="bg-background border border-border rounded-lg p-3 flex flex-col gap-2.5 hover:border-primary/40 cursor-pointer transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-secondary text-[9px] font-bold text-muted-foreground flex items-center justify-center shrink-0">
            {ticket.avatar}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground leading-tight">{ticket.title}</span>
            <span className="text-[10px] text-muted-foreground">{ticket.requester}</span>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{ticket.priority}</span>
        {ticket.tag && (
          <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded", ticket.tagColor)}>
            {ticket.tag}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/60 rounded-full"
            style={{ width: `${Math.min((ticket.days / 8) * 100, 100)}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{ticket.days}d</span>
      </div>
    </div>
  )
}

export function PipelineBoard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Quadro de Tickets</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">9 tickets · 3 prioridades altas</span>
          <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded px-2 py-1 hover:bg-secondary hover:text-foreground transition-all">
            <Plus className="w-3 h-3" /> Ticket
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
                  {col.tickets.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {col.tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
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
