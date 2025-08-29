import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/products/:id → Get product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('❌ Failed to fetch product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

/**
 * PUT /api/products/:id → Update product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, price, compareAtPrice, images, categoryId, inventory } = body

    const slug = name
      ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : undefined

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(compareAtPrice && { compareAtPrice: parseFloat(compareAtPrice) }),
        ...(images && { images }),
        ...(categoryId && { categoryId }),
        ...(inventory && { inventory: parseInt(inventory) }),
      },
      include: { category: true },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('❌ Failed to update product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

/**
 * DELETE /api/products/:id → Delete product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: '✅ Product deleted successfully' })
  } catch (error) {
    console.error('❌ Failed to delete product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
