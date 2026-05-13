"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Ticket,
  GitBranch,
  CheckSquare,
  UsersRound,
  BarChart2,
  Settings,
  Headphones,
  ChevronDown,
  HelpCircle,
  LogOut,
  Search,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export type NavPage =
  | "Dashboard"
  | "Customers"
  | "Deals"
  | "Pipeline"
  | "Tasks"
  | "Team"
  | "Reports"
  | "Settings"

const navItems: { icon: React.ElementType; label: NavPage; title: string; badge?: string }[] = [
  { icon: LayoutDashboard, label: "Dashboard", title: "Visao geral" },
  { icon: Users, label: "Customers", title: "Solicitantes", badge: "1.2k" },
  { icon: Ticket, label: "Deals", title: "Tickets", badge: "24" },
  { icon: GitBranch, label: "Pipeline", title: "Quadro" },
  { icon: CheckSquare, label: "Tasks", title: "Tarefas", badge: "8" },
  { icon: UsersRound, label: "Team", title: "Equipe" },
  { icon: BarChart2, label: "Reports", title: "Relatorios" },
  { icon: Settings, label: "Settings", title: "Configuracoes" },
]

interface SidebarProps {
  activePage: NavPage
  setActivePage: (page: NavPage) => void
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className="flex flex-col w-[232px] min-w-[232px] h-screen bg-sidebar border-r border-sidebar-border select-none shrink-0">
      <div className="flex items-center gap-2.5 px-4 h-[52px] border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px] bg-primary shrink-0">
          <Headphones className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-foreground tracking-tight leading-tight">TicketFlow</span>
          <span className="text-[10px] text-muted-foreground leading-tight">Suporte</span>
        </div>
        <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded">
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-3 pt-3 pb-1">
        <button className="w-full flex items-center gap-2 h-8 px-2.5 rounded-md bg-sidebar-accent border border-sidebar-border text-muted-foreground text-[12px] hover:text-foreground hover:border-border transition-all">
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="flex-1 text-left">Buscar tickets...</span>
          <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-background/40 border border-sidebar-border">Ctrl K</kbd>
        </button>
      </div>

      <nav className="flex flex-col gap-0.5 px-2 pt-2 flex-1">
        <p className="px-2.5 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Atendimento
        </p>

        {navItems.slice(0, 6).map((item) => {
          const isActive = activePage === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] text-[13px] transition-all w-full text-left",
                isActive
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-[15px] h-[15px] shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground/70"
                )}
                strokeWidth={isActive ? 2 : 1.75}
              />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-medium min-w-[18px] text-center px-1.5 py-0 rounded-full leading-[18px]",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-sidebar-accent text-muted-foreground"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        <p className="px-2.5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Gestao
        </p>

        {navItems.slice(6).map((item) => {
          const isActive = activePage === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] text-[13px] transition-all w-full text-left",
                isActive
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-[15px] h-[15px] shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground/70"
                )}
                strokeWidth={isActive ? 2 : 1.75}
              />
              <span className="flex-1">{item.title}</span>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-2 py-2 space-y-0.5">
        <button className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-[6px] text-[13px] text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground transition-all w-full">
          <HelpCircle className="w-[15px] h-[15px] shrink-0" strokeWidth={1.75} />
          Central de ajuda
        </button>
      </div>

      <div className="border-t border-sidebar-border px-3 py-3 flex items-center gap-2.5">
        <Avatar className="w-7 h-7 shrink-0">
          <AvatarFallback className="text-[10px] bg-primary text-primary-foreground font-bold">
            AM
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[12px] font-semibold text-foreground truncate leading-tight">Ana Martins</span>
          <span className="text-[10px] text-muted-foreground truncate leading-tight">ana@ticketflow.com</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-sidebar-accent">
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
