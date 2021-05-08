export interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: [top?: number, right?: number, bottom?: number, left?: number]
  marginUnit?: 'px' | '%'
}

export type ObserverTargetValues = Record<
  string,
  {
    isIntersecting: boolean
    ratio: number
  }
>

export interface IIntersectionObserverContext {
  getValues: (id: string) => ObserverTargetValues[string]
  observe: <T extends Element>(element: T) => void
  unobserve: (id: string) => void
}
