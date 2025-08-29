'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import Image from 'next/image'

// --- Zod schema ---
const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP Code is required'),
  country: z.string().min(1),
  cod: z.literal(true, { errorMap: () => ({ message: 'You must accept Cash on Delivery' }) }),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: { cod: undefined, country: 'US' },
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const codValue = watch('cod')

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true)
    try {
      const orderData = {
        email: data.email,
        phone: data.phone,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        paymentMethod: data.cod ? 'COD' : 'Pending',
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        console.log('Order Response:', order)

        clearCart()
        setOrderNumber(order.orderNumber) // <-- trigger redirect via useEffect
      }
    } catch (err) {
      console.error('Failed to place order:', err)
    } finally {
      setLoading(false)
    }
  }

  // Redirect after orderNumber is set
  useEffect(() => {
    if (orderNumber) {
      router.push(`/checkout/success?order=${orderNumber}`)
    }
  }, [orderNumber, router])

  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Optional" {...register('phone')} />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="First Name" {...register('firstName')} />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Last Name" {...register('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Optional" {...register('company')} />
                </div>

                <div>
                  <Label htmlFor="address1">Address *</Label>
                  <Input id="address1" placeholder="Street address" {...register('address1')} />
                  {errors.address1 && <p className="text-red-500 text-sm">{errors.address1.message}</p>}
                </div>

                <div>
                  <Label htmlFor="address2">Apartment, suite, etc.</Label>
                  <Input id="address2" placeholder="Optional" {...register('address2')} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="City" {...register('city')} />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" placeholder="State" {...register('state')} />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input id="zipCode" placeholder="ZIP Code" {...register('zipCode')} />
                    {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
                  <Lock className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-yellow-800">
                    Payment integration coming soon. Orders will be placed without online payment.
                  </span>
                </div>

                {/* COD */}
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    {...register('cod')}
                    className="h-4 w-4 text-yellow-600 border-gray-300 rounded"
                  />
                  <label className="text-gray-700 font-medium">Cash on Delivery (COD) *</label>
                </div>
                {errors.cod && <p className="text-red-500 text-sm">{errors.cod.message}</p>}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>

                  {codValue && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                      Payment Method: Cash on Delivery (COD)
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading || !isValid}
                  className="w-full yellow-tokri-button"
                  size="lg"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>

                {shipping > 0 && (
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
