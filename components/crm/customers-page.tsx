'use client'

import { useState } from 'react'
import { CUSTOMERS, formatCurrency, getStatusColor, getAvatarColor } from '@/lib/data'
import type { Customer, NavPage } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Search, Filter, ChevronUp, ChevronDown, ChevronsUpDown, Mail, Phone, MoreHorizontal, UserPlus, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type SortKey = keyof Customer
type SortDir = 'asc' | 'desc'

interface CustomersPageProps {
  onNavigate: (page: NavPage) => void
}

export function CustomersPage({ onNavigate }: CustomersPageProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('revenue')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = CUSTOMERS
    .filter(c => {
      const q = search.toLowerCase()
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'all' || c.status === statusFilter
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 ml-1 text-muted-foreground/50" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 ml-1 text-primary" />
      : <ChevronDown className="w-3 h-3 ml-1 text-primary" />
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="pl-8 h-9 bg-secondary border-border text-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-36 bg-secondary border-border text-sm">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="churned">Churned</SelectItem>
          </SelectContent>
        </Select>
        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <Button variant="ghost" size="sm" className="h-9 text-xs text-destructive hover:text-destructive">Delete</Button>
          </div>
        )}
        <div className="ml-auto">
          <Button size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
            <UserPlus className="w-3.5 h-3.5" /> Add Customer
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: CUSTOMERS.length, sub: 'all customers' },
          { label: 'Active', value: CUSTOMERS.filter(c => c.status === 'active').length, sub: 'paying customers' },
          { label: 'Prospects', value: CUSTOMERS.filter(c => c.status === 'prospect').length, sub: 'in evaluation' },
          { label: 'Total ARR', value: formatCurrency(CUSTOMERS.reduce((s, c) => s + c.revenue, 0)), sub: 'annual revenue' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
            <p className="text-[11px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-border w-3.5 h-3.5 accent-primary"
                  onChange={e => setSelected(e.target.checked ? new Set(CUSTOMERS.map(c => c.id)) : new Set())}
                  checked={selected.size === CUSTOMERS.length}
                />
              </th>
              {([
                { key: 'name', label: 'Customer' },
                { key: 'company', label: 'Company' },
                { key: 'status', label: 'Status' },
                { key: 'revenue', label: 'Revenue' },
                { key: 'deals', label: 'Deals' },
                { key: 'lastContact', label: 'Last Contact' },
              ] as { key: SortKey; label: string }[]).map(({ key, label }) => (
                <th key={key} className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <button className="flex items-center hover:text-foreground transition-colors" onClick={() => handleSort(key)}>
                    {label} <SortIcon col={key} />
                  </button>
                </th>
              ))}
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                      <Search className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No customers found</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(customer => (
                <tr
                  key={customer.id}
                  className="border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer group"
                  onClick={() => onNavigate('customer-profile')}
                >
                  <td className="px-4 py-3.5" onClick={e => { e.stopPropagation(); toggleSelect(customer.id) }}>
                    <input
                      type="checkbox"
                      className="rounded border-border w-3.5 h-3.5 accent-primary"
                      checked={selected.has(customer.id)}
                      onChange={() => {}}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0', getAvatarColor(customer.avatar))}>
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{customer.name}</p>
                        <p className="text-[11px] text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-foreground">{customer.company}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />{customer.location}
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn('text-xs px-2 py-1 rounded-full font-medium capitalize', getStatusColor(customer.status))}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-foreground">
                    {customer.revenue > 0 ? formatCurrency(customer.revenue) : '—'}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">{customer.deals}</td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">{customer.lastContact}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 text-xs">
                          <DropdownMenuItem onClick={() => onNavigate('customer-profile')}>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit customer</DropdownMenuItem>
                          <DropdownMenuItem>Add deal</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {CUSTOMERS.length} customers</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>Previous</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs bg-secondary">1</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
