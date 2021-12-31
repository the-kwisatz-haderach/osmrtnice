import { debounce } from 'lodash'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import { IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { PageStory } from '../../lib/storyblok/types'
import { SearchInput } from '../../components/SearchInput'
import { connectToDb } from '../../db'
import { Pagination } from '../../components/Pagination'
import { Box, Flex } from '@chakra-ui/react'
import { ObituaryGrid } from '../../components/ObituaryGrid'
import { EmptyState } from '../../components/EmptyState'

interface Props {
  story: PageStory
  obituaries: IObituary[]
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
      <Flex
        backgroundColor="gray.400"
        justifyContent="center"
        height={32}
        alignItems="center"
        ref={searchRef}
      >
        <SearchInput
          autoFocus={
            typeof window !== 'undefined' ? window.innerWidth > 1024 : undefined
          }
          defaultValue={(router?.query?.search as string) ?? ''}
          onChange={handleSearch}
          placeholder="Firstname, lastname, city..."
        />
      </Flex>
      <Box ref={resultsGridRef} my={14}>
        {currentObituaries.length > 0 ? (
          <ObituaryGrid obituaries={currentObituaries} />
        ) : (
          <EmptyState
            title="No results found."
            description="Try changing your search query."
            icon="warn"
          />
        )}
        <Box>
          <Pagination
            index={pageIndex}
            totalIndices={currentObituaries.length}
            onNext={onClickPagination()}
            onPrev={onClickPagination(true)}
          />
        </Box>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const story = await Storyblok.getStory('obituaries', {
    version: 'draft',
  })
  const { db } = await connectToDb()
  const obituaries = JSON.parse(
    JSON.stringify(
      await db
        .collection<IObituary>('obituaries')
        .find({})
        .sort({ date_of_death: -1 })
        .limit(2000)
        .toArray()
    )
  )

  return {
    props: {
      story: story.data.story,
      obituaries,
    },
    revalidate: 60,
  }
}
