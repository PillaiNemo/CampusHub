import { motion } from 'framer-motion'
import { EASE_OUT, DURATION } from '../../utils/motion'

// Enter-only fade+slide keyed by pathname in Layout.jsx. Deliberately not
// wrapped in AnimatePresence — that combination (exit-wait + Suspense-boundary
// lazy routes) was silently breaking client-side navigation: the URL would
// change but the new page's content never actually committed.
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
