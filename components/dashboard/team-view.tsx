"use client"

import { cn } from "@/lib/utils"
import { MoreHorizontal, Mail, Phone, TrendingUp, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TeamRole = "Account Executive" | "Sales Manager" | "BDR" | "Customer Success" | "Sales Director"

type Member = {
  id: string
  name: string
  initials: string
  color: string
  role: TeamRole
  email: string
  deals: number
  revenue: string
  winRate: string
  trend: "up" | "down" | "flat"
  status: "Online" | "Away" | "Offline"
  quota: number
}

const members: Member[] = [
  { id: "1", name: "Ana Martins", initials: "AM", color: "bg-primary", role: "Sales Director", email: "ana@pulse.com", deals: 18, revenue: "R$ 2,1M", winRate: "62%", trend: "up", status: "Online", quota: 87 },
  { id: "2", name: "Carlos Lima", initials: "CL", color: "bg-[oklch(0.68_0.16_162)]", role: "Account Executive", email: "carlos@pulse.com", deals: 12, revenue: "R$ 840k", winRate: "54%", trend: "up", status: "Online", quota: 72 },
  { id: "3", name: "Beatriz Rocha", initials: "BR", color: "bg-[oklch(0.72_0.18_84)]", role: "Account Executive", email: "bea@pulse.com", deals: 9, revenue: "R$ 610k", winRate: "48%", trend: "flat", status: "Away", quota: 61 },
  { id: "4", name: "Rafael Mendes", initials: "RM", color: "bg-[oklch(0.66_0.19_300)]", role: "Sales Manager", email: "rafael@pulse.com", deals: 14, revenue: "R$ 1,3M", winRate: "58%", trend: "up", status: "Online", quota: 79 },
  { id: "5", name: "Fernanda Lima", initials: "FL", color: "bg-[oklch(0.64_0.22_25)]", role: "BDR", email: "fernanda@pulse.com", deals: 6, revenue: "R$ 220k", winRate: "38%", trend: "down", status: "Offline", quota: 43 },
  { id: "6", name: "Pedro Carvalho", initials: "PC", color: "bg-[oklch(0.62_0.21_264)]", role: "Customer Success", email: "pedro@pulse.com", deals: 20, revenue: "R$ 950k", winRate: "70%", trend: "up", status: "Online", quota: 91 },
  { id: "7", name: "Sandra Oliveira", initials: "SO", color: "bg-[oklch(0.68_0.16_162)]", role: "Account Executive", email: "sandra@pulse.com", deals: 8, revenue: "R$ 480k", winRate: "52%", trend: "flat", status: "Away", quota: 55 },
  { id: "8", name: "Lucas Barbosa", initials: "LB", color: "bg-[oklch(0.72_0.18_84)]", role: "BDR", email: "lucas@pulse.com", deals: 5, revenue: "R$ 190k", winRate: "35%", trend: "up", status: "Online", quota: 38 },
]

const statusDot: Record<Member["status"], string> = {
  Online: "bg-[oklch(0.68_0.16_162)]",
  Away: "bg-[oklch(0.72_0.18_84)]",
  Offline: "bg-muted-foreground/40",
}

const trendConfig = {
  up: { color: "text-[oklch(0.68_0.16_162)]", label: "+8%" },
  flat: { color: "text-muted-foreground", label: "0%" },
  down: { color: "text-[oklch(0.64_0.22_25)]", label: "-4%" },
}

export function TeamView() {
  const totalRevenue = "R$ 6,7M"
  const avgWinRate = "52%"
  const onlineCount = members.filter(m => m.status === "Online").length

  return (
    <div className="flex flex-col gap-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Membros Ativos", value: members.length.toString(), sub: `${onlineCount} online agora` },
          { label: "Receita Total", value: totalRevenue, sub: "Todos os membros" },
          { label: "Win Rate Médio", value: avgWinRate, sub: "Últimos 90 dias" },
          { label: "Negócios Ativos", value: members.reduce((a, m) => a + m.deals, 0).toString(), sub: "Em pipeline" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">{s.label}</p>
            <p className="text-2xl font-semibold text-foreground tracking-tight">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-foreground">Membros da Equipe</h2>
        <button className="flex items-center gap-1.5 h-8 px-3 text-[13px] font-medium bg-primary text-primary-foreground rounded-[6px] hover:bg-primary/90 transition-all">
          <Plus className="w-3.5 h-3.5" />
          Adicionar Membro
        </button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {["Membro", "Cargo", "Negócios", "Receita", "Win Rate", "Quota", "Status", ""].map(h => (
                <th key={h} className={cn(
                  "px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                  h === "" && "w-12",
                  (h === "Quota" || h === "Win Rate") && "hidden lg:table-cell",
                  h === "Status" && "hidden md:table-cell",
                )}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-border last:border-b-0 hover:bg-secondary/40 transition-colors group">
                {/* Member */}
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

                {/* Role */}
                <td className="px-4 py-3">
                  <span className="text-[12px] text-muted-foreground">{member.role}</span>
                </td>

                {/* Deals */}
                <td className="px-4 py-3">
                  <span className="text-[13px] font-semibold text-foreground">{member.deals}</span>
                </td>

                {/* Revenue */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-foreground">{member.revenue}</span>
                    <span className={cn("text-[10px] font-semibold", trendConfig[member.trend].color)}>
                      {trendConfig[member.trend].label}
                    </span>
                  </div>
                </td>

                {/* Win Rate */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-[13px] font-medium text-foreground">{member.winRate}</span>
                </td>

                {/* Quota */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", member.quota >= 80 ? "bg-[oklch(0.68_0.16_162)]" : member.quota >= 50 ? "bg-primary" : "bg-[oklch(0.64_0.22_25)]")}
                        style={{ width: `${member.quota}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">{member.quota}%</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full", statusDot[member.status])} />
                    <span className="text-[12px] text-muted-foreground">{member.status}</span>
                  </div>
                </td>

                {/* Actions */}
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
