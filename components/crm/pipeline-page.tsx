'use client'

import { useState } from 'react'
import { DEALS, DEAL_STAGES, formatCurrency, getAvatarColor } from '@/lib/data'
import type { Deal, DealStage } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Plus, MoreHorizontal, Calendar, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STAGE_COLORS: Record<DealStage, string> = {
  Lead: 'bg-muted/50 border-border',
  Qualified: 'bg-info/5 border-info/20',
  Proposal: 'bg-warning/5 border-warning/20',
  Negotiation: 'bg-chart-4/5 border-chart-4/20',
  'Closed Won': 'bg-success/5 border-success/20',
  'Closed Lost': 'bg-danger/5 border-danger/20',
}

const STAGE_DOT: Record<DealStage, string> = {
  Lead: 'bg-muted-foreground',
  Qualified: 'bg-info',
  Proposal: 'bg-warning',
  Negotiation: 'bg-chart-4',
  'Closed Won': 'bg-success',
  'Closed Lost': 'bg-danger',
}

const PRIORITY_DOT: Record<string, string> = {
  low: 'bg-muted-foreground',
  medium: 'bg-info',
  high: 'bg-warning',
  urgent: 'bg-danger',
}

interface DealCardProps {
  deal: Deal
  onDragStart: (e: React.DragEvent, dealId: string, fromStage: DealStage) => void
  isDragging: boolean
}

function DealCard({ deal, onDragStart, isDragging }: DealCardProps) {
  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, deal.id, deal.stage)}
      className={cn(
        'rounded-xl border bg-card p-3.5 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group select-none',
        isDragging ? 'opacity-40 scale-95' : 'opacity-100',
        STAGE_COLORS[deal.stage]
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <p className="text-xs font-semibold text-foreground leading-snug">{deal.title}</p>
        <button className="p-1 rounded hover:bg-secondary text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={e => e.stopPropagation()}>
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">{deal.customer}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">{formatCurrency(deal.value)}</span>
        <div className="flex items-center gap-1.5">
          <div className={cn('w-1.5 h-1.5 rounded-full', PRIORITY_DOT[deal.priority])} title={`${deal.priority} priority`} />
          <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold', getAvatarColor(deal.ownerAvatar))}>
            {deal.ownerAvatar}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2.5 pt-2.5 border-t border-border/50">
        <Calendar className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">{deal.closeDate}</span>
        <div className="ml-auto flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{deal.probability}%</span>
        </div>
      </div>
    </div>
  )
}

export function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(DEALS)
  const [dragging, setDragging] = useState<{ dealId: string; fromStage: DealStage } | null>(null)
  const [dragOver, setDragOver] = useState<DealStage | null>(null)

  function handleDragStart(e: React.DragEvent, dealId: string, fromStage: DealStage) {
    setDragging({ dealId, fromStage })
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e: React.DragEvent, stage: DealStage) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(stage)
  }

  function handleDrop(e: React.DragEvent, toStage: DealStage) {
    e.preventDefault()
    if (!dragging || dragging.fromStage === toStage) {
      setDragging(null)
      setDragOver(null)
      return
    }
    setDeals(prev => prev.map(d => d.id === dragging.dealId ? { ...d, stage: toStage } : d))
    setDragging(null)
    setDragOver(null)
  }

  function handleDragEnd() {
    setDragging(null)
    setDragOver(null)
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Stage totals header */}
      <div className="px-6 py-3 border-b border-border bg-secondary/20 flex gap-6 overflow-x-auto shrink-0">
        {DEAL_STAGES.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage)
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0)
          return (
            <div key={stage} className="flex items-center gap-2 shrink-0">
              <div className={cn('w-2 h-2 rounded-full', STAGE_DOT[stage])} />
              <span className="text-xs text-muted-foreground">{stage}</span>
              <span className="text-xs font-semibold text-foreground">{formatCurrency(stageValue)}</span>
              <span className="text-[10px] text-muted-foreground">({stageDeals.length})</span>
            </div>
          )
        })}
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 h-full min-w-max">
          {DEAL_STAGES.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage)
            const isOver = dragOver === stage
            return (
              <div
                key={stage}
                className={cn(
                  'w-64 flex flex-col rounded-xl border transition-colors',
                  isOver ? 'border-primary/50 bg-primary/5' : 'border-border bg-secondary/20'
                )}
                onDragOver={e => handleDragOver(e, stage)}
                onDrop={e => handleDrop(e, stage)}
                onDragLeave={() => setDragOver(null)}
              >
                {/* Column header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2 h-2 rounded-full', STAGE_DOT[stage])} />
                    <span className="text-xs font-semibold text-foreground">{stage}</span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {stageDeals.length}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Cards */}
                <div className="flex-1 p-3 space-y-2.5 overflow-y-auto min-h-32">
                  {stageDeals.map(deal => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onDragStart={handleDragStart}
                      isDragging={dragging?.dealId === deal.id}
                    />
                  ))}
                  {stageDeals.length === 0 && (
                    <div className={cn(
                      'rounded-xl border-2 border-dashed p-6 text-center transition-colors',
                      isOver ? 'border-primary/50 bg-primary/5' : 'border-border/50'
                    )}>
                      <p className="text-[11px] text-muted-foreground">
                        {isOver ? 'Drop deal here' : 'No deals in this stage'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Column footer */}
                <div className="px-4 py-2 border-t border-border">
                  <p className="text-[10px] text-muted-foreground">
                    {formatCurrency(stageDeals.reduce((s, d) => s + d.value, 0))} total
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
