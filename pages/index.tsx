import Head from 'next/head'
import { Grid } from '../components/Grid'
import { Obituary } from '../components/Obituary'
import { createObituaries } from '../lib/createMockData'

const obituaries = createObituaries(12)

export default function Home() {
  return (
    <div className="contained">
      <Head>
        <title>Home</title>
      </Head>
      <section className="p-10">
        <Grid>
          {obituaries.map((obituary) => (
            <Obituary {...obituary} key={obituary.id} />
          ))}
        </Grid>
      </section>
    </div>
  )
}
