import { ReactElement } from 'react'
import Head from 'next/head'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { PageStory } from '../lib/storyTypes'
import { GetStaticProps } from 'next'
import Storyblok from '../lib/storyblok'

interface Props {
  story: PageStory
}

export default function Services({ story }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Services</title>
      </Head>
      <Page story={story} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const story = await Storyblok.getStory('services', {
    version: 'draft',
  })
  return {
    props: {
      story: story.data.story,
    },
  }
}
