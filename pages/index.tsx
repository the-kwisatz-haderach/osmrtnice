import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useInfiniteQuery } from 'react-query'
import { ReactElement, useState } from 'react'
import axios from 'axios'
import { SearchInput } from '../components/SearchInput'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { ObituaryGrid } from '../components/ObituaryGrid'
import { IObituary } from '../lib/domain/types'

interface Props {
  story: PageStory
}

export default function Home({ story }: Props): ReactElement {
  const router = useRouter()
  const [query, setQuery] = useState((router?.query?.search as string) ?? '')
  const {
    data,
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
      <Head>
        <meta
          name="google-site-verification"
          content="I3npG6NpSx1ZykfWYJn2SLCfhjdhNV6xb6Bm7NZ-iqs"
        />
        <title>Home</title>
      </Head>
      <Box
        color="white"
        height="65vh"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 5%, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7) 95%), url(/images/candles.jpg)`}
      >
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Heading
            as="h1"
            fontSize={['4xl', '6xl', '6xl', '8xl']}
            textAlign="center"
            mb={10}
          >
            Search our obituaries
          </Heading>
        </Flex>
      </Box>
      <Page story={story} />
      <Flex
        backgroundColor="gray.300"
        justifyContent="center"
        height={32}
        alignItems="center"
      >
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Firstname, lastname, city..."
        />
      </Flex>
      <ObituaryGrid
        isLoading={isLoading || isPlaceholderData}
        isLoadingNext={isFetchingNextPage}
        obituaries={data.pages.flatMap((page) => page.data)}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const loc = locale === 'en' ? '' : `${locale}/`
  const res = await Storyblok.getStory(`${loc}home`, {
    version: 'draft',
    cv: Date.now(),
  })
  return {
    props: {
      story: res.data.story as PageStory,
    },
  }
}
