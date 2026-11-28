import { Link, createFileRoute } from '@tanstack/react-router'
import { PresetCard } from '../components/PresetCard'
import { presets, themes } from '../data/presets'
import type { Theme } from '../data/presets'

export const Route = createFileRoute('/shop/')({
  validateSearch: (search: Record<string, unknown>): { theme?: Theme } => ({
    theme: themes.find((t) => t.id === search.theme)?.id,
  }),
  component: Shop,
})

function Shop() {
  const { theme } = Route.useSearch()
  const visible = theme ? presets.filter((p) => p.theme === theme) : presets
  const tab = 'rounded-full border px-4 py-1.5 text-sm transition-colors'
  const active = 'border-ink bg-ink text-white'
  const idle = 'border-stone-300 hover:border-ink'

  return (
    <div className="container-page pt-16">
      <h1 className="font-display text-4xl tracking-tight">Shop</h1>
      <p className="mt-3 max-w-xl text-stone-600">
        Pick a color set to start from. You can change the colors and length on
        the next page, or{' '}
        <Link to="/custom" className="text-accent hover:underline">
          start from scratch
        </Link>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to="/shop"
          search={{}}
          className={`${tab} ${!theme ? active : idle}`}
        >
          All
        </Link>
        {themes.map((t) => (
          <Link
            key={t.id}
            to="/shop"
            search={{ theme: t.id }}
            className={`${tab} ${theme === t.id ? active : idle}`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      {theme === 'sports' && (
        <p className="mt-4 text-sm text-stone-500">
          Team colors only. Loop Lab is not affiliated with or endorsed by any
          team, school or league.
        </p>
      )}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <PresetCard key={p.id} preset={p} />
        ))}
      </div>
    </div>
  )
}
