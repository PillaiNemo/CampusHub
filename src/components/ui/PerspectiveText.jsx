import { cn } from '../../utils/cn'

export default function PerspectiveText({ text, className }) {
  return (
    <span className={cn('perspective-text', className)}>
      <span className="perspective-text-inner">
        <span className="perspective-text-primary">{text}</span>
        <span className="perspective-text-secondary" aria-hidden="true">
          {text}
        </span>
      </span>
    </span>
  )
}
