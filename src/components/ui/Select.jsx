import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Check, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Select({
  label,
  required,
  error,
  hint,
  value,
  onChange,
  options,
  placeholder = 'Select…',
  className,
  disabled,
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef(null)
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  // Keydown can fire more than once for a single logical key press in some
  // environments (StrictMode, synthetic dispatch). Refs give handleKeyDown a
  // read of the true current value instead of a closure that may be stale
  // across those extra calls, so open/close and selection never double-fire.
  const openRef = useRef(open)
  const activeIndexRef = useRef(activeIndex)
  openRef.current = open
  activeIndexRef.current = activeIndex

  const normalized = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  const selected = normalized.find((o) => o.value === value)

  const setOpenState = (val) => {
    openRef.current = val
    setOpen(val)
  }

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpenState(false)
    }
    setActiveIndex(Math.max(0, normalized.findIndex((o) => o.value === value)))
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function handleKeyDown(e) {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!openRef.current) {
        setOpenState(true)
        return
      }
      const opt = normalized[activeIndexRef.current]
      setOpenState(false)
      if (opt) onChange(opt.value)
      return
    }
    if (!openRef.current && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault()
      setOpenState(true)
      return
    }
    if (!openRef.current) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => {
        const next = Math.min(normalized.length - 1, i + 1)
        activeIndexRef.current = next
        return next
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => {
        const next = Math.max(0, i - 1)
        activeIndexRef.current = next
        return next
      })
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpenState(false)
    }
  }

  return (
    <div className="flex flex-col gap-1.5" ref={rootRef}>
      {label && (
        <label id={`${id}-label`} className="text-sm font-semibold text-ink-800">
          {label}
          {required && <span className="ml-0.5 text-coral-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label ${id}` : undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-activedescendant={open && normalized[activeIndex] ? `${id}-opt-${activeIndex}` : undefined}
          onClick={(e) => {
            // Keyboard-triggered "clicks" (Enter/Space on a focused button)
            // report detail === 0; handleKeyDown already deals with those,
            // so only toggle here for a real pointer click.
            if (e.detail === 0) return
            setOpenState(!openRef.current)
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-2xl border bg-white/5 px-4 py-3 text-left text-sm outline-none transition-all duration-200',
            'focus:bg-white/8 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
            selected ? 'text-ink-800' : 'text-ink-400',
            error
              ? 'border-coral-400 focus:ring-coral-400/15 focus:border-coral-500'
              : 'border-mist-200 focus:ring-brand-400/15 focus:border-brand-400',
            className
          )}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronDown
            size={16}
            className={cn('shrink-0 text-ink-400 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>

        {open && (
          <motion.ul
            id={`${id}-listbox`}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : undefined}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="glass-solid absolute z-20 mt-1.5 max-h-60 w-full overflow-y-auto rounded-2xl border border-white/10 p-1.5 shadow-glass-lg"
          >
            {normalized.map((opt, i) => (
              <li
                key={opt.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={opt.value === value}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  onChange(opt.value)
                  setOpenState(false)
                }}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors',
                  i === activeIndex ? 'bg-brand-600 text-white' : 'text-ink-700 hover:bg-mist-100'
                )}
              >
                {opt.label}
                {opt.value === value && <Check size={14} />}
              </li>
            ))}
          </motion.ul>
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
