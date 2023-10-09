import { ReactElement, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { SearchInput } from 'components/SearchInput'
import Page from 'components/StoryBlok/PageBlok/PageBlok'
import Storyblok from 'lib/storyblok/client'
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

interface Props {
  story: PageStory
}

export default function Home({ story }: Props): ReactElement {
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
      <ProgressBar show={isLoading || isFetching} />
      <Box my={14}>
        <ObituaryGrid
          isLoading={isLoading}
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
    version: STORYBLOK_VERSION,
    language: locale,
  })
  const queryClient = new QueryClient()
  const { db } = await connectToDb()
  await queryClient.prefetchQuery(['obituariesInfinite'], () =>
    getObituaries(db, { limit: DEFAULT_LIST_LIMIT })
  )
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: res.data.story as PageStory,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: REVALIDATE_TIME_SECONDS,
  }
}
