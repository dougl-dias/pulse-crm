'use client'

import { useState } from 'react'
import { CUSTOMERS, DEALS, TASKS, ACTIVITIES, formatCurrency, getStageColor, getStatusColor, getAvatarColor } from '@/lib/data'
import type { NavPage } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  ArrowLeft, Mail, Phone, MapPin, Building2, Globe, Calendar,
  Plus, MoreHorizontal, Paperclip, FileText, CheckCircle2, Handshake,
  MessageSquare, PhoneCall, CalendarDays, Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

const customer = CUSTOMERS[0] // Using first customer as demo
const customerDeals = DEALS.filter(d => d.customerId === customer.id)
const customerTasks = TASKS.filter(t => t.customer === customer.company)
const customerActivities = ACTIVITIES.filter(a => a.customer === customer.company)

const ATTACHMENTS = [
  { name: 'Proposal_AcmeCorp_v3.pdf', size: '2.4 MB', date: '2 days ago', type: 'pdf' },
  { name: 'Contract_Draft.docx', size: '890 KB', date: '1 week ago', type: 'doc' },
  { name: 'Meeting_Notes_Q2.txt', size: '12 KB', date: '2 weeks ago', type: 'txt' },
]

const NOTES_LIST = [
  { id: 'n1', author: 'Alex Turner', avatar: 'AT', content: 'Sarah confirmed they are evaluating 3 vendors. We are top 2. Main concern is data migration. Schedule a technical deep-dive call next week.', timestamp: '2 hours ago' },
  { id: 'n2', author: 'Sarah Mills', avatar: 'SM', content: 'Budget approved for Q2 — up to $60K. Decision maker is CTO Marcus. Prefers async communication via email.', timestamp: '3 days ago' },
]

const ACTIVITY_ICONS: Record<string, React.ElementType> = {
  call: PhoneCall, email: Mail, meeting: CalendarDays, note: MessageSquare, deal: Handshake, task: CheckCircle2,
}
const ACTIVITY_COLORS: Record<string, string> = {
  call: 'bg-chart-2/15 text-chart-2', email: 'bg-chart-1/15 text-chart-1',
  meeting: 'bg-chart-3/15 text-chart-3', note: 'bg-chart-4/15 text-chart-4',
  deal: 'bg-success/15 text-success', task: 'bg-warning/15 text-warning',
}

interface CustomerProfilePageProps {
  onNavigate: (page: NavPage) => void
}

export function CustomerProfilePage({ onNavigate }: CustomerProfilePageProps) {
  const [note, setNote] = useState('')

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Profile header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <button
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
          onClick={() => onNavigate('customers')}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Customers
        </button>
        <div className="flex items-start gap-5">
          <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0', getAvatarColor(customer.avatar))}>
            {customer.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-foreground">{customer.name}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{customer.company} · {customer.industry}</p>
              </div>
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', getStatusColor(customer.status))}>
                {customer.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{customer.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{customer.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{customer.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Customer since {new Date(customer.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="h-9 gap-1.5 border-border text-sm">
              <Mail className="w-3.5 h-3.5" /> Email
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1.5 border-border text-sm">
              <Phone className="w-3.5 h-3.5" /> Call
            </Button>
            <Button size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
              <Plus className="w-3.5 h-3.5" /> New Deal
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          {[
            { label: 'Total Revenue', value: formatCurrency(customer.revenue) },
            { label: 'Active Deals', value: customerDeals.filter(d => !d.stage.includes('Closed')).length },
            { label: 'Total Deals', value: customer.deals },
            { label: 'Last Contact', value: customer.lastContact },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-3.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className="text-lg font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="p-6">
        <Tabs defaultValue="timeline">
          <TabsList className="bg-secondary border border-border h-9 p-1 mb-5">
            {['timeline', 'deals', 'tasks', 'notes', 'attachments'].map(tab => (
              <TabsTrigger key={tab} value={tab} className="text-xs capitalize h-7 px-3 data-[state=active]:bg-background data-[state=active]:text-foreground">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-1 mt-0">
            {customerActivities.length === 0 ? (
              <EmptyState icon={Clock} title="No activity yet" desc="Interactions with this customer will appear here." />
            ) : (
              <div className="relative">
                <div className="absolute left-[17px] top-3 bottom-3 w-px bg-border" />
                <div className="space-y-4">
                  {customerActivities.map(activity => {
                    const Icon = ACTIVITY_ICONS[activity.type] ?? FileText
                    const color = ACTIVITY_COLORS[activity.type] ?? 'bg-muted text-muted-foreground'
                    return (
                      <div key={activity.id} className="flex gap-4 relative">
                        <div className={cn('w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10', color)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 rounded-xl border border-border bg-card p-4">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <span className="text-[11px] text-muted-foreground shrink-0">{activity.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-2.5">
                            <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold', getAvatarColor(activity.userAvatar))}>
                              {activity.userAvatar}
                            </div>
                            <span className="text-[11px] text-muted-foreground">{activity.user}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Deals */}
          <TabsContent value="deals" className="mt-0">
            {customerDeals.length === 0 ? (
              <EmptyState icon={Handshake} title="No deals yet" desc="Create a deal to start tracking this opportunity." action="New Deal" />
            ) : (
              <div className="space-y-2">
                {customerDeals.map(deal => (
                  <div key={deal.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{deal.title}</p>
                        <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', getStageColor(deal.stage))}>{deal.stage}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Owner: {deal.owner} · Close date: {deal.closeDate}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">{formatCurrency(deal.value)}</p>
                      <p className="text-xs text-muted-foreground">{deal.probability}% probability</p>
                    </div>
                    <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tasks */}
          <TabsContent value="tasks" className="mt-0">
            {customerTasks.length === 0 ? (
              <EmptyState icon={CheckCircle2} title="No tasks" desc="Add tasks to stay on top of this account." action="New Task" />
            ) : (
              <div className="space-y-2">
                {customerTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                    <div className={cn('w-2 h-2 rounded-full shrink-0', task.status === 'done' ? 'bg-success' : task.status === 'in-progress' ? 'bg-primary' : 'bg-border')} />
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium', task.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground')}>{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Due {task.dueDate} · {task.assignee}</p>
                    </div>
                    <Badge variant="outline" className={cn('text-[10px] border-0', getStatusColor(task.status))}>{task.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Notes */}
          <TabsContent value="notes" className="mt-0 space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <Textarea
                placeholder="Add a note about this customer..."
                value={note}
                onChange={e => setNote(e.target.value)}
                className="bg-transparent border-0 p-0 text-sm resize-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground min-h-20"
              />
              <div className="flex justify-end mt-3 pt-3 border-t border-border">
                <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!note.trim()}>
                  Save Note
                </Button>
              </div>
            </div>
            {NOTES_LIST.map(n => (
              <div key={n.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold', getAvatarColor(n.avatar))}>
                    {n.avatar}
                  </div>
                  <span className="text-xs font-medium text-foreground">{n.author}</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">{n.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.content}</p>
              </div>
            ))}
          </TabsContent>

          {/* Attachments */}
          <TabsContent value="attachments" className="mt-0">
            <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-8 text-center mb-4 hover:bg-secondary/40 transition-colors cursor-pointer">
              <Paperclip className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground font-medium">Drop files here to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, PNG up to 50MB</p>
            </div>
            <div className="space-y-2">
              {ATTACHMENTS.map(file => (
                <div key={file.name} className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size} · {file.date}</p>
                  </div>
                  <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EmptyState({ icon: Icon, title, desc, action }: { icon: React.ElementType; title: string; desc: string; action?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
      {action && (
        <Button size="sm" className="mt-1 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
          <Plus className="w-3.5 h-3.5" />{action}
        </Button>
      )}
    </div>
  )
}
