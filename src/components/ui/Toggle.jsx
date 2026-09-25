import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Toggle({ checked, onChange, label, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
        checked ? 'bg-brand-600' : 'bg-mist-200'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-md"
        style={{ left: checked ? 'calc(100% - 24px)' : '4px' }}
      />
    </button>
  )
}
