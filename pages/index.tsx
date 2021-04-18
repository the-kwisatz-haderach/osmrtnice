import Head from 'next/head'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import { ObituaryFilter } from '../containers/ObituaryFilter'
import { createObituaries } from '../lib/createMockData'

const obituaries = createObituaries(12)

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <section>
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
