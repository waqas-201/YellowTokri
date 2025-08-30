import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { ValuePropositions } from '@/components/home/ValuePropositions'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryShowcase />
      <ValuePropositions />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </div>
  )
}