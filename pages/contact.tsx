import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { ContactForm } from '../components/Forms/ContactForm'
import { InfoList } from '../components/InfoList'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import useAppContext from '../contexts/AppContext'
import Storyblok from '../lib/storyblok'
import { PageStory } from '../lib/storyTypes'

interface Props {
  story: PageStory
}

export default function Contact({ story }: Props): ReactElement {
  const { address, phone, email } = useAppContext()
  return (
    <div>
      <Head>
        <title>Contact us</title>
      </Head>
      <Page story={story} />
      <div className="contained width-full flex justify-center items-center my-10 p-2">
        <ContactForm />
      </div>
      <InfoList
        items={[
          {
            label: 'Address',
            content: address,
          },
          {
            label: 'Phone',
            content: phone,
          },
          {
            label: 'E-mail',
            content: email,
          },
        ]}
      />
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
