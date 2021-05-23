import { ComponentProps, ComponentType, ReactElement } from 'react'
import { AppProvider, IAppContext } from '../contexts/AppContext'
import { IntersectionObserverProvider } from '../hooks/useIntersectionObserver'
import { MainLayout } from '../layouts/MainLayout'
import { makeAppLinks } from '../lib/storyblok/makeAppLinks'
import Storyblok from '../lib/storyblok/client'
import '../styles/global.css'
import { StoryBlokLink } from '../lib/storyblok/common/types'
import { Story } from '../lib/storyblok/types'
import { IGlobalSettings } from '../lib/types'

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
    <AppProvider {...appContext}>
      <IntersectionObserverProvider options={observerOptions}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </IntersectionObserverProvider>
    </AppProvider>
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
    menuItems: makeAppLinks('en')(myLinks).en,
    ...content,
  }
}

export default MyApp
