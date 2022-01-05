import Head from 'next/head'
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'
import useStoryblok from '../../../hooks/useStoryBlok/useStoryBlok'
import { createMetaTitle } from '../../../lib/domain'
import { PageStory } from '../../../lib/storyblok/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  story: PageStory
}

export default function Page({ story, ...props }: Props): ReactElement {
  const storyData = useStoryblok(story)
  return (
    <div {...props}>
      <Head>
        <title>{story.content.title || createMetaTitle(story.name)}</title>
        {story.content.description && (
          <meta name="description" content={story.content.description} />
        )}
        {(story.content.title || story.name) && (
          <meta
            property="og:title"
            content={story.content.title || createMetaTitle(story.name)}
          />
        )}
        {story.content.description && (
          <meta property="og:description" content={story.content.description} />
        )}
      </Head>
      {storyData.content.body
        ? storyData.content.body.map((blok) => (
            <DynamicBlokComponent key={blok._uid} blok={blok} />
          ))
        : null}
    </div>
  )
}
