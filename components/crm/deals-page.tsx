'use client'

import { useState } from 'react'
import { DEALS, DEAL_STAGES, formatCurrency, getStageColor, getPriorityColor, getAvatarColor } from '@/lib/data'
import type { DealStage } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Search, Filter, MoreHorizontal, TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'

export function DealsPage() {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState<'all' | DealStage>('all')

  const filtered = DEALS.filter(d => {
    const q = search.toLowerCase()
    const matchSearch = !q || d.title.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q)
    const matchStage = stageFilter === 'all' || d.stage === stageFilter
    return matchSearch && matchStage
  })

  const totalValue = filtered.reduce((s, d) => s + d.value, 0)
  const wonDeals = DEALS.filter(d => d.stage === 'Closed Won')
  const wonValue = wonDeals.reduce((s, d) => s + d.value, 0)

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Pipeline Value', value: formatCurrency(DEALS.filter(d => !d.stage.includes('Closed')).reduce((s, d) => s + d.value, 0)), sub: 'open deals' },
          { label: 'Closed Won', value: formatCurrency(wonValue), sub: `${wonDeals.length} deals` },
          { label: 'Avg Deal Size', value: formatCurrency(Math.round(totalValue / DEALS.length)), sub: 'across all deals' },
          { label: 'Win Rate', value: `${Math.round((wonDeals.length / DEALS.length) * 100)}%`, sub: 'overall' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals..." className="pl-8 h-9 bg-secondary border-border text-sm" />
        </div>
        <Select value={stageFilter} onValueChange={v => setStageFilter(v as typeof stageFilter)}>
          <SelectTrigger className="h-9 w-40 bg-secondary border-border text-sm">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {DEAL_STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Button size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
            <Plus className="w-3.5 h-3.5" /> New Deal
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {['Deal', 'Customer', 'Stage', 'Value', 'Probability', 'Owner', 'Close Date', 'Priority', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider first:pl-5 last:w-10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(deal => (
              <tr key={deal.id} className="border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer group">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{deal.title}</p>
                    <div className="flex gap-1 mt-1">
                      {deal.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{deal.customer}</td>
                <td className="px-4 py-3.5">
                  <span className={cn('text-xs px-2 py-1 rounded-full font-medium', getStageColor(deal.stage))}>{deal.stage}</span>
                </td>
                <td className="px-4 py-3.5 text-sm font-bold text-foreground">{formatCurrency(deal.value)}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Progress value={deal.probability} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground w-8 shrink-0">{deal.probability}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0', getAvatarColor(deal.ownerAvatar))}>
                      {deal.ownerAvatar}
                    </div>
                    <span className="text-xs text-muted-foreground">{deal.owner}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground">{deal.closeDate}</td>
                <td className="px-4 py-3.5">
                  <span className={cn('text-xs px-2 py-1 rounded-full font-medium capitalize', getPriorityColor(deal.priority))}>{deal.priority}</span>
                </td>
                <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 text-xs">
                      <DropdownMenuItem>Edit deal</DropdownMenuItem>
                      <DropdownMenuItem>Move stage</DropdownMenuItem>
                      <DropdownMenuItem>Add task</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/20">
          <p className="text-xs text-muted-foreground">
            {filtered.length} deals · Total: <span className="font-semibold text-foreground">{formatCurrency(totalValue)}</span>
          </p>
          <div className="flex items-center gap-1.5 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>Pipeline up 18% vs last month</span>
          </div>
        </div>
      </div>
    </div>
  )
}
