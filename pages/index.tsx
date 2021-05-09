import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import { ObituaryFilter } from '../containers/ObituaryFilter'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useStoryblok from '../hooks/useStoryBlok/useStoryBlok'
import { createObituaries } from '../lib/createMockData'
import Storyblok from '../lib/storyblok'
import { PageStory } from '../lib/storyTypes'

const obituaries = createObituaries(12)

interface Props {
  story: PageStory
}

export default function Home({ story }: Props): ReactElement {
  const { observe } = useIntersectionObserver<HTMLDivElement>()
  const storyContent = useStoryblok(story)

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <section>
        <div
          id="image"
          ref={observe}
          style={{
            height: '75vh',
            marginTop: -65,
          }}
          className="w-full relative filter brightness-75"
        >
          <Image src="https://picsum.photos/1000/1600" layout="fill" />
        </div>
        <div>
          <ObituaryFilter />
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
      </section>
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
