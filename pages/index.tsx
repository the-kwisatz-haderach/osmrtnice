/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { SearchInput } from 'components/SearchInput'
import { PageStory } from 'lib/storyblok/types'
import { ObituaryGrid } from 'components/ObituaryGrid'
import { TopScroll } from 'components/TopScroll'
import { ProgressBar } from 'components/ProgessBar'
import { useObituaries } from 'hooks/reactQuery/queries'
import getObituaries from 'lib/domain/getObituaries'
import { connectToDb } from 'db'
import { useScrollToTop } from 'hooks/useScrollToTop'
import {
  DEFAULT_LIST_LIMIT,
  REVALIDATE_TIME_SECONDS,
  STORYBLOK_VERSION,
} from 'lib/constants'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react'
import { Contained } from 'components/Contained/Contained'

interface Props {
  story: PageStory
}

export default function Home({ story: initialStory }: Props): ReactElement {
  const story = useStoryblokState(initialStory)
  const { t } = useTranslation()
  const router = useRouter()
  const [ref, scrollToTop] = useScrollToTop<HTMLDivElement>()
  const [query, setQuery] = useState((router?.query?.search as string) ?? '')
  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useObituaries({ query })

  return (
    <div>
      <StoryblokComponent blok={story.content} />
      <Flex ref={ref} backgroundColor="gray.300">
        <Contained
          display="flex"
          justifyContent="center"
          height={32}
          py={[2, 4, 6]}
          alignItems="center"
        >
          <SearchInput
            title={t('search')}
            value={query}
            onChange={setQuery}
            placeholder={t('search-placeholder')}
          />
        </Contained>
      </Flex>
      <ProgressBar show={isLoading || isFetching} />
      <Box>
        <ObituaryGrid
          isLoading={isLoading}
          isLoadingNext={isFetchingNextPage}
          obituaries={data.pages.flatMap((page) => page.data)}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
          hasQuery={query !== ''}
        />
        <TopScroll
          show={data.pages?.some((page) => page.data.length > 10)}
          margin="auto"
          maxW="container.xl"
          width="100%"
          onClick={scrollToTop}
        />
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const storyblokApi = getStoryblokApi()
  const res = await storyblokApi.getStory('home', {
    version: STORYBLOK_VERSION,
    language: locale,
  })
  const queryClient = new QueryClient()
  const { db } = await connectToDb()
  await queryClient.prefetchInfiniteQuery(
    ['obituariesInfinite', { query: '' }],
    () => getObituaries(db, { limit: DEFAULT_LIST_LIMIT })
  )

  // Refactor after RQ bump: https://github.com/TanStack/query/discussions/4854
  const initialDehydratedState = dehydrate(queryClient)
  const dehydratedState = {
    ...initialDehydratedState,
    queries: initialDehydratedState.queries.map((query) => ({
      ...query,
      state: {
        ...query.state,
        data: {
          ...(query.state.data as Record<string, unknown>),
          // @ts-expect-error
          pageParams: query.state.data.pageParams.map((pp) =>
            pp === undefined ? null : pp
          ),
        },
      },
    })),
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: res.data.story as PageStory,
      dehydratedState,
    },
    revalidate: REVALIDATE_TIME_SECONDS,
  }
}
