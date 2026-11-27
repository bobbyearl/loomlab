import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '../components/ProductCard'
import { products, themes } from '../data/products'
import type { Theme } from '../data/products'

export const Route = createFileRoute('/shop/')({
  validateSearch: (search: Record<string, unknown>): { theme?: Theme } => ({
    theme: themes.find((t) => t.id === search.theme)?.id,
  }),
  component: Shop,
})

function Shop() {
  const { theme } = Route.useSearch()
  const visible = theme ? products.filter((p) => p.theme === theme) : products
  const tab = 'rounded-full border px-4 py-1.5 text-sm transition-colors'

  return (
    <div className="container-page pt-16">
      <h1 className="font-display text-4xl tracking-tight">Shop</h1>
      <p className="mt-3 text-stone-600">
        All bracelets, made by hand. Don't see your colors?{' '}
        <Link to="/custom" className="text-accent hover:underline">
          We make custom colors and lengths.
        </Link>
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to="/shop"
          search={{}}
          className={`${tab} ${!theme ? 'border-ink bg-ink text-white' : 'border-stone-300 hover:border-ink'}`}
        >
          All
        </Link>
        {themes.map((t) => (
          <Link
            key={t.id}
            to="/shop"
            search={{ theme: t.id }}
            className={`${tab} ${theme === t.id ? 'border-ink bg-ink text-white' : 'border-stone-300 hover:border-ink'}`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
