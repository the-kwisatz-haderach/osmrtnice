import { GetStaticProps } from 'next'
import axios from 'axios'
import Head from 'next/head'
import React, {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useState,
} from 'react'
import { Grid } from '../../components/Grid'
import { Obituary } from '../../components/Obituary'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import { IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { PageStory, Story } from '../../lib/storyblok/types'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

interface Props {
  story: PageStory
  obituaries: Array<Story<IObituary>>
}

export default function Obituaries({ story, obituaries }: Props): ReactElement {
  const [currentObituaries, setCurrentObituaries] = useState(obituaries)

  const handleSearch = async (query: string): Promise<void> => {
    const { data } = await axios.post('/api/obituaries', { query })
    setCurrentObituaries(data)
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div>
      <Head>
        <title>Obituaries</title>
      </Head>
      <Page story={story} />
      <div className="flex bg-gray-100 p-10 justify-center items-center flex-col">
        <p className="m-0 font-bold text-3xl mb-5">Search here</p>
        <form onSubmit={handleSubmit} className="space-x-2 flex flex-wrap">
          <Input
            onChange={handleSearch}
            style={{
              minWidth: 300,
            }}
          />
          <Button type="submit">Search</Button>
        </form>
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
