import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { SearchInput } from '../components/SearchInput'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { ICrawledObituary, IObituary } from '../lib/domain/types'
import Storyblok from '../lib/storyblok/client'
import { PageStory, Story } from '../lib/storyblok/types'
import { connectToDb } from '../db'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { ObituaryGrid } from '../components/ObituaryGrid'

interface Props {
  story: PageStory
  obituaries: Array<Story<IObituary>>
}

export default function Home({ story, obituaries }: Props): ReactElement {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmitSearch = async (): Promise<void> => {
    await router.push(`/obituaries?search=${query}`)
  }

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
          <SearchInput
            defaultValue={query}
            onChange={setQuery}
            onSubmit={handleSubmitSearch}
            placeholder="Firstname, lastname, city..."
          />
        </Flex>
      </Box>
      <Page story={story} />
      <ObituaryGrid obituaries={obituaries} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const loc = locale === 'en' ? '' : `${locale}/`
  const res = await Storyblok.getStory(`${loc}home`, {
    version: 'draft',
    cv: Date.now(),
  })
  const obituaryStories = await Storyblok.getStories({
    starts_with: 'obituaries',
    version: 'draft',
    is_startpage: 0,
  })

  const { db } = await connectToDb()

  const otherObits = await db
    .collection<ICrawledObituary>('obituaries')
    .find({})
    .limit(20)
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

  const obituaries: Array<Story<IObituary>> = [
    ...obituaryStories.data.stories,
    ...otherObits,
  ].slice(0, 20)

  return {
    props: {
      story: res.data.story as PageStory,
      obituaries,
    },
  }
}
