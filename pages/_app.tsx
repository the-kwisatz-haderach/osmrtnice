import { AppProvider } from '../contexts/AppContext'
import 'tailwindcss/tailwind.css'
import { MainLayout } from '../layouts/MainLayout'

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
