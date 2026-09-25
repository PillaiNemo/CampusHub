import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Pencil,
  Check,
  X,
  GraduationCap,
  IdCard,
  CalendarDays,
  BadgeCheck,
  CheckCircle2,
} from 'lucide-react'
import profileData from '../data/profile.json'
import { useLocalStorage } from '../hooks/useLocalStorage'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import FormInput from '../components/ui/FormInput'
import Toggle from '../components/ui/Toggle'
import SectionHeading from '../components/ui/SectionHeading'
import AvatarUpload from '../components/ui/AvatarUpload'

const academicFacts = [
  { icon: GraduationCap, label: 'Program', key: 'program' },
  { icon: BadgeCheck, label: 'Faculty', key: 'faculty' },
  { icon: IdCard, label: 'Student ID', key: 'studentId' },
  { icon: CalendarDays, label: 'Enrolled', key: 'enrollmentDate' },
]

export default function Profile() {
  const [profile, setProfile] = useLocalStorage('campus-hub-profile', profileData)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [toast, setToast] = useState('')
  const toastTimeoutRef = useRef(null)

  useEffect(() => () => window.clearTimeout(toastTimeoutRef.current), [])

  const showToast = (message) => {
    setToast(message)
    window.clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = window.setTimeout(() => setToast(''), 2200)
  }

  const startEditing = () => {
    setDraft(profile)
    setEditing(true)
  }

  const saveEditing = () => {
    setProfile(draft)
    setEditing(false)
    showToast('Profile updated')
  }

  const cancelEditing = () => {
    setDraft(profile)
    setEditing(false)
  }

  const updatePreference = (key, value) => {
    setProfile((prev) => ({ ...prev, preferences: { ...prev.preferences, [key]: value } }))
    showToast('Preferences updated')
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-14 sm:pb-20">
      <SectionHeading eyebrow="Your Profile" title="Manage your student profile" className="mb-10" />

      <div className="relative overflow-hidden rounded-3xl border border-white/8 shadow-glass">
        <div className="h-28 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-800 sm:h-36" />
        <div className="glass-solid px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
              <AvatarUpload
                value={profile.avatarUrl}
                onChange={(avatarUrl) => setProfile((p) => ({ ...p, avatarUrl }))}
                className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
              />
              <div className="pb-1">
                <h1 className="font-display text-xl font-extrabold text-ink-900 sm:text-2xl">{profile.fullName}</h1>
                <p className="text-sm text-ink-500">{profile.studentId}</p>
              </div>
            </div>
            {!editing && (
              <Button variant="secondary" size="sm" icon={Pencil} onClick={startEditing}>
                Edit profile
              </Button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="brand">{profile.program}</Badge>
            <Badge tone="neutral">{profile.year}</Badge>
            <Badge tone="gold">GPA {profile.gpa}</Badge>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <GlassCard solid>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink-900">Personal information</h3>
              {editing && (
                <div className="flex gap-2">
                  <button
                    onClick={cancelEditing}
                    aria-label="Cancel editing"
                    className="rounded-full p-1.5 text-ink-400 hover:bg-mist-100 hover:text-ink-700"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={saveEditing}
                    aria-label="Save changes"
                    className="rounded-full bg-brand-600 p-1.5 text-white hover:bg-brand-700"
                  >
                    <Check size={16} />
                  </button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="flex flex-col gap-4">
                <FormInput
                  label="Full name"
                  value={draft.fullName}
                  onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                />
                <FormInput
                  label="Email address"
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                />
                <FormInput
                  label="Phone number"
                  value={draft.phone}
                  onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                />
                <FormInput
                  label="Address"
                  value={draft.address}
                  onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
                />
                <FormInput
                  as="textarea"
                  label="Bio"
                  value={draft.bio}
                  onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-ink-600">{profile.bio}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2.5 text-sm text-ink-600">
                    <Mail size={15} className="text-brand-500" /> {profile.email}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-ink-600">
                    <Phone size={15} className="text-brand-500" /> {profile.phone}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-ink-600 sm:col-span-2">
                    <MapPin size={15} className="text-brand-500" /> {profile.address}
                  </div>
                </div>
              </div>
            )}
          </GlassCard>

          <GlassCard solid>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="font-display text-sm font-bold text-ink-900">Academic information</h3>
              <span className="text-[11px] font-medium text-ink-400">Managed by Registrar's Office — read only</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {academicFacts.map((fact, i) => (
                <motion.div
                  key={fact.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <fact.icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs text-ink-400">{fact.label}</p>
                    <p className="text-sm font-semibold text-ink-800">{profile[fact.key]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <GraduationCap size={16} />
              </span>
              <div>
                <p className="text-xs text-ink-400">Academic advisor</p>
                <p className="text-sm font-semibold text-ink-800">{profile.advisor}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-2">
          <GlassCard solid>
            <h3 className="mb-5 font-display text-sm font-bold text-ink-900">Notification preferences</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink-800">Email notifications</p>
                  <p className="text-xs text-ink-500">Schedule changes, booking confirmations</p>
                </div>
                <Toggle
                  id="email-notif"
                  label="Email notifications"
                  checked={profile.preferences.emailNotifications}
                  onChange={(v) => updatePreference('emailNotifications', v)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink-800">SMS notifications</p>
                  <p className="text-xs text-ink-500">Urgent campus alerts only</p>
                </div>
                <Toggle
                  id="sms-notif"
                  label="SMS notifications"
                  checked={profile.preferences.smsNotifications}
                  onChange={(v) => updatePreference('smsNotifications', v)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink-800">Weekly newsletter</p>
                  <p className="text-xs text-ink-500">Campus news digest every Monday</p>
                </div>
                <Toggle
                  id="newsletter-notif"
                  label="Weekly newsletter"
                  checked={profile.preferences.newsletterOptIn}
                  onChange={(v) => updatePreference('newsletterOptIn', v)}
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="glass-solid fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-ink-800 shadow-glass-lg"
            role="status"
          >
            <CheckCircle2 size={16} className="text-teal-500" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
