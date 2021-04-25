import { IntersectionObserverOptions } from '../types'

export const createOptions = (
  options: IntersectionObserverOptions = {
    rootMargin: [0, 0, 0, 0],
    marginUnit: 'px',
  }
): IntersectionObserverInit => ({
  threshold: options.threshold,
  rootMargin: (options?.rootMargin ?? [])
    .map((margin) => `${margin ?? 0}${options?.marginUnit ?? 'px'}`)
    .join(' '),
})
