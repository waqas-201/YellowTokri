import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        customer: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, items, shippingAddress, billingAddress } = body

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99
    const total = subtotal + tax + shipping

    const orderNumber = `YT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        email,
        phone: phone || null,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Failed to create order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}