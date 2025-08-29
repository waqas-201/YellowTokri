'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  _count: {
    products: number
  }
}

const categoryImages: { [key: string]: string } = {
  'electronics': 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
  'clothing': 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
  'home-garden': 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
  'books': 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
  'sports': 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
  'beauty': 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.slice(0, 6))
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-40 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="relative aspect-square">
                  <Image
                    src={categoryImages[category.slug] || categoryImages['electronics']}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-white/80 text-xs">{category._count?.products || 0} items</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}