import dynamic from 'next/dynamic'

export const MainLayout = dynamic(() => import('./MainLayout'), {
  ssr: false,
})
