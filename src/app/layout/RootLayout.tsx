import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function RootLayout() {
  const { pathname } = useLocation()
  const isLesson = pathname.startsWith('/learn/') && pathname.split('/').length >= 3
  // /learn/:slug or /learn/:slug/:page — lesson chrome is self-contained
  const lessonMode =
    pathname.startsWith('/learn/') && pathname !== '/learn' && pathname.split('/').filter(Boolean).length >= 2

  if (lessonMode) {
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
      {!isLesson ? <Footer /> : null}
    </div>
  )
}
