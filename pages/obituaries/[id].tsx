import { ReactElement } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

interface Props {}

export default function Post(props: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  return {
    props: {},
  }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: false,
  }
}
