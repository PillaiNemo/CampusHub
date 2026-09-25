import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarX2, CalendarDays, Table2, LayoutGrid } from 'lucide-react'
import scheduleData from '../data/schedule.json'
import ScheduleCard from '../components/ScheduleCard'
import ScheduleWeekView from '../components/ScheduleWeekView'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import { cn } from '../utils/cn'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const faculties = ['All Faculties', ...new Set(scheduleData.map((s) => s.faculty))]
const facultyCounts = faculties.reduce((acc, f) => {
  acc[f] = f === 'All Faculties' ? scheduleData.length : scheduleData.filter((s) => s.faculty === f).length
  return acc
}, {})

const typeTones = {
  Lecture: 'brand',
  Lab: 'teal',
  Seminar: 'gold',
  Tutorial: 'coral',
}

const legendDotColors = {
  Lecture: 'bg-brand-600',
  Lab: 'bg-teal-500',
  Seminar: 'bg-gold-500',
  Tutorial: 'bg-coral-500',
}

const views = [
  { id: 'week', label: 'Week', icon: CalendarDays },
  { id: 'table', label: 'Table', icon: Table2 },
  { id: 'cards', label: 'Cards', icon: LayoutGrid },
]

export default function Schedule() {
  const [view, setView] = useState('week')
  const [activeDay, setActiveDay] = useState('Monday')
  const [faculty, setFaculty] = useState('All Faculties')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(timer)
  }, [])

  const byFaculty = useMemo(
    () => scheduleData.filter((item) => faculty === 'All Faculties' || item.faculty === faculty),
    [faculty]
  )

  const filtered = useMemo(
    () => byFaculty.filter((item) => item.day === activeDay).sort((a, b) => a.start.localeCompare(b.start)),
    [byFaculty, activeDay]
  )

  return (
    <div className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
      <SectionHeading
        eyebrow="Academic Schedule"
        title="Your week, mapped out"
        description="Browse lectures, labs, seminars and tutorials by day and faculty."
      />

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="glass-solid flex gap-1 rounded-2xl border border-white/8 p-1.5 shadow-glass">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
                className={cn(
                  'relative flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                  view === v.id ? 'text-white' : 'text-ink-600 hover:text-brand-600'
                )}
              >
                {view === v.id && (
                  <motion.span
                    layoutId="view-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-brand-600 shadow-glow-brand"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <v.icon size={16} />
                {v.label}
              </button>
            ))}
          </div>

          {view === 'week' && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {Object.entries(legendDotColors).map(([type, dotClass]) => (
                <span key={type} className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                  <span className={cn('h-2 w-2 rounded-full', dotClass)} aria-hidden="true" />
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className={cn(
            'glass-solid flex w-full max-w-xl gap-1 rounded-2xl border border-white/8 p-1.5 shadow-glass overflow-x-auto no-scrollbar',
            view === 'week' && 'lg:hidden'
          )}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              aria-pressed={activeDay === day}
              className={cn(
                'relative flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                activeDay === day ? 'text-white' : 'text-ink-600 hover:text-brand-600'
              )}
            >
              {activeDay === day && (
                <motion.span
                  layoutId="day-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-brand-600 shadow-glow-brand"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by faculty">
          {faculties.map((f) => (
            <button
              key={f}
              onClick={() => setFaculty(f)}
              aria-pressed={faculty === f}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                faculty === f
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-mist-200 bg-white/5 text-ink-600 hover:border-brand-300 hover:text-brand-600'
              )}
            >
              {f}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
                  faculty === f ? 'bg-brand-600/15' : 'bg-mist-200 text-ink-500'
                )}
              >
                {facultyCounts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="glass-solid rounded-3xl border border-white/8 p-6 shadow-glass">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          </div>
        ) : view === 'week' ? (
          byFaculty.length === 0 ? (
            <EmptyState message={`Nothing found for ${faculty}.`} />
          ) : (
            <ScheduleWeekView data={byFaculty} activeDay={activeDay} />
          )
        ) : filtered.length === 0 ? (
          <EmptyState message={`Nothing found for ${activeDay} in this faculty.`} />
        ) : view === 'cards' ? (
          <div className="flex flex-col gap-3">
            {filtered.map((item, i) => (
              <ScheduleCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-mist-200 glass-solid shadow-glass">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mist-200 text-xs uppercase tracking-wide text-ink-400">
                  <th scope="col" className="px-6 py-4 font-semibold">Time</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Course</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Instructor</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Room</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-mist-100 last:border-0 transition-colors hover:bg-brand-50/10"
                  >
                    <td className="px-6 py-4 font-semibold text-ink-800 whitespace-nowrap">
                      {item.start} – {item.end}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-ink-900">{item.course}</p>
                      <p className="text-xs text-ink-400">{item.code}</p>
                    </td>
                    <td className="px-6 py-4 text-ink-600">{item.instructor}</td>
                    <td className="px-6 py-4 text-ink-600">{item.room}</td>
                    <td className="px-6 py-4">
                      <Badge tone={typeTones[item.type] ?? 'neutral'}>{item.type}</Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-mist-200 bg-mist-100/60 py-20 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
        <CalendarX2 size={26} />
      </span>
      <div>
        <p className="font-display text-lg font-bold text-ink-900">No classes scheduled</p>
        <p className="mt-1 text-sm text-ink-500">{message}</p>
      </div>
    </motion.div>
  )
}
