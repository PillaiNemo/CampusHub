import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import SplitText from './SplitText'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
}) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600',
            align === 'center' && 'justify-center'
          )}
        >
          <span className="h-px w-8 bg-brand-400" />
          {eyebrow}
        </motion.div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900 max-w-2xl">
        <SplitText text={title} staggerDelay={0.025} trigger="inView" />
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-ink-500 max-w-xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      {children}
    </div>
  )
}
