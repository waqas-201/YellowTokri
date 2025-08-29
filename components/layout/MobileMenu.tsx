'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>

          <nav className="space-y-2">
            <Link 
              href="/" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              Contact
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t space-y-2">
            <Link 
              href="/account" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              Account
            </Link>
            <Link 
              href="/wishlist" 
              className="block px-3 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-md transition-colors"
              onClick={onClose}
            >
              Wishlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}