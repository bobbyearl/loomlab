import { CONTACT_EMAIL, VENMO_USERNAME } from '../config'
import { colorName } from '../data/colors'
import type { CartItem } from '../components/cart'

const MAX_NOTE_LENGTH = 250

function describe(item: CartItem) {
  const isCustom = item.key.startsWith('custom-')
  const details = [
    isCustom ? item.colors.map(colorName).join('/') : null,
    item.length,
    `${item.clip} clip`,
    item.notes,
  ].filter(Boolean)
  return `${item.quantity}x ${item.name} (${details.join(', ')})`
}

export function orderNote(
  items: Array<CartItem>,
  name: string,
  address: string,
) {
  const note = `Loop Lab order for ${name.trim()}, ${address.trim().replace(/\s*\n\s*/g, ', ')}. ${items.map(describe).join('; ')}`
  return note.length > MAX_NOTE_LENGTH
    ? `${note.slice(0, MAX_NOTE_LENGTH - 1)}…`
    : note
}

export function wasTruncated(note: string) {
  return note.endsWith('…')
}

// Venmo's web pay page. It reads these query fields, so it works in a desktop
// browser (signed in to Venmo) as well as on a phone.
export function venmoUrl(total: number, note: string) {
  const params = new URLSearchParams({
    txn: 'pay',
    recipients: VENMO_USERNAME,
    amount: total.toFixed(2),
    note,
    audience: 'private',
  })
  return `https://account.venmo.com/pay?${params.toString().replace(/\+/g, '%20')}`
}

export const contactMailto = `mailto:${CONTACT_EMAIL}`
