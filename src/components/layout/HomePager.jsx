import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'
import { EASE_OUT, DURATION } from '../../utils/motion'

const COOLDOWN = 850
const WHEEL_TRIGGER = 60
const WHEEL_GESTURE_GAP = 350
const SWIPE_THRESHOLD = 50
const EDGE_SLACK = 2

export default function HomePager({ pages }) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const lockedRef = useRef(false)
  const touchStartY = useRef(null)
  const wheelAccumRef = useRef(0)
  const lastWheelAtRef = useRef(0)
  const rootRef = useRef(null)
  const activeContentRef = useRef(null)
  const count = pages.length
  const [showScrollCue, setShowScrollCue] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    function goTo(next) {
      if (lockedRef.current) return
      const clamped = Math.max(0, Math.min(count - 1, next))
      if (clamped === index) return
      lockedRef.current = true
      setIndex(clamped)
      window.setTimeout(() => {
        lockedRef.current = false
      }, COOLDOWN)
    }

    // Whether the current page's own content still has room to scroll in
    // the given direction. If it does, we let that scroll happen natively
    // instead of advancing the pager — content taller than one screen
    // (the gallery grid, the news list) needs to stay reachable.
    function canScrollWithin(dir) {
      const el = activeContentRef.current
      if (!el) return false
      if (dir > 0) return el.scrollTop + el.clientHeight < el.scrollHeight - EDGE_SLACK
      return el.scrollTop > EDGE_SLACK
    }

    function onWheel(e) {
      const dir = e.deltaY > 0 ? 1 : -1

      if (canScrollWithin(dir)) return // native internal scroll handles it

      // Always swallow the event here (regardless of delta size) — trackpads
      // fire many small deltaY events per gesture, and letting any of them
      // through to native scroll is what let content bleed past the pager.
      e.preventDefault()
      if (lockedRef.current) return

      const now = performance.now()
      if (now - lastWheelAtRef.current > WHEEL_GESTURE_GAP) {
        wheelAccumRef.current = 0
      }
      lastWheelAtRef.current = now
      wheelAccumRef.current += Math.abs(e.deltaY)

      if (wheelAccumRef.current >= WHEEL_TRIGGER) {
        wheelAccumRef.current = 0
        goTo(index + dir)
      }
    }

    function onKeyDown(e) {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (!canScrollWithin(1)) goTo(index + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (!canScrollWithin(-1)) goTo(index - 1)
      }
    }

    function onTouchStart(e) {
      touchStartY.current = e.touches[0].clientY
    }

    function onTouchMove(e) {
      if (touchStartY.current == null) return
      const delta = touchStartY.current - e.touches[0].clientY
      const dir = delta > 0 ? 1 : -1
      if (canScrollWithin(dir)) return
      e.preventDefault()
      if (Math.abs(delta) < SWIPE_THRESHOLD) return
      goTo(index + dir)
      touchStartY.current = null
    }

    const el = rootRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, count, prefersReducedMotion])

  useEffect(() => {
    const el = activeContentRef.current
    if (!el) return

    function checkOverflow() {
      const overflowing = el.scrollHeight > el.clientHeight + 4
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
      setShowScrollCue(overflowing && !atBottom)
    }

    checkOverflow()
    el.addEventListener('scroll', checkOverflow, { passive: true })
    window.addEventListener('resize', checkOverflow)
    return () => {
      el.removeEventListener('scroll', checkOverflow)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [index])

  if (prefersReducedMotion) {
    return (
      <div className="pt-24 sm:pt-28">
        {pages.map((page) => (
          <div key={page.id} style={{ backgroundColor: page.tone }}>
            {page.content}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative h-[100dvh] w-full overflow-hidden overscroll-none">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={pages[index].id}
          ref={activeContentRef}
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
          className="absolute inset-0 h-full w-full overflow-y-auto overscroll-none"
          style={{ backgroundColor: pages[index].tone }}
        >
          <div className="h-full pb-10 pt-24 sm:pt-28">{pages[index].content}</div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showScrollCue && (
          <motion.div
            key="scroll-fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24"
            style={{ background: `linear-gradient(to top, ${pages[index].tone} 0%, ${pages[index].tone} 60%, transparent 100%)` }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollCue && (
          <motion.div
            key="scroll-cue"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-solid pointer-events-none fixed bottom-5 left-1/2 z-40 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 text-ink-600 shadow-glass"
          >
            <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 sm:flex lg:right-8">
        {pages.map((page, i) => (
          <button
            key={page.id}
            type="button"
            onClick={() => {
              if (lockedRef.current || i === index) return
              lockedRef.current = true
              setIndex(i)
              window.setTimeout(() => {
                lockedRef.current = false
              }, COOLDOWN)
            }}
            aria-label={`Go to ${page.label}`}
            aria-current={i === index}
            className="group pointer-events-auto relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={cn(
                'block rounded-full transition-all duration-300',
                i === index ? 'h-2.5 w-2.5 bg-brand-400' : 'h-1.5 w-1.5 bg-white/25 hover:bg-white/50'
              )}
            />
            <span className="glass-solid pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-ink-700 opacity-0 shadow-glass transition-opacity duration-200 group-hover:opacity-100">
              {page.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
