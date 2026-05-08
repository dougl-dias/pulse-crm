'use client'

import { useState } from 'react'
import { TEAM_MEMBERS, formatCurrency, getAvatarColor } from '@/lib/data'
import type { TeamMember, TeamRole } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  Search, UserPlus, MoreHorizontal, Shield, ChevronDown,
  Mail, Clock, TrendingUp, X, Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ROLE_COLORS: Record<TeamRole, string> = {
  Admin: 'bg-danger/15 text-danger',
  Manager: 'bg-warning/15 text-warning',
  'Sales Rep': 'bg-info/15 text-info',
  Support: 'bg-chart-4/15 text-chart-4',
  Viewer: 'bg-muted text-muted-foreground',
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-success/15 text-success',
  invited: 'bg-warning/15 text-warning',
  suspended: 'bg-danger/15 text-danger',
}

interface TeamPageProps {
  members?: TeamMember[]
}

export function TeamPage({ members = TEAM_MEMBERS }: TeamPageProps) {
  const [search, setSearch] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<TeamRole>('Sales Rep')
  const [inviting, setInviting] = useState(false)

  function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    setInviting(true)
    setTimeout(() => {
      setInviting(false)
      setInviteOpen(false)
      setInviteEmail('')
    }, 1200)
  }

  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
  })

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: members.length },
          { label: 'Active', value: members.filter(m => m.status === 'active').length },
          { label: 'Pending Invite', value: members.filter(m => m.status === 'invited').length },
          { label: 'Total Revenue', value: formatCurrency(members.reduce((s, m) => s + m.revenue, 0)) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." className="pl-8 h-9 bg-secondary border-border text-sm" />
        </div>
        <Button size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs ml-auto" onClick={() => setInviteOpen(true)}>
          <UserPlus className="w-3.5 h-3.5" /> Invite Member
        </Button>
      </div>

      {/* Members table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {['Member', 'Role', 'Status', 'Deals', 'Revenue / Quota', 'Last Active', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider first:pl-5 last:w-10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(member => {
              const quotaPct = member.quota > 0 ? Math.min(Math.round((member.revenue / member.quota) * 100), 100) : 0
              return (
                <tr key={member.id} className="border-b border-border/50 hover:bg-secondary/40 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0', getAvatarColor(member.avatar))}>
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-[11px] text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3 h-3 text-muted-foreground" />
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', ROLE_COLORS[member.role])}>
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', STATUS_COLORS[member.status])}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground font-medium">{member.deals}</td>
                  <td className="px-4 py-4 min-w-[180px]">
                    {member.quota > 0 ? (
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">{formatCurrency(member.revenue)}</span>
                          <span className={cn('font-semibold', quotaPct >= 100 ? 'text-success' : quotaPct >= 70 ? 'text-warning' : 'text-danger')}>
                            {quotaPct}%
                          </span>
                        </div>
                        <Progress value={quotaPct} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground mt-1">of {formatCurrency(member.quota)} quota</p>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {member.lastActive}
                    </div>
                  </td>
                  <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 text-xs">
                        <DropdownMenuItem>Edit member</DropdownMenuItem>
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        {member.status === 'invited' && <DropdownMenuItem>Resend invite</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          {member.status === 'active' ? 'Suspend' : 'Remove'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Roles & permissions table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Roles & Permissions</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-2.5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Permission</th>
              {(['Admin', 'Manager', 'Sales Rep', 'Support', 'Viewer'] as TeamRole[]).map(r => (
                <th key={r} className="pb-2.5 text-center text-[10px] uppercase tracking-wider font-semibold">
                  <span className={cn('px-2 py-0.5 rounded-full', ROLE_COLORS[r])}>{r}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'View dashboard', perms: [true, true, true, true, true] },
              { label: 'Manage customers', perms: [true, true, true, true, false] },
              { label: 'Create/edit deals', perms: [true, true, true, false, false] },
              { label: 'Delete records', perms: [true, true, false, false, false] },
              { label: 'Invite team members', perms: [true, true, false, false, false] },
              { label: 'Manage billing', perms: [true, false, false, false, false] },
              { label: 'Export data', perms: [true, true, false, false, false] },
              { label: 'View reports', perms: [true, true, true, false, true] },
            ].map(({ label, perms }) => (
              <tr key={label} className="border-b border-border/50">
                <td className="py-2.5 text-muted-foreground">{label}</td>
                {perms.map((has, i) => (
                  <td key={i} className="py-2.5 text-center">
                    <span className={cn('inline-block w-4 h-4 rounded-full text-[10px] leading-4 text-center', has ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground')}>
                      {has ? '✓' : '—'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Invite team member</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Send an invitation email with access to your Pulse CRM workspace.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Email address</Label>
              <Input
                type="email" required
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="h-9 bg-secondary border-border text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Role</Label>
              <Select value={inviteRole} onValueChange={v => setInviteRole(v as TeamRole)}>
                <SelectTrigger className="h-9 bg-secondary border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['Admin', 'Manager', 'Sales Rep', 'Support', 'Viewer'] as TeamRole[]).map(r => (
                    <SelectItem key={r} value={r}>
                      <span className={cn('text-xs px-1.5 py-0.5 rounded mr-2', ROLE_COLORS[r])}>{r}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[11px] text-muted-foreground">
                {inviteRole === 'Admin' ? 'Full access to all features and settings.' :
                 inviteRole === 'Manager' ? 'Can manage team and view all reports.' :
                 inviteRole === 'Sales Rep' ? 'Can manage own deals and customers.' :
                 inviteRole === 'Support' ? 'Can view customers and add notes.' :
                 'Read-only access to dashboard and reports.'}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" className="h-9 text-xs" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs" disabled={inviting}>
                {inviting ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <><Send className="w-3.5 h-3.5" /> Send Invite</>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
