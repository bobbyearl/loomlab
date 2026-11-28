// Every bracelet is made on the custom page. A preset is just a set of colors
// to start from, so there is one place to order and one place to change.
export type Theme = 'sports' | 'holidays' | 'everyday'

export const themes: Array<{ id: Theme; label: string }> = [
  { id: 'sports', label: 'Sports' },
  { id: 'holidays', label: 'Holidays' },
  { id: 'everyday', label: 'Everyday' },
]

export const PRICE = 3

export type Preset = {
  id: string
  name: string
  theme: Theme
  colors: Array<string>
}

const red = '#dc2626'
const garnet = '#73000a'
const orange = '#f97316'
const gold = '#d4a017'
const green = '#22c55e'
const darkGreen = '#166534'
const lightBlue = '#7dd3fc'
const brightBlue = '#0085ca'
const blue = '#2563eb'
const navy = '#1e3a8a'
const purple = '#7c3aed'
const darkPurple = '#522d80'
const pink = '#ec4899'
const brown = '#78350f'
const black = '#18181b'
const silver = '#a1a1aa'
const white = '#f5f5f4'

export const presets: Array<Preset> = [
  // Sports. Colors only, no names or logos.
  {
    id: 'orange-purple',
    name: 'Orange & Purple',
    theme: 'sports',
    colors: [orange, darkPurple],
  },
  {
    id: 'garnet-black',
    name: 'Garnet & Black',
    theme: 'sports',
    colors: [garnet, black],
  },
  {
    id: 'blue-black-silver',
    name: 'Blue, Black & Silver',
    theme: 'sports',
    colors: [brightBlue, black, silver],
  },
  { id: 'game-day', name: 'Game Day', theme: 'sports', colors: [blue, orange] },
  { id: 'home-run', name: 'Home Run', theme: 'sports', colors: [navy, red] },
  {
    id: 'green-gold',
    name: 'Green & Gold',
    theme: 'sports',
    colors: [darkGreen, gold],
  },
  {
    id: 'navy-gold',
    name: 'Navy & Gold',
    theme: 'sports',
    colors: [navy, gold],
  },
  {
    id: 'red-black',
    name: 'Red & Black',
    theme: 'sports',
    colors: [red, black],
  },
  // Holidays
  {
    id: 'candy-cane',
    name: 'Candy Cane',
    theme: 'holidays',
    colors: [red, white],
  },
  {
    id: 'christmas-tree',
    name: 'Christmas Tree',
    theme: 'holidays',
    colors: [darkGreen, red],
  },
  {
    id: 'turkey-day',
    name: 'Turkey Day',
    theme: 'holidays',
    colors: [orange, brown, gold],
  },
  {
    id: 'halloween',
    name: 'Halloween',
    theme: 'holidays',
    colors: [orange, black],
  },
  {
    id: 'valentine',
    name: 'Valentine',
    theme: 'holidays',
    colors: [pink, red],
  },
  {
    id: 'hanukkah',
    name: 'Hanukkah',
    theme: 'holidays',
    colors: [blue, white, silver],
  },
  {
    id: 'patriotic',
    name: 'Red, White & Blue',
    theme: 'holidays',
    colors: [red, white, blue],
  },
  {
    id: 'st-patricks',
    name: "St. Patrick's Day",
    theme: 'holidays',
    colors: [green, white, gold],
  },
  // Everyday
  {
    id: 'neon-night',
    name: 'Neon Night',
    theme: 'everyday',
    colors: [pink, black],
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    theme: 'everyday',
    colors: [pink, purple],
  },
  {
    id: 'slime-time',
    name: 'Slime Time',
    theme: 'everyday',
    colors: [green, orange],
  },
  {
    id: 'ocean-wave',
    name: 'Ocean Wave',
    theme: 'everyday',
    colors: [blue, lightBlue, white],
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    theme: 'everyday',
    colors: [orange, pink, gold],
  },
  {
    id: 'forest-trail',
    name: 'Forest Trail',
    theme: 'everyday',
    colors: [darkGreen, brown, green],
  },
  {
    id: 'midnight-stars',
    name: 'Midnight Stars',
    theme: 'everyday',
    colors: [navy, darkPurple, silver],
  },
  {
    id: 'black-white',
    name: 'Black & White',
    theme: 'everyday',
    colors: [black, white],
  },
]

export function getPreset(id: string | undefined) {
  return presets.find((p) => p.id === id)
}

export function sameColors(a: ReadonlyArray<string>, b: ReadonlyArray<string>) {
  return a.length === b.length && a.every((c, i) => c === b[i])
}
