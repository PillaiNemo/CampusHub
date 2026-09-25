import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const START_HOUR = 8
const END_HOUR = 16
const HOUR_HEIGHT = 64

const typeBarColors = {
  Lecture: 'bg-brand-600',
  Lab: 'bg-teal-500',
  Seminar: 'bg-gold-500',
  Tutorial: 'bg-coral-500',
}

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function WeekEventBlock({ item, index }) {
  const top = ((toMinutes(item.start) - START_HOUR * 60) / 60) * HOUR_HEIGHT + 2
  const height = Math.max(((toMinutes(item.end) - toMinutes(item.start)) / 60) * HOUR_HEIGHT - 4, 30)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -2 }}
      className={cn(
        'group absolute inset-x-1 z-0 overflow-hidden rounded-lg border border-white/15 px-2.5 py-1.5 text-white shadow-sm transition-shadow duration-200 hover:z-20 hover:shadow-lg',
        typeBarColors[item.type] ?? 'bg-ink-600'
      )}
      style={{ top, height }}
    >
      <p className="truncate text-xs font-bold leading-tight">{item.course}</p>
      <p className="mt-0.5 truncate text-[10px] text-white/75">
        {item.start}–{item.end}
      </p>

      <div className="glass-solid pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-max max-w-[180px] -translate-x-1/2 rounded-xl border border-white/10 px-3 py-2 text-left opacity-0 shadow-glass transition-opacity duration-150 group-hover:opacity-100">
        <p className="text-xs font-bold text-ink-900">{item.course}</p>
        <p className="mt-1 text-[11px] text-ink-500">{item.instructor}</p>
        <p className="text-[11px] text-ink-500">{item.room}</p>
      </div>
    </motion.div>
  )
}

function HourGutter({ hours }) {
  return (
    <div className="relative">
      {hours.map((h) => (
        <span
          key={h}
          className="absolute right-2 -translate-y-1/2 text-[11px] text-ink-400"
          style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}
        >
          {String(h).padStart(2, '0')}:00
        </span>
      ))}
    </div>
  )
}

function DayColumn({ day, hours, data }) {
  return (
    <div className="relative border-l border-mist-200">
      {hours.map((h) => (
        <div
          key={h}
          className="absolute inset-x-0 border-t border-mist-100"
          style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}
          aria-hidden="true"
        />
      ))}
      {data
        .filter((item) => item.day === day)
        .map((item, i) => (
          <WeekEventBlock key={item.id} item={item} index={i} />
        ))}
    </div>
  )
}

export default function ScheduleWeekView({ data, activeDay = 'Monday' }) {
  const totalHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)

  return (
    <>
      {/* Single-day view — avoids squeezing 5 columns into a narrow screen */}
      <div className="glass-solid rounded-3xl border border-white/8 shadow-glass lg:hidden">
        <div className="border-b border-mist-200 px-4 py-3 text-sm font-semibold text-ink-900">{activeDay}</div>
        <div className="grid grid-cols-[56px_1fr]" style={{ height: totalHeight }}>
          <HourGutter hours={hours} />
          <DayColumn day={activeDay} hours={hours} data={data} />
        </div>
      </div>

      {/* Full week grid — desktop only, room for all 5 columns without scrolling */}
      <div className="glass-solid hidden overflow-x-auto rounded-3xl border border-white/8 shadow-glass lg:block">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[56px_repeat(5,1fr)] border-b border-mist-200">
            <div />
            {DAYS.map((day) => (
              <div key={day} className="border-l border-mist-200 px-3 py-3.5 text-center text-sm font-semibold text-ink-900">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[56px_repeat(5,1fr)]" style={{ height: totalHeight }}>
            <HourGutter hours={hours} />
            {DAYS.map((day) => (
              <DayColumn key={day} day={day} hours={hours} data={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
