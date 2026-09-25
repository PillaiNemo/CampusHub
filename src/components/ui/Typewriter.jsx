import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Typewriter({ text, className, startDelay = 0, speed = 45 }) {
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(prefersReducedMotion ? text.length : 0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const startTimer = setTimeout(() => setCount(1), startDelay * 1000)
    return () => clearTimeout(startTimer)
  }, [startDelay, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || count === 0 || count >= text.length) return
    const timer = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(timer)
  }, [count, text.length, speed, prefersReducedMotion])

  return (
    <span className={cn('inline-block', className)}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="typewriter-cursor" />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
