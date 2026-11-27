import { Link } from '@tanstack/react-router'
import { useCart } from './cart'

const linkClass = 'text-sm text-stone-600 transition-colors hover:text-ink'

export function Header() {
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight">
          Loop Lab
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            to="/shop"
            className={linkClass}
            activeProps={{ className: 'text-sm text-ink font-medium' }}
          >
            Shop
          </Link>
          <Link
            to="/custom"
            className={linkClass}
            activeProps={{ className: 'text-sm text-ink font-medium' }}
          >
            Custom
          </Link>
          <Link
            to="/about"
            className={linkClass}
            activeProps={{ className: 'text-sm text-ink font-medium' }}
          >
            About
          </Link>
          <Link
            to="/cart"
            className="relative text-sm text-stone-600 hover:text-ink"
          >
            Cart
            {count > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
