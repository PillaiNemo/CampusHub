import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import {
  CalendarDays,
  MessageSquareText,
  Clock,
  Newspaper,
  ArrowUpRight,
  CircleDot,
  User,
} from 'lucide-react'
import dashboardData from '../data/dashboard.json'
import StatCard from '../components/StatCard'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import { cn } from '../utils/cn'

const actionIcons = {
  calendar: CalendarDays,
  message: MessageSquareText,
  clock: Clock,
  newspaper: Newspaper,
  user: User,
}

const eventTones = {
  Exam: 'coral',
  Event: 'gold',
  Booking: 'brand',
  Meeting: 'teal',
}

export default function Dashboard() {
  const { student, stats, upcomingEvents, quickActions } = dashboardData
  const [statsLoading, setStatsLoading] = useState(true)
  const timelineRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setStatsLoading(false), 450)
    return () => clearTimeout(timer)
  }, [])
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.6'],
  })

  const sortedEvents = [...upcomingEvents].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-gold-500 font-display text-lg font-bold text-white shadow-glow-brand"
          >
            {student.avatarInitials}
          </motion.span>
          <div>
            <p className="text-sm text-ink-500">Welcome back,</p>
            <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">{student.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{student.program}</Badge>
              <Badge tone="neutral">{student.year}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-3xl border border-white/8 glass-solid p-6 shadow-glass">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))
          : stats.map((stat, i) => <StatCard key={stat.id} stat={stat} index={i} />)}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Timeline" title="Upcoming events" align="left" className="mb-6" />
          <div ref={timelineRef} className="relative">
            <motion.div
              className="absolute left-5 top-1 bottom-1 w-px origin-top bg-gradient-to-b from-brand-500 via-brand-300 to-transparent"
              style={{ scaleY: timelineProgress }}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-3">
            {sortedEvents.map((event, i) => {
              const date = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass flex items-center gap-4 rounded-2xl border border-white/8 p-4 shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <CircleDot size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{event.title}</p>
                    <p className="text-xs font-semibold text-brand-600">
                      {date} · {event.time}
                    </p>
                  </div>
                  <Badge
                    tone={eventTones[event.type] ?? 'neutral'}
                    className={cn('shrink-0', event.type === 'Exam' && 'pulse-glow-coral')}
                  >
                    {event.type}
                  </Badge>
                </motion.div>
              )
            })}
            </div>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Shortcuts" title="Quick actions" align="left" className="mb-6" />
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => {
              const Icon = actionIcons[action.icon] ?? CalendarDays
              const isLastOdd = i === quickActions.length - 1 && quickActions.length % 2 === 1
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(isLastOdd && 'col-span-2')}
                >
                  <NavLink to={action.to} className="block h-full">
                    <GlassCard
                      className={cn(
                        'flex h-full gap-3 p-4',
                        isLastOdd ? 'flex-row items-center' : 'flex-col items-start'
                      )}
                      solid
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon size={16} />
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-ink-800">
                        {action.label}
                        <ArrowUpRight size={13} className="text-ink-400" />
                      </span>
                    </GlassCard>
                  </NavLink>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
