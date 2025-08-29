'use client'

import { useState } from 'react'
import { Mail, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Gift className="w-8 h-8 text-black mr-3" />
                <span className="text-2xl font-bold text-black">Get 15% Off</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                Join Our Newsletter
              </h2>
              <p className="text-black/80 text-lg leading-relaxed">
                Subscribe to get special offers, free giveaways, and exclusive deals straight to your inbox.
              </p>
            </div>

            <div className="max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {isSubscribed ? (
                <div className="bg-black/10 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-black font-semibold">Thanks for subscribing!</p>
                  <p className="text-black/70 text-sm">Check your email for your discount code.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 pr-4 py-3 bg-white border-0 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-gray-800 text-white py-3"
                    disabled={!email}
                  >
                    Subscribe & Get 15% Off
                  </Button>
                  <p className="text-black/70 text-xs text-center">
                    By subscribing, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}