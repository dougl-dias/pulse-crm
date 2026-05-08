"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, MoreHorizontal, Mail, Phone, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Contact = {
  id: string
  name: string
  email: string
  company: string
  role: string
  deal: string
  dealValue: number
  status: "Ativo" | "Inativo" | "Lead" | "Cliente"
  lastContact: string
  initials: string
  color: string
}

const contacts: Contact[] = [
  { id: "1", name: "Carlos Lima", email: "carlos@nubank.com.br", company: "Nubank", role: "VP Comercial", deal: "Enterprise CRM", dealValue: 48000, status: "Lead", lastContact: "Hoje", initials: "CL", color: "bg-[oklch(0.62_0.21_264)]" },
  { id: "2", name: "Mariana Costa", email: "m.costa@ifood.com.br", company: "iFood", role: "Diretora de Ops", deal: "Integração API", dealValue: 120000, status: "Ativo", lastContact: "Ontem", initials: "MC", color: "bg-[oklch(0.68_0.16_162)]" },
  { id: "3", name: "Pedro Alves", email: "pedro.alves@magazineluiza.com", company: "Magalu", role: "CTO", deal: "Plataforma SaaS", dealValue: 320000, status: "Cliente", lastContact: "2d atrás", initials: "PA", color: "bg-[oklch(0.72_0.18_84)]" },
  { id: "4", name: "Ana Souza", email: "ana.souza@mercadolivre.com", company: "Mercado Livre", role: "Gerente de TI", deal: "Migração Cloud", dealValue: 95000, status: "Ativo", lastContact: "3d atrás", initials: "AS", color: "bg-[oklch(0.66_0.19_300)]" },
  { id: "5", name: "Rafael Mendes", email: "rafael@totvs.com", company: "Totvs", role: "Diretor Produto", deal: "Módulo ERP", dealValue: 480000, status: "Cliente", lastContact: "1sem atrás", initials: "RM", color: "bg-[oklch(0.62_0.21_264)]" },
  { id: "6", name: "Beatriz Rocha", email: "bea.rocha@stone.com.br", company: "Stone", role: "CEO", deal: "Suite Completa", dealValue: 215000, status: "Ativo", lastContact: "Hoje", initials: "BR", color: "bg-[oklch(0.55_0.22_25)]" },
  { id: "7", name: "Lucas Barbosa", email: "lucas@ambev.com.br", company: "Ambev", role: "Dir. Estratégia", deal: "Analytics Pro", dealValue: 860000, status: "Cliente", lastContact: "2d atrás", initials: "LB", color: "bg-[oklch(0.68_0.16_162)]" },
  { id: "8", name: "Fernanda Lima", email: "f.lima@embraer.com", company: "Embraer", role: "CPO", deal: "Licença Global", dealValue: 640000, status: "Ativo", lastContact: "Hoje", initials: "FL", color: "bg-[oklch(0.66_0.19_300)]" },
]

const statusConfig = {
  Ativo: "bg-[oklch(0.62_0.21_264/0.12)] text-[oklch(0.62_0.21_264)] border-[oklch(0.62_0.21_264/0.2)]",
  Inativo: "bg-secondary text-muted-foreground border-border",
  Lead: "bg-[oklch(0.72_0.18_84/0.12)] text-[oklch(0.72_0.18_84)] border-[oklch(0.72_0.18_84/0.2)]",
  Cliente: "bg-[oklch(0.68_0.16_162/0.12)] text-[oklch(0.68_0.16_162)] border-[oklch(0.68_0.16_162/0.2)]",
}

type SortKey = keyof Contact
type SortDir = "asc" | "desc"

export function ContactsTable() {
  const [sortKey, setSortKey] = useState<SortKey>("dealValue")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const sorted = [...contacts].sort((a, b) => {
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
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
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
          <h2 className="text-sm font-semibold text-foreground">Contatos</h2>
          <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-medium">{contacts.length}</span>
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
                    if (e.target.checked) setSelected(new Set(contacts.map(c => c.id)))
                    else setSelected(new Set())
                  }}
                  checked={selected.size === contacts.length}
                />
              </th>
              {([
                { key: "name", label: "Contato" },
                { key: "company", label: "Empresa" },
                { key: "status", label: "Status" },
                { key: "deal", label: "Negócio" },
                { key: "dealValue", label: "Valor" },
                { key: "lastContact", label: "Último Contato" },
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
            {sorted.map((contact) => (
              <tr
                key={contact.id}
                onMouseEnter={() => setHoveredRow(contact.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "border-b border-border transition-colors",
                  selected.has(contact.id) ? "bg-primary/5" : hoveredRow === contact.id ? "bg-secondary/60" : "bg-transparent",
                  "last:border-b-0"
                )}
              >
                <td className="pl-3 pr-0 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(contact.id)}
                    onChange={() => toggleSelect(contact.id)}
                    className="rounded border-border accent-primary"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-7 h-7 shrink-0">
                      <AvatarFallback className={cn("text-[10px] font-bold text-white", contact.color)}>
                        {contact.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground leading-tight">{contact.name}</span>
                      <span className="text-[11px] text-muted-foreground">{contact.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">{contact.company}</span>
                    <span className="text-[11px] text-muted-foreground">{contact.role}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded border", statusConfig[contact.status])}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-foreground">{contact.deal}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm font-semibold text-foreground">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact", maximumFractionDigits: 0 }).format(contact.dealValue)}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-[11px] text-muted-foreground">{contact.lastContact}</span>
                </td>
                <td className="pr-3 py-3">
                  <div className={cn("flex items-center gap-1 transition-opacity", hoveredRow === contact.id ? "opacity-100" : "opacity-0")}>
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
