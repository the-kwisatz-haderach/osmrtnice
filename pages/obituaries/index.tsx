import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Grid } from '../../components/Grid'
import { Obituary } from '../../components/Obituary'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import { IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { PageStory, Story } from '../../lib/storyblok/types'

interface Props {
  story: PageStory
  obituaries: Array<Story<IObituary>>
}

export default function Obituaries({ story, obituaries }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Obituaries</title>
      </Head>
      <Page story={story} />
      <div className="contained">
        <Grid>
          {obituaries.map(({ content, full_slug, uuid }) => (
            <Obituary {...content} slug={full_slug} key={uuid} />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const story = await Storyblok.getStory('obituaries', {
    version: 'draft',
  })
  const obituaryStories = await Storyblok.getStories({
    starts_with: 'obituaries',
    version: 'draft',
    is_startpage: 0,
  })

  return {
    props: {
      story: story.data.story,
      obituaries: obituaryStories.data.stories as Array<Story<IObituary>>,
    },
  }
}
