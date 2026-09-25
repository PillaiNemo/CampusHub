import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function GlassCard({
  className,
  children,
  hover = true,
  solid = false,
  as: Component = motion.div,
  ...props
}) {
  return (
    <Component
      className={cn(
        'rounded-3xl border border-white/8 p-6',
        solid ? 'glass-solid' : 'glass',
        'shadow-glass',
        hover && 'transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-1 hover:border-brand-200/60',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
