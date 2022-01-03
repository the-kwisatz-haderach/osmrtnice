import { ReactElement } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { GetStaticProps } from 'next'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'
import { createMetaTitle } from '../lib/domain'

interface Props {
  story: PageStory
}

export default function Services({ story }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>{createMetaTitle(story.name)}</title>
      </Head>
      <Page story={story} />
    </div>
  )
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
