import { debounce } from 'lodash'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Grid } from '../../components/Grid'
import { Obituary } from '../../components/Obituary'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import { IObituary, Paginated } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { PageStory, Story } from '../../lib/storyblok/types'
import { SearchInput } from '../../components/SearchInput'
import { connectToDb } from '../../db'
import { Pagination } from '../../components/Pagination'

interface Props {
  story: PageStory
  obituaries: Paginated<Array<Story<IObituary>>>
}

export default function Obituaries({ story, obituaries }: Props): ReactElement {
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const resultsGridRef = useRef<HTMLDivElement>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [currentObituaries, setCurrentObituaries] = useState(obituaries)

  const handleSearch = useRef(
    debounce(
      async (query: string): Promise<void> => {
        setPageIndex(0)
        if (query === '') {
          setCurrentObituaries(obituaries)
        } else {
          const { data } = await axios.post('/api/obituaries/search', { query })
          setCurrentObituaries(data)
        }
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

  const onClickPagination = (isPrev = false) => () => {
    const m = isPrev ? -1 : 1
    setPageIndex((curr) => curr + 1 * m)
    window.scrollTo({
      top: resultsGridRef.current.offsetTop - 100,
      behavior: 'smooth',
    })
  }

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
          autoFocus={
            typeof window !== 'undefined' ? window.innerWidth > 1024 : undefined
          }
          defaultValue={(router?.query?.search as string) ?? ''}
          onChange={handleSearch}
          placeholder="Firstname, lastname, city..."
        />
      </div>
      <div ref={resultsGridRef} className="contained my-10">
        {currentObituaries.length > 0 ? (
          <Grid>
            {currentObituaries[pageIndex].map(
              ({ content, full_slug, uuid }) => (
                <Obituary
                  {...content}
                  slug={full_slug}
                  key={content._id ?? uuid}
                />
              )
            )}
          </Grid>
        ) : (
          <div className="contained p-10 flex items-center justify-center h-56 text-xl">
            <p>There are no results. Try changing your search query.</p>
          </div>
        )}
        <div className="contained p-10">
          <Pagination
            index={pageIndex}
            totalIndices={currentObituaries.length}
            onNext={onClickPagination()}
            onPrev={onClickPagination(true)}
          />
        </div>
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

  const { db } = await connectToDb()

  const otherObits = await db
    .collection<IObituary>('obituaries')
    .find({})
    .limit(2000)
    .toArray()
    .then((obituaries) =>
      obituaries.map((obituary) => {
        return JSON.parse(
          JSON.stringify({
            uuid: obituary._id,
            content: obituary,
          })
        )
      })
    )

  const paginatedObituaries: Array<Story<IObituary>> = [
    ...obituaryStories.data.stories,
    ...otherObits,
  ]

  const obituaries: Paginated<Array<Story<IObituary>>> = []
  for (let i = 0; i < paginatedObituaries.length; i += 50) {
    obituaries.push(paginatedObituaries.slice(i, i + 50))
  }

  return {
    props: {
      story: story.data.story,
      obituaries,
    },
    revalidate: 60,
  }
}
