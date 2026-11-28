import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { BraceletArt } from '../components/BraceletArt'
import { useCart } from '../components/cart'
import { palette } from '../data/colors'
import { PRICE, getPreset, presets, sameColors, themes } from '../data/presets'

export const Route = createFileRoute('/custom')({
  validateSearch: (search: Record<string, unknown>): { preset?: string } => ({
    preset: getPreset(String(search.preset))?.id,
  }),
  component: Custom,
})

const lengthLabels: Record<string, string> = {
  '5.5': 'Kid (5.5 in)',
  '6.5': 'Small (6.5 in)',
  '7': 'Medium (7 in)',
  '8': 'Large (8 in)',
}

function Custom() {
  const { preset } = Route.useSearch()
  const [picked, setPicked] = useState<Array<string>>(
    getPreset(preset)?.colors ?? ['#ec4899', '#2563eb'],
  )
  const named = presets.find((p) => sameColors(p.colors, picked))
  const [length, setLength] = useState('7')
  const [notes, setNotes] = useState('')
  const { add } = useCart()
  const navigate = useNavigate()

  const toggle = (color: string) =>
    setPicked((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : prev.length < 3
          ? [...prev, color]
          : prev,
    )

  return (
    <div className="container-page pt-16">
      <h1 className="font-display text-4xl tracking-tight">
        Made just for you
      </h1>
      <p className="mt-3 max-w-xl text-stone-600">
        Start from a color set or pick your own. Choose your length, and we make
        it to fit. We pick the clip color that looks best with your colors.
      </p>
      <p className="mt-2 max-w-xl text-sm text-stone-500">
        Team colors only. Loop Lab is not affiliated with or endorsed by any
        team, school or league.
      </p>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-sand">
          <BraceletArt
            colors={picked.length ? picked : ['#a8a29e']}
            size={320}
          />
        </div>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault()
            add({
              key: `custom-${picked.join('')}-${length}-${notes}`,
              name: named?.name ?? 'Custom bracelet',
              price: PRICE,
              colors: picked,
              length: lengthLabels[length],
              notes: notes.trim() || undefined,
            })
            void navigate({ to: '/cart' })
          }}
        >
          <label className="block">
            <span className="font-medium">Start from a color set</span>
            <select
              value={named?.id ?? ''}
              onChange={(e) => {
                const next = getPreset(e.target.value)
                if (next) setPicked(next.colors)
              }}
              className="mt-2 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5"
            >
              <option value="" disabled>
                Your own colors
              </option>
              {themes.map((t) => (
                <optgroup key={t.id} label={t.label}>
                  {presets
                    .filter((p) => p.theme === t.id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="font-medium">
              Colors (up to 3, in the order you pick them)
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {palette.map(([label, color]) => (
                <button
                  type="button"
                  key={color}
                  aria-label={label}
                  aria-pressed={picked.includes(color)}
                  title={label}
                  onClick={() => toggle(color)}
                  className={`h-10 w-10 cursor-pointer rounded-full border border-black/20 ${picked.includes(color) ? 'ring-2 ring-ink ring-offset-2' : ''}`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="font-medium">Length</span>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5"
            >
              <option value="5.5">Kid (5.5 in)</option>
              <option value="6.5">Small (6.5 in)</option>
              <option value="7">Medium (7 in)</option>
              <option value="8">Large (8 in)</option>
            </select>
          </label>
          <label className="block">
            <span className="font-medium">Anything else?</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Team name, a holiday, a size..."
              className="mt-2 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5"
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={picked.length === 0}
          >
            Add to cart
          </button>
        </form>
      </div>
    </div>
  )
}
