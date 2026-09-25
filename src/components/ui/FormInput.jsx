import { useId } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function FormInput({
  label,
  error,
  hint,
  as = 'input',
  className,
  required,
  ...props
}) {
  const id = useId()
  const Tag = as
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const isSelect = as === 'select'

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink-800">
          {label}
          {required && <span className="text-coral-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <Tag
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          style={{ colorScheme: 'dark' }}
          className={cn(
            'w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm text-ink-800',
            'placeholder:text-ink-400 outline-none transition-all duration-200',
            'focus:bg-white/8 focus:ring-4',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-coral-400 focus:ring-coral-400/15 focus:border-coral-500'
              : 'border-mist-200 focus:ring-brand-400/15 focus:border-brand-400',
            as === 'textarea' && 'min-h-32 resize-none',
            isSelect && 'appearance-none pr-10',
            className
          )}
          {...props}
        />
        {isSelect && (
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-medium text-coral-500" role="alert">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      )}
    </div>
  )
}
