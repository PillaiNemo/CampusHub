import { useRef } from 'react'
import { Camera, ImagePlus, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function AvatarUpload({ value, onChange, className }) {
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className={cn('group relative overflow-hidden rounded-full ring-4 ring-mist-50 shadow-glass-lg', className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload profile photo"
      />

      {value ? (
        <>
          <img src={value} alt="Your profile photo" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Change profile photo"
            className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-200 group-hover:bg-black/50 group-hover:opacity-100"
          >
            <Camera size={22} />
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove profile photo"
            className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-coral-500 group-hover:opacity-100"
          >
            <X size={12} />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-mist-200 bg-mist-100 text-ink-400 transition-colors hover:border-brand-300 hover:text-brand-600"
        >
          <ImagePlus size={22} strokeWidth={1.75} />
          <span className="text-[10px] font-semibold leading-none">Upload photo</span>
        </button>
      )}
    </div>
  )
}
