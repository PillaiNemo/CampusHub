import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpenCheck, FlaskConical, Trophy, Presentation, Users2, GraduationCap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Typewriter from '../ui/Typewriter'
import { cn } from '../../utils/cn'
import { EASE_OUT, DURATION, STAGGER } from '../../utils/motion'

const items = [
  {
    code: '01',
    label: 'Library',
    icon: BookOpenCheck,
    title: 'Rukundo Library',
    caption: '24/7 study access, silent pods and 300 new seats added this year.',
    tone: 'from-brand-700 via-brand-600 to-brand-800',
  },
  {
    code: '02',
    label: 'Research',
    icon: FlaskConical,
    title: 'AI & Data Lab',
    caption: "Faculty of Sciences' new interdisciplinary research lab.",
    tone: 'from-brand-800 via-brand-700 to-mist-100',
  },
  {
    code: '03',
    label: 'Athletics',
    icon: Trophy,
    title: 'Sports Complex',
    caption: 'Home to Interfaculty Sports Week and daily training.',
    tone: 'from-brand-600 via-brand-700 to-brand-900',
  },
  {
    code: '04',
    label: 'Academics',
    icon: Presentation,
    title: 'Lecture Halls',
    caption: 'Modern, tiered halls across all six faculties.',
    tone: 'from-mist-100 via-brand-800 to-brand-700',
  },
  {
    code: '05',
    label: 'Community',
    icon: Users2,
    title: 'Student Life',
    caption: 'Clubs, the Student Union and campus-wide events.',
    tone: 'from-brand-700 via-brand-800 to-mist-100',
  },
  {
    code: '06',
    label: 'Milestone',
    icon: GraduationCap,
    title: 'Graduation Day',
    caption: 'Where every HAU journey reaches the stage.',
    tone: 'from-brand-800 via-brand-900 to-mist-100',
    accent: true,
  },
]

function TypedDescription({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <p ref={ref} className="max-w-xl leading-relaxed text-ink-500">
      {inView ? <Typewriter text={text} speed={22} /> : <span className="opacity-0">{text}</span>}
    </p>
  )
}

function FacilityCard({ item, index = 0 }) {
  const Icon = item.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * STAGGER, duration: DURATION.base, ease: EASE_OUT }}
      className={cn(
        'group relative flex h-36 flex-col justify-end overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br shadow-glass transition-transform duration-300 hover:-translate-y-1 sm:h-40',
        item.tone
      )}
    >
      <Icon
        size={80}
        strokeWidth={0.9}
        className={cn('pointer-events-none absolute -right-4 -top-4 opacity-[0.14]', item.accent ? 'text-gold-400' : 'text-white')}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/75 via-black/25 to-transparent" aria-hidden="true" />
      <span className="absolute left-3.5 top-3.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
        {item.code} / {item.label}
      </span>
      <div className="relative flex flex-col gap-1 p-4">
        <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
        <p className="text-xs leading-relaxed text-white/70">{item.caption}</p>
      </div>
    </motion.div>
  )
}

export default function CampusGallery() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-10 sm:pb-14">
      <SectionHeading eyebrow="Around Campus" title="A closer look at Hope Africa University">
        <TypedDescription text="Facilities and moments that make up everyday student life." />
      </SectionHeading>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <FacilityCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
