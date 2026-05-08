"use client"

import { useState } from "react"
import { Sidebar, type NavPage } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { PipelineBoard } from "@/components/dashboard/pipeline-board"
import { ContactsTable } from "@/components/dashboard/contacts-table"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { FunnelChart } from "@/components/dashboard/funnel-chart"
import { DealsView } from "@/components/dashboard/deals-view"
import { TasksView } from "@/components/dashboard/tasks-view"
import { TeamView } from "@/components/dashboard/team-view"
import { SettingsView } from "@/components/dashboard/settings-view"

export default function Home() {
  const [activePage, setActivePage] = useState<NavPage>("Dashboard")

  // Pages that show the activity feed sidebar
  const showActivity = activePage === "Dashboard"

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top navbar */}
        <TopNavbar activePage={activePage} />

        {/* Content area */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Primary scrollable content */}
          <main className="flex-1 min-w-0 overflow-y-auto p-6">

            {/* DASHBOARD */}
            {activePage === "Dashboard" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Visão Geral</h1>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Maio 2026 · Atualizado há 2 min</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary border border-border rounded-[6px] px-2.5 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.68_0.16_162)]" />
                    Ao vivo
                  </div>
                </div>

                <KpiCards />

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <RevenueChart />
                  </div>
                  <div className="col-span-1">
                    <FunnelChart />
                  </div>
                </div>

                <PipelineBoard />
              </div>
            )}

            {/* CUSTOMERS */}
            {activePage === "Customers" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Customers</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">1.247 clientes · 8 exibidos</p>
                </div>
                <ContactsTable />
              </div>
            )}

            {/* DEALS */}
            {activePage === "Deals" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Deals</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">24 negócios ativos · R$ 3,7M em aberto</p>
                </div>
                <DealsView />
              </div>
            )}

            {/* PIPELINE */}
            {activePage === "Pipeline" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Pipeline</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">9 negócios em andamento</p>
                </div>
                <PipelineBoard />
              </div>
            )}

            {/* TASKS */}
            {activePage === "Tasks" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Tasks</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">8 tarefas pendentes hoje</p>
                </div>
                <TasksView />
              </div>
            )}

            {/* TEAM */}
            {activePage === "Team" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Team</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">12 membros · 4 online agora</p>
                </div>
                <TeamView />
              </div>
            )}

            {/* REPORTS */}
            {activePage === "Reports" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Reports</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">Desempenho consolidado · Maio 2026</p>
                </div>
                <KpiCards />
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <RevenueChart />
                  </div>
                  <div>
                    <FunnelChart />
                  </div>
                </div>
                <ContactsTable />
              </div>
            )}

            {/* SETTINGS */}
            {activePage === "Settings" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Settings</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">Configurações da conta e workspace</p>
                </div>
                <SettingsView />
              </div>
            )}

          </main>

          {/* Activity feed — only on Dashboard, xl screens */}
          {showActivity && (
            <aside className="w-[272px] min-w-[272px] border-l border-border bg-card overflow-y-auto p-4 hidden xl:block shrink-0">
              <ActivityFeed />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
