import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive', 'prospect', 'churned']).default('prospect'),
  revenue: z.number().int().nonnegative().default(0),
  deals: z.number().int().nonnegative().default(0),
  avatar: z.string().optional(),
  location: z.string().optional(),
  industry: z.string().optional()
})

async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(customers, { status: 200 })
}

async function POST(request: Request) {
  const body = await request.json()
  const result = createCustomerSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid customer data',
        issues: result.error.flatten().fieldErrors
      },
      { status: 400 }
    )
  }

  const customer = await prisma.customer.create({
    data: result.data
  })

  return NextResponse.json(customer, { status: 201 })
}

export { GET, POST }
