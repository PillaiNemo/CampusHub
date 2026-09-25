import { motion } from 'framer-motion'
import { EASE_OUT, DURATION } from '../../utils/motion'

const container = (staggerDelay, startDelay) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay, delayChildren: startDelay },
  },
})

const word = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

export default function SplitText({
  text,
  className,
  wordClassName,
  staggerDelay = 0.08,
  startDelay = 0,
  trigger = 'mount',
}) {
  const words = text.split(' ')
  const triggerProps =
    trigger === 'inView'
      ? { whileInView: 'visible', viewport: { once: true, margin: '-80px' } }
      : { animate: 'visible' }

  return (
    <motion.span
      variants={container(staggerDelay, startDelay)}
      initial="hidden"
      {...triggerProps}
      className={className}
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.08em', verticalAlign: 'bottom' }}>
          <motion.span variants={word} className={wordClassName} style={{ display: 'inline-block' }}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
