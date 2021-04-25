import { ObserverTargetValues } from '../types'

export const createObserverCallback = (
  valueSetter: React.Dispatch<React.SetStateAction<ObserverTargetValues>>
): IntersectionObserverCallback => (entries) => {
  entries.forEach((entry) => {
    valueSetter((current) => ({
      ...current,
      [entry.target.id]: {
        isIntersecting: entry.isIntersecting,
        ratio: entry.intersectionRatio,
      },
    }))
  })
}
