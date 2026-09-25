import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Newspaper, CalendarDays, MessageSquareText, MapPinned, LayoutDashboard, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import { cn } from '../../utils/cn'
import { EASE_OUT, DURATION, STAGGER } from '../../utils/motion'

const cards = [
  {
    to: '/news',
    icon: Newspaper,
    title: 'Campus News Hub',
    description: 'Announcements, achievements and updates from every faculty — searchable and filterable.',
    span: 'lg:col-span-2',
    radius: 'rounded-[36px_36px_36px_10px]',
  },
  {
    to: '/schedule',
    icon: CalendarDays,
    title: 'Academic Schedule',
    description: 'Your weekly timetable, organized by day with room and instructor details.',
    span: '',
    radius: 'rounded-[36px_10px_36px_36px]',
  },
  {
    to: '/dashboard',
    icon: LayoutDashboard,
    title: 'Student Dashboard',
    description: 'GPA, attendance, upcoming events and quick actions at a glance.',
    span: '',
    radius: 'rounded-3xl',
  },
  {
    to: '/booking',
    icon: MapPinned,
    title: 'Facility Booking',
    description: 'Reserve study rooms, labs and event spaces in a few clicks.',
    span: '',
    radius: 'rounded-[10px_36px_36px_36px]',
  },
  {
    to: '/feedback',
    icon: MessageSquareText,
    title: 'Student Feedback',
    description: 'Tell us what’s working — and what needs fixing across campus services.',
    span: '',
    radius: 'rounded-3xl',
  },
]

export default function QuickAccess() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 sm:pb-14">
      <SectionHeading
        eyebrow="Quick Access"
        title="Everything you need, one tap away"
        description="Five core modules designed around how students actually move through their day on campus."
      />

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.to}
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
            className={card.span}
          >
            <TiltCard tiltStrength={6} className={cn('h-full', card.radius)}>
              <NavLink
                to={card.to}
                className={cn(
                  'relative flex h-full min-h-[152px] flex-col justify-between overflow-hidden border border-white/8 glass p-5 shadow-glass transition-shadow duration-300 group-hover:shadow-glass-lg',
                  card.radius
                )}
              >
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-15"
                  aria-hidden="true"
                />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand-600 group-hover:text-white">
                  <card.icon size={20} strokeWidth={2.25} />
                </div>

                <div className="relative mt-6">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-lg font-bold text-ink-900">{card.title}</h3>
                    <ArrowUpRight
                      size={16}
                      className="text-ink-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-600"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{card.description}</p>
                </div>
              </NavLink>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
