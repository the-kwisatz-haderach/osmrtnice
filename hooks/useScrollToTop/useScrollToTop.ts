import { MutableRefObject, useCallback, useRef } from 'react'

export const useScrollToTop = <T extends HTMLElement>(): [
  MutableRefObject<T>,
  () => void
] => {
  const ref = useRef<T>(null)

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [ref])

  return [ref, scrollToTop]
}
