export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
    </div>
  )
}
