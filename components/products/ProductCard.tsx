'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice: number | null
  images: string[]
  ratings: number
  reviewCount: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      slug: product.slug,
    })
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden product-card-hover">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.compareAtPrice && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.ratings)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}