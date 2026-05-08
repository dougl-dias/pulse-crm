"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { User, Building, Bell, Shield, CreditCard, Webhook, ChevronRight, Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type SettingsSection = "Perfil" | "Workspace" | "Notificações" | "Segurança" | "Faturamento" | "Integrações"

const sections: { icon: React.ElementType; label: SettingsSection }[] = [
  { icon: User, label: "Perfil" },
  { icon: Building, label: "Workspace" },
  { icon: Bell, label: "Notificações" },
  { icon: Shield, label: "Segurança" },
  { icon: CreditCard, label: "Faturamento" },
  { icon: Webhook, label: "Integrações" },
]

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn("w-8 h-4 rounded-full transition-colors relative", enabled ? "bg-primary" : "bg-secondary border border-border")}
    >
      <span className={cn("absolute top-0.5 w-3 h-3 rounded-full transition-all", enabled ? "left-[18px] bg-white" : "left-0.5 bg-muted-foreground/50")} />
    </button>
  )
}

function SettingRow({ label, description, value, children }: { label: string; description?: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        {description && <span className="text-[12px] text-muted-foreground">{description}</span>}
      </div>
      <div className="flex items-center gap-3 ml-8">
        {value && <span className="text-[13px] text-muted-foreground">{value}</span>}
        {children}
      </div>
    </div>
  )
}

export function SettingsView() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("Perfil")
  const [notifs, setNotifs] = useState({ email: true, deals: true, tasks: false, team: true, reports: false })
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="flex gap-6 h-full">
      {/* Left nav */}
      <div className="w-48 shrink-0">
        <div className="flex flex-col gap-0.5">
          {sections.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveSection(label)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[13px] transition-all w-full text-left",
                activeSection === label
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5 shrink-0", activeSection === label ? "text-primary" : "")} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">

        {/* PERFIL */}
        {activeSection === "Perfil" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[14px] font-semibold text-foreground">Perfil</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">Gerencie suas informações pessoais</p>
            </div>
            <div className="px-6">
              <div className="flex items-center gap-4 py-5 border-b border-border">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">AM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-semibold text-foreground">Ana Martins</span>
                  <span className="text-[12px] text-muted-foreground">Sales Director · Pulse CRM</span>
                  <button className="mt-1 text-[12px] text-primary hover:underline">Alterar foto</button>
                </div>
              </div>
              <SettingRow label="Nome completo" value="Ana Martins">
                <button className="text-[12px] text-primary hover:underline">Editar</button>
              </SettingRow>
              <SettingRow label="E-mail" value="ana@pulse.com">
                <button className="text-[12px] text-primary hover:underline">Editar</button>
              </SettingRow>
              <SettingRow label="Cargo" value="Sales Director">
                <button className="text-[12px] text-primary hover:underline">Editar</button>
              </SettingRow>
              <SettingRow label="Fuso horário" value="America/São_Paulo (UTC-3)">
                <button className="text-[12px] text-primary hover:underline">Alterar</button>
              </SettingRow>
              <SettingRow label="Idioma" value="Português (BR)">
                <button className="text-[12px] text-primary hover:underline">Alterar</button>
              </SettingRow>
            </div>
          </div>
        )}

        {/* WORKSPACE */}
        {activeSection === "Workspace" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[14px] font-semibold text-foreground">Workspace</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">Configurações do seu espaço de trabalho</p>
            </div>
            <div className="px-6">
              <SettingRow label="Nome do Workspace" value="Pulse CRM — Enterprise">
                <button className="text-[12px] text-primary hover:underline">Editar</button>
              </SettingRow>
              <SettingRow label="Plano" value="Enterprise">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Ativo</span>
              </SettingRow>
              <SettingRow label="Membros" value="12 / 50 assentos">
                <button className="text-[12px] text-primary hover:underline">Gerenciar</button>
              </SettingRow>
              <SettingRow label="Domínio" value="pulse.com.br">
                <button className="text-[12px] text-primary hover:underline">Editar</button>
              </SettingRow>
              <SettingRow label="Moeda padrão" value="BRL (R$)">
                <button className="text-[12px] text-primary hover:underline">Alterar</button>
              </SettingRow>
            </div>
          </div>
        )}

        {/* NOTIFICAÇÕES */}
        {activeSection === "Notificações" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[14px] font-semibold text-foreground">Notificações</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">Configure quando e como você quer ser notificado</p>
            </div>
            <div className="px-6">
              <SettingRow label="Notificações por e-mail" description="Receba resumos diários no seu e-mail">
                <Toggle enabled={notifs.email} onChange={() => setNotifs(p => ({ ...p, email: !p.email }))} />
              </SettingRow>
              <SettingRow label="Atualizações de Negócios" description="Quando o status de um negócio mudar">
                <Toggle enabled={notifs.deals} onChange={() => setNotifs(p => ({ ...p, deals: !p.deals }))} />
              </SettingRow>
              <SettingRow label="Lembretes de Tarefas" description="Alertas 1 hora antes do prazo">
                <Toggle enabled={notifs.tasks} onChange={() => setNotifs(p => ({ ...p, tasks: !p.tasks }))} />
              </SettingRow>
              <SettingRow label="Atividade da Equipe" description="Quando membros adicionarem atualizações">
                <Toggle enabled={notifs.team} onChange={() => setNotifs(p => ({ ...p, team: !p.team }))} />
              </SettingRow>
              <SettingRow label="Relatórios Automáticos" description="Enviar relatório semanal toda segunda-feira">
                <Toggle enabled={notifs.reports} onChange={() => setNotifs(p => ({ ...p, reports: !p.reports }))} />
              </SettingRow>
            </div>
          </div>
        )}

        {/* SEGURANÇA */}
        {activeSection === "Segurança" && (
          <div className="flex flex-col gap-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-[14px] font-semibold text-foreground">Segurança</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">Proteja sua conta com recursos de segurança avançados</p>
              </div>
              <div className="px-6">
                <SettingRow label="Autenticação em dois fatores" description="Adicione uma camada extra de segurança">
                  <Toggle enabled={twoFactor} onChange={() => setTwoFactor(p => !p)} />
                </SettingRow>
                <SettingRow label="Senha" description="Última atualização há 45 dias">
                  <button className="text-[12px] text-primary hover:underline">Alterar senha</button>
                </SettingRow>
                <SettingRow label="Sessões ativas" description="2 dispositivos conectados">
                  <button className="text-[12px] text-[oklch(0.64_0.22_25)] hover:underline">Revogar todas</button>
                </SettingRow>
              </div>
            </div>
          </div>
        )}

        {/* FATURAMENTO */}
        {activeSection === "Faturamento" && (
          <div className="flex flex-col gap-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-[14px] font-semibold text-foreground">Faturamento</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">Gerencie seu plano e histórico de pagamentos</p>
              </div>
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-semibold text-foreground">Plano Enterprise</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Ativo</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground">R$ 4.800 / mês · Próxima cobrança em 1 jun 2026</p>
                  </div>
                  <button className="text-[12px] text-primary border border-primary/30 px-3 py-1.5 rounded-[6px] hover:bg-primary/10 transition-all">
                    Gerenciar Plano
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-6">
                  {[{ label: "Assentos usados", value: "12 / 50" }, { label: "Armazenamento", value: "4,2 GB / 100 GB" }, { label: "Chamadas de API", value: "28k / 500k" }].map(m => (
                    <div key={m.label} className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-muted-foreground">{m.label}</span>
                      <span className="text-[13px] font-semibold text-foreground">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Histórico de Pagamentos</p>
                {[
                  { date: "1 Mai 2026", desc: "Plano Enterprise — Maio", value: "R$ 4.800", status: "Pago" },
                  { date: "1 Abr 2026", desc: "Plano Enterprise — Abril", value: "R$ 4.800", status: "Pago" },
                  { date: "1 Mar 2026", desc: "Plano Enterprise — Março", value: "R$ 4.800", status: "Pago" },
                ].map(inv => (
                  <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-muted-foreground w-24">{inv.date}</span>
                      <span className="text-[13px] text-foreground">{inv.desc}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-semibold text-foreground">{inv.value}</span>
                      <span className="flex items-center gap-1 text-[11px] text-[oklch(0.68_0.16_162)] font-medium">
                        <Check className="w-3 h-3" />
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INTEGRAÇÕES */}
        {activeSection === "Integrações" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-[14px] font-semibold text-foreground">Integrações</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">Conecte o Pulse CRM com suas ferramentas favoritas</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6">
              {[
                { name: "Slack", desc: "Notificações de negócios e tarefas", connected: true, color: "bg-[oklch(0.62_0.21_264/0.12)] text-[oklch(0.62_0.21_264)]" },
                { name: "Google Calendar", desc: "Sincronize reuniões e lembretes", connected: true, color: "bg-[oklch(0.68_0.16_162/0.12)] text-[oklch(0.68_0.16_162)]" },
                { name: "Zapier", desc: "Automatize fluxos de trabalho", connected: false, color: "bg-[oklch(0.72_0.18_84/0.12)] text-[oklch(0.72_0.18_84)]" },
                { name: "HubSpot", desc: "Sincronize contatos e negócios", connected: false, color: "bg-[oklch(0.64_0.22_25/0.12)] text-[oklch(0.64_0.22_25)]" },
                { name: "Salesforce", desc: "Migração e sincronização de dados", connected: false, color: "bg-[oklch(0.62_0.21_264/0.12)] text-[oklch(0.62_0.21_264)]" },
                { name: "WhatsApp Business", desc: "Mensagens diretas para clientes", connected: true, color: "bg-[oklch(0.68_0.16_162/0.12)] text-[oklch(0.68_0.16_162)]" },
              ].map(int => (
                <div key={int.name} className="flex items-start justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className={cn("w-8 h-8 rounded-[6px] flex items-center justify-center text-[11px] font-bold shrink-0", int.color)}>
                      {int.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{int.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{int.desc}</p>
                    </div>
                  </div>
                  <button className={cn(
                    "text-[11px] font-semibold px-2.5 py-1 rounded-[4px] transition-all shrink-0 ml-3",
                    int.connected
                      ? "bg-[oklch(0.68_0.16_162/0.12)] text-[oklch(0.68_0.16_162)] hover:bg-[oklch(0.68_0.16_162/0.2)]"
                      : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                  )}>
                    {int.connected ? "Conectado" : "Conectar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
