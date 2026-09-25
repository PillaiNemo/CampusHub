import { useRef, useState } from 'react'
import { motion, useReducedMotion, animate } from 'framer-motion'
import { EASE_OUT } from '../../utils/motion'

export default function AnimatedCounter({ value, duration = 1.4 }) {
  const hasRun = useRef(false)
  const prefersReducedMotion = useReducedMotion()
  const match = typeof value === 'string' ? value.match(/^([\d,]+)(.*)$/) : null
  const [display, setDisplay] = useState(match ? '0' + match[2] : value)

  const startCount = () => {
    if (hasRun.current || !match) return
    hasRun.current = true
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    const target = parseInt(match[1].replace(/,/g, ''), 10)
    const suffix = match[2]
    animate(0, target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString('en-US') + suffix),
    })
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={startCount}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {match ? display : value}
    </motion.span>
  )
}
