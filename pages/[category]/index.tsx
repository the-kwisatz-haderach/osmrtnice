import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useInfiniteQuery } from 'react-query'
import React, { ReactElement, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../../lib/storyblok/client'
import { PageStory } from '../../lib/storyblok/types'
import { SearchInput } from '../../components/SearchInput'
import { ObituaryGrid } from '../../components/ObituaryGrid'
import { IObituary } from '../../lib/domain/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { createMetaTitle, obituaryTypes } from '../../lib/domain'

interface Props {
  story: PageStory
  category: string
}

export default function Obituaries({ story, category }: Props): ReactElement {
  const { t } = useTranslation()
  const router = useRouter()
  const [query, setQuery] = useState((router?.query?.search as string) ?? '')
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isPlaceholderData,
    isFetchingNextPage,
  } = useInfiniteQuery<{
    data: IObituary[]
    next?: string
  }>(
    [category, category, query],
    async ({ pageParam }: { pageParam?: string }) => {
      const res = await axios.get(
        `/api/obituaries?search=${query}&category=${category}&limit=100&next=${
          pageParam ?? ''
        }`
      )
      return res.data
    },
    {
      placeholderData: { pages: [], pageParams: [] },
      getNextPageParam: (lastPage) => lastPage.next,
      keepPreviousData: true,
    }
  )

  return (
    <div>
      <Head>
        <title>{createMetaTitle(story.name)}</title>
      </Head>
      <Page story={story} />
      <Flex
        backgroundColor="gray.300"
        justifyContent="center"
        height={32}
        alignItems="center"
      >
        <SearchInput
          title={t('search')}
          value={query}
          onChange={setQuery}
          placeholder={t('search-placeholder')}
        />
      </Flex>
      <Box my={14}>
        <ObituaryGrid
          isLoading={isLoading || isPlaceholderData}
          isLoadingNext={isFetchingNextPage}
          obituaries={data.pages.flatMap((page) => page.data)}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
        />
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<
  Props,
  { category: string }
> = async ({ params: { category }, locale }) => {
  const story = await Storyblok.getStory(category, {
    version: 'draft',
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: story.data.story,
      category,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: obituaryTypes.map((category) => ({
    params: { category },
  })),
  fallback: false,
})
