import { cn } from '../../utils/cn'

export default function Skeleton({ className }) {
  return <div className={cn('shimmer-bg rounded-2xl', className)} aria-hidden="true" />
}
