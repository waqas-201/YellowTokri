import { Truck, Shield, Clock, Headphones } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders over $50. Fast and reliable shipping worldwide.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Shield,
    title: '30-Day Returns',
    description: 'Not satisfied? Return any item within 30 days for a full refund.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Clock,
    title: 'Quick Delivery',
    description: 'Most orders ship within 24 hours. Get your products fast.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our friendly customer service team is here to help anytime.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
]

export function ValuePropositions() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose yellowTokri?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="text-center group cursor-default"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}