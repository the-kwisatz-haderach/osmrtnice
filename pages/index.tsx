import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useInfiniteQuery } from 'react-query'
import { ReactElement, useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { SearchInput } from '../components/SearchInput'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'
import { Box, Flex } from '@chakra-ui/react'
import { ObituaryGrid } from '../components/ObituaryGrid'
import { IObituary } from '../lib/domain/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { TopScroll } from '../components/TopScroll'
import { ProgressBar } from '../components/ProgessBar'

interface Props {
  story: PageStory
}

export default function Home({ story }: Props): ReactElement {
  const { t } = useTranslation()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [ref])
  const [query, setQuery] = useState((router?.query?.search as string) ?? '')
  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    isPlaceholderData,
  } = useInfiniteQuery<{
    data: IObituary[]
    next?: string
  }>(
    ['obituaries', query],
    async ({ pageParam }: { pageParam?: string }) => {
      const res = await axios.get(
        `/api/obituaries?search=${query}&limit=100&next=${pageParam ?? ''}`
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
      <ProgressBar show={isLoading || isFetching || isPlaceholderData} />
      <Box my={14}>
        <ObituaryGrid
          isLoading={isLoading || isPlaceholderData}
          isLoadingNext={isFetchingNextPage}
          obituaries={data.pages.flatMap((page) => page.data)}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
        />
        <TopScroll
          show={data.pages.some((page) => page.data.length > 10)}
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

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const res = await Storyblok.getStory('home', {
    version: 'draft',
    cv: Date.now(),
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: res.data.story as PageStory,
    },
  }
}
