import { ReactElement } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { PageStory } from '../lib/storyblok/types'
import { REVALIDATE_TIME_SECONDS, STORYBLOK_VERSION } from 'lib/constants'
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react'

interface Props {
  story: PageStory
}

export default function Services({ story: initialStory }: Props): ReactElement {
  const story = useStoryblokState(initialStory)
  return <StoryblokComponent blok={story.content} />
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  try {
    const storyblokApi = getStoryblokApi()
    const story = await storyblokApi.getStory('services', {
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
