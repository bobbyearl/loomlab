import { Outlet, createRootRoute } from '@tanstack/react-router'
import { CartProvider } from '../components/cart'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  )
}
