'use client'

import { Star } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing products and incredible customer service! My order arrived faster than expected and the quality exceeded my expectations.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    location: 'New York, NY',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'I love shopping here! The website is easy to use and they have everything I need. Highly recommend yellowTokri to everyone.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 4,
    comment: 'Great selection and competitive prices. The return process was smooth when I needed to exchange an item.',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    location: 'Chicago, IL',
  },
  {
    id: 4,
    name: 'David Kim',
    rating: 5,
    comment: 'Outstanding quality and fast shipping. This has become my go-to online store for all my shopping needs.',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    location: 'Seattle, WA',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers think about their yellowTokri experience
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-2xl p-8 shadow-lg mx-4">
                    <div className="flex items-center mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        {/* <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-lg">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}