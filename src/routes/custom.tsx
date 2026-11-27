import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { BraceletArt } from '../components/BraceletArt'
import { useCart } from '../components/cart'
import { palette } from '../data/colors'

export const Route = createFileRoute('/custom')({ component: Custom })

const lengthLabels: Record<string, string> = {
  '5.5': 'Kid (5.5 in)',
  '6.5': 'Small (6.5 in)',
  '7': 'Medium (7 in)',
  '8': 'Large (8 in)',
  measure: 'Length to be confirmed',
}

function Custom() {
  const [picked, setPicked] = useState<Array<string>>(['#ec4899', '#2563eb'])
  const [length, setLength] = useState('7')
  const [notes, setNotes] = useState('')
  const { add } = useCart()
  const navigate = useNavigate()
  const [clip, setClip] = useState<'black' | 'clear'>('black')

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
        Pick your colors, your length, and your clip. We make it to fit, in team
        colors, favorite colors, or as a gift for a friend.
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
              key: `custom-${picked.join('')}-${clip}-${length}-${notes}`,
              name: 'Custom bracelet',
              price: 3,
              colors: picked,
              clip,
              length: lengthLabels[length],
              notes: notes.trim() || undefined,
            })
            void navigate({ to: '/cart' })
          }}
        >
          <fieldset>
            <legend className="font-medium">Choose up to 3 colors</legend>
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
          <fieldset>
            <legend className="font-medium">Clip</legend>
            <div className="mt-3 flex gap-3">
              {(['black', 'clear'] as const).map((c) => (
                <button
                  type="button"
                  key={c}
                  aria-pressed={clip === c}
                  onClick={() => setClip(c)}
                  className={`btn capitalize ${clip === c ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {c}
                </button>
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
              <option value="measure">Not sure, I will measure my wrist</option>
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
