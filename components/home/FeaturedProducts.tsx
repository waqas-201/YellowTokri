'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice: number | null
  images: string[]
  ratings: number
  reviewCount: number
  featured: boolean
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/products?featured=true&limit=8')
        const data = await response.json()
        // Ensure data is always an array
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our customers love most
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const safeProduct = {
                id: product.id ?? 'unknown',
                name: product.name ?? 'Unnamed Product',
                slug: product.slug ?? '#',
                price: product.price ?? 0,
                compareAtPrice: product.compareAtPrice ?? null,
                images: product.images?.length ? product.images : ['/placeholder.png'],
                ratings: product.ratings ?? 0,
                reviewCount: product.reviewCount ?? 0,
                featured: product.featured ?? false,
              }
              return <ProductCard key={safeProduct.id} product={safeProduct} />
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No featured products available at the moment.</p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
