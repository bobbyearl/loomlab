import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { BraceletArt } from '../components/BraceletArt'
import { useCart } from '../components/cart'
import { formatPrice, getProduct } from '../data/products'

export const Route = createFileRoute('/shop/$productId')({
  loader: ({ params }) => {
    const product = getProduct(params.productId)
    if (!product) throw notFound()
    return product
  },
  notFoundComponent: () => (
    <div className="container-page pt-16">
      <p>We couldn't find that bracelet.</p>
      <Link to="/shop" className="text-accent hover:underline">
        Back to the shop
      </Link>
    </div>
  ),
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  return (
    <div className="container-page pt-12">
      <Link to="/shop" className="text-sm text-stone-600 hover:text-ink">
        &larr; Back to shop
      </Link>
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-sand">
          <BraceletArt colors={product.colors} size={340} />
        </div>
        <div className="md:pt-8">
          <h1 className="font-display text-4xl tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-6 text-stone-600">{product.description}</p>
          <dl className="mt-6 text-sm">
            <dt className="font-medium">Materials</dt>
            <dd className="text-stone-600">{product.materials}</dd>
          </dl>
          <button
            className="btn btn-primary mt-8"
            onClick={() => {
              add({
                key: product.id,
                name: product.name,
                price: product.price,
                colors: product.colors,
                clip: 'black',
              })
              setAdded(true)
              setTimeout(() => setAdded(false), 1500)
            }}
          >
            {added ? 'Added!' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
