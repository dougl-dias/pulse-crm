// ─── Types ──────────────────────────────────────────────────────────────────

export type NavPage =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'customers'
  | 'customer-profile'
  | 'deals'
  | 'pipeline'
  | 'tasks'
  | 'team'
  | 'reports'
  | 'settings'

export type DealStage = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost'
export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'cancelled'
export type TeamRole = 'Admin' | 'Manager' | 'Sales Rep' | 'Support' | 'Viewer'

export interface Customer {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: 'active' | 'inactive' | 'prospect' | 'churned'
  revenue: number
  deals: number
  lastContact: string
  avatar: string
  location: string
  industry: string
  joinedAt: string
}

export interface Deal {
  id: string
  title: string
  customer: string
  customerId: string
  value: number
  stage: DealStage
  probability: number
  owner: string
  ownerAvatar: string
  closeDate: string
  createdAt: string
  priority: Priority
  tags: string[]
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assignee: string
  assigneeAvatar: string
  dueDate: string
  customer?: string
  deal?: string
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamRole
  avatar: string
  status: 'active' | 'invited' | 'suspended'
  deals: number
  revenue: number
  quota: number
  lastActive: string
  joinedAt: string
}

export interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'note' | 'deal' | 'task'
  title: string
  description: string
  user: string
  userAvatar: string
  customer?: string
  timestamp: string
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Sarah Johnson', email: 'sarah@acmecorp.com', company: 'Acme Corp', phone: '+1 (555) 234-5678', status: 'active', revenue: 128000, deals: 4, lastContact: '2 hours ago', avatar: 'SJ', location: 'San Francisco, CA', industry: 'Technology', joinedAt: '2023-03-12' },
  { id: 'c2', name: 'Marcus Chen', email: 'marcus@globex.io', company: 'Globex Inc', phone: '+1 (555) 345-6789', status: 'active', revenue: 94500, deals: 3, lastContact: '1 day ago', avatar: 'MC', location: 'New York, NY', industry: 'Finance', joinedAt: '2023-05-20' },
  { id: 'c3', name: 'Elena Rodriguez', email: 'elena@initech.co', company: 'Initech', phone: '+1 (555) 456-7890', status: 'prospect', revenue: 0, deals: 1, lastContact: '3 days ago', avatar: 'ER', location: 'Austin, TX', industry: 'SaaS', joinedAt: '2024-01-08' },
  { id: 'c4', name: 'David Kim', email: 'david@umbrella.com', company: 'Umbrella Ltd', phone: '+1 (555) 567-8901', status: 'active', revenue: 215000, deals: 7, lastContact: '5 hours ago', avatar: 'DK', location: 'Seattle, WA', industry: 'Healthcare', joinedAt: '2022-11-15' },
  { id: 'c5', name: 'Priya Patel', email: 'priya@wayne.enterprises', company: 'Wayne Enterprises', phone: '+1 (555) 678-9012', status: 'inactive', revenue: 45200, deals: 2, lastContact: '2 weeks ago', avatar: 'PP', location: 'Chicago, IL', industry: 'Manufacturing', joinedAt: '2023-07-30' },
  { id: 'c6', name: 'James Wilson', email: 'james@stark.industries', company: 'Stark Industries', phone: '+1 (555) 789-0123', status: 'active', revenue: 380000, deals: 9, lastContact: '30 minutes ago', avatar: 'JW', location: 'Los Angeles, CA', industry: 'Aerospace', joinedAt: '2022-08-05' },
  { id: 'c7', name: 'Olivia Brown', email: 'olivia@hooli.com', company: 'Hooli', phone: '+1 (555) 890-1234', status: 'churned', revenue: 12000, deals: 1, lastContact: '1 month ago', avatar: 'OB', location: 'Palo Alto, CA', industry: 'Technology', joinedAt: '2023-02-14' },
  { id: 'c8', name: 'Noah Davis', email: 'noah@piedpiper.com', company: 'Pied Piper', phone: '+1 (555) 901-2345', status: 'prospect', revenue: 0, deals: 2, lastContact: '4 days ago', avatar: 'ND', location: 'San Jose, CA', industry: 'SaaS', joinedAt: '2024-02-22' },
]

export const DEALS: Deal[] = [
  { id: 'd1', title: 'Enterprise Platform License', customer: 'Acme Corp', customerId: 'c1', value: 48000, stage: 'Proposal', probability: 65, owner: 'Alex Turner', ownerAvatar: 'AT', closeDate: '2024-06-30', createdAt: '2024-03-01', priority: 'high', tags: ['Enterprise', 'Annual'] },
  { id: 'd2', title: 'Analytics Suite Upgrade', customer: 'Globex Inc', customerId: 'c2', value: 22500, stage: 'Negotiation', probability: 80, owner: 'Sarah Mills', ownerAvatar: 'SM', closeDate: '2024-06-15', createdAt: '2024-02-15', priority: 'medium', tags: ['Upgrade', 'Q2'] },
  { id: 'd3', title: 'CRM Implementation', customer: 'Initech', customerId: 'c3', value: 15000, stage: 'Qualified', probability: 40, owner: 'Alex Turner', ownerAvatar: 'AT', closeDate: '2024-07-15', createdAt: '2024-03-10', priority: 'medium', tags: ['New'] },
  { id: 'd4', title: 'Security Audit & Compliance', customer: 'Umbrella Ltd', customerId: 'c4', value: 95000, stage: 'Closed Won', probability: 100, owner: 'Jordan Lee', ownerAvatar: 'JL', closeDate: '2024-05-01', createdAt: '2024-01-20', priority: 'urgent', tags: ['Compliance', 'Security'] },
  { id: 'd5', title: 'Cloud Migration Project', customer: 'Wayne Enterprises', customerId: 'c5', value: 67000, stage: 'Proposal', probability: 55, owner: 'Sarah Mills', ownerAvatar: 'SM', closeDate: '2024-08-01', createdAt: '2024-03-05', priority: 'high', tags: ['Cloud', 'Migration'] },
  { id: 'd6', title: 'AI Integration Package', customer: 'Stark Industries', customerId: 'c6', value: 142000, stage: 'Lead', probability: 20, owner: 'Jordan Lee', ownerAvatar: 'JL', closeDate: '2024-09-30', createdAt: '2024-04-01', priority: 'low', tags: ['AI', 'Innovation'] },
  { id: 'd7', title: 'Support Contract Renewal', customer: 'Acme Corp', customerId: 'c1', value: 28000, stage: 'Closed Won', probability: 100, owner: 'Alex Turner', ownerAvatar: 'AT', closeDate: '2024-04-30', createdAt: '2024-02-01', priority: 'medium', tags: ['Renewal', 'Support'] },
  { id: 'd8', title: 'Marketing Automation', customer: 'Pied Piper', customerId: 'c8', value: 19500, stage: 'Qualified', probability: 45, owner: 'Sarah Mills', ownerAvatar: 'SM', closeDate: '2024-07-30', createdAt: '2024-03-20', priority: 'medium', tags: ['Marketing'] },
  { id: 'd9', title: 'Data Warehouse Setup', customer: 'Globex Inc', customerId: 'c2', value: 55000, stage: 'Negotiation', probability: 75, owner: 'Jordan Lee', ownerAvatar: 'JL', closeDate: '2024-06-20', createdAt: '2024-02-28', priority: 'high', tags: ['Data', 'Infrastructure'] },
  { id: 'd10', title: 'Training & Onboarding', customer: 'Initech', customerId: 'c3', value: 8500, stage: 'Closed Lost', probability: 0, owner: 'Alex Turner', ownerAvatar: 'AT', closeDate: '2024-05-15', createdAt: '2024-03-15', priority: 'low', tags: ['Training'] },
]

export const TASKS: Task[] = [
  { id: 't1', title: 'Follow up with Acme Corp on proposal', description: 'Send revised pricing and address their concerns about data security.', status: 'todo', priority: 'high', assignee: 'Alex Turner', assigneeAvatar: 'AT', dueDate: '2024-06-10', customer: 'Acme Corp', deal: 'Enterprise Platform License', createdAt: '2024-06-05' },
  { id: 't2', title: 'Prepare Q2 sales report', description: 'Compile deal wins, losses, and pipeline forecast for the board presentation.', status: 'in-progress', priority: 'urgent', assignee: 'Sarah Mills', assigneeAvatar: 'SM', dueDate: '2024-06-12', createdAt: '2024-06-04' },
  { id: 't3', title: 'Schedule demo for Wayne Enterprises', description: 'Book a 60-minute product demonstration with their VP of Operations.', status: 'todo', priority: 'medium', assignee: 'Jordan Lee', assigneeAvatar: 'JL', dueDate: '2024-06-14', customer: 'Wayne Enterprises', createdAt: '2024-06-06' },
  { id: 't4', title: 'Contract review for Umbrella security deal', description: 'Legal review completed, need final sign-off from both parties.', status: 'done', priority: 'urgent', assignee: 'Jordan Lee', assigneeAvatar: 'JL', dueDate: '2024-05-01', customer: 'Umbrella Ltd', deal: 'Security Audit & Compliance', createdAt: '2024-04-20' },
  { id: 't5', title: 'Update CRM data for Globex account', description: 'Refresh contact information and meeting notes after last week\'s call.', status: 'in-progress', priority: 'low', assignee: 'Alex Turner', assigneeAvatar: 'AT', dueDate: '2024-06-11', customer: 'Globex Inc', createdAt: '2024-06-07' },
  { id: 't6', title: 'Onboarding call with Stark Industries', description: 'Initial discovery call to understand their AI integration requirements.', status: 'todo', priority: 'high', assignee: 'Sarah Mills', assigneeAvatar: 'SM', dueDate: '2024-06-13', customer: 'Stark Industries', deal: 'AI Integration Package', createdAt: '2024-06-05' },
  { id: 't7', title: 'Send product roadmap to Pied Piper', description: 'Share the 2024 H2 roadmap PDF and schedule a follow-up Q&A session.', status: 'todo', priority: 'medium', assignee: 'Jordan Lee', assigneeAvatar: 'JL', dueDate: '2024-06-15', customer: 'Pied Piper', createdAt: '2024-06-06' },
  { id: 't8', title: 'Renew support license for Acme Corp', description: 'Support contract expires June 30. Process renewal paperwork.', status: 'in-progress', priority: 'high', assignee: 'Alex Turner', assigneeAvatar: 'AT', dueDate: '2024-06-20', customer: 'Acme Corp', createdAt: '2024-06-01' },
]

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'm1', name: 'Alex Turner', email: 'alex@pulsecrm.io', role: 'Admin', avatar: 'AT', status: 'active', deals: 12, revenue: 284000, quota: 300000, lastActive: '2 minutes ago', joinedAt: '2022-01-15' },
  { id: 'm2', name: 'Sarah Mills', email: 'sarah@pulsecrm.io', role: 'Manager', avatar: 'SM', status: 'active', deals: 9, revenue: 198500, quota: 250000, lastActive: '15 minutes ago', joinedAt: '2022-04-10' },
  { id: 'm3', name: 'Jordan Lee', email: 'jordan@pulsecrm.io', role: 'Sales Rep', avatar: 'JL', status: 'active', deals: 15, revenue: 342000, quota: 350000, lastActive: '1 hour ago', joinedAt: '2023-02-01' },
  { id: 'm4', name: 'Mia Zhang', email: 'mia@pulsecrm.io', role: 'Sales Rep', avatar: 'MZ', status: 'active', deals: 7, revenue: 115000, quota: 200000, lastActive: '3 hours ago', joinedAt: '2023-06-15' },
  { id: 'm5', name: 'Carlos Mendez', email: 'carlos@pulsecrm.io', role: 'Support', avatar: 'CM', status: 'active', deals: 4, revenue: 67000, quota: 100000, lastActive: '30 minutes ago', joinedAt: '2023-09-01' },
  { id: 'm6', name: 'Zoe Park', email: 'zoe@pulsecrm.io', role: 'Sales Rep', avatar: 'ZP', status: 'invited', deals: 0, revenue: 0, quota: 150000, lastActive: 'Never', joinedAt: '2024-06-01' },
  { id: 'm7', name: 'Ryan Foster', email: 'ryan@pulsecrm.io', role: 'Viewer', avatar: 'RF', status: 'active', deals: 0, revenue: 0, quota: 0, lastActive: '2 days ago', joinedAt: '2024-03-01' },
]

export const ACTIVITIES: Activity[] = [
  { id: 'a1', type: 'call', title: 'Discovery call completed', description: 'Alex spoke with Sarah Johnson for 45 minutes about enterprise needs.', user: 'Alex Turner', userAvatar: 'AT', customer: 'Acme Corp', timestamp: '2 hours ago' },
  { id: 'a2', type: 'deal', title: 'Deal moved to Negotiation', description: 'Analytics Suite Upgrade progressed from Proposal to Negotiation.', user: 'Sarah Mills', userAvatar: 'SM', customer: 'Globex Inc', timestamp: '4 hours ago' },
  { id: 'a3', type: 'email', title: 'Proposal email sent', description: 'Cloud Migration Project proposal sent to Wayne Enterprises contacts.', user: 'Sarah Mills', userAvatar: 'SM', customer: 'Wayne Enterprises', timestamp: '6 hours ago' },
  { id: 'a4', type: 'deal', title: 'Deal closed — Won!', description: 'Security Audit & Compliance deal closed for $95,000.', user: 'Jordan Lee', userAvatar: 'JL', customer: 'Umbrella Ltd', timestamp: '1 day ago' },
  { id: 'a5', type: 'meeting', title: 'Onboarding meeting scheduled', description: 'Booked 2-hour onboarding session with Stark Industries team.', user: 'Alex Turner', userAvatar: 'AT', customer: 'Stark Industries', timestamp: '1 day ago' },
  { id: 'a6', type: 'note', title: 'Note added to customer profile', description: 'Updated competitive intelligence notes on the Pied Piper account.', user: 'Jordan Lee', userAvatar: 'JL', customer: 'Pied Piper', timestamp: '2 days ago' },
  { id: 'a7', type: 'task', title: 'Task completed', description: 'Contract review for Umbrella security deal marked as done.', user: 'Jordan Lee', userAvatar: 'JL', timestamp: '2 days ago' },
]

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 48500, target: 50000 },
  { month: 'Feb', revenue: 52100, target: 55000 },
  { month: 'Mar', revenue: 61200, target: 60000 },
  { month: 'Apr', revenue: 58400, target: 65000 },
  { month: 'May', revenue: 74300, target: 70000 },
  { month: 'Jun', revenue: 82100, target: 75000 },
  { month: 'Jul', revenue: 77800, target: 80000 },
  { month: 'Aug', revenue: 91500, target: 85000 },
  { month: 'Sep', revenue: 104200, target: 90000 },
  { month: 'Oct', revenue: 98700, target: 95000 },
  { month: 'Nov', revenue: 118300, target: 100000 },
  { month: 'Dec', revenue: 125600, target: 110000 },
]

export const PIPELINE_FUNNEL = [
  { stage: 'Lead', count: 48, value: 820000 },
  { stage: 'Qualified', count: 32, value: 620000 },
  { stage: 'Proposal', count: 19, value: 410000 },
  { stage: 'Negotiation', count: 11, value: 285000 },
  { stage: 'Closed Won', count: 7, value: 178000 },
]

export const DEAL_STAGES: DealStage[] = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

export function getStageColor(stage: DealStage): string {
  const map: Record<DealStage, string> = {
    Lead: 'bg-muted text-muted-foreground',
    Qualified: 'bg-info/15 text-info',
    Proposal: 'bg-warning/15 text-warning',
    Negotiation: 'bg-chart-4/15 text-chart-4',
    'Closed Won': 'bg-success/15 text-success',
    'Closed Lost': 'bg-danger/15 text-danger',
  }
  return map[stage] ?? 'bg-muted text-muted-foreground'
}

export function getPriorityColor(priority: Priority): string {
  const map: Record<Priority, string> = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-info/15 text-info',
    high: 'bg-warning/15 text-warning',
    urgent: 'bg-danger/15 text-danger',
  }
  return map[priority]
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'bg-success/15 text-success',
    inactive: 'bg-muted text-muted-foreground',
    prospect: 'bg-info/15 text-info',
    churned: 'bg-danger/15 text-danger',
    invited: 'bg-warning/15 text-warning',
    suspended: 'bg-danger/15 text-danger',
    todo: 'bg-muted text-muted-foreground',
    'in-progress': 'bg-info/15 text-info',
    done: 'bg-success/15 text-success',
    cancelled: 'bg-danger/15 text-danger',
  }
  return map[status] ?? 'bg-muted text-muted-foreground'
}

export function getAvatarColor(initials: string): string {
  const colors = [
    'bg-chart-1/20 text-chart-1',
    'bg-chart-2/20 text-chart-2',
    'bg-chart-3/20 text-chart-3',
    'bg-chart-4/20 text-chart-4',
    'bg-chart-5/20 text-chart-5',
  ]
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length
  return colors[idx]
}
