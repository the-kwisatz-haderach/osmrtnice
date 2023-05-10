import App, { AppContext, AppProps } from 'next/app'
import { ReactElement, useState } from 'react'
import { appWithTranslation } from 'next-i18next'
import {
  AppProvider,
  IAppContext,
  ChakraProvider,
  ModalProvider,
} from '../contexts'
import { IntersectionObserverProvider } from '../hooks/useIntersectionObserver'
import { MainLayout } from '../layouts/MainLayout'
import { makeAppLinks } from '../lib/storyblok/makeAppLinks'
import Storyblok from '../lib/storyblok/client'
import { StoryBlokLink } from '../lib/storyblok/common/types'
import { IGlobalSettings, Story } from '../lib/storyblok/types'
import '../styles/global.css'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { STORYBLOK_VERSION } from 'lib/constants'

const observerOptions = { threshold: 0.8 }

function MyApp({
  Component,
  pageProps,
  ...appContext
}: AppProps & IAppContext): ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppProvider {...appContext}>
            <IntersectionObserverProvider options={observerOptions}>
              <MainLayout>
                <ModalProvider>
                  <Component {...pageProps} />
                </ModalProvider>
              </MainLayout>
            </IntersectionObserverProvider>
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<IAppContext> => {
  const initialProps = await App.getInitialProps(appContext)

  return {
    ...initialProps,
    menuItems: [],
    email: '',
    infoBlockText: '',
    ingress: '',
    phone: '',
    showInfoBlock: false,
  }
}

export default appWithTranslation(MyApp)
