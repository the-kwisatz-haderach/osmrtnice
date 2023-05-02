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
  const [globalResponse, linksResponse] = await Promise.all([
    Storyblok.getStory('global', {
      version: 'draft',
      language: appContext.ctx.locale,
    }),
    Storyblok.get('cdn/links', {
      version: 'draft',
      language: appContext.ctx.locale,
    }),
  ])

  const {
    links,
  }: { links: Record<string, StoryBlokLink> } = linksResponse?.data || {
    links: {},
  }

  const myLinks = Object.values(links)
    .filter((link) => link.slug !== 'global' && link.parent_id === 0)
    .sort((a, b) => b.position - a.position)

  const { content } = (globalResponse?.data
    ?.story as Story<IGlobalSettings>) || {
    content: {
      showInfoBlock: true,
      phone: '',
      logo: {
        alt: '',
        copyright: '',
        fieldtype: 'asset',
        filename: '',
        focus: null as null,
        id: 0,
        name: '',
        title: '',
      },
      ingress: '',
      infoBlockText: '',
      email: '',
      component: '',
      _uid: '',
    },
  }

  return {
    ...initialProps,
    menuItems: makeAppLinks('hr', ['privacy-policy'])(myLinks)?.hr || [],
    ...content,
  }
}

export default appWithTranslation(MyApp)
