import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
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
  options,
}: PropsWithChildren<{
  options: IntersectionObserverOptions
}>): ReactElement => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const [values, setValues] = useState<ObserverTargetValues>({})
  const elements = useRef<Record<string, Element>>({})

  useEffect(() => {
    const intersectionObserver = createIntersectionObserver(options, setValues)
    setObserver(intersectionObserver)
  }, [options])

  const observe: IIntersectionObserverContext['observe'] = useCallback(
    (element) => {
      if (observer && element != null) {
        if (elements.current[element.id] || !element.id) {
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
