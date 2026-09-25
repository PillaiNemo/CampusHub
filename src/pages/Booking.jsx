import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck2, CheckCircle2, Trash2, Users, Check, AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'
import facilitiesData from '../data/facilities.json'
import FacilityCard from '../components/FacilityCard'
import FormInput from '../components/ui/FormInput'
import DatePicker from '../components/ui/DatePicker'
import TimeSelect from '../components/ui/TimeSelect'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'
import { useLocalStorage } from '../hooks/useLocalStorage'

const initialForm = { date: '', startTime: '', endTime: '', purpose: '', attendees: '' }

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

const steps = ['Select facility', 'Booking details', 'Confirm']

function StepIndicator({ current }) {
  return (
    <div className="mt-8 flex items-center gap-2" aria-label={`Step ${current} of ${steps.length}`}>
      {steps.map((label, i) => {
        const stepNum = i + 1
        const done = stepNum < current
        const active = stepNum === current
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300',
                  done ? 'bg-brand-600 text-white' : active ? 'bg-brand-600 text-white' : 'bg-mist-200 text-ink-500'
                )}
              >
                {done ? <Check size={13} strokeWidth={3} /> : stepNum}
              </span>
              <span className={cn('hidden text-xs font-semibold sm:inline', active ? 'text-ink-900' : 'text-ink-500')}>
                {label}
              </span>
            </div>
            {stepNum < steps.length && (
              <span className="h-px flex-1 bg-mist-200">
                <span
                  className={cn('block h-px bg-brand-600 transition-all duration-500', done ? 'w-full' : 'w-0')}
                />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Booking() {
  const [facilityId, setFacilityId] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookings, setBookings] = useLocalStorage('campus-hub-bookings', [])
  const [shake, setShake] = useState(false)
  const [confirmError, setConfirmError] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const detailsRef = useRef(null)
  const isFirstFacilitySelect = useRef(true)

  const facility = useMemo(() => facilitiesData.find((f) => f.id === facilityId), [facilityId])

  const currentStep = submitted ? 3 : confirmOpen ? 3 : facilityId ? 2 : 1

  const handleSelectFacility = (id) => {
    setFacilityId(id)
    if (errors.facility) setErrors((er) => ({ ...er, facility: undefined }))
  }

  useEffect(() => {
    if (isFirstFacilitySelect.current) {
      isFirstFacilitySelect.current = false
      return
    }
    if (facilityId) {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [facilityId])

  const handleChange = (field) => (e) => {
    const value = e?.target ? e.target.value : e
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const errs = {}
    if (!facilityId) errs.facility = 'Please select a facility above.'
    if (!form.date) {
      errs.date = 'Please choose a date.'
    } else if (form.date < todayISO()) {
      errs.date = 'Date cannot be in the past.'
    }
    if (!form.startTime) errs.startTime = 'Start time is required.'
    if (!form.endTime) {
      errs.endTime = 'End time is required.'
    } else if (form.startTime && form.endTime <= form.startTime) {
      errs.endTime = 'End time must be after start time.'
    }
    if (!form.purpose.trim()) errs.purpose = 'Please describe the purpose of your booking.'
    if (!form.attendees) {
      errs.attendees = 'Number of attendees is required.'
    } else if (facility && Number(form.attendees) > facility.capacity) {
      errs.attendees = `Exceeds facility capacity of ${facility.capacity}.`
    } else if (Number(form.attendees) < 1) {
      errs.attendees = 'Must be at least 1 attendee.'
    }
    return errs
  }

  const handleReview = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setConfirmOpen(true)
    } else {
      setShake(true)
      window.setTimeout(() => setShake(false), 500)
    }
  }

  const handleConfirm = () => {
    setConfirming(true)
    setConfirmError(false)
    window.setTimeout(() => {
      try {
        const entry = {
          id: crypto.randomUUID(),
          facilityName: facility.name,
          facilityLocation: facility.location,
          ...form,
          createdAt: new Date().toISOString(),
        }
        setBookings((prev) => [entry, ...prev])
        setConfirmOpen(false)
        setSubmitted(true)
        setForm(initialForm)
        setFacilityId(null)
      } catch {
        setConfirmError(true)
      } finally {
        setConfirming(false)
      }
    }, 500)
  }

  const removeBooking = (id) => setBookings((prev) => prev.filter((b) => b.id !== id))

  return (
    <div className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
      <SectionHeading
        eyebrow="Facility Booking"
        title="Reserve a space on campus"
        description="Pick a facility, choose your date and time, and confirm — it only takes a minute."
      />

      {!submitted && <StepIndicator current={currentStep} />}

      {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-white/8 glass-solid px-6 py-16 text-center shadow-glass"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-300/25 text-teal-500">
              <CheckCircle2 size={32} />
            </span>
            <h3 className="font-display text-xl font-bold text-ink-900">Booking confirmed!</h3>
            <p className="max-w-xs text-sm text-ink-500">
              Your facility reservation has been recorded. You can view it under "Your bookings" below.
            </p>
            <Button variant="secondary" onClick={() => setSubmitted(false)}>
              Make another booking
            </Button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mt-10">
              <h3 className="mb-4 text-sm font-bold text-ink-900">1. Select a facility</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {facilitiesData.map((f, i) => (
                  <FacilityCard key={f.id} facility={f} selected={facilityId === f.id} onSelect={handleSelectFacility} index={i} />
                ))}
              </div>
              {errors.facility && (
                <p className="mt-2 text-xs font-medium text-coral-500" role="alert">
                  {errors.facility}
                </p>
              )}
            </div>

            <div ref={detailsRef} className="mt-10 scroll-mt-28">
              <h3 className="mb-4 text-sm font-bold text-ink-900">2. Booking details</h3>
              <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
              <GlassCard solid>
                <form onSubmit={handleReview} className="flex flex-col gap-5" noValidate>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <DatePicker
                      label="Date"
                      required
                      min={todayISO()}
                      value={form.date}
                      onChange={handleChange('date')}
                      error={errors.date}
                    />
                    <TimeSelect
                      label="Start time"
                      required
                      value={form.startTime}
                      onChange={handleChange('startTime')}
                      error={errors.startTime}
                    />
                    <TimeSelect
                      label="End time"
                      required
                      value={form.endTime}
                      onChange={handleChange('endTime')}
                      error={errors.endTime}
                    />
                  </div>

                  <FormInput
                    type="number"
                    label="Number of attendees"
                    required
                    min={1}
                    max={facility?.capacity}
                    placeholder={facility ? `Max ${facility.capacity}` : 'Select a facility first'}
                    hint={facility ? `Max ${facility.capacity} attendees for ${facility.name}` : undefined}
                    disabled={!facility}
                    value={form.attendees}
                    onChange={handleChange('attendees')}
                    error={errors.attendees}
                  />

                  <FormInput
                    as="textarea"
                    label="Purpose of booking"
                    required
                    placeholder="e.g. Study group session for CS 305"
                    value={form.purpose}
                    onChange={handleChange('purpose')}
                    error={errors.purpose}
                  />

                  <Button type="submit" icon={CalendarCheck2} className="self-start">
                    Review booking
                  </Button>
                </form>
              </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        )}

      {bookings.length > 0 && (
        <div className="mt-14">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-ink-900">Your bookings</h3>
            <Badge tone="neutral">{bookings.length} saved locally</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bookings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass flex items-start justify-between gap-3 rounded-2xl border border-white/8 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-ink-800">{b.facilityName}</p>
                  <p className="mt-1 text-xs text-ink-500">
                    {b.date} · {b.startTime}–{b.endTime}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-400">
                    <Users size={12} /> {b.attendees} attendees
                  </p>
                </div>
                <button
                  onClick={() => removeBooking(b.id)}
                  aria-label="Cancel booking"
                  className="rounded-full p-1.5 text-ink-400 hover:bg-coral-400/10 hover:text-coral-500"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Confirm your booking">
        {facility && (
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4">
              <p className="font-display text-sm font-bold text-ink-900">{facility.name}</p>
              <p className="text-xs text-ink-500">{facility.location}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-ink-400">Date</dt>
                <dd className="font-semibold text-ink-800">{form.date}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-400">Time</dt>
                <dd className="font-semibold text-ink-800">
                  {form.startTime}–{form.endTime}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-400">Attendees</dt>
                <dd className="font-semibold text-ink-800">{form.attendees}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-ink-400">Purpose</dt>
                <dd className="font-semibold text-ink-800">{form.purpose}</dd>
              </div>
            </dl>
            {confirmError && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-coral-500" role="alert">
                <AlertCircle size={14} />
                Something went wrong saving your booking. Please try again.
              </p>
            )}

            <div className="mt-2 flex gap-3">
              <Button variant="secondary" onClick={() => setConfirmOpen(false)} className="flex-1" disabled={confirming}>
                Edit details
              </Button>
              <Button onClick={handleConfirm} className="flex-1" disabled={confirming}>
                {confirming ? 'Confirming…' : 'Confirm booking'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
