import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import Head from 'next/head'
import { ReactElement } from 'react'
import { BlokType, IPageBlok } from '../../../lib/storyblok/types'

export interface Props {
  blok: BlokType<IPageBlok>
}

export default function Page({ blok }: Props): ReactElement {
  return (
    <>
      <Head>
        <title key="title">{blok.title}</title>
        {blok.description && (
          <meta
            key="description"
            name="description"
            content={blok.description}
          />
        )}
        {blok.title && (
          <meta key="og-title" property="og:title" content={blok.title} />
        )}
        {blok.description && (
          <meta
            key="og-description"
            property="og:description"
            content={blok.description}
          />
        )}
        {blok.meta_image?.filename && (
          <meta
            key="og-image"
            property="og:image"
            content={blok.meta_image.filename}
          />
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
