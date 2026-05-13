"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, MoreHorizontal, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Requester = {
  id: string
  name: string
  email: string
  company: string
  plan: string
  lastTicket: string
  openTickets: number
  status: "Ativo" | "Pendente" | "Bloqueado"
  lastContact: string
  initials: string
  color: string
}

const requesters: Requester[] = [
  { id: "1", name: "Carlos Lima", email: "carlos@nubank.com.br", company: "Nubank", plan: "Enterprise", lastTicket: "Erro ao acessar painel", openTickets: 3, status: "Ativo", lastContact: "Hoje", initials: "CL", color: "bg-[oklch(0.62_0.21_264)]" },
  { id: "2", name: "Mariana Costa", email: "m.costa@ifood.com.br", company: "iFood", plan: "Business", lastTicket: "Boleto nao gerado", openTickets: 1, status: "Pendente", lastContact: "Ontem", initials: "MC", color: "bg-[oklch(0.68_0.16_162)]" },
  { id: "3", name: "Pedro Alves", email: "pedro.alves@magazineluiza.com", company: "Magalu", plan: "Enterprise", lastTicket: "Integracao API instavel", openTickets: 2, status: "Ativo", lastContact: "2d atras", initials: "PA", color: "bg-[oklch(0.72_0.18_84)]" },
  { id: "4", name: "Ana Souza", email: "ana.souza@mercadolivre.com", company: "Mercado Livre", plan: "Business", lastTicket: "Divergencia no cadastro", openTickets: 1, status: "Ativo", lastContact: "3d atras", initials: "AS", color: "bg-[oklch(0.66_0.19_300)]" },
  { id: "5", name: "Rafael Mendes", email: "rafael@totvs.com", company: "Totvs", plan: "Starter", lastTicket: "Permissao de usuario", openTickets: 0, status: "Ativo", lastContact: "1sem atras", initials: "RM", color: "bg-[oklch(0.62_0.21_264)]" },
]

const statusConfig = {
  Ativo: "bg-[oklch(0.68_0.16_162/0.12)] text-[oklch(0.68_0.16_162)] border-[oklch(0.68_0.16_162/0.2)]",
  Pendente: "bg-[oklch(0.72_0.18_84/0.12)] text-[oklch(0.72_0.18_84)] border-[oklch(0.72_0.18_84/0.2)]",
  Bloqueado: "bg-secondary text-muted-foreground border-border",
}

type SortKey = keyof Requester
type SortDir = "asc" | "desc"

export function ContactsTable() {
  const [sortKey, setSortKey] = useState<SortKey>("openTickets")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const sorted = [...requesters].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av
    return sortDir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av))
  })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortKey(key); setSortDir("desc") }
  }

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="flex flex-col ml-1">
      <ChevronUp className={cn("w-2.5 h-2.5 -mb-1", sortKey === col && sortDir === "asc" ? "text-primary" : "text-muted-foreground/40")} />
      <ChevronDown className={cn("w-2.5 h-2.5", sortKey === col && sortDir === "desc" ? "text-primary" : "text-muted-foreground/40")} />
    </span>
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">Solicitantes</h2>
          <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-medium">{requesters.length}</span>
        </div>
        {selected.size > 0 && (
          <span className="text-xs text-muted-foreground">{selected.size} selecionado(s)</span>
        )}
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="w-8 pl-3 pr-0 py-2.5">
                <input
                  type="checkbox"
                  className="rounded border-border accent-primary"
                  onChange={(e) => {
                    if (e.target.checked) setSelected(new Set(requesters.map(c => c.id)))
                    else setSelected(new Set())
                  }}
                  checked={selected.size === requesters.length}
                />
              </th>
              {([
                { key: "name", label: "Solicitante" },
                { key: "company", label: "Empresa" },
                { key: "status", label: "Status" },
                { key: "lastTicket", label: "Ultimo ticket" },
                { key: "openTickets", label: "Abertos" },
                { key: "lastContact", label: "Ultimo contato" },
              ] as { key: SortKey; label: string }[]).map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="px-3 py-2.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <span className="flex items-center">
                    {label}
                    <SortIcon col={key} />
                  </span>
                </th>
              ))}
              <th className="w-8 pr-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((requester) => (
              <tr
                key={requester.id}
                onMouseEnter={() => setHoveredRow(requester.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "border-b border-border transition-colors",
                  selected.has(requester.id) ? "bg-primary/5" : hoveredRow === requester.id ? "bg-secondary/60" : "bg-transparent",
                  "last:border-b-0"
                )}
              >
                <td className="pl-3 pr-0 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(requester.id)}
                    onChange={() => toggleSelect(requester.id)}
                    className="rounded border-border accent-primary"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-7 h-7 shrink-0">
                      <AvatarFallback className={cn("text-[10px] font-bold text-white", requester.color)}>
                        {requester.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground leading-tight">{requester.name}</span>
                      <span className="text-[11px] text-muted-foreground">{requester.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">{requester.company}</span>
                    <span className="text-[11px] text-muted-foreground">{requester.plan}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded border", statusConfig[requester.status])}>
                    {requester.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-foreground">{requester.lastTicket}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm font-semibold text-foreground">{requester.openTickets}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-[11px] text-muted-foreground">{requester.lastContact}</span>
                </td>
                <td className="pr-3 py-3">
                  <div className={cn("flex items-center gap-1 transition-opacity", hoveredRow === requester.id ? "opacity-100" : "opacity-0")}>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary">
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary">
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary">
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
