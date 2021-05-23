import { GetStaticProps } from 'next'
import axios from 'axios'
import Head from 'next/head'
import React, { ChangeEventHandler, ReactElement, useState } from 'react'
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
  const [currentObituaries, setCurrentObituaries] = useState(obituaries)
  const [query, setQuery] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = async (): Promise<void> => {
    const { data } = await axios.post('/api/obituaries', { query })
    setCurrentObituaries(data)
  }

  return (
    <div>
      <Head>
        <title>Obituaries</title>
      </Head>
      <Page story={story} />
      <div>
        <p className="m-0 font-bold text-white text-3xl">Search here</p>
        <input type="text" value={query} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="contained">
        <Grid>
          {currentObituaries.map(({ content, full_slug, uuid }) => (
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
