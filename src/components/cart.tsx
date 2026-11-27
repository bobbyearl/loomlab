import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

// A cart line holds everything needed to show it, so a regular bracelet and a
// custom one are handled the same way.
export type CartItem = {
  key: string
  name: string
  price: number
  colors: Array<string>
  clip: 'black' | 'clear'
  length?: string
  notes?: string
  quantity: number
}

type NewItem = Omit<CartItem, 'quantity'>

type CartContextValue = {
  items: Array<CartItem>
  count: number
  add: (item: NewItem) => void
  setQuantity: (key: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'loomlab-cart-v2'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Array<CartItem>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      add: (item) =>
        setItems((prev) =>
          prev.some((i) => i.key === item.key)
            ? prev.map((i) =>
                i.key === item.key ? { ...i, quantity: i.quantity + 1 } : i,
              )
            : [...prev, { ...item, quantity: 1 }],
        ),
      setQuantity: (key, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.key !== key)
            : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
        ),
      clear: () => setItems([]),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
