import App, { AppContext } from 'next/app'
import { ComponentProps, ComponentType, ReactElement, useState } from 'react'
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

interface Props<T extends ComponentType> extends IAppContext {
  Component: T
  pageProps: ComponentProps<T>
}

const observerOptions = { threshold: 0.8 }

function MyApp<T extends ComponentType<any>>({
  Component,
  pageProps,
  ...appContext
}: Props<T>): ReactElement {
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
  const [data, response] = await Promise.all([
    Storyblok.getStory('global', {
      version: 'draft',
    }),
    Storyblok.get('cdn/links', {
      version: 'draft',
    }),
  ])

  const { links }: { links: Record<string, StoryBlokLink> } = response.data

  const myLinks = Object.values(links)
    .filter((link) => link.slug !== 'global' && link.parent_id === 0)
    .sort((a, b) => b.position - a.position)

  const { content } = data.data.story as Story<IGlobalSettings>

  return {
    ...initialProps,
    menuItems: makeAppLinks('hr', ['privacy-policy'])(myLinks).hr,
    ...content,
  }
}

export default appWithTranslation(MyApp as any)
