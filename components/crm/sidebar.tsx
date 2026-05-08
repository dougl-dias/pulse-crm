'use client'

import { cn } from '@/lib/utils'
import type { NavPage } from '@/lib/data'
import {
  LayoutDashboard, Users, Handshake, GitFork, CheckSquare,
  UsersRound, BarChart3, Settings, ChevronDown, Zap,
  Bell, HelpCircle, LogOut,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavItem {
  label: string
  page: NavPage
  icon: React.ElementType
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', page: 'dashboard', icon: LayoutDashboard },
  { label: 'Customers', page: 'customers', icon: Users, badge: 8 },
  { label: 'Deals', page: 'deals', icon: Handshake, badge: 10 },
  { label: 'Pipeline', page: 'pipeline', icon: GitFork },
  { label: 'Tasks', page: 'tasks', icon: CheckSquare, badge: 5 },
  { label: 'Team', page: 'team', icon: UsersRound },
  { label: 'Reports', page: 'reports', icon: BarChart3 },
  { label: 'Settings', page: 'settings', icon: Settings },
]

interface SidebarProps {
  activePage: NavPage
  onNavigate: (page: NavPage) => void
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="flex flex-col w-[220px] min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary">
          <Zap className="w-4 h-4 text-primary-foreground fill-current" />
        </div>
        <span className="text-sm font-semibold text-foreground tracking-tight">Pulse CRM</span>
      </div>

      {/* Workspace switcher */}
      <div className="px-3 pt-3 pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-sidebar-accent text-left transition-colors group">
              <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary">P</span>
              </div>
              <span className="text-xs font-medium text-foreground flex-1 truncate">Pulse Inc.</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>Pulse Inc. <span className="ml-auto text-xs text-muted-foreground">Current</span></DropdownMenuItem>
            <DropdownMenuItem>Acme Workspace</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Create workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-3 overflow-y-auto">
        <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Main</p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ label, page, icon: Icon, badge }) => {
            const isActive = activePage === page
            return (
              <li key={page}>
                <button
                  onClick={() => onNavigate(page)}
                  className={cn(
                    'flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors group',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                  )}
                >
                  <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                  <span className="flex-1 text-left">{label}</span>
                  {badge !== undefined && (
                    <span className={cn(
                      'text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none',
                      isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    )}>
                      {badge}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-3 space-y-0.5">
        <button className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
          <Bell className="w-4 h-4 shrink-0" />
          <span>Notifications</span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
        <button className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Help & Support</span>
        </button>
      </div>

      {/* User profile */}
      <div className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors text-left group">
              <Avatar className="w-7 h-7 shrink-0">
                <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-semibold">AT</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">Alex Turner</p>
                <p className="text-[10px] text-muted-foreground truncate">alex@pulsecrm.io</p>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onNavigate('settings')}>Profile Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-3.5 h-3.5 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
