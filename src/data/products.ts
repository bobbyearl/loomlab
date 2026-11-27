export type Theme = 'sports' | 'holidays' | 'everyday'

export const themes: Array<{ id: Theme; label: string }> = [
  { id: 'sports', label: 'Sports' },
  { id: 'holidays', label: 'Holidays' },
  { id: 'everyday', label: 'Everyday' },
]

export type Product = {
  id: string
  name: string
  price: number
  description: string
  materials: string
  colors: Array<string> // loop colors, used to draw the bracelet
  theme: Theme
  featured?: boolean
}

export const products: Array<Product> = [
  {
    id: 'candy-cane',
    theme: 'holidays',
    name: 'Candy Cane',
    price: 3,
    description:
      'Red and white loops twisted together like a candy cane. A perfect holiday bracelet.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#dc2626', '#f5f5f4'],
  },
  {
    id: 'neon-night',
    theme: 'everyday',
    name: 'Neon Night',
    price: 3,
    description:
      'Hot pink and black loops. Bold, bright, and impossible to miss.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#ec4899', '#18181b'],
  },
  {
    id: 'berry-blast',
    theme: 'everyday',
    name: 'Berry Blast',
    price: 3,
    description: 'Pink and purple loops that look like a mixed-berry smoothie.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#ec4899', '#7c3aed'],
  },
  {
    id: 'slime-time',
    theme: 'everyday',
    name: 'Slime Time',
    price: 3,
    description:
      'Bright green and orange loops with a lot of energy. Made for the playground.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#22c55e', '#fb923c'],
  },
  {
    id: 'game-day',
    theme: 'sports',
    name: 'Game Day',
    price: 3,
    description:
      'Blue and orange loops for cheering on your favorite team. We can match your team colors.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#1d4ed8', '#f97316'],
  },
  {
    id: 'home-run',
    theme: 'sports',
    name: 'Home Run',
    price: 3,
    description: 'Navy and red loops, made for baseball season.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#1e3a8a', '#dc2626'],
  },
  {
    id: 'christmas-tree',
    theme: 'holidays',
    name: 'Christmas Tree',
    price: 3,
    description: 'Green and red loops for the holiday season.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#16a34a', '#dc2626'],
  },
  {
    id: 'turkey-day',
    theme: 'holidays',
    name: 'Turkey Day',
    price: 3,
    description: 'Orange, brown and gold loops for Thanksgiving.',
    materials: 'Rubber bands, C clip (black or clear)',
    colors: ['#ea580c', '#78350f', '#eab308'],
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`
}
