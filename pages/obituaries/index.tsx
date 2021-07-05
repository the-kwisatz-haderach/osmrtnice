import { debounce } from 'lodash'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Grid } from '../../components/Grid'
import { Obituary } from '../../components/Obituary'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import { IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { PageStory, Story } from '../../lib/storyblok/types'
import { SearchInput } from '../../components/SearchInput'

interface Props {
  story: PageStory
  obituaries: Array<Story<IObituary>>
}

export default function Obituaries({ story, obituaries }: Props): ReactElement {
  const router = useRouter()
  const [currentObituaries, setCurrentObituaries] = useState(obituaries)

  const handleSearch = useRef(
    debounce(
      async (query: string): Promise<void> => {
        const { data } = await axios.post('/api/obituaries/search', { query })
        setCurrentObituaries(data)
      },
      1000,
      { leading: true }
    )
  ).current

  useEffect(() => {
    if (typeof router?.query?.search === 'string') {
      handleSearch(router.query.search).catch(console.error)
    }
  }, [handleSearch, router])

  return (
    <div>
      <Head>
        <title>Obituaries</title>
      </Head>
      <Page story={story} />
      <div className="flex bg-gray-100 p-10 justify-center items-center flex-col">
        <SearchInput
          autoFocus
          defaultValue={(router?.query?.search as string) ?? ''}
          onChange={handleSearch}
          placeholder="Firstname, lastname, city..."
        />
      </div>
      <div className="contained my-10">
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
