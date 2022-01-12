import App from 'next/app'
import { ComponentProps, ComponentType, ReactElement } from 'react'
import { appWithTranslation } from 'next-i18next'
import {
  AppProvider,
  IAppContext,
  ReactQueryProvider,
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
  return (
    <ChakraProvider>
      <ReactQueryProvider>
        <AppProvider {...appContext}>
          <IntersectionObserverProvider options={observerOptions}>
            <MainLayout>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </MainLayout>
          </IntersectionObserverProvider>
        </AppProvider>
      </ReactQueryProvider>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async (appContext): Promise<IAppContext> => {
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
