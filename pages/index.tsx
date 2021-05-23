import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import { ObituarySearch } from '../containers/ObituarySearch'
import { createObituaries } from '../lib/createMockData'
import Storyblok from '../lib/storyblok/client'
import { PageStory } from '../lib/storyblok/types'

const obituaries = createObituaries(12)

interface Props {
  story: PageStory
}

export default function Home({ story }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div
        className="w-full bg-gradient-to-b from-primary-900 to-primary-600 flex justify-center items-center flex-col"
        style={{
          height: '65vh',
        }}
      >
        <p className="m-0 font-bold text-white text-3xl">Search here</p>
        <ObituarySearch />
      </div>
      <div className="contained">
        <Grid>
          {obituaries.map((obituary) => (
            <div
              key={obituary.id}
              className={
                obituary.size === 'large' ? 'sm:col-span-2' : 'col-span-1'
              }
            >
              <Obituary {...obituary} />
            </div>
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

  return {
    props: {
      story: res.data.story as PageStory,
    },
  }
}
