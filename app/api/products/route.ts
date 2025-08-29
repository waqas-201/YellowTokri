import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// ❌ Remove this when using static export builds
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page') || '1'
    const sortBy = searchParams.get('sortBy') || 'createdAt'

    const pageNumber = parseInt(page)
    const limitNumber = limit ? parseInt(limit) : undefined

    const where: any = {}

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = { slug: category }
    }

    if (search) {
      // ✅ include slug in search so product detail fetch works
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { slug: { equals: search } }, // exact slug match
      ]
    }

    // 🔧 Map frontend sort options → Prisma orderBy
    let orderBy: any = { createdAt: 'desc' } // default
    switch (sortBy) {
      case 'price':
        orderBy = { price: 'asc' }
        break
      case 'price_desc':
        orderBy = { price: 'desc' }
        break
      case 'ratings':
        orderBy = { ratings: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'createdAt':
        orderBy = { createdAt: 'desc' }
        break
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      take: limitNumber,
      skip: limitNumber ? (pageNumber - 1) * limitNumber : undefined,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, compareAtPrice, images, categoryId, inventory } = body

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        images,
        categoryId,
        inventory: parseInt(inventory),
      },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('❌ Failed to create product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
