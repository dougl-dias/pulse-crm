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
  done: boolean
}

const tasks: Task[] = [
  { id: "1", title: "Validar logs do ticket TK-1048", description: "Conferir eventos do webhook e anexar evidencias.", priority: "High", status: "Todo", assignee: "Ana Martins", initials: "AM", color: "bg-primary", due: "Hoje", done: false },
  { id: "2", title: "Responder solicitante do TK-1042", description: "Enviar orientacao sobre segunda via de boleto.", priority: "Medium", status: "In Progress", assignee: "Carlos Lima", initials: "CL", color: "bg-[oklch(0.68_0.16_162)]", due: "Hoje", done: false },
  { id: "3", title: "Revisar prioridade dos tickets antigos", description: "Atualizar fila de triagem e marcar chamados vencidos.", priority: "High", status: "In Progress", assignee: "Beatriz Rocha", initials: "BR", color: "bg-[oklch(0.72_0.18_84)]", due: "Amanha", done: false },
  { id: "4", title: "Documentar procedimento de acesso", description: "Criar artigo base para chamados de login.", priority: "Low", status: "Todo", assignee: "Rafael Mendes", initials: "RM", color: "bg-[oklch(0.66_0.19_300)]", due: "Sex", done: false },
  { id: "5", title: "Confirmar resolucao do TK-1007", description: "Validar com o solicitante antes de fechar.", priority: "Medium", status: "Done", assignee: "Ana Martins", initials: "AM", color: "bg-primary", due: "Ontem", done: true },
]

const priorityConfig: Record<Priority, { label: string; color: string }> = {
  High: { label: "Alta", color: "text-[oklch(0.64_0.22_25)]" },
  Medium: { label: "Media", color: "text-[oklch(0.72_0.18_84)]" },
  Low: { label: "Baixa", color: "text-muted-foreground" },
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  "Todo": { label: "A fazer", color: "text-muted-foreground" },
  "In Progress": { label: "Em andamento", color: "text-[oklch(0.62_0.21_264)]" },
  "Done": { label: "Concluida", color: "text-[oklch(0.68_0.16_162)]" },
}

const filters: TaskStatus[] = ["Todo", "In Progress", "Done"]

export function TasksView() {
  const [checked, setChecked] = useState<Set<string>>(new Set(tasks.filter(t => t.done).map(t => t.id)))
  const [activeFilter, setActiveFilter] = useState<TaskStatus | "All">("All")

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = activeFilter === "All" ? tasks : tasks.filter(t => t.status === activeFilter)
  const todoPending = tasks.filter(t => !checked.has(t.id) && t.status !== "Done").length
  const inProgress = tasks.filter(t => t.status === "In Progress").length
  const done = tasks.filter(t => checked.has(t.id) || t.status === "Done").length

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total de Tarefas", value: tasks.length, color: "text-foreground" },
          { label: "Pendentes", value: todoPending, color: "text-[oklch(0.64_0.22_25)]" },
          { label: "Em Andamento", value: inProgress, color: "text-[oklch(0.62_0.21_264)]" },
          { label: "Concluidas", value: done, color: "text-[oklch(0.68_0.16_162)]" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className={cn("text-2xl font-semibold tracking-tight", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

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
          Nova tarefa
        </button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        {filtered.map((task) => {
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
              <button onClick={() => toggle(task.id)} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                {isDone
                  ? <CheckSquare className="w-4 h-4 text-[oklch(0.68_0.16_162)]" strokeWidth={2} />
                  : <Square className="w-4 h-4" strokeWidth={1.75} />
                }
              </button>

              <div className="flex-1 min-w-0">
                <p className={cn("text-[13px] font-medium leading-tight", isDone ? "line-through text-muted-foreground" : "text-foreground")}>
                  {task.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate hidden sm:block">{task.description}</p>
              </div>

              <div className="w-24 flex items-center gap-1.5 hidden md:flex shrink-0">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className={cn("text-[8px] font-bold text-white", task.color)}>
                    {task.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[11px] text-muted-foreground truncate">{task.assignee.split(" ")[0]}</span>
              </div>

              <div className="w-20 hidden lg:flex items-center gap-1.5 shrink-0">
                <Flag className={cn("w-3 h-3 shrink-0", pri.color)} strokeWidth={2} />
                <span className={cn("text-[11px] font-medium", pri.color)}>{pri.label}</span>
              </div>

              <div className="w-28 hidden lg:flex items-center gap-1.5 shrink-0">
                <Circle className={cn("w-2 h-2 fill-current", sta.color)} />
                <span className={cn("text-[11px] font-medium", sta.color)}>{sta.label}</span>
              </div>

              <div className="w-16 flex items-center justify-end gap-1 shrink-0">
                <Calendar className="w-3 h-3 text-muted-foreground/60" />
                <span className={cn("text-[11px]", task.due === "Hoje" ? "text-[oklch(0.64_0.22_25)] font-semibold" : "text-muted-foreground")}>{task.due}</span>
              </div>

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
