import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useCart } from '../components/cart'
import { BraceletArt } from '../components/BraceletArt'
import { formatPrice } from '../data/products'
import { CONTACT_EMAIL } from '../config'
import { orderNote, venmoUrl, wasTruncated } from '../lib/venmo'

export const Route = createFileRoute('/cart')({ component: Cart })

function Cart() {
  const { items, setQuantity } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const ready = name.trim() !== '' && address.trim() !== ''
  const note = ready ? orderNote(items, name, address) : ''

  if (items.length === 0) {
    return (
      <div className="container-page pt-16">
        <h1 className="font-display text-4xl tracking-tight">Your cart</h1>
        <p className="mt-4 text-stone-600">Your cart is empty.</p>
        <Link to="/shop" className="btn btn-primary mt-8">
          Browse bracelets
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page max-w-3xl pt-16">
      <h1 className="font-display text-4xl tracking-tight">Your cart</h1>
      <ul className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
        {items.map((item) => (
          <li key={item.key} className="flex items-center gap-6 py-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-sand">
              <BraceletArt colors={item.colors} size={80} clip={item.clip} />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-stone-600">
                {formatPrice(item.price)}
                {item.length ? ` · ${item.length}` : ''}
                {` · ${item.clip} clip`}
              </p>
              {item.notes ? (
                <p className="text-sm text-stone-500">Note: {item.notes}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label={`Remove one ${item.name}`}
                className="h-8 w-8 cursor-pointer rounded-full border border-stone-300 hover:border-ink"
                onClick={() => setQuantity(item.key, item.quantity - 1)}
              >
                -
              </button>
              <span className="w-4 text-center">{item.quantity}</span>
              <button
                aria-label={`Add one ${item.name}`}
                className="h-8 w-8 cursor-pointer rounded-full border border-stone-300 hover:border-ink"
                onClick={() => setQuantity(item.key, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="w-20 text-right">
              {formatPrice(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-lg">
        Total <span className="ml-2 font-medium">{formatPrice(total)}</span>
      </p>

      <section className="mt-10 space-y-6 rounded-2xl bg-sand p-8">
        <h2 className="font-display text-2xl tracking-tight">
          Where should we deliver?
        </h2>
        <label className="block">
          <span className="font-medium">Your name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5"
          />
        </label>
        <label className="block">
          <span className="font-medium">Delivery address or drop-off spot</span>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5"
          />
        </label>

        {ready ? (
          <>
            <div>
              <p className="text-sm font-medium">Your order note</p>
              <p className="mt-1 rounded-lg bg-white p-3 text-sm text-stone-600">
                {note}
              </p>
              {wasTruncated(note) && (
                <p className="mt-2 text-sm text-amber-700">
                  This order is long, so the note was shortened. Email us the
                  full order at {CONTACT_EMAIL}.
                </p>
              )}
            </div>
            <a
              href={venmoUrl(total, note)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Pay {formatPrice(total)} with Venmo
            </a>
            <p className="text-sm text-stone-600">
              Venmo opens with the amount and your order filled in. Your order
              is complete once you send the payment.
            </p>
          </>
        ) : (
          <p className="text-sm text-stone-600">
            Enter your name and address to see the Venmo payment.
          </p>
        )}
      </section>
    </div>
  )
}
