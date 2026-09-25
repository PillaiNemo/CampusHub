import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import PerspectiveText from '../ui/PerspectiveText'
import dashboardData from '../../data/dashboard.json'
import { cn } from '../../utils/cn'
import { EASE_OUT, EASE_REVEAL, STAGGER } from '../../utils/motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/news', label: 'News' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/booking', label: 'Booking' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/profile', label: 'Profile' },
]

const CURVE_WIDTH = 100

function MenuCurve() {
  const [height, setHeight] = useState(() => window.innerHeight)
  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const flat = `M${CURVE_WIDTH} 0 L${CURVE_WIDTH} ${height} Q${CURVE_WIDTH} ${height / 2} ${CURVE_WIDTH} 0`
  const curved = `M${CURVE_WIDTH} 0 L${CURVE_WIDTH} ${height} Q-60 ${height / 2} ${CURVE_WIDTH} 0`

  return (
    <svg
      width={CURVE_WIDTH}
      height={height}
      style={{ overflow: 'visible' }}
      className="pointer-events-none absolute right-full top-0"
      aria-hidden="true"
    >
      <motion.path
        initial={{ d: curved }}
        animate={{ d: flat }}
        transition={{ duration: 1, ease: EASE_REVEAL }}
        fill="var(--color-mist-50)"
      />
    </svg>
  )
}

export default function Menu({ open, onClose }) {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const activeHref = hovered ?? location.pathname

  return createPortal(
    <div
      className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
        animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
        transition={{ duration: 0.6, ease: EASE_REVEAL }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-sm"
      >
        {!prefersReducedMotion && <MenuCurve />}

        <div className="relative flex h-full flex-col overflow-hidden bg-mist-50 px-8 py-8 shadow-glass-lg sm:px-12 sm:py-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-brand-500 opacity-20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Navigation</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav
            onMouseLeave={() => setHovered(null)}
            className="relative z-10 mt-8 flex flex-1 flex-col justify-center gap-1"
            aria-label="Primary"
          >
            {links.map((link, index) => {
              const isActive = activeHref === link.to
              return (
                <motion.div
                  key={link.to}
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: 32, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.25 + index * STAGGER }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onMouseEnter={() => setHovered(link.to)}
                    onClick={onClose}
                    className="group flex items-center gap-4 py-2.5"
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400 transition-transform duration-300',
                        isActive ? 'scale-100' : 'scale-0'
                      )}
                      aria-hidden="true"
                    />
                    <PerspectiveText
                      text={link.label}
                      className="font-display text-3xl font-bold leading-tight text-white/85 transition-colors group-hover:text-white sm:text-4xl"
                    />
                  </NavLink>
                </motion.div>
              )
            })}
          </nav>

          <NavLink
            to="/profile"
            onClick={onClose}
            className="relative z-10 mt-auto flex items-center gap-3 border-t border-white/10 pt-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-gold-500 font-display text-sm font-bold text-white">
              {dashboardData.student.avatarInitials}
            </span>
            <span className="text-sm text-white/60">
              {dashboardData.student.name}
              <span className="block text-xs text-white/40">View profile</span>
            </span>
          </NavLink>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
