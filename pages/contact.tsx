import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { ContactForm } from '../components/Forms/ContactForm'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'

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
      <div className="contained w-11/12 my-20 flex justify-center flex-col md:flex-row md:space-x-10 lg:space-x-20">
        <ContactForm />
      </div>
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
