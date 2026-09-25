import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Newspaper, X } from 'lucide-react'
import newsData from '../data/news.json'
import NewsCard from '../components/NewsCard'
import Skeleton from '../components/ui/Skeleton'
import SectionHeading from '../components/ui/SectionHeading'
import { cn } from '../utils/cn'
import { EASE_REVEAL, EASE_OUT, DURATION, STAGGER } from '../utils/motion'

const categories = ['All', ...new Set(newsData.map((n) => n.category))]
const categoryCounts = categories.reduce((acc, cat) => {
  acc[cat] = cat === 'All' ? newsData.length : newsData.filter((n) => n.category === cat).length
  return acc
}, {})

function RevealCard({ index, className, children }) {
  return (
    <div className={cn('relative h-full overflow-hidden rounded-3xl', className)}>
      {children}
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: DURATION.slow, delay: index * STAGGER, ease: EASE_REVEAL }}
        style={{ transformOrigin: 'right' }}
        className="pointer-events-none absolute inset-0 z-10 bg-brand-900"
        aria-hidden="true"
      />
    </div>
  )
}

const SEARCH_DEBOUNCE_MS = 300

export default function News() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query])

  const filtered = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesQuery =
        debouncedQuery.trim() === '' ||
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [debouncedQuery, category])

  return (
    <div className="mx-auto max-w-6xl px-6 pb-14 sm:pb-20">
      <SectionHeading
        eyebrow="Campus News Hub"
        title="Stay in the loop, campus-wide"
        description="Announcements, achievements and updates from every faculty at Hope Africa University."
      />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            aria-label="Search news"
            className="w-full rounded-2xl border border-mist-200 bg-white/5 py-3 pl-11 pr-10 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-400 focus:bg-white/8 focus:ring-4 focus:ring-brand-400/15"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-400 hover:bg-mist-100 hover:text-ink-700"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                category === cat
                  ? 'border-brand-500 bg-brand-600 text-white shadow-glow-brand'
                  : 'border-mist-200 bg-white/5 text-ink-600 hover:border-brand-300 hover:text-brand-600'
              )}
            >
              {cat}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
                  category === cat ? 'bg-white/20' : 'bg-mist-200 text-ink-500'
                )}
              >
                {categoryCounts[cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-3xl border border-mist-200 bg-mist-100 p-0 overflow-hidden">
                <Skeleton className="h-36 w-full rounded-none" />
                <div className="flex flex-col gap-2 p-5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            key={`${category}-${debouncedQuery}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            className="grid auto-rows-[220px] grid-cols-1 gap-5 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <RevealCard key={item.id} index={i} className={item.featured ? 'sm:col-span-2' : ''}>
                <NewsCard item={item} index={i} featured={item.featured} />
              </RevealCard>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`${category}-${debouncedQuery}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-mist-200 bg-mist-100/60 py-20 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <Newspaper size={26} />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink-900">No articles found</p>
              <p className="mt-1 text-sm text-ink-500">Try a different search term or category.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
