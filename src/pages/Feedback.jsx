import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, MessageSquareText, Star, Trash2 } from 'lucide-react'
import FormInput from '../components/ui/FormInput'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { cn } from '../utils/cn'

const categories = ['Facilities', 'Academics', 'Housing', 'IT Services', 'Campus Safety', 'Other']

const initialForm = { fullName: '', email: '', category: '', message: '', rating: 0 }

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.category) errors.category = 'Please select a category.'
  if (!form.message.trim()) {
    errors.message = 'Feedback message cannot be empty.'
  } else if (form.message.trim().length < 12) {
    errors.message = 'Please provide a bit more detail (12+ characters).'
  }
  return errors
}

function StarRating({ value, onChange }) {
  const [hoverValue, setHoverValue] = useState(0)
  const display = hoverValue || value

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Rating"
      onMouseLeave={() => setHoverValue(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onMouseEnter={() => setHoverValue(n)}
          onClick={() => onChange(n)}
          whileTap={{ scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="p-0.5"
        >
          <Star
            size={22}
            className={cn(
              'transition-colors',
              n <= display ? 'fill-gold-500 text-gold-500' : 'fill-transparent text-ink-300'
            )}
          />
        </motion.button>
      ))}
    </div>
  )
}

export default function Feedback() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [storageError, setStorageError] = useState(false)
  const [entries, setEntries] = useLocalStorage('campus-hub-feedback', [])

  const handleChange = (field) => (e) => {
    const value = e?.target ? e.target.value : e
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    setStorageError(false)

    setTimeout(() => {
      try {
        const entry = { ...form, id: crypto.randomUUID(), submittedAt: new Date().toISOString() }
        setEntries((prev) => [entry, ...prev])
        setSubmitted(true)
        setForm(initialForm)
      } catch {
        setStorageError(true)
      } finally {
        setSubmitting(false)
      }
    }, 600)
  }

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-14 sm:pb-20">
      <SectionHeading
        eyebrow="Student Feedback"
        title="Tell us what's working"
        description="Your feedback helps Hope Africa University improve services across campus — facilities, academics, housing and more."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <GlassCard solid className="lg:col-span-3">
          {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-300/25 text-teal-500">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="font-display text-xl font-bold text-ink-900">Thank you for your feedback!</h3>
                <p className="max-w-xs text-sm text-ink-500">
                  Your submission has been recorded. The relevant department will review it shortly.
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Submit another response
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Full name"
                    required
                    placeholder="Jane Uwase"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    error={errors.fullName}
                  />
                  <FormInput
                    label="Email address"
                    type="email"
                    required
                    placeholder="jane@hau.edu"
                    value={form.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                  />
                </div>

                <Select
                  label="Category"
                  required
                  placeholder="Select a category…"
                  value={form.category}
                  onChange={handleChange('category')}
                  error={errors.category}
                  options={categories}
                />

                <FormInput
                  as="textarea"
                  label="Your feedback"
                  required
                  placeholder="Share details about your experience..."
                  value={form.message}
                  onChange={handleChange('message')}
                  error={errors.message}
                  hint={!errors.message ? `${form.message.trim().length}/500 characters` : undefined}
                  maxLength={500}
                />

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-ink-800">Overall rating (optional)</span>
                  <StarRating value={form.rating} onChange={handleChange('rating')} />
                </div>

                {storageError && (
                  <p className="text-xs font-medium text-coral-500" role="alert">
                    We couldn't save your feedback locally. Please try again.
                  </p>
                )}

                <Button type="submit" disabled={submitting} className="self-start">
                  {submitting ? 'Submitting…' : 'Submit feedback'}
                </Button>
              </motion.form>
            )}
        </GlassCard>

        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-ink-900">Your submissions</h3>
            {entries.length > 0 && <Badge tone="neutral">{entries.length} saved locally</Badge>}
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-mist-200 bg-mist-100/60 px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                <MessageSquareText size={22} />
              </span>
              <p className="text-sm text-ink-500">Nothing submitted yet. Your responses will appear here.</p>
            </div>
          ) : (
            <div className="flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="glass rounded-2xl border border-white/8 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge tone="brand">{entry.category}</Badge>
                      <p className="mt-2 text-sm font-semibold text-ink-800">{entry.fullName}</p>
                    </div>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      aria-label="Delete feedback entry"
                      className="rounded-full p-1.5 text-ink-400 hover:bg-coral-400/10 hover:text-coral-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-500">{entry.message}</p>
                  {entry.rating > 0 && (
                    <div className="mt-2 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < entry.rating ? 'fill-gold-500 text-gold-500' : 'fill-transparent text-ink-300'}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
