import { getStoryblokApi, StoryblokComponent } from '@storyblok/react'
import { STORYBLOK_VERSION } from 'lib/constants'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import { PageStory } from '../lib/storyblok/types'

interface Props {
  story: PageStory
}

export default function PrivacyPolicy({ story }: Props): ReactElement {
  return <StoryblokComponent blok={story.content} />
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const storyblokApi = getStoryblokApi()
  const res = await storyblokApi.getStory('privacy-policy', {
    version: STORYBLOK_VERSION,
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: res.data.story as PageStory,
    },
  }
}
