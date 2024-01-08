import dynamic from 'next/dynamic'

export const Timestamp = dynamic(() => import('./Timestamp'), {
  ssr: false,
})
