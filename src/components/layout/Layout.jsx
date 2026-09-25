import { useLocation, useOutlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PageTransition from './PageTransition'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const isHome = location.pathname === '/'

  return (
    <div className="relative flex min-h-screen flex-col bg-mesh">
      <ScrollProgress />
      <div className="grain-overlay" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className={isHome ? 'flex-1' : 'flex-1 pt-24 sm:pt-28'}>
        <PageTransition key={location.pathname}>{outlet}</PageTransition>
      </main>
      {!isHome && <Footer />}
    </div>
  )
}
