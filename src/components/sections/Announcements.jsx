import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import newsData from '../../data/news.json'
import NewsCard from '../NewsCard'
import GlassCard from '../ui/GlassCard'
import GradientMedia from '../ui/GradientMedia'
import Badge from '../ui/Badge'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { EASE_OUT, DURATION, STAGGER } from '../../utils/motion'

function CompactRow({ item, index }) {
  const date = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
    >
      <GlassCard solid className="flex items-center gap-4 p-3">
        <GradientMedia variant={item.image} className="h-14 w-14 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <Badge tone="neutral" className="mb-1.5">
            {item.category}
          </Badge>
          <p className="truncate text-sm font-semibold text-ink-900">{item.title}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-ink-400">
            <span className="flex items-center gap-1">
              <CalendarDays size={11} /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {item.readTime}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function Announcements() {
  const [featured, ...rest] = newsData.slice(0, 5)

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 sm:pb-14">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Latest Announcements"
          title="Fresh off the campus wire"
          description="The story leading campus news this week, plus what else is happening."
        />
        <Button as={NavLink} to="/news" variant="secondary" icon={ArrowRight} className="shrink-0">
          View all news
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <NewsCard item={featured} featured index={0} />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-2">
          {rest.map((item, i) => (
            <CompactRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
