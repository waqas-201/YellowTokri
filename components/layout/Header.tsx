'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items, getTotalItems } = useCartStore()

  const totalItems = getTotalItems()
    
  

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-6 h-3 border-b-2 border-black rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">yellowTokri</span>
          </Link>

          {/* Right Actions */}
            <Link href='/cart'>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
              >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
              </Link>
        </div>
      </div>

    
         
      
              
    </header>
  )
}
