'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Star, Plus, Minus, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCartStore } from '@/lib/store'
import { useParams } from 'next/navigation'

type Review = {
  id: string
  name: string
  rating: number
  title: string
  comment: string
  createdAt: string
  verified: boolean
}

type CategoryLite = {
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice: number | null
  images: string[]
  ratings: number
  reviewCount: number
  inventory: number
  category: CategoryLite
  reviews: Review[]
}

/** Normalize any backend shape into a safe Product object */
function normalizeProduct(input: any): Product {
  const images: string[] = Array.isArray(input?.images)
    ? input.images.filter((x: unknown) => typeof x === 'string' && x.length > 0)
    : []

  const reviews: Review[] = Array.isArray(input?.reviews)
    ? input.reviews.map((r: any) => ({
      id: String(r?.id ?? ''),
      name: String(r?.name ?? 'Anonymous'),
      rating: Number.isFinite(Number(r?.rating)) ? Number(r.rating) : 0,
      title: r?.title ? String(r.title) : '',
      comment: r?.comment ? String(r.comment) : '',
      createdAt: r?.createdAt ? String(r.createdAt) : new Date().toISOString(),
      verified: Boolean(r?.verified),
    }))
    : []

  const category: CategoryLite = {
    name: String(input?.category?.name ?? 'General'),
    slug: String(input?.category?.slug ?? 'general'),
  }

  const priceNum = Number(input?.price)
  const compareNum = input?.compareAtPrice == null ? null : Number(input.compareAtPrice)

  return {
    id: String(input?.id ?? ''),
    name: String(input?.name ?? 'Unnamed Product'),
    slug: String(input?.slug ?? ''),
    description: String(input?.description ?? ''),
    price: Number.isFinite(priceNum) ? priceNum : NaN,
    compareAtPrice: compareNum != null && Number.isFinite(compareNum) ? compareNum : null,
    images,
    ratings: Number.isFinite(Number(input?.ratings)) ? Number(input.ratings) : 0,
    reviewCount: Number.isFinite(Number(input?.reviewCount))
      ? Number(input.reviewCount)
      : reviews.length,
    inventory: Number.isFinite(Number(input?.inventory)) ? Number(input.inventory) : 0,
    category,
    reviews,
  }
}

export default function ProductPage(): JSX.Element {
  const params = useParams() as { slug?: string }
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (!params?.slug) return
    const slug = String(params.slug)

    const run = async () => {
      setLoading(true)
      try {
        // 1) Try search endpoint 
        const searchRes = await fetch(`/api/products?search=${encodeURIComponent(slug)}`, {
          cache: 'no-store',
        })
        
        const searchJson = (await searchRes.json()) as any
        const list: any[] = Array.isArray(searchJson) ? searchJson : []
        // Prefer exact slug match
        const found = list.find((p) => String(p?.slug) === slug)
        

        // 2) If found, try fetching full details by ID; otherwise fall back to found or null
        if (found?.id) {
          const detailRes = await fetch(`/api/products/${encodeURIComponent(found.id)}`, {
            cache: 'no-store',
          })
          if (detailRes.ok) {
            const detailJson = await detailRes.json()
            console.log(detailJson);
            
            console.log(detailJson);
            
            setProduct(normalizeProduct(detailJson))
          } else {
            // Fallback to the found summary record
            setProduct(normalizeProduct(found))
          }
        } else {
          setProduct(null)
        }

        setSelectedImage(0) // reset selection on product change
      } catch (e) {
        console.error('Failed to load product', e)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [params?.slug])

  const primaryImage = useMemo(
    () => product?.images?.[selectedImage] ?? '/placeholder-product.jpg',
    [product?.images, selectedImage],
  )

  const priceLabel = useMemo(() => {
    if (!product) return '—'
    const n = Number(product.price)
    return Number.isFinite(n) ? `$${n.toFixed(2)}` : 'Price unavailable'
  }, [product])

  const compareLabel = useMemo(() => {
    if (!product?.compareAtPrice && product?.compareAtPrice !== 0) return null
    const n = Number(product.compareAtPrice)
    return Number.isFinite(n) ? `$${n.toFixed(2)}` : null
  }, [product?.compareAtPrice])

  const ratingStars = useMemo(() => Math.max(0, Math.min(5, Math.round(product?.ratings ?? 0))), [product?.ratings])

  const handleAddToCart = () => {
    if (!product) return
    const unitImage = product.images?.[0] ?? '/placeholder-product.jpg'
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: Number.isFinite(product.price) ? product.price : 0,
        image: unitImage,
        slug: product.slug,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg h-96 animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded h-20 animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-200 rounded h-8 w-3/4 animate-pulse" />
              <div className="bg-gray-200 rounded h-4 w-full animate-pulse" />
              <div className="bg-gray-200 rounded h-4 w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <p className="text-gray-600">We couldn’t find a product for this link.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-yellow-400' : 'border-gray-200'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category?.name ?? 'General'}</Badge>
                {product.inventory > 0 && product.inventory < 10 && (
                  <Badge variant="destructive">Only {product.inventory} left</Badge>
                )}
                {product.inventory === 0 && (
                  <Badge variant="destructive">Out of stock</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < ratingStars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">
                    ({Number.isFinite(product.reviewCount) ? product.reviewCount : 0} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {priceLabel}
                </span>
                {compareLabel && (
                  <span className="text-xl text-gray-500 line-through">
                    {compareLabel}
                  </span>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setQuantity((q) => Math.min(Math.max(product.inventory, 1), q + 1))
                    }
                    disabled={product.inventory <= 0}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 yellow-tokri-button"
                  disabled={product.inventory === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" title="Add to wishlist">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" title="Share">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              {product.inventory === 0 && (
                <p className="text-red-600 text-sm mt-2">
                  This item is currently out of stock
                </p>
              )}
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="bg-white rounded-xl p-6 border">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.round(review.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-gray-900">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        {review.title && (
                          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                        )}
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Standard Shipping</span>
                    <span className="font-semibold">3-5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Express Shipping</span>
                    <span className="font-semibold">1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Free Shipping</span>
                    <span className="font-semibold">Orders over $50</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
