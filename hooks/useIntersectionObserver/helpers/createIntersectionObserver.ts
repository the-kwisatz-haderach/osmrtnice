import { IntersectionObserverOptions, ObserverTargetValues } from '../types'
import { createObserverCallback } from './createObserverCallback'
import { createOptions } from './createOptions'

export const createIntersectionObserver = (
  options: IntersectionObserverOptions,
  valueSetter: React.Dispatch<React.SetStateAction<ObserverTargetValues>>
): IntersectionObserver => {
  const observerOptions = createOptions(options)
  const observerCallback = createObserverCallback(valueSetter)
  return new IntersectionObserver(observerCallback, observerOptions)
}
