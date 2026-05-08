'use client'

import { Search, Plus, SlidersHorizontal, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { NavPage } from '@/lib/data'

const PAGE_META: Record<NavPage, { title: string; description: string; action?: string }> = {
  landing: { title: '', description: '' },
  login: { title: '', description: '' },
  dashboard: { title: 'Dashboard', description: 'Welcome back, Alex', action: 'New Deal' },
  customers: { title: 'Customers', description: '8 total customers', action: 'Add Customer' },
  'customer-profile': { title: 'Customer Profile', description: 'Full account details' },
  deals: { title: 'Deals', description: '10 active deals', action: 'New Deal' },
  pipeline: { title: 'Pipeline', description: 'Drag and drop to update stages', action: 'Add Deal' },
  tasks: { title: 'Tasks', description: '8 tasks assigned to you', action: 'New Task' },
  team: { title: 'Team', description: '7 members · 6 active', action: 'Invite Member' },
  reports: { title: 'Reports', description: 'Analytics & performance', action: 'Export' },
  settings: { title: 'Settings', description: 'Manage your account and workspace' },
}

interface TopNavbarProps {
  activePage: NavPage
  onAction?: () => void
  search?: string
  onSearchChange?: (v: string) => void
}

export function TopNavbar({ activePage, onAction, search = '', onSearchChange }: TopNavbarProps) {
  const meta = PAGE_META[activePage]
  if (!meta.title) return null

  return (
    <header className="flex items-center gap-4 h-14 px-6 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-foreground leading-none">{meta.title}</h1>
        <p className="text-xs text-muted-foreground mt-0.5 leading-none">{meta.description}</p>
      </div>

      {/* Search */}
      {onSearchChange && (
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="pl-8 h-8 text-sm bg-secondary border-border"
          />
        </div>
      )}

      {/* Filters */}
      <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="text-xs">Filter</span>
      </Button>

      {activePage === 'reports' && (
        <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground">
          <Download className="w-3.5 h-3.5" />
          <span className="text-xs">Export</span>
        </Button>
      )}

      {/* Primary action */}
      {meta.action && (
        <Button
          size="sm"
          className="h-8 px-3 gap-1.5 text-xs font-medium bg-primary hover:bg-primary/90"
          onClick={onAction}
        >
          <Plus className="w-3.5 h-3.5" />
          {meta.action}
        </Button>
      )}
    </header>
  )
}
