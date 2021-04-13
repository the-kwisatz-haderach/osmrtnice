import Head from 'next/head'
import { HeroImage } from '../components/HeroImage'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <HeroImage />
    </div>
  )
}
