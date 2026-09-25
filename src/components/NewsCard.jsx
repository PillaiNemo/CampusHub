import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'
import GradientMedia from './ui/GradientMedia'
import Badge from './ui/Badge'
import TiltCard from './ui/TiltCard'
import { cn } from '../utils/cn'
import { EASE_OUT, DURATION, STAGGER } from '../utils/motion'

export default function NewsCard({ item, featured = false, index = 0 }) {
  const date = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
      className="h-full"
    >
      <TiltCard tiltStrength={3} className="h-full">
        <GradientMedia
          variant={item.image}
          as="article"
          className="relative flex h-full min-h-[200px] flex-col justify-end overflow-hidden rounded-3xl shadow-glass-lg"
        >
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute left-4 top-4">
            <Badge tone="neutral" className="border-white/15 bg-white/10 text-white backdrop-blur-md">
              {item.category}
            </Badge>
          </div>

          <div className="relative flex flex-col gap-2 p-5">
            <h3
              className={cn(
                'font-display font-bold text-white line-clamp-2',
                featured ? 'text-xl sm:text-2xl' : 'text-base'
              )}
            >
              {item.title}
            </h3>
            {featured && (
              <p className="max-w-lg text-sm leading-relaxed text-white/70 line-clamp-2">{item.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} /> {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} /> {item.readTime}
              </span>
            </div>
            {featured && (
              <NavLink
                to="/news"
                className="group/link relative z-10 mt-1 flex w-fit items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-brand-300"
              >
                Read the full story
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
              </NavLink>
            )}
          </div>
        </GradientMedia>
      </TiltCard>
    </motion.div>
  )
}
