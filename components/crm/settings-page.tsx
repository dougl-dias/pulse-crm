'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { User, Building2, CreditCard, Shield, Bell, Plug, ChevronRight, Check, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

type SettingsTab = 'profile' | 'organization' | 'billing' | 'security' | 'notifications' | 'integrations'

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Plug },
]

const INTEGRATIONS = [
  { name: 'Slack', desc: 'Get deal updates and task reminders in Slack.', connected: true, logo: '💬' },
  { name: 'Gmail', desc: 'Sync emails and track opens with customers.', connected: true, logo: '📧' },
  { name: 'Google Calendar', desc: 'Sync meetings and calls automatically.', connected: false, logo: '📅' },
  { name: 'HubSpot', desc: 'Bi-directional sync with HubSpot CRM.', connected: false, logo: '🔶' },
  { name: 'Zapier', desc: 'Connect to 5,000+ apps with no-code automations.', connected: false, logo: '⚡' },
  { name: 'Stripe', desc: 'Pull invoice and subscription data into deals.', connected: false, logo: '💳' },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Settings sidebar */}
      <div className="w-52 border-r border-border bg-secondary/20 p-4 shrink-0">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-2">Settings</p>
        <nav className="space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-sm transition-colors',
                activeTab === id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {activeTab === id && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-8 max-w-2xl">
        {/* Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Profile</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your personal account information.</p>
            </div>
            <Separator />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">AT</div>
              <div>
                <Button variant="outline" size="sm" className="h-8 text-xs border-border">Change photo</Button>
                <p className="text-[11px] text-muted-foreground mt-1.5">JPG, GIF or PNG. Max size 2MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">First name</Label>
                <Input defaultValue="Alex" className="h-9 bg-secondary border-border text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Last name</Label>
                <Input defaultValue="Turner" className="h-9 bg-secondary border-border text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Email address</Label>
              <Input defaultValue="alex@pulsecrm.io" type="email" className="h-9 bg-secondary border-border text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Job title</Label>
              <Input defaultValue="Head of Sales" className="h-9 bg-secondary border-border text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Bio</Label>
              <Textarea defaultValue="Building and scaling enterprise sales teams." className="bg-secondary border-border text-sm resize-none" rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Timezone</Label>
              <Select defaultValue="america-los_angeles">
                <SelectTrigger className="h-9 bg-secondary border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-los_angeles">Pacific Time (US & Canada)</SelectItem>
                  <SelectItem value="america-new_york">Eastern Time (US & Canada)</SelectItem>
                  <SelectItem value="europe-london">London</SelectItem>
                  <SelectItem value="europe-berlin">Berlin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SaveButton onSave={handleSave} saved={saved} />
          </div>
        )}

        {/* Organization */}
        {activeTab === 'organization' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Organization</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your workspace settings.</p>
            </div>
            <Separator />
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Organization name</Label>
              <Input defaultValue="Pulse Inc." className="h-9 bg-secondary border-border text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Workspace URL</Label>
              <div className="flex">
                <span className="flex items-center px-3 text-xs text-muted-foreground bg-muted border border-r-0 border-border rounded-l-md">pulsecrm.io/</span>
                <Input defaultValue="pulse-inc" className="h-9 bg-secondary border-border text-sm rounded-l-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Industry</Label>
              <Select defaultValue="saas">
                <SelectTrigger className="h-9 bg-secondary border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS / Software</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Company size</Label>
              <Select defaultValue="11-50">
                <SelectTrigger className="h-9 bg-secondary border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <SelectItem key={s} value={s}>{s} employees</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
              <h3 className="text-sm font-semibold text-danger mb-1">Danger Zone</h3>
              <p className="text-xs text-muted-foreground mb-3">Permanently delete this workspace and all its data. This action cannot be undone.</p>
              <Button variant="outline" size="sm" className="h-8 text-xs border-danger/40 text-danger hover:bg-danger/10">
                Delete workspace
              </Button>
            </div>
          </div>
        )}

        {/* Billing */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Billing</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your subscription and payment methods.</p>
            </div>
            <Separator />
            {/* Current plan */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-foreground">Professional Plan</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">Active</span>
                  </div>
                  <p className="text-xs text-muted-foreground">$79/user/month · 5 users · Billed monthly</p>
                  <p className="text-xs text-muted-foreground mt-1">Next renewal: July 1, 2024</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs border-border shrink-0">Upgrade plan</Button>
              </div>
              <Separator className="my-4" />
              <div className="flex gap-6 text-xs">
                <div><p className="text-muted-foreground">Monthly cost</p><p className="font-bold text-foreground text-base mt-0.5">$395</p></div>
                <div><p className="text-muted-foreground">Users</p><p className="font-bold text-foreground text-base mt-0.5">5 / unlimited</p></div>
                <div><p className="text-muted-foreground">Contacts</p><p className="font-bold text-foreground text-base mt-0.5">284 / 50K</p></div>
              </div>
            </div>
            {/* Payment method */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Payment Method</h3>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-white">VISA</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">•••• •••• •••• 4242</p>
                  <p className="text-[11px] text-muted-foreground">Expires 12/26</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Replace</Button>
              </div>
            </div>
            {/* Invoices */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Recent Invoices</h3>
              {[
                { date: 'Jun 1, 2024', amount: '$395.00', status: 'Paid' },
                { date: 'May 1, 2024', amount: '$395.00', status: 'Paid' },
                { date: 'Apr 1, 2024', amount: '$316.00', status: 'Paid' },
              ].map(inv => (
                <div key={inv.date} className="flex items-center gap-4 p-3.5 rounded-xl border border-border bg-card">
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">{inv.date}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{inv.amount}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">{inv.status}</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Download</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Security</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your account security and access.</p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-foreground">Change Password</h3>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Current password</Label>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} defaultValue="••••••••" className="h-9 bg-secondary border-border text-sm pr-10" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(s => !s)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">New password</Label>
                  <Input type="password" placeholder="Min 8 characters" className="h-9 bg-secondary border-border text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Confirm new password</Label>
                  <Input type="password" placeholder="Repeat password" className="h-9 bg-secondary border-border text-sm" />
                </div>
              </div>
              <Button size="sm" className="h-9 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">Update password</Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-foreground">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                <div>
                  <p className="text-sm font-medium text-foreground">Authenticator app</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Use an authenticator app to generate one-time codes.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                <div>
                  <p className="text-sm font-medium text-foreground">SMS authentication</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Receive codes via SMS to +1 ••• ••• 5678.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-foreground">Active Sessions</h3>
              {[
                { device: 'MacBook Pro · Chrome', location: 'San Francisco, CA', time: 'Current session', current: true },
                { device: 'iPhone 15 · Safari', location: 'San Francisco, CA', time: '2 hours ago', current: false },
                { device: 'Windows PC · Edge', location: 'New York, NY', time: '3 days ago', current: false },
              ].map(session => (
                <div key={session.device} className="flex items-center gap-4 p-3.5 rounded-xl border border-border bg-card">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{session.device}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{session.location} · {session.time}</p>
                  </div>
                  {session.current
                    ? <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">Current</span>
                    : <Button variant="ghost" size="sm" className="h-7 text-xs text-danger hover:text-danger">Revoke</Button>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Notifications</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Choose what you want to be notified about.</p>
            </div>
            <Separator />
            {[
              { category: 'Deals', items: [
                { label: 'Deal stage changed', desc: 'When a deal moves to a new stage.', enabled: true },
                { label: 'Deal won or lost', desc: 'When a deal is closed.', enabled: true },
                { label: 'Deal assigned to you', desc: 'When a deal is assigned to your account.', enabled: true },
              ]},
              { category: 'Tasks', items: [
                { label: 'Task due reminder', desc: 'Reminder 1 day before task is due.', enabled: true },
                { label: 'Task assigned to you', desc: 'When a task is assigned to you.', enabled: false },
              ]},
              { category: 'Team', items: [
                { label: 'New team member joins', desc: 'When someone accepts an invite.', enabled: false },
                { label: 'Mention in note', desc: 'When someone @mentions you.', enabled: true },
              ]},
            ].map(({ category, items }) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <SaveButton onSave={handleSave} saved={saved} />
          </div>
        )}

        {/* Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Integrations</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Connect your favorite tools to Pulse CRM.</p>
            </div>
            <Separator />
            <div className="space-y-3">
              {INTEGRATIONS.map(({ name, desc, connected }) => (
                <div key={name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0 border border-border">
                    {name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Button
                    variant={connected ? 'outline' : 'default'}
                    size="sm"
                    className={cn(
                      'h-8 text-xs shrink-0',
                      connected
                        ? 'border-success/40 text-success hover:bg-success/10 bg-success/5'
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    )}
                  >
                    {connected ? <><Check className="w-3 h-3 mr-1.5" />Connected</> : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SaveButton({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <Button
      size="sm"
      className={cn('h-9 text-xs transition-colors gap-1.5', saved ? 'bg-success hover:bg-success text-success-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground')}
      onClick={onSave}
    >
      {saved ? <><Check className="w-3.5 h-3.5" /> Saved</> : 'Save changes'}
    </Button>
  )
}
