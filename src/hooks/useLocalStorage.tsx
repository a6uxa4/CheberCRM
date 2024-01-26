import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type UseLocalStorageReturnType<T> = [
  T | null,
  Dispatch<SetStateAction<T | null>>
]

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    const storedItem = localStorage.getItem(key)
    return storedItem ? (JSON.parse(storedItem) as T) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
