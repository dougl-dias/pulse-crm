'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Zap, ArrowRight, BarChart3, Users, GitFork, CheckSquare,
  Star, Shield, Globe, TrendingUp, Play,
} from 'lucide-react'
import type { NavPage } from '@/lib/data'

const FEATURES = [
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Real-time dashboards with revenue forecasting, funnel analysis, and custom reports.' },
  { icon: Users, title: 'Customer Intelligence', desc: 'Unified customer profiles with full interaction history, notes, and deal timelines.' },
  { icon: GitFork, title: 'Visual Pipeline', desc: 'Drag-and-drop Kanban boards to manage every deal across custom stages.' },
  { icon: CheckSquare, title: 'Task Automation', desc: 'Automate follow-ups, reminders, and sequences so nothing falls through the cracks.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II certified with SSO, RBAC, and audit logs for complete compliance.' },
  { icon: Globe, title: 'Global Integrations', desc: 'Connect to 500+ tools including Slack, HubSpot, Salesforce, and your entire stack.' },
]

const TESTIMONIALS = [
  {
    quote: 'Pulse CRM transformed how our team manages deals. We closed 40% more revenue in Q1 alone.',
    name: 'James Wilson',
    role: 'VP of Sales, Stark Industries',
    avatar: 'JW',
    rating: 5,
  },
  {
    quote: 'The pipeline view is incredible. Our sales cycle dropped from 45 days to 28 days after switching.',
    name: 'Sarah Johnson',
    role: 'Head of Growth, Acme Corp',
    avatar: 'SJ',
    rating: 5,
  },
  {
    quote: 'Finally a CRM that doesn\'t require a PhD to use. Onboarding took an afternoon, ROI was immediate.',
    name: 'Marcus Chen',
    role: 'CEO, Globex Inc',
    avatar: 'MC',
    rating: 5,
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$29',
    period: '/user/mo',
    desc: 'Perfect for small teams getting started.',
    features: ['Up to 5 users', '500 contacts', 'Basic pipeline', 'Email integration', 'Standard reports'],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/user/mo',
    desc: 'For growing sales teams that need more power.',
    features: ['Unlimited users', '50,000 contacts', 'Advanced pipeline', 'All integrations', 'Custom reports', 'Priority support', 'AI insights'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Dedicated infrastructure for large organizations.',
    features: ['Unlimited everything', 'SSO & SCIM', 'Custom SLA', 'Dedicated CSM', 'SOC 2 compliance', 'On-premise option', 'Custom contracts'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

interface LandingPageProps {
  onNavigate: (page: NavPage) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground fill-current" />
            </div>
            <span className="text-sm font-semibold">Pulse CRM</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 flex-1">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Customers</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
          </nav>
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => onNavigate('login')}>
              Sign in
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => onNavigate('login')}>
              Get started free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs px-3 py-1">
            Now with AI-powered deal scoring
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance mb-6">
            The CRM that helps<br />
            <span className="text-primary">sales teams close more.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 text-balance">
            Pulse CRM brings your pipeline, customers, tasks and analytics into one beautiful workspace built for modern sales teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 h-12 text-sm font-medium"
              onClick={() => onNavigate('login')}
            >
              Start for free — no credit card <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 h-12 text-sm border-border text-foreground hover:bg-secondary"
              onClick={() => onNavigate('dashboard')}
            >
              <Play className="w-4 h-4 text-primary" /> View live demo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-5">
            Trusted by 2,400+ sales teams · 14-day free trial · No setup fees
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-5xl mx-auto mt-16 rounded-xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-secondary/50">
            <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">pulsecrm.io/dashboard</span>
          </div>
          <div className="p-8 grid grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: '$892K', change: '+18%' },
              { label: 'Active Deals', value: '47', change: '+12%' },
              { label: 'Win Rate', value: '64%', change: '+5%' },
              { label: 'Avg Deal Size', value: '$19K', change: '+8%' },
            ].map(({ label, value, change }) => (
              <div key={label} className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground mb-2">{label}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-success mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />{change} vs last mo
                </p>
              </div>
            ))}
          </div>
          <div className="px-8 pb-8">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Revenue Overview</span>
                <span className="text-xs text-muted-foreground">Last 12 months</span>
              </div>
              <div className="flex items-end gap-2 h-24">
                {[48, 52, 61, 58, 74, 82, 78, 91, 104, 99, 118, 126].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-primary/30 hover:bg-primary/60 transition-colors"
                    style={{ height: `${(v / 126) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                  <span key={m} className="text-[9px] text-muted-foreground">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-10 border-y border-border bg-secondary/20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs text-muted-foreground mb-8 uppercase tracking-widest font-medium">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['Acme Corp', 'Globex Inc', 'Umbrella Ltd', 'Stark Industries', 'Wayne Enterprises'].map(name => (
              <span key={name} className="text-sm font-semibold text-muted-foreground/50">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground text-xs">Features</Badge>
            <h2 className="text-4xl font-bold text-foreground tracking-tight mb-4">Everything you need to sell smarter</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Stop juggling spreadsheets and disconnected tools. Pulse CRM brings it all together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground text-xs">Testimonials</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Loved by sales teams</h2>
            <p className="text-lg text-muted-foreground">Join thousands of sales professionals who rely on Pulse every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, avatar, rating }) => (
              <div key={name} className="p-6 rounded-xl border border-border bg-card flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">{avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{name}</p>
                    <p className="text-[11px] text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground text-xs">Pricing</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground">Start free, scale as you grow. No hidden fees, ever.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(({ name, price, period, desc, features, cta, highlighted }) => (
              <div
                key={name}
                className={`p-6 rounded-xl border flex flex-col ${
                  highlighted
                    ? 'border-primary bg-primary/5 relative'
                    : 'border-border bg-card'
                }`}
              >
                {highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-[10px] px-2">Most popular</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-foreground">{price}</span>
                    <span className="text-sm text-muted-foreground">{period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${highlighted ? 'bg-primary' : 'bg-success'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full text-sm h-10 ${highlighted ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border'}`}
                  onClick={() => onNavigate('login')}
                >
                  {cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to close more deals?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join 2,400+ sales teams. Start your 14-day free trial today.</p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 h-12 text-sm"
            onClick={() => onNavigate('login')}
          >
            Get started for free <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground fill-current" />
            </div>
            <span className="text-sm font-semibold">Pulse CRM</span>
          </div>
          <p className="text-xs text-muted-foreground">2024 Pulse CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
