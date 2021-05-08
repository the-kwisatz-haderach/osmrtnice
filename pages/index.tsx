import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import { ObituaryFilter } from '../containers/ObituaryFilter'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import { createObituaries } from '../lib/createMockData'

const obituaries = createObituaries(12)

export default function Home(): ReactElement {
  const { observe } = useIntersectionObserver<HTMLDivElement>()

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
            height: '66vh',
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
