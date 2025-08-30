import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import SmoothScroll from '@/providers/lenis.provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'yellowTokri - Your Premium Shopping Destination',
  description: 'Discover amazing products at yellowTokri. Quality guaranteed, fast shipping, and exceptional customer service.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <SmoothScroll />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}