import { Link, createFileRoute } from '@tanstack/react-router'
import { BraceletArt } from '../components/BraceletArt'
import { products } from '../data/products'

export const Route = createFileRoute('/')({ component: Home })

const themeCards = [
  {
    title: 'Sports',
    text: 'Team colors and game day favorites.',
    colors: ['#1d4ed8', '#f97316'],
    link: { to: '/shop', search: { theme: 'sports' } },
  },
  {
    title: 'Holidays',
    text: 'Christmas, Thanksgiving, and more.',
    colors: ['#dc2626', '#16a34a'],
    link: { to: '/shop', search: { theme: 'holidays' } },
  },
  {
    title: 'Customized',
    text: 'Pick your colors and your length.',
    colors: ['#dc2626', '#fb923c', '#eab308', '#22c55e', '#2563eb', '#7c3aed'],
    link: { to: '/custom' },
  },
] as const

const testimonials = [
  {
    quote:
      'I asked for my soccer team colors and it fit perfectly. I wear it to every game.',
    name: 'Maya, age 10',
  },
  {
    quote:
      'The red and white one was a great gift for my sister. She has not taken it off.',
    name: 'Jordan, age 12',
  },
  {
    quote: 'Fast, colorful, and sturdy. My whole class wants one now.',
    name: 'Mr. Alvarez, teacher',
  },
]

function Home() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-accent">
              Handmade bracelets
            </p>
            <h1 className="font-display text-5xl leading-tight tracking-tight md:text-6xl">
              Made one loop at a time.
            </h1>
            <p className="mt-6 max-w-md text-lg text-stone-600">
              Colorful, comfortable bracelets designed and looped by hand. Find
              one that fits your style, or give one to a friend.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/shop" className="btn btn-primary">
                Shop bracelets
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Our story
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <BraceletArt colors={products[1].colors} size={360} />
          </div>
        </div>
      </section>

      <section className="container-page pt-20">
        <h2 className="mb-10 font-display text-3xl tracking-tight">
          Shop by theme
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {themeCards.map((card) => (
            <Link key={card.title} {...card.link} className="group block">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-sand transition-transform group-hover:-translate-y-1">
                <BraceletArt colors={card.colors} size={220} />
              </div>
              <h3 className="mt-4 font-medium">{card.title}</h3>
              <p className="text-sm text-stone-600">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pt-24">
        <h2 className="mb-10 font-display text-3xl tracking-tight">
          What people are saying
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-sand p-8">
              <blockquote className="text-lg leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-stone-600">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Sample reviews for our practice shop.
        </p>
      </section>

      <section className="container-page pt-24">
        <div className="rounded-2xl bg-ink px-8 py-14 text-center text-white">
          <h2 className="font-display text-3xl tracking-tight">
            Want it your way?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-300">
            We make custom bracelets in your colors and your length: team
            colors, favorite colors, or a gift sized for a friend.
          </p>
          <Link
            to="/custom"
            className="btn mt-8 bg-white text-ink hover:bg-stone-200"
          >
            Design yours
          </Link>
        </div>
      </section>

      <section className="container-page pt-24">
        <div className="grid gap-10 text-center md:grid-cols-3">
          {[
            [
              'Handmade',
              'Every bracelet is looped by hand, so no two are exactly alike.',
            ],
            [
              'Comfortable',
              'Stretchy rubber bands fit most wrists and clip on in a second.',
            ],
            [
              'Made to give',
              'Pick colors for a friend, a teammate, or yourself.',
            ],
          ].map(([title, text]) => (
            <div key={title}>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-2 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
