"use client"

import { cn } from "@/lib/utils"
import { Mail, MoreHorizontal, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TeamRole = "Coordenador" | "Analista N2" | "Analista N1" | "Especialista" | "Administrador"

type Member = {
  id: string
  name: string
  initials: string
  color: string
  role: TeamRole
  email: string
  tickets: number
  resolved: number
  sla: number
  status: "Online" | "Ausente" | "Offline"
}

const members: Member[] = [
  { id: "1", name: "Ana Martins", initials: "AM", color: "bg-primary", role: "Coordenador", email: "ana@ticketflow.com", tickets: 18, resolved: 42, sla: 93, status: "Online" },
  { id: "2", name: "Carlos Lima", initials: "CL", color: "bg-[oklch(0.68_0.16_162)]", role: "Analista N1", email: "carlos@ticketflow.com", tickets: 12, resolved: 31, sla: 88, status: "Online" },
  { id: "3", name: "Beatriz Rocha", initials: "BR", color: "bg-[oklch(0.72_0.18_84)]", role: "Analista N2", email: "bea@ticketflow.com", tickets: 9, resolved: 27, sla: 79, status: "Ausente" },
  { id: "4", name: "Rafael Mendes", initials: "RM", color: "bg-[oklch(0.66_0.19_300)]", role: "Especialista", email: "rafael@ticketflow.com", tickets: 14, resolved: 35, sla: 91, status: "Online" },
  { id: "5", name: "Fernanda Lima", initials: "FL", color: "bg-[oklch(0.64_0.22_25)]", role: "Administrador", email: "fernanda@ticketflow.com", tickets: 6, resolved: 18, sla: 74, status: "Offline" },
]

const statusDot: Record<Member["status"], string> = {
  Online: "bg-[oklch(0.68_0.16_162)]",
  Ausente: "bg-[oklch(0.72_0.18_84)]",
  Offline: "bg-muted-foreground/40",
}

export function TeamView() {
  const onlineCount = members.filter(m => m.status === "Online").length
  const openTickets = members.reduce((a, m) => a + m.tickets, 0)
  const resolvedTickets = members.reduce((a, m) => a + m.resolved, 0)
  const avgSla = Math.round(members.reduce((a, m) => a + m.sla, 0) / members.length)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Atendentes", value: members.length.toString(), sub: `${onlineCount} online agora` },
          { label: "Tickets em fila", value: openTickets.toString(), sub: "distribuidos na equipe" },
          { label: "Resolvidos", value: resolvedTickets.toString(), sub: "ultimos 30 dias" },
          { label: "SLA medio", value: `${avgSla}%`, sub: "cumprimento atual" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className="text-2xl font-semibold text-foreground tracking-tight">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-foreground">Equipe de Suporte</h2>
        <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] font-medium bg-primary text-primary-foreground rounded-[6px] hover:bg-primary/90 transition-all">
          <Plus className="w-3.5 h-3.5" />
          Adicionar atendente
        </button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {["Membro", "Cargo", "Tickets", "Resolvidos", "SLA", "Status", ""].map(h => (
                <th key={h} className={cn(
                  "px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                  h === "" && "w-12",
                  (h === "Resolvidos" || h === "SLA") && "hidden lg:table-cell",
                  h === "Status" && "hidden md:table-cell",
                )}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative shrink-0">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={cn("text-[11px] font-bold text-white", member.color)}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn("absolute bottom-0 right-0 w-2 h-2 rounded-full border-[1.5px] border-card", statusDot[member.status])} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-semibold text-foreground leading-tight">{member.name}</span>
                      <span className="text-[11px] text-muted-foreground">{member.email}</span>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="text-[12px] text-muted-foreground">{member.role}</span>
                </td>

                <td className="px-4 py-3">
                  <span className="text-[13px] font-semibold text-foreground">{member.tickets}</span>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-[13px] font-semibold text-foreground">{member.resolved}</span>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", member.sla >= 85 ? "bg-[oklch(0.68_0.16_162)]" : member.sla >= 70 ? "bg-primary" : "bg-[oklch(0.64_0.22_25)]")}
                        style={{ width: `${member.sla}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">{member.sla}%</span>
                  </div>
                </td>

                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full", statusDot[member.status])} />
                    <span className="text-[12px] text-muted-foreground">{member.status}</span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
