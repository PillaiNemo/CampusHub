import { Image } from 'lucide-react'
import { cn } from '../../utils/cn'

const gradients = {
  'gradient-1': 'from-mist-200 via-brand-800 to-mist-50',
  'gradient-2': 'from-brand-700 via-brand-900 to-mist-100',
  'gradient-3': 'from-mist-100 via-brand-700 to-brand-900',
  'gradient-4': 'from-brand-800 via-mist-100 to-brand-900',
  'gradient-5': 'from-mist-200 via-brand-600 to-brand-900',
  'gradient-6': 'from-brand-900 via-brand-700 to-mist-100',
}

export default function GradientMedia({ as: Component = 'div', variant = 'gradient-1', className, children }) {
  return (
    <Component
      className={cn(
        'relative overflow-hidden bg-gradient-to-br',
        gradients[variant] ?? gradients['gradient-1'],
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, white, transparent 45%), radial-gradient(circle at 80% 70%, white, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <Image
        className="pointer-events-none absolute left-1/2 top-1/2 h-[22%] w-[22%] min-h-4 min-w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.16]"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      {children}
    </Component>
  )
}
