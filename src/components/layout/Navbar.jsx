import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as MenuIcon, GraduationCap } from 'lucide-react'
import { cn } from '../../utils/cn'
import Menu from './Menu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between rounded-2xl glass-solid shadow-glass px-4 py-2.5 sm:px-6 transition-all duration-300'
          )}
        >
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Campus Hub home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-gold-500 text-white shadow-glow-brand">
              <GraduationCap size={20} strokeWidth={2.25} />
            </span>
            <span className="font-display font-bold text-ink-900 leading-tight text-sm sm:text-base">
              Campus Hub
              <span className="block text-[10px] font-medium text-ink-500 tracking-wide">Hope Africa University</span>
            </span>
          </NavLink>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-mist-100"
          >
            <span className="hidden sm:inline">Menu</span>
            <MenuIcon size={20} />
          </button>
        </div>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
