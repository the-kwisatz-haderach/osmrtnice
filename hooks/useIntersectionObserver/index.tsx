import { useContext, useEffect, useRef } from 'react'
import {
  IntersectionObserverContext,
  IntersectionObserverProvider,
} from './IntersectionObserverProvider'

const useIntersectionObserver = () => {
  const { observe, unobserve, getValues } = useContext(
    IntersectionObserverContext
  )
  const registered = useRef<string[]>([])

  useEffect(() => {
    return () => {
      registered.current.forEach(unobserve)
    }
  }, [])

  const register = <T extends Element>(element: T) => {
    if (element?.id) {
      registered.current.push(element.id)
      observe(element)
    }
  }

  const unregister = (id: string) => {
    registered.current = registered.current.filter(
      (observedId) => observedId !== id
    )
    unobserve(id)
  }

  return { observe: register, unobserve: unregister, getValues }
}

export { IntersectionObserverProvider }
export default useIntersectionObserver
