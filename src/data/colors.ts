export const palette = [
  ['Red', '#dc2626'],
  ['Orange', '#fb923c'],
  ['Yellow', '#eab308'],
  ['Green', '#22c55e'],
  ['Blue', '#2563eb'],
  ['Purple', '#7c3aed'],
  ['Pink', '#ec4899'],
  ['Black', '#18181b'],
  ['White', '#f5f5f4'],
] as const

export function colorName(hex: string) {
  return palette.find(([, value]) => value === hex)?.[0] ?? hex
}
