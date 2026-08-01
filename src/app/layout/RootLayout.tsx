import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function RootLayout() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  // Full-chrome pages own their header (lesson reader, code exercise)
  const bareShell =
    (pathname.startsWith('/learn/') && parts.length >= 2) ||
    (pathname.startsWith('/code/') && parts.length >= 2)

  if (bareShell) {
    return (
      <div className="min-h-screen bg-paper">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
