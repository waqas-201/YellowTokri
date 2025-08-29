import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and technology' },
  { name: 'Clothing', slug: 'clothing', description: 'Fashion and apparel for all' },
  { name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your home' },
  { name: 'Books', slug: 'books', description: 'Educational and entertainment books' },
  { name: 'Sports', slug: 'sports', description: 'Sports equipment and gear' },
  { name: 'Beauty', slug: 'beauty', description: 'Cosmetics and personal care' },
]

const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    compareAtPrice: 249.99,
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    categorySlug: 'electronics',
    inventory: 25,
    featured: true,
  },
  {
    name: 'Smart Watch Series 5',
    slug: 'smart-watch-series-5',
    description: 'Advanced fitness tracking with heart rate monitor and GPS.',
    price: 299.99,
    compareAtPrice: 349.99,
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'],
    categorySlug: 'electronics',
    inventory: 15,
    featured: true,
  },
  {
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Waterproof speaker with 360-degree sound and 12-hour battery.',
    price: 79.99,
    images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'],
    categorySlug: 'electronics',
    inventory: 40,
  },
  
  // Clothing
  {
    name: 'Classic Cotton T-Shirt',
    slug: 'classic-cotton-t-shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
    price: 24.99,
    images: ['https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg'],
    categorySlug: 'clothing',
    inventory: 100,
    featured: true,
  },
  {
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    description: 'Vintage-style denim jacket perfect for casual wear.',
    price: 89.99,
    compareAtPrice: 119.99,
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    categorySlug: 'clothing',
    inventory: 30,
  },
  {
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Lightweight running shoes with advanced cushioning technology.',
    price: 129.99,
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    categorySlug: 'clothing',
    inventory: 50,
    featured: true,
  },
  
  // Home & Garden
  {
    name: 'Ceramic Coffee Mug Set',
    slug: 'ceramic-coffee-mug-set',
    description: 'Set of 4 handcrafted ceramic mugs perfect for your morning coffee.',
    price: 49.99,
    images: ['https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'],
    categorySlug: 'home-garden',
    inventory: 60,
  },
  {
    name: 'Indoor Plant Collection',
    slug: 'indoor-plant-collection',
    description: 'Set of 3 low-maintenance indoor plants to brighten your space.',
    price: 69.99,
    images: ['https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg'],
    categorySlug: 'home-garden',
    inventory: 25,
    featured: true,
  },
  
  // Books
  {
    name: 'JavaScript: The Complete Guide',
    slug: 'javascript-complete-guide',
    description: 'Comprehensive guide to modern JavaScript development.',
    price: 39.99,
    images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'],
    categorySlug: 'books',
    inventory: 75,
  },
  {
    name: 'Design Thinking Handbook',
    slug: 'design-thinking-handbook',
    description: 'Learn the principles of user-centered design.',
    price: 34.99,
    images: ['https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'],
    categorySlug: 'books',
    inventory: 45,
  },
  
  // Sports
  {
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Non-slip yoga mat with alignment guides and carrying strap.',
    price: 59.99,
    images: ['https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg'],
    categorySlug: 'sports',
    inventory: 35,
  },
  {
    name: 'Resistance Bands Set',
    slug: 'resistance-bands-set',
    description: 'Complete set of resistance bands for home workouts.',
    price: 29.99,
    images: ['https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg'],
    categorySlug: 'sports',
    inventory: 80,
  },
  
  // Beauty
  {
    name: 'Natural Face Cream',
    slug: 'natural-face-cream',
    description: 'Organic face cream with vitamin E and natural ingredients.',
    price: 34.99,
    images: ['https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg'],
    categorySlug: 'beauty',
    inventory: 65,
  },
  {
    name: 'Essential Oils Set',
    slug: 'essential-oils-set',
    description: 'Set of 6 pure essential oils for aromatherapy and wellness.',
    price: 79.99,
    images: ['https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg'],
    categorySlug: 'beauty',
    inventory: 40,
    featured: true,
  },
]

const reviews = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    rating: 5,
    title: 'Amazing quality!',
    comment: 'These headphones exceeded my expectations. The sound quality is incredible and they are very comfortable to wear for hours.',
  },
  {
    name: 'Mike Chen',
    email: 'mike@example.com',
    rating: 4,
    title: 'Great value',
    comment: 'Good product for the price. Would recommend to friends.',
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com',
    rating: 5,
    title: 'Love it!',
    comment: 'Perfect fit and great quality. Will definitely order again.',
  },
]

async function main() {
  console.log('Start seeding...')

  // Create categories
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      })
    )
  )

  console.log('Categories created:', createdCategories.length)

  // Create products
  for (const productData of products) {
    const category = createdCategories.find(c => c.slug === productData.categorySlug)
    if (!category) continue

    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice,
        images: productData.images,
        categoryId: category.id,
        inventory: productData.inventory,
        featured: productData.featured || false,
        ratings: Math.random() * 2 + 3, // Random rating between 3-5
        reviewCount: Math.floor(Math.random() * 50) + 5, // Random review count
      },
    })

    // Add sample reviews for each product
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      const review = reviews[Math.floor(Math.random() * reviews.length)]
      await prisma.review.create({
        data: {
          productId: product.id,
          name: review.name,
          email: review.email,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
          verified: Math.random() > 0.3,
        },
      })
    }
  }

  console.log('Products and reviews created')

  // Create a sample customer
  const customer = await prisma.customer.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      phone: '+1234567890',
    },
  })

  // Create sample orders
  for (let i = 0; i < 10; i++) {
    const orderNumber = `YT-${Date.now()}-${i}`
    const randomProducts = products.slice(0, Math.floor(Math.random() * 3) + 1)
    const subtotal = randomProducts.reduce((sum, p) => sum + p.price, 0)
    const tax = subtotal * 0.08
    const shipping = subtotal > 50 ? 0 : 9.99
    const total = subtotal + tax + shipping

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        email: customer.email,
        phone: customer.phone,
        status: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'][Math.floor(Math.random() * 5)] as any,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address1: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'US',
        },
      },
    })

    // Create order items
    for (const productData of randomProducts) {
      const product = await prisma.product.findUnique({ where: { slug: productData.slug } })
      if (product) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity: Math.floor(Math.random() * 3) + 1,
            price: product.price,
          },
        })
      }
    }
  }

  console.log('Sample orders created')
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })