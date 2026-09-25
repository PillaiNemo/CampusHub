import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, MapPinned, UserRound, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import { EASE_OUT, DURATION } from '../../utils/motion'

export default function WelcomeClose() {
  return (
    <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DURATION.slow, ease: EASE_OUT }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-gold-500 text-white shadow-glow-brand"
      >
        <GraduationCap size={28} strokeWidth={2.25} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"
      >
        <span className="h-px w-8 bg-brand-400" />
        You're All Set
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: DURATION.slow, ease: EASE_OUT }}
        className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl"
      >
        Welcome to <span className="italic-accent text-gradient">Hope Africa University</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: DURATION.slow, ease: EASE_OUT }}
        className="mt-5 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg"
      >
        Your digital campus companion is ready whenever you are — set up your profile and reserve
        your first space on campus.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: DURATION.slow, ease: EASE_OUT }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Magnetic>
          <Button as={NavLink} to="/profile" icon={UserRound}>
            Set Up Your Profile
          </Button>
        </Magnetic>
        <Button as={NavLink} to="/booking" variant="secondary" icon={MapPinned}>
          Book a Facility
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: DURATION.slow }}
      >
        <NavLink
          to="/dashboard"
          className="group mt-10 flex items-center gap-1.5 text-xs font-semibold text-ink-500 transition-colors hover:text-brand-600"
        >
          Or head straight to your dashboard
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </NavLink>
      </motion.div>
    </section>
  )
}
