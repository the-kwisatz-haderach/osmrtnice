import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../lib/storyblok'
import { PageStory } from '../lib/storyTypes'

interface Props {
  story: PageStory
}

export default function Contact({ story }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Contact us</title>
      </Head>
      <Page story={story} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const story = await Storyblok.getStory('contact', {
    version: 'draft',
  })
  return {
    props: {
      story: story.data.story,
    },
  }
}
