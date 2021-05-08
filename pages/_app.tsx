import { ComponentType, PropsWithChildren, ReactElement } from 'react'
import { AppProvider } from '../contexts/AppContext'
import { IntersectionObserverProvider } from '../hooks/useIntersectionObserver'
import { MainLayout } from '../layouts/MainLayout'
import '../styles/global.css'

interface Props {
  Component: ComponentType
  pageProps: PropsWithChildren<any>
}

const observerOptions = { threshold: 0.5 }

function MyApp({ Component, pageProps }: Props): ReactElement {
  return (
    <AppProvider>
      <IntersectionObserverProvider options={observerOptions}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </IntersectionObserverProvider>
    </AppProvider>
  )
}

export default MyApp
