import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const createTicketSchema = z.object({
  title: z.string().min(1),
  requester: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
})

const tickets = [
  {
    id: 'TK-1048',
    title: 'Falha no webhook de pagamento',
    requester: 'Beatriz Rocha',
    priority: 'critical',
    status: 'in-progress',
  },
  {
    id: 'TK-1047',
    title: 'Erro ao acessar painel',
    requester: 'Carlos Lima',
    priority: 'high',
    status: 'new',
  },
]

async function GET() {
  return NextResponse.json(tickets, { status: 200 })
}

async function POST(request: Request) {
  const body = await request.json()
  const result = createTicketSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid ticket data',
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      id: 'TK-DRAFT',
      status: 'new',
      ...result.data,
    },
    { status: 201 }
  )
}

export { GET, POST }
