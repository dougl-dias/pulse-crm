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
  const showActivity = activePage === "Dashboard"

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNavbar activePage={activePage} />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <main className="flex-1 min-w-0 overflow-y-auto p-6">
            {activePage === "Dashboard" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Visao Geral do Suporte</h1>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Maio 2026 · atualizado ha 2 min</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary border border-border rounded-[6px] px-2.5 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.68_0.16_162)]" />
                    Atendimento ao vivo
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

            {activePage === "Customers" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Solicitantes</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">1.247 usuarios · 8 exibidos</p>
                </div>
                <ContactsTable />
              </div>
            )}

            {activePage === "Deals" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Tickets</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">24 chamados ativos · 7 criticos em aberto</p>
                </div>
                <DealsView />
              </div>
            )}

            {activePage === "Pipeline" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Quadro de Atendimento</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">9 tickets em andamento</p>
                </div>
                <PipelineBoard />
              </div>
            )}

            {activePage === "Tasks" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Tarefas</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">8 acoes pendentes hoje</p>
                </div>
                <TasksView />
              </div>
            )}

            {activePage === "Team" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Equipe</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">12 atendentes · 4 online agora</p>
                </div>
                <TeamView />
              </div>
            )}

            {activePage === "Reports" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Relatorios</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">Indicadores de suporte · Maio 2026</p>
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

            {activePage === "Settings" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-[16px] font-semibold text-foreground tracking-tight">Configuracoes</h1>
                  <p className="text-[12px] text-muted-foreground mt-0.5">Conta, equipe e preferencias de suporte</p>
                </div>
                <SettingsView />
              </div>
            )}
          </main>

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
