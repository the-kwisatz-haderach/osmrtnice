import { RefObject, useEffect, useRef } from 'react'

export const useOutsideClick = <E extends Element>(
  onOutsideClick: () => void
): RefObject<E> => {
  const ref = useRef<E>(null)
  const memoizedOnOutsideClick = useRef(onOutsideClick).current

  useEffect(() => {
    const listener: EventListener = (e): void => {
      const isOutsideClick = e.composedPath().every((el) => el !== ref.current)
      if (isOutsideClick) {
        memoizedOnOutsideClick()
      }
    }
    if (ref.current != null) {
      document.addEventListener('touchend', listener)
    }
    return () => {
      document.removeEventListener('touchend', listener)
    }
  }, [ref, memoizedOnOutsideClick])

  return ref
}
