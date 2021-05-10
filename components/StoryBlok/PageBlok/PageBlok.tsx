import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'
import useStoryblok from '../../../hooks/useStoryBlok/useStoryBlok'
import { PageStory } from '../../../lib/storyTypes'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  story: PageStory
}

export default function Page({ story, ...props }: Props): ReactElement {
  const storyData = useStoryblok(story)
  return (
    <div {...props}>
      {storyData.content.body
        ? storyData.content.body.map((blok) => (
            <DynamicBlokComponent key={blok._uid} blok={blok} />
          ))
        : null}
    </div>
  )
}
