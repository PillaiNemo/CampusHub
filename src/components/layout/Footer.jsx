import { NavLink } from 'react-router-dom'
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Campus News', to: '/news' },
      { label: 'Academic Schedule', to: '/schedule' },
      { label: 'Student Dashboard', to: '/dashboard' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Facility Booking', to: '/booking' },
      { label: 'Feedback System', to: '/feedback' },
      { label: 'Your Profile', to: '/profile' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-mist-200 bg-mist-100/60">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-gold-500 text-white">
              <GraduationCap size={20} strokeWidth={2.25} />
            </span>
            <span className="font-display font-bold text-ink-900">Campus Hub</span>
          </div>
          <p className="mt-4 text-sm text-ink-500 leading-relaxed">
            The centralized digital platform for Hope Africa University students — news, schedules, bookings and feedback in one place.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-ink-900 mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-sm text-ink-500 hover:text-brand-600 transition-colors">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-bold text-ink-900 mb-4">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-ink-500">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
              Hope Africa University, Bujumbura, Burundi
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-brand-500" />
              campushub@hau.edu
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-brand-500" />
              +257 22 000 000
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
