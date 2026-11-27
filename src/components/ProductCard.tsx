import { Link } from '@tanstack/react-router'
import { BraceletArt } from './BraceletArt'
import { formatPrice } from '../data/products'
import type { Product } from '../data/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$productId"
      params={{ productId: product.id }}
      className="group block"
    >
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-sand transition-transform group-hover:-translate-y-1">
        <BraceletArt colors={product.colors} size={200} />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-medium">{product.name}</h3>
        <span className="text-stone-600">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}
