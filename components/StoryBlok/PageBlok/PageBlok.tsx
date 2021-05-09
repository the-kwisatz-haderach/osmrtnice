import { ReactElement } from 'react'
import useStoryblok from '../../../hooks/useStoryBlok/useStoryBlok'
import { PageStory } from '../../../lib/storyTypes'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props {
  story: PageStory
}

export default function Page({ story }: Props): ReactElement {
  const storyData = useStoryblok(story)
  return (
    <div>
      {storyData.content.body
        ? storyData.content.body.map((blok) => (
            <DynamicBlokComponent key={blok._uid} blok={blok} />
          ))
        : null}
    </div>
  )
}
