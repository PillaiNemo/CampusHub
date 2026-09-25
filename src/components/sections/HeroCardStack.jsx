import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Newspaper, CalendarDays, MapPinned, MessageSquareText, LayoutDashboard } from 'lucide-react'
import { cn } from '../../utils/cn'

const cards = [
  { to: '/news', icon: Newspaper, title: 'Campus News', sub: "What's happening today" },
  { to: '/schedule', icon: CalendarDays, title: 'Schedule', sub: 'Classes & deadlines' },
  { to: '/booking', icon: MapPinned, title: 'Booking', sub: 'Reserve a room, court, lab' },
  { to: '/feedback', icon: MessageSquareText, title: 'Feedback', sub: "Tell us what's up" },
  { to: '/dashboard', icon: LayoutDashboard, title: 'Dashboard', sub: 'Everything at a glance' },
]

const count = cards.length

function stacked(i) {
  return {
    x: i * 10,
    y: i * 16,
    rotate: -6 + i * 3,
    scale: 1 - i * 0.03,
  }
}

// Orbit/pyramid formation: one card apex at top, two below it, two more
// beneath those — reads as a deliberate cluster instead of a strict grid.
const orbitPositions = [
  { x: 0, y: -196 },
  { x: 140, y: -16 },
  { x: 106, y: 176 },
  { x: -106, y: 176 },
  { x: -140, y: -16 },
]

function spread(i) {
  return { ...orbitPositions[i], rotate: 0, scale: 1 }
}

export default function HeroCardStack() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((card, i) => {
        const Icon = card.icon
        const target = hovered ? spread(i) : stacked(i)
        const showContent = hovered || i === 0

        return (
          <motion.div
            key={card.to}
            initial={false}
            animate={{ ...target, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ zIndex: count - i }}
            className="absolute w-[150px] sm:w-[168px]"
          >
            <NavLink
              to={card.to}
              style={{ animationDelay: `${i * 0.3}s` }}
              className={cn(
                'flex flex-col gap-3 rounded-3xl border border-white/12 bg-mist-200 p-5 shadow-glass-lg transition-shadow duration-300 hover:shadow-glow-brand',
                i > 0 && !hovered && 'animate-float-tiny'
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={18} strokeWidth={2.25} />
              </span>
              <motion.span
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.2, delay: showContent ? 0.12 : 0 }}
              >
                <span className="block text-sm font-bold text-ink-900">{card.title}</span>
                <span className="mt-0.5 block text-xs text-ink-500">{card.sub}</span>
              </motion.span>
            </NavLink>
          </motion.div>
        )
      })}
    </div>
  )
}
