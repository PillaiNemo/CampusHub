import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Clock3 } from 'lucide-react'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import SplitText from '../ui/SplitText'
import Typewriter from '../ui/Typewriter'
import HeroCardStack from './HeroCardStack'
import { EASE_OUT, DURATION } from '../../utils/motion'

const stats = [
  { icon: Sparkles, label: '5 Core Modules', value: 'News · Schedule · Booking · Feedback · Dashboard' },
  { icon: Clock3, label: '24/7 Access', value: 'From any device, on or off campus' },
  { icon: Users, label: 'Built for HAU', value: 'Designed around real student journeys' },
]

export default function Hero() {
  return (
    <section className="relative flex min-h-full items-center overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"
          >
            <span className="h-px w-8 bg-brand-400" />
            Digital Campus Service Hub
          </motion.div>

          <h1 className="text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl lg:text-[3.6rem]">
            <SplitText text="Your campus," startDelay={0.15} staggerDelay={0.06} />
            <br />
            <Typewriter text="one digital hub." startDelay={1} speed={40} className="italic-accent text-gradient" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: DURATION.slow, ease: EASE_OUT }}
            className="max-w-md text-base leading-relaxed text-ink-500 sm:text-lg"
          >
            Announcements, schedules, facility bookings and feedback — everything a Hope Africa
            University student needs, in one beautifully simple place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: DURATION.slow, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button as={NavLink} to="/dashboard" icon={ArrowRight}>
                Go to Dashboard
              </Button>
            </Magnetic>
            <Button as={NavLink} to="/news" variant="secondary">
              Explore Campus News
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: DURATION.slow, ease: EASE_OUT }}
            className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-3.5">
                <Icon size={16} className="mb-2 text-brand-600" />
                <p className="text-xs font-bold text-ink-800">{label}</p>
                <p className="text-[11px] leading-snug text-ink-500 mt-0.5">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: EASE_OUT }}
          className="relative h-[340px] sm:h-[420px] lg:h-[520px]"
        >
          <HeroCardStack />
        </motion.div>
      </div>
    </section>
  )
}
