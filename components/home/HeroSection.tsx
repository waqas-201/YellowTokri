'use client'

import { ArrowRight, Star, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-50 to-yellow-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Amazing 
                <span className="text-yellow-600"> Products</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Shop premium quality products at unbeatable prices. 
                Fast shipping, easy returns, and exceptional customer service guaranteed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products">
                <Button size="lg" className="yellow-tokri-button group">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="hover:bg-yellow-50">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">Free Shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">4.8/5 Customer Rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full p-8">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-12 h-6 border-b-4 border-black rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">50,000+</h3>
                    <p className="text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -z-10">
        <div className="w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <div className="w-48 h-48 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  )
}