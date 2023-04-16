import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Page from '../../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../../lib/storyblok/client'
import { PageStory } from '../../lib/storyblok/types'
import { SearchInput } from '../../components/SearchInput'
import { ObituaryGrid } from '../../components/ObituaryGrid'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { obituaryTypes } from '../../lib/domain'
import { TopScroll } from '../../components/TopScroll'
import { ProgressBar } from '../../components/ProgessBar'
import { useObituaries } from '../../hooks/reactQuery/queries'
import { getObituaries } from '../../lib/domain/getObituaries'
import { useScrollToTop } from 'hooks/useScrollToTop'
import { REVALIDATE_TIME_SECONDS } from 'lib/constants'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { connectToDb } from 'db'

interface Props {
  story: PageStory
  category: string
}

export default function Obituaries({ story, category }: Props): ReactElement {
  const { t } = useTranslation()
  const router = useRouter()
  const [ref, scrollToTop] = useScrollToTop<HTMLDivElement>()
  const [query, setQuery] = useState((router?.query?.search as string) ?? '')
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useObituaries({
    category,
    query,
  })

  return (
    <div>
      <Page story={story} />
      <Flex
        ref={ref}
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
      <ProgressBar show={isFetching} />
      <Box my={14}>
        <ObituaryGrid
          isLoading={isLoading}
          isLoadingNext={isFetchingNextPage}
          obituaries={query ? data.pages.flatMap((page) => page.data) : []}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
        />
        <TopScroll
          show={query && data.pages.some((page) => page.data.length > 10)}
          margin="auto"
          maxW="container.xl"
          width="100%"
          px={3}
          py={[3, 3, 5]}
          onClick={scrollToTop}
        />
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params: { category },
  locale,
}) => {
  const queryClient = new QueryClient()
  const { db } = await connectToDb()
  await queryClient.prefetchQuery(['obituariesInfinite', { category }], () =>
    getObituaries(db, { category: category as string })
  )
  const story = await Storyblok.getStory(category as string, {
    version: 'draft',
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: story.data.story,
      category,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: REVALIDATE_TIME_SECONDS,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: obituaryTypes.map((category) => ({
    params: { category },
  })),
  fallback: false,
})
