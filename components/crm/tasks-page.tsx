'use client'

import { useState } from 'react'
import { TASKS, getPriorityColor, getStatusColor, getAvatarColor } from '@/lib/data'
import type { TaskStatus, Priority, Task } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  Search, Filter, LayoutGrid, LayoutList, CheckCircle2, Circle,
  Calendar, Plus, MoreHorizontal, Flag, Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const STATUSES: { value: TaskStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All tasks' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
]

const KANBAN_COLS: { status: TaskStatus; label: string; dot: string }[] = [
  { status: 'todo', label: 'To Do', dot: 'bg-muted-foreground' },
  { status: 'in-progress', label: 'In Progress', dot: 'bg-primary' },
  { status: 'done', label: 'Done', dot: 'bg-success' },
  { status: 'cancelled', label: 'Cancelled', dot: 'bg-danger' },
]

function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const isDone = task.status === 'done'
  return (
    <div className={cn(
      'flex items-center gap-4 px-4 py-3.5 border-b border-border/50 hover:bg-secondary/40 transition-colors group',
      isDone && 'opacity-60'
    )}>
      <button
        onClick={() => onToggle(task.id)}
        className="shrink-0 transition-colors"
      >
        {isDone
          ? <CheckCircle2 className="w-4.5 h-4.5 text-success" />
          : <Circle className="w-4.5 h-4.5 text-muted-foreground hover:text-primary transition-colors" />
        }
      </button>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium', isDone ? 'line-through text-muted-foreground' : 'text-foreground')}>
          {task.title}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          {task.customer && <span className="text-[11px] text-primary">{task.customer}</span>}
          {task.deal && <span className="text-[11px] text-muted-foreground truncate">{task.deal}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium capitalize', getPriorityColor(task.priority as Priority))}>
          {task.priority}
        </span>
        <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', getStatusColor(task.status))}>
          {task.status.replace('-', ' ')}
        </span>
        <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold', getAvatarColor(task.assigneeAvatar))}>
          {task.assigneeAvatar}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span className="text-[11px]">{task.dueDate}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36 text-xs">
            <DropdownMenuItem>Edit task</DropdownMenuItem>
            <DropdownMenuItem>Reassign</DropdownMenuItem>
            <DropdownMenuItem>Change priority</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function KanbanCard({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5 hover:border-primary/30 transition-colors group cursor-default">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-xs font-semibold text-foreground leading-snug">{task.title}</p>
        <button className="shrink-0 mt-0.5" onClick={() => onToggle(task.id)}>
          {task.status === 'done'
            ? <CheckCircle2 className="w-4 h-4 text-success" />
            : <Circle className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
          }
        </button>
      </div>
      {task.customer && <p className="text-[11px] text-primary mb-2">{task.customer}</p>}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
        <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize', getPriorityColor(task.priority as Priority))}>
          <Flag className="w-2.5 h-2.5 inline mr-1" />{task.priority}
        </span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{task.dueDate}</span>
        </div>
      </div>
    </div>
  )
}

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(TASKS)
  const [view, setView] = useState<'list' | 'kanban'>('list')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all')

  function toggleDone(id: string) {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t
    ))
  }

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase()
    const matchSearch = !q || t.title.toLowerCase().includes(q) || (t.customer ?? '').toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: tasks.length },
          { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
          { label: 'Completed', value: tasks.filter(t => t.status === 'done').length },
          { label: 'Overdue', value: 2 },
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
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="pl-8 h-9 bg-secondary border-border text-sm" />
        </div>
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="h-9 w-36 bg-secondary border-border text-sm">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center rounded-lg border border-border bg-secondary p-1 gap-0.5">
          <button
            className={cn('p-1.5 rounded transition-colors', view === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
            onClick={() => setView('list')}
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
          <button
            className={cn('p-1.5 rounded transition-colors', view === 'kanban' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
            onClick={() => setView('kanban')}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
        <Button size="sm" className="h-9 gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
          <Plus className="w-3.5 h-3.5" /> New Task
        </Button>
      </div>

      {/* List view */}
      {view === 'list' && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-2.5 border-b border-border bg-secondary/40">
            {['Task', 'Priority', 'Status', 'Due Date'].map(h => (
              <p key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider first:col-span-2">{h}</p>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <CheckCircle2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">No tasks found</p>
              <p className="text-xs text-muted-foreground mt-1">Create a task or adjust your filters</p>
            </div>
          ) : (
            filtered.map(task => <TaskRow key={task.id} task={task} onToggle={toggleDone} />)
          )}
        </div>
      )}

      {/* Kanban view */}
      {view === 'kanban' && (
        <div className="grid grid-cols-4 gap-4">
          {KANBAN_COLS.map(({ status, label, dot }) => {
            const colTasks = filtered.filter(t => t.status === status)
            return (
              <div key={status} className="rounded-xl border border-border bg-secondary/20">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <div className={cn('w-2 h-2 rounded-full', dot)} />
                  <span className="text-xs font-semibold text-foreground">{label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground ml-auto">{colTasks.length}</span>
                </div>
                <div className="p-3 space-y-2.5 min-h-24">
                  {colTasks.map(task => <KanbanCard key={task.id} task={task} onToggle={toggleDone} />)}
                  {colTasks.length === 0 && (
                    <div className="rounded-xl border-2 border-dashed border-border/50 p-5 text-center">
                      <p className="text-[11px] text-muted-foreground">No {label.toLowerCase()} tasks</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
