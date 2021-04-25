import { useContext } from 'react'
import {
  IntersectionObserverContext,
  IntersectionObserverProvider,
} from './IntersectionObserverProvider'

const useIntersectionObserver = () => useContext(IntersectionObserverContext)

export { IntersectionObserverProvider }
export default useIntersectionObserver
