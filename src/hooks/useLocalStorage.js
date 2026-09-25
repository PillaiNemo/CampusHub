import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  // Write synchronously (not inside a useEffect) so a failure — quota
  // exceeded, storage blocked in a private tab — throws right here in the
  // caller's own try/catch, instead of being silently swallowed later.
  const setStoredValue = (next) => {
    const resolved = typeof next === 'function' ? next(value) : next
    window.localStorage.setItem(key, JSON.stringify(resolved))
    setValue(resolved)
  }

  return [value, setStoredValue]
}
