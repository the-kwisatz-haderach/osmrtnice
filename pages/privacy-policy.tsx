import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'

interface Props {
  story: PageStory
}

export default function PrivacyPolicy({ story }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <Page story={story} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const loc = locale === 'en' ? '' : `${locale}/`
  const res = await Storyblok.getStory(`${loc}privacy-policy`, {
    version: 'draft',
    cv: Date.now(),
  })
  return {
    props: {
      story: res.data.story as PageStory,
    },
  }
}
