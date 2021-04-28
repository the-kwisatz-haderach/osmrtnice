import { AppProvider } from '../contexts/AppContext'
import { IntersectionObserverProvider } from '../hooks/useIntersectionObserver'
import { MainLayout } from '../layouts/MainLayout'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <IntersectionObserverProvider threshold={0.5}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </IntersectionObserverProvider>
    </AppProvider>
  )
}

export default MyApp
