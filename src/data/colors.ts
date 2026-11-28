export const palette = [
  ['Red', '#dc2626'],
  ['Garnet', '#73000a'],
  ['Orange', '#f97316'],
  ['Gold', '#d4a017'],
  ['Yellow', '#facc15'],
  ['Green', '#22c55e'],
  ['Dark Green', '#166534'],
  ['Teal', '#14b8a6'],
  ['Light Blue', '#7dd3fc'],
  ['Bright Blue', '#0085ca'],
  ['Blue', '#2563eb'],
  ['Navy', '#1e3a8a'],
  ['Purple', '#7c3aed'],
  ['Dark Purple', '#522d80'],
  ['Pink', '#ec4899'],
  ['Brown', '#78350f'],
  ['Black', '#18181b'],
  ['Silver', '#a1a1aa'],
  ['White', '#f5f5f4'],
] as const

export function colorName(hex: string) {
  return palette.find(([, value]) => value === hex)?.[0] ?? hex
}
