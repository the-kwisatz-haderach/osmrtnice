import { Container } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { ReactElement } from 'react'
import { ContactForm } from '../components/Forms/ContactForm'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { createMetaTitle } from '../lib/domain'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'

interface Props {
  story: PageStory
}

export default function Contact({ story }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>{createMetaTitle(story.name)}</title>
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

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const story = await Storyblok.getStory('contact', {
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
