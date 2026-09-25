import { cn } from '../../utils/cn'

const tones = {
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  gold: 'bg-gold-300/30 text-gold-600 border-gold-400/40',
  teal: 'bg-teal-300/25 text-teal-500 border-teal-400/40',
  coral: 'bg-coral-400/15 text-coral-500 border-coral-400/30',
  neutral: 'bg-mist-100 text-ink-600 border-mist-200',
}

export default function Badge({ tone = 'brand', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
