import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { IObituary } from '../lib/domain/types'
import Storyblok from '../lib/storyblok/client'
import { PageStory, Story } from '../lib/storyblok/types'

interface Props {
  story: PageStory
  obituaries: Array<Story<IObituary>>
}

export default function Home({ story, obituaries }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Page story={story} />
      <div className="contained">
        <Grid>
          {obituaries.map(({ content }) => (
            <div
              key={content.id}
              className={
                content.size === 'large' ? 'sm:col-span-2' : 'col-span-1'
              }
            >
              <Obituary {...content} />
            </div>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const loc = locale === 'en' ? '' : `${locale}/`
  const res = await Storyblok.getStory(`${loc}home`, {
    version: 'draft',
    cv: Date.now(),
  })
  const obituaryStories = await Storyblok.getStories({
    starts_with: 'obituaries',
    version: 'draft',
    is_startpage: 0,
  })

  return {
    props: {
      story: res.data.story as PageStory,
      obituaries: obituaryStories.data.stories as Array<Story<IObituary>>,
    },
  }
}
