import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { ReactElement } from 'react'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { createMetaTitle } from '../lib/domain'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'

interface Props {
  story: PageStory
}

export default function PrivacyPolicy({ story }: Props): ReactElement {
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
  const res = await Storyblok.getStory('privacy-policy', {
    version: 'draft',
    cv: Date.now(),
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: res.data.story as PageStory,
    },
  }
}
