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
import { apiPlugin, getStoryblokApi, storyblokInit } from '@storyblok/react'
import { components } from 'components/StoryBlok'

const observerOptions = { threshold: 0.8 }

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
})

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
            cacheTime: 1000 * 60 * 60, // 1 hour
            staleTime: 1000 * 60 * 5,
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
  try {
    const storyblokApi = getStoryblokApi()
    const [globalResponse, linksResponse] = await Promise.all([
      storyblokApi.getStory('global', {
        version: STORYBLOK_VERSION,
        language: appContext.ctx.locale,
      }),
      storyblokApi.get('cdn/links', {
        version: STORYBLOK_VERSION,
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
        imageUploadText: '',
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
  } catch (err) {
    console.error(err)
    return {
      ...initialProps,
      menuItems: [],
      email: '',
      infoBlockText: '',
      ingress: '',
      phone: '',
      showInfoBlock: false,
      imageUploadText: '',
    }
  }
}

export default appWithTranslation(MyApp)
