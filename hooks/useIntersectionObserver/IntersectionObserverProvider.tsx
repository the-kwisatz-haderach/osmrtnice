import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createIntersectionObserver } from './helpers'
import {
  IIntersectionObserverContext,
  IntersectionObserverOptions,
  ObserverTargetValues,
} from './types'

const defaultContextValues: Required<IIntersectionObserverContext> = {
  getValues: () => ({ isIntersecting: false, ratio: 0 }),
  observe: () => {},
  unobserve: () => {},
}

export const IntersectionObserverContext = createContext<IIntersectionObserverContext>(
  defaultContextValues
)

export const IntersectionObserverProvider = ({
  children,
  ...options
}: PropsWithChildren<IntersectionObserverOptions>) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const [values, setValues] = useState<ObserverTargetValues>({})
  const elements = useRef<Record<string, Element>>({})

  useEffect(() => {
    const intersectionObserver = createIntersectionObserver(options, setValues)
    setObserver(intersectionObserver)
    return () => {
      elements.current = {}
      if (observer) observer.disconnect()
    }
  }, [])

  const observe: IIntersectionObserverContext['observe'] = useCallback(
    (element) => {
      if (observer && element) {
        if (elements.current[element.id]) {
          console.error(
            `Another element with id ${element.id} is already being observed.`
          )
          return
        }
        if (!element.id) {
          console.error(
            "The following element lacks an id and can't be observed: ",
            element
          )
          return
        }
        elements.current[element.id] = element
        observer.observe(element)
      }
    },
    [observer]
  )

  const unobserve: IIntersectionObserverContext['unobserve'] = useCallback(
    (id: string) => {
      if (observer && elements.current[id]) {
        observer.unobserve(elements.current[id])
        delete elements.current[id]
      }
    },
    [observer]
  )

  const getValues = useCallback(
    (id: string) =>
      values[id] ?? {
        isIntersecting: false,
        ratio: 0,
      },
    [values]
  )

  return (
    <IntersectionObserverContext.Provider
      value={{ getValues, observe, unobserve }}
    >
      {children}
    </IntersectionObserverContext.Provider>
  )
}
