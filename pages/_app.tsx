import { ComponentProps, ComponentType, ReactElement } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppProvider, IAppContext } from '../contexts/AppContext'
import { IntersectionObserverProvider } from '../hooks/useIntersectionObserver'
import { MainLayout } from '../layouts/MainLayout'
import { makeAppLinks } from '../lib/storyblok/makeAppLinks'
import Storyblok from '../lib/storyblok/client'
import { StoryBlokLink } from '../lib/storyblok/common/types'
import { IGlobalSettings, Story } from '../lib/storyblok/types'
import '@fontsource/dancing-script/700.css'
import '@fontsource/nunito'
import '../styles/global.css'

interface Props<T extends ComponentType> extends IAppContext {
  Component: T
  pageProps: ComponentProps<T>
}

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'Nunito',
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
const observerOptions = { threshold: 0.8 }

function MyApp<T extends ComponentType<any>>({
  Component,
  pageProps,
  ...appContext
}: Props<T>): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider {...appContext}>
        <IntersectionObserverProvider options={observerOptions}>
          <MainLayout>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </MainLayout>
        </IntersectionObserverProvider>
      </AppProvider>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async (): Promise<IAppContext> => {
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
    menuItems: makeAppLinks('en', ['privacy-policy'])(myLinks).en,
    ...content,
  }
}

export default MyApp
