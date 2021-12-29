import { Container } from '@chakra-ui/react'
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
        <title>{story.name}</title>
      </Head>
      <Page story={story} />
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="center"
        my={10}
      >
        <ContactForm />
      </Container>
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
