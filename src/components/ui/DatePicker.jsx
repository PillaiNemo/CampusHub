import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseISO(iso) {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export default function DatePicker({ label, required, error, hint, value, onChange, min, className, disabled }) {
  const [open, setOpen] = useState(false)
  const selectedDate = parseISO(value)
  const minDate = parseISO(min)
  const [viewDate, setViewDate] = useState(() => selectedDate ?? new Date())
  const rootRef = useRef(null)
  const openRef = useRef(open)
  openRef.current = open

  function setOpenState(val) {
    openRef.current = val
    setOpen(val)
  }

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpenState(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  function handleKeyDown(e) {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenState(!openRef.current)
    } else if (e.key === 'Escape' && openRef.current) {
      e.preventDefault()
      setOpenState(false)
    }
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const startOffset = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = toISO(today)
  const minClean = minDate ? (minDate.setHours(0, 0, 0, 0), minDate) : null

  const cells = Array.from({ length: startOffset }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  )

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div className="flex flex-col gap-1.5" ref={rootRef}>
      {label && (
        <label className="text-sm font-semibold text-ink-800">
          {label}
          {required && <span className="ml-0.5 text-coral-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={!!error}
          onClick={(e) => {
            if (e.detail === 0) return
            setOpenState(!openRef.current)
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-2xl border bg-white/5 px-4 py-3 text-left text-sm outline-none transition-all duration-200',
            'focus:bg-white/8 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
            selectedDate ? 'text-ink-800' : 'text-ink-400',
            error
              ? 'border-coral-400 focus:ring-coral-400/15 focus:border-coral-500'
              : 'border-mist-200 focus:ring-brand-400/15 focus:border-brand-400',
            className
          )}
        >
          <span className="truncate">{displayValue || 'Select date…'}</span>
          <CalendarIcon size={16} className="shrink-0 text-ink-400" />
        </button>

        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose a date"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="glass-solid absolute z-20 mt-1.5 w-72 rounded-2xl border border-white/10 p-3 shadow-glass-lg"
          >
            <div className="flex items-center justify-between pb-2">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                aria-label="Previous month"
                className="rounded-full p-1.5 text-ink-500 transition-colors hover:bg-mist-100 hover:text-ink-800"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-bold text-ink-900">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                aria-label="Next month"
                className="rounded-full p-1.5 text-ink-500 transition-colors hover:bg-mist-100 hover:text-ink-800"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-ink-400">
              {WEEKDAYS.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((date, i) => {
                if (!date) return <span key={i} aria-hidden="true" />
                const iso = toISO(date)
                const isSelected = value === iso
                const isToday = todayISO === iso
                const isDisabled = minClean ? date < minClean : false
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      onChange(iso)
                      setOpenState(false)
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                      isSelected
                        ? 'bg-brand-600 text-white'
                        : isDisabled
                          ? 'cursor-not-allowed text-ink-400/40'
                          : 'text-ink-700 hover:bg-mist-100',
                      isToday && !isSelected && 'ring-1 ring-brand-400'
                    )}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-coral-500" role="alert">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-ink-500">{hint}</p>}
    </div>
  )
}
