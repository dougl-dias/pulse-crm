'use client'

import { REVENUE_DATA, PIPELINE_FUNNEL, TEAM_MEMBERS, formatCurrency } from '@/lib/data'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { TrendingUp, DollarSign, Percent, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUMMARY = [
  { label: 'Total Revenue', value: '$892,400', change: '+18%', icon: DollarSign, color: 'text-chart-1 bg-chart-1/10' },
  { label: 'Avg Deal Size', value: '$19,200', change: '+6%', icon: TrendingUp, color: 'text-chart-2 bg-chart-2/10' },
  { label: 'Win Rate', value: '64%', change: '-2%', icon: Percent, color: 'text-chart-3 bg-chart-3/10' },
  { label: 'Quota Attainment', value: '89%', change: '+11%', icon: Users, color: 'text-chart-4 bg-chart-4/10' },
]

const PIE_COLORS = ['oklch(0.60 0.22 264)', 'oklch(0.67 0.17 162)', 'oklch(0.70 0.18 84)', 'oklch(0.64 0.20 303)', 'oklch(0.62 0.23 25)']

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-xl text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-muted-foreground">
          {p.name}: <span className="text-foreground font-medium">{typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function ReportsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map(({ label, value, change, icon: Icon, color }) => {
          const [textCls, bgCls] = color.split(' ')
          return (
            <div key={label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', bgCls)}>
                  <Icon className={cn('w-4 h-4', textCls)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
              <p className="text-xs text-success flex items-center gap-1"><TrendingUp className="w-3 h-3" />{change} vs last quarter</p>
            </div>
          )
        })}
      </div>

      {/* Revenue chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Full year revenue vs target</p>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-border" />Target</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.60 0.22 264)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.60 0.22 264)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.185 0.007 264)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="oklch(0.185 0.007 264)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.185 0.007 264)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'oklch(0.50 0.010 264)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'oklch(0.50 0.010 264)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="target" name="Target" stroke="oklch(0.3 0.007 264)" strokeWidth={1.5} fill="url(#tGrad)" strokeDasharray="4 2" />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="oklch(0.60 0.22 264)" strokeWidth={2} fill="url(#rGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pipeline & Team performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pipeline funnel */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Pipeline Funnel</h3>
          <p className="text-xs text-muted-foreground mb-5">Value by deal stage</p>
          <div className="space-y-3">
            {PIPELINE_FUNNEL.map(({ stage, count, value }, idx) => {
              const pct = Math.round((value / PIPELINE_FUNNEL[0].value) * 100)
              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-medium text-foreground">{stage}</span>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span>{count} deals</span>
                      <span className="font-semibold text-foreground">{formatCurrency(value)}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Deal sources pie */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Deal Sources</h3>
          <p className="text-xs text-muted-foreground mb-2">Where deals originate</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Inbound', value: 38 },
                  { name: 'Outbound', value: 27 },
                  { name: 'Referral', value: 18 },
                  { name: 'Partner', value: 11 },
                  { name: 'Event', value: 6 },
                ]}
                cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                paddingAngle={3} dataKey="value"
              >
                {PIE_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'oklch(0.12 0.006 264)', border: '1px solid oklch(0.185 0.007 264)', borderRadius: '8px', fontSize: '11px' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team performance */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Team Performance</h3>
        <div className="space-y-4">
          {TEAM_MEMBERS.filter(m => m.quota > 0).map(member => {
            const pct = Math.min(Math.round((member.revenue / member.quota) * 100), 100)
            return (
              <div key={member.id} className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-foreground">{member.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">{formatCurrency(member.revenue)} / {formatCurrency(member.quota)}</span>
                      <span className={cn('font-semibold', pct >= 100 ? 'text-success' : pct >= 75 ? 'text-warning' : 'text-danger')}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', pct >= 100 ? 'bg-success' : pct >= 75 ? 'bg-warning' : 'bg-primary')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Breakdown</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              {['Month', 'Revenue', 'Target', 'Variance', '% Attained'].map(h => (
                <th key={h} className="text-left pb-2.5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground first:text-left text-right first:pr-4 last:text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REVENUE_DATA.map(({ month, revenue, target }) => {
              const variance = revenue - target
              const pct = Math.round((revenue / target) * 100)
              return (
                <tr key={month} className="border-b border-border/50 hover:bg-secondary/40 transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-foreground">{month}</td>
                  <td className="py-2.5 text-right font-semibold text-foreground">{formatCurrency(revenue)}</td>
                  <td className="py-2.5 text-right text-muted-foreground">{formatCurrency(target)}</td>
                  <td className={cn('py-2.5 text-right font-medium', variance >= 0 ? 'text-success' : 'text-danger')}>
                    {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                  </td>
                  <td className={cn('py-2.5 text-right font-semibold', pct >= 100 ? 'text-success' : pct >= 90 ? 'text-warning' : 'text-danger')}>
                    {pct}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
