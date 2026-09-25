import { motion } from 'framer-motion'
import { Clock, MapPin, User } from 'lucide-react'
import Badge from './ui/Badge'
import { EASE_OUT, DURATION, STAGGER } from '../utils/motion'

const typeTones = {
  Lecture: 'brand',
  Lab: 'teal',
  Seminar: 'gold',
  Tutorial: 'coral',
}

export default function ScheduleCard({ item, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * STAGGER, duration: DURATION.fast, ease: EASE_OUT }}
      className="glass flex flex-col gap-3 rounded-2xl border border-white/8 p-4 shadow-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <span className="text-xs font-bold leading-none">{item.start}</span>
          <span className="text-[10px] text-brand-500 mt-0.5">{item.end}</span>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display text-sm font-bold text-ink-900">{item.course}</h4>
            <Badge tone={typeTones[item.type] ?? 'neutral'} className="py-0.5 px-2 text-[10px]">
              {item.type}
            </Badge>
          </div>
          <p className="mt-1 text-xs font-medium text-ink-400">{item.code}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pl-16 text-xs text-ink-500 sm:pl-0">
        <span className="flex items-center gap-1.5">
          <User size={13} /> {item.instructor}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={13} /> {item.room}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> {item.start}–{item.end}
        </span>
      </div>
    </motion.div>
  )
}
