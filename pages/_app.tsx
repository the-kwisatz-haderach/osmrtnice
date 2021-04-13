import { AppProvider } from '../contexts/AppContext'
import { MainLayout } from '../layouts/MainLayout'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppProvider>
  )
}

export default MyApp
