import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import Head from 'next/head'
import { ReactElement } from 'react'
import { BlokType } from '../../../lib/storyblok/types'

export interface Props {
  blok: BlokType<{
    description: string
    title: string
    body: BlokType[]
  }>
}

export default function Page({ blok }: Props): ReactElement {
  return (
    <>
      <Head>
        <title>{blok.title}</title>
        {blok.description && (
          <meta name="description" content={blok.description} />
        )}
        {blok.title && <meta property="og:title" content={blok.title} />}
        {blok.description && (
          <meta property="og:description" content={blok.description} />
        )}
      </Head>
      <div {...storyblokEditable(blok)}>
        {blok.body
          ? blok.body.map((nestedBlok) => (
              <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
            ))
          : null}
      </div>
    </>
  )
}
