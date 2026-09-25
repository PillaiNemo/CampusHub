import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, CheckCircle2, Clock } from 'lucide-react'
import GlassCard from './ui/GlassCard'
import AnimatedCounter from './ui/AnimatedCounter'
import { EASE_OUT, DURATION, STAGGER } from '../utils/motion'

const icons = { book: BookOpen, chart: TrendingUp, check: CheckCircle2, clock: Clock }
const tones = [
  'from-brand-500 to-brand-700',
  'from-gold-400 to-gold-600',
  'from-teal-400 to-teal-500',
  'from-coral-400 to-coral-500',
]

export default function StatCard({ stat, index = 0 }) {
  const Icon = icons[stat.icon] ?? BookOpen
  const tone = tones[index % tones.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
    >
      <GlassCard className="flex h-full flex-col justify-between gap-4" solid>
        <div className="flex items-center justify-between">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-md`}>
            <Icon size={18} strokeWidth={2.25} />
          </span>
        </div>
        <div>
          <p className="font-display text-2xl font-extrabold text-ink-900">
            <AnimatedCounter value={stat.value} />
            <span className="ml-1 text-sm font-semibold text-ink-400">{stat.unit}</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-ink-700">{stat.label}</p>
          <p className="mt-0.5 text-xs text-ink-400">{stat.trend}</p>
        </div>
      </GlassCard>
    </motion.div>
  )
}
