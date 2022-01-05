import { ReactElement } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { GetStaticProps } from 'next'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'

interface Props {
  story: PageStory
}

export default function Services({ story }: Props): ReactElement {
  return <Page story={story} />
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const story = await Storyblok.getStory('services', {
    version: 'draft',
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: story.data.story,
    },
  }
}
