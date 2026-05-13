"use client"

import { cn } from "@/lib/utils"
import { Phone, Mail, FileText, CheckCircle2, UserPlus, CircleAlert, Calendar } from "lucide-react"

type Activity = {
  id: string
  type: "call" | "email" | "alert" | "task" | "contact" | "note" | "meeting"
  title: string
  sub: string
  time: string
  initials: string
  color: string
}

const activities: Activity[] = [
  { id: "1", type: "alert", title: "Ticket critico aberto", sub: "#TK-1048 · Falha no webhook", time: "Agora", initials: "BR", color: "bg-[oklch(0.55_0.22_25)]" },
  { id: "2", type: "call", title: "Ligacao com solicitante", sub: "Fernanda Lima · Acesso ao painel", time: "12min", initials: "FL", color: "bg-[oklch(0.66_0.19_300)]" },
  { id: "3", type: "email", title: "Resposta enviada", sub: "#TK-1039 · Boleto nao gerado", time: "1h", initials: "MC", color: "bg-[oklch(0.68_0.16_162)]" },
  { id: "4", type: "contact", title: "Novo solicitante", sub: "Carlos Lima · Conta Enterprise", time: "2h", initials: "CL", color: "bg-[oklch(0.62_0.21_264)]" },
  { id: "5", type: "task", title: "SLA atualizado", sub: "#TK-1022 · prioridade alta", time: "3h", initials: "AS", color: "bg-[oklch(0.66_0.19_300)]" },
  { id: "6", type: "note", title: "Comentario interno", sub: "#TK-1018 · validar logs", time: "5h", initials: "RM", color: "bg-[oklch(0.62_0.21_264)]" },
  { id: "7", type: "meeting", title: "Atendimento agendado", sub: "iFood · Integracao API", time: "Ontem", initials: "MC", color: "bg-[oklch(0.68_0.16_162)]" },
  { id: "8", type: "email", title: "Ticket resolvido", sub: "#TK-1007 · senha redefinida", time: "Ontem", initials: "PA", color: "bg-[oklch(0.72_0.18_84)]" },
]

const typeIcon = {
  call: Phone,
  email: Mail,
  alert: CircleAlert,
  task: CheckCircle2,
  contact: UserPlus,
  note: FileText,
  meeting: Calendar,
}

const typeColor = {
  call: "text-[oklch(0.66_0.19_300)]",
  email: "text-[oklch(0.62_0.21_264)]",
  alert: "text-[oklch(0.55_0.22_25)]",
  task: "text-[oklch(0.72_0.18_84)]",
  contact: "text-[oklch(0.62_0.21_264)]",
  note: "text-muted-foreground",
  meeting: "text-[oklch(0.72_0.18_84)]",
}

export function ActivityFeed() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Atividades Recentes</h2>
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Ver todas
        </button>
      </div>
      <div className="flex flex-col gap-0.5">
        {activities.map((act) => {
          const Icon = typeIcon[act.type]
          return (
            <div
              key={act.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-secondary/60 transition-colors cursor-pointer group"
            >
              <div className="relative shrink-0 mt-0.5">
                <div className={cn("w-7 h-7 rounded-full text-[10px] font-bold text-white flex items-center justify-center", act.color)}>
                  {act.initials}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-card border border-border flex items-center justify-center">
                  <Icon className={cn("w-2 h-2", typeColor[act.type])} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="text-xs font-medium text-foreground leading-tight truncate">{act.title}</span>
                <span className="text-[11px] text-muted-foreground truncate">{act.sub}</span>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{act.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
