import { Link } from '@tanstack/react-router'
import { BraceletArt } from './BraceletArt'
import { colorName } from '../data/colors'
import type { Preset } from '../data/presets'

export function PresetCard({ preset }: { preset: Preset }) {
  return (
    <Link to="/custom" search={{ preset: preset.id }} className="group block">
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-sand transition-transform group-hover:-translate-y-1">
        <BraceletArt colors={preset.colors} size={200} />
      </div>
      <h3 className="mt-4 font-medium">{preset.name}</h3>
      <p className="text-sm text-stone-600">
        {preset.colors.map(colorName).join(', ')}
      </p>
    </Link>
  )
}
