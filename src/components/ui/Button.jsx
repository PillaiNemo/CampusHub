import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const createMotion = motion.create ?? motion
const motionTagCache = new Map()
function getMotionTag(Component) {
  if (!motionTagCache.has(Component)) {
    motionTagCache.set(Component, createMotion(Component))
  }
  return motionTagCache.get(Component)
}

const variants = {
  primary:
    'relative overflow-hidden bg-brand-600 text-white shadow-[0_0_0_1px_rgba(10,10,11,0.15),0_8px_30px_-6px_rgba(10,10,11,0.55)] hover:bg-brand-700',
  secondary:
    'glass-solid text-ink-800 hover:bg-white/8 border border-mist-200 shadow-glass',
  gold:
    'relative overflow-hidden bg-gold-500 text-mist-50 shadow-[0_0_0_1px_rgba(240,172,46,0.1),0_8px_30px_-6px_rgba(240,172,46,0.45)] hover:bg-gold-400',
  ghost:
    'text-ink-600 hover:text-brand-600 hover:bg-brand-50',
}

const sheenVariants = new Set(['primary', 'gold'])

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-2xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const MotionTag = useMemo(() => getMotionTag(Component), [Component])
  return (
    <MotionTag
      whileHover={{ y: -1.5, scale: 1.008 }}
      whileTap={{ scale: 0.975, y: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      className={cn(
        'group inline-flex items-center justify-center gap-2 font-semibold cursor-pointer select-none',
        'transition-colors duration-200 whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {sheenVariants.has(variant) && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      {Icon && iconPosition === 'left' && <Icon size={18} strokeWidth={2.25} className="relative" />}
      <span className="relative">{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={18} strokeWidth={2.25} className="relative" />}
    </MotionTag>
  )
}
