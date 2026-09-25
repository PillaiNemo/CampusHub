import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users2, BookOpenCheck, Building2, Trophy, ArrowRight } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { EASE_OUT, DURATION, STAGGER } from '../../utils/motion'

const highlights = [
  { icon: Users2, value: '12,400+', label: 'Enrolled Students', note: 'Across all six faculties' },
  { icon: BookOpenCheck, value: '86', label: 'Academic Programs', note: 'Undergraduate & graduate' },
  { icon: Building2, value: '6', label: 'Faculties Campus-Wide', note: 'Sciences to Humanities' },
  { icon: Trophy, value: 'Top 5', label: 'Regional Innovation Index', note: 'East Africa university rankings' },
]

export default function CampusHighlights() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col justify-center px-6 pb-10 sm:pb-14">
      <SectionHeading
        eyebrow="Campus at a Glance"
        title="The numbers behind Hope Africa University"
        description="A snapshot of the community, programs and reputation that make HAU home to thousands of students."
      />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
            className="glass flex flex-col gap-4 rounded-3xl border border-white/8 p-5 shadow-glass sm:p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <item.icon size={20} strokeWidth={2} />
            </span>
            <div>
              <p className="font-display text-3xl font-extrabold text-ink-900">
                <AnimatedCounter value={item.value} />
              </p>
              <p className="mt-1 text-xs font-medium text-ink-500">{item.label}</p>
              <p className="mt-2 text-[11px] text-ink-400">{item.note}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/8 glass-solid p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg font-bold text-ink-900">That Top 5 ranking made this week's news</p>
          <p className="mt-1 max-w-lg text-sm text-ink-500">
            See what else is happening across faculties, clubs and student services.
          </p>
        </div>
        <Button as={NavLink} to="/news" variant="secondary" icon={ArrowRight} className="shrink-0">
          Read campus news
        </Button>
      </div>
    </section>
  )
}
