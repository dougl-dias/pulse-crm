"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CheckSquare, Square, Plus, Calendar, Flag, MoreHorizontal, Circle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Priority = "High" | "Medium" | "Low"
type TaskStatus = "Todo" | "In Progress" | "Done"

type Task = {
  id: string
  title: string
  description: string
  priority: Priority
  status: TaskStatus
  assignee: string
  initials: string
  color: string
  due: string
  related: string
  done: boolean
}

const tasks: Task[] = [
  { id: "1", title: "Enviar proposta comercial — Embraer", description: "Finalizar e enviar proposta de licença global", priority: "High", status: "Todo", assignee: "Ana Martins", initials: "AM", color: "bg-primary", due: "Hoje", related: "Licença Global", done: false },
  { id: "2", title: "Follow-up Totvs após demo", description: "Agendar reunião de apresentação do módulo ERP", priority: "High", status: "In Progress", assignee: "Carlos Lima", initials: "CL", color: "bg-[oklch(0.68_0.16_162)]", due: "Amanhã", related: "Módulo ERP", done: false },
  { id: "3", title: "Atualizar deck de vendas Q2", description: "Incluir novos cases e pricing atualizado", priority: "Medium", status: "In Progress", assignee: "Ana Martins", initials: "AM", color: "bg-primary", due: "Seg", related: "Interno", done: false },
  { id: "4", title: "Revisar SLA com Mercado Livre", description: "Confirmar termos de suporte e SLA com o jurídico", priority: "Medium", status: "Todo", assignee: "Rafael Mendes", initials: "RM", color: "bg-[oklch(0.66_0.19_300)]", due: "Ter", related: "Migração Cloud", done: false },
  { id: "5", title: "Onboarding Ambev — configuração inicial", description: "Provisionar ambiente e configurar integrações", priority: "High", status: "In Progress", assignee: "Beatriz Rocha", initials: "BR", color: "bg-[oklch(0.72_0.18_84)]", due: "Hoje", related: "Analytics Pro", done: false },
  { id: "6", title: "Preparar relatório mensal Maio", description: "Consolidar métricas de pipeline e receita", priority: "Low", status: "Todo", assignee: "Ana Martins", initials: "AM", color: "bg-primary", due: "Sex", related: "Relatórios", done: false },
  { id: "7", title: "Qualificar leads iFood — reunião inicial", description: "Primeira reunião de discovery com Mariana Costa", priority: "Medium", status: "Todo", assignee: "Carlos Lima", initials: "CL", color: "bg-[oklch(0.68_0.16_162)]", due: "Qua", related: "Integração API", done: false },
  { id: "8", title: "Renovar contrato Stone", description: "Negociar renovação e upsell da Suite Completa", priority: "High", status: "Todo", assignee: "Rafael Mendes", initials: "RM", color: "bg-[oklch(0.66_0.19_300)]", due: "Hoje", related: "Suite Completa", done: false },
  { id: "9", title: "Configurar integração CRM — Vale", description: "Integração concluída — validar dados migrados", priority: "Low", status: "Done", assignee: "Beatriz Rocha", initials: "BR", color: "bg-[oklch(0.72_0.18_84)]", due: "Ontem", related: "Licença Anual", done: true },
  { id: "10", title: "Demo realizada — Nubank", description: "Apresentação de 2h concluída com VP Comercial", priority: "Medium", status: "Done", assignee: "Ana Martins", initials: "AM", color: "bg-primary", due: "2d atrás", related: "Enterprise CRM", done: true },
]

const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
  High: { label: "Alta", color: "text-[oklch(0.64_0.22_25)]", dot: "bg-[oklch(0.64_0.22_25)]" },
  Medium: { label: "Média", color: "text-[oklch(0.72_0.18_84)]", dot: "bg-[oklch(0.72_0.18_84)]" },
  Low: { label: "Baixa", color: "text-muted-foreground", dot: "bg-muted-foreground/40" },
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  "Todo": { label: "A Fazer", color: "text-muted-foreground" },
  "In Progress": { label: "Em Andamento", color: "text-[oklch(0.62_0.21_264)]" },
  "Done": { label: "Concluída", color: "text-[oklch(0.68_0.16_162)]" },
}

const filters: TaskStatus[] = ["Todo", "In Progress", "Done"]

export function TasksView() {
  const [checked, setChecked] = useState<Set<string>>(new Set(tasks.filter(t => t.done).map(t => t.id)))
  const [activeFilter, setActiveFilter] = useState<TaskStatus | "All">("All")

  const toggle = (id: string) => {
    setChecked(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  const filtered = activeFilter === "All" ? tasks : tasks.filter(t => t.status === activeFilter)
  const todoPending = tasks.filter(t => !checked.has(t.id) && t.status !== "Done").length
  const inProgress = tasks.filter(t => t.status === "In Progress").length
  const done = tasks.filter(t => checked.has(t.id) || t.status === "Done").length

  return (
    <div className="flex flex-col gap-5">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total de Tarefas", value: tasks.length, color: "text-foreground" },
          { label: "Pendentes", value: todoPending, color: "text-[oklch(0.64_0.22_25)]" },
          { label: "Em Andamento", value: inProgress, color: "text-[oklch(0.62_0.21_264)]" },
          { label: "Concluídas", value: done, color: "text-[oklch(0.68_0.16_162)]" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className={cn("text-2xl font-semibold tracking-tight", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters + Add */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-secondary rounded-[6px] p-0.5">
          <button
            onClick={() => setActiveFilter("All")}
            className={cn("px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-all", activeFilter === "All" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            Todas
          </button>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn("px-3 py-1.5 rounded-[4px] text-[12px] font-medium transition-all", activeFilter === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              {statusConfig[f].label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] font-medium bg-primary text-primary-foreground rounded-[6px] hover:bg-primary/90 transition-all">
          <Plus className="w-3.5 h-3.5" />
          Nova Tarefa
        </button>
      </div>

      {/* Task list */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-secondary/40">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-5" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex-1">Tarefa</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-24 hidden md:block">Responsável</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-20 hidden lg:block">Prioridade</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-28 hidden lg:block">Status</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-16 text-right">Prazo</span>
          <span className="w-6" />
        </div>

        {filtered.map((task, i) => {
          const isDone = checked.has(task.id)
          const pri = priorityConfig[task.priority]
          const sta = statusConfig[task.status]
          return (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-colors border-b border-border last:border-b-0 group",
                isDone ? "opacity-50" : "hover:bg-secondary/40"
              )}
            >
              {/* Checkbox */}
              <button onClick={() => toggle(task.id)} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                {isDone
                  ? <CheckSquare className="w-4 h-4 text-[oklch(0.68_0.16_162)]" strokeWidth={2} />
                  : <Square className="w-4 h-4" strokeWidth={1.75} />
                }
              </button>

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <p className={cn("text-[13px] font-medium leading-tight", isDone ? "line-through text-muted-foreground" : "text-foreground")}>
                  {task.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate hidden sm:block">{task.description}</p>
              </div>

              {/* Assignee */}
              <div className="w-24 flex items-center gap-1.5 hidden md:flex shrink-0">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className={cn("text-[8px] font-bold text-white", task.color)}>
                    {task.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[11px] text-muted-foreground truncate">{task.assignee.split(" ")[0]}</span>
              </div>

              {/* Priority */}
              <div className="w-20 hidden lg:flex items-center gap-1.5 shrink-0">
                <Flag className={cn("w-3 h-3 shrink-0", pri.color)} strokeWidth={2} />
                <span className={cn("text-[11px] font-medium", pri.color)}>{pri.label}</span>
              </div>

              {/* Status */}
              <div className="w-28 hidden lg:flex items-center gap-1.5 shrink-0">
                <Circle className={cn("w-2 h-2 fill-current", sta.color)} />
                <span className={cn("text-[11px] font-medium", sta.color)}>{sta.label}</span>
              </div>

              {/* Due */}
              <div className="w-16 flex items-center justify-end gap-1 shrink-0">
                <Calendar className="w-3 h-3 text-muted-foreground/60" />
                <span className={cn("text-[11px]", task.due === "Hoje" ? "text-[oklch(0.64_0.22_25)] font-semibold" : "text-muted-foreground")}>{task.due}</span>
              </div>

              {/* Actions */}
              <button className="w-6 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
