'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="relative mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
              </div>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {orderNumber && (
            <div className="bg-white rounded-xl p-6 mb-8 border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-semibold text-gray-900">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-yellow-600">Processing</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center border">
              <Package className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm">
                Your order will be processed within 24 hours and shipped via our premium carriers.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border">
              <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Updates</h3>
              <p className="text-gray-600 text-sm">
                You'll receive email notifications with tracking information once your order ships.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link href="/products">
              <Button className="yellow-tokri-button">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}