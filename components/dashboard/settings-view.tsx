"use client"

import { Bell, Building2, Clock3, Mail, Shield, SlidersHorizontal, Users } from "lucide-react"

const settings = [
  { icon: Building2, label: "Workspace", value: "TicketFlow Support", description: "Nome e identidade do ambiente de suporte" },
  { icon: Clock3, label: "SLA padrao", value: "4 horas", description: "Tempo alvo para primeira resposta" },
  { icon: Users, label: "Equipe", value: "12 atendentes", description: "Usuarios que podem atender tickets" },
  { icon: Shield, label: "Permissoes", value: "Por perfil", description: "Controle de acesso por papel da equipe" },
]

const notifications = [
  "Ticket criado",
  "Prioridade alterada",
  "Comentario recebido",
  "SLA proximo do vencimento",
]

const integrations = [
  { name: "E-mail", desc: "Crie tickets a partir de mensagens recebidas", connected: true },
  { name: "Slack", desc: "Notifique a equipe sobre chamados criticos", connected: true },
  { name: "WhatsApp Business", desc: "Canal de atendimento para solicitantes", connected: false },
]

export function SettingsView() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <section className="col-span-2 flex flex-col gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Configuracoes do suporte</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {settings.map(({ icon: Icon, label, value, description }) => (
              <div key={label} className="border border-border rounded-lg p-3 bg-background">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[12px] text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Notificacoes</h2>
          </div>
          <div className="divide-y divide-border">
            {notifications.map((item) => (
              <div key={item} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item}</p>
                  <p className="text-[11px] text-muted-foreground">Enviar alerta para responsaveis do suporte</p>
                </div>
                <button className="w-9 h-5 rounded-full bg-primary relative">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-primary-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Canais</h2>
          </div>
          <div className="flex flex-col gap-3">
            {integrations.map((item) => (
              <div key={item.name} className="border border-border rounded-lg p-3 bg-background">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                  <span className={item.connected ? "text-[10px] text-[oklch(0.68_0.16_162)]" : "text-[10px] text-muted-foreground"}>
                    {item.connected ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
