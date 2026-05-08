'use client'

import { REVENUE_DATA, ACTIVITIES, DEALS, CUSTOMERS, formatCurrency, getStageColor, getAvatarColor } from '@/lib/data'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, TrendingDown, Users, Handshake, DollarSign, Target, Phone, Mail, CalendarDays, FileText, CheckCircle2, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { NavPage } from '@/lib/data'
import { cn } from '@/lib/utils'

const KPI_CARDS = [
  { label: 'Total Revenue', value: '$892,400', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'text-chart-1' },
  { label: 'Active Deals', value: '47', change: '+12.5%', trend: 'up', icon: Handshake, color: 'text-chart-2' },
  { label: 'Total Customers', value: '284', change: '+8.1%', trend: 'up', icon: Users, color: 'text-chart-3' },
  { label: 'Win Rate', value: '64%', change: '-2.3%', trend: 'down', icon: Target, color: 'text-chart-4' },
]

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  call: Phone, email: Mail, meeting: CalendarDays, note: FileText, deal: Handshake, task: CheckCircle2,
}

const ACTIVITY_COLORS: Record<string, string> = {
  call: 'bg-chart-2/15 text-chart-2',
  email: 'bg-chart-1/15 text-chart-1',
  meeting: 'bg-chart-3/15 text-chart-3',
  note: 'bg-chart-4/15 text-chart-4',
  deal: 'bg-success/15 text-success',
  task: 'bg-warning/15 text-warning',
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-xl text-xs">
      <p className="font-medium text-foreground mb-1.5">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-muted-foreground">
          <span className="capitalize">{p.name}</span>: <span className="text-foreground font-medium">{formatCurrency(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

interface DashboardPageProps {
  onNavigate: (page: NavPage) => void
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const recentDeals = DEALS.slice(0, 5)
  const topCustomers = [...CUSTOMERS].sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map(({ label, value, change, trend, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', `${color.replace('text-', 'bg-')}/10`)}>
                <Icon className={cn('w-4 h-4', color)} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-success" />
              ) : (
                <TrendingDown className="w-3 h-3 text-danger" />
              )}
              <span className={cn('text-xs font-medium', trend === 'up' ? 'text-success' : 'text-danger')}>{change}</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue vs target</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-border inline-block" />Target</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.60 0.22 264)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="oklch(0.60 0.22 264)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.185 0.007 264)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'oklch(0.50 0.010 264)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'oklch(0.50 0.010 264)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="target" stroke="oklch(0.185 0.007 264)" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="revenue" stroke="oklch(0.60 0.22 264)" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stage breakdown */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Pipeline by Stage</h3>
          <p className="text-xs text-muted-foreground mb-5">Deal count per stage</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { stage: 'Lead', count: 14 },
              { stage: 'Qualified', count: 9 },
              { stage: 'Proposal', count: 6 },
              { stage: 'Neg.', count: 4 },
              { stage: 'Won', count: 7 },
            ]} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.185 0.007 264)" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 9, fill: 'oklch(0.50 0.010 264)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: 'oklch(0.50 0.010 264)' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'oklch(0.155 0.006 264)' }} contentStyle={{ background: 'oklch(0.12 0.006 264)', border: '1px solid oklch(0.185 0.007 264)', borderRadius: '8px', fontSize: '11px' }} />
              <Bar dataKey="count" fill="oklch(0.60 0.22 264)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent deals */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Recent Deals</h3>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary/80 gap-1 px-2" onClick={() => onNavigate('deals')}>
              View all <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            {recentDeals.map(deal => (
              <div key={deal.id} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-secondary/60 transition-colors cursor-pointer group">
                <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0', getAvatarColor(deal.ownerAvatar))}>
                  {deal.ownerAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{deal.title}</p>
                  <p className="text-[11px] text-muted-foreground">{deal.customer}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-foreground">{formatCurrency(deal.value)}</p>
                  <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', getStageColor(deal.stage))}>{deal.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Activity Feed</h3>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
            {ACTIVITIES.map(activity => {
              const Icon = ACTIVITY_ICONS[activity.type] ?? FileText
              const color = ACTIVITY_COLORS[activity.type] ?? 'bg-muted text-muted-foreground'
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5', color)}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground leading-snug">{activity.title}</p>
                    {activity.customer && (
                      <p className="text-[11px] text-primary mt-0.5">{activity.customer}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top customers table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Top Customers by Revenue</h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary/80 gap-1 px-2" onClick={() => onNavigate('customers')}>
            View all <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pb-2.5">Customer</th>
              <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pb-2.5">Company</th>
              <th className="text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pb-2.5">Revenue</th>
              <th className="text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pb-2.5">Deals</th>
              <th className="text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider pb-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map(c => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer" onClick={() => onNavigate('customer-profile')}>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0', getAvatarColor(c.avatar))}>
                      {c.avatar}
                    </div>
                    <span className="text-xs font-medium text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-xs text-muted-foreground">{c.company}</td>
                <td className="py-3 pr-4 text-xs font-semibold text-foreground text-right">{formatCurrency(c.revenue)}</td>
                <td className="py-3 pr-4 text-xs text-muted-foreground text-right">{c.deals}</td>
                <td className="py-3 text-right">
                  <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0.5 border-0', `bg-${c.status === 'active' ? 'success' : c.status === 'prospect' ? 'info' : 'muted'}/15`)} >
                    <span className={c.status === 'active' ? 'text-success' : c.status === 'prospect' ? 'text-info' : 'text-muted-foreground'}>
                      {c.status}
                    </span>
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
