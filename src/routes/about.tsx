import { Link, createFileRoute } from '@tanstack/react-router'
import { BraceletArt } from '../components/BraceletArt'
import { getPreset } from '../data/presets'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <div className="container-page max-w-3xl pt-16">
      <h1 className="font-display text-4xl tracking-tight">Our story</h1>
      <div className="my-10 flex justify-center rounded-2xl bg-sand py-10">
        <BraceletArt colors={getPreset('ocean-wave')!.colors} size={220} />
      </div>
      <div className="space-y-5 text-lg leading-relaxed text-stone-700">
        <p>
          Loop Lab started with a rainbow loom and a big bag of rubber bands.
          What began as a hobby turned into a collection of bracelets we are
          proud to share.
        </p>
        <p>
          Every bracelet is designed, looped, and clipped by hand. We pick
          colors that go together and test each one for comfort before it goes
          in the shop.
        </p>
      </div>
      <Link to="/shop" className="btn btn-primary mt-10">
        See the collection
      </Link>
    </div>
  )
}
