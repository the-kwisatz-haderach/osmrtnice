import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import { SearchInput } from '../components/SearchInput'
import Page from '../components/StoryBlok/PageBlok/PageBlok'
import { IObituary } from '../lib/domain/types'
import Storyblok from '../lib/storyblok/client'
import { PageStory, Story } from '../lib/storyblok/types'
import { connectToDb } from '../db'

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
      <div
        className="bg-gradient-to-b from-primary-900 to-primary-700 text-white"
        style={{
          height: '75vh',
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 5%, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7) 95%),
            url(/images/candles.jpg)`,
        }}
      >
        <div className="flex flex-col items-center justify-center w-5/6 m-auto h-full">
          <h1 className="text-center mb-10">Search our obituaries</h1>
          <SearchInput
            defaultValue={query}
            onChange={setQuery}
            onSubmit={handleSubmitSearch}
            placeholder="Firstname, lastname, city..."
          />
        </div>
      </div>
      <Page story={story} />
      <div className="contained my-10">
        <Grid>
          {obituaries.map(({ content, uuid }) => (
            <Obituary key={content._id ?? uuid} {...content} />
          ))}
        </Grid>
      </div>
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
    .collection<IObituary>('obituaries')
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
