import { motion } from 'framer-motion'
import { Users, MapPin, Check } from 'lucide-react'
import GradientMedia from './ui/GradientMedia'
import Badge from './ui/Badge'
import { cn } from '../utils/cn'
import { EASE_OUT, DURATION, STAGGER } from '../utils/motion'

export default function FacilityCard({ facility, selected, onSelect, index = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(facility.id)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
      aria-pressed={selected}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border text-left shadow-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg',
        selected ? 'border-brand-500 ring-4 ring-brand-400/20' : 'border-white/8 glass'
      )}
    >
      <GradientMedia variant={facility.image} className="h-28">
        {selected && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-600 shadow-md">
            <Check size={15} strokeWidth={3} />
          </span>
        )}
      </GradientMedia>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge tone="neutral" className="w-fit">
          {facility.category}
        </Badge>
        <h4 className="line-clamp-2 font-display text-sm font-bold text-ink-900">{facility.name}</h4>
        <div className="flex flex-col gap-1 text-xs text-ink-500">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin size={12} className="shrink-0" /> <span className="truncate">{facility.location}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={12} /> Capacity: {facility.capacity}
          </span>
        </div>
      </div>
    </motion.button>
  )
}
