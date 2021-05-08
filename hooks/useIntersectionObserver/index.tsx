import { useContext, useEffect, useRef } from 'react'
import {
  IntersectionObserverContext,
  IntersectionObserverProvider,
} from './IntersectionObserverProvider'

function useIntersectionObserver<T extends Element>(): {
  observe: (element: T) => void
  unobserve: (id: string) => void
  getValues: (
    id: string
  ) => {
    isIntersecting: boolean
    ratio: number
  }
} {
  const { observe, unobserve, getValues } = useContext(
    IntersectionObserverContext
  )
  const registered = useRef<string[]>([])

  useEffect(() => {
    return () => {
      registered.current.forEach(unobserve)
    }
  }, [])

  const register = <T extends Element>(element: T): void => {
    if (element?.id !== undefined) {
      registered.current.push(element.id)
      observe(element)
    }
  }

  const unregister = (id: string): void => {
    registered.current = registered.current.filter(
      (observedId) => observedId !== id
    )
    unobserve(id)
  }

  return { observe: register, unobserve: unregister, getValues }
}

export { IntersectionObserverProvider }
export default useIntersectionObserver
