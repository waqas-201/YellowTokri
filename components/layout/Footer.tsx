import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-6 h-3 border-b-2 border-black rounded-full"></div>
              </div>
              <span className="text-xl font-bold">yellowTokri</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination offering quality products with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">hello@yellowtokri.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">1-800-TOKRI-01</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 yellowTokri. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}