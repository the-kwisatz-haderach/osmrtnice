import { useEffect, useRef } from 'react'

export const useOutsideClick = <E extends Element>(
  onOutsideClick: () => void
) => {
  const ref = useRef<E>(null)

  useEffect(() => {
    const listener = (e: PointerEvent) => {
      const isOutsideClick = e.composedPath().every((el) => el !== ref.current)
      if (isOutsideClick) {
        onOutsideClick()
      }
    }
    if (ref.current != null) {
      document.addEventListener('click', listener)
    }
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref])

  return ref
}
