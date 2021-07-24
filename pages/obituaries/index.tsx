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
import { connectToDb } from '../../db'

interface Props {
  story: PageStory
  obituaries: Array<Story<IObituary>>
}

export default function Obituaries({ story, obituaries }: Props): ReactElement {
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (router?.query?.search && searchRef.current) {
      window.scrollTo({
        top: searchRef.current.getBoundingClientRect().top - 50,
        behavior: 'smooth',
      })
    }
  }, [searchRef, router])

  return (
    <div>
      <Head>
        <title>Obituaries</title>
      </Head>
      <Page story={story} />
      <div
        ref={searchRef}
        className="flex bg-gray-100 p-10 justify-center items-center flex-col"
      >
        <SearchInput
          autoFocus
          defaultValue={(router?.query?.search as string) ?? ''}
          onChange={handleSearch}
          placeholder="Firstname, lastname, city..."
        />
      </div>
      <div className="contained my-10">
        {currentObituaries.length > 0 ? (
          <Grid>
            {currentObituaries.map(({ content, full_slug, uuid }) => (
              <Obituary
                {...content}
                slug={full_slug}
                key={uuid ?? content._id}
              />
            ))}
          </Grid>
        ) : (
          <div className="contained p-10 flex items-center justify-center h-56 text-xl">
            <p>There are no results. Try changing your search query.</p>
          </div>
        )}
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

  const connection = await connectToDb()

  let otherObits: Array<Story<IObituary>> = []
  if (connection) {
    otherObits = await (
      await connection.db.collection('obituaries').find({}).toArray()
    ).map((obituary) =>
      JSON.parse(
        JSON.stringify({
          uuid: obituary._id,
          content: obituary,
        })
      )
    )
  }

  return {
    props: {
      story: story.data.story,
      obituaries: [...obituaryStories.data.stories, ...otherObits] as Array<
        Story<IObituary>
      >,
    },
  }
}
