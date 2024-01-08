import dynamic from 'next/dynamic'

export const ContactInfo = dynamic(() => import('./ContactInfo'), {
  ssr: false,
})
