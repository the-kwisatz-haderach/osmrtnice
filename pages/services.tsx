import { ReactElement } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { GetStaticProps } from 'next'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'
import { REVALIDATE_TIME_SECONDS, STORYBLOK_VERSION } from 'lib/constants'

interface Props {
  story: PageStory
}

export default function Services({ story }: Props): ReactElement {
  return <Page story={story} />
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  try {
    const story = await Storyblok.getStory('services', {
      version: STORYBLOK_VERSION,
      language: locale,
    })
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        story: story.data.story,
      },
      revalidate: REVALIDATE_TIME_SECONDS,
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
